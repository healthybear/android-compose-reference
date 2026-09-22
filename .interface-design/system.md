# Interface Design System
**Project:** Jetpack Compose Reference  
**Direction:** Code Workbench  
**Last Updated:** 2026-09-19

---

## Intent

**Who:** Android developers learning Compose, working at desks or coffee shops, quickly referencing APIs  
**Task:** Scan parameter lists → View example code → Run WASM preview to verify understanding  
**Feel:** **Focused, technical, precise like a terminal, but friendlier than raw documentation**

---

## Domain Exploration

### Product World Concepts
1. **Code editor** - Developer workbench, precise, technical, tool-oriented
2. **Reference manual** - Quick lookup, scan-style reading, information-dense
3. **Playground/Sandbox** - Experimental, interactive, instant feedback (WASM preview)
4. **Technical documentation** - Clear hierarchy, navigable, code-first
5. **Developer terminal** - Monospace fonts, high contrast, command-driven
6. **Component library showcase** - Card browsing, visual examples, quick comparison

### Natural Color Palette
- **Terminal Black** `#0F172A` - Code editor dark background
- **Syntax Green** `#22C55E` - Code highlight success/running state
- **Comment Gray** `#64748B` - Soft gray for code comments
- **Paper White** `#FAFAF9` - Printed document warm off-white
- **Border Blue-Gray** `#475569` - IDE separator neutral
- **Warning Amber** `#F59E0B` - Build warning warmth
- **Ink Black** `#1E293B` - Code text deep ink

### Signature Element
**Live WASM code preview cards** - The unique feature allowing users to run Compose code directly in browser:
- Preview area with subtle "running" animation indicator
- Clear visual distinction from static code snippets
- Gradient border or glow effect suggesting "active/interactive" state

---

## Visual Direction

### Typography
- **Heading Font:** JetBrains Mono (weights: 400/500/600/700)
- **Body Font:** IBM Plex Sans (weights: 300/400/500/600/700)
- **Scale Ratio:** 1.25 (minor third for technical density)
- **Hierarchy Strategy:** Weight + opacity variations, not just size
  - Primary: 600 weight, full opacity
  - Secondary: 500 weight, secondary color
  - Tertiary: 400 weight, 80% opacity
  - Muted: 400 weight, placeholder color

### Letter Spacing
- Large type (>28px): -0.03em (tighter tracking)
- Headlines (20-28px): -0.02em to -0.01em
- Body text: default
- Small text (<13px): +0.01em (slight loosening for readability)

---

## Depth Strategy

**Border-first approach** -细腻边框定义结构，而非戏剧性阴影

### Light Mode Shadows
```css
--shadow-sm: 0 0 0 1px rgba(0, 0, 0, 0.04);
--shadow-md: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-lg: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);
```

### Dark Mode Shadows
Stronger borders, weaker shadows (shadows don't read well on dark):
```css
--shadow-sm: 0 0 0 1px rgba(255, 255, 255, 0.06);
--shadow-md: 0 0 0 1px rgba(255, 255, 255, 0.08);
--shadow-lg: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3);
```

### Active/Interactive Glow (for WASM preview)
```css
--glow-active: 0 0 0 1px rgba(34, 197, 94, 0.3), 0 0 8px rgba(34, 197, 94, 0.1);
--glow-active-strong: 0 0 0 2px rgba(34, 197, 94, 0.5), 0 0 12px rgba(34, 197, 94, 0.15);
```

---

## Spacing

**Base Unit:** 4px  
**Density:** Standard (6/10) - balanced between tight tool panels and airy content

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight gaps, icon spacing |
| `--space-sm` | 8px | Inline spacing, tight lists |
| `--space-md` | 16px | Standard padding, component gaps |
| `--space-lg` | 24px | Section padding, card internal |
| `--space-xl` | 32px | Large gaps between groups |
| `--space-2xl` | 48px | Section margins |
| `--space-3xl` | 64px | Hero/major area padding |

**Density Gradation:**
- Parameter tables: tight (8px padding)
- Code examples: spacious (24px padding)
- Navigation: compact (4-8px gaps)

---

## Component Patterns

### Card Types

#### Standard Elevated Card
```css
background: var(--color-card-light);  /* Pure white on off-white bg */
border: 1px solid var(--color-border-light);
border-radius: var(--radius-lg);  /* 12px */
padding: var(--space-lg);  /* 24px */
box-shadow: var(--shadow-md);
transition: all 200ms ease;
```

**Hover:** Transform -2px, border → accent green, shadow → lg

#### Code/Editor Card
```css
background: var(--color-muted-light);  /* Slightly darker for "inset" feel */
border: 1px solid var(--color-border-light);
border-radius: var(--radius-md);  /* 8px */
font-family: var(--font-heading);
```

#### Interactive Card (WASM Preview)
```css
background: var(--color-card-light);
border: 1px solid rgba(34, 197, 94, 0.2);  /* Green hint */
box-shadow: var(--glow-active);
position: relative;
```

**Top gradient bar:**
```css
::before {
  height: 2px;
  background: linear-gradient(90deg,
    rgba(34, 197, 94, 0) 0%,
    rgba(34, 197, 94, 0.5) 50%,
    rgba(34, 197, 94, 0) 100%);
}
```

### Code Block (IDE Style)
- Header: Language tag (uppercase, tracked) + copy button
- Background: `--color-muted-light` (editor panel feel)
- Border: 1px subtle, hover shows shadow-md
- Font: JetBrains Mono, 14px, 1.6 line-height
- Scrollbar: Custom styled, 8px height, rounded

### Table of Contents
- Sticky positioned, top: 24px
- Active item: 3px left accent bar + 600 weight + background
- Smooth scroll behavior
- Hidden < 1200px (responsive)

---

## Color Distribution

**90% grayscale + 10% accent green** - 单色主导，绿色点缀

- Gray builds structure and hierarchy
- Green communicates: success, interactive/preview, active state
- Never use color for decoration alone - color must mean something

---

## Avoided Defaults

1. ❌ Standard SaaS dashboard (left nav + white card grid)  
   ✅ Code editor-style layout (dark sidebar + editor-like content spacing)

2. ❌ Rounded cards + soft shadows (generic SaaS)  
   ✅ Sharp borders + subtle layers (like VS Code panels)

3. ❌ All component cards equal size/weight  
   ✅ With-preview components = large cards, docs-only = compact lists

---

## Key Measurements

### Typography Scale (Base 16px, 1.25 ratio)
- Caption: 12px (0.75rem)
- Body Small: 14px (0.875rem)
- Body: 16px (1rem)
- Body Large: 18px (1.125rem)
- H3: 20px (1.25rem)
- H2: 24px (1.5rem)
- H1: 32px (2rem)
- Display: 40px+ (2.5rem+)

### Border Radius
- Small (inputs): 6px
- Medium (cards): 8px
- Large (modals): 12px
- XLarge: 16px

---

## Notes

- Font smoothing: `-webkit-font-smoothing: antialiased` on root
- Tabular numbers: Use `font-variant-numeric: tabular-nums` on all dynamic numbers
- Text wrapping: `text-wrap: balance` on headings, `pretty` on body
- Concentric radius: Inner element radius = outer - padding
- All transitions: 200ms ease or cubic-bezier(0.23, 1, 0.32, 1)
- Motion: < 300ms for all UI animations
- Respect `prefers-reduced-motion`
