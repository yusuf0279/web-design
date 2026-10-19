# Visual exclusions and composition checks

Use this checklist for every substantial design. It blocks familiar agent-generated decoration while leaving room for a direction grounded in the product. These are exclusions for the named treatments, not a ban on strong typography, real card components, or useful navigation.

## Hero and typography

- Do not put a tiny uppercase eyebrow, overline, category tag, or micro-message directly above the hero headline. Start with the headline or a legible sentence that genuinely helps the user understand the offer. Put necessary context elsewhere at a readable size.
- Do not style selected hero keywords as italic serif fragments for contrast. Keep headline treatment coherent with the chosen type system; create emphasis through wording, scale, color, weight, composition, or a product-specific visual.
- Do not use monospace as a brand voice, decorative texture, or ordinary interface type. Reserve it for literal code, commands, or data where fixed-width alignment materially helps comprehension.
- Define a compact type scale and check all copy at real desktop and mobile sizes. No tiny hero labels or arbitrary one-off sizes.

## Navigation and page structure

- Do not make navigation a full-width solid-color strip or slab. Compose it with the page: use the page surface, a restrained boundary, contextual placement, or another product-specific treatment. Do not replace the strip with a glass panel.
- Build distinct routes for distinct product and company tasks. A homepage may introduce and route, but it must not stand in for a multi-page site. Follow the multi-page requirements in the main skill.

## Cards, lists, and surfaces

- Do not use glassmorphism: no frosted translucent cards or nav, backdrop blur, or ornamental glass panels.
- Do not default to a uniform grid of identical cards. First consider editorial spreads, image-led features, grouped content, a directory, a comparison, or a composition whose proportions follow each item's purpose. When repeated cards are genuinely the clearest pattern, make each item's hierarchy, media, density, or scale respond to its content instead of cloning an interchangeable tile.
- Do not add a colored vertical strip, thick left border, or other ornamental stripe along the side of cards or panels. Use typography, image crop, whitespace, a real boundary, or layout to create hierarchy.
- Do not render numbered steps as identical horizontal rows separated by rules or dividers. For real sequences, use a diagram, connected spatial composition, annotated visual, or another form that explains the relationship. Use dividers only when they improve scanning and are not the visual premise of the page.
- Avoid using decorative dividers as the default separator between every content section. Let composition, spacing, imagery, and changes in content shape create rhythm.

## Real imagery and motion

