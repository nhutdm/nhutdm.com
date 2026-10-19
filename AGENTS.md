## Development

Package manager: npm. Node >= 22.12.0 required.

Astro 7 static site (`site: https://nhutdm.com`) — one page plus a branded
404. Fonts are managed by the Astro Fonts API (`fonts` in
`astro.config.mjs`, Fontsource provider): DM Sans + Source Serif 4 +
IBM Plex Mono, latin subset — referenced via `<Font />` from `astro:assets`
in `BaseLayout.astro` with `preload`. GOTCHA: builds need network access on
a cold cache (`.astro/fonts`); self-hosted thereafter — no CDN in
production.

vCard: `src/pages/nhut-duong.vcf.ts` builds vCard 3.0 from
`src/data/site-config.ts` (name, title, org, email, phone, URLs,
X-SOCIALPROFILE, ADR) with CRLF line endings. `public/_headers` serves it
with `Content-Disposition: attachment; filename="nhut-duong.vcf"` so every
mobile browser hands it to the native contact editor (Workers static
assets honor `_headers`). No TEL line when `siteConfig.phone` is unset.
Owner ruling: contact channels are Call (public number) + Email only —
no WhatsApp/Zalo.

QR: `src/components/QrCode.astro` encodes its `payload` prop at build time
with `uqr` into an inline SVG (navy modules on a background-color rect).
The card passes `siteConfig.siteUrl` with ecc `H` (small payload, dense
error correction, decodes from a raw screenshot at 1x). Do not embed the
vCard in the QR: ~470 bytes forces ecc `L` and an ~85-unit grid that
struggles screen-to-screen scanning — measured, not guessed.

OpenGraph: `src/pages/og/default.png.ts` → `renderOGCard`
(`src/components/og-card.ts`, satori + @resvg/resvg-js). Fonts vendored at
`src/assets/og-fonts/` (static instances) — no network needed. GOTCHAS:
satori cannot parse variable TTFs; the root container must be sized in
explicit px with `boxSizing: border-box`; the endpoint file must keep the
`.png` in its name.

Deployment: Cloudflare Workers static assets via `wrangler.jsonc`
(`name: "nhutdm-com"`, `assets.directory: ./dist`,
`not_found_handling: "404-page"` serves the built `404.html` with a 404
status). Deploy is owner-run only: `npm run build && npx wrangler deploy`
(source `/opt/data/.env` for `CLOUDFLARE_API_TOKEN`; wrangler resolves the
account from the token). The custom domain nhutdm.com is attached via the
Workers Domains API at cutover.

## Design System

The visual system is Signal: deep navy / bone / muted gold, Source Serif 4
display, DM Sans body/UI, IBM Plex Mono labels, 4px radii. `DESIGN.md` at
the repo root is the read-only spec; the live token layer is `:root` in
`src/styles/global.css`.

### Mandatory instructions for UI

1. Use EXCLUSIVELY the tokens defined as CSS variables in
   `src/styles/global.css`.
2. Follow the typographic scale in `DESIGN.md` without inventing
   intermediate sizes.
3. Every interactive element needs hover and focus-visible states
   (`outline: 2px solid var(--ring)`); every touch target is ≥44px.
4. Inviolable: no emojis in UI, no pure black, no 3-equal-column rows,
   `100dvh` never `h-screen`, reduced-motion guard, light rendition only.
5. Source files carry no comments (owner decree). Stateful classes live
   unlayered in `global.css` — arbitrary-variant utilities lose the
   cascade inside `@layer utilities`.

### Quick token reference

- Ink / primary: `#1c2644` · navy-alt `#232f55` · bone stage `#e2dcd0`
- Gold decoration `#c8a870` (never text) · gold-text `#7a5f34` · muted
  `#5b6377` · surface `#f0ece3` · border `#d7d1c3` · ring `#9a7a44`
- Name: Source Serif 4 700 · Body: DM Sans 400 · Labels: IBM Plex Mono
- Radius 4px · QR: inline SVG, navy on surface

### Files that must NOT be edited

- `DESIGN.md` (read-only spec)
- `AGENTS.md` (this file)
- `package-lock.json` (managed by npm)

## Layout

- `src/data/site-config.ts` — single source of truth: title, description,
  email, public phone, socials, and the derived `quickLinks`
  (Call + Email).
- `src/layouts/BaseLayout.astro` — head (title `Name | Page`, canonical,
  OG/Twitter, favicon set), the `.card-stage` body wrapper, and an optional
  `jsonLd` prop (the home page passes the Person schema with `sameAs`
  socials).
- `src/pages/index.astro` — the card. Mobile (<768px): full-bleed,
  exactly one screen; `.identity` is `display: contents` and flex `order`
  (contact 10, socials 20) produces the stacked order from one DOM.
  Desktop (≥768px): grid `1.25fr / 0.85fr`, card face on the deeper-bone
  stage; socials and QR pin to their column bottoms (`margin-top: auto`),
  and the QR caption shares the socials' text axis (44px centered box).
  The keywords line (`APPLIED AI · AGENTIC WORKFLOWS · FULL STACK`) stays
  on one row at both breakpoints: mobile at 0.6875rem / 0.1em, desktop at
  0.6875rem / 0.08em with slim separator padding — the separator is a
  standalone inline `<span class="sep">` between bare text tokens with
  symmetric gaps (measured 3–4px each side).
- `src/pages/404.astro` — the mini-card: kicker, `404.` with gold dot,
  gold rule, italic voice ("No ink on this page."), `NHUTDM.COM →` back
  link; `noindex`, vertically centered, same card treatment at desktop.
- Short screens: `@media (max-height: 720px)` reduces avatar, name, row
  padding, and QR so the card still fits one screen — keep any new
  element inside that budget.
- Path alias: `@/*` → `src/*` (tsconfig). Never `.ts`-suffixed relative
  imports.

## Workflow

- CI gate before any ship: `npm run ci` (biome ci && astro check &&
  astro build) — never pipe it through `tail` (a pipe masks the exit code
  and has shipped a stale dist). Lint fixes: `npx biome check --write`.
- Workers commit only. Push, deploy, and domain changes are owner-run.
- Any trade-off or deviation from DESIGN.md: stop and ask, never choose
  silently.
