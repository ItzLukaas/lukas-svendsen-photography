/**
 * Process Fredericia vs Ribe-Esbjerg match photos from inbox.
 * Usage: node scripts/process-fredericia-ribe-esbjerg.mjs
 */

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  unlinkSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INBOX = path.join(ROOT, "inbox");
const OUT_DIR = path.join(
  ROOT,
  "public",
  "images",
  "projects",
  "fredericia-haandboldklub",
  "ribe-esbjerg"
);
const DONE = path.join(INBOX, "_done", "fredericia-ribe-esbjerg");

const MAX_LONG_EDGE = 2200;
const JPEG_QUALITY = 82;

const SHOTS = [
  {
    inbox: "DSC02765.jpg",
    out: "01-fhk-spiller-med-bold-mod-ribe-esbjerg.jpg",
    alt: "Fredericia Håndbold spiller med bold mod Ribe-Esbjerg",
  },
  {
    inbox: "DSC02802.jpg",
    out: "02-springskud-mod-ribe-esbjerg-fredericia-haandbold.jpg",
    alt: "Springskud i luften mod Ribe-Esbjerg — Fredericia Håndbold",
  },
  {
    inbox: "DSC02820.jpg",
    out: "03-angreb-i-luften-mod-ribe-esbjerg-fredericia-haandbold.jpg",
    alt: "Angreb i luften mod Ribe-Esbjerg — Fredericia Håndbold",
  },
  {
    inbox: "DSC02875.jpg",
    out: "04-duel-under-pres-mod-ribe-esbjerg-fredericia-haandbold.jpg",
    alt: "Duel under pres mod Ribe-Esbjerg — Fredericia Håndbold",
  },
  {
    inbox: "DSC02901.jpg",
    out: "05-palmar-klar-til-kast-mod-ribe-esbjerg-fredericia-haandbold.jpg",
    alt: "Palmar klar til kast mod Ribe-Esbjerg — Fredericia Håndbold",
  },
  {
    inbox: "DSC02943.jpg",
    out: "06-spiller-dirigerer-mod-ribe-esbjerg-fredericia-haandbold.jpg",
    alt: "Fredericia Håndbold spiller dirigerer på banen mod Ribe-Esbjerg",
  },
  {
    inbox: "DSC03002.jpg",
    out: "07-hopskud-mod-mal-mod-ribe-esbjerg-fredericia-haandbold.jpg",
    alt: "Hopskud mod mål mod Ribe-Esbjerg — Fredericia Håndbold",
  },
  {
    inbox: "DSC03025.jpg",
    out: "08-luftduel-mod-ribe-esbjerg-fredericia-haandbold.jpg",
    alt: "Luftduel mod Ribe-Esbjerg — Fredericia Håndbold",
  },
  {
    inbox: "DSC03044.jpg",
    out: "09-jubel-efter-scoring-mod-ribe-esbjerg.jpg",
    alt: "Jubel efter scoring mod Ribe-Esbjerg — håndboldkamp",
  },
];

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(DONE, { recursive: true });

const manifest = [];

for (const shot of SHOTS) {
  const input = path.join(INBOX, shot.inbox);
  if (!existsSync(input)) {
    console.error("Missing:", input);
    process.exit(1);
  }

  const output = path.join(OUT_DIR, shot.out);
  const image = sharp(input);
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
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(output);

  const outMeta = await sharp(output).metadata();
  manifest.push({
    src: `/images/projects/fredericia-haandboldklub/ribe-esbjerg/${shot.out}`,
    alt: shot.alt,
    width: outMeta.width,
    height: outMeta.height,
    orientation: outMeta.width >= outMeta.height ? "landscape" : "portrait",
  });

  copyFileSync(input, path.join(DONE, shot.inbox));
  unlinkSync(input);
  console.log("Processed", shot.out, `${outMeta.width}x${outMeta.height}`);
}

console.log(JSON.stringify(manifest, null, 2));
