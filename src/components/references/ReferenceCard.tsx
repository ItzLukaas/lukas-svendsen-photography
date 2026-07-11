import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Reference } from "@/data/references";
import { ScrollReveal } from "@/components/ScrollReveal";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";

interface ReferenceCardProps {
  reference: Reference;
  index: number;
}

export function ReferenceCard({ reference, index }: ReferenceCardProps) {
  return (
    <ScrollReveal delay={index * 0.1} className="h-full">
      <Link href={`/referencer/${reference.slug}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden border border-foreground/5 transition-all duration-700 ease-premium hover:border-foreground/15">
          <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
            <OptimizedImage
              src={reference.coverImage.src}
              alt={reference.coverImage.alt}
              fill
              loading="lazy"
              quality={IMAGE_QUALITY.card}
              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
              sizes={IMAGE_SIZES.card}
            />
          </div>
          <div className="flex min-h-[7.5rem] flex-1 flex-col p-8 lg:min-h-[8rem] lg:p-10">
            <h2 className="font-display text-2xl font-light text-foreground md:text-3xl">
              {reference.title}
            </h2>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
              {reference.cardDescription}
            </p>
            <span className="mt-auto inline-flex items-center gap-2.5 pt-6 text-xs tracking-[0.2em] text-foreground/60 uppercase transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:text-foreground">
              Læs om projektet
              <ArrowRight size={14} strokeWidth={1.5} />
            </span>
          </div>
        </article>
      </Link>
    </ScrollReveal>
  );
}
