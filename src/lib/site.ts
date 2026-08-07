export const siteConfig = {
  name: "Lukas Svendsen",
  domain: "lukassvendsen.dk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lukassvendsen.dk",
  email: "hej@lukassvendsen.dk",
  /** Set when a real number is ready — omit from UI while empty */
  phone: "",
  phoneDisplay: "",
  locale: "da_DK",
  description:
    "Fotograf, videograf og dronepilot fra Grindsted. Professionel koncert-, festival-, sport- og eventfotografi i Esbjerg, Vejle, Billund, Kolding og hele Jylland.",
  nav: [
    { href: "/arbejde", label: "Arbejde" },
    { href: "/om", label: "Om mig" },
    { href: "/kontakt", label: "Kontakt mig" },
    { href: "/booking", label: "Booking" },
  ],
  disciplines: [
    { slug: "koncerter", label: "Festival" },
    { slug: "sport", label: "Sport" },
    { slug: "events", label: "Event" },
    { slug: "erhverv", label: "Erhverv" },
    { slug: "portraetter", label: "Portræt" },
  ],
} as const;

export type DisciplineSlug = (typeof siteConfig.disciplines)[number]["slug"];