- For a substantial public website, research and use suitable, rights-cleared imagery: include a meaningful visual in the hero or opening content and at least one additional useful placement (such as a section image, card, project example, or background). Images may be photography, first-party product captures, licensed illustrations, or other real assets. Do not force generic stock photos where they weaken the product's truth.
- Use the license-verification process in the design pipeline. Never substitute AI-generated raster artwork, unlicensed search-result downloads, or generic placeholders. If focused research cannot find a suitable rights-cleared asset for a secondary placement, record what was searched and why; do not silently omit imagery. This exemption never applies to the hero: if no photograph or video fits, build a code-native animated graphic, an interactive product demo, or a first-party capture so the first viewport always has a visual hook.
- Every hero needs a visual hook (image, video, animation or graphic) in the first viewport on both desktop and mobile. A hero that is only a headline, a paragraph and buttons fails review. Check it in the rendered screenshots, not the plan.
- Use spring motion for entrances, reveals, hover/press feedback and layout changes so the page feels alive: prefer Motion springs (stiffness ~300-500, damping ~30-40) or a CSS `linear()` spring easing, stagger groups by 40-80ms, and animate transform and opacity only. Avoid wobble that delays reading, and always provide a reduced-motion static state.
- Plan motion as part of the visual direction when it clarifies a state, relationship or narrative beat, and to give the hero and key sections life. For React interfaces, Motion from [motion.dev](https://motion.dev) is an option when it fits the existing stack; use CSS or platform-native motion for simple effects. Do not add a dependency or animation just for novelty. Respect reduced-motion preferences and provide an understandable static state.
- For interactions users can drag, swipe, resize, or redirect, make feedback immediate and continuous. Preserve the grab point, let users interrupt motion at any time, and carry release velocity into the settling motion when momentum matters. Use projected destinations and soft boundary resistance only when they improve the task; use critically damped motion for ordinary state changes and reserve overshoot for input that actually carries momentum. Keep entry and exit paths spatially coherent. These are optional interaction techniques, not a requirement to add gestures to a marketing site.
- Keep depth legible and purposeful. The glassmorphism exclusion still applies: do not use blur, translucency, or layered materials as decoration or as a default navbar treatment. If a real floating control needs separation, use an opaque surface, clear contrast, spacing, and a restrained shadow.

## Color and decoration

- Do not reach for purple or violet gradients as a default “modern” look. Use any hue only when the product identity, real assets, audience, or researched palette comparison supports it. Treat gradients as a specific compositional tool, not the site-wide brand system.
- Do not add sparkle glyphs, emoji in headings, glowing hover states, or decorative particles as generic excitement. Use them only when the product has a real symbolic or functional connection.

## Type, spacing, and component consistency

- Avoid jittery type: do not pair oversized, ultra-heavy headings with thin body copy, jump line heights unpredictably, or set arbitrary paragraph gaps. Define roles for display, heading, body, supporting, and metadata text with coherent weights, sizes, line heights, and paragraph rhythm across every route. Choose typefaces for the product's voice and legibility; common fonts are not automatically wrong, but a default stack without typographic decisions is not a design system. Check actual line wrapping at desktop and mobile widths. Treat tracking and leading as size-specific; use optical sizing when the selected face supports it, and ensure layouts can accommodate enlarged user text.
- Establish a spacing rhythm (usually a 4- or 8-unit base), named container widths, grid columns, and responsive gutters. Align sections and repeated elements to that system; use deliberate optical adjustments rather than arbitrary values. Maintain consistent component placement across routes unless the content or task justifies a visible variation.
- Define shared tokens for spacing, border radius, borders, shadows, and transition timing. Components may vary when content or task requires it, but a site should not accumulate unrelated radii, button heights, padding, and hover behavior.
- Keep icon size and stroke weight in proportion to adjacent labels and controls. Do not make icons dominate tiny text. A social or utility icon that looks interactive must have a working destination or action and an accessible name; remove it if it has none.
- Avoid large hover lifts, rotation, glow, and abrupt pop-in effects. Reuse a small set of easing and duration values. Motion should start at a meaningful trigger, settle naturally, avoid layout jumps, and respect reduced-motion preferences.

## Header, hero, and layout integrity

- Avoid semi-transparent headers over moving page content; scrolling must not make navigation text collide with or lose contrast against content. Prefer a stable opaque surface. Glass blur is excluded by the surface rules above.
- Test sticky and fixed elements while scrolling and resizing; they must not jitter, jump, cover anchors, or drift out of alignment.
- Give the hero one clear promise and a readable path into the site. Do not stack every possible decoration, animation, UI mockup, background image, microcopy label, shadow, and CTA into one viewport: use one strong visual hook, and keep it and the actions in service of the main message.
- Use a coherent responsive grid. Check shared edges, container widths, gutters, card/image alignment, wrapping, and section transitions across every route and breakpoint; do not accept visible drift as polish.

## Interaction completeness

- Every visible control must do what its label implies. Buttons that start asynchronous work need a busy/disabled state and clear progress or completion feedback. Toggles must change a real setting and expose their state accessibly. Carousels must actually move, expose usable previous/next controls and position, and support keyboard and touch. Remove controls whose behavior or destination is missing.
- Give data-dependent interfaces appropriate loading, empty, error, and success states. When async work takes perceptible time, show truthful progress and disable duplicate submission where needed. Use skeletons only where a meaningful content layout is known and the wait justifies them; otherwise use a clear loading message or progress treatment. Do not delay instant actions or show fake progress. Avoid layout shifts when loading completes.
- Keep server actions responsive: avoid blocking the interface during work, surface actionable errors, and ensure progress feedback corresponds to the real operation. Optimize large assets and expensive motion so the page remains responsive on mobile.
- Keep interactions consistent across routes: the same action should have the same feedback, motion, focus, and disabled behavior unless a documented task difference requires otherwise.

## Copy, evidence, and analytics

- Write hero copy for the specific product and user. Avoid generic launch lines such as “Launch faster,” “Build your dreams,” and “Create without limits,” and avoid chaining em dashes as a substitute for clear sentences. Prefer precise benefits and real product language.
- Never invent testimonials, customer names, customer logos, usage counts, ratings, conversion numbers, case studies, or other social proof. Use only verified material with permission. Do not reuse a portrait or generated-looking person as several different customers; AI-generated raster people are prohibited by the asset rules.
- Analytics and dashboard values must come from a real source and show meaningful units, time range, and state. Never fill a chart with fabricated data just to make the interface look populated. Distinguish sample/demo data visibly and only when it serves a legitimate preview. Handle no-data, loading, and error states honestly.
- Add analytics tracking only when the product needs it and within the project's consent and privacy requirements. Name events for real user actions, avoid unnecessary personal data, and do not make privacy claims the implementation cannot support.
- Finish technical page identity: use a meaningful title and description for each route, valid social-sharing metadata and a suitable Open Graph image, and a real favicon. On an existing-site redesign, inspect the current favicon and replace it if missing, stale, or inconsistent with the new identity. Confirm `/favicon.ico` serves a valid icon. Do not leave starter titles, missing previews, placeholder copyright text, or incorrect years; keep legal and attribution copy accurate.

## Review gate

Before implementation, inspect the wireframe and design board for these patterns. Before delivery, inspect the rendered routes at desktop and narrow-mobile sizes; exercise controls and loading/empty/error states; check spacing, grid alignment, type rhythm, icon proportion, transitions, header behavior, performance, metadata, favicon, and content truth. If any excluded pattern appears, remove it or document the specific product requirement that makes the exception necessary. The hero-label, italic-serif-keyword, glassmorphism, card-side-stripe, numbered-divider-row, and solid-navbar-strip exclusions require a concrete product reason to override; aesthetic preference alone is insufficient. Purple gradients, sparkles, emojis in headings, glow effects, heavy hover lifts, and other decorations need a clear product connection. Verify `/favicon.ico` returns a valid, brand-appropriate icon, especially after redesigning an existing site. When image/SVG generation is unavailable or unreliable, use verified existing/licensed assets, code-native visuals, or a deliberate asset-free treatment and record the limitation; do not leave a placeholder or broken asset. Verify that all social links work, all product claims and analytics are real, metadata and share previews are complete, copyright text is correct, and every interactive control has complete behavior.

## No accidental overlap

- Elements do not cover each other by default. A card over a photo, text over a busy image, a panel clipping a figure, a caption pushed under a floating box: if nobody chose it on purpose, it is a bug and reads as vibe-coded.
- An overlap is allowed only when it is a composed decision: it has a stated purpose in the design record, it never hides content that matters (the photo's subject, a heading, a control, a caption), it snaps to the grid or to a shared edge, it is used the same way everywhere it appears, and it still works at 390px. Otherwise separate the pieces: give each its own cell, band or column.
- Mark deliberate overlaps with `data-overlap="intentional"` on the overlapping element. `scripts/visual_gate.mjs` fails the page for any other content overlap at desktop or mobile, so run it and fix every report instead of adding the attribute to silence it.
- A product visual (demo panel, terminal, diagram) never sits on top of a photograph. Show the photograph and the visual as separate pieces, or build one coherent composition from a single image treatment.

## Does not look templated

These are the tells that make a site read as generated even when each piece is polished. Check the finished routes against all of them.

- **Same skeleton everywhere:** headline left and media right at the same ratio on every route; every section built as small label + H2 + intro + three-up cards or divider rows; the same header on a different page. Use at least three structurally different hero compositions across a site (for example: full-width type with a wide stage beneath, media-first with type beside it, a single large diagram, a typographic or numeric hero), and never build two consecutive sections on the same skeleton.
- **Repeated micro-patterns:** a small eyebrow above every H2, identical rows with hairlines, identical rounded cards, equal-weight columns. Vary the grid, the scale jumps and the density the way a person laying out a page would: one section wide and sparse, the next dense; one section with the text on the left, the next full-bleed.
- **One signature element per page, taken from how the product really works:** a diagram, a live demo, a before/after, an annotated artifact. If the logo could be swapped for any other product's and the page would still fit, the page is not specific enough.
- **Header and footer are designed, not default:** pick the header's shape from the product (an install chip, a search field, a status line, a command palette hint) rather than logo-left, links, CTA-right.
- **Type and spacing carry the personality:** use a deliberate scale jump (for example 96/88 against 16/26), asymmetry and generous empty space; avoid every heading being the same bold weight at near-identical sizes.
- Review by squinting: scroll the full-page screenshot at thumbnail size. If every band has the same silhouette, redesign the weakest two.


## Favicon always matches the design

- Any time the palette, logo or visual style changes, the favicon changes in the same commit. Derive it from the real mark and the exact brand tokens (tile colour, ink colour, radius), never from an old file.
- Ship `/favicon.ico` as a true multi-size ICO (16, 32, 48, 64) plus an SVG icon and a 180px apple-touch icon. Render the ICO from a large source with supersampling so the 16px version stays crisp.
- Look at the 16px and 32px renders before delivery: the mark must still read, with no clipped edges. Verify `curl -sI /favicon.ico` returns 200 with an icon content type on the live URL.
