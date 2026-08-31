import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { ProjectGallery } from "@/components/work/galleries/project-gallery";
import { ProjectExtras } from "@/components/work/projects/project-extras";
import type { Project } from "@/lib/data/projects";
import { aspectRatioStyle } from "@/lib/utils";

type ProjectViewProps = {
  project: Project;
  previous: Project | null;
  next: Project | null;
};

export function ProjectView({ project, previous, next }: ProjectViewProps) {
  return (
    <article className="pt-[calc(var(--chrome-h)+2.5rem)]">
      {/* Exhibition intro — quiet, then the work */}
      <header className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12">
        <FadeIn>
          <nav aria-label="Brødkrumme" className="text-[0.75rem] tracking-[0.02em] text-muted-ink">
            <ol className="m-0 flex list-none flex-wrap items-baseline gap-x-0 gap-y-1 p-0">
              <li className="after:mx-3 after:opacity-25 after:content-['/']">
                <Link
                  href="/"
                  className="transition-opacity duration-300 hover:opacity-55"
                >
                  Forside
                </Link>
              </li>
              <li className="after:mx-3 after:opacity-25 after:content-['/']">
                <Link
                  href="/arbejde"
                  className="transition-opacity duration-300 hover:opacity-55"
                >
                  Arbejde
                </Link>
              </li>
              <li className="after:mx-3 after:opacity-25 after:content-['/']">
                <Link
                  href={`/arbejde?kategori=${project.discipline}`}
                  className="transition-opacity duration-300 hover:opacity-55"
                >
                  {project.category}
                </Link>
              </li>
              <li className="text-ink/70" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>

          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.65rem,6.5vw,5rem)] leading-[0.92] tracking-[-0.03em]">
            {project.title}
          </h1>

          {project.client || project.role || project.location ? (
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] tracking-[0.02em] text-muted-ink">
              {project.client ? (
                <span>{project.client}</span>
              ) : null}
              {project.role ? (
                <span className="inline-flex items-center gap-x-2">
                  <span aria-hidden className="opacity-25">
                    ·
                  </span>
                  {project.role}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-x-2">
                {(project.client || project.role) && (
                  <span aria-hidden className="opacity-25">
                    ·
                  </span>
                )}
                {project.location}, {project.year}
              </span>
            </p>
          ) : null}

          <p className="text-body mt-6 max-w-md md:mt-7">{project.excerpt}</p>

          {project.outcome ? (
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.65] text-muted-ink">
              {project.outcome}
            </p>
          ) : null}
        </FadeIn>
      </header>

      <div className="mt-10 md:mt-12">
        <ProjectGallery project={project} />
      </div>

      <ProjectExtras project={project} />

      {project.clientUrl ? (
        <div className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12">
          <p className="mt-14 text-center text-[0.9375rem] font-semibold tracking-[0.01em] text-ink md:mt-20 md:text-base">
            Se hele casen på{" "}
            <a
              href={project.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/25 underline-offset-[0.2em] transition-[decoration-color,opacity] duration-300 hover:decoration-foreground/60 hover:opacity-80"
            >
              {project.clientUrlLabel ?? "klientens hjemmeside"}
            </a>
          </p>
        </div>
      ) : null}

      {/* Adjacent projects — clear path through the portfolio */}
      {(previous || next) && (
        <nav
          aria-label="Flere projekter"
          className="mt-24 border-t border-foreground/10 md:mt-32"
        >
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-2">
            {previous ? (
              <Link
                href={`/arbejde/${previous.slug}`}
                className="group/project group border-b border-foreground/10 px-5 py-12 md:border-b-0 md:border-r md:px-8 md:py-16 lg:px-12"
              >
                <p className="project-meta">Forrige</p>
                <div className="mt-5 flex items-end gap-6">
                  <div className="relative hidden w-28 shrink-0 overflow-hidden sm:block md:w-36">
                    <Photo
                      src={previous.cover.src}
                      alt={previous.cover.alt}
                      width={previous.cover.width}
                      height={previous.cover.height}
                      sizes="144px"
                      className="w-full"
                      style={aspectRatioStyle(
                        previous.cover.width,
                        previous.cover.height
                      )}
                      interactive
                    />
                  </div>
                  <div className="min-w-0 pb-0.5">
                    <p className="project-meta">{previous.category}</p>
                    <h2 className="project-title mt-1.5 font-display text-xl leading-tight tracking-[-0.02em] md:text-2xl">
                      {previous.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {next ? (
              <Link
                href={`/arbejde/${next.slug}`}
                className="group/project group px-5 py-12 text-right md:px-8 md:py-16 lg:px-12"
              >
                <p className="project-meta">Næste</p>
                <div className="mt-5 flex flex-row-reverse items-end gap-6">
                  <div className="relative hidden w-28 shrink-0 overflow-hidden sm:block md:w-36">
                    <Photo
                      src={next.cover.src}
                      alt={next.cover.alt}
                      width={next.cover.width}
                      height={next.cover.height}
                      sizes="144px"
                      className="w-full"
                      style={aspectRatioStyle(
                        next.cover.width,
                        next.cover.height
                      )}
                      interactive
                    />
                  </div>
                  <div className="min-w-0 pb-0.5">
                    <p className="project-meta">{next.category}</p>
                    <h2 className="project-title mt-1.5 font-display text-xl leading-tight tracking-[-0.02em] md:text-2xl">
                      {next.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </nav>
      )}

      <section className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8 md:py-16 lg:px-12">
          <p className="text-body max-w-md">
            Skal jeg med på noget lignende? Book mig fra Grindsted.
          </p>
          <Link href="/booking" className="btn-solid bg-ink text-paper">
            Book mig
          </Link>
        </div>
      </section>
    </article>
  );
}
