import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "brand");

mkdirSync(outDir, { recursive: true });

function createSvg(size) {
  const fontSize = Math.round(size * (56 / 180));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0a0a"/>
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="central"
    fill="#ffffff"
    font-family="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    font-size="${fontSize}"
    font-weight="300"
    letter-spacing="0.12em"
  >LS</text>
</svg>`;
}

const sizes = [300, 512, 1024];

for (const size of sizes) {
  const svg = createSvg(size);
  const pngPath = join(outDir, `lukas-svendsen-logo-${size}.png`);

  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  console.log(`Wrote ${pngPath}`);
}

const svg1024 = createSvg(1024);
const svgPath = join(outDir, "lukas-svendsen-logo.svg");
writeFileSync(svgPath, svg1024, "utf8");
console.log(`Wrote ${svgPath}`);
