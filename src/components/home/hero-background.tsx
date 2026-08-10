"use client";

import Image from "next/image";

import type { ProjectImage } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  /** Wide landscape — desktop */
  image: ProjectImage;
  /** Portrait — mobile */
  mobileImage: ProjectImage;
  className?: string;
};

/**
 * Art-directed hero stills via next/image (WebP, responsive sizes, LCP priority).
 * Desktop: landscape. Mobile: dedicated portrait crop.
 */
export function HeroBackground({
  image,
  mobileImage,
  className,
}: HeroBackgroundProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Image
        src={mobileImage.src}
        alt={mobileImage.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[50%_18%] md:hidden"
      />
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        quality={90}
        sizes="(min-width: 1600px) 1600px, 100vw"
        className="hidden object-cover object-[50%_40%] md:block"
      />
    </div>
  );
}
