#!/usr/bin/env node
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs/promises";

const [url, outArg] = process.argv.slice(2);
if (!url || !/^https?:\/\//.test(url)) {
  console.error("Usage: node visual_gate.mjs <http(s)://site> [output-directory]");
  process.exit(2);
}

const outDir = path.resolve(process.cwd(), outArg || "artifacts/design-review");
const localRequire = createRequire(path.resolve(process.cwd(), "package.json"));
let chromium;
for (const name of ["playwright", "playwright-core", "@playwright/test"]) {
  try { chromium = localRequire(name).chromium; break; } catch { /* try the next installed runner */ }
}
if (!chromium) {
  console.error("Playwright is not installed in this project. Use the browser workflow described in the skill, or install Playwright and its browser in the project environment.");
  process.exit(2);
}

await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { url, captures: [], failures: [] };
const cases = [
  { width: 1440, height: 1000, name: "desktop" },
  { width: 390, height: 844, name: "mobile" },
];

try {
  for (const viewport of cases) {
    for (const theme of ["light", "dark"]) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
      const runtimeErrors = [];
      page.on("pageerror", error => runtimeErrors.push(error.message));
      await page.goto(url, { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(800); // let the framework hydrate so theme toggles and handlers exist
      // Scroll the whole page once so lazy images load before they are checked for being broken.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); }
        window.scrollTo(0, 0);
      });
      // Force lazy images to load and wait for each to settle (or fail) so "broken" means broken.
      await page.evaluate(() => Promise.all([...document.images].map(img => {
        img.loading = "eager";
        if (img.complete) return null;
        return new Promise(resolve => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); setTimeout(resolve, 5000); });
      })));
      await page.waitForTimeout(300);

      let actualTheme = await page.locator("html").evaluate(el => ["light", "dark"].find(theme => el.classList.contains(theme)) || "unknown");
      if (actualTheme !== theme) {
        const toggle = page.locator(`button[aria-label*="${theme}" i]`).first();
        if (await toggle.count()) {
          await toggle.click();
          await page.waitForTimeout(350);
          actualTheme = await page.locator("html").evaluate(el => ["light", "dark"].find(value => el.classList.contains(value)) || "unknown");
        }
      }

      const findings = await page.evaluate(() => {
        const shown = el => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
        };
        const overflow = { viewport: document.documentElement.scrollWidth > innerWidth + 1, width: document.documentElement.scrollWidth };
        const brokenImages = [...document.images].filter(img => shown(img) && (!img.complete || img.naturalWidth === 0)).map(img => img.currentSrc || img.src);
        const missingAlt = [...document.images].filter(img => shown(img) && !img.hasAttribute("alt")).map(img => img.currentSrc || img.src);
        const smallText = [];
        for (const el of document.querySelectorAll("p,li,label,button,a,input,textarea,select,figcaption,small,[role=note]")) {
          if (!shown(el) || !el.textContent.trim()) continue;
          const size = parseFloat(getComputedStyle(el).fontSize);
          const minimum = el.matches("figcaption,small,[role=note]") ? 12 : el.matches("p,li") ? 16 : 14;
          if (size < minimum) smallText.push({ text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 80), size, minimum });
        }
        const clipped = [];
        for (const el of document.querySelectorAll("h1,h2,h3,p,button,a,label,figcaption")) {
          if (!shown(el) || !el.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(el);
          const textRects = [...range.getClientRects()];
          for (let parent = el; parent && parent !== document.body; parent = parent.parentElement) {
            const style = getComputedStyle(parent);
            if (!["hidden", "clip"].includes(style.overflowX) && !["hidden", "clip"].includes(style.overflowY)) continue;
            const box = parent.getBoundingClientRect();
            const clips = textRects.some(r =>
              (["hidden", "clip"].includes(style.overflowX) && (r.left < box.left - 1 || r.right > box.right + 1)) ||
              (["hidden", "clip"].includes(style.overflowY) && (r.top < box.top - 1 || r.bottom > box.bottom + 1))
            );
            if (clips) {
              clipped.push({ text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 90), clipper: parent.tagName.toLowerCase() + (parent.className && typeof parent.className === "string" ? `.${parent.className.trim().replace(/\s+/g, ".")}` : "") });
              break;
            }
          }
        }
        // Unintended overlap: content boxes (text blocks, media, controls) that cover each other.
        // Mark a deliberate, composed overlap with data-overlap="intentional" on either element.
        const overlaps = [];
        const label = el => (el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/)[0] : "") + (el.textContent.trim() ? ` “${el.textContent.trim().replace(/\s+/g, " ").slice(0, 40)}”` : ""));
        const boxes = [...document.querySelectorAll("h1,h2,h3,h4,p,li,figcaption,label,button,a,pre,table,img,video,canvas,svg,figure")]
          .filter(el => shown(el))
          .filter(el => !el.closest("[data-overlap='intentional']"))
          .filter(el => !(el.matches("svg") && (el.getBoundingClientRect().width < 48 || el.closest("button,a"))))
          .filter(el => !el.matches("figure,li") || el.querySelector("img,video,canvas") === null || el.matches("li"))
          .map(el => ({ el, r: el.getBoundingClientRect(), pos: getComputedStyle(el).position }))
          .filter(b => !["fixed", "sticky"].includes(b.pos) && !b.el.closest("header"));
        for (let i = 0; i < boxes.length && overlaps.length < 12; i++) {
          for (let j = i + 1; j < boxes.length && overlaps.length < 12; j++) {
            const a = boxes[i], b = boxes[j];
            if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
            const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
            const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
            if (w <= 2 || h <= 2) continue;
            const smaller = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
            if (w * h < 0.02 * smaller) continue;
            overlaps.push(label(a.el) + "  ×  " + label(b.el));
          }
        }
        return { overflow, brokenImages, missingAlt, smallText, clipped, overlaps, title: document.title, h1: document.querySelector("h1")?.innerText || null };
      });

      const name = `${viewport.name}-${theme}.png`;
      await page.screenshot({ path: path.join(outDir, name), fullPage: true, animations: "disabled" });
      const record = { viewport: viewport.name, size: `${viewport.width}x${viewport.height}`, theme, actualTheme, screenshot: name, ...findings, runtimeErrors };
      report.captures.push(record);
      if (actualTheme !== theme) report.failures.push(`${viewport.name}: could not verify ${theme} theme`);
      if (findings.overflow.viewport) report.failures.push(`${viewport.name}/${theme}: horizontal document overflow (${findings.overflow.width}px > ${viewport.width}px)`);
      if (findings.brokenImages.length) report.failures.push(`${viewport.name}/${theme}: broken images: ${findings.brokenImages.join(", ")}`);
      if (findings.missingAlt.length) report.failures.push(`${viewport.name}/${theme}: images missing alt attributes: ${findings.missingAlt.join(", ")}`);
      if (findings.smallText.length) report.failures.push(`${viewport.name}/${theme}: text below legibility baseline: ${findings.smallText.map(item => `“${item.text}” (${item.size}px; needs ${item.minimum}px)`).join("; ")}`);
      if (findings.clipped.length) report.failures.push(`${viewport.name}/${theme}: text clipped: ${findings.clipped.map(item => item.text).join("; ")}`);
      if (findings.overlaps.length) report.failures.push(`${viewport.name}/${theme}: unintended overlap (mark deliberate ones with data-overlap=\"intentional\"): ${findings.overlaps.join(" | ")}`);
      if (runtimeErrors.length) report.failures.push(`${viewport.name}/${theme}: runtime errors: ${runtimeErrors.join("; ")}`);
      await page.close();
    }
  }
