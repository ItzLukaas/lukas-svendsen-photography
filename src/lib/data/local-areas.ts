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
      "Foto, video og content i Grindsted. Lukas Svendsen, fotograf og videoproducent.",
    headline: "Fotograf i Grindsted",
    intro: [
      "Jeg laver foto, video, drone og content med udgangspunkt i Grindsted.",
      "Uanset om du er privatperson, virksomhed, organisation eller brand, hjælper jeg dig med at skabe visuelt materiale, der passer til opgaven.",
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
      "Foto, video og content i Billund. Lukas Svendsen, fotograf og videoproducent.",
    headline: "Fotograf i Billund",
    intro: [
      "Jeg laver foto, video, drone og content i Billund og omegn.",
      "Professionelt visuelt materiale til det, du skal bruge det til. Ét job eller løbende samarbejde.",
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
      "Foto, video og content i Vejle. Lukas Svendsen, fotograf og videoproducent.",
    headline: "Fotograf i Vejle",
    intro: [
      "Jeg laver foto, video, drone og content i Vejle.",
      "Materialet leveres skarpt og klar til brug, uanset om det er til kommunikation, kampagner eller digitale kanaler.",
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
      "Foto, video og content i Give og omegn. Lukas Svendsen, fotograf og videoproducent.",
    headline: "Fotograf i Give",
    intro: [
      "Jeg laver foto og video i Give og det sydvestjyske område.",
      "Kontakt mig med dato, sted og hvad du skal bruge materialet til, så finder vi ud af det sammen.",
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
      "Foto, video og content i Kolding. Lukas Svendsen, fotograf og videoproducent.",
    headline: "Fotograf i Kolding",
    intro: [
      "Jeg laver foto, video, drone og content i Kolding.",
      "Uanset om du har brug for ét shoot eller en større produktion, tager vi udgangspunkt i det, du skal bruge materialet til.",
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
      "Foto, video og content i Esbjerg. Lukas Svendsen, fotograf og videoproducent.",
    headline: "Fotograf i Esbjerg",
    intro: [
      "Jeg har leveret foto og video i Esbjerg og tager stadig opgaver i området.",
      "Skriv med dato og sted, så tager vi en kort snak om, hvad du skal bruge.",
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
      "Foto, video og content i Jelling og omegn. Lukas Svendsen, fotograf og videoproducent.",
    headline: "Fotograf i Jelling",
    intro: [
      "Jeg laver foto og video i Jelling og omegn.",
      "Har du en opgave i området? Skriv kort, hvad du skal bruge, så vender jeg tilbage.",
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
  "Foto, video og content i Grindsted, Billund, Vejle, Give, Kolding, Esbjerg og Jelling.";
