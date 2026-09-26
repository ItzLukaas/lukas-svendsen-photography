"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { ProjectGallery } from "@/components/work/galleries/project-gallery";
import type { Project } from "@/lib/data/projects";
import { localizeImageAlt, localizeRole } from "@/lib/i18n/localize-content";
import { localizedHref } from "@/lib/i18n/paths";
import { aspectRatioStyle } from "@/lib/utils";

type ProjectViewProps = {
  project: Project;
  previous: Project | null;
  next: Project | null;
};

export function ProjectView({ project, previous, next }: ProjectViewProps) {
  const { locale, dict } = useLocale();
  const copy = dict.projectPage;
  const labels = dict.projectLabels[project.slug];
  const title = labels?.title ?? project.title;
  const category = labels?.category ?? project.category;
  const excerpt = labels?.excerpt ?? project.excerpt;
  const outcome = labels?.outcome ?? project.outcome;
  const role = labels?.role ?? localizeRole(project.role, locale);
  const workHref = localizedHref("/arbejde", locale);
  const projectHref = (slug: string) =>
    localizedHref(`/arbejde/${slug}`, locale);

  return (
    <article className="pt-[calc(var(--chrome-h)+2.5rem)]">
      <header className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12">
        <FadeIn>
          <nav
            aria-label={dict.shared.breadcrumb}
            className="text-[0.75rem] tracking-[0.02em] text-muted-ink"
          >
            <ol className="m-0 flex list-none flex-wrap items-baseline gap-x-0 gap-y-1 p-0">
              <li className="after:mx-3 after:opacity-25 after:content-['/']">
                <Link
                  href={localizedHref("/", locale)}
                  className="transition-opacity duration-300 hover:opacity-55"
                >
                  {dict.shared.home}
                </Link>
              </li>
              <li className="after:mx-3 after:opacity-25 after:content-['/']">
                <Link
                  href={workHref}
                  className="transition-opacity duration-300 hover:opacity-55"
                >
                  {dict.nav.work}
                </Link>
              </li>
              <li className="after:mx-3 after:opacity-25 after:content-['/']">
                <Link
                  href={`${workHref}?kategori=${project.discipline}`}
                  className="transition-opacity duration-300 hover:opacity-55"
                >
                  {category}
                </Link>
              </li>
              <li className="text-ink/70" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.65rem,6.5vw,5rem)] leading-[0.92] tracking-[-0.03em]">
            {title}
          </h1>

          {project.client || role || project.location ? (
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] tracking-[0.02em] text-muted-ink">
              {project.client ? <span>{project.client}</span> : null}
              {role ? (
                <span className="inline-flex items-center gap-x-2">
                  <span aria-hidden className="opacity-25">
                    ·
                  </span>
                  {role}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-x-2">
                {(project.client || role) && (
                  <span aria-hidden className="opacity-25">
                    ·
                  </span>
                )}
                {project.location}, {project.year}
              </span>
            </p>
          ) : null}

          <p className="text-body mt-6 max-w-md md:mt-7">{excerpt}</p>

          {outcome ? (
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.65] text-muted-ink">
              {outcome}
            </p>
          ) : null}
        </FadeIn>
      </header>

      <div className="mt-10 md:mt-12">
        <ProjectGallery project={project} />
      </div>

      {project.clientUrl ? (
        <div className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12">
          <p className="mt-14 text-center text-[0.9375rem] tracking-[0.01em] text-muted-ink md:mt-20 md:text-base">
            {copy.inUseOn}{" "}
            <a
              href={project.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-foreground/25 underline-offset-[0.2em] transition-[decoration-color,opacity] duration-300 hover:decoration-foreground/60 hover:opacity-80"
            >
              {project.clientUrlLabel ?? copy.clientWebsite}
            </a>
          </p>
        </div>
      ) : null}

      {(previous || next) && (
        <nav
          aria-label={copy.moreProjects}
          className="mt-24 border-t border-foreground/10 md:mt-32"
        >
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-2">
            {previous ? (
              <Link
                href={projectHref(previous.slug)}
                className="group/project group border-b border-foreground/10 px-5 py-12 md:border-b-0 md:border-r md:px-8 md:py-16 lg:px-12"
              >
                <p className="project-meta">{copy.previous}</p>
                <div className="mt-5 flex items-end gap-6">
                  <div className="relative hidden w-28 shrink-0 overflow-hidden sm:block md:w-36">
                    <Photo
                      src={previous.cover.src}
                      alt={localizeImageAlt(previous.cover.alt, locale)}
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
                    <p className="project-meta">
                      {dict.projectLabels[previous.slug]?.category ??
                        previous.category}
                    </p>
                    <h2 className="project-title mt-1.5 font-display text-xl leading-tight tracking-[-0.02em] md:text-2xl">
                      {dict.projectLabels[previous.slug]?.title ??
                        previous.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {next ? (
              <Link
                href={projectHref(next.slug)}
                className="group/project group px-5 py-12 text-right md:px-8 md:py-16 lg:px-12"
              >
                <p className="project-meta">{copy.next}</p>
                <div className="mt-5 flex flex-row-reverse items-end gap-6">
                  <div className="relative hidden w-28 shrink-0 overflow-hidden sm:block md:w-36">
                    <Photo
                      src={next.cover.src}
                      alt={localizeImageAlt(next.cover.alt, locale)}
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
                    <p className="project-meta">
                      {dict.projectLabels[next.slug]?.category ?? next.category}
                    </p>
                    <h2 className="project-title mt-1.5 font-display text-xl leading-tight tracking-[-0.02em] md:text-2xl">
                      {dict.projectLabels[next.slug]?.title ?? next.title}
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
          <div className="max-w-md">
            <p className="label-meta">{copy.nextStep.eyebrow}</p>
            <p className="text-body mt-3">
              {copy.nextStep.bodyBefore}{" "}
              <Link
                href={`${workHref}?kategori=${project.discipline}`}
                className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                {copy.nextStep.seeMore.replace(
                  "{category}",
                  category.toLowerCase()
                )}
              </Link>{" "}
              {copy.nextStep.bodyAfter}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={localizedHref("/booking", locale)}
              className="btn-solid"
            >
              {copy.nextStep.bookMe}
            </Link>
            <Link href={workHref} className="btn-ghost">
              {copy.nextStep.backToWork}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
