import { existsSync } from "node:fs";
import path from "node:path";

export function hasHeroVideoAssets() {
  return existsSync(path.join(process.cwd(), "public", "videos", "hero.mp4"));
}
