/**
 * Build legacy image redirect map: deleted DSC paths → current files (by index prefix).
 * Usage: node scripts/generate-image-redirects.mjs
 */

import { execSync } from "node:child_process";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const EXTRA = [
  {
    source: "/images/hero-dsc02045.jpg",
    destination: "/images/hero-handbold-maalnet-super-cup.jpg",
  },
  {
    source: "/images/hero-dsc02045-mobile.jpg",
    destination: "/images/hero-handbold-maalnet-super-cup-mobil.jpg",
  },
  {
    source: "/images/hero-church-dsc06190.jpg",
    destination: "/images/hero-handbold-maalnet-super-cup.jpg",
  },
  {
    source: "/images/hero-church-dsc06190-mobile.jpg",
    destination: "/images/hero-handbold-maalnet-super-cup-mobil.jpg",
  },
];

function gitDeletedImages() {
  const fromLog = [];
  try {
    const out = execSync(
      'git log --diff-filter=D --name-only --pretty=format: -- "public/images/**/*.jpg"',
      { cwd: ROOT, encoding: "utf8" }
    );
    fromLog.push(...out.split(/\r?\n/).filter((line) => line.endsWith(".jpg")));
  } catch {
    // ignore
  }

  const fromStatus = [];
  try {
    const status = execSync('git status --porcelain -- "public/images"', {
      cwd: ROOT,
      encoding: "utf8",
    });
    for (const line of status.split(/\r?\n/)) {
      const match = line.match(/^\s*D\s+(.+\.jpg)$/);
      if (match) fromStatus.push(match[1].replace(/\\/g, "/"));
    }
  } catch {
    // ignore
  }

  return [...new Set([...fromLog, ...fromStatus])];
}

function buildRedirects() {
  const redirects = new Map();
  for (const { source, destination } of EXTRA) {
    redirects.set(source, destination);
  }

  for (const oldRel of gitDeletedImages()) {
    const webPath = `/${oldRel.replace(/^public\//, "")}`;
    if (redirects.has(webPath)) continue;

    const parts = oldRel.replace(/^public\//, "").split("/");
    const file = parts.pop();
    const dir = path.join(ROOT, "public", ...parts);
    if (!existsSync(dir)) continue;

    const prefix = file.match(/^(\d+)-/)?.[1];
    if (!prefix) continue;

    const match = readdirSync(dir).find(
      (name) => name.startsWith(`${prefix}-`) && name.endsWith(".jpg")
    );
    if (!match || match === file) continue;

    redirects.set(webPath, `/${parts.join("/")}/${match}`);
  }

  return [...redirects.entries()].map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
  }));
}

const redirects = buildRedirects();
const outPath = path.join(ROOT, "src", "lib", "legacy-image-redirects.ts");
const contents = `/** Auto-generated — run \`node scripts/generate-image-redirects.mjs\` after image renames. */
export const legacyImageRedirects = ${JSON.stringify(redirects, null, 2)} as const;
`;

writeFileSync(outPath, contents, "utf8");
console.log(`Wrote ${redirects.length} redirects to ${outPath}`);
