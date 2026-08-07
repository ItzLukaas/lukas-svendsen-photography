import { Photo } from "@/components/photography/photo";
import { GalleryFrame } from "@/components/work/lightbox";
import {
  isPortrait,
  type ProjectImage,
} from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type GalleryBlock =
  | { type: "cinematic"; image: ProjectImage; index: number }
  | { type: "inset"; image: ProjectImage; index: number }
  | { type: "portrait"; image: ProjectImage; index: number; align: "center" | "start" | "end" }
  | {
      type: "pair";
      left: ProjectImage;
      right: ProjectImage;
      leftIndex: number;
      rightIndex: number;
      stagger: "right" | "left";
    };

function buildMixedBlocks(images: ProjectImage[]): GalleryBlock[] {
  const blocks: GalleryBlock[] = [];
  let i = 0;
  let landscapeCount = 0;

  while (i < images.length) {
    const current = images[i];
    const next = images[i + 1];

    if (isPortrait(current) && next && isPortrait(next)) {
      blocks.push({
        type: "pair",
        left: current,
        right: next,
        leftIndex: i,
        rightIndex: i + 1,
        stagger: blocks.length % 2 === 0 ? "right" : "left",
      });
      i += 2;
      continue;
    }

    if (isPortrait(current)) {
      const align =
        blocks.length % 3 === 0
          ? "center"
          : blocks.length % 3 === 1
            ? "start"
            : "end";
      blocks.push({ type: "portrait", image: current, index: i, align });
      i += 1;
      continue;
    }

    // First landscape, or every third landscape after the lead → cinematic
    if (landscapeCount === 0 || landscapeCount % 3 === 0) {
      blocks.push({ type: "cinematic", image: current, index: i });
    } else if (landscapeCount % 3 === 2) {
      blocks.push({ type: "inset", image: current, index: i });
    } else {
      blocks.push({ type: "cinematic", image: current, index: i });
    }

    landscapeCount += 1;
    i += 1;
  }

  return blocks;
}

type MixedGalleryProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
};

/**
 * Editorial mixed gallery — compositions adapt to portrait/landscape.
 */
export function MixedGallery({
  images,
  projectSlug,
  onOpen,
}: MixedGalleryProps) {
  const blocks = buildMixedBlocks(images);

  return (
    <div className="mt-12 space-y-8 md:mt-16 md:space-y-14 lg:space-y-20">
      {blocks.map((block, blockIndex) => {
        if (block.type === "cinematic") {
          return (
            <div key={`${projectSlug}-c-${block.index}`}>
              <GalleryFrame
                label={`Åbn billede: ${block.image.alt}`}
                onOpen={() => onOpen(block.index)}
              >
                <Photo
                  src={block.image.src}
                  alt={block.image.alt}
                  width={block.image.width}
                  height={block.image.height}
                  sizes="100vw"
                  className={cn(
                    "w-full",
                    blockIndex === 0
                      ? "aspect-[5/4] sm:aspect-[16/10] md:aspect-[21/9]"
                      : "aspect-[4/3] sm:aspect-[16/10] md:aspect-[2/1]"
                  )}
                  priority={block.index === 0}
                  quality={block.index === 0 ? 88 : 82}
                  interactive
                />
              </GalleryFrame>
            </div>
          );
        }

        if (block.type === "inset") {
          return (
            <div key={`${projectSlug}-i-${block.index}`}>
              <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
                <GalleryFrame
                  label={`Åbn billede: ${block.image.alt}`}
                  onOpen={() => onOpen(block.index)}
                >
                  <Photo
                    src={block.image.src}
                    alt={block.image.alt}
                    width={block.image.width}
                    height={block.image.height}
                    sizes="(min-width: 1100px) 1100px, 100vw"
                    className="aspect-[16/10] w-full"
                    interactive
                  />
                </GalleryFrame>
              </div>
            </div>
          );
        }

        if (block.type === "portrait") {
          return (
            <div key={`${projectSlug}-p-${block.index}`}>
              <div
                className={cn(
                  "flex px-5 md:px-8 lg:px-12",
                  block.align === "center" && "justify-center",
                  block.align === "start" && "justify-start md:pl-[8%]",
                  block.align === "end" && "justify-end md:pr-[8%]"
                )}
              >
                <GalleryFrame
                  label={`Åbn billede: ${block.image.alt}`}
                  onOpen={() => onOpen(block.index)}
                  className="w-full max-w-[min(100%,26rem)] sm:max-w-[32rem] md:max-w-[38rem] lg:max-w-[42rem]"
                >
                  <Photo
                    src={block.image.src}
                    alt={block.image.alt}
                    width={block.image.width}
                    height={block.image.height}
                    sizes="(min-width: 1024px) 42rem, 90vw"
                    className="aspect-[3/4] w-full"
                    priority={block.index === 0}
                    interactive
                  />
                </GalleryFrame>
              </div>
            </div>
          );
        }

        return (
          <div key={`${projectSlug}-pair-${block.leftIndex}`}>
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:gap-8 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
              <GalleryFrame
                label={`Åbn billede: ${block.left.alt}`}
                onOpen={() => onOpen(block.leftIndex)}
                className={cn(
                  block.stagger === "left" && "sm:mt-16 lg:mt-24"
                )}
              >
                <Photo
                  src={block.left.src}
                  alt={block.left.alt}
                  width={block.left.width}
                  height={block.left.height}
                  sizes="(min-width: 640px) 40vw, 90vw"
                  className="aspect-[3/4] w-full"
                  interactive
                />
              </GalleryFrame>
              <GalleryFrame
                label={`Åbn billede: ${block.right.alt}`}
                onOpen={() => onOpen(block.rightIndex)}
                className={cn(
                  block.stagger === "right" && "sm:mt-16 lg:mt-24"
                )}
              >
                <Photo
                  src={block.right.src}
                  alt={block.right.alt}
                  width={block.right.width}
                  height={block.right.height}
                  sizes="(min-width: 640px) 40vw, 90vw"
                  className="aspect-[3/4] w-full"
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
