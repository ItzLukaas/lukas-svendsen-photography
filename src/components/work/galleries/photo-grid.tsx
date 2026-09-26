"use client";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { GalleryFrame } from "@/components/work/lightbox";
import type { GalleryFormat, ProjectImage } from "@/lib/data/projects";
import { localizeImageAlt } from "@/lib/i18n/localize-content";
import {
  buildGallerySlots,
  formatGalleryCounter,
} from "@/lib/work/gallery-layout";
import { aspectRatioStyle, cn } from "@/lib/utils";

type PhotoGridProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
  format?: GalleryFormat;
  /** JPEG quality for grid thumbs (lightbox still uses high-res) */
  quality?: number;
  className?: string;
};

/**
 * Editorial project gallery — intentional full / pair rhythm.
 * Native aspect ratios; consistent gutters; subtle hover + reveal.
 */
export function PhotoGrid({
  images,
  projectSlug,
  onOpen,
  format = "mixed",
  quality = 88,
  className,
}: PhotoGridProps) {
  const { locale, dict } = useLocale();
  const slots = buildGallerySlots(images, format);
  const openLabel = (index: number, alt: string) =>
    `${dict.shared.openImage} ${index + 1}: ${alt}`;

  return (
    <div
      className={
        className ??
        "mx-auto mt-10 max-w-[1600px] px-5 md:mt-14 md:px-8 lg:mt-16 lg:px-12"
      }
    >
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {slots.map((slot, slotIndex) => {
          const delay = Math.min(slotIndex * 0.04, 0.2);

          if (slot.type === "full") {
            const index = slot.indices[0];
            const image = images[index];
            const alt = localizeImageAlt(image.alt, locale);
            const aloneCentered =
              index === images.length - 1 &&
              images.length % 2 === 1 &&
              index > 0;

            return (
              <FadeIn
                key={`${projectSlug}-slot-${slotIndex}`}
                delay={delay}
                y={10}
              >
                <GalleryFrame
                  label={openLabel(index, alt)}
                  onOpen={() => onOpen(index)}
                  className={cn(
                    aloneCentered &&
                      "sm:mx-auto sm:max-w-[calc((100%-1.25rem)/2)]"
                  )}
                  indexLabel={formatGalleryCounter(index, images.length)}
                >
                  <Photo
                    src={image.src}
                    alt={alt}
                    width={image.width}
                    height={image.height}
                    sizes={
                      aloneCentered
                        ? "(min-width: 1600px) 760px, (min-width: 640px) 45vw, 100vw"
                        : "(min-width: 1600px) 1600px, 100vw"
                    }
                    className="w-full"
                    style={aspectRatioStyle(image.width, image.height)}
                    priority={index < 2}
                    quality={index < 2 ? Math.max(quality, 90) : quality}
                    interactive
                  />
                </GalleryFrame>
              </FadeIn>
            );
          }

          return (
            <FadeIn
              key={`${projectSlug}-slot-${slotIndex}`}
              delay={delay}
              y={10}
            >
              <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:gap-6">
                {slot.indices.map((index) => {
                  const image = images[index];
                  const alt = localizeImageAlt(image.alt, locale);
                  return (
                    <GalleryFrame
                      key={`${projectSlug}-grid-${index}`}
                      label={openLabel(index, alt)}
                      onOpen={() => onOpen(index)}
                      indexLabel={formatGalleryCounter(index, images.length)}
                    >
                      <Photo
                        src={image.src}
                        alt={alt}
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
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
