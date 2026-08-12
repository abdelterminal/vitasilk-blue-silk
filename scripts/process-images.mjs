// Asset prep for the Blue Silk landing page.
// Re-run with: node scripts/process-images.mjs
//
// Expects the generated originals (see WORKFLOWS.md) in SRC, named as below.
//
// The hero is handled separately by scripts/cutout-hero.mjs, which removes the
// background — the light sweep in Hero.tsx masks itself to the bottle's
// silhouette, which only works with real transparency.
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const SRC = "C:/Users/Brandshift 01/Downloads/vitasilk blue img";
const OUT = "assets/images";
mkdirSync(OUT, { recursive: true });

// Section shots → web-sized WebP. [slot name, output filename, width]
//
// The slot name is matched WITHOUT an extension: drop `hair-after.<anything>`
// into SRC and it is picked up. Image generators hand back .png, .jpg, .jfif or
// .webp depending on the tool and the download path, and renaming every delivery
// by hand is the kind of step that gets skipped — sharp decodes by content, not
// by extension, so there is nothing to gain by insisting on one.
const EXTS = ["png", "jpg", "jpeg", "jfif", "webp"];

const shots = [
  ["argan-aloe-macro", "argan-aloe-macro.webp", 1600],
  ["studio-pedestal", "studio-pedestal.webp", 1600],
  ["brand-story-dark", "brand-story-dark.webp", 2000],
  ["hair-before", "hair-before.webp", 1200],
  ["hair-after", "hair-after.webp", 1200],
  ["studio-front", "studio-front.webp", 1200],
  ["testimonial-side", "testimonial-side.webp", 1000],
];

const resolve = (slot) => EXTS.map((e) => `${SRC}/${slot}.${e}`).find(existsSync);

for (const [slot, out, width] of shots) {
  const from = resolve(slot);
  if (!from) {
    console.warn(`skipped ${out}: no ${slot}.{${EXTS.join(",")}} in ${SRC}`);
    continue;
  }
  await sharp(from)
    .rotate() // respect EXIF orientation
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`${OUT}/${out}`);
  console.log(`${out} ✓  (from ${from.split("/").pop()})`);
}

console.log("done — the hero comes from cutout-hero.mjs or hero-from-cutout.mjs");
