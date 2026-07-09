import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMPORT_ROOT = path.join(ROOT, "image-import", "references");
const OUTPUT_ROOT = path.join(ROOT, "public", "images", "references");
const MANIFEST_PATH = path.join(ROOT, "image-import", "references", "manifest.json");

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getArg(name, defaultValue) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return defaultValue;
  const value = process.argv[idx + 1];
  return value ?? defaultValue;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function listCaseFolders(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function listImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
}

function altFromFilename(filename, fallback) {
  const stem = filename.replace(/\.[^.]+$/i, "");
  const cleaned = stem.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return fallback;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

async function encodeWebp({
  inputPath,
  outputPath,
  maxWidth,
  maxHeight,
  quality,
  skipExisting,
}) {
  if (skipExisting) {
    try {
      const stat = await fs.stat(outputPath);
      if (stat.size > 0) return null;
    } catch {
      // missing is fine
    }
  }

  const buffer = await sharp(inputPath)
    .rotate()
    .resize({
      fit: "inside",
      width: maxWidth,
      height: maxHeight,
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 6,
      alphaQuality: quality,
    })
    .toBuffer();

  await ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, buffer);
  const metadata = await sharp(buffer).metadata();

  return {
    width: metadata.width ?? maxWidth,
    height: metadata.height ?? maxHeight,
    bytes: buffer.length,
  };
}

async function main() {
  const maxWidth = Number(getArg("--maxWidth", "1800"));
  const maxHeight = Number(getArg("--maxHeight", "2400"));
  const quality = Number(getArg("--quality", "86"));
  const skipExisting = hasFlag("--skipExisting");
  const cleanupInput = hasFlag("--cleanupInput");

  await ensureDir(IMPORT_ROOT);
  await ensureDir(OUTPUT_ROOT);

  const caseFolders = await listCaseFolders(IMPORT_ROOT);
  const records = [];

  for (const caseSlug of caseFolders) {
    const inputDir = path.join(IMPORT_ROOT, caseSlug);
    const outputDir = path.join(OUTPUT_ROOT, caseSlug);
    await ensureDir(outputDir);

    const files = await listImageFiles(inputDir);

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputFile = `${toSlug(path.basename(file, path.extname(file)))}.webp`;
      const outputPath = path.join(outputDir, outputFile);

      const encoded = await encodeWebp({
        inputPath,
        outputPath,
        maxWidth,
        maxHeight,
        quality,
        skipExisting,
      });

      if (!encoded) continue;

      const src = `/images/references/${caseSlug}/${outputFile}`;
      const alt = altFromFilename(file, `${caseSlug} referencebillede`);
      records.push({
        caseSlug,
        src,
        alt,
        width: encoded.width,
        height: encoded.height,
      });

      if (cleanupInput) {
        try {
          await fs.unlink(inputPath);
        } catch {
          // keep going if delete fails
        }
      }
    }
  }

  await fs.writeFile(
    MANIFEST_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        options: { maxWidth, maxHeight, quality, skipExisting, cleanupInput },
        images: records,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(
    `Processed ${records.length} billeder. Manifest skrevet til image-import/references/manifest.json`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
