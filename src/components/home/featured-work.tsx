import type { ReactNode } from "react";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import type { Project, ProjectImage } from "@/lib/data/projects";
import { projects } from "@/lib/data/projects";

type FeaturedEntry = {
  project: Project;
  image: ProjectImage;
};

function pickPortrait(project: Project): ProjectImage {
  return (
    project.images.find((image) => image.orientation === "portrait") ??
    project.cover
  );
}

/**
 * Editorial showcase — photography leads; captions stay quiet.
 * Opening pair → full-bleed → closing diptych.
 */
export function FeaturedWork() {
  const concert: FeaturedEntry = {
    project: projects[0],
    image: projects[0].cover,
  };
  const concertPortrait: FeaturedEntry = {
    project: projects[1],
    image: pickPortrait(projects[1]),
  };
  const event: FeaturedEntry = {
    project: projects[2],
    image: projects[2].cover,
  };
  const sportMen: FeaturedEntry = {
    project: projects[3],
    image: projects[3].cover,
  };
  const sportWomen: FeaturedEntry = {
    project: projects[4],
    image: projects[4].cover,
  };

  return (
    <section aria-labelledby="selected-work-heading">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12">
        <FadeIn>
          <p className="label-meta">Udvalgt arbejde</p>
          <h2
            id="selected-work-heading"
            className="mt-2.5 max-w-[14ch] font-display text-[clamp(1.85rem,3.6vw,2.55rem)] leading-[1.05] tracking-[-0.028em]"
          >
            Seneste produktioner
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:gap-7 lg:gap-9">
          <FadeIn className="md:col-span-8">
            <FeaturedLink entry={concert}>
              <Photo
                src={concert.image.src}
                alt={concert.image.alt}
                width={concert.image.width}
                height={concert.image.height}
                sizes="(min-width: 768px) 66vw, 100vw"
                className="aspect-[4/3] w-full md:aspect-[16/11]"
                interactive
              />
            </FeaturedLink>
          </FadeIn>

          <FadeIn delay={0.05} className="md:col-span-4 md:pt-12 lg:pt-16">
            <FeaturedLink entry={concertPortrait}>
              <Photo
                src={concertPortrait.image.src}
                alt={concertPortrait.image.alt}
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

      <FadeIn className="mt-12 md:mt-16 lg:mt-20">
        <FeaturedLink entry={event} fullBleed>
          <Photo
            src={event.image.src}
            alt={event.image.alt}
            width={event.image.width}
            height={event.image.height}
            sizes="100vw"
            className="aspect-[16/10] w-full md:aspect-[2.4/1]"
            interactive
          />
        </FeaturedLink>
      </FadeIn>

      <div className="mx-auto mt-12 max-w-[1600px] px-5 pb-16 md:mt-16 md:px-8 md:pb-24 lg:mt-20 lg:px-12 lg:pb-28">
        <div className="grid gap-6 md:grid-cols-2 md:gap-7 lg:gap-9">
          <FadeIn>
            <FeaturedLink entry={sportMen}>
              <Photo
                src={sportMen.image.src}
                alt={sportMen.image.alt}
                width={sportMen.image.width}
                height={sportMen.image.height}
                sizes="(min-width: 768px) 48vw, 100vw"
                className="aspect-[3/2] w-full"
                interactive
              />
            </FeaturedLink>
          </FadeIn>
          <FadeIn delay={0.05} className="md:pt-10 lg:pt-14">
            <FeaturedLink entry={sportWomen}>
              <Photo
                src={sportWomen.image.src}
                alt={sportWomen.image.alt}
                width={sportWomen.image.width}
                height={sportWomen.image.height}
                sizes="(min-width: 768px) 48vw, 100vw"
                className="aspect-[3/2] w-full"
                interactive
              />
            </FeaturedLink>
          </FadeIn>
        </div>

        <FadeIn delay={0.08} className="mt-12 flex justify-center md:mt-16">
          <Link href="/arbejde" className="btn-ghost">
            Se alt arbejde
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
  const { project } = entry;

  return (
    <Link
      href={`/arbejde/${project.slug}`}
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
        <div className="min-w-0">
          <p className="project-meta">
            {project.category}
            <span className="mx-1.5 opacity-35" aria-hidden>
              ·
            </span>
            {project.location}
          </p>
          <h3 className="project-title mt-1 font-display text-[0.975rem] leading-snug tracking-[-0.018em] md:text-[1.1rem]">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
