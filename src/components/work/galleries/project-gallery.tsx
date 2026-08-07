"use client";

import { useState } from "react";

import { FestivalGallery } from "@/components/work/galleries/festival-gallery";
import { MixedGallery } from "@/components/work/galleries/mixed-gallery";
import { WideGallery } from "@/components/work/galleries/wide-gallery";
import { Lightbox } from "@/components/work/lightbox";
import type { Project } from "@/lib/data/projects";

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
      <MixedGallery
        images={project.images}
        projectSlug={project.slug}
        onOpen={setActiveIndex}
      />
    );

  return (
    <>
      {gallery}
      <Lightbox
        images={project.images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
        projectTitle={project.title}
      />
    </>
  );
}
