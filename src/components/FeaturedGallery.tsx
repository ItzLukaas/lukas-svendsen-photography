"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Photo } from "@/data/photos";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "./ScrollReveal";
import { sectionLabel, sectionTitle } from "@/lib/styles";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";

const Lightbox = dynamic(
  () => import("./Lightbox").then((mod) => ({ default: mod.Lightbox })),
  { ssr: false },
);

const layoutClasses = [
  "editorial-item-featured",
  "editorial-item-tall",
  "editorial-item-square",
  "editorial-item-wide",
  "editorial-item-square",
  "editorial-item-tall",
] as const;

function projectLabel(alt: string) {
  if (/håndbold|handbold|sport|kamp|arena/i.test(alt)) return "Sport";
  if (/event|live|scen|bar|gæst/i.test(alt)) return "Event";
  if (/portræt|portraet/i.test(alt)) return "Portræt";
  return "Produktion";
}

interface FeaturedGalleryProps {
  photos: Photo[];
}

export function FeaturedGallery({ photos }: FeaturedGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const items = photos.slice(0, 6);

  return (
    <>
      <ScrollReveal className="mb-16 text-center md:mb-24">
        <p className={sectionLabel}>Udvalgte øjeblikke</p>
        <h2 className={sectionTitle}>Et kig på mit arbejde</h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/55">
          Et udvalg af øjeblikke fra min portefølje som fotograf og videoproducent — fra sport og
          events til portrætter og kreative projekter. Se eksempler på min stil, kvalitet og tilgang til
          visuel fortælling.
        </p>
      </ScrollReveal>

      <div className="editorial-grid">
        {items.map((photo, index) => (
          <ScrollReveal
            key={photo.id}
            delay={index * 0.06}
            className={`editorial-item group ${layoutClasses[index] ?? "editorial-item-square"}`}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className="relative block h-full min-h-[inherit] w-full cursor-pointer text-left"
              aria-label={`Åbn billede: ${photo.alt}`}
            >
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                fill
                loading={index < 2 ? "eager" : "lazy"}
                quality={IMAGE_QUALITY.gallery}
                className="object-cover"
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 60vw" : IMAGE_SIZES.gallery}
              />
              <div className="editorial-overlay absolute inset-0 opacity-80 transition-opacity duration-700 ease-premium group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[10px] tracking-[0.28em] text-white/50 uppercase">
                    {projectLabel(photo.alt)}
                  </p>
                  <p className="mt-1.5 line-clamp-2 font-display text-lg font-light text-white sm:text-xl">
                    {photo.alt.split("—")[0]?.trim() ?? photo.alt}
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-all duration-500 ease-premium group-hover:border-white/40 group-hover:bg-white/10 group-hover:text-white">
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </span>
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>

      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          photos={items}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={setSelectedPhoto}
        />
      )}
    </>
  );
}
