import type { Reference } from "@/data/references";
import { ReferenceGalleryMasonry } from "./ReferenceGalleryMasonry";
import { ReferenceArticleImage } from "./ReferenceArticleImage";
import { ReferenceArticleSectionBlock } from "./ReferenceArticleSectionBlock";

interface ReferenceArticleContentProps {
  reference: Reference;
}

export function ReferenceArticleContent({ reference }: ReferenceArticleContentProps) {
  return (
    <div className="pb-8">
      {reference.articleFlow.map((block, index) => {
        if (block.type === "section") {
          const section = reference.articleSections[block.sectionIndex];
          if (!section) return null;
          return (
            <ReferenceArticleSectionBlock
              key={`section-${block.sectionIndex}`}
              section={section}
            />
          );
        }

        if (block.type === "cover") {
          return (
            <ReferenceArticleImage
              key="cover"
              image={reference.coverImage}
              priority={index === 0}
            />
          );
        }

        if (block.type === "gallery") {
          if (reference.gallery.length === 0) return null;
          return (
            <section key="gallery" className="px-6 py-10 lg:px-8 lg:py-14">
              <div className="mx-auto max-w-7xl">
                <ReferenceGalleryMasonry
                  images={reference.gallery.slice(0, 6)}
                  slug={reference.slug}
                  part="gallery"
                />
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
