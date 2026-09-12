"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { ProjectHoverBrandOverlay } from "@/components/work/project-hover-brand";
import { getProjectHoverBrand } from "@/lib/data/project-branding";
import type { Project } from "@/lib/data/projects";
import { sortProjectsForMasonry } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";
import { aspectRatioStyle, cn } from "@/lib/utils";

const FILTER_INTRO: Record<string, string> = {
  sport:
    "Udvalgte projekter fra dynamiske produktioner, hvor timing og overblik betyder noget for det endelige resultat.",
  koncerter:
    "Materiale fra større liveproduktioner, der kan bruges direkte i kommunikationen bagefter.",
  events:
    "Visuelt materiale fra arrangementer og produktioner, leveret så det kan bruges i praksis.",
  portraetter:
    "Personligt og professionelt materiale til dem, der skal fremstå tydeligt og troværdigt.",
  erhverv:
    "Foto og video til virksomheder og brands, der skal have materiale med et professionelt og sammenhængende udtryk.",
};

type WorkIndexProps = {
  projects: Project[];
  initialKategori?: string;
};

function subscribeColumnCount(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

/**
 * Responsive masonry columns:
 * mobile <640 → 1 | tablet ≥640 → 2 | desktop ≥1024 → 3
 * Prefer larger tiles (3 across) over denser 4-col packing.
 */
function getViewportColumnCount() {
  const w = window.innerWidth;
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
}

/** SSR fallback — matches desktop default. */
function getServerColumnCount() {
  return 3;
}

function useViewportColumnCount() {
  return useSyncExternalStore(
    subscribeColumnCount,
    getViewportColumnCount,
    getServerColumnCount
  );
}

/** Cap at viewport cols; never leave empty columns for sparse filters. */
function resolveColumnCount(viewportCols: number, itemCount: number) {
  if (itemCount <= 1) return 1;
  return Math.min(viewportCols, itemCount);
}

/** Natural cover height ratio for shortest-column packing. */
function coverRatio(project: Project) {
  const { cover } = project;
  if (!cover.width || !cover.height) return 1;
  return cover.height / cover.width;
}

/**
 * Shortest-column masonry — each image keeps its natural height; next item
 * goes into the currently shortest column (not a CSS row grid).
 * Recomputes whenever `projects` or column count changes (incl. filters).
 */
function MasonryBoard({
  projects,
  layoutKey,
}: {
  projects: Project[];
  layoutKey: string;
}) {
  const viewportCols = useViewportColumnCount();
  const columnCount = resolveColumnCount(viewportCols, projects.length);

  const columns = useMemo(() => {
    const cols: { project: Project; index: number }[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const colHeights = Array.from({ length: columnCount }, () => 0);

    projects.forEach((project, index) => {
      let target = 0;
      for (let c = 1; c < columnCount; c += 1) {
        if (colHeights[c] < colHeights[target]) target = c;
      }
      cols[target].push({ project, index });
      // Cover ratio + title/meta + vertical gap (relative to column width)
      colHeights[target] += coverRatio(project) + 0.2;
    });

    return cols;
  }, [projects, columnCount]);

  const sizes =
    columnCount >= 3
      ? "(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
      : columnCount === 2
        ? "(min-width: 640px) 46vw, 100vw"
        : "100vw";

  return (
    <div
      key={layoutKey}
      className={cn(
        "flex items-start gap-x-5 motion-safe:animate-[arbejde-board-in_0.45s_cubic-bezier(0.22,1,0.36,1)_both] md:gap-x-6 lg:gap-x-7",
        projects.length === 1 && "max-w-3xl",
        projects.length === 2 && columnCount <= 2 && "max-w-5xl"
      )}
      data-masonry-cols={columnCount}
    >
      {columns.map((col, colIndex) => (
        <div
          key={`${layoutKey}-col-${colIndex}`}
          className="flex min-w-0 flex-1 flex-col gap-5 md:gap-6 lg:gap-7"
        >
          {col.map(({ project, index }) => {
            const hoverBrand = getProjectHoverBrand(project.slug);
            const { cover } = project;

            return (
              <article
                key={project.slug}
                className="motion-safe:animate-[arbejde-card-in_0.75s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{
                  animationDelay: `${Math.min(index * 55 + colIndex * 35, 320)}ms`,
                }}
              >
                <Link
                  href={`/arbejde/${project.slug}`}
                  className="group/project group block"
                >
                  <div className="relative overflow-hidden">
                    <Photo
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      sizes={sizes}
                      className="arbejde-bw-cover w-full"
                      style={aspectRatioStyle(cover.width, cover.height)}
                      priority={index < columnCount}
                      quality={90}
                      interactive
                    />
                    {hoverBrand ? (
                      <ProjectHoverBrandOverlay brand={hoverBrand} />
                    ) : null}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <h2 className="project-title min-w-0 font-display text-[0.95rem] leading-snug tracking-[-0.02em] md:text-[1.05rem]">
                      {project.title}
                    </h2>
                    <p className="project-meta shrink-0">{project.category}</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function WorkIndex({
  projects,
  initialKategori = "alle",
}: WorkIndexProps) {
  const router = useRouter();
  // Local filter state → instant masonry re-pack; URL stays shareable
  const [kategori, setKategori] = useState(initialKategori || "alle");

  useEffect(() => {
    setKategori(initialKategori || "alle");
  }, [initialKategori]);

  const filtered = useMemo(() => {
    const list =
      kategori === "alle"
        ? projects
        : projects.filter((project) => project.discipline === kategori);
    return sortProjectsForMasonry(list);
  }, [kategori, projects]);

  function selectKategori(next: string) {
    if (next === kategori) return;
    setKategori(next);
    const params = new URLSearchParams();
    if (next !== "alle") params.set("kategori", next);
    const query = params.toString();
    router.replace(query ? `/arbejde?${query}` : "/arbejde", { scroll: false });
  }

  const activeDisciplines = siteConfig.disciplines.filter((item) =>
    projects.some((project) => project.discipline === item.slug)
  );

  const filters = [
    { slug: "alle", label: "Alt" },
    ...activeDisciplines,
  ] as const;

  const intro =
    kategori !== "alle" && FILTER_INTRO[kategori]
      ? FILTER_INTRO[kategori]
      : "Her finder du et udvalg af projekter, der viser bredden i mit arbejde – fra sport og koncerter til events, virksomheder og content. Det er et udpluk af mit arbejde og ikke en komplet oversigt over alt, jeg laver.";

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-24 md:px-8 md:pb-32 lg:px-12">
      <FadeIn immediate>
        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(3rem,8vw,6.25rem)] leading-[0.9] tracking-[-0.035em]">
            Udvalgt arbejde
          </h1>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-[1.65] text-muted-ink md:mt-6 md:text-[1.0625rem]">
            {intro}
          </p>
          <p className="mt-3 text-[0.875rem] text-muted-ink">
            Har du et job?{" "}
            <Link
              href="/booking"
              className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Book mig
            </Link>
            .
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.04} immediate>
        <div
          className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-foreground/10 pb-4 md:mt-14 md:gap-x-9"
          role="group"
          aria-label="Filtrer efter kategori"
        >
          {filters.map((filter) => {
            const active = kategori === filter.slug;
            return (
              <button
                key={filter.slug}
                type="button"
                aria-pressed={active}
                onClick={() => selectKategori(filter.slug)}
                className={cn(
                  "min-h-11 border-b pb-1 text-[0.75rem] font-medium tracking-[0.04em] transition-[color,border-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
                  active
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-ink hover:text-foreground"
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </FadeIn>

      <div className="mt-8 md:mt-10">
        {filtered.length > 0 ? (
          <MasonryBoard projects={filtered} layoutKey={kategori} />
        ) : (
          <p className="mt-12 text-muted-ink">
            Ingen projekter i den kategori endnu.
          </p>
        )}
      </div>
    </div>
  );
}
