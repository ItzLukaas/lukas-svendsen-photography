"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { cn } from "@/lib/utils";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CloudinaryPhoto = dynamic(
  () =>
    import("@/components/photography/photo-cloudinary").then(
      (mod) => mod.CloudinaryPhoto
    ),
  { ssr: false }
);

type PhotoProps = {
  src: string;
  alt: string;
  cloudinaryId?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** CSS object-position for cropped covers */
  objectPosition?: string;
  /** Applied to the aspect/frame container */
  style?: CSSProperties;
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
 * Reserves space, fades in on load, optional hover scale, graceful error fallback.
 */
export function Photo({
  src,
  alt,
  cloudinaryId,
  priority = false,
  className,
  imageClassName,
  objectPosition,
  style,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fill,
  width,
  height,
  quality = 82,
  unoptimized = false,
  interactive = false,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(priority);
  const [failed, setFailed] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const useCloudinary = Boolean(cloudName && cloudinaryId);
  const resolvedAlt = alt || "";

  if (src !== activeSrc) {
    setActiveSrc(src);
    setFailed(false);
    setLoaded(priority);
  }

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setFailed(false);
  }, []);

  const handleError = useCallback(() => {
    setFailed(true);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;
    if (node.complete && node.naturalWidth > 0) {
      // Cached images may not fire onLoad — sync after mount/src change.
      queueMicrotask(() => setLoaded(true));
    }
  }, [src, cloudinaryId]);

  const imageClasses = cn(
    "object-cover transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
    loaded && !failed ? "opacity-100" : "opacity-0",
    interactive &&
      "group-hover:scale-[1.02] motion-reduce:group-hover:scale-100",
    !fill && "h-full w-full",
    imageClassName
  );

  const imageStyle = objectPosition ? { objectPosition } : undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[color-mix(in_srgb,var(--ink)_5%,transparent)]",
        className
      )}
      style={style}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgb(14_14_14/0.04)_50%,transparent_70%)] bg-[length:200%_100%]",
          loaded || failed
            ? "opacity-0"
            : "animate-[photo-shimmer_1.4s_ease_infinite] opacity-100 motion-reduce:animate-none"
        )}
      />

      {failed ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--ink)_6%,var(--paper))]"
          role="img"
          aria-label={resolvedAlt || "Billede kunne ikke indlæses"}
        >
          <span className="px-3 text-center text-[0.6875rem] tracking-[0.04em] text-muted-ink uppercase">
            Billede mangler
          </span>
        </div>
      ) : useCloudinary && cloudinaryId ? (
        <CloudinaryPhoto
          cloudinaryId={cloudinaryId}
          alt={resolvedAlt}
          fill={fill}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          quality={quality}
          unoptimized={unoptimized}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          style={imageStyle}
        />
      ) : fill ? (
        <Image
          ref={imgRef}
          src={src}
          alt={resolvedAlt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          unoptimized={unoptimized}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          style={imageStyle}
        />
      ) : (
        <Image
          ref={imgRef}
          src={src}
          alt={resolvedAlt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          quality={quality}
          unoptimized={unoptimized}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          style={imageStyle}
        />
      )}
    </div>
  );
}
