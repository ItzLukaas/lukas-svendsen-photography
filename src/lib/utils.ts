import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Intrinsic frame matching the source photo — no forced crop box. */
export function aspectRatioStyle(width: number, height: number) {
  return { aspectRatio: `${width} / ${height}` } as const
}
