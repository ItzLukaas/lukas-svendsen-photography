/**
 * Process Bjerringbro-Silkeborg vs Fredericia HK match photos.
 * Usage: node scripts/process-bjerringbro-silkeborg-fredericia.mjs
 */

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SLUG = "bjerringbro-silkeborg-fredericia";
const INBOX = path.join(ROOT, "inbox");
const INBOX_DIR = path.join(INBOX, SLUG);
const INBOX_ROOT = INBOX;
const OUT_DIR = path.join(ROOT, "public", "images", "projects", SLUG);
const DONE = path.join(INBOX, "_done", SLUG);
const GENERATED = path.join(ROOT, "src", "lib", "data", "generated", `${SLUG}.json`);

const MAX_LONG_EDGE = 2200;
const JPEG_QUALITY = 85;

const SHOTS = [
  {
    inbox: "DSC04392.jpg",
    out: "01-fhk-spiller-overfor-bjerringbro-silkeborg.jpg",
    alt: "Fredericia HK-spiller over for Bjerringbro-Silkeborg, nummer 19",
  },
  {
    inbox: "DSC04466.jpg",
    out: "02-springskud-mod-bjerringbro-silkeborg-fredericia-hk.jpg",
    alt: "Springskud i luften mod Bjerringbro-Silkeborg, Fredericia HK",
  },
  {
    inbox: "DSC04498.jpg",
    out: "03-duel-mod-bjerringbro-silkeborg-fredericia-hk.jpg",
    alt: "Duel under pres mod Bjerringbro-Silkeborg, Fredericia HK",
  },
  {
    inbox: "DSC04538.jpg",
    out: "04-kast-mod-mal-mod-bjerringbro-silkeborg-fredericia-hk.jpg",
    alt: "Kast mod mål mod Bjerringbro-Silkeborg, Fredericia HK",
  },
  {
    inbox: "DSC04555.jpg",
    out: "05-fhk-spiller-dirigerer-mod-bjerringbro-silkeborg.jpg",
    alt: "Fredericia HK-spiller dirigerer på banen mod Bjerringbro-Silkeborg",
  },
  {
    inbox: "DSC04653.jpg",
    out: "06-angreb-mellem-forsvarere-mod-bjerringbro-silkeborg.jpg",
    alt: "Angreb mellem to forsvarere mod Bjerringbro-Silkeborg, Fredericia HK",
  },
  {
    inbox: "DSC04707.jpg",
    out: "07-fhk-spiller-i-kampen-mod-bjerringbro-silkeborg.jpg",
    alt: "Fredericia HK-spiller i kampen mod Bjerringbro-Silkeborg",
  },
  {
    inbox: "DSC04721-2.jpg",
    out: "08-maalmand-jubel-mod-bjerringbro-silkeborg-fredericia.jpg",
    alt: "Målmand jubler i kampen mod Bjerringbro-Silkeborg, Fredericia HK",
  },
  {
    inbox: "DSC04735.jpg",
    out: "09-highfive-mod-bjerringbro-silkeborg-fredericia-hk.jpg",
    alt: "Highfive mellem Fredericia HK-spillere mod Bjerringbro-Silkeborg",
  },
  {
    inbox: "DSC04748.jpg",
    out: "10-holdkreds-mod-bjerringbro-silkeborg-fredericia-hk.jpg",
    alt: "Holdkreds, Fredericia HK mod Bjerringbro-Silkeborg",
  },
];

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(DONE, { recursive: true });
mkdirSync(INBOX_DIR, { recursive: true });

function findInput(filename) {
  const inFolder = path.join(INBOX_DIR, filename);
  if (existsSync(inFolder)) return inFolder;
  const inRoot = path.join(INBOX_ROOT, filename);
  if (existsSync(inRoot)) return inRoot;
  return null;
}

async function processShot(shot) {
  const input = findInput(shot.inbox);
  if (!input) {
    throw new Error(`Missing: ${shot.inbox}`);
  }

  const output = path.join(OUT_DIR, shot.out);
  const image = sharp(input, { failOn: "none", unlimited: true });
  const meta = await image.metadata();
  let pipeline = image.rotate();

  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const long = Math.max(w, h);
  if (long > MAX_LONG_EDGE) {
    pipeline =
      w >= h
        ? pipeline.resize(MAX_LONG_EDGE, null, { withoutEnlargement: true })
        : pipeline.resize(null, MAX_LONG_EDGE, { withoutEnlargement: true });
  }

  await pipeline
    .jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:2:0",
    })
    .toFile(output);

  const outMeta = await sharp(output).metadata();
  const orientation =
    (outMeta.width ?? 0) >= (outMeta.height ?? 0) ? "landscape" : "portrait";
  const entry = {
    src: `/images/projects/${SLUG}/${shot.out}`,
    alt: shot.alt,
    width: outMeta.width,
    height: outMeta.height,
    orientation,
  };

  copyFileSync(input, path.join(DONE, shot.inbox));
  unlinkSync(input);
  console.log("Processed", shot.out, `${outMeta.width}x${outMeta.height}`);
  return entry;
}

const images = [];
for (const shot of SHOTS) {
  images.push(await processShot(shot));
}

const cover =
  images.find((image) => image.src.includes("02-springskud")) ?? images[0];
const payload = {
  slug: SLUG,
  updatedAt: new Date().toISOString(),
  cover,
  images,
};

writeFileSync(GENERATED, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Wrote ${GENERATED}`);
console.log(JSON.stringify(images, null, 2));
