"use client";

import { CldImage } from "next-cloudinary";
import type { CSSProperties } from "react";

type CloudinaryPhotoProps = {
  cloudinaryId: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes: string;
  fill?: boolean;
  width?: number;
  height?: number;
  quality: number;
  unoptimized?: boolean;
  style?: CSSProperties;
  onLoad: () => void;
  onError: () => void;
};

/** Isolated so next-cloudinary stays out of the default Photo bundle. */
export function CloudinaryPhoto({
  cloudinaryId,
  alt,
  priority,
  className,
  sizes,
  fill,
  width,
  height,
  quality,
  unoptimized,
  style,
  onLoad,
  onError,
}: CloudinaryPhotoProps) {
  if (fill) {
    return (
      <CldImage
        src={cloudinaryId}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized}
        className={className}
        onLoad={onLoad}
        onError={onError}
        decoding="async"
        style={style}
      />
    );
  }

  return (
    <CldImage
      src={cloudinaryId}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={unoptimized}
      className={className}
      onLoad={onLoad}
      onError={onError}
      decoding="async"
      style={style}
    />
  );
}
