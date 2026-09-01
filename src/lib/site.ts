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
   * endHour 24 = open until midnight.
   */
  openingHours: [
    { days: [1, 2, 3, 4], open: 8, close: 22 }, // Mon–Thu
    { days: [5, 6], open: 8, close: 24 }, // Fri–Sat
    { days: [0], open: 8, close: 22 }, // Sun
  ] as const,
  tagline: "Foto, video og content",
  description:
    "Foto, video og content. Lukas Svendsen, fotograf og videoproducent fra Grindsted. Hele Danmark.",
  nav: [
    { href: "/arbejde", label: "Arbejde" },
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
