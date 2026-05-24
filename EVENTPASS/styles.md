# EventPass — Design System & Style Guide

**Version:** 2.0 (reflects the shipped UI)
**Companion to:** PRD.md
**Last updated:** May 2026

This is the single source of truth for EventPass's visual language — colour, type, spacing, components, motion, and UX behaviour — documented exactly as implemented in `styles.css`.

---

## 1. Brand Personality

EventPass feels **calm, trustworthy, modern, and minimal**. The palette is a refined **green** on cool near-neutral surfaces, so the interface reads as clean and composed rather than loud. A complete beginner should succeed on their first try. Principles: minimal surface, strong hierarchy, generous whitespace, one clear action per screen, and spring-based motion that rewards interaction.

---

## 2. Colour System

### Light theme (default)

**Brand**
| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#2F9E6E` | Primary buttons, links, active states, accents |
| `--primary-dark` | `#1F7A53` | Hover/pressed, gradient ends |
| `--primary-tint` | `#E7F4EE` | Tinted backgrounds, selected states, icon chips |

**Neutrals (cool)**
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FBFCFB` | Page background |
| `--bg-soft` | `#F2F5F3` | Recessed areas, pass stage, segmented controls |
| `--surface` | `#FFFFFF` | Cards, modals, drawer |
| `--surface-2` | `#F7F9F8` | Inputs, detail panels |
| `--border` | `#E6EAE8` | Borders, dividers |
| `--border-strong` | `#D4DAD7` | Hover borders, dashed dropzones |
| `--text` | `#1A211E` | Primary headings & body |
| `--text-2` | `#5E6B65` | Secondary text, labels |
| `--text-3` | `#9AA5A0` | Muted text, placeholders |

**Status**
| Token | Hex | Usage |
|---|---|---|
| `--success` | `#2F9E6E` | Used/checked-in, access granted, confirmations |
| `--success-tint` | `#E7F4EE` | Used badge background, verify panel |
| `--warning` | `#C98A1A` | Unused/pending indicators, "already checked-in" |
| `--warning-tint` | `#FBF1DC` | Unused badge background |
| `--danger` | `#D14343` | Errors, delete, invalid pass |
| `--danger-tint` | `#FBE7E7` | Danger button background, invalid verify |

### Dark theme (`[data-theme="dark"]`)
| Role | Hex |
|---|---|
| `--primary` | `#3FB985` |
| `--primary-dark` | `#2F9E6E` |
| `--primary-tint` | `#15241D` |
| `--bg` | `#0F1512` |
| `--bg-soft` | `#151D19` |
| `--surface` | `#1A2420` |
| `--surface-2` | `#1F2A25` |
| `--border` | `#2A3531` |
| `--border-strong` | `#3A4842` |
| `--text` | `#ECF2EF` |
| `--text-2` | `#A8B5AF` |
| `--text-3` | `#74827B` |
| `--success` | `#4FC78E` |
| `--warning` | `#D9A23E` |
| `--danger` | `#E8716F` |

### Brand swatch palette (event colours)
Eight options offered when creating an event, leading with greens/cool tones:
`#2F9E6E` · `#1F7A53` · `#0E7C86` · `#3D6FB4` · `#6B5BC0` · `#C9476A` · `#C98A1A` · `#5A6B45`

Pass text colour auto-adapts (light or dark) to the chosen brand colour for contrast.

---

## 3. Typography

**Display:** Fraunces (`--font-display`), fallback Georgia, serif — used for the logo, hero, page titles, card and pass titles. Italic Fraunces is used for the Elegant pass title.
**UI:** Hanken Grotesk (`--font-ui`), fallback system-ui, sans-serif — all body, labels, buttons, and controls.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero headline | 54px (44 ↓880, 35 ↓560) | 700 | Fraunces, tight tracking |
| Page / banner title | 30–42px | 600–700 | Fraunces |
| Section heading | 30–32px | 600 | Fraunces |
| Card / drawer title | 19–23px | 600 | Fraunces |
| Body | 14–15px | 400–500 | Hanken |
| Label | 13px | 600 | Hanken, uppercase tracking on some |
| Caption / meta | 11–13px | 400–600 | Hanken |
| Badge | 10.5–11.5px | 700 | Uppercase, letter-spaced |

---

## 4. Spacing & Layout

Spacing follows a 4px rhythm (common steps: 4, 8, 12, 14, 16, 18, 20, 22, 24, 28, 40, 56, 64px). Content max-width is **1080px** (CTA band 1024px), centered with consistent side padding. The dashboard uses an auto-fill grid (`minmax(300px, 1fr)`); the landing feature grid is 3 columns, reflowing to 2 (≤880px) then 1 (≤560px).

**Breakpoints:** desktop default · tablet `≤880px` (hero stacks, features 2-col) · mobile `≤560px` (hamburger nav, drawer becomes bottom sheet, single-column footer) · `≤420px` (footer 1-col).

---

## 5. Radius, Shadow & Motion Tokens

**Radius:** `--r-sm 8px` (inputs, small buttons) · `--r-md 12px` (buttons, cards) · `--r-lg 18px` (large cards, drawer panels) · `--r-xl 24px` (pass card, CTA band, verify card) · `--r-full 999px` (pills, badges, avatars).

