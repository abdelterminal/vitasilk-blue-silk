# Asset Workflows — Vitasilk Blue Silk

Image brief for the Blue Silk landing page. Every prompt below targets the
**midnight blue** theme: midnight `#0a1020`, navy `#101c33`, royal `#1e3a8a`,
gold `#c9a227`, silk `#eef2fa`.

> **⚠ Read this before generating anything.** The `vitasilk_coffee_extract`
> sibling shipped with a documented, still-unresolved defect: all eight of its
> delivered shots came back cream-and-beige light-luxe, art-directed to the *24K*
> project's ivory palette, against a near-black page. Its README still carries a
> "Palette mismatch — unresolved" section as a result. Full-bleed sections then
> read as bright panels punched into a dark scroll, and there is no cheap fix —
> colour-correcting a warm bright shot to deep blue never lands.
>
> So: **every prompt in this file states a deep blue ground explicitly**, and any
> delivered shot that arrives on a bright, warm or neutral ground is **rejected
> and regenerated**, not corrected. That is the single rule most likely to be
> skipped and most expensive to skip.

## Rules (always)

- **Product fidelity is sacred.** Never generate the bottle from a text prompt
  alone. Every product shot starts from a real photograph supplied as reference
  or edit input. Reject any output with a warped label, garbled text, or a cap
  that has drifted from the real one.
- The Blue Silk label is dense — `Vitasilk Professional`, `BLUE SILK`, an
  arabesque band, `BRAZILIAN PROTEIN`, `ARGAN OIL AND ALOE VERA`, an Arabic line,
  `PROFESSIONAL USE`, `1L`, `0%`. Generative models mangle small type. Judge every
  output at 100% zoom on the label, not on the silhouette.
- The bottle is **royal blue with a gold collar, gold base band and a black
  pump**. The black pump is the detail most often lost — models like to make it
  gold to match. Check it every time.
- Keep every shot on the midnight / royal / gold palette. Regenerate rather than
  colour-correct.
- Model: **Google Nano Banana 2** — Flash for drafts, Pro for the final pass.
- Deliver into `assets/images/` under the exact filenames in the table below.
  The code imports those names directly; a rename is a build error.

## Source photography

Put generated originals in `C:/Users/Brandshift 01/Downloads/vitasilk blue img/`
named per the **slot name** in the table below — that is the path `SRC` in
`scripts/process-images.mjs` points at.

**The extension does not matter.** `process-images.mjs` resolves each slot by
basename against `.png / .jpg / .jpeg / .jfif / .webp`, so `hair-after.jfif`
straight out of the generator is picked up with no renaming. sharp decodes by
content rather than by extension, so there was nothing to gain by insisting on
one — and hand-renaming every delivery is exactly the step that gets skipped.

The bottle reference is in good shape: the shipping hero was cut from a
1086×1448 upscale and trims to **449 px wide**, which covers a 192 CSS px LCP
element at 2× comfortably. Only worth revisiting if you want it crisp at 3×.

## Shot list

| # | Slot | Source slot name (in `SRC`) | Output | Ratio |
|---|------|-----------------------------|--------|-------|
| 1 | Hero | `bottle-source` *(passed as an argument)* | `bottle-hero.webp` | 3:4 → cutout |
| 2 | Ingredients | `argan-aloe-macro` | `argan-aloe-macro.webp` | 16:9 |
| 3 | Promise card | `studio-pedestal` | `studio-pedestal.webp` | 16:9 |
| 4 | Brand story | `brand-story-dark` | `brand-story-dark.webp` | 16:9 |
| 5a | After | `hair-after` | `hair-after.webp` | 3:4 |
| 5b | Before | `hair-before` | `hair-before.webp` | 3:4 |
| 6 | Offer + OG | `studio-front` | `studio-front.webp` | 1:1 |
| 7 | Testimonials | `testimonial-side` | `testimonial-side.webp` | 4:5 |

**Status: all eight slots hold real photography** (~1.7 MB total), installed
2026-07-28 and all on deep blue grounds — the palette failure that the Coffee
Extract sibling never resolved did not recur here.

