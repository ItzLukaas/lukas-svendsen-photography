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
    title: "Fotograf i Grindsted — foto og video",
    metaDescription:
      "Fotograf og videograf i Grindsted. Lukas Svendsen laver foto, video og drone til mange formål — lokalt og i hele Danmark.",
    headline: "Fotograf i Grindsted",
    intro: [
      "Jeg er fotograf og videograf med base i Grindsted. Herfra tager jeg opgaver til private, foreninger, organisationer og brands — både lokalt og i resten af landet.",
      "Det kan være portrætter, et event, produktfoto, content til sociale medier eller sport og koncert. Jeg møder op med kamera, video og drone, og leverer materiale, der kan bruges med det samme.",
    ],
    proof:
      "Har blandt andet fotograferet for MAGION Grindsted og leveret materiale til lokale events og foreninger.",
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Sportsfotografi", href: "/arbejde?kategori=sport" },
      { label: "Koncertfotografi", href: "/arbejde?kategori=koncerter" },
      { label: "Book mig", href: "/booking" },
    ],
    nearbySlugs: ["billund", "give", "vejle", "kolding"],
    priority: 1,
  },
  {
    slug: "billund",
    city: "Billund",
    path: "/fotograf-billund",
    title: "Fotograf i Billund — foto og video",
    metaDescription:
      "Fotograf i Billund til portræt, event, produkt og content. Lukas Svendsen — base i Grindsted, hurtig til Billund og hele Danmark.",
    headline: "Fotograf i Billund",
    intro: [
      "Jeg er fotograf og videograf med base i Grindsted — tæt på Billund. Jeg tager opgaver til private, foreninger, organisationer og brands i Billund og omegn.",
      "Fra portrætter og produktfoto til events, content til web og SoMe. Jeg tilpasser opgaven — ét shoot eller løbende samarbejde.",
    ],
    proof: "Har leveret foto til Billund Kommune og events i området.",
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Eventfotografi", href: "/arbejde?kategori=events" },
      { label: "Brand & produkt", href: "/arbejde?kategori=erhverv" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "give", "vejle", "kolding"],
    priority: 2,
  },
  {
    slug: "vejle",
    city: "Vejle",
    path: "/fotograf-vejle",
    title: "Fotograf i Vejle — foto og video",
    metaDescription:
      "Fotograf i Vejle til portræt, event, produkt og content. Lukas Svendsen — foto, video og drone fra Grindsted med opgaver i Vejle og hele Danmark.",
    headline: "Fotograf i Vejle",
    intro: [
      "Jeg fotograferer og filmer i Vejle — til private, foreninger, organisationer og brands. Base i Grindsted, men jeg tager gerne opgaver i Vejle og resten af Danmark.",
      "Uanset om det er portrætter, et event, produktfoto eller live fra scenen, leverer jeg skarpt materiale klar til brug.",
    ],
    proof:
      "Har fotograferet for Vejle Kommune og Bygningen Vejle — blandt andre opgaver i området.",
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Koncertfotografi", href: "/arbejde?kategori=koncerter" },
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
    title: "Fotograf i Give — foto og video",
    metaDescription:
      "Fotograf i Give og omegn. Lukas Svendsen laver foto, video og drone til mange formål — base i Grindsted, opgaver i hele Danmark.",
    headline: "Fotograf i Give",
    intro: [
      "Give ligger tæt på min base i Grindsted. Jeg tager foto- og videoopgaver til private, foreninger og organisationer i Give og det sydvestjyske område.",
      "Jeg kører ud til dig — lokalt eller længere væk, når jobbet kræver det.",
    ],
    services: [
      { label: "Portrætfoto", href: "/arbejde?kategori=portraetter" },
      { label: "Sportsfotografi", href: "/arbejde?kategori=sport" },
      { label: "Book mig", href: "/booking" },
    ],
    nearbySlugs: ["grindsted", "billund", "vejle", "esbjerg"],
    priority: 4,
  },
  {
    slug: "kolding",
    city: "Kolding",
    path: "/fotograf-kolding",
    title: "Fotograf i Kolding — foto og video",
    metaDescription:
      "Fotograf i Kolding til portræt, event, produkt og content. Lukas Svendsen — foto, video og drone med base i Grindsted.",
    headline: "Fotograf i Kolding",
    intro: [
      "Jeg tager fotograf- og videoopgaver i Kolding — til private, foreninger, organisationer og brands. Fra Grindsted er Kolding en naturlig del af mit arbejdsområde.",
      "Kontakt mig med dato, sted og hvad du skal bruge materialet til. Så finder vi den rigtige løsning.",
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
    title: "Fotograf i Esbjerg — foto og video",
    metaDescription:
      "Fotograf i Esbjerg til portræt, event, koncert og content. Lukas Svendsen — har fotograferet Suset, Esbjerg Streetfood og håndbold i området.",
    headline: "Fotograf i Esbjerg",
    intro: [
      "Jeg har fotograferet i Esbjerg — fra Suset og Esbjerg Streetfood til håndbold og events. Jeg tager stadig opgaver i Esbjerg og Vestjylland.",
      "Portræt, event, koncert eller noget helt andet — skriv med dato og sted, så tager vi en snak.",
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
    title: "Fotograf i Jelling — foto og video",
    metaDescription:
      "Fotograf i Jelling og omegn. Lukas Svendsen — foto, video og drone til mange formål med base i Grindsted, opgaver i hele Danmark.",
    headline: "Fotograf i Jelling",
    intro: [
      "Jelling og omegn er en del af mit lokale arbejdsfelt fra Grindsted. Jeg fotograferer og filmer til private, foreninger og organisationer — og tager opgaver i hele Danmark.",
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
  "Fotograf og videograf med base i Grindsted — foto, video og drone til mange formål i Billund, Vejle, Give, Kolding, Esbjerg og hele Danmark.";
