# Evidence-led palette picker

Use this on every substantial website or interface. The picker prevents the familiar failure of naming a few pleasing hues, running one contrast check, and spreading the same fashionable palette over every product.

## 1. Gather color evidence before proposing colors

Inspect and record:

- the real product logo, brand guide, interface screenshots, and first-party imagery; sample actual colors when useful, and distinguish core identity colors from event artwork, skin tones, photography, and incidental pixels;
- at least three direct product/sector references when available, noting background, text, action, and supporting colors from pages actually inspected;
- the cross-sector visual references that answer this brief’s question;
- the palette fingerprints of the most relevant recent sites designed in this workspace, including colors that must not recur as a familiar combination;
- the product’s audience, task, physical context, accessibility needs, and any user-stated brand or mood constraint.

Keep measured source colors separate from interpretation. Do not say a color is “the brand color” because it appears once in a photograph. If the site has no established identity, state that and ground the direction in the product and audience instead of inventing heritage.

Use image tools already available to inspect/extract prominent colors from first-party assets when practical. Exclude transparency and near-white/near-black backgrounds from the asset-dominance summary unless those neutrals are part of the actual identity. Record source, color value, where it appears, and whether it should carry across the interface or stay local to the image.

## 2. Define what the palette must do

Write a short palette brief before making candidates:

- intended reading/task context (for example, long documentation reading, high-attention recruitment, a control surface, or image-led storytelling);
- required brand anchors and colors that should remain unique to an event, photograph, or illustration;
- desired emotional effect, tied to product facts and audience rather than generic adjectives;
- light/dark mode requirement and any meaning-bearing states;
- recent palette combinations to avoid.

Decide where calm surfaces and high-energy color can live. A strong brand color may work best on links and selected regions instead of a wall-to-wall background. Do not force a dark theme or light theme the product does not need.

## 3. Build three genuinely different candidate systems

Create three candidates that differ in color relationships and surface strategy, not just the primary accent. For example, vary whether the base is cool, warm, or dark; whether contrast comes from one brand hue or two; and whether color is concentrated in fields, typography, image framing, or controls. These are dimensions to test, not recommended presets.

For each candidate:

1. Show actual swatches and a page-scale strip or rough homepage section containing headline, body text, links, controls, and one real planned image/poster. A swatch card alone cannot show visual balance or image clash.
2. Preserve a real brand anchor where appropriate, but vary its role and its supporting colors. Do not tint or recolor a logo to make it fit.
3. Test on the real asset mix: photography, product captures, diagrams, illustrations, event posters, and empty/error surfaces. If a real image becomes muddy or disappears into a background, change the layout treatment or candidate.
4. Compare each candidate to competitor palettes and the recent-work fingerprint. Reject the candidate if it is recognizable as a previous site after the copy and image are hidden, unless an explicit brand system requires that reuse.
5. Explain the user/product reason and the visual tradeoff in one or two sentences.

Do not choose a candidate because it is most colorful or most novel. The palette must support hierarchy, content, and the product’s real character.

## 4. Map every color to a semantic role

Name tokens by job, not hue or mood. Include the roles the interface actually uses:

- page background and raised surface;
- primary text, secondary text, border/divider;
- primary action, secondary action/accent, link, visited/selected/focus treatment;
- success, warning, error, and informational feedback;
- disabled and overlay/backdrop roles where present;
- theme-specific equivalents when the product supports more than one theme.

For every token, record its hex/RGB value and the permitted foreground/background pairings. Do not reuse one ambiguous “accent” token for unrelated link, warning, and success meanings. Never rely on hue alone to communicate a state; retain words, icons, patterns, or structural cues. The skill’s prohibition on status bubbles, pills, badge-shaped statuses, and dots still applies.

## 5. Apply hard accessibility gates

Measure all actual foreground/background pairs used for text, including hover, active, selected, disabled, overlays, and both themes:

- ordinary text: WCAG AA contrast at least 4.5:1;
- large text: at least 3:1;
- essential control boundaries, icons, and focus indicators: at least 3:1 against adjacent colors where WCAG requires non-text contrast;
- focus states must remain visible on every surface and not be conveyed by color alone.

Do not average contrast scores or trade a failure in one state for a high score elsewhere. If any used pairing fails, darken/lighten the actual token or change the pairing, then calculate again. Do not “fix” poor contrast by shrinking copy, adding a shadow, or lowering opacity. Record the tool/method and rounded ratio for each used pair. Use a trusted contrast checker or a correct WCAG relative-luminance calculation; do not estimate by eye.

Check common color-vision deficiencies in a simulator when available. In particular, do not make red/green the only distinction between states or chart series. If simulation is unavailable, record the limitation and use redundant labels/shapes.

## 6. Choose and verify

Compare candidates in a small evidence table with these questions, each marked pass/concern/fail and backed by a reason:

| Check | Evidence required |
| --- | --- |
| Identity fit | Source colors and product materials; note conflicts. |
| Task fit | How the colors support the main action and reading order. |
| Image fit | Readable crop and contrast beside real selected imagery. |
| Accessibility | Complete contrast-pair table, focus and state review. |
| Distinction | Side-by-side comparison with direct products and recent project palettes. |
| Route/theme fit | Sample across the home, an information-heavy page, image-led content, controls, and every offered theme. |

Accessibility and required brand fidelity are hard gates. Among candidates that pass, select the one with the strongest evidenced fit and distinction; record why, including one rejected palette and its concrete weakness. Implement only the selected role-based tokens, preview the important route types at real desktop and mobile sizes, and update tokens based on what the rendered pages show.

The design run must preserve: sources sampled; dominant brand-asset colors and what they signify; comparison to recent palettes; the three candidate swatch/section previews; selected role tokens; allowed color pairings and measured ratios; a note about simulated color vision; and any verification that remains unavailable.