// Favicon: /favicon.ico must be a real ICO, a rel=icon link must exist, and its colour must be reported for a style check.
try {
  const origin = new URL(url).origin;
  const res = await fetch(origin + "/favicon.ico");
  const buf = Buffer.from(await res.arrayBuffer());
  const isIco = buf.length > 22 && buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3] === 0;
  report.favicon = { status: res.status, bytes: buf.length, validIco: isIco };
  if (!res.ok || !isIco) report.failures.push(`/favicon.ico is not a valid icon (status ${res.status}, ${buf.length} bytes). Generate a multi-size ICO from the site's real mark and brand colours.`);
  const probe = await browser.newPage();
  await probe.goto(url, { waitUntil: "load", timeout: 45000 });
  const links = await probe.evaluate(() => [...document.querySelectorAll('link[rel~="icon"]')].map(l => l.href));
  await probe.close();
  report.favicon.links = links;
  if (!links.length) report.failures.push("No <link rel=icon> in the page head.");
} catch (error) { report.failures.push(`favicon check failed: ${error.message}`); }
} finally {
  await browser.close();
}

await fs.writeFile(path.join(outDir, "report.json"), JSON.stringify(report, null, 2) + "\n");
for (const capture of report.captures) {
  console.log(`${capture.viewport}/${capture.theme}: ${capture.size}; image errors=${capture.brokenImages.length}; missing alt=${capture.missingAlt.length}; small text=${capture.smallText.length}; clipped=${capture.clipped.length}; overflow=${capture.overflow.viewport}; runtime errors=${capture.runtimeErrors.length}`);
  console.log(`  ${path.join(outDir, capture.screenshot)}`);
}
if (report.favicon) console.log(`favicon: status=${report.favicon.status}; valid ico=${report.favicon.validIco}; links=${(report.favicon.links||[]).length}`);
if (report.failures.length) {
  console.error("Visual gate failed:\n- " + report.failures.join("\n- "));
  process.exitCode = 1;
} else console.log(`Visual gate passed. Report: ${path.join(outDir, "report.json")}`);
