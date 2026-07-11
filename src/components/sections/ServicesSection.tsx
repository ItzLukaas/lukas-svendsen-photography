import Link from "next/link";
import { ArrowUpRight, Camera, Video, type LucideIcon } from "lucide-react";
import { coreServices } from "@/data/sections";
import {
  sectionBody,
  sectionDivider,
  sectionLabel,
  sectionShell,
  sectionTitle,
} from "@/lib/styles";

const serviceIcons: Record<(typeof coreServices)[number]["icon"], LucideIcon | "drone"> = {
  camera: Camera,
  video: Video,
  drone: "drone",
};

function DroneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
    </svg>
  );
}

export function ServicesSection({ compact = false }: { compact?: boolean }) {
  const titleClass = compact
    ? "font-display text-[1.65rem] font-light leading-[1.08] text-foreground sm:text-3xl md:text-[2.25rem] lg:text-4xl xl:text-[2.75rem]"
    : sectionTitle;
  const bodyClass = compact
    ? "text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-[1.7]"
    : sectionBody;
  const shellClass = compact
    ? "bg-background px-6 py-16 sm:py-20 lg:px-8 lg:py-28"
    : sectionShell;

  return (
    <section id="ydelser" className={`${shellClass} ${sectionDivider}`}>
      <div className="mx-auto max-w-7xl">
        <div
          className={`${compact ? "mb-12 md:mb-16" : "mb-16 md:mb-24"} lg:flex lg:items-end lg:justify-between lg:gap-16`}
        >
          <div className="max-w-2xl">
            <p className={sectionLabel}>Produktioner</p>
            <h2 className={titleClass}>Fotografering, videoproduktion og droneflyvning</h2>
          </div>
          <p className={`${compact ? "mt-5" : "mt-7"} max-w-lg lg:mt-0 lg:text-right ${bodyClass}`}>
            Som fotograf og videoproducent i Grindsted tilbyder jeg fotografering, videoproduktion og
            droneflyvning til private, sport, koncerter, events og erhverv. Jeg er baseret i Grindsted
            og Billund og tager opgaver i hele Danmark.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {coreServices.map((service) => {
            const icon = serviceIcons[service.icon];
            const Icon = icon === "drone" ? null : icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className={`group flex flex-col rounded-md border border-border bg-card shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-premium hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[var(--shadow-card)] ${
                  compact ? "p-6 lg:p-8" : "p-8 lg:p-10"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`mb-4 flex items-center justify-center rounded-full border border-border text-muted transition-all duration-500 ease-premium group-hover:border-foreground/20 group-hover:text-foreground/80 ${
                        compact ? "h-9 w-9" : "h-11 w-11"
                      }`}
                    >
                      {Icon ? (
                        <Icon size={compact ? 18 : 20} strokeWidth={1.5} />
                      ) : (
                        <DroneIcon size={compact ? 18 : 20} />
                      )}
                    </span>
                    <p className="text-[10px] tracking-[0.3em] text-muted uppercase">
                      Ydelse
                    </p>
                    <h3
                      className={`mt-2 font-display font-light text-foreground ${
                        compact ? "text-xl lg:text-[1.35rem]" : "text-2xl lg:text-[1.65rem]"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-xs leading-relaxed text-muted ${
                        compact ? "text-xs" : "text-sm"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition-all duration-500 ease-premium group-hover:border-foreground/35 group-hover:text-foreground ${
                      compact ? "h-8 w-8" : "h-10 w-10"
                    }`}
                  >
                    <ArrowUpRight size={compact ? 14 : 16} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
