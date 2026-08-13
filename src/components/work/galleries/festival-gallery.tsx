import { Photo } from "@/components/photography/photo";
import { GalleryFrame } from "@/components/work/lightbox";
import type { ProjectImage } from "@/lib/data/projects";
import { aspectRatioStyle, cn } from "@/lib/utils";

type PortraitBlock =
  | { type: "hero"; image: ProjectImage; index: number }
  | {
      type: "pair";
      left: ProjectImage;
      right: ProjectImage;
      leftIndex: number;
      rightIndex: number;
      stagger: "right" | "left";
    }
  | {
      type: "feature";
      image: ProjectImage;
      index: number;
      align: "start" | "end";
      scale: "lg" | "md";
    };

/**
 * Fixed editorial sequence for 9 concert portraits.
 * hero → pair → feature → pair → feature → pair
 */
function buildPortraitCase(images: ProjectImage[]): PortraitBlock[] {
  const shots = images.slice(0, 9).map((image, index) => ({ image, index }));
  const blocks: PortraitBlock[] = [];

  if (!shots[0]) return blocks;

  blocks.push({ type: "hero", image: shots[0].image, index: shots[0].index });

  if (shots[1] && shots[2]) {
    blocks.push({
      type: "pair",
      left: shots[1].image,
      right: shots[2].image,
      leftIndex: shots[1].index,
      rightIndex: shots[2].index,
      stagger: "right",
    });
  }

  if (shots[3]) {
    blocks.push({
      type: "feature",
      image: shots[3].image,
      index: shots[3].index,
      align: "end",
      scale: "lg",
    });
  }

  if (shots[4] && shots[5]) {
    blocks.push({
      type: "pair",
      left: shots[4].image,
      right: shots[5].image,
      leftIndex: shots[4].index,
      rightIndex: shots[5].index,
      stagger: "left",
    });
  }

  if (shots[6]) {
    blocks.push({
      type: "feature",
      image: shots[6].image,
      index: shots[6].index,
      align: "start",
      scale: "md",
    });
  }

  if (shots[7] && shots[8]) {
    blocks.push({
      type: "pair",
      left: shots[7].image,
      right: shots[8].image,
      leftIndex: shots[7].index,
      rightIndex: shots[8].index,
      stagger: "right",
    });
  }

  return blocks;
}

type FestivalGalleryProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
};

/**
 * Premium 9-portrait festival case — editorial rhythm, no equal grid.
 */
export function FestivalGallery({
  images,
  projectSlug,
  onOpen,
}: FestivalGalleryProps) {
  const blocks = buildPortraitCase(images);

  return (
    <div className="mt-14 space-y-16 md:mt-20 md:space-y-28 lg:space-y-36">
      {blocks.map((block) => {
        if (block.type === "hero") {
          return (
            <div key={`${projectSlug}-hero-${block.index}`}>
              <div className="flex justify-center px-5 md:px-8 lg:px-12">
                <GalleryFrame
                  label={`Åbn billede: ${block.image.alt}`}
                  onOpen={() => onOpen(block.index)}
                  className="w-full max-w-[min(100%,28rem)] sm:max-w-[36rem] md:max-w-[44rem] lg:max-w-[48rem]"
                >
                  <Photo
                    src={block.image.src}
                    alt={block.image.alt}
                    width={block.image.width}
                    height={block.image.height}
                    sizes="(min-width: 1024px) 48rem, 92vw"
                    className="w-full"
                    style={aspectRatioStyle(block.image.width, block.image.height)}
                    priority
                    quality={90}
                    interactive
                  />
                </GalleryFrame>
              </div>
            </div>
          );
        }

        if (block.type === "pair") {
          return (
            <div key={`${projectSlug}-pair-${block.leftIndex}`}>
              <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-10 px-5 sm:grid-cols-2 sm:gap-10 md:gap-16 md:px-8 lg:gap-24 lg:px-12">
                <GalleryFrame
                  label={`Åbn billede: ${block.left.alt}`}
                  onOpen={() => onOpen(block.leftIndex)}
                  className={cn(
                    block.stagger === "left" && "sm:mt-20 lg:mt-28"
                  )}
                >
                  <Photo
                    src={block.left.src}
                    alt={block.left.alt}
                    width={block.left.width}
                    height={block.left.height}
                    sizes="(min-width: 640px) 42vw, 92vw"
                    className="w-full"
                    style={aspectRatioStyle(block.left.width, block.left.height)}
                    quality={90}
                    interactive
                  />
                </GalleryFrame>
                <GalleryFrame
                  label={`Åbn billede: ${block.right.alt}`}
                  onOpen={() => onOpen(block.rightIndex)}
                  className={cn(
                    block.stagger === "right" && "sm:mt-20 lg:mt-28"
                  )}
                >
                  <Photo
                    src={block.right.src}
                    alt={block.right.alt}
                    width={block.right.width}
                    height={block.right.height}
                    sizes="(min-width: 640px) 42vw, 92vw"
                    className="w-full"
                    style={aspectRatioStyle(block.right.width, block.right.height)}
                    quality={90}
                    interactive
                  />
                </GalleryFrame>
              </div>
            </div>
          );
        }

        return (
          <div key={`${projectSlug}-feature-${block.index}`}>
            <div
              className={cn(
                "flex px-5 md:px-8 lg:px-12",
                block.align === "start" && "justify-start md:pl-[8%]",
                block.align === "end" && "justify-end md:pr-[8%]"
              )}
            >
              <GalleryFrame
                label={`Åbn billede: ${block.image.alt}`}
                onOpen={() => onOpen(block.index)}
                className={cn(
                  "w-full",
                  block.scale === "lg"
                    ? "max-w-[min(100%,26rem)] sm:max-w-[32rem] md:max-w-[40rem] lg:max-w-[44rem]"
                    : "max-w-[min(100%,22rem)] sm:max-w-[28rem] md:max-w-[34rem] lg:max-w-[38rem]"
                )}
              >
                <Photo
                  src={block.image.src}
                  alt={block.image.alt}
                  width={block.image.width}
                  height={block.image.height}
                  sizes="(min-width: 768px) 44rem, 88vw"
                  className="w-full"
                  style={aspectRatioStyle(block.image.width, block.image.height)}
                  quality={90}
                  interactive
                />
              </GalleryFrame>
            </div>
          </div>
        );
      })}
    </div>
  );
}
