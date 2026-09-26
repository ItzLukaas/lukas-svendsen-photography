import { PhotoGrid } from "@/components/work/galleries/photo-grid";
import type { ProjectImage } from "@/lib/data/projects";

type WideGalleryProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
};

export function WideGallery({
  images,
  projectSlug,
  onOpen,
}: WideGalleryProps) {
  return (
    <PhotoGrid
      images={images}
      projectSlug={projectSlug}
      onOpen={onOpen}
      format="wide"
      quality={90}
    />
  );
}