`SRC` also holds `_spare-bottle-bubbles.png`, an unused alternate product shot
(bottle with soap bubbles on a neutral grey ground). It is off-palette for any
current slot; kept in case a future section wants it.

`scripts/make-placeholders.mjs` never overwrites a file that already exists, so
it stays safe to re-run — it will now report every slot as "already present".

---

## 1 — Hero bottle (`bottle-hero.webp`)

The LCP element, and the only shot that must ship with **real transparency**:
`Hero.tsx` feeds the file to CSS `maskImage` so the light sweep is clipped to the
bottle's own silhouette. A flat white background makes the sweep cross the whole
box and the effect collapses.

> Studio product photograph of a 1 litre cosmetic pump bottle, deep royal blue
> opaque plastic with a polished gold collar, a gold band at the base and a matte
> black pump head. Straight-on, centred, slight three-quarter turn. Soft cool key
> light from the upper left, gold rim light down the right edge to separate the
> blue from the ground. Seamless mid-grey background, smooth and continuous. No
> props, no reflections on the floor, no text overlays. Photorealistic, sharp
> label.

Two constraints come from `scripts/cutout-hero.mjs`, which flood-fills inward
from the border comparing each pixel to its already-classified *neighbour*:

- **The bottle must not touch the left or right frame edge.** The fill starts at
  every border pixel; if the product touches an edge, the fill seeds inside it.
- **The background must stay smooth and continuous.** Gradients and vignettes are
  fine — that is the whole point of the neighbour comparison — but a hard-edged
  prop or a second backdrop panel will stop the fill early and leave a slab
  behind.

Run it with the source as an argument:

```
node scripts/cutout-hero.mjs "C:/path/to/bottle.png"
```

**This bottle is the easy case, and that is worth knowing.** The script's header
comment records three methods measured against the *Coffee Extract* source and
why each failed — a beige bottle on a cream ground is genuinely hard. A saturated
royal-blue bottle on white is the opposite: the outline steps hard, the
background is flat, and the default knobs sealed the ring on the first pass with
no retuning. If you swap in a higher-resolution photo and it still works, do not
start turning knobs.

Knobs, in the order you would reach for them:

- `EDGE = 3` — Sobel magnitude counted as outline. Raise it if background texture
  is being traced; lower it if the ring breaks and the fill hollows the bottle.
- `CLOSE = 3` — dilation that seals pinholes in the ring, undone morphologically
  afterwards so the silhouette lands back on the true edge.
- `DENOISE = 1.5` — **do not set this to zero.** Renders carry faint per-row
  banding, and without the pre-blur that banding registers as horizontal edges
  and produces a matte striped like a venetian blind. On a JPEG source there is
  also ring artefacting along the hard blue/white boundary; raise this before
  touching `EDGE` if the matte comes back with a speckled fringe.

Check `scripts/_cutout-check.png` after every run — it composites the result over
magenta so halos and holes are obvious. Two failure signatures specific to this
product: a hollow bottle means the ring broke, and **a bitten or missing pump
head** means the fill walked into the black cap, which sits against white with
almost no gradient of its own.

## 2 — Ingredients macro (`argan-aloe-macro.webp`)

The formula shot. Argan leads the section, so argan leads the frame.

> Extreme macro still life: cracked argan nuts and glossy argan kernels beside a
> shallow dish of golden argan oil, with a cut aloe vera leaf showing its clear
> gel, arranged on a dark polished navy-blue stone surface. Cool directional
> light raking from the left, deep shadows, small gold specular highlights on the
> oil surface and the kernel edges. Deep blue and gold palette, no bright whites,
> no brown wood. Shallow depth of field. 16:9.

## 3 — Promise card (`studio-pedestal.webp`)

Sits at the top of the promise card in `ProblemPromise.tsx`, cropped fairly
short — keep the subject centred and leave headroom.

