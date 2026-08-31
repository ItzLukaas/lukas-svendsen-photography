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
    title: "Fotograf i Grindsted — sport, koncert og events",
    metaDescription:
      "Fotograf og videograf i Grindsted. Lukas Svendsen laver sportsfoto, koncertfoto, eventfoto, video og drone — lokalt og i hele Danmark.",
    headline: "Fotograf i Grindsted",
    intro: [
      "Jeg er fotograf og videograf med base i Grindsted. Herfra tager jeg jobs til sport, koncerter, events, foreninger og virksomheder — både lokalt og i resten af landet.",
      "Det kan være håndbold på banen, en koncert, et erhvervsevent eller portrætter til en klub. Jeg møder op med kamera, video og drone, og leverer materiale, der kan bruges med det samme.",
    ],
    proof:
      "Har blandt andet fotograferet for MAGION Grindsted og leveret materiale til lokale events og foreninger.",
    services: [
      { label: "Sportsfotografi", href: "/arbejde?kategori=sport" },
      { label: "Koncertfotografi", href: "/arbejde?kategori=koncerter" },
      { label: "Eventfoto", href: "/arbejde?kategori=events" },
      { label: "Book mig", href: "/booking" },
    ],
    nearbySlugs: ["billund", "give", "vejle", "kolding"],
    priority: 1,
  },
  {
    slug: "billund",
    city: "Billund",
    path: "/fotograf-billund",
    title: "Fotograf i Billund — events, sport og erhverv",
    metaDescription:
      "Fotograf i Billund til events, sport, koncerter og erhvervsfoto. Lukas Svendsen — base i Grindsted, hurtig til Billund og hele Danmark.",
    headline: "Fotograf i Billund",
    intro: [
      "Jeg er fotograf og videograf med base i Grindsted — tæt på Billund. Jeg tager jobs til events, sport, koncerter og virksomheder i Billund og omegn.",
      "Fra stemningsbilleder og live-øjeblikke til portrætter og content til web og SoMe. Jeg tilpasser opgaven — ét shoot eller løbende samarbejde.",
    ],
    proof: "Har leveret foto til Billund Kommune og events i området.",
    services: [
      { label: "Eventfotografi", href: "/arbejde?kategori=events" },
      { label: "Erhvervsfoto", href: "/arbejde?kategori=erhverv" },
      { label: "Sportsfoto", href: "/arbejde?kategori=sport" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "give", "vejle", "kolding"],
    priority: 2,
  },
  {
    slug: "vejle",
    city: "Vejle",
    path: "/fotograf-vejle",
    title: "Fotograf i Vejle — koncert, sport og events",
    metaDescription:
      "Fotograf i Vejle til koncerter, sport, events og erhverv. Lukas Svendsen — foto, video og drone fra Grindsted med opgaver i Vejle og hele Danmark.",
    headline: "Fotograf i Vejle",
    intro: [
      "Jeg fotograferer og filmer i Vejle — koncerter, sport, events og erhvervsopgaver. Base i Grindsted, men jeg tager gerne jobs i Vejle og resten af Danmark.",
      "Uanset om det er live på scenen, action på banen eller stemning til et arrangement, leverer jeg skarpt materiale klar til brug.",
    ],
    proof:
      "Har fotograferet for Vejle Kommune og Bygningen Vejle — blandt andre opgaver i området.",
    services: [
      { label: "Koncertfotografi", href: "/arbejde?kategori=koncerter" },
      { label: "Eventfoto", href: "/arbejde?kategori=events" },
      { label: "Sportsfoto", href: "/arbejde?kategori=sport" },
      { label: "Se arbejde", href: "/arbejde" },
    ],
    nearbySlugs: ["grindsted", "billund", "kolding", "fredericia"],
    priority: 3,
  },
  {
    slug: "give",
    city: "Give",
    path: "/fotograf-give",
    title: "Fotograf i Give — sport, events og koncerter",
    metaDescription:
      "Fotograf i Give og omegn. Lukas Svendsen laver sportsfoto, eventfoto og koncertfoto — base i Grindsted, opgaver i hele Danmark.",
    headline: "Fotograf i Give",
    intro: [
      "Give ligger tæt på min base i Grindsted. Jeg tager foto- og videoopgaver til sport, events og koncerter i Give og det sydvestjyske område.",
      "Jeg kører ud til dig — lokalt eller længere væk, når jobbet kræver det.",
    ],
    services: [
      { label: "Sportsfotografi", href: "/arbejde?kategori=sport" },
      { label: "Eventfoto", href: "/arbejde?kategori=events" },
      { label: "Book mig", href: "/booking" },
    ],
    nearbySlugs: ["grindsted", "billund", "vejle", "esbjerg"],
    priority: 4,
  },
  {
    slug: "kolding",
    city: "Kolding",
    path: "/fotograf-kolding",
    title: "Fotograf i Kolding — sport, events og erhverv",
    metaDescription:
      "Fotograf i Kolding til sport, events, koncerter og erhvervsfoto. Lukas Svendsen — foto, video og drone med base i Grindsted.",
    headline: "Fotograf i Kolding",
    intro: [
      "Jeg tager fotograf- og videoopgaver i Kolding — sport, events, koncerter og erhverv. Fra Grindsted er Kolding en naturlig del af mit arbejdsområde.",
      "Kontakt mig med dato, sted og hvad du skal bruge materialet til. Så finder vi den rigtige løsning.",
    ],
    services: [
      { label: "Sportsfoto", href: "/arbejde?kategori=sport" },
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
    title: "Fotograf i Esbjerg — koncert, sport og events",
    metaDescription:
      "Fotograf i Esbjerg til koncerter, sport og events. Lukas Svendsen — har fotograferet Suset, Esbjerg Streetfood og håndbold i området.",
    headline: "Fotograf i Esbjerg",
    intro: [
      "Jeg har fotograferet i Esbjerg — fra Suset og Esbjerg Streetfood til håndbold og events. Jeg tager stadig opgaver i Esbjerg og Vestjylland.",
      "Koncert, sport eller event — skriv med dato og sted, så tager vi en snak.",
    ],
    proof:
      "Har leveret koncertfoto fra Suset og eventfoto fra Esbjerg Streetfood.",
    services: [
      { label: "Koncertfoto", href: "/arbejde/rasmus-seebach-suset" },
      { label: "Eventfoto", href: "/arbejde/esbjerg-streetfood" },
      { label: "Sportsfoto", href: "/arbejde?kategori=sport" },
    ],
    nearbySlugs: ["grindsted", "give", "fredericia", "vejle"],
    priority: 6,
  },
  {
    slug: "jelling",
    city: "Jelling",
    path: "/fotograf-jelling",
    title: "Fotograf i Jelling — events og sport",
    metaDescription:
      "Fotograf i Jelling og omegn. Lukas Svendsen — sportsfoto, eventfoto og video med base i Grindsted, opgaver i hele Danmark.",
    headline: "Fotograf i Jelling",
    intro: [
      "Jelling og omegn er en del af mit lokale arbejdsfelt fra Grindsted. Jeg fotograferer sport, events og koncerter — og tager opgaver i hele Danmark.",
      "Har du et job i Jelling? Skriv kort, hvad du skal bruge.",
    ],
    services: [
      { label: "Eventfoto", href: "/arbejde?kategori=events" },
      { label: "Sportsfoto", href: "/arbejde?kategori=sport" },
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
  "Fotograf og videograf med base i Grindsted — opgaver i Billund, Vejle, Give, Kolding, Esbjerg og hele Danmark.";