**Shadow (neutral, soft):** `--sh-sm 0 1px 2px rgba(20,40,30,.05)` · `--sh-md 0 6px 18px rgba(20,45,35,.07)` · `--sh-lg 0 16px 40px rgba(20,45,35,.10)` · `--sh-xl 0 28px 70px rgba(15,40,30,.15)`. Dark mode uses black-based equivalents.

**Easing:** `--ease cubic-bezier(0.22,1,0.36,1)` (standard) · `--spring cubic-bezier(0.34,1.56,0.64,1)` (overshoot, for reveals/pops) · `--ease-soft cubic-bezier(0.4,0,0.2,1)` (scrims, taps).

---

## 6. Component Styles

**Buttons** — `.btn-primary` (green fill, white text), `.btn-secondary` (surface + strong border), `.btn-ghost` (transparent), `.btn-danger` (danger tint → solid on hover). Radius `--r-md`, 12–15px/600, `transform: scale(0.96)` on active, hover lifts 1px. Sizes: `.btn-lg`, `.btn-sm`, `.btn-block`.

**Inputs** — `--surface-2` background, 1.5px `--border`, radius `--r-sm`, 12–15px padding. Focus: green border + 4px `--primary-tint` ring + white background. Error: danger border.

**Cards** — `--surface`, 1px `--border`, radius `--r-lg`, `--sh-sm`, hover lift + `--sh-md`.

**Event card** — 112px cover band (cover image or brand gradient) with a white **date chip** (day + month) top-left and a translucent **template tag** top-right; body has Fraunces title, time/venue meta with icons, and a footer with guest/check-in count plus an animated circular open-arrow.

**Pass card** — 380×232px, radius `--r-lg`, `--sh-xl`. Single flex layout (head: status + type badge / body: event + attendee / foot: meta + QR) shared by all three templates so text never overlaps; titles clamp to 2 lines, meta truncates. QR is white-padded with a soft shadow.

**Status badges** — Used: `--success-tint` bg, `--success` text; Unused: `--warning-tint` bg, `--warning` text; both pill-shaped with a leading dot.

**Drawer (pass)** — fixed panel, 440px / 92vw, slides in on `--spring` from the right (desktop) or up as a 92vh bottom sheet (mobile); scrim fades on `--ease-soft`; header (avatar + name), scrollable body (live pass + controls), sticky footer (export/share/simulate-scan). Body children stagger in.

**Verify screen** — centered card on a `--primary-tint` radial wash; large status icon (green check / amber warning / red x), Fraunces heading, and a details panel listing attendee, type, event, venue, and a green "Checked in" status row.

**Nav** — sticky, blurred translucent background, logo (brand mark + Fraunces wordmark) returning home, clickable breadcrumb, theme toggle, primary CTA, and a hamburger that reveals a dropdown menu on mobile.

**Footer** — only on the landing view; brand blurb + three link/info columns + a bottom bar; collapses to single column on small screens.

**Toasts** — bottom-right, surface card with a coloured left border (green success / red error) and icon; slide-in then auto-dismiss.

---

## 7. Iconography

Icons are **Lucide** glyphs embedded as inline SVG paths in JS and hydrated at runtime (`<i class="ti ti-name">` → inline `<svg>`). No external icon font is loaded, so icons never 404 and render offline. Stroke style: `currentColor`, width 1.8, round caps/joins; sized via `em`/explicit px per context.

---

## 8. Motion & Interaction

Animation uses the **Web Animations API** (the vanilla equivalent of Framer Motion), driven by the spring easing above:
- **springIn** — opacity + translate + scale entrance (hero, banner, cards, rows, pass).
- **staggerIn** — sequential springIn across lists (event cards, attendee rows).
- **pop** — quick scale overshoot on the pass when template/colour/status changes.
- **tap** — subtle scale-down on pointer-down for all interactive elements.
- **Scroll reveal** — landing features, section intro, and CTA band spring in via IntersectionObserver.
- **Drawer** — spring slide + staggered control reveal.
All motion is disabled under `prefers-reduced-motion: reduce`.

---

## 9. UX Principles

1. **One clear primary action per screen.**
2. **Inline validation** — errors surface as toasts tied to the action; required fields checked on save.
3. **Green + check for success**, amber for pending/unused, red for errors/invalid.
4. **Helpful empty states** — illustration chip + single CTA (no events / no attendees).
5. **No dead ends** — logo home, breadcrumb, and back affordances on every nested screen.
6. **Drawer over navigation** — viewing/editing a pass happens in a slide-in drawer, keeping the user on the guest list.
7. **Instant feedback** — live preview, spring pops, and tap responses make every interaction feel responsive.
8. **Mobile-first** — hamburger nav and bottom-sheet drawer for small screens.

---

## 10. Implementation Notes

Buildless: hand-written CSS with CSS custom properties (tokens) on `:root`, overridden under `[data-theme="dark"]`. No Tailwind, no preprocessor. Theme is toggled by setting `data-theme` on `<html>` and persisted to `localStorage`. Brand colour and cover image are applied per-pass via inline CSS variables (`--brand`) and computed gradients, with text contrast chosen automatically from the brand colour's luminance.
