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
    title: "Fotograf og videoproducent i Grindsted",
    metaDescription:
      "Foto, video og content i Grindsted. Lukas Svendsen, fotograf og videoproducent. Hele Danmark.",
    headline: "Fotograf i Grindsted",
    intro: [
      "Jeg laver foto, video og content med base i Grindsted.",
      "Professionelt visuelt materiale til den opgave, du har. Lokalt og i hele landet.",
    ],
    proof:
      "Har blandt andet fotograferet for MAGION Grindsted og leveret materiale til lokale opgaver.",
    services: [
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Book mig", href: "/booking" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["billund", "give", "vejle", "kolding"],
    priority: 1,
  },
  {
    slug: "billund",
    city: "Billund",
    path: "/fotograf-billund",
    title: "Fotograf og videoproducent i Billund",
    metaDescription:
      "Foto, video og content i Billund. Lukas Svendsen fra Grindsted. Hele Danmark.",
    headline: "Fotograf i Billund",
    intro: [
      "Jeg laver foto, video og content med base i Grindsted, tæt på Billund.",
      "Ét job eller løbende samarbejde. Omfanget finder vi sammen.",
    ],
    proof: "Har leveret foto til Billund Kommune og opgaver i området.",
    services: [
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Book mig", href: "/booking" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "give", "vejle", "kolding"],
    priority: 2,
  },
  {
    slug: "vejle",
    city: "Vejle",
    path: "/fotograf-vejle",
    title: "Fotograf og videoproducent i Vejle",
    metaDescription:
      "Foto, video og content i Vejle. Lukas Svendsen, fotograf og videoproducent fra Grindsted.",
    headline: "Fotograf i Vejle",
    intro: [
      "Jeg laver foto, video og content i Vejle. Base i Grindsted, opgaver i hele Danmark.",
      "Skarpt materiale, klar til brug.",
    ],
    proof:
      "Har fotograferet for Vejle Kommune og Bygningen Vejle, blandt andre opgaver i området.",
    services: [
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Book mig", href: "/booking" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "billund", "kolding", "fredericia"],
    priority: 3,
  },
  {
    slug: "give",
    city: "Give",
    path: "/fotograf-give",
    title: "Fotograf og videoproducent i Give",
    metaDescription:
      "Foto, video og content i Give og omegn. Lukas Svendsen fra Grindsted. Hele Danmark.",
    headline: "Fotograf i Give",
    intro: [
      "Give ligger tæt på min base i Grindsted. Jeg laver foto og video i Give og det sydvestjyske område.",
      "Jeg kører ud til dig, lokalt eller længere væk, når opgaven kræver det.",
    ],
    services: [
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Book mig", href: "/booking" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "billund", "vejle", "esbjerg"],
    priority: 4,
  },
  {
    slug: "kolding",
    city: "Kolding",
    path: "/fotograf-kolding",
    title: "Fotograf og videoproducent i Kolding",
    metaDescription:
      "Foto, video og content i Kolding. Lukas Svendsen, fotograf og videoproducent fra Grindsted.",
    headline: "Fotograf i Kolding",
    intro: [
      "Jeg laver foto og video i Kolding. Fra Grindsted er Kolding en naturlig del af mit arbejdsområde.",
      "Kontakt mig med dato, sted og hvad du skal bruge materialet til.",
    ],
    services: [
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Book mig", href: "/booking" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["vejle", "fredericia", "grindsted", "give"],
    priority: 5,
  },
  {
    slug: "esbjerg",
    city: "Esbjerg",
    path: "/fotograf-esbjerg",
    title: "Fotograf og videoproducent i Esbjerg",
    metaDescription:
      "Foto, video og content i Esbjerg. Lukas Svendsen, fotograf og videoproducent. Hele Danmark.",
    headline: "Fotograf i Esbjerg",
    intro: [
      "Jeg har leveret foto og video i Esbjerg og tager stadig opgaver i Vestjylland.",
      "Skriv med dato og sted, så tager vi den derfra.",
    ],
    proof:
      "Har leveret materiale fra Suset og Esbjerg Streetfood, blandt andre opgaver i området.",
    services: [
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Book mig", href: "/booking" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "give", "fredericia", "vejle"],
    priority: 6,
  },
  {
    slug: "jelling",
    city: "Jelling",
    path: "/fotograf-jelling",
    title: "Fotograf og videoproducent i Jelling",
    metaDescription:
      "Foto, video og content i Jelling og omegn. Lukas Svendsen fra Grindsted. Hele Danmark.",
    headline: "Fotograf i Jelling",
    intro: [
      "Jelling og omegn er en del af mit lokale arbejdsfelt fra Grindsted.",
      "Har du en opgave i Jelling? Skriv kort, hvad du skal bruge.",
    ],
    services: [
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Book mig", href: "/booking" },
      { label: "Kontakt", href: "/kontakt" },
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
