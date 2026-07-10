import fs from "fs";
import path from "path";
import sharp from "sharp";

const ASSETS_DIR = "C:/Users/Bandit/.cursor/projects/h-LukasSvendsen/assets";
const IMAGE_IMPORT_DIR = "H:/LukasSvendsen/image-import";
const OUT_DIR = "H:/LukasSvendsen/public/images/clients";
const MANIFEST = "H:/LukasSvendsen/src/data/clients.generated.json";

const TARGET_H = 112;
const MAX_W = 440;

const SLUG_MAP = [
  ["3p-group", { id: "3p-group", name: "3P Group", alt: "3P Group logo", mode: "light" }],
  [
    "bygningen-vejle",
    { id: "bygningen", name: "Bygningen", alt: "Bygningen Vejle logo — Vejles kulturelle puls", mode: "light" },
  ],
  ["danskhaandbold", { id: "dansk-handbold", name: "Dansk Håndbold", alt: "Dansk Håndbold logo", mode: "light" }],
  ["billund-kommune", { id: "billund-kommune", name: "Billund Kommune", alt: "Billund Kommune logo", mode: "light" }],
  [
    "dgi",
    {
      id: "dgi",
      name: "DGI",
      alt: "DGI logo — Danske Gymnastik- og Idrætsforeninger",
      mode: "cutout",
    },
  ],
  ["ggif", { id: "ggif-handbold", name: "GGIF Håndbold", alt: "GGIF Håndbold logo", mode: "light" }],
  ["frisko", { id: "frisko", name: "Frisko", alt: "Frisko logo", mode: "light" }],
  ["magion", { id: "magion", name: "MAGION", alt: "MAGION Kultur og Idræt logo", mode: "light" }],
  [
    "logo-hvid",
    {
      id: "esbjerg-street-food",
      name: "Esbjerg Street Food",
      alt: "Esbjerg Street Food logo — Det Gamle Teater",
      mode: "light",
    },
  ],
  [
    "herreligaen",
    { id: "bambuni-herreligaen", name: "Bambuni Herreligaen", alt: "Bambuni Herreligaen logo", mode: "light" },
  ],
  ["vejle-kommune", { id: "vejle-kommune", name: "Vejle Kommune", alt: "Vejle Kommune logo", mode: "light" }],
  [
    "1748329421277",
    {
      id: "royal-fireworks",
      name: "Royal Fireworks",
      alt: "Royal Fireworks logo",
      mode: "dark-on-light",
      maxW: 440,
      outId: "royal-fireworks-2026",
    },
  ],
  ["venstre", { id: "venstre", name: "Venstre", alt: "Venstre logo", mode: "light" }],
  [
    "stay-and-sleep",
    {
      id: "stay-and-sleep",
      name: "Stay and Sleep",
      alt: "Stay and Sleep logo — Rest, Relax, Recharge",
      mode: "light",
    },
  ],
];

function matchLogo(filename) {
  const key = filename.includes("images_")
    ? filename.split("images_")[1]
    : filename.replace(/\.png$/i, "");

  for (const [needle, meta] of SLUG_MAP) {
    if (key.includes(needle)) return meta;
  }

  const slug = key
    .replace(/-[a-f0-9]{8}-[a-f0-9-]+\.png$/i, "")
    .replace(/_/g, "-")
    .replace(/-logo.*$/i, "")
    .toLowerCase();

  const name = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    id: slug,
    name,
    alt: `${name} logo`,
    mode: "light",
  };
}

function lum(r, g, b) {
  return Math.max(r, g, b);
}

function chroma(r, g, b) {
  return lum(r, g, b) - Math.min(r, g, b);
}

function setWhite(px, i, alpha) {
  px[i] = 255;
  px[i + 1] = 255;
  px[i + 2] = 255;
  px[i + 3] = alpha;
}

function clear(px, i) {
  px[i] = 0;
  px[i + 1] = 0;
  px[i + 2] = 0;
  px[i + 3] = 0;
}

function inkAlpha(value) {
  if (value < 28) return 0;
  return value > 210 ? 255 : Math.round(value);
}

function buildMask(px, w, h, predicate) {
  const mask = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      mask[y * w + x] = predicate(px[i], px[i + 1], px[i + 2], px[i + 3]) ? 1 : 0;
    }
  }
  return mask;
}

function erodeMask(mask, w, h, radius = 1) {
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (!mask[idx]) continue;

      let keep = true;
      for (let dy = -radius; dy <= radius && keep; dy++) {
        for (let dx = -radius; dx <= radius && keep; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h || !mask[ny * w + nx]) {
            keep = false;
          }
        }
      }
      out[idx] = keep ? 1 : 0;
    }
  }
  return out;
}

