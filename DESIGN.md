# Design System Specification: The Digital Armory

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Tactical Archivist."** 

This design system rejects the cluttered, chaotic aesthetic often associated with hobbyist platforms in favor of an "enterprise-grade" military interface. It mimics the high-tech, brutalist data-slates of a far-future command center. We achieve a premium feel by balancing the heavy, atmospheric "Grimdark" tones with ultra-clean, editorial spacing. 

The layout breaks from standard web templates by utilizing **intentional asymmetry**—heavy left-aligned typography contrasted with expansive negative space—and **layered depth**, where components feel like physical modules slotted into a command console rather than flat elements on a screen.

---

## 2. Colors & Surface Architecture

### The Palette
We utilize a sophisticated range of deep slates and metallic accents to convey authority and value.

*   **Core Neutrals:** `surface` (#121317) provides the void-black foundation, while `on-surface` (#E3E2E7) offers crisp, high-contrast readability.
*   **Primary Accent:** `on-primary-container` (#FA6900 / Vibrant Safety Orange) is reserved strictly for high-priority tactical actions (e.g., "Confirm Rental").
*   **The Regal Highlight:** `tertiary` (#F4BF3F / Burnished Gold) is used for "Excellence" markers—verified users, legendary tier miniatures, or rare collectibles.
*   **Secondary Support:** `secondary-container` (#015CB9 / Ultramarine) marks administrative or informational states, grounding the more aggressive orange.

### The "No-Line" Rule
**Standard 1px solid borders are strictly prohibited for sectioning.** To define space, designers must use:
1.  **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
2.  **Tonal Steps:** Placing a `surface-container-highest` element against a `surface-dim` backdrop.
3.  **Negative Space:** Using the `16` (3.5rem) or `20` (4.5rem) spacing tokens to create mental boundaries.

### Signature Textures & Glass
To move beyond "flat" UI, use **Glassmorphism** for floating overlays (e.g., Modals, Dropdowns). Apply `surface-container` with a 70% opacity and a `20px` backdrop-blur. 
*   **The "Valkyrie" Gradient:** For Hero CTAs, use a linear gradient from `primary` (#FFB693) to `primary-container` (#531E00) at a 135-degree angle. This adds a "soul" and metallic sheen that flat hex codes cannot replicate.

---

## 3. Typography: Authoritative Clarity

The typography scale is designed to feel like a redacted military dossier—bold, urgent, and precise.

*   **Display & Headlines (Space Grotesk):** This font was chosen for its technical, slightly "engineered" feel. Large scales like `display-lg` (3.5rem) should be used with tight letter-spacing (-0.02em) to feel monolithic.
*   **Body & Labels (Inter):** The "Swiss Army Knife" of typefaces. It provides neutral, high-legibility contrast to the expressive headlines. 
*   **Hierarchy Note:** Use `label-sm` in all-caps with `0.1rem` letter-spacing for metadata (e.g., "UNIT TYPE: HEAVY SUPPORT") to reinforce the archival theme.

---

## 4. Elevation & Depth: Tonal Layering

In this system, depth is a product of light and material, not artificial lines.

*   **The Layering Principle:** 
    *   **Level 0 (Floor):** `surface` (#121317).
    *   **Level 1 (Sections):** `surface-container-low` (#1A1B1F).
    *   **Level 2 (Cards):** `surface-container-high` (#292A2E).
*   **Ambient Shadows:** Use shadows sparingly. When a component must "float" (e.g., a hovered rental card), use a very large blur (32px) with the shadow color set to `surface-container-lowest` at 40% opacity. This creates a "glow" of darkness rather than a muddy grey smudge.
*   **The "Ghost Border" Fallback:** For tactical definition in high-density areas, use a `1px` border using `outline-variant` (#46464B) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Sharp corners (`rounded-sm`), background `primary-container`, text `on-primary-container`. High-energy, high-intent.
*   **Secondary (The Gold Standard):** `rounded-sm`, background `none`, border `1px` using `tertiary` (#F4BF3F) at 40% opacity. Used for secondary navigation or "View Details."
*   **Hover State:** Increase background brightness by 10% and apply a `2px` outer glow using the accent color.

### Inventory Cards
*   **Construction:** Use `surface-container-low`. No borders.
*   **Visuals:** Images should be flush to the top. Use `0.25rem` (rounded-default) for the container, but keep internal image corners sharp to maintain the "Grimdark" edge.
*   **No Dividers:** Separate "Price" from "Location" using a `3` (0.6rem) vertical spacing gap instead of a line.

### Input Fields
*   **Style:** Underline-only or subtle "Ghost" boxes.
*   **State:** When active, the "Ghost Border" transitions from 15% opacity to 100% `secondary` (Ultramarine). Helper text must use `label-sm` in `outline` color.

### Tactical Chips
*   **Filter Chips:** Small, `rounded-none` capsules. Use `surface-container-highest` for unselected and `primary` for selected. These should look like physical toggles on a machine.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. A heavy sidebar on the left with a vast, clean workspace on the right feels premium and intentional.
*   **Do** use "Burnished Gold" strictly for status and achievement. Overusing it diminishes its "Regal" impact.
*   **Do** embrace the dark. Use `surface-dim` for large background areas to reduce eye strain and increase the "atmospheric" feel.

### Don’t:
*   **Don’t** use 100% opaque white borders. They break the "Grimdark" immersion and look like unstyled defaults.
*   **Don’t** use standard `rounded-full` (pills) for buttons. It contradicts the "Tactical" aesthetic. Stick to `sm` (0.125rem) or `md` (0.375rem).
*   **Don’t** clutter the screen. If a piece of information isn't vital to the "Mission" (the rental), hide it in a `surface-container` drawer.