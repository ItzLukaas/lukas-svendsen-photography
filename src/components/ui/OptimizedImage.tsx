import Image, { type ImageProps } from "next/image";
import { BLUR_DATA_URL } from "@/lib/image";

type OptimizedImageProps = Omit<
  ImageProps,
  "placeholder" | "blurDataURL" | "alt"
> & {
  alt: string;
  blur?: boolean;
};

export function OptimizedImage({
  blur = true,
  quality = 78,
  alt,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      quality={quality}
      placeholder={blur ? "blur" : "empty"}
      blurDataURL={blur ? BLUR_DATA_URL : undefined}
    />
  );
}
