import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

function getArg(name, defaultValue) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return defaultValue;
  const value = process.argv[idx + 1];
  return value ?? defaultValue;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

async function main() {
  const input = getArg("--input");
  const output = getArg("--output");
  if (!input || !output) {
    console.error("Usage: node scripts/convert-image-to-webp.mjs --input <path> --output <path> [--quality 85] [--maxWidth 1600] [--maxHeight 2200] [--skipExisting]");
    process.exit(1);
  }

  const quality = Number(getArg("--quality", "86"));
  const maxWidth = Number(getArg("--maxWidth", "1600"));
  const maxHeight = Number(getArg("--maxHeight", "2200"));
  const skipExisting = hasFlag("--skipExisting");

  try {
    if (skipExisting) {
      const st = await fs.stat(output);
      if (st.size > 0) {
        console.log(`Skip (exists): ${output}`);
        return;
      }
    }
  } catch {
    // continue
  }

  const inputAbs = path.resolve(input);
  const outputAbs = path.resolve(output);

  await fs.mkdir(path.dirname(outputAbs), { recursive: true });

  const buf = await sharp(inputAbs)
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
    })
    .toBuffer();

  await fs.writeFile(outputAbs, buf);
  console.log(`Wrote: ${outputAbs} (${(buf.length / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

