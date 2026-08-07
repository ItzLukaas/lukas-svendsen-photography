/**
 * Process raw photos from inbox/<project-slug>/ into web-ready assets
 * and regenerate gallery JSON for the site.
 *
 * Usage: npm run images:process
 *        npm run images:process -- bork-festival
 */

import { createRequire } from "node:module";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INBOX = path.join(ROOT, "inbox");
const OUT_ROOT = path.join(ROOT, "public", "images", "projects");
const GENERATED = path.join(ROOT, "src", "lib", "data", "generated");
const DONE = path.join(INBOX, "_done");

const MAX_INPUT_BYTES = 40 * 1024 * 1024;
const MAX_LONG_EDGE = 2200;
const JPEG_QUALITY = 82;

const PROJECT_TITLES = {
  "bork-festival": "Bork Festival",
  "varde-open-air": "Varde Open Air",
  "gron-koncert": "Sivas — Grøn Koncert",
  "esbjerg-streetfood": "Esbjerg Streetfood",
  "dm-finalen-herrer": "DM-finalen – Herrer",
  "dm-finalen-kvinder": "DM-finalen – Kvinder",
};

const HERO_OUT = path.join(ROOT, "public", "images", "hero.jpg");
const ABOUT_OUT = path.join(ROOT, "public", "images", "about.jpg");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".tif",
  ".tiff",
  ".heic",
  ".heif",
]);

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function listProjectSlugs() {
  return Object.keys(PROJECT_TITLES);
}

function listInboxImages(slug) {
  const dir = path.join(INBOX, slug);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((name) => !name.startsWith(".") && name !== ".gitkeep")
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .map((name) => path.join(dir, name))
    .sort((a, b) =>
      path.basename(a).localeCompare(path.basename(b), "da", {
        numeric: true,
        sensitivity: "base",
      })
    );
}

function slugifyBase(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 48);
}

function defaultAlt(slug, index, orientation) {
  const title = PROJECT_TITLES[slug] ?? slug;
  if (slug === "gron-koncert" && orientation === "portrait") {
    return `Sivas på Grøn Koncert — øjeblik ${index + 1}`;
  }
  if (orientation === "portrait") {
    return `${title} — koncertøjeblik ${index + 1}`;
  }
  return `${title} — stemning ${index + 1}`;
}

function readExisting(slug) {
  const file = path.join(GENERATED, `${slug}.json`);
  if (!existsSync(file)) return [];
  try {
    const data = JSON.parse(readFileSync(file, "utf8"));
    return Array.isArray(data.images) ? data.images : [];
  } catch {
    return [];
  }
}

function nextIndex(existing) {
  let max = 0;
  for (const image of existing) {
    const match = path.basename(image.src).match(/^(\d+)-/);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return max;
}

async function processOne(filePath, slug, sequence) {
  const size = statSync(filePath).size;
  if (size > MAX_INPUT_BYTES) {
    throw new Error(
      `${path.basename(filePath)} er ${(size / 1024 / 1024).toFixed(1)} MB (max 40 MB)`
    );
  }

  const base = slugifyBase(path.parse(filePath).name) || `billede-${sequence}`;
  const outName = `${String(sequence).padStart(2, "0")}-${base}.jpg`;
  const outDir = path.join(OUT_ROOT, slug);
  const outPath = path.join(outDir, outName);
  ensureDir(outDir);

  let pipeline = sharp(filePath, { failOn: "none", unlimited: true }).rotate();
  const meta = await sharp(filePath, { failOn: "none", unlimited: true })
    .rotate()
    .metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) {
    throw new Error(`Kunne ikke læse dimensioner: ${path.basename(filePath)}`);
  }

  const orientation = height > width ? "portrait" : "landscape";
  const longEdge = Math.max(width, height);
  if (longEdge > MAX_LONG_EDGE) {
    pipeline = pipeline.resize({
      width: orientation === "landscape" ? MAX_LONG_EDGE : undefined,
      height: orientation === "portrait" ? MAX_LONG_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    });
  }

  const { width: outW, height: outH } = await pipeline
    .jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      chromaSubsampling: "4:2:0",
      trellisQuantisation: true,
      overshootDeringing: true,
      optimizeScans: true,
    })
    .toFile(outPath);

  return {
    src: `/images/projects/${slug}/${outName}`,
    alt: defaultAlt(slug, sequence - 1, orientation),
    width: outW,
    height: outH,
    orientation,
    source: path.basename(filePath),
  };
}

function moveToDone(filePath, slug) {
  const destDir = path.join(DONE, slug);
  ensureDir(destDir);
  let dest = path.join(destDir, path.basename(filePath));
  if (existsSync(dest)) {
    const parsed = path.parse(filePath);
    dest = path.join(
      destDir,
      `${parsed.name}-${Date.now()}${parsed.ext}`
    );
  }
  try {
    renameSync(filePath, dest);
  } catch {
    copyFileSync(filePath, dest);
    try {
      unlinkSync(filePath);
    } catch {
      // leave original if locked
    }
  }
}

