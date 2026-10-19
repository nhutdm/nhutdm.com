# nhutdm.com

Digital business card of Nhut Duong — full stack developer and consultant.
Built with [Astro](https://astro.build) — static output, TypeScript (strict
preset), deployed to Cloudflare Workers static assets. `DESIGN.md` is the
design system spec; the live token layer is `src/styles/global.css`.

## Tech Stack

- [Astro](https://astro.build) ^7.3 (static output, zero-JS) — Fonts API
  (self-hosted DM Sans + Source Serif 4 + IBM Plex Mono via the Fontsource
  provider), OpenGraph card rendered at build time (satori +
  @resvg/resvg-js, fonts vendored in-repo)
- [Tailwind CSS](https://tailwindcss.com) v4 via the `@tailwindcss/vite`
  plugin (design tokens in `src/styles/global.css`)
- [Biome](https://biomejs.dev) 2.x for linting and formatting (incl.
  `.astro` files)
- TypeScript with the `astro/tsconfigs/strict` preset
- Deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/)
  as static assets (Wrangler, worker `nhutdm-com`)

Features: one-screen mobile card (100dvh), two-tone desktop card object,
vCard 3.0 at `/nhut-duong.vcf` (native contact flow via `Content-Disposition`),
inline-SVG QR to the card URL, Person JSON-LD, branded 404 mini-card.

Note: builds fetch Fontsource fonts on a cold cache — network access is
needed for the first build; the OG-card fonts are vendored in-repo
(`src/assets/og-fonts/`) and need no network.

## Prerequisites

- Node.js `>= 22.12.0`
- npm

## Project Structure

```text
/
├── public/            # Static assets (favicons, manifest, robots.txt, _headers, avatar.webp)
├── src/
│   ├── assets/        # Vendored OG fonts (og-fonts/)
│   ├── components/    # Astro components (QrCode, og-card)
│   ├── data/          # site-config.ts (title, description, phone, socials, quickLinks)
│   ├── layouts/       # BaseLayout.astro (head, canonical, OG/Twitter, JSON-LD prop, card-stage)
│   ├── lib/           # vcard.ts
│   ├── pages/         # File-based routes (index, 404, nhut-duong.vcf.ts, og/default.png.ts)
│   └── styles/
│       └── global.css # Tailwind v4 entry: Signal tokens, @theme inline fonts, card layout
├── astro.config.mjs   # Astro configuration (site, fonts, tailwind vite)
├── biome.json         # Biome lint/format configuration
├── tsconfig.json      # Extends astro/tsconfigs/strict, @/* path alias
├── wrangler.jsonc     # Cloudflare Workers static assets config (serves ./dist)
└── dist/              # Build output (generated)
```

## Commands

All commands are run from the root of the project:

| Command           | Action                                            |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Installs dependencies                             |
| `npm run dev`     | Starts local dev server at `localhost:4321`       |
| `npm run build`   | Builds the production site to `./dist/`           |
| `npm run preview` | Previews the build locally                        |
| `npm run check`   | Lints + formats (Biome, applies safe fixes)       |
| `npm run ci`      | Full gate: `biome ci && astro check && astro build` |

## Deployment

Deploy is manual and owner-run: `npm run build && npx wrangler deploy`.
The site deploys to Cloudflare Workers static assets, configured in
`wrangler.jsonc`:

- `assets.directory` points at the Astro build output (`./dist`) — always
  run `npm run build` first.
- `assets.not_found_handling: "404-page"` serves the built `404.html`
  (with a 404 status) for unknown routes.
- `public/_headers` pins the vCard download disposition (honored by
  Workers static assets).
- Worker name is `nhutdm-com`.

## Learn More

- [Astro documentation](https://docs.astro.build)
- [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
