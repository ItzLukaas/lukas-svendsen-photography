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

export function ServicesSection() {
  return (
    <section id="ydelser" className={`${sectionShell} ${sectionDivider}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24 lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <p className={sectionLabel}>Produktioner</p>
            <h2 className={sectionTitle}>Foto, video og drone</h2>
          </div>
          <p className={`mt-7 max-w-md lg:mt-0 lg:text-right ${sectionBody}`}>
            Jeg tilbyder fotografering, videoproduktion og droneflyvning — til private, sport,
            events og erhverv.
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
                className="group flex flex-col border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04] lg:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/45 transition-all duration-500 ease-premium group-hover:border-white/25 group-hover:text-white/80">
                      {Icon ? <Icon size={20} strokeWidth={1.5} /> : <DroneIcon size={20} />}
                    </span>
                    <p className="text-[10px] tracking-[0.3em] text-white/45 uppercase">
                      Ydelse
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-light text-white lg:text-[1.65rem]">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
                      {service.description}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 ease-premium group-hover:border-white/35 group-hover:text-white">
                    <ArrowUpRight size={16} strokeWidth={1.5} />
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
