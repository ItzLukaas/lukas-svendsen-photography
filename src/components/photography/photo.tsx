"use client";

import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type PhotoProps = {
  src: string;
  alt: string;
  cloudinaryId?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  /**
   * Serve the source file directly (no Next.js re-encode).
   * Use for portfolio galleries where quality matters most.
   */
  unoptimized?: boolean;
  /** Gentle zoom on parent `.group:hover` */
  interactive?: boolean;
};

/**
 * Photography-first image primitive.
 * Reserves space, fades in on load, optional hover scale.
 */
export function Photo({
  src,
  alt,
  cloudinaryId,
  priority = false,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fill,
  width,
  height,
  quality = 82,
  unoptimized = false,
  interactive = false,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(priority);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const useCloudinary = Boolean(cloudName && cloudinaryId);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const node = imgRef.current;
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src, cloudinaryId]);

  const imageClasses = cn(
    "object-cover transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
    loaded ? "opacity-100" : "opacity-0",
    interactive &&
      "group-hover:scale-[1.012] motion-reduce:group-hover:scale-100",
    !fill && "h-full w-full",
    imageClassName
  );

  const shared = {
    alt,
    sizes,
    priority,
    quality,
    unoptimized,
    className: imageClasses,
    onLoad: handleLoad,
    decoding: "async" as const,
    ref: imgRef,
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[color-mix(in_srgb,var(--ink)_5%,transparent)]",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgb(14_14_14/0.04)_50%,transparent_70%)] bg-[length:200%_100%]",
          loaded
            ? "opacity-0"
            : "animate-[photo-shimmer_1.4s_ease_infinite] opacity-100"
        )}
      />

      {useCloudinary && cloudinaryId ? (
        fill ? (
          <CldImage src={cloudinaryId} fill {...shared} />
        ) : (
          <CldImage
            src={cloudinaryId}
            width={width}
            height={height}
            {...shared}
          />
        )
      ) : fill ? (
        <Image src={src} fill {...shared} />
      ) : (
        <Image src={src} width={width} height={height} {...shared} />
      )}
    </div>
  );
}
