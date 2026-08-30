/**
 * SEO image migration — rename camera-style filenames and sync all references.
 * Usage: node scripts/seo-migrate-images.mjs
 */

import {
  existsSync,
  readFileSync,
  renameSync,
  readdirSync,
  writeFileSync,
  statSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const GENERATED_DIR = path.join(ROOT, "src", "lib", "data", "generated");
const PROJECTS_TS = path.join(ROOT, "src", "lib", "data", "projects.ts");

/** Improved alt text overrides keyed by old basename (without path). */
const ALT_OVERRIDES = {
  // super-cup-kvinder
  "01-01-dsc01122.jpg":
    "Arena overblik med håndboldkamp i gang — Bambuni Super Cup kvinder",
  "02-02-dsc00672.jpg":
    "SELECT ULTIMATE-håndbold på stand — Bambuni Super Cup kvinder",
  "03-03-dsc00800.jpg":
    "Marit Røsberg Jacobsen i Team Esbjerg-trøje — Super Cup kvinder",
  "04-04-dsc00820.jpg":
    "Angreb mod mål under kampen — Bambuni Super Cup kvinder",
  "05-05-dsc01053.jpg":
    "Odense Håndbold-spiller på banen — Bambuni Super Cup kvinder",
  "06-06-dsc01104.jpg":
    "Hurtigt angreb langs sidelinjen — Bambuni Super Cup kvinder",
  "07-07-dsc01171.jpg":
    "Duel mellem to spillere — Bambuni Super Cup kvinder",
  "08-08-dsc01210.jpg":
    "Sandra Toft i målmandstrøje — Bambuni Super Cup kvinder",
  "09-09-dsc01396.jpg":
    "Team Esbjerg fejrer sejr med pokal — Bambuni Super Cup kvinder",

  // super-cup-herrer
  "01-01-dsc01426.jpg":
    "Thomas Arnoldsen i hopskud for Aalborg Håndbold — Super Cup herrer",
  "02-02-dsc01475.jpg":
    "Håndboldkamp i fyldt arena — Bambuni Super Cup herrer",
  "03-03-dsc01533.jpg":
    "Tempofyldt angreb mod mål — Bambuni Super Cup herrer",
  "04-04-dsc01546.jpg":
    "Niklas Landin fejrer redning — Bambuni Super Cup herrer",
  "05-05-dsc01572.jpg":
    "Forsvarsspil midt på banen — Bambuni Super Cup herrer",
  "06-06-dsc01624.jpg":
    "Spiller i fald under kampen — Bambuni Super Cup herrer",
  "07-07-dsc01831.jpg":
    "Hurtigt kontraangreb — Bambuni Super Cup herrer",
  "08-08-dsc01859.jpg":
    "Målscoring i målzonen — Bambuni Super Cup herrer",
  "09-09-dsc01868.jpg":
    "Jubel efter scoring — Bambuni Super Cup herrer",
  "10-10-dsc01914.jpg":
    "Kampens intensitet under loftslamperne — Super Cup herrer",
  "11-11-dsc01990-2.jpg":
    "Aalborg Håndbold løfter pokalen — Bambuni Super Cup herrer",
  "12-12-dsc02010-2.jpg":
    "Fejring på podiet efter finale — Bambuni Super Cup herrer",

  // fredericia-haandboldklub — unique player alts
  "05-04-fhk-03-pose.jpg":
    "Midtsbøl i rød Fredericia Håndboldklub-trøje med nummer 3",
  "06-05-fhk-04-pose.jpg":
    "Spiller i rød Fredericia Håndboldklub-trøje med nummer 4",
  "07-06-fhk-19-pose.jpg":
    "Spiller jubler i Fredericia Håndboldklub-trøje med nummer 19",
  "08-07-fhk-29-pose.jpg":
    "Spiller i rød Fredericia Håndboldklub-trøje med nummer 29",
  "09-08-fhk-27-pose.jpg":
    "Spiller i rød Fredericia Håndboldklub-trøje med nummer 27",
  "10-09-fhk-37-pose.jpg":
    "Spiller i rød Fredericia Håndboldklub-trøje med nummer 37",
  "11-10-fhk-82-pose.jpg":
    "Spiller i rød Fredericia Håndboldklub-trøje med nummer 82",
  "02-01-fhk-gruppe-06.jpg":
    "Fredericia Håndboldklub 1. division kvinder — gruppefoto 1",
  "03-02-fhk-gruppe-03.jpg":
    "Fredericia Håndboldklub 1. division kvinder — gruppefoto 2",
  "04-fhk-gruppe-04.jpg":
    "Fredericia Håndboldklub 1. division kvinder — gruppefoto 3",

  // bork-festival — artist names verified by client
  "02-20260731-lgs-img007.jpg": "Ardit i blåt scenelys på Bork Festival",
  "12-20260731-lgs-img009.jpg": "Poul Krebs på scenen til Bork Festival",
  "16-20260729-lgs-dsc00590.jpg": "Karoline Mousing peger ud i publikum på Bork Festival",
  "17-20260731-lgs-img002.jpg": "Ardit på scenen til Bork Festival",
  "18-20260801-lgs-0004.jpg": "Madsen på scenen til Bork Festival",
  "19-dsc02599.jpg": "TV-2 på scenen til Bork Festival",
};

/** Root-level image renames (old relative to public/images). */
const ROOT_RENAMES = {
  "hero-dsc02045.jpg": "hero-handbold-maalnet-super-cup.jpg",
  "hero-dsc02045-mobile.jpg": "hero-handbold-maalnet-super-cup-mobil.jpg",
};

function slugify(text, maxLen = 52) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLen);
}

