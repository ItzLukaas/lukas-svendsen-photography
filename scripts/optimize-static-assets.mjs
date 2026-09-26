/**
 * Convert oversized PNG logos / static marks to WebP at display-appropriate size.
 * Photography in /images/projects is served via next/image (AVIF/WebP) and is not converted here.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

const logos = [
  "3pl.png",
  "billund-kommune.png",
  "bork-festival.png",
  "dgi.png",
  "esbjerg-streetfood.png",
  "magion.png",
  "rekom-group.png",
  "royal-fireworks.png",
  "sport24.png",
  "stay-and-sleep.png",
];

async function convertLogo(file) {
  const input = path.join(root, "public/logos", file);
  const output = input.replace(/\.png$/i, ".webp");
  const image = sharp(input);
  const meta = await image.metadata();
  const height = Math.min(meta.height ?? 192, 192);
  await image
    .resize({ height, withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 84, effort: 6 })
    .toFile(output);
  const outMeta = await sharp(output).metadata();
  const inKb = fs.statSync(input).size / 1024;
  const outKb = fs.statSync(output).size / 1024;
  return {
    file,
    inKb,
    outKb,
    width: outMeta.width,
    height: outMeta.height,
  };
}

async function convertFile(rel, maxHeight, quality = 84) {
  const input = path.join(root, rel);
  const output = input.replace(/\.(png|jpe?g)$/i, ".webp");
  const image = sharp(input);
  const meta = await image.metadata();
  const height = maxHeight
    ? Math.min(meta.height ?? maxHeight, maxHeight)
    : meta.height;
  await image
    .resize(height ? { height, withoutEnlargement: true } : undefined)
    .webp({ quality, alphaQuality: quality, effort: 6 })
    .toFile(output);
  const inKb = fs.statSync(input).size / 1024;
  const outKb = fs.statSync(output).size / 1024;
  const outMeta = await sharp(output).metadata();
  return { file: path.basename(output), inKb, outKb, width: outMeta.width, height: outMeta.height };
}

const logoResults = [];
for (const file of logos) {
  logoResults.push(await convertLogo(file));
}

const extra = [
  await convertFile("public/images/ls-signature.png", 360, 86),
  await convertFile("public/images/og-share.jpg", 630, 82),
];

console.log(JSON.stringify({ logos: logoResults, extra }, null, 2));
