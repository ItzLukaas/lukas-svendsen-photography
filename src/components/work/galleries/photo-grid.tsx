import { Photo } from "@/components/photography/photo";
import { GalleryFrame } from "@/components/work/lightbox";
import type { ProjectImage } from "@/lib/data/projects";
import { aspectRatioStyle, cn } from "@/lib/utils";

type PhotoGridProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
  /** JPEG quality for grid thumbs (lightbox still uses originals) */
  quality?: number;
  className?: string;
};

/**
 * Project gallery grid — 1 col mobile, 2 cols tablet/desktop.
 * Odd last image spans the row and centers at single-column width.
 */
export function PhotoGrid({
  images,
  projectSlug,
  onOpen,
  quality = 88,
  className,
}: PhotoGridProps) {
  const oddTrailing = images.length % 2 === 1;

  return (
    <div
      className={
        className ??
        "mx-auto mt-12 max-w-[1600px] px-5 md:mt-16 md:px-8 lg:mt-20 lg:px-12"
      }
    >
      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 sm:gap-6 md:gap-7 lg:gap-8">
        {images.map((image, index) => {
          const centerLast =
            oddTrailing && index === images.length - 1;

          return (
            <GalleryFrame
              key={`${projectSlug}-grid-${index}`}
              label={`Åbn billede: ${image.alt}`}
              onOpen={() => onOpen(index)}
              className={cn(
                centerLast &&
                  "sm:col-span-2 sm:mx-auto sm:max-w-[calc((100%-1.5rem)/2)] md:max-w-[calc((100%-1.75rem)/2)] lg:max-w-[calc((100%-2rem)/2)]"
              )}
            >
              <Photo
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1600px) 760px, (min-width: 640px) 45vw, 100vw"
                className="w-full"
                style={aspectRatioStyle(image.width, image.height)}
                priority={index < 2}
                quality={index < 2 ? Math.max(quality, 90) : quality}
                interactive
              />
            </GalleryFrame>
          );
        })}
      </div>
    </div>
  );
}