function writeGenerated(slug, images) {
  ensureDir(GENERATED);
  const mapped = images.map(({ src, alt, width, height, orientation }) => ({
    src,
    alt,
    width,
    height,
    orientation,
  }));
  const cover =
    mapped.find((image) => image.orientation === "landscape") ?? mapped[0];
  const payload = {
    slug,
    updatedAt: new Date().toISOString(),
    ...(cover ? { cover } : {}),
    images: mapped,
  };
  writeFileSync(
    path.join(GENERATED, `${slug}.json`),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8"
  );
}

async function processSiteImage({ files, label, outPath, doneSlug }) {
  if (files.length === 0) {
    console.log(`— ${label}: ingen nye billeder`);
    return { count: 0 };
  }

  const file = files[files.length - 1];
  if (files.length > 1) {
    console.log(
      `→ ${label}: ${files.length} fundet — bruger seneste: ${path.basename(file)}`
    );
  } else {
    console.log(`→ ${label}: ${path.basename(file)}`);
  }

  const size = statSync(file).size;
  if (size > MAX_INPUT_BYTES) {
    throw new Error(
      `${path.basename(file)} er ${(size / 1024 / 1024).toFixed(1)} MB (max 40 MB)`
    );
  }

  ensureDir(path.dirname(outPath));

  let pipeline = sharp(file, { failOn: "none", unlimited: true }).rotate();
  const meta = await sharp(file, { failOn: "none", unlimited: true })
    .rotate()
    .metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) {
    throw new Error(`Kunne ikke læse dimensioner: ${path.basename(file)}`);
  }

  const orientation = height > width ? "portrait" : "landscape";
  const longEdge = Math.max(width, height);
  if (longEdge > MAX_LONG_EDGE) {
    pipeline = pipeline.resize({
      width: orientation === "landscape" ? MAX_LONG_EDGE : undefined,
      height: orientation === "portrait" ? MAX_LONG_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    });
  }

  const { width: outW, height: outH } = await pipeline
    .jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      chromaSubsampling: "4:2:0",
      trellisQuantisation: true,
      overshootDeringing: true,
      optimizeScans: true,
    })
    .toFile(outPath);

  const outName = path.basename(outPath);
  console.log(
    `  ✓ ${path.basename(file)} → ${outName} (${outW}×${outH}, ${orientation})`
  );
  moveToDone(file, doneSlug);
  return { count: 1, width: outW, height: outH };
}

function listSiteInboxImages(folder) {
  const dir = path.join(INBOX, folder);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((name) => !name.startsWith(".") && name !== ".gitkeep")
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .map((name) => path.join(dir, name))
    .sort((a, b) =>
      path.basename(a).localeCompare(path.basename(b), "da", {
        numeric: true,
        sensitivity: "base",
      })
    );
}

async function processHero() {
  return processSiteImage({
    files: listSiteInboxImages("hero"),
    label: "hero",
    outPath: HERO_OUT,
    doneSlug: "hero",
  });
}

async function processAbout() {
  return processSiteImage({
    files: listSiteInboxImages("about"),
    label: "about",
    outPath: ABOUT_OUT,
    doneSlug: "about",
  });
}

async function processSlug(slug) {
  const files = listInboxImages(slug);
  if (files.length === 0) {
    console.log(`— ${slug}: ingen nye billeder`);
    return { slug, count: 0 };
  }

  const existing = readExisting(slug);
  let sequence = nextIndex(existing);
  console.log(
    `→ ${slug}: ${files.length} nye (eksisterende i galleri: ${existing.length})`
  );

  const added = [];
  for (const file of files) {
    sequence += 1;
    const result = await processOne(file, slug, sequence);
    added.push(result);
    console.log(
      `  ✓ ${result.source} → ${path.basename(result.src)} (${result.width}×${result.height}, ${result.orientation})`
    );
    moveToDone(file, slug);
  }

  const images = [...existing, ...added];
  writeGenerated(slug, images);
  console.log(`  Galleri opdateret: ${images.length} billeder i alt`);
  return { slug, count: added.length };
}

async function main() {
  const only = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));

  if (only.length === 1 && only[0] === "hero") {
    ensureDir(path.join(INBOX, "hero"));
    await processHero();
    console.log("\nFærdig. Genindlæs siden for at se nye billeder.");
    return;
  }

  if (only.length === 1 && only[0] === "about") {
    ensureDir(path.join(INBOX, "about"));
    await processAbout();
    console.log("\nFærdig. Genindlæs siden for at se nye billeder.");
    return;
  }

  const slugs = only.length ? only : listProjectSlugs();

  if (!only.length) {
    ensureDir(path.join(INBOX, "hero"));
    ensureDir(path.join(INBOX, "about"));
    await processHero();
    await processAbout();
  }

  for (const slug of slugs) {
    if (!PROJECT_TITLES[slug]) {
      console.error(`Ukendt projekt: ${slug}`);
      console.error(`Kendte: ${listProjectSlugs().join(", ")}`);
      process.exitCode = 1;
      continue;
    }
    ensureDir(path.join(INBOX, slug));
    await processSlug(slug);
  }

  console.log("\nFærdig. Genindlæs siden for at se nye billeder.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
