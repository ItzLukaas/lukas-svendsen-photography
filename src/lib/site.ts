export const siteConfig = {
  name: "Lukas Svendsen",
  domain: "lukassvendsen.dk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lukassvendsen.dk",
  email: "kontakt@lukassvendsen.dk",
  phone: "+4524463550",
  phoneDisplay: "+45 24 46 35 50",
  locale: "da_DK",
  description:
    "Fotograf i Grindsted — Lukas Svendsen. Professionel koncert-, festival-, sport- og eventfotografi samt video og drone. Også Billund, Esbjerg, Vejle, Kolding og hele Jylland.",
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
