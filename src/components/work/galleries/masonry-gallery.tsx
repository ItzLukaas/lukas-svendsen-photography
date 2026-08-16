import { Photo } from "@/components/photography/photo";
import { GalleryFrame } from "@/components/work/lightbox";
import type { ProjectImage } from "@/lib/data/projects";
import { aspectRatioStyle, cn } from "@/lib/utils";

type MasonryGalleryProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
};

/**
 * True masonry portfolio gallery — CSS columns, intrinsic aspect ratios,
 * no forced crop boxes. Tight, editorial spacing.
 */
export function MasonryGallery({
  images,
  projectSlug,
  onOpen,
}: MasonryGalleryProps) {
  return (
    <div className="mx-auto mt-12 max-w-[1600px] px-5 md:mt-16 md:px-8 lg:px-12">
      <ul
        className={cn(
          "m-0 w-full list-none p-0",
          "columns-1 gap-x-3",
          "min-[480px]:columns-2 min-[480px]:gap-x-4",
          "md:gap-x-5",
          "lg:columns-3 lg:gap-x-5",
          "xl:gap-x-6"
        )}
      >
        {images.map((image, index) => (
          <li
            key={`${projectSlug}-${image.src}-${index}`}
            className="mb-3 break-inside-avoid min-[480px]:mb-4 md:mb-5"
          >
            <GalleryFrame
              label={`Åbn billede: ${image.alt}`}
              onOpen={() => onOpen(index)}
            >
              <Photo
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 480px) 45vw, 100vw"
                className="w-full"
                style={aspectRatioStyle(image.width, image.height)}
                imageClassName="object-cover"
                priority={index < 2}
                quality={index < 3 ? 88 : 82}
                interactive
              />
            </GalleryFrame>
          </li>
        ))}
      </ul>
    </div>
  );
}
