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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/96 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Billedvisning"
          style={{ willChange: "opacity" }}
        >
          <button
            onClick={onClose}
            aria-label="Luk"
            className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-premium hover:border-white/25 hover:text-white"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Forrige billede"
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 ease-premium hover:border-white/25 hover:text-white md:left-8"
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
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 ease-premium hover:border-white/25 hover:text-white md:right-8"
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
            className="relative mx-4 max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
            style={{ willChange: "transform, opacity" }}
          >
            <OptimizedImage
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="max-h-[85vh] w-auto object-contain"
              sizes="90vw"
              quality={IMAGE_QUALITY.hero}
              priority
              blur={false}
            />
            <p className="mt-5 text-center text-sm tracking-wide text-white/45">
              {photo.alt}
            </p>
          </m.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/25">
            {currentIndex + 1} / {photos.length}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
