import { coreServices } from "@/data/sections";
import {
  sectionBody,
  sectionDivider,
  sectionLabel,
  sectionShell,
  sectionTitle,
} from "@/lib/styles";

const icons = {
  camera: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  video: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3" />
    </svg>
  ),
  drone: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
    </svg>
  ),
} as const;

export function ServicesSection() {
  return (
    <section id="ydelser" className={`${sectionShell} ${sectionDivider}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:mb-20">
          <p className={sectionLabel}>Mine ydelser</p>
          <h2 className={sectionTitle}>Visuelt indhold, der skaber værdi</h2>
          <p className={`mx-auto mt-7 max-w-2xl ${sectionBody}`}>
            Fra stærke billeder til levende video og unikke droneperspektiver — visuelt materiale, der
            fortæller din historie tydeligt.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {coreServices.map((service) => (
            <div
              key={service.title}
              className="group h-full border border-white/5 p-8 transition-all duration-500 ease-premium hover:-translate-y-px hover:border-white/15 hover:bg-white/[0.02] lg:p-10"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-premium group-hover:border-white/25 group-hover:text-white">
                {icons[service.icon]}
              </div>
              <h3 className="font-display text-xl font-light text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/45">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
