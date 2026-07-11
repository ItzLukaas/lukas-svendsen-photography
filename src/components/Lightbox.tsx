"use client";

import { m, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/photos";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { EASE } from "@/lib/motion";
import { IMAGE_QUALITY } from "@/lib/image";

interface LightboxProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
}

export function Lightbox({ photo, photos, onClose, onNavigate }: LightboxProps) {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(photos[currentIndex + 1]);
    }
  }, [currentIndex, photos, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(photos[currentIndex - 1]);
    }
  }, [currentIndex, photos, onNavigate]);

  useEffect(() => {
    if (!photo) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [photo, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {photo && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-black/96 backdrop-blur-md pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] will-change-opacity"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Billedvisning"
        >
          <div
            className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-8 sm:py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs tracking-[0.25em] text-white/35 uppercase">
              {currentIndex + 1} / {photos.length}
            </p>
            <button
              onClick={onClose}
              aria-label="Luk"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-premium hover:border-white/25 hover:text-white"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Forrige billede"
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/40 backdrop-blur-sm transition-all duration-500 ease-premium hover:border-white/25 hover:text-white sm:left-6 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>
            )}

            {currentIndex < photos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Næste billede"
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/40 backdrop-blur-sm transition-all duration-500 ease-premium hover:border-white/25 hover:text-white sm:right-6 sm:h-12 sm:w-12"
              >
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            )}

            <m.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex max-h-full w-full max-w-full items-center justify-center will-change-[transform,opacity]"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="mx-auto block max-h-[min(calc(100dvh-12rem),calc(100vh-12rem))] w-auto max-w-full object-contain"
                sizes="100vw"
                quality={IMAGE_QUALITY.hero}
                priority
                blur={false}
              />
            </m.div>
          </div>

          <div
            className="shrink-0 border-t border-white/[0.08] px-4 py-4 sm:px-8 sm:py-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-white/55">
              {photo.alt}
            </p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
