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
      <Link
        href={`/arbejde/${project.slug}`}
        aria-label={`${project.title}, ${project.category}`}
        className="group/project group block"
      >
        <div className="relative overflow-hidden">
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
              fullBleed
                ? undefined
                : aspectRatioStyle(cover.width, cover.height)
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
        </div>

        <div className="project-caption">
          <div className="min-w-0">
            <p className="project-meta">{project.category}</p>
            <h2
              className={cn(
                "project-title mt-1 font-display leading-snug tracking-[-0.02em]",
                featured
                  ? "text-[1.05rem] md:text-[1.2rem]"
                  : "text-[0.975rem] md:text-[1.05rem]"
              )}
            >
              {project.title}
            </h2>
          </div>
          <span aria-hidden className="project-cta">
            Se projekt →
          </span>
        </div>
      </Link>
    </article>
  );
}
