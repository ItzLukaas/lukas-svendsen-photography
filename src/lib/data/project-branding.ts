/**
 * Per-project hover branding for the Arbejde index.
 * Colors are sampled from official brand logos / site identity — not invented.
 */

export type ProjectHoverBrand = {
  /** Organization / event shown in the hover mark */
  brandName: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  /**
   * Brand tint for the faded photo overlay.
   * Applied at low opacity so the photograph stays visible.
   */
  overlayColor: string;
  /** Optical size — keep marks proportional, never stretch */
  logoClassName: string;
  /**
   * Knock logo to white for contrast on dark/tinted overlays.
   * Disable when the official mark already has light brand fills.
   */
  invertLogo?: boolean;
};

/**
 * Hover brand map keyed by project slug.
 * Overlay colors:
 * - Varde Open Air → #6b2d58 (official SVG fill)
 * - Bork Festival → #182848 (dominant ink from logo)
 * - Smukfest → #0a472f (smukfest.dk brand green)
 * - Grøn Koncert → #04A64B (official logo fill)
 * - Esbjerg Streetfood → #d94a32 (logo vermilion)
 * - DanskHåndbold → #e61428 (official SVG fill)
 * - Super Cup Kvinder → same DanskHåndbold red
 * - Fredericia Håndboldklub → #ff0033 (official SVG fill #f03)
 * - Suset → #C44040 (sampled from official Suset visual identity / cover art)
 */
export const projectHoverBrands: Record<string, ProjectHoverBrand> = {
  "varde-open-air": {
    brandName: "Varde Open Air",
    logoSrc: "/logos/varde-open-air.svg",
    logoAlt: "Varde Open Air logo",
    logoWidth: 460,
    logoHeight: 238,
    overlayColor: "#6b2d58",
    logoClassName: "h-12 w-auto max-w-[70%] md:h-14",
    invertLogo: false,
  },
  "bork-festival": {
    brandName: "Bork Festival",
    logoSrc: "/logos/bork-festival.png",
    logoAlt: "Bork Festival logo",
    logoWidth: 900,
    logoHeight: 538,
    overlayColor: "#182848",
    logoClassName: "h-14 w-auto max-w-[72%] md:h-16",
    invertLogo: true,
  },
  "thor-farlov-smukfest": {
    brandName: "Smukfest",
    logoSrc: "/logos/smukfest.svg",
    logoAlt: "Smukfest logo",
    logoWidth: 115,
    logoHeight: 111,
    overlayColor: "#0a472f",
    logoClassName: "h-14 w-auto max-w-[42%] md:h-[4.25rem]",
    invertLogo: true,
  },
  "gron-koncert": {
    brandName: "Grøn Koncert",
    logoSrc: "/logos/gron-koncert.svg",
    logoAlt: "Grøn Koncert logo",
    logoWidth: 60,
    logoHeight: 92,
    overlayColor: "#04A64B",
    logoClassName: "h-16 w-auto max-w-[36%] md:h-[4.5rem]",
    invertLogo: false,
  },
  "esbjerg-streetfood": {
    brandName: "Esbjerg Streetfood",
    logoSrc: "/logos/esbjerg-streetfood.png",
    logoAlt: "Esbjerg Street Food logo",
    logoWidth: 507,
    logoHeight: 419,
    overlayColor: "#d94a32",
    logoClassName: "h-16 w-auto max-w-[68%] md:h-[4.5rem]",
    invertLogo: true,
  },
  "dm-finalen-herrer": {
    brandName: "DanskHåndbold",
    logoSrc: "/logos/dansk-haandbold.svg",
    logoAlt: "DanskHåndbold logo",
    logoWidth: 655,
    logoHeight: 150,
    overlayColor: "#e61428",
    logoClassName: "h-8 w-auto max-w-[78%] md:h-9",
    invertLogo: true,
  },
  "dm-finalen-kvinder": {
    brandName: "DanskHåndbold",
    logoSrc: "/logos/dansk-haandbold.svg",
    logoAlt: "DanskHåndbold logo",
    logoWidth: 655,
    logoHeight: 150,
    overlayColor: "#e61428",
    logoClassName: "h-8 w-auto max-w-[78%] md:h-9",
    invertLogo: true,
  },
  "super-cup-kvinder": {
    brandName: "DanskHåndbold",
    logoSrc: "/logos/dansk-haandbold.svg",
    logoAlt: "DanskHåndbold logo",
    logoWidth: 655,
    logoHeight: 150,
    overlayColor: "#e61428",
    logoClassName: "h-8 w-auto max-w-[78%] md:h-9",
    invertLogo: true,
  },
  "super-cup-herrer": {
    brandName: "DanskHåndbold",
    logoSrc: "/logos/dansk-haandbold.svg",
    logoAlt: "DanskHåndbold logo",
    logoWidth: 655,
    logoHeight: 150,
    overlayColor: "#e61428",
    logoClassName: "h-8 w-auto max-w-[78%] md:h-9",
    invertLogo: true,
  },
  "fredericia-haandboldklub": {
    brandName: "Fredericia Håndboldklub",
    logoSrc: "/logos/fredericia-haandboldklub.svg",
    logoAlt: "Fredericia Håndboldklub logo",
    logoWidth: 157,
    logoHeight: 157,
    overlayColor: "#ff0033",
    logoClassName: "h-16 w-auto max-w-[48%] md:h-[4.5rem]",
    invertLogo: false,
  },
  "rasmus-seebach-suset": {
    brandName: "Suset",
    logoSrc: "/logos/suset-esbjerg-light.svg",
    logoAlt: "Suset logo",
    logoWidth: 400,
    logoHeight: 181,
    overlayColor: "#C44040",
    logoClassName: "h-12 w-auto max-w-[70%] md:h-14",
    invertLogo: false,
  },
};

export function getProjectHoverBrand(slug: string): ProjectHoverBrand | null {
  return projectHoverBrands[slug] ?? null;
}
