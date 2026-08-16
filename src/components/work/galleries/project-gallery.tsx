"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { FestivalGallery } from "@/components/work/galleries/festival-gallery";
import { MasonryGallery } from "@/components/work/galleries/masonry-gallery";
import { WideGallery } from "@/components/work/galleries/wide-gallery";
import type { Project } from "@/lib/data/projects";

const Lightbox = dynamic(
  () =>
    import("@/components/work/lightbox").then((mod) => mod.Lightbox),
  { ssr: false }
);

type ProjectGalleryProps = {
  project: Project;
};

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const gallery =
    project.galleryFormat === "wide" ? (
      <WideGallery
        images={project.images}
        projectSlug={project.slug}
        onOpen={setActiveIndex}
      />
    ) : project.galleryFormat === "festival" ? (
      <FestivalGallery
        images={project.images}
        projectSlug={project.slug}
        onOpen={setActiveIndex}
      />
    ) : (
      <MasonryGallery
        images={project.images}
        projectSlug={project.slug}
        onOpen={setActiveIndex}
      />
    );

  return (
    <>
      {gallery}
      {activeIndex !== null ? (
        <Lightbox
          images={project.images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
          projectTitle={project.title}
        />
      ) : null}
    </>
  );
}
