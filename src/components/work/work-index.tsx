"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { ProjectHoverBrandOverlay } from "@/components/work/project-hover-brand";
import { getProjectHoverBrand } from "@/lib/data/project-branding";
import type { Project } from "@/lib/data/projects";
import { sortProjectsPortraitFirst } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type WorkIndexProps = {
  projects: Project[];
  /** Server-provided category so H1 + grid SSR without useSearchParams */
  initialKategori?: string;
};

function coverAspect(project: Project, index: number) {
  if (project.cover.orientation === "portrait") {
    return index % 5 === 0
      ? "aspect-[3/4] w-full sm:aspect-[2/3]"
      : "aspect-[3/4] w-full";
  }
  if (project.featured || index % 4 === 0) {
    return "aspect-[16/10] w-full md:aspect-[5/3]";
  }
  if (index % 3 === 1) {
    return "aspect-[4/3] w-full";
  }
  return "aspect-[3/2] w-full";
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
    return sortProjectsPortraitFirst(list);
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
    <div className="mx-auto max-w-[1600px] px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-20 md:px-8 md:pb-28 lg:px-12">
      <FadeIn immediate>
        <h1 className="font-display text-[clamp(2.85rem,7.5vw,5.75rem)] leading-[0.92] tracking-[-0.03em]">
          Arbejde
        </h1>
        <p className="text-body mt-5 max-w-lg">
          Festival, sport, events og mere — fra Grindsted og ud i Jylland. Åbn
          et projekt for at se billederne.
        </p>
        <p className="mt-4 text-[0.875rem] text-muted-ink">
          Har du et job?{" "}
          <Link
            href="/booking"
            className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Book mig
          </Link>
          .
        </p>
      </FadeIn>

      <FadeIn delay={0.05} immediate>
        <div
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-foreground/10 pb-5"
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

      <div className="mt-14 columns-1 gap-x-8 gap-y-0 sm:columns-2 sm:gap-x-10 xl:columns-3 xl:gap-x-12">
        {filtered.map((project, index) => {
          const hoverBrand = getProjectHoverBrand(project.slug);

          return (
            <FadeIn
              key={project.slug}
              delay={Math.min(index * 0.03, 0.12)}
              className={cn(
                "mb-14 break-inside-avoid sm:mb-16",
                index % 5 === 2 && "sm:mt-10",
                index % 5 === 4 && "xl:mt-20"
              )}
            >
              <Link
                href={`/arbejde/${project.slug}`}
                className="group/project group block"
              >
                <div className="relative">
                  <Photo
                    src={project.cover.src}
                    alt={project.cover.alt}
                    width={project.cover.width}
                    height={project.cover.height}
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className={coverAspect(project, index)}
                    priority={index < 1}
                    interactive
                  />
                  {hoverBrand ? (
                    <ProjectHoverBrandOverlay brand={hoverBrand} />
                  ) : null}
                </div>
                <div className="project-caption">
                  <h2 className="project-title font-display text-[0.975rem] leading-tight tracking-[-0.018em] md:text-[1.1rem]">
                    {project.title}
                  </h2>
                  <p className="project-meta">{project.category}</p>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-ink">
          Ingen projekter i den kategori endnu.
        </p>
      ) : null}
    </div>
  );
}
