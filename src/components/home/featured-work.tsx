"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import type { Project, ProjectImage } from "@/lib/data/projects";
import { projects } from "@/lib/data/projects";
import { localizeImageAlt } from "@/lib/i18n/localize-content";
import { localizedHref } from "@/lib/i18n/paths";

type FeaturedEntry = {
  project: Project;
  image: ProjectImage;
};

function projectBySlug(slug: string): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`Featured work missing project: ${slug}`);
  }
  return project;
}

function pickPortrait(project: Project): ProjectImage {
  return (
    project.images.find((image) => image.orientation === "portrait") ??
    project.cover
  );
}

/**
 * Selected work — editorial rhythm on neutral paper.
 */
export function FeaturedWork() {
  const { locale, dict } = useLocale();
  const workHref = localizedHref("/arbejde", locale);
  const varde = projectBySlug("varde-open-air");
  const thor = projectBySlug("thor-farlov-smukfest");
  const esbjerg = projectBySlug("esbjerg-streetfood");
  const sportMenProject = projectBySlug("dm-finalen-herrer");
  const sportWomenProject = projectBySlug("dm-finalen-kvinder");

  const concert: FeaturedEntry = {
    project: varde,
    image: varde.cover,
  };
  const concertPortrait: FeaturedEntry = {
    project: thor,
    image: pickPortrait(thor),
  };
  const event: FeaturedEntry = {
    project: esbjerg,
    image: esbjerg.cover,
  };
  const sportMen: FeaturedEntry = {
    project: sportMenProject,
    image: sportMenProject.cover,
  };
  const sportWomen: FeaturedEntry = {
    project: sportWomenProject,
    image: sportWomenProject.cover,
  };

  return (
    <section
      aria-labelledby="selected-work-heading"
      className="bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section)] md:px-8 lg:px-12">
        <FadeIn className="flex items-end justify-between gap-6">
          <div>
            <p className="label-meta">{dict.featuredWork.eyebrow}</p>
            <h2
              id="selected-work-heading"
              className="heading-strip mt-3 font-display"
            >
              {dict.featuredWork.title}
            </h2>
            <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.65] text-muted-ink md:text-[1rem]">
              {dict.featuredWork.body}
            </p>
          </div>
          <Link
            href={workHref}
            className="btn-ghost hidden shrink-0 sm:inline-flex"
          >
            {dict.featuredWork.viewAll}
          </Link>
        </FadeIn>

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-12 md:gap-5 lg:gap-6">
          <FadeIn className="md:col-span-8">
            <FeaturedLink entry={concert}>
              <Photo
                src={concert.image.src}
                alt={localizeImageAlt(concert.image.alt, locale)}
                width={concert.image.width}
                height={concert.image.height}
                sizes="(min-width: 768px) 66vw, 100vw"
                className="aspect-[4/3] w-full md:aspect-[16/11]"
                interactive
              />
            </FeaturedLink>
          </FadeIn>

          <FadeIn delay={0.05} className="md:col-span-4 md:pt-16 lg:pt-24">
            <FeaturedLink entry={concertPortrait}>
              <Photo
                src={concertPortrait.image.src}
                alt={localizeImageAlt(concertPortrait.image.alt, locale)}
                width={concertPortrait.image.width}
                height={concertPortrait.image.height}
                sizes="(min-width: 768px) 32vw, 100vw"
                className="aspect-[3/4] w-full"
                interactive
              />
            </FeaturedLink>
          </FadeIn>
        </div>
      </div>

      <FadeIn className="mt-4 md:mt-5 lg:mt-6">
        <FeaturedLink entry={event} fullBleed>
          <Photo
            src={event.image.src}
            alt={localizeImageAlt(event.image.alt, locale)}
            width={event.image.width}
            height={event.image.height}
            sizes="100vw"
            className="aspect-[16/10] w-full md:aspect-[2.4/1]"
            interactive
          />
        </FeaturedLink>
      </FadeIn>

      <div className="mx-auto mt-4 max-w-[1600px] px-5 pb-[var(--space-section)] md:mt-5 md:px-8 lg:mt-6 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
          <FadeIn>
            <FeaturedLink entry={sportMen}>
              <Photo
                src={sportMen.image.src}
                alt={localizeImageAlt(sportMen.image.alt, locale)}
                width={sportMen.image.width}
                height={sportMen.image.height}
                sizes="(min-width: 768px) 48vw, 100vw"
                className="aspect-[3/2] w-full"
                interactive
              />
            </FeaturedLink>
          </FadeIn>
          <FadeIn delay={0.05} className="md:pt-14 lg:pt-20">
            <FeaturedLink entry={sportWomen}>
              <Photo
                src={sportWomen.image.src}
                alt={localizeImageAlt(sportWomen.image.alt, locale)}
                width={sportWomen.image.width}
                height={sportWomen.image.height}
                sizes="(min-width: 768px) 48vw, 100vw"
                className="aspect-[3/2] w-full"
                interactive
              />
            </FeaturedLink>
          </FadeIn>
        </div>

        <FadeIn delay={0.06} className="mt-9 flex justify-center sm:hidden">
          <Link href={workHref} className="btn-ghost">
            {dict.featuredWork.viewAll}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function FeaturedLink({
  entry,
  children,
  fullBleed = false,
}: {
  entry: FeaturedEntry;
  children: ReactNode;
  fullBleed?: boolean;
}) {
  const { locale, dict } = useLocale();
  const { project } = entry;
  const labels = dict.projectLabels[project.slug];
  const title = labels?.title ?? project.title;
  const category = labels?.category ?? project.category;

  return (
    <Link
      href={localizedHref(`/arbejde/${project.slug}`, locale)}
      className="group/project group block"
    >
      {children}
      <div
        className={
          fullBleed
            ? "project-caption mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12"
            : "project-caption"
        }
      >
        <div className="flex min-w-0 items-end justify-between gap-4">
          <div>
            <p className="project-meta">
              {category}
              <span className="mx-1.5 opacity-35" aria-hidden>
                ·
              </span>
              {project.location}
            </p>
            <h3 className="project-title mt-1 font-display text-[0.975rem] leading-snug tracking-[-0.018em] md:text-[1.1rem]">
              {title}
            </h3>
          </div>
          <span aria-hidden className="project-cta mb-0.5">
            {dict.featuredWork.seeProject} →
          </span>
        </div>
      </div>
    </Link>
  );
}
