/**
 * Compress hero drone video from inbox for web background loop.
 *
 * Usage: npm run hero:process
 *
 * Læg MP4/MOV i inbox/hero/ eller inbox/ (op til 500 MB).
 * Kræver ffmpeg (winget install Gyan.FFmpeg).
 *
 * Output (web-optimized for LCP/bandwidth):
 *   public/videos/hero-hevc.mp4 — HEVC ~1280p, kort loop
 *   public/videos/hero.mp4       — H.264 fallback
 *   public/images/hero-poster.jpg
 */

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INBOX = path.join(ROOT, "inbox");
const INBOX_HERO = path.join(INBOX, "hero");
const DONE = path.join(INBOX, "_done", "hero");
const VIDEO_H264 = path.join(ROOT, "public", "videos", "hero.mp4");
const VIDEO_HEVC = path.join(ROOT, "public", "videos", "hero-hevc.mp4");
const POSTER_OUT = path.join(ROOT, "public", "images", "hero-poster.jpg");

const VIDEO_EXT = new Set([".mp4", ".mov", ".mkv", ".webm"]);
const MAX_INPUT_BYTES = 500 * 1024 * 1024;
/** Short loop keeps hero payload under ~8 MB while preserving presence */
const LOOP_SECONDS = 12;

function ffmpegCmd() {
  const result = spawnSync("ffmpeg", ["-version"], { encoding: "utf8" });
  if (result.status === 0) return "ffmpeg";

  const winGet = path.join(
    process.env.LOCALAPPDATA ?? "",
    "Microsoft",
    "WinGet",
    "Packages"
  );
  if (existsSync(winGet)) {
    for (const dir of readdirSync(winGet, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const pkg = path.join(winGet, dir.name);
      for (const sub of readdirSync(pkg, { withFileTypes: true })) {
        if (!sub.isDirectory() || !sub.name.startsWith("ffmpeg")) continue;
        const candidate = path.join(pkg, sub.name, "bin", "ffmpeg.exe");
        if (existsSync(candidate)) return candidate;
      }
    }
  }

  throw new Error(
    "ffmpeg ikke fundet. Installér med: winget install Gyan.FFmpeg"
  );
}

function listHeroVideos() {
  const dirs = [INBOX_HERO, INBOX];
  const files = [];

  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (name.startsWith(".") || name === "README.md") continue;
      if (!VIDEO_EXT.has(path.extname(name).toLowerCase())) continue;
      files.push(path.join(dir, name));
    }
  }

  return [...new Set(files)].sort((a, b) =>
    path.basename(a).localeCompare(path.basename(b), "da", { numeric: true })
  );
}

function runFfmpeg(ffmpeg, args) {
  const result = spawnSync(ffmpeg, args, { encoding: "utf8", stdio: "inherit" });
  if (result.status !== 0) throw new Error("ffmpeg fejlede");
}

function moveToDone(filePath) {
  mkdirSync(DONE, { recursive: true });
  const dest = path.join(DONE, path.basename(filePath));
  if (existsSync(dest)) unlinkSync(dest);
  renameSync(filePath, dest);
}

function encodeWebVideos(ffmpeg, input) {
  // 1280p / 24fps / short loop — background presence without killing LCP
  const vf = "scale=1280:-2:flags=lanczos,fps=24";

  console.log(
    `  HEVC 1280p24 (crf 26, ${LOOP_SECONDS}s) — primær, web-optimeret…`
  );
  runFfmpeg(ffmpeg, [
    "-y",
    "-ss",
    "2",
    "-t",
    String(LOOP_SECONDS),
    "-i",
    input,
    "-an",
    "-vf",
    vf,
    "-c:v",
    "libx265",
    "-crf",
    "26",
    "-preset",
    "medium",
    "-tag:v",
    "hvc1",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    VIDEO_HEVC,
  ]);

  console.log(
    `  H.264 1280p24 (crf 28, ${LOOP_SECONDS}s) — fallback til alle browsere…`
  );
  runFfmpeg(ffmpeg, [
    "-y",
    "-ss",
    "2",
    "-t",
    String(LOOP_SECONDS),
    "-i",
    input,
    "-an",
    "-vf",
    vf,
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "medium",
    "-profile:v",
    "high",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    "-g",
    "48",
    VIDEO_H264,
  ]);
}

async function extractPoster(ffmpeg, input) {
  console.log("  Udtrækker poster-frame fra original (1920px)…");
  const tmp = POSTER_OUT.replace(/\.jpg$/, "-src.jpg");
  runFfmpeg(ffmpeg, [
    "-y",
    "-ss",
    "5",
    "-i",
    input,
    "-frames:v",
    "1",
    "-vf",
    "scale=1920:-2:flags=lanczos",
    "-q:v",
    "1",
    tmp,
  ]);

  await sharp(tmp)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(POSTER_OUT);
  unlinkSync(tmp);
}

async function main() {
  let files = listHeroVideos();

  // Allow re-encode from last archived source when inbox is empty
  if (files.length === 0 && existsSync(DONE)) {
    const archived = readdirSync(DONE)
      .filter((name) => VIDEO_EXT.has(path.extname(name).toLowerCase()))
      .map((name) => path.join(DONE, name));
    if (archived.length) {
      files = archived;
      console.log("→ genkoder fra inbox/_done/hero (ingen ny fil i inbox)");
    }
  }

  if (files.length === 0) {
    console.log("— hero: ingen videoer i inbox/hero/ eller inbox/");
    return;
  }

  const input = files[files.length - 1];
  const size = statSync(input).size;
  if (size > MAX_INPUT_BYTES) {
    throw new Error(
      `${path.basename(input)} er ${(size / 1024 / 1024).toFixed(1)} MB (max 500 MB)`
    );
  }

  console.log(
    `→ hero video: ${path.basename(input)} (${(size / 1024 / 1024).toFixed(1)} MB)`
  );

  const ffmpeg = ffmpegCmd();
  mkdirSync(path.dirname(VIDEO_H264), { recursive: true });
  mkdirSync(path.dirname(POSTER_OUT), { recursive: true });

  encodeWebVideos(ffmpeg, input);
  await extractPoster(ffmpeg, input);

  const hevcMb = (statSync(VIDEO_HEVC).size / 1024 / 1024).toFixed(1);
  const h264Mb = (statSync(VIDEO_H264).size / 1024 / 1024).toFixed(1);
  console.log(
    `  ✓ hero-hevc.mp4 (${hevcMb} MB) + hero.mp4 (${h264Mb} MB) + hero-poster.jpg`
  );

  // Only archive when the file came from inbox (not already in _done)
  if (!input.includes(path.join("_done", "hero"))) {
    moveToDone(input);
  }
  console.log("\nFærdig. Genindlæs forsiden (Ctrl+Shift+R).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
