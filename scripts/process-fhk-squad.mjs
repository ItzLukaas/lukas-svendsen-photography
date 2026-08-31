/**
 * Process FHK squad Halv-Hvid portraits from local shoot folders.
 * Usage: node scripts/process-fhk-squad.mjs
 *
 * Source (default): H:/1. DIV Kvinder/Spillertrup og stab
 * Override: FHK_SQUAD_SOURCE="D:/path/to/Spillertrup og stab"
 */

import { accessSync, mkdirSync, writeFileSync } from "node:fs";
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
  "fredericia-haandboldklub",
  "fhk-squad"
);

const MANIFEST = path.join(
  ROOT,
  "src",
  "lib",
  "data",
  "generated",
  "fhk-squad-manifest.json"
);

const MAX_LONG_EDGE = 2200;
const JPEG_QUALITY = 88;

/** Shoot folder name → official jersey number on fhk.dk */
const SHOOT_TO_JERSEY = {
  "02": "2",
  "03": "3",
  "04": "4",
  "05": "5",
  "06": "6",
  "07": "7",
  "12": "12",
  "17": "17",
  "19": "19",
  "20": "20",
  "21": "11",
  "23": "23",
  "25": "25",
  "27": "27",
  "29": "29",
  "31": "28",
  "37": "37",
};

const PLAYERS = {
  "2": { name: "Elina Nyholm Sørensen", slug: "elina-nyholm-sorensen" },
  "3": {
    name: "Freja Thor Ammidtsbøl Andersen",
    slug: "freja-thor-ammidtsbol-andersen",
  },
  "4": { name: "Maria Husted", slug: "maria-husted" },
  "5": { name: "Mille Bekke Andersen", slug: "mille-bekke-andersen" },
  "6": { name: "Laura Galle Hansen", slug: "laura-galle-hansen" },
  "7": { name: "Louise Haandbæk", slug: "louise-haandbaek" },
  "11": { name: "Julie Laursen", slug: "julie-laursen" },
  "12": { name: "Andrea Kemph", slug: "andrea-kemph" },
  "16": { name: "Kira Nyboe", slug: "kira-nyboe" },
  "17": { name: "Amalie Fejrskov Knudsen", slug: "amalie-fejrskov-knudsen" },
  "19": { name: "Eline Osland", slug: "eline-osland" },
  "20": { name: "Emma Skou Larsen", slug: "emma-skou-larsen" },
  "23": { name: "Sophie Voldby", slug: "sophie-voldby" },
  "25": { name: "Isabel Jakobsen", slug: "isabel-jakobsen" },
  "26": { name: "Caroline Busk", slug: "caroline-busk" },
  "27": { name: "Annette Wirén Larsen", slug: "annette-wiren-larsen" },
  "28": { name: "Katrine Langfeldt", slug: "katrine-langfeldt" },
  "29": { name: "Julie Grønne Thinggård", slug: "julie-gronne-thinggard" },
  "37": { name: "Nikoline Johansen", slug: "nikoline-johansen" },
  "44": { name: "Amanda Brogaard", slug: "amanda-brogaard" },
};

function findHalvHvid(shootFolder) {
  const dir = path.join(SOURCE_ROOT, shootFolder);
  const nested = path.join(SOURCE_ROOT, "29", "31");
  const candidates = [
    path.join(dir, `FHK-${shootFolder}-Halv-Hvid.jpg`),
    path.join(nested, `FHK-${shootFolder}-Halv-Hvid.jpg`),
  ];
  for (const file of candidates) {
    try {
      accessSync(file);
      return file;
    } catch {
      /* try next */
    }
  }
  return null;
}

mkdirSync(OUT_DIR, { recursive: true });

const processed = [];
const missing = [];

for (const [shootFolder, jersey] of Object.entries(SHOOT_TO_JERSEY)) {
  const player = PLAYERS[jersey];
  if (!player) continue;

  const source = findHalvHvid(shootFolder);
  if (!source) {
    missing.push({ shootFolder, jersey, name: player.name });
    console.warn(`Missing source: folder ${shootFolder} → #${jersey} ${player.name}`);
    continue;
  }

  const outName = `${jersey.padStart(2, "0")}-fhk-${player.slug}.jpg`;
  const dest = path.join(OUT_DIR, outName);
  const webPath = `/images/projects/fredericia-haandboldklub/fhk-squad/${outName}`;

  const image = sharp(source);
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
    shootFolder,
    jersey,
    name: player.name,
    src: webPath,
    width: outMeta.width,
    height: outMeta.height,
    source,
  });

  console.log(
    `#${jersey} ${player.name} ← ${path.basename(source)} → ${outName} (${outMeta.width}x${outMeta.height})`
  );
}

for (const jersey of ["16", "26", "44"]) {
  const player = PLAYERS[jersey];
  missing.push({ jersey, name: player.name, reason: "no shoot folder in deliverable" });
}

writeFileSync(
  MANIFEST,
  JSON.stringify(
    {
      processed,
      missing,
      sourceRoot: SOURCE_ROOT,
      processedAt: new Date().toISOString(),
    },
    null,
    2
  )
);

console.log(
  `\nProcessed ${processed.length} portraits. Missing: ${missing.map((m) => `#${m.jersey ?? m.shootFolder}`).join(", ")}`
);
