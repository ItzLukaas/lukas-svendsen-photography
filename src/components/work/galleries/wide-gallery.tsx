import { Photo } from "@/components/photography/photo";
import { GalleryFrame } from "@/components/work/lightbox";
import type { ProjectImage } from "@/lib/data/projects";
import { aspectRatioStyle } from "@/lib/utils";

type WideBlock =
  | { type: "hero"; image: ProjectImage; index: number }
  | { type: "full"; image: ProjectImage; index: number }
  | { type: "inset"; image: ProjectImage; index: number }
  | {
      type: "split";
      left: ProjectImage;
      right: ProjectImage;
      leftIndex: number;
      rightIndex: number;
    };

function buildWideBlocks(images: ProjectImage[]): WideBlock[] {
  if (images.length === 0) return [];

  const blocks: WideBlock[] = [
    { type: "hero", image: images[0], index: 0 },
  ];

  let i = 1;
  while (i < images.length) {
    const remaining = images.length - i;

    // Occasional split of two landscapes for rhythm (not every time)
    if (
      remaining >= 2 &&
      blocks.length > 1 &&
      blocks.length % 4 === 0
    ) {
      blocks.push({
        type: "split",
        left: images[i],
        right: images[i + 1],
        leftIndex: i,
        rightIndex: i + 1,
      });
      i += 2;
      continue;
    }

    if (i % 3 === 0) {
      blocks.push({ type: "inset", image: images[i], index: i });
    } else {
      blocks.push({ type: "full", image: images[i], index: i });
    }
    i += 1;
  }

  return blocks;
}

type WideGalleryProps = {
  images: ProjectImage[];
  projectSlug: string;
  onOpen: (index: number) => void;
};

/**
 * Wide gallery — cinematic landscapes with breathing room.
 */
export function WideGallery({
  images,
  projectSlug,
  onOpen,
}: WideGalleryProps) {
  const blocks = buildWideBlocks(images);

  return (
    <div className="mt-14 space-y-8 md:mt-20 md:space-y-12 lg:space-y-16">
      {blocks.map((block) => {
        if (block.type === "hero") {
          return (
            <div key={`${projectSlug}-hero`}>
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
                  className="w-full"
                  style={aspectRatioStyle(block.image.width, block.image.height)}
                  priority
                  quality={90}
                  interactive
                />
              </GalleryFrame>
            </div>
          );
        }

        if (block.type === "inset") {
          return (
            <div key={`${projectSlug}-inset-${block.index}`}>
              <div className="mx-auto max-w-[1280px] px-5 py-4 md:px-10 md:py-6 lg:px-16">
                <GalleryFrame
                  label={`Åbn billede: ${block.image.alt}`}
                  onOpen={() => onOpen(block.index)}
                >
                  <Photo
                    src={block.image.src}
                    alt={block.image.alt}
                    width={block.image.width}
                    height={block.image.height}
                    sizes="(min-width: 1280px) 1280px, 100vw"
                    className="w-full"
                    style={aspectRatioStyle(block.image.width, block.image.height)}
                    quality={90}
                    interactive
                  />
                </GalleryFrame>
              </div>
            </div>
          );
        }

        if (block.type === "split") {
          return (
            <div key={`${projectSlug}-split-${block.leftIndex}`}>
              <div className="grid grid-cols-1 gap-5 px-5 md:grid-cols-2 md:gap-6 md:px-8 lg:px-12">
                <GalleryFrame
                  label={`Åbn billede: ${block.left.alt}`}
                  onOpen={() => onOpen(block.leftIndex)}
                >
                  <Photo
                    src={block.left.src}
                    alt={block.left.alt}
                    width={block.left.width}
                    height={block.left.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="w-full"
                    style={aspectRatioStyle(block.left.width, block.left.height)}
                    quality={90}
                    interactive
                  />
                </GalleryFrame>
                <GalleryFrame
                  label={`Åbn billede: ${block.right.alt}`}
                  onOpen={() => onOpen(block.rightIndex)}
                >
                  <Photo
                    src={block.right.src}
                    alt={block.right.alt}
                    width={block.right.width}
                    height={block.right.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
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
          <div key={`${projectSlug}-full-${block.index}`}>
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
                className="w-full"
                style={aspectRatioStyle(block.image.width, block.image.height)}
                quality={90}
                interactive
              />
            </GalleryFrame>
          </div>
        );
      })}
    </div>
  );
}
