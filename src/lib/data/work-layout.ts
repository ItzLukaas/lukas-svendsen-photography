import { isPortraitCase, type Project } from "@/lib/data/projects";

export type WorkTileSpan = 4 | 6 | 8 | 12;

export type WorkTile = {
  project: Project;
  span: WorkTileSpan;
  featured: boolean;
  /** Leftover portrait — center so it never sits as a stray first-column stub. */
  center: boolean;
};

function pairSpans(a: Project, b: Project): [WorkTileSpan, WorkTileSpan] {
  const aPortrait = isPortraitCase(a);
  const bPortrait = isPortraitCase(b);
  if (aPortrait && !bPortrait) return [4, 8];
  if (!aPortrait && bPortrait) return [8, 4];
  return [6, 6];
}

/**
 * Controlled editorial grid — every row fills 12 columns.
 *
 * Why masonry failed: 3 independent columns + mixed portrait/landscape
 * covers end at different heights, so one project sits in a hole at the
 * bottom. This packer never leaves a partial row except an intentional
 * full-width closer (landscape) or a centered leftover portrait.
 *
 * Featured full-width landscapes are inserted only when the remaining
 * count stays even afterwards — so pairs never orphan a last item.
 */
export function layoutWorkTiles(projects: Project[]): WorkTile[] {
  const tiles: WorkTile[] = [];
  let index = 0;
  let fulls = 0;
  const maxFulls =
    projects.length >= 6 && projects.length % 2 === 0
      ? 2
      : projects.length % 2 === 1
        ? 1
        : 0;

  while (index < projects.length) {
    const remaining = projects.length - index;
    const current = projects[index];
    const portrait = isPortraitCase(current);

    if (remaining === 1) {
      tiles.push({
        project: current,
        span: 12,
        featured: !portrait,
        center: portrait,
      });
      break;
    }

    const prevWasFull = tiles.at(-1)?.span === 12;
    const leftover = remaining - 1;
    const leftoverEven = leftover % 2 === 0;
    const firstOfTwoFulls =
      fulls === 0 && maxFulls >= 2 && remaining % 2 === 0;
    const restoreEvenRemainder = leftoverEven;
    const takeFull =
      !portrait &&
      remaining >= 5 &&
      fulls < maxFulls &&
      !prevWasFull &&
      (firstOfTwoFulls || restoreEvenRemainder);

    if (takeFull) {
      tiles.push({
        project: current,
        span: 12,
        featured: true,
        center: false,
      });
      fulls += 1;
      index += 1;
      continue;
    }

    const next = projects[index + 1];
    const [spanA, spanB] = pairSpans(current, next);
    tiles.push({
      project: current,
      span: spanA,
      featured: spanA >= 8,
      center: false,
    });
    tiles.push({
      project: next,
      span: spanB,
      featured: spanB >= 8,
      center: false,
    });
    index += 2;
  }

  return tiles;
}

export function sizesForSpan(span: WorkTileSpan, center: boolean) {
  if (center) return "(min-width: 640px) 50vw, 100vw";
  if (span === 12) return "(min-width: 1600px) 1600px, 100vw";
  if (span === 8) return "(min-width: 640px) 66vw, 100vw";
  if (span === 4) return "(min-width: 640px) 33vw, 100vw";
  return "(min-width: 640px) 50vw, 100vw";
}

export function tileClassName(tile: WorkTile) {
  if (tile.center) return "sm:col-span-6 sm:col-start-4";
  if (tile.span === 12) return "sm:col-span-12";
  if (tile.span === 8) return "sm:col-span-8";
  if (tile.span === 4) return "sm:col-span-4";
  return "sm:col-span-6";
}
