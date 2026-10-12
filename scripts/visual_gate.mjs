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
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(350);

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
        return { overflow, brokenImages, missingAlt, smallText, clipped, title: document.title, h1: document.querySelector("h1")?.innerText || null };
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
      if (runtimeErrors.length) report.failures.push(`${viewport.name}/${theme}: runtime errors: ${runtimeErrors.join("; ")}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}

await fs.writeFile(path.join(outDir, "report.json"), JSON.stringify(report, null, 2) + "\n");
for (const capture of report.captures) {
  console.log(`${capture.viewport}/${capture.theme}: ${capture.size}; image errors=${capture.brokenImages.length}; missing alt=${capture.missingAlt.length}; small text=${capture.smallText.length}; clipped=${capture.clipped.length}; overflow=${capture.overflow.viewport}; runtime errors=${capture.runtimeErrors.length}`);
  console.log(`  ${path.join(outDir, capture.screenshot)}`);
}
if (report.failures.length) {
  console.error("Visual gate failed:\n- " + report.failures.join("\n- "));
  process.exitCode = 1;
} else console.log(`Visual gate passed. Report: ${path.join(outDir, "report.json")}`);
