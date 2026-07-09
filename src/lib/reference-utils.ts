import type { ReferenceImage } from "@/data/references";
import type { Photo } from "@/data/photos";

export function referenceImagesToPhotos(
  images: ReferenceImage[],
  prefix: string
): Photo[] {
  return images.map((img, i) => ({
    id: `${prefix}-${i}`,
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }));
}
