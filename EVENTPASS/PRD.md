# EventPass — Product Requirements Document

**Version:** 2.0 (reflects the shipped MVP)
**Status:** Built & deployable
**Last updated:** May 2026
**Document owner:** Product Design

---

## 1. Product Overview

**EventPass** is a lightweight, browser-based web application that lets event organizers generate branded digital event passes with scannable QR codes — and download them as PNG or PDF — in under three minutes, without any design or technical skills.

It targets small and medium events: meetups, weddings, workshops, conferences, and private gatherings. The product collapses pass creation into a single guided flow — enter details, pick a template, preview live, download — and adds a working **QR check-in/verification** flow that marks a pass as used the moment its code is scanned.

**The core problem:** creating attendee passes is normally expensive (hire a designer), slow (fight a graphics tool), or impersonal (a plain text ticket). EventPass makes professional, branded, individually-coded passes in minutes, with no account required.

**Design philosophy:** do one job extremely well — turn event + attendee data into a beautiful, scannable, downloadable, verifiable pass — and stay minimal rather than becoming a full ticketing platform.

---

## 2. Target Audience

| Audience | Need |
|---|---|
| Event organizers | Generate passes for meetups and conferences fast, in bulk |
| Wedding planners | Elegant, branded guest passes matching the event theme |
| Workshop hosts | Quick passes for paid or free sessions, often last-minute |
| Meetup coordinators | Recurring community events with rotating attendee lists |
| Private hosts | Polished passes for dinners, parties, exclusive gatherings |

Common traits: non-technical, time-poor, design-conscious, working solo or in a tiny team, often producing passes on a phone the night before an event.

---

## 3. Product Goals

1. Generate a QR-based event pass in **under 3 minutes** from a cold start.
2. Support **multiple events and multiple attendees** per organizer.
3. Allow **brand customization** — colours, templates, cover image, organizer details.
4. Enable **bulk attendee upload** via CSV (and pasted lists) alongside single entry.
5. Deliver **downloadable passes** in both **PNG and PDF**.
6. Provide a **working QR verification flow** that auto-marks passes as checked-in.
7. Require **no account** and **no backend** — usable instantly, persistent in the browser.

---

## 4. Core Features (as built)

### 4.1 Event creation & management
Organizers create events with name, date, time, venue, organizer name/contact, brand colour, template, and an optional cover image. Events appear on a dashboard as rich cards and can be edited or deleted. Each event is an independent workspace.

### 4.2 Attendee management (single, paste, and CSV)
Attendees can be added three ways: one at a time via a modal form; by **pasting a list** of names (one per line); or by **CSV upload** (columns `name`, optional `type`; header row auto-detected). The attendee list is searchable and each row shows an avatar, name, pass type, and live status badge, with quick actions to open the pass or remove the attendee. A downloadable CSV template is provided.

### 4.3 Unique QR code per attendee
Every attendee is assigned a unique token (`crypto.randomUUID()`). The QR encodes an absolute **verification URL** (`<site>#/verify/<token>`) so scanning it on any phone opens the verification screen. No two attendees share a code.

### 4.4 Pass customization & three templates
Organizers choose one of three templates and a brand colour from an 8-swatch palette, optionally adding a cover image. The three templates:
- **Minimal** — clean white card with a brand-coloured accent bar; dark text.
- **Elegant** — warm brand gradient with an italic serif event title.
- **Bold** — solid brand background, centred layout, large QR.

All three use an overlap-proof flex layout (header / body / footer) so long names and venues never collide; titles clamp to two lines and long text truncates cleanly.

### 4.5 Real-time pass preview (drawer)
Opening a pass slides in a **drawer** (right side on desktop, bottom sheet on mobile) over the guest list — no page navigation. The drawer shows the live pass plus controls for template, colour, and status. Any change updates the pass instantly with a spring "pop."

### 4.6 QR verification & auto check-in
Scanning a pass QR (or using the in-drawer **"Simulate scan"** button) opens a dedicated verification screen that:
- looks the pass up by its token,
- on first scan, **automatically marks it `used`** and timestamps the check-in, then shows **"Access granted"** with attendee, type, event, and venue;
- on a repeat scan, shows **"Already checked in"** with the original time;
- on an unknown token, shows **"Invalid pass."**
This demonstrates real verification states rather than a manual toggle. (Verification is per-browser in the MVP; see §11/§14.)

### 4.7 Pass status indicators
Each attendee carries a status — **Unused** (amber badge) or **Used** (green badge) — reflected in the guest list, on the pass, and updated automatically by the verification flow. Status can also be toggled manually in the drawer.

