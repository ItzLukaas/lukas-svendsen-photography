import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();

const IMPORT_ROOT = "image-import";
const OUTPUT_DIR_ROOT = "public/images/portfolio";
const OUTPUT_URL_ROOT = "/images/portfolio";

const INPUT_MAP = {
  handbold: path.join(IMPORT_ROOT, "handbold"),
  andet: path.join(IMPORT_ROOT, "andet"),
};

const OUTPUT_MAP = {
  handbold: path.join(OUTPUT_DIR_ROOT, "handbold"),
  andet: path.join(OUTPUT_DIR_ROOT, "andet"),
};

const MANIFEST_PATH = path.join(IMPORT_ROOT, "manifest.json");
const PHOTOS_TS_PATH = path.join(ROOT, "src", "data", "photos.ts");

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

function humanizeFromFilename(filename) {
  const stem = filename.replace(/\.[^.]+$/i, "");
  const cleaned = stem
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return stem || "Billede";

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function categoryLabel(category) {
  return category === "handbold" ? "Håndbold" : "Andet";
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function listImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
}

async function encodeWebpSmart({
  inputPath,
  outputPath,
  category,
  filename,
  maxWidth,
  maxHeight,
  targetMaxBytes,
  maxInputBytes,
  minQuality,
  maxQuality,
  maxIterations,
  skipExisting,
}) {
  const stat = await fs.stat(inputPath);
  if (stat.size > maxInputBytes) {
    console.warn(
      `Skip (input too large): ${filename} (${(stat.size / 1024 / 1024).toFixed(
        1,
      )}MB > ${(maxInputBytes / 1024 / 1024).toFixed(0)}MB)`,
    );
    return null;
  }

  if (skipExisting) {
    try {
      const existing = await fs.stat(outputPath);
      if (existing.size > 0) {
        return null;
      }
    } catch {
      // ignore
    }
  }

  const base = sharp(inputPath).rotate();

  const resizeArgs = {
    fit: "inside",
    width: maxWidth,
    height: maxHeight,
    withoutEnlargement: true,
  };

  const tryEncode = async (quality) => {
    const buf = await base
      .clone()
      .resize(resizeArgs)
      .webp({
        quality,
        effort: 6,
        alphaQuality: quality,
      })
      .toBuffer();
    return buf;
  };

  // Fast path: if maxQuality already fits target, use it.
  let bestQuality = null;
  let bestBuffer = null;
  let hiBuf = await tryEncode(maxQuality);

  if (hiBuf.length <= targetMaxBytes) {
    bestQuality = maxQuality;
    bestBuffer = hiBuf;
  } else {
    // If even minQuality doesn't fit, take minQuality.
    const loBuf = await tryEncode(minQuality);
    if (loBuf.length > targetMaxBytes) {
      bestQuality = minQuality;
      bestBuffer = loBuf;
    } else {
      // Binary search for max quality that still fits.
      let loQ = minQuality;
      let hiQ = maxQuality;
      for (let i = 0; i < maxIterations; i++) {
        const midQ = Math.floor((loQ + hiQ + 1) / 2);
        const buf = await tryEncode(midQ);
        if (buf.length <= targetMaxBytes) {
          loQ = midQ;
          bestQuality = midQ;
          bestBuffer = buf;
        } else {
          hiQ = midQ - 1;
        }
        if (loQ >= hiQ) break;
      }
    }
  }

  await fs.writeFile(outputPath, bestBuffer);

  const outMeta = await sharp(bestBuffer).metadata();
  const width = outMeta.width ?? maxWidth;
  const height = outMeta.height ?? maxHeight;

  return {
    id: null, // filled later
    src: `${OUTPUT_URL_ROOT}/${category}/${path.basename(outputPath).replace(/\\/g, "/")}`,
    alt: `${categoryLabel(category)} — ${humanizeFromFilename(filename)}`,
    width,
    height,
    featured: false,
    targetQuality: bestQuality,
    outputBytes: bestBuffer.length,
  };
}

function replacePhotosArrayInTs(tsSource, newPhotosLiteral) {
  const pattern = /export const photos:\s*Photo\[\]\s*=\s*\[[\s\S]*?\];/m;
  if (!pattern.test(tsSource)) {
    throw new Error(
      "Could not find `export const photos: Photo[] = [...]` block in src/data/photos.ts",
    );
  }
  return tsSource.replace(
    pattern,
    `export const photos: Photo[] = [\n${newPhotosLiteral}\n];`,
  );
}

async function main() {
  const maxInputMB = Number(getArg("--maxInputMB", "30"));
  const targetMaxBytes = Number(getArg("--targetMaxBytes", String(900_000)));
  const maxWidth = Number(getArg("--maxWidth", "1800"));
  const maxHeight = Number(getArg("--maxHeight", "2400"));
  const minQuality = Number(getArg("--minQuality", "55"));
  const maxQuality = Number(getArg("--maxQuality", "92"));
  const featuredCount = Number(getArg("--featuredCount", "6"));
  const mixStrategy = String(getArg("--mixStrategy", "grouped")); // grouped | interleave
  const maxIterations = Number(getArg("--maxIterations", "6"));
  const skipExisting = hasFlag("--skipExisting");
  const cleanupInput = hasFlag("--cleanupInput");

  const updatePhotosTs = hasFlag("--updatePhotosTs");

  await ensureDir(OUTPUT_DIR_ROOT);

  const allPhotos = [];

  for (const [category, inputDir] of Object.entries(INPUT_MAP)) {
    const outputDir = OUTPUT_MAP[category];
    await ensureDir(outputDir);

    let files = [];
    try {
      files = await listImageFiles(inputDir);
    } catch {
      console.warn(`Input folder missing, skipping: ${inputDir}`);
      continue;
    }

    for (const filename of files) {
      const inputPath = path.join(inputDir, filename);
      const outFilename = filename.replace(/\.[^.]+$/i, ".webp");
      const outputPath = path.join(outputDir, outFilename);

      const result = await encodeWebpSmart({
        inputPath,
        outputPath,
        category,
        filename,
        maxWidth,
        maxHeight,
        targetMaxBytes,
        maxInputBytes: maxInputMB * 1024 * 1024,
        minQuality,
        maxQuality,
        maxIterations,
        skipExisting,
      });

      if (result) {
        allPhotos.push(result);
        if (cleanupInput) {
          try {
            await fs.unlink(inputPath);
          } catch {
            // Non-fatal: keep processing even if delete fails.
          }
        }
      }
    }
  }

  const handboldPhotos = allPhotos.filter((p) =>
    p.src.includes(`${OUTPUT_URL_ROOT}/handbold/`),
  );
  const andetPhotos = allPhotos.filter((p) =>
    p.src.includes(`${OUTPUT_URL_ROOT}/andet/`),
  );

  // Ordering affects which images become "featured" (first N).
  // Interleave gives a nicer blend on the homepage.
  let ordered = [];
  if (mixStrategy === "interleave") {
    const a = handboldPhotos.slice();
    const b = andetPhotos.slice();
    while (a.length > 0 || b.length > 0) {
      if (a.length > 0) ordered.push(a.shift());
      if (b.length > 0) ordered.push(b.shift());
    }
  } else {
    // grouped (default): handbold first, then andet
    ordered = [...handboldPhotos, ...andetPhotos];
  }

  // Assign ids + featured.
  const photos = ordered.map((p, i) => ({
    ...p,
    id: String(i + 1),
    featured: i < featuredCount,
  }));

  // Write manifest (always).
  await fs.writeFile(
    MANIFEST_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        input: { ...INPUT_MAP },
        outputRoot: OUTPUT_URL_ROOT,
        options: {
          maxInputMB,
          targetMaxBytes,
          maxWidth,
          maxHeight,
          minQuality,
          maxQuality,
          featuredCount,
          mixStrategy,
          skipExisting,
        },
        photos,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(
    `Optimized ${photos.length} images. Manifest written to: ${MANIFEST_PATH}`,
  );

  if (updatePhotosTs) {
    const tsSource = await fs.readFile(PHOTOS_TS_PATH, "utf8");
    const newPhotosLiteral = photos
      .map(
        (p) =>
          `  {\n    id: "${p.id}",\n    src: "${p.src}",\n    alt: ${JSON.stringify(
            p.alt,
          )},\n    width: ${p.width},\n    height: ${p.height},\n    featured: ${p.featured},\n  }`,
      )
      .join(",\n");

    const nextSource = replacePhotosArrayInTs(tsSource, newPhotosLiteral);
    await fs.writeFile(PHOTOS_TS_PATH, nextSource, "utf8");
    console.log(`Updated photos array in: ${PHOTOS_TS_PATH}`);
  } else {
    console.log(
      `Run again with --updatePhotosTs if you want to automatically update src/data/photos.ts`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

