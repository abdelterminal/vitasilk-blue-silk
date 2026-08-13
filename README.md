# Vitasilk Blue Silk — Landing Page

COD landing page for **Vitasilk Blue Silk 1L** — a formaldehyde-free Brazilian
protein treatment with Moroccan argan oil and aloe vera. Bilingual Arabic
(Moroccan Darija) / French, midnight blue theme (midnight / royal / gold).

Next.js 16 App Router · React 19 · Tailwind v4 · Motion.

## Getting started

```
npm install
npm run dev
```

Then open http://localhost:3000. Orders fall back to `data/orders.jsonl` until
`SHEETS_ENDPOINT` is configured, so the form works end to end with zero setup.

## Where things live

| What | Where |
|---|---|
| Prices, WhatsApp number, product name, domain | `lib/config.ts` |
| All copy, both languages | `dictionaries/fr.ts` (shape) + `ar.ts` |
| Palette, fonts, gold gradients | `app/globals.css` `@theme` |
| Section order | `app/page.tsx` |
| Order intake | `app/api/order/route.ts` + `apps-script/Code.gs` |
| Image brief and prompts | `WORKFLOWS.md` |

## Positioning

This SKU is **argan-first**. The sibling `vitasilk_coffee_extract` page leads on
Amazon/Brazil sourcing; here the Moroccan argan leads and the Brazilian protein
is the carrier — argan is the highest-trust word on the page for this audience,
and it is what separates the two SKUs on a shelf where both say "protéine
brésilienne". If you rewrite copy, keep that order: argan → aloe → protein.

**The product name stays in Latin letters in both languages** — "Vitasilk",
"Blue Silk", "Vitasilk Professional". It is what is printed on the bottle, so an
Arabic transliteration would not match what the customer is holding when the
parcel arrives. Arabic copy wraps around the Latin name rather than replacing it
(`"وعد Blue Silk"`, `"طبّقي Blue Silk خصلة بخصلة"`). Bidi handles the mixing —
the hero puts each word in its own block span, so there is no reordering to
manage.

The formula story follows the same order and it is load-bearing, not decorative:
aloe brings water in, hydrolysed protein fills the fibre, argan seals the cuticle
over the top. The `problem` section's whole argument is that piling on oil
without the first two steps is why nothing holds.

## Changing the price

Edit `PRICE_DH` and `OLD_PRICE_DH` in `lib/config.ts` — nothing else. Every
visible price derives from those two numbers through `formatDh`, and the discount
badge from `DISCOUNT_PCT`. The dictionaries take an already-formatted price as a
*function argument* and never hardcode one, so the copy cannot desync.

`formatDh` groups thousands with a narrow no-break space by hand rather than
using `toLocaleString`. That is deliberate: ICU data can differ between the Node
server and the browser, and the price renders inside the first viewport, so the
mismatch would surface as a hydration error.

## The contrast rules

Two rules, and the second one is specific to this palette.

**1. Gold carries text.** The page is midnight `#0a1020`, where brand gold
`#c9a227` measures **7.9:1**. Gold works at any size, and the `-on-dark` class
variants that the ivory `vitasilk_24k` sibling needs do not exist here. (On that
project gold is ~2:1 and cannot carry text at all — its entire type system is
built around the limit.)

**2. `royal` is a surface, never text.** `#1e3a8a` measures **1.85:1** on
midnight. It is a fill, border, gradient stop and glow colour only. The blue that
carries text is `azure` `#7ea8e8`, at 7.9:1. This is the rule a token sweep from
either sibling will silently break, because both of their accent colours *were*
text-capable — grepping for `text-royal` should always return nothing.

`royal` earns its keep in exactly two places: the hero halo in `globals.css`, and
the `SafetyBanner` top gradient stop at 30%. Non-text UI still needs 3:1, which
is why the inactive carousel dot in `Testimonials.tsx` is `bg-azure/60` (3.4:1)
rather than solid royal (1.6:1).

The tightest pair on the palette is `gold-deep` on `navy-light` at **4.56:1**.
That is why `navy-light` is `#16233c` and not something lighter — at `#1a2a47`
the same pair measures 4.17:1 and fails AA. Do not lighten the elevated surfaces.

Surfaces run darkest to lightest: `navy-deep` → `midnight` (page) → `navy` (alt
section) → `navy-light` (cards, pills, chips). Elevation goes *lighter*. Form
inputs are the deliberate exception — they stay recessed on `midnight`.

## Order intake (Google Sheets)

1. Create a Google Sheet.
2. **Extensions › Apps Script**, paste `apps-script/Code.gs`, run `setupSheet`
   once and approve the permissions.
3. **Deploy › New deployment › Web app**, execute as *Me*, access *Anyone*.
4. Copy the `/exec` URL into `.env.local` as `SHEETS_ENDPOINT`.

Read server-side only — never rename it to `NEXT_PUBLIC_*`, or the write endpoint
ends up in the client bundle where anyone can post to your sheet.

If Sheets fails, the route still appends the lead to `data/orders.jsonl` flagged
`sheetsError: true`, returns 502, and the form surfaces the WhatsApp fallback.
Orders are never silently dropped.