### 4.8 Export — PNG & PDF & share
Passes export to **PNG** (via `html2canvas` at 3× scale for crisp output) and **PDF** (via `jsPDF`, sized to the pass). A **Share** action uses the Web Share API where available, falling back to a download. Fonts are awaited before capture so exports render correctly.

### 4.9 Cover images — curated gallery + upload
A curated gallery of seven royalty-free event photos (conference, wedding, party, workshop, concert, dinner, meetup) lets organizers pick a cover in one tap, or upload their own (≤1.5 MB, stored as base64). Covers flow through the event card, the event banner, and the Elegant/Bold passes, with graceful fallback to the brand gradient.

### 4.10 Navigation system
A sticky top nav with the EventPass logo (always returns to the dashboard) and a clickable **breadcrumb** trail. Nested screens use clear back affordances: a frosted **back button** on the event banner, and a labelled back action elsewhere. On mobile the inline actions collapse into a **hamburger menu**.

### 4.11 Light & dark mode
A theme toggle switches the entire UI between a light and a warm-neutral dark mode; the preference is saved to `localStorage` and restored on load.

### 4.12 Motion & micro-interactions
Spring-physics animations (via the Web Animations API — the vanilla equivalent of Framer Motion) run throughout: hero entrance, scroll-reveal on landing sections, staggered card/row reveals, drawer spring-in, pass "pop" on edits, and a tap response on every interactive element. All motion respects `prefers-reduced-motion`.

### 4.13 Seeded demo data
On first load the app seeds three realistic events (a summit, a wedding, a meetup) with cover images and guest lists (some pre-checked-in), so the dashboard is populated immediately and the verification flow is demonstrable end-to-end. A "Try a demo" action adds a further sample event on demand.

### 4.14 Mobile-first responsive design
Every screen is designed for a phone first and scales up: the hero stacks, the feature grid reflows 3→2→1, the pass drawer becomes a bottom sheet, the cover gallery drops to three columns, and the footer collapses to a single column.

---

## 5. User Inputs

| Field | Type | Required | Notes |
|---|---|---|---|
| Event name | Text | Yes | Prominent on the pass |
| Event date | Date | Yes | |
| Event time | Time | Yes | |
| Venue / location | Text | Yes | |
| Organizer name | Text | No | Shown as "Organized by" |
| Organizer contact | Text | No | Email/phone etc. |
| Brand colour | Swatch picker (8) | No | Defaults to green |
| Template | Select (3) | No | Minimal / Elegant / Bold |
| Cover image | Gallery pick or upload | No | 7 presets or ≤1.5 MB upload |
| Attendee name | Text | Yes | One per pass |
| Pass type | Select | Yes | General / VIP / Speaker / Staff |

---

## 6. User Flow

**First-time / create flow**
1. Land on the homepage — value prop, sample pass, single primary CTA.
2. Open the app (no sign-up) — dashboard appears, pre-seeded with demo events.
3. Create a new event and fill in details + branding.
4. Add attendees — single, pasted list, or CSV import.
5. Open a guest's pass — the drawer slides in with a live preview.
6. Adjust template / colour / status; the pass updates instantly.
7. Download as PNG or PDF, or share.

**Verification (check-in) flow**
1. A guest's QR is scanned (or "Simulate scan" is tapped).
2. The verification screen opens, finds the pass, and auto-marks it used.
3. "Access granted" is shown; a repeat scan shows "Already checked in."

**Returning user:** lands directly on the **dashboard** (their saved events), skipping the create step.

---

## 7. System Architecture

A solo, design-led, AI-assisted, **buildless** stack — no npm, no bundler, no framework, **no backend server**.

| Layer | Choice | Why |
|---|---|---|
| **Frontend** | Pure HTML, hand-written CSS (design-token system), Vanilla JS | No build step; three files (`index.html`, `styles.css`, `app.js`). |
| **Data persistence** | Browser **localStorage** | Events, attendees, theme, and seed flag stored as JSON; persists across refreshes and sessions. |
| **QR generation** | `QRious` (CDN) | Renders the verification-URL QR to a data URL. |
| **PNG export** | `html2canvas` (CDN) | Captures the pass DOM at 3× scale. |
| **PDF export** | `jsPDF` (CDN) | Wraps the captured image in a pass-sized PDF. |
| **Icons** | Inline **Lucide** SVG paths | Embedded in JS and hydrated at runtime — zero external font, cannot 404. |
| **Cover images** | Unsplash preset URLs + base64 uploads | Presets need network (graceful gradient fallback); uploads are inline. |
| **Fonts** | Fraunces (display) + Hanken Grotesk (UI), Google Fonts | Distinctive, warm, professional. |
| **Hosting** | Vercel / Netlify (static) | Drag-and-drop or Git deploy; instant live link. |

