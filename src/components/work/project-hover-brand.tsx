import Image from "next/image";

import type { ProjectHoverBrand } from "@/lib/data/project-branding";
import { cn } from "@/lib/utils";

type ProjectHoverBrandOverlayProps = {
  brand: ProjectHoverBrand;
};

/**
 * Subtle branded hover layer for Arbejde index covers.
 * Visible only on fine-pointer hover — photo color returns underneath.
 */
export function ProjectHoverBrandOverlay({
  brand,
}: ProjectHoverBrandOverlayProps) {
  return (
    <div
      aria-hidden
      data-project-hover-brand={brand.brandName}
      className={cn(
        "pointer-events-none absolute inset-0 z-10 hidden items-center justify-center",
        "[@media(hover:hover)_and_(pointer:fine)]:flex",
        "opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "group-hover/project:opacity-100",
        "motion-reduce:transition-none"
      )}
    >
      {/* Soft brand tint — keeps the photograph readable */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: brand.overlayColor,
          opacity: brand.overlayOpacity ?? 0.28,
        }}
      />
      <div className="absolute inset-0 bg-[rgb(14_14_14/0.18)]" />

      <div
        className={cn(
          "relative z-10 flex w-full max-w-[85%] flex-col items-center gap-3 px-5 text-center",
          "translate-y-1.5 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/project:translate-y-0 group-hover/project:opacity-100",
          "motion-reduce:transform-none motion-reduce:transition-none"
        )}
      >
        <Image
          src={brand.logoSrc}
          alt={brand.logoAlt}
          width={brand.logoWidth}
          height={brand.logoHeight}
          className={cn(
            "object-contain object-center drop-shadow-[0_1px_12px_rgb(0_0_0/0.35)]",
            brand.invertLogo !== false && "brightness-0 invert",
            brand.logoClassName
          )}
        />
        <p className="font-display text-[0.6875rem] font-bold tracking-[0.06em] text-white/95 md:text-[0.75rem]">
          Officiel fotograf
        </p>
      </div>
    </div>
  );
}