Three things are duplicated by design and must stay in sync: the phone regex
`/^(?:\+212|0)[5-7]\d{8}$/` (client and route), the qty bounds 1–5 (client and
route), and the `HEADERS` order in `Code.gs` against the keys the route sends.

The localStorage keys are namespaced per SKU (`vitasilk-blue-lang`,
`vitasilk-blue-offer-deadline`) so the four Vitasilk sites cannot collide if they
ever share a domain.

## Images

**All eight slots hold real photography** (~1.7 MB total), and all of it is on
deep blue grounds. That last part is the thing to protect: the Coffee Extract
sibling shipped with a still-unresolved palette mismatch because its shots came
back warm and bright against a near-black page, and there is no cheap fix once
that happens. Every prompt in `WORKFLOWS.md` states the ground explicitly —
reject an off-palette delivery rather than colour-correcting it.

Every image is a **static import**, so a missing file is a build error rather
than a blank box. `scripts/make-placeholders.mjs` exists to fill an empty slot
with an obvious gradient card so the build stays green; it never overwrites a
file that already exists, so it is safe to re-run at any point.

To replace a slot, drop the file into the source folder under the expected slot
name and re-run:

```
node scripts/process-images.mjs           # slots 2–7
node scripts/cutout-hero.mjs <path>       # slot 1, from a raw photo
node scripts/hero-from-cutout.mjs <path>  # slot 1, already background-removed
```

**The extension does not matter.** `process-images.mjs` resolves each slot by
basename against `.png / .jpg / .jpeg / .jfif / .webp`, so a file straight out of
the generator is picked up without renaming — sharp decodes by content, not by
extension.

The hero must stay transparent — `Hero.tsx` uses it as a CSS mask for the light
sweep. Both hero scripts write `scripts/_cutout-check.png`, the matte over
magenta, for eyeballing halos and holes; check the black pump head specifically,
since it is the part with the least separation from a light ground.
`WORKFLOWS.md` explains which knob does what.

The shipping hero was cut from a 1086×1448 upscale and trims to 449 px wide,
which covers the 192 CSS px LCP element at 2× comfortably.

### Why images live in `assets/`, not `public/`

They are *statically imported*, which buys two things. Content-hashed URLs, so a
swapped image can never serve stale — a `public/` URL never changes and
`next/image` sends `Cache-Control: max-age=14400`, meaning a replaced file shows
the old version for four hours. And dimensions read off the file itself, so there
are no width/height props to drift. Unimported files are not emitted at all.

`public/` holds only the two logo SVGs, referenced by plain path.

## Before going live

- [x] ~~Replace slots 2–7 with real photography on blue grounds~~ — done 2026-07-28
- [x] ~~Re-source the hero bottle photo at higher resolution~~ — done 2026-07-28
- [ ] Verify `WHATSAPP_NUMBER` in `lib/config.ts`
- [ ] Replace `SITE_URL` — still `localhost:3000`, which breaks the OG tags
- [ ] Set `SHEETS_ENDPOINT` in the deploy environment
- [ ] Confirm `PRICE_DH` (1499) and `OLD_PRICE_DH` (1700)

## Docker

```bash
echo "SHEETS_ENDPOINT=https://script.google.com/macros/s/AKfy…/exec" > .env
docker compose up -d --build
```

Serves on port `8087`, published on all interfaces. That is deliberate but
temporary: this page has no domain yet, so the port is how you reach it. Once a
domain exists, drop the `ports:` mapping and attach Traefik labels instead —
the VPS already runs a shared Traefik on 80/443. A reverse proxy in front is
what the Next.js self-hosting guide recommends, and it terminates TLS and
absorbs malformed requests that the Node server otherwise takes directly.

`.env` is gitignored. `SHEETS_ENDPOINT` is a live write handle to the order
sheet, so it is injected at runtime and never baked into a layer or prefixed
`NEXT_PUBLIC_`. Leave it unset and the page still runs, with orders falling
back to `data/orders.jsonl` in the `orders` volume.

The build is three stages ending in `node:22-alpine`: `npm ci`, then
`next build` producing `.next/standalone`, then a runtime holding only the
server, `.next/static` and `public/`. It runs as the non-root `nextjs` user.

Two things to leave alone unless you mean it:

- **`outputFileTracingIncludes` in `next.config.ts`** pulls `node_modules/sharp`
  into the standalone bundle. `sharp` is an *optional* dependency of Next, and
  tracing does not reliably follow it. Drop that entry and the image builds and
  starts fine, then 500s on the first optimised image — i.e. every image here.
- **`data/` is a named volume.** It holds the order fallback log, including
  leads flagged `"sheetsError": true` that never reached the Sheet. In the
  container's writable layer they would vanish on the next rebuild.

Orders survive redeploys:

```bash
docker compose exec web cat /app/data/orders.jsonl
```

The build needs egress to `fonts.googleapis.com` — `next/font/google` fetches
the typefaces at build time, not at runtime.

Before going live, set `SITE_URL` in `lib/config.ts` to the real domain. It is
compiled into the build, so changing it needs `up -d --build`, not a restart.
