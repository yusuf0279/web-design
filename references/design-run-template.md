# Design expedition: [product / route]

## Product soul

- Audience and moment:
- Main task:
- Product promise and proof:
- Constraints / existing identity:
- Current failure or opportunity:
- Assumptions:

## Research field

Use the [inspiration corpus](inspiration-corpus.md) to select cross-sector design and UX sources by research question. Record limits when a relevant screen or flow is gated.

| Reference | Type (direct / adjacent / unexpected / visual gallery / UI library / flow) | Screen / task / viewport | Observed evidence → candidate principle | Adaptation and risk | Source |
| --- | --- | --- | --- | --- |

### Pattern map

| Pattern or section | Count / inspected sample | User purpose | Variation, absence, or gap |
| --- | --- | --- | --- |

- Visual-direction references inspected:
- Product UI or task-flow references inspected (when relevant):
- Same-sector synthesis: recurring UX/site structure, variations, useful omissions, and sample confidence:
- Cross-sector visual/interaction principles selected for layout, image treatment, type, color, or motion; adopted/adapted/rejected and product-specific reason:
- Human-centered principles used where relevant (purpose, agency and recovery, familiarity, flexibility, task clarity, craft, and delight); note the affected task and why any principle is not applicable:
- Research-to-design map: observation → principle → route/component where applied → reason it fits:
- Corpus and access limits / confidence:
- Research preview:

### Asset research

| Asset / placement | Type | Purpose | Original URL / creator | License / allowed use / attribution | Local file |
| --- | --- | --- | --- | --- |

- Existing assets audited / reuse constraints:
- Licensed source board with actual candidate previews:
- Favicon audit (existing file/framework route, old appearance, replacement, `/favicon.ico` response):
- Asset-generation/tool limitations and fallback chosen, if any:

## Repetition audit

- Prior site(s) checked and evidence available (screenshots, repository, design run):
- Their visual fingerprints:
- Specific compositions, rhythms, palettes, or motifs intentionally excluded:
- User-stated similarity concerns to resolve:
- New site fingerprint (navigation / hero / page rhythm / geometry / type / palette / imagery / signature interaction):
- Differences grounded in this product (target at least five fingerprint dimensions):
- If comparison was unavailable, what could not be verified:

## Design territories

| Territory | Point of view and structure | Signature moment | Evidence used or rejected | Tradeoff |
| --- | --- | --- | --- | --- |

- Preview:
- Cross-project repetition check (show comparison when available):
- Chosen direction and why:
- User choice or autonomous decision:

## Plan before build

- Multi-page route map tied to user tasks (homepage plus at least two useful routes):
- Screen sequence and hierarchy:
- Responsive wireframes / key states:
- Named type roles and compact type scale with line-height:
- Palette evidence: first-party asset colors (source + measured values), sector samples, and recent project palettes to avoid:
- Three page-scale palette candidates with real image sample, task fit, and tradeoff:
- Selected role-based tokens and permitted foreground/background pairings:
- Contrast table for every used text/control/focus/theme pairing; method and ratio:
- Color-vision simulation and route/theme palette review (or limitation):
- Navigation composition; confirm no full-width solid navbar strip, status bubbles, pills, badge-shaped status labels, or dots:
- Hero treatment: confirm no tiny overline above headline or italic-serif keyword fragment; monospace limited to literal code/commands/technical alignment:
- Anti-slop check (also no arbitrary purple gradients, sparkles, heading emoji, glow, inconsistent type/spacing/radii, dead social links, fake controls, or fake product proof):
- Real image placements in the opening experience and at least one additional section/card/background; if omitted, researched sources and product-specific reason:
- Per-asset source URL, creator, exact license, commercial/modification permissions, attribution, local file, crop/format, alt text, responsive behavior:
- Assets actually sourced/captured and files (confirm none are AI-generated):
- Motion purpose, trigger, easing, consistency across routes, direct-manipulation/interruptibility/velocity behavior where relevant, reduced-motion/static fallback, and Motion.dev/CSS/native choice where applicable:
- Interaction completeness (busy/loading, empty, error, success, toggles/carousels/buttons/social links):
- Copy, testimonials, customer proof, metrics, and analytics data verified as real; tracking consent/privacy behavior:
- Route titles/descriptions, OG/social image, valid `/favicon.ico`, copyright/attribution, and placeholder-content review:
- Design contract / preview:
- Next.js implementation plan: existing app architecture or new App Router structure; route-to-file mapping; shared layouts/components; package manager and dev/build/start commands:

## Build and rendered review

| View | Theme / state | Screenshot | Result / fixes |
| --- | --- | --- | --- |

- Routes directly opened and inspected:
- Rendered comparison against recent site work; repeated choices corrected:

- Build:
- Next.js production build result and routes served by the app (raw standalone HTML/CSS/JS is not the final site implementation):
- Main flow and navigation; async progress and action responsiveness:
- Asset load/crop/responsive variants/alt text/visible credits; license records, missing files, or placeholders:
- Responsive overflow, wrapping, and overlap; type rhythm, icon scale, grid/spacing tokens, container alignment, radii, and hover behavior consistency:
- Sticky/translucent header scrolling behavior; hero content density and clear primary message:
- Palette contrast by route/theme and states, color-vision simulation, keyboard focus, reduced motion:
- Runtime errors:
- Unverified checks:

## Outcome

- Changes made after visual review:
- Reusable product-specific rules:
- New visual fingerprint to help future runs avoid repeating this site:
- Remaining limitations:
