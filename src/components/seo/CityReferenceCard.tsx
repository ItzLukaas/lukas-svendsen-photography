import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Reference } from "@/data/references";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { sectionBody } from "@/lib/styles";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";

interface CityReferenceCardProps {
  reference: Reference;
}

/** Server-safe reference card without framer-motion for SEO landing pages */
export function CityReferenceCard({ reference }: CityReferenceCardProps) {
  return (
    <Link href={`/referencer/${reference.slug}`} className="group block">
      <article className="overflow-hidden border border-white/5 transition-all duration-700 ease-premium hover:border-white/15">
        <div className="relative aspect-[16/10] overflow-hidden">
          <OptimizedImage
            src={reference.coverImage.src}
            alt={reference.coverImage.alt}
            fill
            loading="lazy"
            quality={IMAGE_QUALITY.card}
            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
            sizes={IMAGE_SIZES.card}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-8 lg:p-10">
            <p className="text-xs tracking-widest text-white/50 uppercase">{reference.subtitle}</p>
            <h3 className="mt-2 font-display text-2xl font-light text-white md:text-3xl">
              {reference.title}
            </h3>
          </div>
        </div>
        <div className="p-8 lg:p-10">
          <p className={`${sectionBody} text-sm`}>{reference.cardDescription}</p>
          <span className="mt-6 inline-flex items-center gap-2.5 text-xs tracking-[0.2em] text-white/60 uppercase transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:text-white">
            Se projekt
            <ArrowRight size={14} strokeWidth={1.5} />
          </span>
        </div>
      </article>
    </Link>
  );
}
