"use client";

import { MasonryGallery } from "@/components/MasonryGallery";
import type { ReferenceImage } from "@/data/references";
import { referenceImagesToPhotos } from "@/lib/reference-utils";

interface ReferenceGalleryMasonryProps {
  images: ReferenceImage[];
  slug: string;
  part: string;
}

export function ReferenceGalleryMasonry({
  images,
  slug,
  part,
}: ReferenceGalleryMasonryProps) {
  const photos = referenceImagesToPhotos(images, `${slug}-${part}`);

  return <MasonryGallery photos={photos} />;
}
