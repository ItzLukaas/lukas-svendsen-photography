import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const squadUrl =
  "https://fhk.dk/1div-kvinder/1-div-kvinder-spillertrup-og-stab";
const outDir = join("public", "images", "projects", "fredericia-haandboldklub", "fhk-squad");

mkdirSync(outDir, { recursive: true });

const res = await fetch(squadUrl, {
  headers: { "User-Agent": "Mozilla/5.0" },
});
const html = await res.text();

const playerRe =
  /<a href="(https:\/\/fhk\.dk\/spillere\/[^"]+)"[^>]*class="spiller"[^>]*>([\s\S]*?)<\/a>/g;

const players = [];
for (const match of html.matchAll(playerRe)) {
  const block = match[2];
  const number = block.match(/<span class="nummer">(\d+)<\/span>/)?.[1] ?? null;
  const name =
    block.match(/<span class="spillernavn">([^<]+)<\/span>/)?.[1]?.trim() ??
    null;
  const fhkImage = block.match(/src="([^"]+)"/)?.[1] ?? null;
  if (name && number && fhkImage) {
    players.push({ name, number, fhkImage });
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ø/g, "o")
    .replace(/æ/g, "ae")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const downloaded = [];

for (const player of players.sort((a, b) => Number(a.number) - Number(b.number))) {
  const filename = `${player.number.padStart(2, "0")}-fhk-${slugify(player.name)}.jpg`;
  const dest = join(outDir, filename);

  const imgRes = await fetch(player.fhkImage, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!imgRes.ok) {
    console.error(`Failed ${player.name}: ${imgRes.status}`);
    continue;
  }

  const buffer = Buffer.from(await imgRes.arrayBuffer());
  const meta = await sharp(buffer).jpeg({ quality: 88, mozjpeg: true }).toFile(dest);
  const webPath = `/images/projects/fredericia-haandboldklub/fhk-squad/${filename}`;

  downloaded.push({
    ...player,
    src: webPath,
    width: meta.width,
    height: meta.height,
  });

  console.log(`Saved ${filename} (${meta.width}x${meta.height})`);
}

writeFileSync(
  join("src", "lib", "data", "generated", "fhk-squad-download.json"),
  JSON.stringify({ players: downloaded, fetchedAt: new Date().toISOString() }, null, 2)
);

console.log(`Downloaded ${downloaded.length} images`);
