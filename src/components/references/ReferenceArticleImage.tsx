import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { ReferenceImage } from "@/data/references";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";

interface ReferenceArticleImageProps {
  image: ReferenceImage;
  caption?: string;
  priority?: boolean;
}

export function ReferenceArticleImage({
  image,
  caption,
  priority = false,
}: ReferenceArticleImageProps) {
  return (
    <figure className="px-6 py-10 lg:px-8 lg:py-14">
      <div className="relative mx-auto aspect-[16/10] max-w-6xl overflow-hidden">
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          quality={IMAGE_QUALITY.hero}
          className="object-cover"
          sizes={IMAGE_SIZES.full}
        />
      </div>
      {(caption || image.alt) && (
        <figcaption className="mx-auto mt-5 max-w-2xl text-center text-xs tracking-wide text-white/35">
          {caption ?? image.alt}
        </figcaption>
      )}
    </figure>
  );
}
