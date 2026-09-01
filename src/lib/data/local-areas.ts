export type LocalArea = {
  slug: string;
  city: string;
  /** URL path without domain, e.g. /fotograf-grindsted */
  path: string;
  title: string;
  metaDescription: string;
  headline: string;
  intro: string[];
  services: { label: string; href: string }[];
  /** Short proof — real clients or work in the area when possible */
  proof?: string;
  nearbySlugs: string[];
  priority: number;
};

const areas: LocalArea[] = [
  {
    slug: "grindsted",
    city: "Grindsted",
    path: "/fotograf-grindsted",
    title: "Fotograf i Grindsted",
    metaDescription:
      "Foto, video og content i Grindsted. Lukas Svendsen, fotograf og videoproducent. Private og erhverv, lokalt og i hele Danmark.",
    headline: "Fotograf i Grindsted",
    intro: [
      "Jeg laver foto, video og content med base i Grindsted. Til private og erhverv, lokalt og i resten af landet.",
      "Konfirmation, portræt, event, produktfoto eller content til SoMe. Jeg møder op med kamera, video og drone og leverer materiale, der kan bruges med det samme.",
    ],
    proof:
      "Har blandt andet fotograferet for MAGION Grindsted og leveret materiale til lokale events og foreninger.",
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Sportsfoto", href: "/arbejde?kategori=sport" },
      { label: "Koncertfoto", href: "/arbejde?kategori=koncerter" },
      { label: "Book mig", href: "/booking" },
    ],
    nearbySlugs: ["billund", "give", "vejle", "kolding"],
    priority: 1,
  },
  {
    slug: "billund",
    city: "Billund",
    path: "/fotograf-billund",
    title: "Fotograf i Billund",
    metaDescription:
      "Foto, video og content i Billund. Lukas Svendsen fra Grindsted. Private og erhverv i Billund og hele Danmark.",
    headline: "Fotograf i Billund",
    intro: [
      "Jeg laver foto, video og content med base i Grindsted, tæt på Billund. Til private og erhverv i Billund og omegn.",
      "Portræt, produktfoto, events og content til web og SoMe. Ét shoot eller løbende samarbejde.",
    ],
    proof: "Har leveret foto til Billund Kommune og events i området.",
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Eventfoto", href: "/arbejde?kategori=events" },
      { label: "Brand og produkt", href: "/arbejde?kategori=erhverv" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "give", "vejle", "kolding"],
    priority: 2,
  },
  {
    slug: "vejle",
    city: "Vejle",
    path: "/fotograf-vejle",
    title: "Fotograf i Vejle",
    metaDescription:
      "Foto, video og content i Vejle. Lukas Svendsen, fotograf og videoproducent fra Grindsted. Private og erhverv.",
    headline: "Fotograf i Vejle",
    intro: [
      "Jeg laver foto, video og content i Vejle. Til private og erhverv. Base i Grindsted, opgaver i Vejle og resten af Danmark.",
      "Portræt, event, produktfoto eller live fra scenen. Skarpt materiale, klar til brug.",
    ],
    proof:
      "Har fotograferet for Vejle Kommune og Bygningen Vejle, blandt andre opgaver i området.",
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Koncertfoto", href: "/arbejde?kategori=koncerter" },
      { label: "Eventfoto", href: "/arbejde?kategori=events" },
      { label: "Se arbejde", href: "/arbejde" },
    ],
    nearbySlugs: ["grindsted", "billund", "kolding", "fredericia"],
    priority: 3,
  },
  {
    slug: "give",
    city: "Give",
    path: "/fotograf-give",
    title: "Fotograf i Give",
    metaDescription:
      "Foto, video og content i Give og omegn. Lukas Svendsen fra Grindsted. Private og erhverv i hele Danmark.",
    headline: "Fotograf i Give",
    intro: [
      "Give ligger tæt på min base i Grindsted. Jeg laver foto og video til private og erhverv i Give og det sydvestjyske område.",
      "Jeg kører ud til dig, lokalt eller længere væk, når opgaven kræver det.",
    ],
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Sportsfoto", href: "/arbejde?kategori=sport" },
      { label: "Book mig", href: "/booking" },
    ],
    nearbySlugs: ["grindsted", "billund", "vejle", "esbjerg"],
    priority: 4,
  },
  {
    slug: "kolding",
    city: "Kolding",
    path: "/fotograf-kolding",
    title: "Fotograf i Kolding",
    metaDescription:
      "Foto, video og content i Kolding. Lukas Svendsen, fotograf og videoproducent fra Grindsted. Private og erhverv.",
    headline: "Fotograf i Kolding",
    intro: [
      "Jeg laver foto og video i Kolding. Til private og erhverv. Fra Grindsted er Kolding en naturlig del af mit arbejdsområde.",
      "Kontakt mig med dato, sted og hvad du skal bruge materialet til.",
    ],
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Eventfoto", href: "/arbejde?kategori=events" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["vejle", "fredericia", "grindsted", "give"],
    priority: 5,
  },
  {
    slug: "esbjerg",
    city: "Esbjerg",
    path: "/fotograf-esbjerg",
    title: "Fotograf i Esbjerg",
    metaDescription:
      "Foto, video og content i Esbjerg. Lukas Svendsen har fotograferet Suset, Esbjerg Streetfood og håndbold i området.",
    headline: "Fotograf i Esbjerg",
    intro: [
      "Jeg har fotograferet i Esbjerg. Suset, Esbjerg Streetfood, håndbold og events. Jeg tager stadig opgaver i Esbjerg og Vestjylland.",
      "Portræt, event, koncert eller noget helt andet. Skriv med dato og sted.",
    ],
    proof:
      "Har leveret koncertfoto fra Suset og eventfoto fra Esbjerg Streetfood.",
    services: [
      { label: "Koncertfoto", href: "/arbejde/rasmus-seebach-suset" },
      { label: "Eventfoto", href: "/arbejde/esbjerg-streetfood" },
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
    ],
    nearbySlugs: ["grindsted", "give", "fredericia", "vejle"],
    priority: 6,
  },
  {
    slug: "jelling",
    city: "Jelling",
    path: "/fotograf-jelling",
    title: "Fotograf i Jelling",
    metaDescription:
      "Foto, video og content i Jelling og omegn. Lukas Svendsen fra Grindsted. Private og erhverv i hele Danmark.",
    headline: "Fotograf i Jelling",
    intro: [
      "Jelling og omegn er en del af mit lokale arbejdsfelt fra Grindsted. Foto og video til private og erhverv, og opgaver i hele Danmark.",
      "Har du et job i Jelling? Skriv kort, hvad du skal bruge.",
    ],
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Eventfoto", href: "/arbejde?kategori=events" },
      { label: "Book mig", href: "/booking" },
    ],
    nearbySlugs: ["vejle", "kolding", "grindsted", "give"],
    priority: 7,
  },
];

export const localAreas = [...areas].sort((a, b) => a.priority - b.priority);

export const localAreaSlugs = localAreas.map((area) => area.slug);

export function getLocalAreaPath(slug: string) {
  return `/fotograf-${slug}`;
}

export function getLocalAreaBySlug(slug: string) {
  return localAreas.find((area) => area.slug === slug);
}

export function getLocalAreaByPath(localSlug: string) {
  if (!localSlug.startsWith("fotograf-")) return undefined;
  const slug = localSlug.replace(/^fotograf-/, "");
  return getLocalAreaBySlug(slug);
}

/** Primary cities for footer / cross-links — not keyword spam */
export const primaryLocalCities = ["Grindsted", "Billund", "Vejle"] as const;

export const localAreasSummary =
  "Foto, video og content med base i Grindsted. Opgaver i Billund, Vejle, Give, Kolding, Esbjerg og hele Danmark.";