function needsRename(basename) {
  return (
    /dsc\d|lgs-img|lgs-dsc|lgs-\d{4}|IMG_|img\d{3,}/i.test(basename) ||
    /\d{8}-lgs/i.test(basename) ||
    /^00-dsc/i.test(basename)
  );
}

function extractIndex(basename) {
  const match = basename.match(/^(\d+)-/);
  return match ? match[1].padStart(2, "0") : "01";
}

function altToFilename(alt, basename) {
  const index = extractIndex(basename);
  const slug = slugify(alt);
  return `${index}-${slug}.jpg`;
}

function listGeneratedSlugs() {
  return readdirSync(GENERATED_DIR)
    .filter((name) => name.endsWith(".json"))
    .map((name) => name.replace(/\.json$/, ""));
}

function loadJson(slug) {
  return JSON.parse(readFileSync(path.join(GENERATED_DIR, `${slug}.json`), "utf8"));
}

function saveJson(slug, data) {
  data.updatedAt = new Date().toISOString();
  writeFileSync(
    path.join(GENERATED_DIR, `${slug}.json`),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf8"
  );
}

function applyReplacements(content, replacements) {
  let next = content;
  const sorted = [...replacements.entries()].sort(
    (a, b) => b[0].length - a[0].length
  );
  for (const [from, to] of sorted) {
    next = next.split(from).join(to);
  }
  return next;
}

function migrateProject(slug, replacements) {
  const data = loadJson(slug);
  let renamed = 0;
  let altsImproved = 0;

  const updateImage = (image) => {
    const basename = path.basename(image.src);
    const override = ALT_OVERRIDES[basename];
    if (override && image.alt !== override) {
      image.alt = override;
      altsImproved += 1;
    }

    if (!needsRename(basename)) return image;

    const newBasename = altToFilename(image.alt, basename);
    if (newBasename === basename) return image;

    const oldRel = image.src.replace(/^\//, "");
    const newRel = `images/projects/${slug}/${newBasename}`;
    const oldAbs = path.join(PUBLIC, oldRel);
    const newAbs = path.join(PUBLIC, newRel);

    if (!existsSync(oldAbs)) {
      console.warn(`  ⚠ missing: ${oldRel}`);
      return image;
    }

    if (!existsSync(newAbs)) {
      renameSync(oldAbs, newAbs);
      renamed += 1;
    }

    const oldSrc = image.src;
    const newSrc = `/${newRel}`;
    replacements.set(oldSrc, newSrc);
    image.src = newSrc;
    return image;
  };

  if (data.cover) data.cover = updateImage(data.cover);
  if (Array.isArray(data.images)) {
    data.images = data.images.map(updateImage);
  }

  saveJson(slug, data);
  return { renamed, altsImproved };
}

function migrateRootImages(replacements) {
  let renamed = 0;
  for (const [oldName, newName] of Object.entries(ROOT_RENAMES)) {
    const oldAbs = path.join(PUBLIC, "images", oldName);
    const newAbs = path.join(PUBLIC, "images", newName);
    if (!existsSync(oldAbs)) continue;
    if (!existsSync(newAbs)) {
      renameSync(oldAbs, newAbs);
      renamed += 1;
    }
    replacements.set(`/images/${oldName}`, `/images/${newName}`);
  }
  return renamed;
}

function main() {
  const replacements = new Map();
  let totalRenamed = 0;
  let totalAlts = 0;

  for (const slug of listGeneratedSlugs()) {
    const { renamed, altsImproved } = migrateProject(slug, replacements);
    totalRenamed += renamed;
    totalAlts += altsImproved;
    if (renamed || altsImproved) {
      console.log(`→ ${slug}: ${renamed} renamed, ${altsImproved} alts improved`);
    }
  }

  const rootRenamed = migrateRootImages(replacements);
  totalRenamed += rootRenamed;
  if (rootRenamed) console.log(`→ root images: ${rootRenamed} renamed`);

  if (replacements.size === 0) {
    console.log("No path changes to apply.");
    return;
  }

  let projectsTs = readFileSync(PROJECTS_TS, "utf8");
  projectsTs = applyReplacements(projectsTs, replacements);
  writeFileSync(PROJECTS_TS, projectsTs, "utf8");

  const filesToPatch = [];
  function walk(dir) {
    if (!existsSync(dir)) return;
    if (statSync(dir).isFile()) {
      if (/\.(tsx?|jsx?|mjs|json|md)$/.test(dir)) filesToPatch.push(dir);
      return;
    }
    for (const entry of readdirSync(dir)) {
      walk(path.join(dir, entry));
    }
  }
  walk(path.join(ROOT, "src"));
  walk(path.join(ROOT, "scripts"));

  let patchedFiles = 0;
  for (const file of filesToPatch) {
    const original = readFileSync(file, "utf8");
    const updated = applyReplacements(original, replacements);
    if (updated !== original) {
      writeFileSync(file, updated, "utf8");
      patchedFiles += 1;
    }
  }

  console.log(
    `\nDone: ${totalRenamed} files renamed, ${totalAlts} alts improved, ${replacements.size} path updates, ${patchedFiles} files patched.`
  );
}

main();
