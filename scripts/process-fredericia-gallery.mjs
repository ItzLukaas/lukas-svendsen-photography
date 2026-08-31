/**
 * Process 9 curated white-background FHK images for the portfolio gallery.
 * Usage: node scripts/process-fredericia-gallery.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SOURCE_ROOT =
  process.env.FHK_SQUAD_SOURCE ??
  "H:\\1. DIV Kvinder\\Spillertrup og stab";

const OUT_DIR = path.join(
  ROOT,
  "public",
  "images",
  "projects",
  "fredericia-haandboldklub"
);

const MANIFEST = path.join(
  ROOT,
  "src",
  "lib",
  "data",
  "generated",
  "fredericia-gallery-manifest.json"
);

const MAX_LONG_EDGE = 2200;
const JPEG_QUALITY = 88;

/** Curated mix: gruppe + Halv-Hvid + Pose-Hvid (celebrations) — no Hel-Hvid */
const GALLERY = [
  {
    source: "Gruppe/FHK-Gruppe-06-Hvid.jpg",
    out: "01-fhk-gruppe-06-hvid.jpg",
    alt: "Fredericia Håndboldklub — gruppefoto",
  },
  {
    source: "03/FHK-03-Pose-Hvid.jpg",
    out: "02-fhk-freja-pose-hvid.jpg",
    alt: "Freja Thor Ammidtsbøl Andersen jubler — Fredericia Håndbold, nummer 3",
  },
  {
    source: "04/FHK-04-Pose-Hvid.jpg",
    out: "03-fhk-maria-pose-hvid.jpg",
    alt: "Maria Husted jubler — Fredericia Håndbold, nummer 4",
  },
  {
    source: "20/FHK-20-Pose-Hvid.jpg",
    out: "04-fhk-emma-pose-hvid.jpg",
    alt: "Emma Skou Larsen jubler — Fredericia Håndbold, nummer 20",
  },
  {
    source: "19/FHK-19-Pose-Hvid.jpg",
    out: "05-fhk-eline-pose-hvid.jpg",
    alt: "Eline Osland jubler — Fredericia Håndbold, nummer 19",
  },
  {
    source: "21/FHK-21-Halv-Hvid.jpg",
    out: "06-fhk-julie-laursen-halv-hvid.jpg",
    alt: "Julie Laursen — Fredericia Håndbold, nummer 11",
  },
  {
    source: "27/FHK-27-Pose-Hvid.jpg",
    out: "07-fhk-annette-pose-hvid.jpg",
    alt: "Annette Wirén Larsen jubler — Fredericia Håndbold, nummer 27",
  },
  {
    source: "29/FHK-29-Pose-Hvid.jpg",
    out: "08-fhk-julie-gronne-pose-hvid.jpg",
    alt: "Julie Grønne Thinggård jubler — Fredericia Håndbold, nummer 29",
  },
  {
    source: "37/FHK-37-Pose-Hvid.jpg",
    out: "09-fhk-nikoline-pose-hvid.jpg",
    alt: "Nikoline Johansen jubler — Fredericia Håndbold, nummer 37",
  },
  {
    source: "23/FHK-23-Pose-Hvid.jpg",
    out: "10-fhk-sophie-pose-hvid.jpg",
    alt: "Sophie Voldby jubler — Fredericia Håndbold, nummer 23",
  },
];

mkdirSync(OUT_DIR, { recursive: true });

const processed = [];

for (const item of GALLERY) {
  const sourcePath = path.join(SOURCE_ROOT, item.source);
  const dest = path.join(OUT_DIR, item.out);
  const webPath = `/images/projects/fredericia-haandboldklub/${item.out}`;

  const image = sharp(sourcePath);
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const longEdge = Math.max(width, height);

  let pipeline = image.rotate();
  if (longEdge > MAX_LONG_EDGE) {
    pipeline =
      width >= height
        ? pipeline.resize(MAX_LONG_EDGE, null, { withoutEnlargement: true })
        : pipeline.resize(null, MAX_LONG_EDGE, { withoutEnlargement: true });
  }

  const outMeta = await pipeline
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(dest);

  processed.push({
    ...item,
    src: webPath,
    width: outMeta.width,
    height: outMeta.height,
    orientation: outMeta.width >= outMeta.height ? "landscape" : "portrait",
  });

  console.log(
    `${item.out} ← ${path.basename(sourcePath)} (${outMeta.width}x${outMeta.height})`
  );
}

writeFileSync(
  MANIFEST,
  JSON.stringify({ processed, processedAt: new Date().toISOString() }, null, 2)
);

console.log(`\nProcessed ${processed.length} gallery images.`);
