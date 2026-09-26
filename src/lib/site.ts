export const siteConfig = {
  name: "Lukas Svendsen",
  domain: "lukassvendsen.dk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lukassvendsen.dk",
  email: "kontakt@lukassvendsen.dk",
  phone: "+4524463550",
  phoneDisplay: "+45 24 46 35 50",
  locale: "da_DK",
  timezone: "Europe/Copenhagen",
  location: {
    street: "Ribersvej 90",
    postalCode: "7200",
    city: "Grindsted",
    country: "Danmark",
  },
  social: {
    instagram: "https://www.instagram.com/lukassvendsen.dk/",
    facebook: "https://www.facebook.com/profile.php?id=61593622893802",
    linkedin: "https://www.linkedin.com/in/lukas-guldager-svendsen-a4a777290/",
  },
  /**
   * Local opening hours (Europe/Copenhagen).
   * close 24 = open until midnight (00:00 next day).
   */
  openingHours: [
    { days: [0, 1, 2, 3, 4], open: 8, close: 22 }, // Sun–Thu 08:00–22:00
    { days: [5, 6], open: 8, close: 24 }, // Fri–Sat 08:00–00:00
  ] as const,
  tagline: "Foto, video og content",
  description:
    "Fotograf og videograf i Grindsted. Lukas Svendsen laver foto, video, content og drone til virksomheder, organisationer og private i Grindsted, Billund, Vejle, Esbjerg, på tværs af Jylland og i resten af Danmark.",
  seo: {
    homeTitle: "Lukas Svendsen | Fotograf og videograf",
    homeDescription:
      "Fotograf og videograf i Grindsted. Lukas Svendsen laver foto, video, drone og content til virksomheder og private i Danmark.",
  },
  nav: [
    { href: "/arbejde", label: "Arbejde" },
    { href: "/hvad-jeg-laver", label: "Hvad jeg laver" },
    { href: "/om", label: "Om mig" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/booking", label: "Book mig" },
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
