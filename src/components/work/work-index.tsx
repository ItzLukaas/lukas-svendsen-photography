"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
    "Håndbold-DM, Super Cup, klubkampe og spillerportrætter — sportsfotografi fra hele Danmark.",
  koncerter:
    "Festivaler og koncerter — Smukfest, Grøn Koncert, Varde Open Air, Suset og mere.",
  events: "Events med stemning, gæster og liveoplevelser.",
  portraetter: "Portrætter til private, klubber og foreninger.",
  erhverv: "Branding, produkt og visuelt materiale.",
};

type WorkIndexProps = {
  projects: Project[];
  initialKategori?: string;
};

function useColumnCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCount(3);
      else if (w >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function coverRatio(project: Project) {
  const { cover } = project;
  if (cover.width >= cover.height) {
    return cover.height / cover.width;
  }
  // Portrait cards use 3/4 for rhythm without towering
  return 4 / 3;
}

/**
 * Shortest-column masonry — packs by estimated cover height.
 * Avoids CSS-column + FadeIn bugs that made the grid look empty/flat.
 */
function MasonryBoard({ projects }: { projects: Project[] }) {
  const columnCount = useColumnCount();

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
      // Relative units — only ratios matter for packing
      colHeights[target] += coverRatio(project) + 0.12;
    });

    return cols;
  }, [projects, columnCount]);

  return (
    <div
      className={cn(
        "grid items-start gap-x-4",
        columnCount === 1 && "grid-cols-1",
        columnCount === 2 && "grid-cols-2",
        columnCount === 3 && "grid-cols-3",
        "md:gap-x-5 lg:gap-x-6 xl:gap-x-7"
      )}
    >
      {columns.map((col, colIndex) => (
        <div
          key={`col-${colIndex}`}
          className="flex min-w-0 flex-col gap-5 md:gap-6 lg:gap-7"
        >
          {col.map(({ project, index }) => {
            const hoverBrand = getProjectHoverBrand(project.slug);
            const { cover } = project;
            const isWide = cover.width >= cover.height;

            return (
              <article
                key={project.slug}
                className="motion-safe:animate-[arbejde-card-in_0.75s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{
                  animationDelay: `${Math.min(index * 60 + colIndex * 40, 360)}ms`,
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
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                      className="w-full"
                      style={
                        isWide
                          ? aspectRatioStyle(cover.width, cover.height)
                          : { aspectRatio: "3 / 4" }
                      }
                      imageClassName="object-cover object-center"
                      priority={index < 5}
                      quality={isWide ? 92 : 90}
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
                    <p className="project-meta shrink-0">
                      {project.category}
                      <span className="mx-1.5 opacity-35" aria-hidden>
                        ·
                      </span>
                      {project.location}
                    </p>
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
  const kategori = initialKategori || "alle";

  const filtered = useMemo(() => {
    const list =
      kategori === "alle"
        ? projects
        : projects.filter((project) => project.discipline === kategori);
    return sortProjectsForMasonry(list);
  }, [kategori, projects]);

  function setKategori(next: string) {
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
      : "Forskellige typer opgaver fra hele Danmark — sport, koncert, event, portræt og mere. Åbn et projekt for at se billederne.";

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-24 md:px-8 md:pb-32 lg:px-12">
      <FadeIn immediate>
        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(3rem,8vw,6.25rem)] leading-[0.9] tracking-[-0.035em]">
            Arbejde
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
                onClick={() => setKategori(filter.slug)}
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
          <MasonryBoard projects={filtered} />
        ) : (
          <p className="mt-12 text-muted-ink">
            Ingen projekter i den kategori endnu.
          </p>
        )}
      </div>
    </div>
  );
}
