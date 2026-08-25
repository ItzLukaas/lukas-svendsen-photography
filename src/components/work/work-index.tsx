"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { ProjectHoverBrandOverlay } from "@/components/work/project-hover-brand";
import { getProjectHoverBrand } from "@/lib/data/project-branding";
import type { Project } from "@/lib/data/projects";
import { sortProjectsForMasonry } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";
import { aspectRatioStyle, cn } from "@/lib/utils";

type WorkIndexProps = {
  projects: Project[];
  /** Server-provided category so H1 + grid SSR without useSearchParams */
  initialKategori?: string;
};

/**
 * Portfolio index — true CSS-column masonry.
 * Landscape stays short; portrait stays tall. Uneven column rhythm = the wow.
 */
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

  return (
    <div className="mx-auto max-w-[1680px] px-4 pt-[calc(var(--chrome-h)+2rem)] pb-24 sm:px-6 md:px-8 md:pt-[calc(var(--chrome-h)+2.75rem)] md:pb-32 lg:px-12">
      <FadeIn immediate>
        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[-0.035em]">
            Arbejde
          </h1>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-[1.65] text-muted-ink md:mt-6 md:text-[1.0625rem]">
            Festival, sport, events og mere — fra Grindsted og ud i Jylland.
            Åbn et projekt for at se billederne.
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

      <ul
        className={cn(
          "mt-8 m-0 w-full list-none p-0 md:mt-10",
          /* True masonry: fill columns top→bottom, uneven heights create the rhythm */
          "[column-fill:auto]",
          "columns-1 gap-x-3",
          "min-[520px]:columns-2 min-[520px]:gap-x-4",
          "lg:columns-3 lg:gap-x-5",
          "xl:gap-x-6",
          "2xl:gap-x-7"
        )}
      >
        {filtered.map((project, index) => {
          const hoverBrand = getProjectHoverBrand(project.slug);
          const { cover } = project;
          const isWide = cover.width >= cover.height;

          return (
            <li
              key={project.slug}
              className="mb-6 break-inside-avoid min-[520px]:mb-5 md:mb-6 lg:mb-7"
            >
              {/* Opacity-only fade — transforms break CSS column fragmentation */}
              <FadeIn
                delay={Math.min(index * 0.04, 0.2)}
                immediate={index < 6}
                y={0}
                className="break-inside-avoid"
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
                      sizes="(min-width: 1024px) 32vw, (min-width: 520px) 46vw, 100vw"
                      className="w-full"
                      style={
                        isWide
                          ? aspectRatioStyle(cover.width, cover.height)
                          : {
                              /* Tall enough to contrast landscape (~3:2), not a full tower */
                              aspectRatio: "3 / 4",
                            }
                      }
                      imageClassName="object-cover object-center"
                      priority={index < 4}
                      quality={isWide ? 92 : 90}
                      interactive
                    />
                    {hoverBrand ? (
                      <ProjectHoverBrandOverlay brand={hoverBrand} />
                    ) : null}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3 md:mt-3.5">
                    <h2 className="project-title min-w-0 font-display text-[0.95rem] leading-snug tracking-[-0.02em] md:text-[1.05rem]">
                      {project.title}
                    </h2>
                    <p className="project-meta shrink-0">{project.category}</p>
                  </div>
                </Link>
              </FadeIn>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-ink">
          Ingen projekter i den kategori endnu.
        </p>
      ) : null}
    </div>
  );
}