> The Blue Silk bottle on a low matte-black stone pedestal, three-quarter angle.
> Deep midnight-blue studio background with a soft pool of gold light behind the
> product. A few argan kernels and a sliver of aloe leaf at the base. Moody,
> premium, editorial product photography. 16:9.

## 4 — Brand story (`brand-story-dark.webp`)

Full-bleed parallax band. `BrandStory.tsx` veils only the **bottom 3/5** in
midnight, so the top two-thirds of the frame stays fully visible — put the
interest there and keep the lower third quiet enough to carry text.

This is the shot carrying the SKU's whole differentiator, so it must read as
**Morocco**, not as generic botanicals.

> Atmospheric Moroccan argan grove in the Souss valley at blue hour: gnarled
> argan trees silhouetted against a deep indigo sky with the last warm light low
> on the horizon, arid ground, distant Atlas foothills. A weathered wooden table
> in the near foreground holding cracked argan nuts and a small glass of golden
> argan oil. Deep blues and desaturated golds, cinematic, wide. 16:9.

## 5 — Before / after pair

**Order matters.** Generate the **after** first, then generate the **before** as
an *edit* passing the after-image as `references[{type: image}]`. Generating them
independently produces two different photographs, and the drag slider in
`BeforeAfter.tsx` reads as a jump cut mid-drag rather than a transformation.

**5a — after** (`hair-after.webp`):
> Back view of a woman with long, glossy, healthy dark hair falling in smooth
> defined lengths. Mirror shine, silky surface, no frizz. Cool key light with a
> gold rim light down one side, deep midnight-blue background. Luxury haircare
> advertisement. 3:4.

**5b — before** (`hair-before.webp`), as an edit of 5a:
> Keep the exact same woman, pose, framing, lighting and background — but the
> hair is dry, dull and frizzy, with flyaways, split ends and a matte lifeless
> texture. Same camera position.

## 6 — Offer card + OG image (`studio-front.webp`)

Worth the most effort of any shot: it is both the offer card and the Open Graph
image, so it is what people see when the link is shared. Generate at 1:1 2k and
upscale to 4k before downsizing.

> The Blue Silk bottle front-facing on a glossy dark surface with a soft
> reflection beneath it. Background is a midnight-blue-to-black gradient with a
> subtle gold glow behind the bottle. Gold collar, gold base band and black pump
> all clearly rendered. Label fully legible and sharp, straight-on. Premium
> e-commerce hero shot. 1:1.

## 7 — Testimonials (`testimonial-side.webp`)

Sits beside the quote carousel, cropped to a tall portrait — keep the face in the
upper half.

> Moroccan woman in her early thirties with long healthy dark hair, soft natural
> smile, looking slightly off-camera. Low-key lighting, deep midnight-blue
> background, gentle gold rim light on her hair. Natural skin texture, editorial
> beauty portrait. 4:5.

---

## Local processing

```
node scripts/make-placeholders.mjs        # fills any empty slot, never overwrites
node scripts/process-images.mjs           # SRC → resized WebP for slots 2–7
node scripts/cutout-hero.mjs <path>       # slot 1, cut out from a raw photo
node scripts/hero-from-cutout.mjs <path>  # slot 1, from an already-cut-out file
```

`assets/images/` is not tracked as a fixed set — but note it must **exist** before
`cutout-hero.mjs` runs, since that script writes without creating the directory
(`make-placeholders.mjs` does create it).

Use `hero-from-cutout.mjs` when the background was removed elsewhere (Magnific,
remove.bg, Photoshop). It also repairs **flattened previews** — if you "save
image as" on a background remover's web preview, the transparency checkerboard
is captured as literal grey pixels and the alpha channel comes back fully
opaque. That file looks right in a viewer and is unusable as an asset: the page
shows a chessboard behind the bottle, and the CSS mask sees a solid rectangle so
the light sweep crosses the whole box. The script detects this and rebuilds the
alpha. Prefer the tool's real transparent download when you can get it — a
reconstruction cannot recover the true antialiased edge, it approximates it.

Both processing scripts read their paths from constants at the top of the file.
