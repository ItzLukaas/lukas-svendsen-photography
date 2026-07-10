"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Expand } from "lucide-react";
import type { Photo } from "@/data/photos";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "./ScrollReveal";
import { sectionLabel } from "@/lib/styles";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";

const Lightbox = dynamic(
  () => import("./Lightbox").then((mod) => ({ default: mod.Lightbox })),
  { ssr: false },
);

interface MasonryGalleryProps {
  photos: Photo[];
  showTitle?: boolean;
}

function GalleryImage({ photo }: { photo: Photo }) {
  return (
    <OptimizedImage
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading="lazy"
      quality={IMAGE_QUALITY.gallery}
      className="w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
      sizes={IMAGE_SIZES.gallery}
    />
  );
}

export function MasonryGallery({ photos, showTitle = false }: MasonryGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      {showTitle && (
        <ScrollReveal className="mb-12 text-center">
          <p className={sectionLabel}>Udvalgte øjeblikke</p>
          <h2 className="font-display text-[1.65rem] font-light leading-[1.08] text-white sm:text-3xl md:text-[2.25rem] lg:text-4xl xl:text-[2.75rem]">
            Et kig på mit arbejde
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50">
            Et udvalg af øjeblikke fra min portefølje som fotograf og videoproducent — fra sport og
            events til portrætter og kreative projekter. Se eksempler på min stil, kvalitet og tilgang
            til visuel fortælling.
          </p>
        </ScrollReveal>
      )}

      <div className="masonry-grid">
        {photos.map((photo, index) => (
          <ScrollReveal key={photo.id} delay={index * 0.04} className="masonry-item">
            <button
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className="group relative block w-full cursor-pointer overflow-hidden transition-transform duration-500 ease-premium hover:-translate-y-0.5"
              aria-label={`Åbn billede: ${photo.alt}`}
            >
              <div className="relative overflow-hidden">
                <GalleryImage photo={photo} />
                <div className="absolute inset-0 bg-black/0 transition-all duration-700 ease-premium group-hover:bg-black/25" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 ease-premium group-hover:opacity-100">
                  <div className="flex h-11 w-11 scale-90 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-transform duration-500 ease-premium group-hover:scale-100">
                    <Expand size={16} strokeWidth={1.5} className="text-white" />
                  </div>
                </div>
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>

      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={setSelectedPhoto}
        />
      )}
    </>
  );
}
