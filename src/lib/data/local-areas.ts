export type LocalArea = {
  slug: string;
  city: string;
  /** URL path without domain, e.g. /fotograf-grindsted */
  path: string;
  /** Title tag (without site name suffix) */
  title: string;
  metaDescription: string;
  /** H1 */
  headline: string;
  intro: string[];
  servicesHeading: string;
  servicesBody: string;
  processHeading: string;
  processBody: string;
  portfolioNote?: string;
  portfolioLinks?: { label: string; href: string }[];
  services: { label: string; href: string }[];
  proof?: string;
  nearbySlugs: string[];
  priority: number;
};

const areas: LocalArea[] = [
  {
    slug: "grindsted",
    city: "Grindsted",
    path: "/fotograf-grindsted",
    title: "Fotograf i Grindsted | Foto, video og content",
    metaDescription:
      "Fotograf og videograf i Grindsted. Lukas Svendsen laver foto, video, content og drone til virksomheder, organisationer og private. Book en snak om din opgave.",
    headline: "Fotograf og videograf i Grindsted",
    intro: [
      "Jeg er fotograf og videoproducent med udgangspunkt i Grindsted og arbejder med foto, video, content og drone til virksomheder, organisationer og private.",
      "Det kan være portrætter, produktbilleder, film til sociale medier, materiale til en hjemmeside eller en større produktion over flere dage. Vi finder ud af, hvad der giver mening for dig.",
    ],
    servicesHeading: "Foto og videoproduktion i Grindsted",
    servicesBody:
      "Jeg hjælper med fotografi, videoproduktion, content og drone til virksomheder, foreninger og private i Grindsted og omegn. Materialet leveres redigeret og klar til det, du skal bruge det til.",
    processHeading: "Sådan foregår samarbejdet",
    processBody:
      "Vi tager en kort snak om opgaven, jeg møder op og leverer redigeret materiale, der kan bruges med det samme. Du ved hele tiden, hvad der sker, og hvornår du kan forvente filerne.",
    portfolioNote:
      "Portfolioen viser eksempler på mit arbejde. Den er ikke en komplet liste over alt, jeg kan hjælpe med.",
    portfolioLinks: [
      { label: "Se erhvervsarbejde", href: "/arbejde?kategori=erhverv" },
      { label: "Se portrætarbejde", href: "/arbejde?kategori=portraetter" },
    ],
    proof:
      "Har blandt andet fotograferet for MAGION Grindsted og leveret materiale til lokale opgaver.",
    services: [
      { label: "Book mig", href: "/booking" },
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["billund", "give", "vejle", "kolding"],
    priority: 1,
  },
  {
    slug: "billund",
    city: "Billund",
    path: "/fotograf-billund",
    title: "Fotograf i Billund | Foto, video og content",
    metaDescription:
      "Fotograf og videoproducent i Billund. Foto, video og content til virksomheder og private i Billund og omegn. Se arbejde eller book en opgave.",
    headline: "Fotograf og videograf i Billund",
    intro: [
      "Jeg laver foto, video, content og drone i Billund og omegn til virksomheder, organisationer og private, der har brug for professionelt visuelt materiale.",
      "Mange af mine opgaver handler om at levere billeder og film, der kan bruges direkte i kommunikation, på sociale medier eller til intern brug. Det kan være én dag eller en løbende produktion.",
    ],
    servicesHeading: "Erhvervsfoto og video i Billund",
    servicesBody:
      "Jeg hjælper virksomheder og organisationer i Billund med portrætter, produktfoto, film til hjemmeside og SoMe, content til kampagner og andet visuelt materiale, der skal fungere i praksis.",
    processHeading: "Fra første snak til færdigt materiale",
    processBody:
      "Du fortæller kort om opgaven, jeg møder op i Billund eller omegn, og du får redigerede filer, der er klar til brug. Omfanget tilpasser vi altid til det, du faktisk har brug for.",
    portfolioNote:
      "Herunder kan du se eksempler på arbejde, der også er relevant for virksomheder og organisationer i Billund.",
    portfolioLinks: [
      { label: "Erhvervsprojekter", href: "/arbejde?kategori=erhverv" },
      { label: "Se alt arbejde", href: "/arbejde" },
    ],
    proof: "Har leveret foto til Billund Kommune og opgaver i området.",
    services: [
      { label: "Book mig", href: "/booking" },
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "give", "vejle", "kolding"],
    priority: 2,
  },
  {
    slug: "vejle",
    city: "Vejle",
    path: "/fotograf-vejle",
    title: "Fotograf i Vejle | Foto, video og content",
    metaDescription:
      "Fotograf og videograf i Vejle. Lukas Svendsen laver foto, video, content og drone til virksomheder, organisationer og private i Vejle og omegn.",
    headline: "Fotograf og videograf i Vejle",
    intro: [
      "Jeg arbejder som fotograf og videoproducent i Vejle med foto, video, content og drone til virksomheder, organisationer, brands og private.",
      "Uanset om du skal bruge materiale til markedsføring, en kampagne, sociale medier eller en konkret begivenhed, tager vi udgangspunkt i det, du skal bruge det til.",
    ],
    servicesHeading: "Foto og video til virksomheder i Vejle",
    servicesBody:
      "Jeg laver blandt andet virksomhedsfoto, portrætter, produktbilleder, videoproduktion og content til digitale kanaler. Materialet skal være professionelt og klar til brug, når du modtager det.",
    processHeading: "Samarbejde der er enkelt at gå til",
    processBody:
      "Vi starter med en kort snak om behov, dato og sted. Jeg møder op i Vejle, producerer materialet og leverer filer, du kan bruge med det samme. Ingen unødvendig kompleksitet.",
    portfolioNote:
      "Portfolioen herunder viser eksempler på produktioner med høje krav til kvalitet og leverance.",
    portfolioLinks: [
      { label: "Se erhvervsarbejde", href: "/arbejde?kategori=erhverv" },
      { label: "Se portefølje", href: "/arbejde" },
    ],
    proof:
      "Har fotograferet for Vejle Kommune og Bygningen Vejle, blandt andre opgaver i området.",
    services: [
      { label: "Book mig", href: "/booking" },
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "billund", "kolding", "fredericia"],
    priority: 3,
  },
  {
    slug: "esbjerg",
    city: "Esbjerg",
    path: "/fotograf-esbjerg",
    title: "Fotograf i Esbjerg | Foto, video og content",
    metaDescription:
      "Fotograf og videoproducent i Esbjerg. Foto, video og content til virksomheder og private. Lukas Svendsen har leveret materiale i Esbjerg og tager stadig opgaver i området.",
    headline: "Fotograf og videograf i Esbjerg",
    intro: [
      "Jeg har leveret foto og video i Esbjerg og tager stadig opgaver i Vestjylland til virksomheder, organisationer og private.",
      "Jeg arbejder med det samme brede setup som på mine andre opgaver: foto, video, content og drone, tilpasset det, du skal bruge materialet til.",
    ],
    servicesHeading: "Videoproduktion og foto i Esbjerg",
    servicesBody:
      "Jeg hjælper med alt fra portrætter og produktbilleder til film og content til sociale medier og kampagner. Opgaven kan være lille eller større, afhængigt af behovet.",
    processHeading: "Klar proces fra start til slut",
    processBody:
      "Skriv med dato, sted og en kort beskrivelse. Så vender jeg tilbage, og vi finder ud af omfang og form sammen, inden produktionen går i gang.",
    portfolioNote:
      "Nedenfor kan du se eksempler på arbejde fra Esbjerg og lignende produktioner.",
    portfolioLinks: [
      { label: "Suset", href: "/arbejde/rasmus-seebach-suset" },
      { label: "Esbjerg Streetfood", href: "/arbejde/esbjerg-streetfood" },
    ],
    proof:
      "Har leveret materiale fra Suset og Esbjerg Streetfood, blandt andre opgaver i området.",
    services: [
      { label: "Book mig", href: "/booking" },
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "give", "fredericia", "vejle"],
    priority: 4,
  },
  {
    slug: "give",
    city: "Give",
    path: "/fotograf-give",
    title: "Fotograf i Give | Foto, video og content",
    metaDescription:
      "Fotograf og videoproducent i Give og omegn. Foto, video, content og drone til virksomheder og private i det sydvestjyske område.",
    headline: "Fotograf og videograf i Give",
    intro: [
      "Jeg laver foto og video i Give og det sydvestjyske område til virksomheder, organisationer og private.",
      "Kontakt mig med dato, sted og en kort beskrivelse af opgaven. Så finder vi ud af, om det er foto, video, drone eller content, der giver mest mening.",
    ],
    servicesHeading: "Foto og video i Give og omegn",
    servicesBody:
      "Jeg hjælper med visuelt materiale til det, du skal bruge det til, uanset om det er til en virksomhed, en forening eller en privat opgave.",
    processHeading: "Sådan kommer vi i gang",
    processBody:
      "Vi tager en kort snak, aftaler dato og sted, og jeg leverer redigeret materiale bagefter. Du behøver ikke have alle detaljer på plads, når du skriver første gang.",
    services: [
      { label: "Book mig", href: "/booking" },
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["grindsted", "billund", "vejle", "esbjerg"],
    priority: 5,
  },
  {
    slug: "kolding",
    city: "Kolding",
    path: "/fotograf-kolding",
    title: "Fotograf i Kolding | Foto, video og content",
    metaDescription:
      "Fotograf og videograf i Kolding. Foto, video, content og drone til virksomheder, organisationer og private i Kolding og omegn.",
    headline: "Fotograf og videograf i Kolding",
    intro: [
      "Jeg laver foto, video, drone og content i Kolding til virksomheder, organisationer og private.",
      "Uanset om du har brug for ét shoot eller en større produktion, tager vi udgangspunkt i det, du skal bruge materialet til, og finder den løsning, der passer.",
    ],
    servicesHeading: "Content og videoproduktion i Kolding",
    servicesBody:
      "Jeg producerer foto og video til hjemmesider, sociale medier, kampagner og anden kommunikation, hvor det visuelle udtryk skal være professionelt og sammenhængende.",
    processHeading: "Fra idé til leverance",
    processBody:
      "Du beskriver opgaven, jeg møder op i Kolding eller omegn, og du modtager filer, der er klar til brug. Vi holder det enkelt og konkret.",
    services: [
      { label: "Book mig", href: "/booking" },
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["vejle", "fredericia", "grindsted", "give"],
    priority: 6,
  },
  {
    slug: "jelling",
    city: "Jelling",
    path: "/fotograf-jelling",
    title: "Fotograf i Jelling | Foto, video og content",
    metaDescription:
      "Fotograf og videoproducent i Jelling og omegn. Foto, video og content til virksomheder og private i lokalområdet.",
    headline: "Fotograf og videograf i Jelling",
    intro: [
      "Jeg laver foto og video i Jelling og omegn til virksomheder, organisationer og private.",
      "Har du en opgave i området, kan du skrive kort, hvad du skal bruge. Så vender jeg tilbage med et konkret svar.",
    ],
    servicesHeading: "Foto og video i Jelling",
    servicesBody:
      "Jeg hjælper med fotografi og videoproduktion til det, du skal bruge materialet til, uanset om det er til erhverv eller en privat opgave.",
    processHeading: "Enkel proces",
    processBody:
      "Kort snak, produktion på lokationen og leverance af redigeret materiale. Sådan holder vi det for de fleste opgaver.",
    services: [
      { label: "Book mig", href: "/booking" },
      { label: "Se arbejde", href: "/arbejde" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    nearbySlugs: ["vejle", "kolding", "grindsted", "give"],
    priority: 7,
  },
];

export const localAreas = [...areas].sort((a, b) => a.priority - b.priority);

export const localAreaSlugs = localAreas.map((area) => area.slug);

/** Primary cities for homepage SEO and cross-links */
export const primaryLocalAreas = localAreas.filter((area) =>
  ["grindsted", "billund", "vejle", "esbjerg"].includes(area.slug)
);

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

/** Primary cities for footer / cross-links */
export const primaryLocalCities = [
  "Grindsted",
  "Billund",
  "Vejle",
  "Esbjerg",
] as const;

export const localAreasSummary =
  "Foto, video og content i Grindsted, Billund, Vejle, Esbjerg, Give, Kolding og Jelling.";
