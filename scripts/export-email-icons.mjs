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
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" fill="none"/>
    <path fill="#ffffff" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.73 3.73 0 0 1-1.38-.9 3.73 3.73 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.75.07-1.01.05-1.56.22-1.93.37-.48.19-.83.41-1.2.78-.37.37-.59.72-.78 1.2-.15.37-.32.92-.37 1.93-.06 1.23-.07 1.6-.07 4.75s.01 3.52.07 4.75c.05 1.01.22 1.56.37 1.93.19.48.41.83.78 1.2.37.37.72.59 1.2.78.37.15.92.32 1.93.37 1.23.06 1.6.07 4.75.07s3.52-.01 4.75-.07c1.01-.05 1.56-.22 1.93-.37.48-.19.83-.41 1.2-.78.37-.37.59-.72.78-1.2.15-.37.32-.92.37-1.93.06-1.23.07-1.6.07-4.75s-.01-3.52-.07-4.75c-.05-1.01-.22-1.56-.37-1.93a3.2 3.2 0 0 0-.78-1.2 3.2 3.2 0 0 0-1.2-.78c-.37-.15-.92-.32-1.93-.37-1.23-.06-1.6-.07-4.75-.07z"/>
    <path fill="#ffffff" d="M12 7.03a4.97 4.97 0 1 0 0 9.94 4.97 4.97 0 0 0 0-9.94zm0 8.19a3.22 3.22 0 1 1 0-6.44 3.22 3.22 0 0 1 0 6.44z"/>
    <circle fill="#ffffff" cx="17.34" cy="6.66" r="1.16"/>
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
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  console.log(`Wrote ${pngPath}`);
}
