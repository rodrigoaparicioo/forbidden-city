# Design System Document: Imperial Majesty

## 1. Overview & Creative North Star: "The Digital Pavilion"
This design system is not merely a website; it is an editorial window into the Ming and Qing dynasties. Our Creative North Star is **"The Digital Pavilion."** Just as the Forbidden City uses a "central axis" to create balance and a sense of infinite progression, our layouts must embrace intentional symmetry, monumental scale, and ritualistic precision.

We break the "template" look by treating the browser as a series of physical courtyards. We reject the cluttered, boxy grids of modern SaaS in favor of **Spatial Storytelling**. By utilizing extreme typographic scale, vast negative space (inspired by *Ma-Yuan* "One-Corner" composition), and overlapping architectural motifs, we create a digital experience that feels as majestic and permanent as the stone and timber of the Forbidden City itself.

---

## 2. Colors: The Imperial Palette
The color strategy is rooted in the Five Elements, dominated by Fire (Red) and Earth (Gold/Yellow). 

- **Primary (`#840101`):** The soul of the system. This deep imperial red should be used for core navigation and significant structural elements, echoing the lacquered columns of the Hall of Supreme Harmony.
- **Secondary (`#735c00`):** A shimmering, aged gold. Use this for accents, calligraphic flourishes, and high-level interactive states.

### The "No-Line" Rule
To maintain a high-end, seamless feel, **1px solid borders are strictly prohibited.** Separation of content must be achieved through:
1. **Background Color Shifts:** Place a `surface-container-low` component against a `surface` background.
2. **Negative Space:** Use the Spacing Scale to let elements breathe.
3. **Tonal Transitions:** A transition from `primary` to `primary-container` creates depth without a hard edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked imperial papers. 
- Use `surface` (`#fef9f0`) as your base canvas (reminiscent of aged silk).
- Use `surface-container-lowest` (`#ffffff`) for high-focus cards to create a subtle lift.
- Nest elements within `surface-container` (`#f2ede4`) to define secondary content zones.

### Signature Textures & Gradients
Flat colors lack the "soul" of craftsmanship. Apply a subtle linear gradient to main CTAs using `primary` to `primary-container`. For large backgrounds, a faint radial gradient from `surface-bright` to `surface-dim` mimics the natural patina of ancient masonry.

---

## 3. Typography: The Scholar’s Script
The typography is a dialogue between the formal structure of the court and the elegance of the brush.

- **Display & Headlines (Noto Serif):** This typeface carries the weight of history. Use `display-lg` (3.5rem) for hero titles to evoke the scale of the palace gates. Its serif structure mimics the precision of carved stone inscriptions.
- **Body & Titles (Newsreader):** A sophisticated editorial serif. It provides a human, literary touch to long-form historical narratives. 
- **The "Calligraphic Accent":** While not a token, certain headings should be paired with vertical Chinese characters (using the `tertiary` color) to anchor the editorial layout in its cultural origin.

---

## 4. Elevation & Depth: Tonal Layering
In ancient architecture, depth is created by courtyards within courtyards, not by artificial drop shadows.

- **The Layering Principle:** Avoid shadows. Instead, "stack" the surface-container tiers. A `surface-container-highest` navigation bar over a `surface-container-low` header provides all the definition required.
- **Ambient Shadows:** If a floating element (like a modal) is required, use an extra-diffused shadow: `box-shadow: 0 20px 50px rgba(29, 28, 22, 0.06)`. The tint is derived from `on-surface` to ensure it feels like a natural shadow on silk, not a digital effect.
- **Glassmorphism & Depth:** For the top navigation, use a semi-transparent `surface` color with a `backdrop-blur` of 20px. This allows the imperial red of the content to bleed through as the user scrolls, creating a "frosted jade" effect.
- **The Ghost Border:** If a boundary is essential for accessibility, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Architectural Primitives

### Buttons: The Imperial Seals
*   **Primary:** Rectangular, sharp corners (`0px` radius). Background: `primary` to `primary-container` gradient. Text: `on-primary` (All-caps `label-md`). 
*   **Secondary:** Ghost style. No background. Border: 1px "Ghost Border" (15% opacity `outline`). Text: `primary`.
*   **Interaction:** On hover, the background shifts to `secondary` (Gold), mimicking the sun hitting a lacquered surface.

