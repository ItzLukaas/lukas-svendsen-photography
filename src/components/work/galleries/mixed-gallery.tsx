import { PhotoGrid } from "@/components/work/galleries/photo-grid";
import type { ProjectImage } from "@/lib/data/projects";

type MixedGalleryProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
};

/**
 * Mixed gallery — 2-up grid (portrait + landscape keep native ratios).
 */
export function MixedGallery({
  images,
  projectSlug,
  onOpen,
}: MixedGalleryProps) {
  return (
    <PhotoGrid
      images={images}
      projectSlug={projectSlug}
      onOpen={onOpen}
      quality={86}
    />
  );
}
