import { PhotoGrid } from "@/components/work/galleries/photo-grid";
import type { ProjectImage } from "@/lib/data/projects";

type FestivalGalleryProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
};

/**
 * Festival gallery — 2-up grid for concert/portrait sets.
 */
export function FestivalGallery({
  images,
  projectSlug,
  onOpen,
}: FestivalGalleryProps) {
  return (
    <PhotoGrid
      images={images}
      projectSlug={projectSlug}
      onOpen={onOpen}
      quality={90}
    />
  );
}
