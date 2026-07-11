import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandDir = join(__dirname, "..", "public", "brand");
const source = join(__dirname, "..", "public", "images", "IMG_3454.webp");

mkdirSync(brandDir, { recursive: true });

const sizes = [128, 256];

for (const size of sizes) {
  const output = join(brandDir, `lukas-guldager-svendsen-portrait-${size}.jpg`);
  await sharp(source)
    .resize(size, size, {
      fit: "cover",
      position: "top",
    })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(output);
  console.log(`Wrote ${output}`);
}
