"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { FadeIn } from "@/components/motion/fade-in";
import { WorkCard } from "@/components/work/work-card";
import type { Project } from "@/lib/data/projects";
import {
  layoutWorkTiles,
  sizesForSpan,
  tileClassName,
} from "@/lib/data/work-layout";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type WorkIndexProps = {
  projects: Project[];
  initialKategori?: string;
};

export function WorkIndex({
  projects,
  initialKategori = "alle",
}: WorkIndexProps) {
  const router = useRouter();
  const [kategori, setKategori] = useState(initialKategori || "alle");

  useEffect(() => {
    setKategori(initialKategori || "alle");
  }, [initialKategori]);

  const filtered = useMemo(() => {
    if (kategori === "alle") return projects;
    return projects.filter((project) => project.discipline === kategori);
  }, [kategori, projects]);

  const tiles = useMemo(() => layoutWorkTiles(filtered), [filtered]);

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
    { slug: "alle", label: "Alle" },
    ...activeDisciplines,
  ] as const;

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-24 md:px-8 md:pb-32 lg:px-12">
      <FadeIn immediate>
        <div className="max-w-xl">
          <h1 className="font-display text-[clamp(3rem,8vw,6.25rem)] leading-[0.9] tracking-[-0.035em]">
            Arbejde
          </h1>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-[1.65] text-muted-ink md:mt-6 md:text-[1.0625rem]">
            Udvalgte projekter med foto, video og content — sport, koncerter,
            events og det, der ligger imellem.
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
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-foreground/10 pb-4 md:mt-14 md:gap-x-8"
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
                  "min-h-11 pb-1 text-[0.6875rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
                  active
                    ? "border-b border-foreground text-foreground"
                    : "border-b border-transparent text-muted-ink hover:text-foreground"
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </FadeIn>

      <div className="mt-8 md:mt-12">
        {tiles.length > 0 ? (
          <div
            key={kategori}
            className="grid grid-cols-1 items-end gap-3 sm:grid-cols-12 sm:gap-4 md:gap-6 lg:gap-8"
          >
            {tiles.map((tile, index) => (
              <div
                key={tile.project.slug}
                className={tileClassName(tile)}
              >
                <WorkCard
                  project={tile.project}
                  sizes={sizesForSpan(tile.span, tile.center)}
                  featured={tile.featured}
                  fullBleed={tile.span === 12 && !tile.center}
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-muted-ink">
            Ingen projekter i den kategori endnu.
          </p>
        )}
      </div>
    </div>
  );
}