### Cards: The Nested Courtyard
*   **Design:** Zero border radius. No dividers. Use `surface-container-lowest` to pop against `surface`.
*   **Detail:** Add a 4px `primary` top-border to cards containing "Official" or "Imperial" history to signify importance.

### Inputs: The Scribe’s Ledger
*   **Style:** Underline only. Use `outline` color for the baseline.
*   **Focus State:** The baseline transitions to `primary` with a 2px weight. Labels use `newsreader` in `secondary`.

### Navigation: The Central Axis
*   Main navigation should be centered, utilizing `title-sm` with increased letter spacing (0.1rem).
*   Use a "Roof Tile" pattern (geometric CSS mask) as a subtle background for the footer.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace the `0px` border radius. Strength and history are found in straight lines and right angles, reflecting the city’s layout.
*   **Do** use asymmetrical layouts. Place a large `display-lg` headline on the left and a small `body-md` column on the far right to create a "curated" feel.
*   **Do** prioritize vertical rhythm. Use 80px, 120px, or 160px gaps between major sections to convey "Majesty."

### Don’t:
*   **Don't** use standard "Material Design" rounded buttons or cards. It will break the historical immersion immediately.
*   **Don't** use pure black (`#000000`). Always use `on-surface` (`#1d1c16`) for text to maintain the soft, ink-on-paper aesthetic.
*   **Don't** use divider lines to separate list items. Use a `surface-variant` background on every other item, or simply use 24px of whitespace.
*   **Don't** use fast, "snappy" animations. Use long, easing transitions (e.g., `cubic-bezier(0.4, 0, 0.2, 1)`) to mimic the slow opening of a heavy palace gate.

---

## 7. Auto-Generated Tokens
### Fonts
- Headline: `NOTO_SERIF`
- Body: `NEWSREADER`
- Label: `NEWSREADER`

### Core Colors
- **background**: `#fef9f0`
- **error**: `#ba1a1a`
- **error_container**: `#ffdad6`
- **inverse_on_surface**: `#f5f0e7`
- **inverse_primary**: `#ffb4a8`
- **inverse_surface**: `#32302a`
- **on_background**: `#1d1c16`
- **on_error**: `#ffffff`
- **on_error_container**: `#93000a`
- **on_primary**: `#ffffff`
- **on_primary_container**: `#ffbbb0`
- **on_primary_fixed**: `#410000`
- **on_primary_fixed_variant**: `#900e08`
- **on_secondary**: `#ffffff`
- **on_secondary_container**: `#745c00`
- **on_secondary_fixed**: `#241a00`
- **on_secondary_fixed_variant**: `#574500`
- **on_surface**: `#1d1c16`
- **on_surface_variant**: `#5a413d`
- **on_tertiary**: `#ffffff`
- **on_tertiary_container**: `#bdd0c1`
- **on_tertiary_fixed**: `#0e1f15`
- **on_tertiary_fixed_variant**: `#394b3f`
- **outline**: `#8e706c`
- **outline_variant**: `#e2beb9`
- **primary**: `#840101`
- **primary_container**: `#a62116`
- **primary_fixed**: `#ffdad5`
- **primary_fixed_dim**: `#ffb4a8`
- **secondary**: `#735c00`
- **secondary_container**: `#fed65b`
- **secondary_fixed**: `#ffe088`
- **secondary_fixed_dim**: `#e9c349`
- **surface**: `#fef9f0`
- **surface_bright**: `#fef9f0`
- **surface_container**: `#f2ede4`
- **surface_container_high**: `#ece8df`
- **surface_container_highest**: `#e7e2d9`
- **surface_container_low**: `#f8f3ea`
- **surface_container_lowest**: `#ffffff`
- **surface_dim**: `#ded9d1`
- **surface_tint**: `#b22a1e`
- **surface_variant**: `#e7e2d9`
- **tertiary**: `#314337`
- **tertiary_container**: `#485a4e`
- **tertiary_fixed**: `#d4e7d8`
- **tertiary_fixed_dim**: `#b8cbbc`
