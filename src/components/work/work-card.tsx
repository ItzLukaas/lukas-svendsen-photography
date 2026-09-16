import Link from "next/link";

import { Photo } from "@/components/photography/photo";
import { ProjectHoverBrandOverlay } from "@/components/work/project-hover-brand";
import { getProjectHoverBrand } from "@/lib/data/project-branding";
import type { Project } from "@/lib/data/projects";
import { aspectRatioStyle, cn } from "@/lib/utils";

type WorkCardProps = {
  project: Project;
  sizes: string;
  priority?: boolean;
  featured?: boolean;
  /** Full-width landscape — cap height so the opener stays cinematic, not endless. */
  fullBleed?: boolean;
};

export function WorkCard({
  project,
  sizes,
  priority = false,
  featured = false,
  fullBleed = false,
}: WorkCardProps) {
  const hoverBrand = getProjectHoverBrand(project.slug);
  const { cover } = project;

  return (
    <article>
      <h2 className="sr-only">{project.title}</h2>
      <Link
        href={`/arbejde/${project.slug}`}
        aria-label={`${project.title}, ${project.category}`}
        className="group/project group relative block overflow-hidden"
      >
        <Photo
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes={sizes}
          className={cn(
            "arbejde-bw-cover w-full",
            fullBleed && "h-[min(72vh,760px)] min-h-[320px]"
          )}
          style={
            fullBleed ? undefined : aspectRatioStyle(cover.width, cover.height)
          }
          priority={priority}
          quality={featured ? 90 : 88}
          interactive={false}
        />
        {hoverBrand ? <ProjectHoverBrandOverlay brand={hoverBrand} /> : null}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-20",
            "bg-black/0 transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            "[@media(hover:hover)_and_(pointer:fine)]:group-hover/project:bg-black/10",
            "motion-reduce:transition-none"
          )}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-4 pb-4 pt-14 md:px-5 md:pb-5">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <span
                className={cn(
                  "block font-display leading-[1.15] tracking-[-0.03em] text-white",
                  "drop-shadow-[0_1px_12px_rgb(0_0_0/0.45)]",
                  featured
                    ? "text-[1.05rem] md:text-[1.35rem]"
                    : "text-[0.95rem] md:text-[1.05rem]"
                )}
              >
                {project.title}
              </span>
              <span className="mt-1 block text-[0.625rem] font-medium tracking-[0.16em] text-white/75 uppercase">
                {project.category}
              </span>
            </div>
            <span
              aria-hidden
              className={cn(
                "mb-0.5 text-[0.95rem] font-light text-white/80",
                "translate-x-0 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover/project:translate-x-0.5 group-hover/project:opacity-100",
                "group-focus-visible/project:opacity-100",
                "motion-reduce:transition-none"
              )}
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
