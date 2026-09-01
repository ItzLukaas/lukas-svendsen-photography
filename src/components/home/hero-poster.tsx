import { getImageProps } from "next/image";

import { heroVideoPaths } from "@/lib/hero-video";
import { cn } from "@/lib/utils";

type HeroPosterProps = {
  className?: string;
};

/**
 * Instant LCP fallback while hero video buffers — extracted frame from source clip.
 */
export function HeroPoster({ className }: HeroPosterProps) {
  const {
    props: { src, ...rest },
  } = getImageProps({
    alt: "",
    width: 1920,
    height: 1080,
    quality: 88,
    sizes: "(min-width: 1600px) 1600px, 100vw",
    src: heroVideoPaths.poster,
  });

  return (
    <div className={cn("absolute inset-0 z-0", className)} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...rest}
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_38%] md:object-[40%_42%]"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
