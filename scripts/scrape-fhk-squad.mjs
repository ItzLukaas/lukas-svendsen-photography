import { writeFileSync } from "node:fs";

const url =
  "https://fhk.dk/1div-kvinder/1-div-kvinder-spillertrup-og-stab";
const res = await fetch(url, {
  headers: { "User-Agent": "Mozilla/5.0" },
});
const html = await res.text();

const players = [];
const playerRe =
  /<a href="(https:\/\/fhk\.dk\/spillere\/[^"]+)"[^>]*class="spiller"[^>]*>([\s\S]*?)<\/a>/g;

for (const match of html.matchAll(playerRe)) {
  const block = match[2];
  const profileUrl = match[1];
  const number = block.match(/<span class="nummer">(\d+)<\/span>/)?.[1] ?? null;
  const name =
    block.match(/<span class="spillernavn">([^<]+)<\/span>/)?.[1]?.trim() ??
    null;
  const fhkImage = block.match(/src="([^"]+)"/)?.[1] ?? null;
  if (name) players.push({ name, number, profileUrl, fhkImage });
}

const staff = [];
const staffRe =
  /<div class="spiller personale">([\s\S]*?)<\/div>\s*<\/div>/g;
for (const match of html.matchAll(staffRe)) {
  const block = match[1];
  const name =
    block.match(/<span class="spillernavn">([^<]+)<\/span>/)?.[1]?.trim() ??
    null;
  const role = block.match(/<span>([^<]+)<\/span>/)?.[1]?.trim() ?? null;
  if (name) staff.push({ name, role });
}

// Fetch positions from individual player pages (public info only)
for (const player of players) {
  try {
    const page = await fetch(player.profileUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const body = await page.text();
    const position =
      body.match(/Position[^<]*<[^>]+>([^<]+)</i)?.[1]?.trim() ??
      body.match(/class="position"[^>]*>([^<]+)</)?.[1]?.trim() ??
      body.match(/Stilling[^<]*<[^>]+>([^<]+)</i)?.[1]?.trim() ??
      null;
    player.position = position;
    await new Promise((r) => setTimeout(r, 150));
  } catch {
    player.position = null;
  }
}

const out = { players, staff, fetchedAt: new Date().toISOString() };
writeFileSync("tmp-fhk-squad.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
