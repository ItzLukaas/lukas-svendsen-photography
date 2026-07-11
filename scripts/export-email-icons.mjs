import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "brand", "email");

mkdirSync(outDir, { recursive: true });

const icons = {
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" fill="none"/>
    <path fill="#ffffff" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.28h4.56V23.5H.22V8.28zM8.5 8.28h4.37v2.08h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7V23.5h-4.56v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.37 1.61-2.37 3.27v6.31H8.5V8.28z"/>
  </svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="4" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="#ffffff"/>
  </svg>`,
  web: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.25" stroke="#ffffff" stroke-width="1.5"/>
    <ellipse cx="12" cy="12" rx="4" ry="9.25" stroke="#ffffff" stroke-width="1.5"/>
    <path stroke="#ffffff" stroke-width="1.5" d="M3.5 9.5h17M3.5 14.5h17"/>
  </svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="5.5" width="19" height="13" rx="1.5" stroke="#ffffff" stroke-width="1.5"/>
    <path stroke="#ffffff" stroke-width="1.5" d="M3.5 7.5 12 13.5l8.5-6"/>
  </svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path fill="#ffffff" d="M8.5 3.5c.4 0 .8.2 1 .55l1.35 2.35c.2.35.15.8-.12 1.1l-1.2 1.35c.95 1.75 2.45 3.25 4.2 4.2l1.35-1.2c.3-.27.75-.32 1.1-.12l2.35 1.35c.35.2.55.6.55 1v2.35c0 .65-.55 1.2-1.2 1.2C10.55 18.5 5.5 13.45 5.5 6.7c0-.65.55-1.2 1.2-1.2H8.5z"/>
  </svg>`,
};

for (const [name, svg] of Object.entries(icons)) {
  const pngPath = join(outDir, `${name}.png`);
  await sharp(Buffer.from(svg))
    .resize(48, 48)
    .png()
    .toFile(pngPath);
  console.log(`Wrote ${pngPath}`);
}
