---
version: "1.0"
name: "Signal"
description: "Signal — the design system of nhutdm.com. A light bone-paper calling card carried by Source Serif 4 typography, deep navy ink, and a single muted-gold accent. One committed light rendition; every element must justify its existence against not being there."
colors:
  primary: "#1c2644"
  secondary: "#232f55"
  tertiary: "#e2dcd0"
  neutral: "#c8a870"
  surface: "#f0ece3"
typography:
  h1:
    fontFamily: Source Serif 4
    fontSize: 2.5rem
    fontWeight: 700
  body-md:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
  mono:
    fontFamily: IBM Plex Mono
    fontSize: 0.875rem
spacing:
  sm: 1.0rem
  md: 2.0rem
  lg: 4.0rem
components:
  rule-gold:
    height: 3px
    width: 88px
    backgroundColor: "{colors.neutral}"
---

## Overview

Signal is the design system of a digital business card: a one-page calling
card where typography and negative space carry authority. The canvas is warm
bone paper, the ink is deep navy, and one muted gold accent is spent only on
rules, dots, and small caps kickers — never on anything that shouts.

The register is institutional-editorial: the confidence of engraved
stationery, translated to a fast static web page. Source Serif 4 gives the
name the optical refinement of a Plantin; DM Sans keeps body reading quiet;
IBM Plex Mono marks metadata and actions as the apparatus of the card.

There is exactly one rendition: light. No dark mode, no theme toggle, no
boot script. The bone paper is the design.

- Density: 8/10 — Dense
- Motion: 2/10 — Minimal
- **Style:** Institutional, Editorial, Classical-Serif, Restrained
- **Keywords:** bone paper, deep navy, muted gold, calling card, engraved
- **Light/Dark:** Light only

## Colors

| Token | Hex | Role |
| --- | --- | --- |
| `--background` | `#f0ece3` | Bone paper — the page and the card face |
| `--foreground` | `#1c2644` | Deep navy — ink, headings, links, QR modules |
| `--primary` | `#1c2644` | Same navy as utility primary |
| `--navy-alt` | `#232f55` | Save Contact hover |
| `--bone` | `#e2dcd0` | Desktop stage backdrop (the desk the card sits on) |
| `--gold` | `#c8a870` | Rules, dots, decoration only — 1.92:1 on bone, **never body text** |
| `--gold-text` | `#7a5f34` | The only gold permitted as text (kicker, back link) — 5.07:1 |
| `--muted-foreground` | `#5b6377` | Secondary text, metadata — 5.1:1 |
| `--border` | `#d7d1c3` | Hairlines: card edge, detail rows |
| `--ring` | `#9a7a44` | Focus rings |

Contrast law: WCAG AA (4.5:1) for all body text; decoration gold may fall
below AA only because it never carries information alone.

## Typography

- **Name:** Source Serif 4 — 700, 2.5rem mobile / 3.25rem desktop, one line,
  with the gold dot suffix
- **404 title:** Source Serif 4 — 700, 3.5rem, gold dot suffix
- **Voice line:** Source Serif 4 — italic, muted, 0.8125rem mobile /
  1.0625rem desktop
- **Body / values:** DM Sans — 400, 0.9375rem
- **Mono label:** IBM Plex Mono — uppercase, 0.6875rem mobile / 0.75rem
  desktop (the keywords line stays at 0.6875rem on desktop so three tokens
  fit one row), tracking 0.14–0.18em (keywords line 0.08–0.1em), tabular
  numerals — kickers, actions, rows, captions

## Layout

- **Mobile (<768px):** full-bleed single column, exactly one screen
  (`min-height: 100dvh`; short screens ≤720px reduce avatar, name, rows,
  QR). Order: avatar → kicker → name → keywords → gold rule → voice →
  Save Contact → quick links → detail rows → QR → socials. Vertical slack
  pools above the QR via `margin-top: auto`.
- **Desktop (≥768px):** card object, max-width 42rem, hairline border,
  4px radius, bone face `#f0ece3` on the deeper-bone stage `#e2dcd0`
  (48px stage padding). Two asymmetric columns `1.25fr / 0.85fr`, 40px
  column gap. Identity left (socials pinned bottom); contact right
  (QR + caption centered, bottom). Mobile reordering uses flex order —
  one DOM, no duplication.
- **404:** the same card treatment as a mini-card (max 26rem), vertically
  centered: kicker → 404. → gold rule → italic voice → back link.
- Touch targets ≥44px everywhere, including quick links, socials, and the
  QR caption row. No horizontal overflow at any width.

## Motion

- Hover: color transitions only, 200ms
- Entry: rise — fade + translateY(16px→0), 420ms ease-out, 80ms stagger via `--i`
- `prefers-reduced-motion`: everything zeroed
- Only transform and opacity animate

## Shapes

Base corner radius: 4px (`--radius: 0.25rem`) — card, avatar, buttons.

## Grammar

- **Gold dot** — suffixes the name and the 404 title only.
- **Gold middots** — separate list tokens in mono lines (keywords, quick
  links, socials, QR caption).
- **Gold rule** — 3px × 88px, the major separator under the header block.
- **OpenGraph card** repeats the poster grammar: bone canvas, mono kicker,
  serif name + gold dot, gold rule, mono footer.

## Do's and Don'ts

- No emojis in UI
- No pure black (`#000000`)
- No 3-column equal-width layouts
- No `h-screen` — use `min-h-[100dvh]`
- No dark mode, theme toggle, or theme boot script
- No gold as body text — `--gold-text` only
- No AI copywriting clichés
- Do verify AA contrast for every text/token pairing
- Do keep touch targets ≥44px
- Do justify every element against simply not being there

## Use Case

nhutdm.com — the digital business card of Nhut Duong: one page, one screen
on mobile, a floating card object on desktop. Contact channels: Call (public
number) and Email; Save Contact serves a vCard 3.0; the QR opens the card
URL. The system extends naturally to the 404 mini-card and OG cards because
it is typography-first and rendition-locked.