**Persistence model:** data lives in the browser and survives refreshes/sessions; it is device/browser-local and not synced. This is an intentional MVP scope (auth is optional for this product) that keeps the live demo frictionless.

**Production direction:** a hosted backend (e.g. Supabase: PostgreSQL + Auth + Storage) would replace localStorage to enable real accounts, cross-device sync, server-side cover storage, and shared multi-device QR check-in. The data model is shaped to migrate cleanly. See §14.

---

## 8. Data Model

Stored in `localStorage` as JSON arrays mirroring a relational structure. Keys: `eventpass.events`, `eventpass.attendees`, `eventpass.theme`, `eventpass.seeded`. IDs use `crypto.randomUUID()`.

```
event
  id              string (uuid)
  event_name      string
  date            string (YYYY-MM-DD)
  time            string (HH:MM)
  venue           string
  brand_color     string (hex)
  template        string  (minimal | elegant | bold)
  cover_image     string  (preset URL or base64 data URL, optional)
  organizer_name  string
  organizer_details string (optional)
  created_at      string (ISO)

attendee
  id              string (uuid)
  event_id        string (→ event.id)
  attendee_name   string
  pass_type       string  (General | VIP | Speaker | Staff)
  qr_code         string  (unique verification token, uuid)
  pass_status     string  (used | unused)
  checked_in_at   string  (ISO, set on first verification)
  created_at      string (ISO)
```

**Rules:** every `attendee.qr_code` is unique; deleting an event removes its attendees in app logic; the QR encodes `<site>#/verify/<qr_code>`.

---

## 9. Pages & Screens

| Screen | Purpose |
|---|---|
| Landing | Value prop, animated hero with sample pass, feature grid, centered CTA band, footer |
| Dashboard | Grid of event cards (date chip, cover, template tag, guest/check-in count) |
| Create / Edit event | Form: details, organizer, colour swatches, template, cover gallery/upload |
| Event detail | Banner hero (cover + meta), searchable attendee list, add/bulk actions |
| Pass drawer | Slide-in/bottom-sheet: live pass, template, colour, status, export/share, simulate-scan |
| Verify | Full-screen QR landing: access granted / already checked-in / invalid |

Modals: add attendee, bulk upload (CSV / paste). Plus a mobile hamburger menu and toast notifications.

---

## 10. Pass Templates

**Minimal** — white card, brand accent bar at top, dark text, QR bottom-right. Professional, prints cleanly.
**Elegant** — warm brand gradient, italic serif title, light text. Suits weddings and upscale events.
**Bold** — solid brand background, centred content, large QR. Confident, for energetic meetups/conferences.

All adapt to the chosen brand colour and any cover image, and share one overlap-proof flex layout.

---

## 11. Constraints

- Works fully on mobile and desktop browsers.
- A pass is downloadable **without an account** — no auth anywhere in the MVP.
- All data **persists in the browser** (localStorage); device/browser-local, not synced.
- Each attendee's **QR code is unique** and encodes a verification URL.
- PNG/PDF export renders correctly across major browsers.
- Ships as a **live web link** — no APK / native build.
- Buildless: no npm, no bundler, no framework, no backend server.
- Icons are self-contained (inline SVG); cover presets require network with gradient fallback.

---

## 12. Success Criteria

| Metric | Target |
|---|---|
| Time to first pass | Under 3 minutes from cold start |
| Bulk import | 50 attendees via CSV without errors |
| Render fidelity | Pass renders correctly on mobile and desktop |
| QR scannability | QR opens the verification screen on a standard phone |
| Verification | First scan marks used; repeat scan shows already-checked-in |
| Load performance | Loads in under 3 seconds on a standard connection |

---

## 13. Out of Scope for MVP

- Payment / ticket-purchase integration.
- Cross-device / multi-scanner shared check-in (per-browser only in MVP).
- Native mobile app (iOS / Android).
- Multi-language / localization.
- Recurring or templated event series.

---

## 14. Future Considerations

The headline next step is **adopting a hosted backend** (e.g. Supabase) to replace localStorage — unlocking real accounts, cross-device sync, server-side cover storage, and a shared multi-device QR check-in dashboard for door staff. Further directions: transactional email delivery of passes, analytics on downloads and check-ins, paid tiers with custom domains, and saved organizer branding presets. The §8 data model is intentionally shaped to migrate into relational tables with minimal change.
