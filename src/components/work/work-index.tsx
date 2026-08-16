"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { ProjectHoverBrandOverlay } from "@/components/work/project-hover-brand";
import { getProjectHoverBrand } from "@/lib/data/project-branding";
import type { Project } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";
import { aspectRatioStyle, cn } from "@/lib/utils";

type WorkIndexProps = {
  projects: Project[];
  /** Server-provided category so H1 + grid SSR without useSearchParams */
  initialKategori?: string;
};

/**
 * Portfolio index — natural-aspect cards in a responsive wrap.
 * Incomplete final rows stay centered (e.g. DM Kvinder + Fredericia).
 */
export function WorkIndex({
  projects,
  initialKategori = "alle",
}: WorkIndexProps) {
  const router = useRouter();
  const kategori = initialKategori || "alle";

  const filtered = useMemo(() => {
    if (kategori === "alle") return projects;
    return projects.filter((project) => project.discipline === kategori);
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

      <ul
        className={cn(
          "mt-10 m-0 flex list-none flex-wrap justify-center p-0 md:mt-12",
          "gap-x-3 gap-y-8",
          "min-[480px]:gap-x-4 min-[480px]:gap-y-9",
          "md:gap-x-5 md:gap-y-10",
          "xl:gap-x-6"
        )}
      >
        {filtered.map((project, index) => {
          const hoverBrand = getProjectHoverBrand(project.slug);
          const { cover } = project;

          return (
            <li
              key={project.slug}
              className={cn(
                "w-full",
                /* 2 cols from 480px — last odd item centers via justify-center */
                "min-[480px]:w-[calc((100%-1rem)/2)]",
                /* 3 cols from lg — last 1–2 items center as a closing pair */
                "lg:w-[calc((100%-2.5rem)/3)]",
                "xl:w-[calc((100%-3rem)/3)]"
              )}
            >
              <FadeIn delay={Math.min(index * 0.03, 0.12)}>
                <Link
                  href={`/arbejde/${project.slug}`}
                  className="group/project group block"
                >
                  <div className="relative">
                    <Photo
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      sizes="(min-width: 1024px) 30vw, (min-width: 480px) 45vw, 100vw"
                      className="w-full"
                      style={aspectRatioStyle(cover.width, cover.height)}
                      imageClassName="object-cover"
                      priority={index < 2}
                      quality={index < 4 ? 88 : 82}
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