function applyCutoutMode(px, w, h) {
  let minX = w;
  let maxX = 0;
  let minY = h;
  let maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (px[i + 3] > 20) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      const a = px[i + 3];
      const l = lum(r, g, b);
      const inside =
        x >= minX && x <= maxX && y >= minY && y <= maxY;

      if (a > 20) {
        if (l > 210) {
          clear(px, i);
        } else {
          setWhite(px, i, 255);
        }
        continue;
      }

      if (inside) {
        setWhite(px, i, 255);
      } else {
        clear(px, i);
      }
    }
  }
}

function applyMode(px, w, h, mode) {
  if (mode === "cutout") {
    applyCutoutMode(px, w, h);
    return;
  }

  if (mode === "dark-stroke") {
    const mask = buildMask(px, w, h, (r, g, b, a) => a > 20 && lum(r, g, b) < 120);
    const core = erodeMask(mask, w, h, 2);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = y * w + x;
        const i = idx * 4;
        if (mask[idx] && !core[idx]) {
          setWhite(px, i, 255);
        } else {
          clear(px, i);
        }
      }
    }
    return;
  }

  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const a = px[i + 3];
    const l = lum(r, g, b);
    const c = chroma(r, g, b);

    if (mode === "dark-on-light") {
      if (a < 20 || l > 198) {
        clear(px, i);
        continue;
      }
      const ink = 255 - l;
      const alpha = ink < 12 ? 0 : ink > 220 ? 255 : Math.min(255, Math.round(ink * 1.12));
      setWhite(px, i, alpha);
      continue;
    }

    if (mode === "colored") {
      if (a < 20) {
        clear(px, i);
        continue;
      }
      if (l < 40 && a > 180) {
        setWhite(px, i, 255);
        continue;
      }
      if (l < 28 && c < 18) {
        clear(px, i);
        continue;
      }
      const strength = Math.max(l, c * 2.5, a * 0.75);
      setWhite(px, i, inkAlpha(strength));
      continue;
    }

    // light logo on dark / transparent background
    if (a < 20 || (l < 24 && c < 16)) {
      clear(px, i);
      continue;
    }
    const strength = Math.max(l, a * 0.9);
    setWhite(px, i, inkAlpha(strength));
  }
}

async function toWhiteWebp(inputPath, meta) {
  const maxW = meta.maxW ?? MAX_W;

  const { data, info } = await sharp(inputPath)
    .trim({ threshold: 12 })
    .ensureAlpha()
    .resize({ height: TARGET_H, width: maxW, fit: "inside", withoutEnlargement: false })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  applyMode(px, info.width, info.height, meta.mode ?? "light");

  const outId = meta.outId ?? meta.id;
  const outPath = path.join(OUT_DIR, `${outId}.webp`);
  await sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 92, effort: 6, alphaQuality: 100 })
    .toFile(outPath);

  return {
    id: meta.id,
    name: meta.name,
    alt: meta.alt,
    src: `/images/clients/${outId}.webp`,
    width: info.width,
    height: info.height,
  };
}

const results = [];
const seen = new Set();

function matchesSlugMap(filename) {
  const key = filename.includes("images_")
    ? filename.split("images_")[1]
    : filename.replace(/\.(png|jpe?g)$/i, "");

  return SLUG_MAP.some(([needle]) => key.includes(needle));
}

async function processLogoFile(filePath, sourceLabel, { requireKnown = false } = {}) {
  const basename = path.basename(filePath);
  if (requireKnown && !matchesSlugMap(basename)) return;

  const meta = matchLogo(basename);
  if (seen.has(meta.id)) return;
  seen.add(meta.id);
  const result = await toWhiteWebp(filePath, meta);
  results.push(result);
  console.log(`✓ ${meta.id} [${sourceLabel}] (${result.width}x${result.height})`);
}

if (fs.existsSync(IMAGE_IMPORT_DIR)) {
  const importFiles = fs
    .readdirSync(IMAGE_IMPORT_DIR)
    .filter((f) => /\.(png|jpe?g)$/i.test(f));
  for (const file of importFiles) {
    await processLogoFile(path.join(IMAGE_IMPORT_DIR, file), "import", { requireKnown: true });
  }
}

if (fs.existsSync(ASSETS_DIR)) {
  const files = fs.readdirSync(ASSETS_DIR).filter((f) => f.toLowerCase().endsWith(".png"));
  for (const file of files) {
    await processLogoFile(path.join(ASSETS_DIR, file), "assets");
  }
}

results.sort((a, b) => a.name.localeCompare(b.name, "da"));

fs.writeFileSync(MANIFEST, JSON.stringify(results, null, 2));
console.log(`\nProcessed ${results.length} logos.`);
