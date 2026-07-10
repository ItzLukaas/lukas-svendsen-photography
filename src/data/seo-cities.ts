export interface SeoCity {
  slug: string;
  name: string;
  region: string;
  preposition: "i" | "på";
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  servicesIntro: string;
  servicesHeading: string;
  referenceSlugs: string[];
  portfolioPhotoIds: string[];
  lastModified: string;
}

/** Alle portfolio-billeder — roteres let per by (5 af 6 deles typisk mellem nabosider) */
const PORTFOLIO_POOL = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
] as const;

const PORTFOLIO_COUNT = 6;

function portfolioPhotoIdsForIndex(index: number): string[] {
  const offset = index % PORTFOLIO_POOL.length;
  return Array.from(
    { length: PORTFOLIO_COUNT },
    (_, i) => PORTFOLIO_POOL[(offset + i) % PORTFOLIO_POOL.length],
  );
}

function metaFor(name: string, preposition: "i" | "på") {
  return `Leder du efter en fotograf ${preposition} ${name}? Fotografering, videoproduktion og droneflyvning til konfirmationer, bryllup, sport, events, koncerter og virksomheder. Kontakt mig for et uforpligtende tilbud.`;
}

function titleFor(name: string, preposition: "i" | "på") {
  return `Fotograf ${preposition} ${name}`;
}

function h1For(name: string, preposition: "i" | "på") {
  return `Fotograf ${preposition} ${name}`;
}

function servicesHeadingFor(name: string, preposition: "i" | "på") {
  return `Alt du har brug for ${preposition} ${name}`;
}

type CityInput = {
  slug: string;
  name: string;
  region: string;
  intro: string;
  servicesIntro: string;
  references?: string[];
  preposition?: "i" | "på";
};

function buildCity({
  slug,
  name,
  region,
  intro,
  servicesIntro,
  references = [],
  preposition = "i",
}: CityInput) {
  return {
    slug,
    name,
    region,
    preposition,
    title: titleFor(name, preposition),
    metaDescription: metaFor(name, preposition),
    h1: h1For(name, preposition),
    intro,
    servicesIntro,
    servicesHeading: servicesHeadingFor(name, preposition),
    referenceSlugs: references,
    lastModified: "2026-07-09",
  };
}

const cityDefinitions = [
  buildCity({
    slug: "fotograf-grindsted",
    name: "Grindsted",
    region: "Syddanmark",
    intro:
      "Jeg er baseret i Grindsted og arbejder lokalt med fotografering, videoproduktion og droneflyvning — til private fester, sport, events, koncerter, erhverv og alt derimellem.",
    servicesIntro:
      "Fra konfirmationer og portrætter til sportsdækning og virksomhedsvideo — jeg dækker Grindsted, Billund, Brande og omegn med kort responstid.",
  }),
  buildCity({
    slug: "fotograf-vejle",
    name: "Vejle",
    region: "Syddanmark",
    intro:
      "Jeg fotograferer og filmer i Vejle til events, sport, koncerter og erhverv — med fokus på stemning, detaljer og stærke historier fra første brief til levering.",
    servicesIntro:
      "Vejle har et aktivt kultur- og erhvervsliv — jeg leverer fotografering, videoproduktion og droneflyvning til alt fra konfirmationer og bryllup til kampdækning og koncertfoto.",
  }),
  buildCity({
    slug: "fotograf-kolding",
    name: "Kolding",
    region: "Syddanmark",
    intro:
      "Professionel fotografering og videoproduktion i Kolding — til sport, events, private arrangementer og virksomheder, der vil have visuelt indhold med kant.",
    servicesIntro:
      "Jeg har erfaring med sports- og eventproduktion i Kolding-området og leverer materiale, der fungerer til web, sociale medier og tryk.",
    references: ["kif-kolding"],
  }),
  buildCity({
    slug: "fotograf-fredericia",
    name: "Fredericia",
    region: "Syddanmark",
    intro:
      "Fotograf og videograf i Fredericia — særligt til sport, koncerter, events og erhvervsprojekter, hvor tempo og lys skifter hurtigt.",
    servicesIntro:
      "Fredericias sports- og kulturliv kræver en fotograf, der kan levere under pres — fra kampdækning og koncertfoto til erhvervsindhold og dronevideo.",
    references: ["fredericia-handboldklub"],
  }),
  buildCity({
    slug: "fotograf-billund",
    name: "Billund",
    region: "Syddanmark",
    intro:
      "Fotograf og videograf i Billund — til virksomheder, events, sport og private projekter med professionelt og troværdigt visuelt udtryk.",
    servicesIntro:
      "Billund er et erhvervsstærkt område — jeg hjælper med portrætter, eventdækning, virksomhedsvideo og droneoptagelser til brands og organisationer.",
  }),
  buildCity({
    slug: "fotograf-esbjerg",
    name: "Esbjerg",
    region: "Syddanmark",
    intro:
      "Fotografering og videoproduktion i Esbjerg — til sport, festivaler, erhverv og private arrangementer i Vestjylland.",
    servicesIntro:
      "Uanset om det er street food-event, sportskamp eller virksomhedsindhold — jeg leverer fotografering, videoproduktion og droneflyvning i Esbjerg med fokus på mennesker og stemning.",
    references: ["esbjerg-streetfood"],
  }),
  buildCity({
    slug: "fotograf-horsens",
    name: "Horsens",
    region: "Midtjylland",
    intro:
      "Fotograf og videograf i Horsens — til koncerter, events, sport og erhverv med et rent og moderne visuelt udtryk.",
    servicesIntro:
      "Horsens har et stærkt kultur- og eventmiljø — jeg dokumenterer det med fotografering og videoproduktion til både private og professionelle projekter.",
  }),
  buildCity({
    slug: "fotograf-aarhus",
    name: "Aarhus",
    region: "Midtjylland",
    intro:
      "Fotografering og videoproduktion i Aarhus — til events, koncerter, sport, portrætter og erhvervsprojekter i Østjylland.",
    servicesIntro:
      "Jeg tager opgaver i Aarhus efter aftale og planlægger produktionen efter location, tidsplan og de kanaler, materialet skal bruges på.",
  }),
  buildCity({
    slug: "fotograf-odense",
    name: "Odense",
    region: "Syddanmark",
    intro:
      "Fotograf og videograf i Odense — til bryllup, konfirmationer, sport, events og erhverv med naturlige og stemningsfulde resultater.",
    servicesIntro:
      "Fra private festlige arrangementer til sportsdækning og virksomhedsvideo — jeg dækker Odense med fotografering, videoproduktion og droneflyvning efter projektets behov.",
  }),
  buildCity({
    slug: "fotograf-herning",
    name: "Herning",
    region: "Midtjylland",
    intro:
      "Fotograf i Herning — til sport, events, erhverv og private projekter, hvor visuelt indhold skal se skarpt ud og fortælle en klar historie.",
    servicesIntro:
      "Herning og omegn er et naturligt arbejdsområde for mig — jeg leverer kampdækning, eventfoto, portrætter og videoproduktion med høj kvalitet.",
  }),
  buildCity({
    slug: "fotograf-silkeborg",
    name: "Silkeborg",
    region: "Midtjylland",
    intro:
      "Fotograf og videograf i Silkeborg — til events, sport, koncerter og erhverv omgivet af Søhøjlandets smukke locations.",
    servicesIntro:
      "Silkeborg er ideel til både udendørs portrætter og indendørs events — jeg tilpasser fotografering, videoproduktion og droneflyvning til dit projekt og din tidsplan.",
  }),
  buildCity({
    slug: "fotograf-vejen",
    name: "Vejen",
    region: "Syddanmark",
    intro:
      "Fotografering og videoproduktion i Vejen — til sport, private arrangementer, erhverv og lokale events i Vestsyddanmark.",
    servicesIntro:
      "Jeg kører regelmæssigt til Vejen fra Grindsted og leverer alt fra konfirmationsfoto til sportsvideo og droneoptagelser.",
  }),
  buildCity({
    slug: "fotograf-ribe",
    name: "Ribe",
    region: "Syddanmark",
    intro:
      "Fotograf i Ribe — til events, portrætter, erhverv og kulturelle arrangementer i en af Danmarks mest historiske byer.",
    servicesIntro:
      "Ribes stemningsfulde miljø giver unikke muligheder for fotografering og videoproduktion — jeg fanger både detaljer og helhed med et professionelt udtryk.",
  }),
  buildCity({
    slug: "fotograf-brande",
    name: "Brande",
    region: "Midtjylland",
    intro:
      "Fotograf og videograf i Brande — til virksomheder, sport, events og private projekter i det centrale Jylland.",
    servicesIntro:
      "Brande ligger tæt på mit udgangspunkt i Grindsted — jeg tilbyder hurtig tilgængelighed og professionelt fotografering, videoproduktion og droneflyvning i området.",
  }),
  buildCity({
    slug: "fotograf-ikast",
    name: "Ikast",
    region: "Midtjylland",
    intro:
      "Fotograf i Ikast — til sport, events, erhvervsfoto og private arrangementer med fokus på kvalitet og ægte øjeblikke.",
    servicesIntro:
      "Ikast og omegn dækkes med samme bredde som resten af regionen — konfirmationer, sportsdækning, koncertfoto og virksomhedsindhold.",
  }),
  buildCity({
    slug: "fotograf-middelfart",
    name: "Middelfart",
    region: "Syddanmark",
    intro:
      "Fotograf og videograf i Middelfart — til events, sport, erhverv og private projekter ved Lillebælt og i det østlige Fyn.",
    servicesIntro:
      "Middelfart er let tilgængeligt fra Jylland — jeg leverer fotografering, videoproduktion og droneflyvning til både lokale virksomheder og private kunder i området.",
  }),
  buildCity({
    slug: "fotograf-haderslev",
    name: "Haderslev",
    region: "Syddanmark",
    intro:
      "Fotografering og videoproduktion i Haderslev — til sport, events, koncerter og erhverv i Sønderjylland.",
    servicesIntro:
      "Jeg tager opgaver i Haderslev og leverer visuelt indhold til klubber, virksomheder og private — fra portrætter til kampdækning.",
  }),
  buildCity({
    slug: "fotograf-aabenraa",
    name: "Aabenraa",
    region: "Syddanmark",
    intro:
      "Fotograf i Aabenraa — til events, sport, erhverv og private arrangementer i det sydlige Jylland.",
    servicesIntro:
      "Aabenraa og Sønderjylland er en del af mit naturlige dækningsområde — jeg planlægger rejse og produktion efter dit projekt.",
  }),
  buildCity({
    slug: "fotograf-skanderborg",
    name: "Skanderborg",
    region: "Midtjylland",
    intro:
      "Fotograf og videograf i Skanderborg — til events, sport, koncerter og erhvervsprojekter mellem Aarhus og Silkeborg.",
    servicesIntro:
      "Skanderborg har et aktivt lokalmiljø for sport og kultur — jeg leverer fotografering og videoproduktion, der fanger energien og detaljerne.",
  }),
  buildCity({
    slug: "fotograf-hedensted",
    name: "Hedensted",
    region: "Midtjylland",
    intro:
      "Fotograf i Hedensted — til private fester, sport, events og erhverv i Vejle-området med kort kørselsafstand fra Grindsted.",
    servicesIntro:
      "Hedensted ligger strategisk mellem større byer — jeg dækker området med fotografering, videoproduktion og droneflyvning til både små og større projekter.",
  }),
  buildCity({
    slug: "fotograf-give",
    name: "Give",
    region: "Midtjylland",
    intro:
      "Fotograf og videograf i Give — til sport, lokale events, portrætter og erhvervsindhold i det vestlige Midtjylland.",
    servicesIntro:
      "Give er tæt på mit udgangspunkt — jeg tilbyder fleksibel planlægning og professionelt visuelt materiale til hele området.",
  }),
  buildCity({
    slug: "fotograf-varde",
    name: "Varde",
    region: "Syddanmark",
    intro:
      "Fotografering og videoproduktion i Varde — til events, sport, turisme og erhverv på Vestkysten.",
    servicesIntro:
      "Varde og vestkysten giver unikke locations til fotografering og droneflyvning — jeg leverer materiale til events, virksomheder og private projekter.",
  }),
  buildCity({
    slug: "fotograf-ringkoebing",
    name: "Ringkøbing",
    region: "Midtjylland",
    intro:
      "Fotograf i Ringkøbing — til events, portrætter, sport og erhverv med Vestjyllands charme som kulisse.",
    servicesIntro:
      "Ringkøbing og omegn dækkes med fotografering, videoproduktion og droneflyvning — fra konfirmationer og bryllup til virksomhedsindhold og eventdækning.",
  }),
  buildCity({
    slug: "fotograf-holstebro",
    name: "Holstebro",
    region: "Midtjylland",
    intro:
      "Fotograf og videograf i Holstebro — til sport, kulturarrangementer, erhverv og private projekter i Nordvestjylland.",
    servicesIntro:
      "Holstebro har et stærkt kultur- og sportsmiljø — jeg leverer visuelt indhold med fokus på stemning, action og detaljer.",
  }),
  buildCity({
    slug: "fotograf-ringsted",
    name: "Ringsted",
    region: "Sjælland",
    intro:
      "Fotograf i Ringsted — til sport, events, erhverv og private arrangementer på Sjælland efter aftale.",
    servicesIntro:
      "Jeg tager udvalgte opgaver i Ringsted og på Sjælland — med samme fokus på kvalitet, dialog og professionel levering.",
  }),
  buildCity({
    slug: "fotograf-grenaa",
    name: "Grenaa",
    region: "Midtjylland",
    intro:
      "Fotograf og videograf i Grenaa — til events, sport, havneliv og erhvervsprojekter ved Djurslands kyst.",
    servicesIntro:
      "Grenaa og Djursland er en del af mit dækningsområde — jeg leverer fotografering, videoproduktion og droneflyvning til lokale og regionale projekter.",
  }),
  buildCity({
    slug: "fotograf-sonderborg",
    name: "Sønderborg",
    region: "Syddanmark",
    intro:
      "Fotograf i Sønderborg — til events, sport, erhverv og private projekter i det sydøstlige Jylland.",
    servicesIntro:
      "Sønderborg og Als dækkes med professionel fotografering og videoproduktion — fra portrætter og konfirmationer til event- og sportsdækning.",
  }),
  buildCity({
    slug: "fotograf-thisted",
    name: "Thisted",
    region: "Midtjylland",
    intro:
      "Fotograf og videograf i Thisted — til sport, events, erhverv og private projekter i Thy og Nordvestjylland.",
    servicesIntro:
      "Thisted og Thy er en naturlig del af mit arbejdsområde — jeg planlægger produktionen efter location og projektets omfang.",
  }),
  buildCity({
    slug: "fotograf-randers",
    name: "Randers",
    region: "Midtjylland",
    intro:
      "Fotograf i Randers — til events, sport, koncerter og erhvervsprojekter i Østjylland med stærkt visuelt udtryk.",
    servicesIntro:
      "Randers er let tilgængeligt fra mit udgangspunkt — jeg leverer kampdækning, eventfoto, videoproduktion og droneflyvning efter behov.",
  }),
  buildCity({
    slug: "fotograf-jylland",
    name: "Jylland",
    region: "Jylland",
    preposition: "i",
    intro:
      "Fotograf i Jylland — baseret i Grindsted dækker jeg Midt- og Syddanmark med fotografering, videoproduktion og droneflyvning til private, sport, events og erhverv.",
    servicesIntro:
      "Fra Vestkysten til Østjylland — konfirmationer, bryllup, sportsdækning, koncertfoto, virksomhedsindhold og droneflyvning i hele Jylland.",
  }),
  buildCity({
    slug: "fotograf-fyn",
    name: "Fyn",
    region: "Fyn",
    preposition: "på",
    intro:
      "Fotograf på Fyn — til events, sport, erhverv og private projekter i Odense, Middelfart og resten af øen efter aftale.",
    servicesIntro:
      "Jeg tager opgaver på Fyn med fotografering, videoproduktion og droneflyvning — planlagt efter location, tidsplan og det visuelle udtryk, du ønsker.",
  }),
  buildCity({
    slug: "fotograf-sjaelland",
    name: "Sjælland",
    region: "Sjælland",
    preposition: "på",
    intro:
      "Fotograf på Sjælland — udvalgte opgaver med fotografering, videoproduktion og droneflyvning til private, sport, events og erhverv efter aftale.",
    servicesIntro:
      "Ringsted og øvrige dele af Sjælland dækkes for udvalgte projekter — med samme fokus på kvalitet og professionel dialog.",
  }),
];

export const seoCities: SeoCity[] = cityDefinitions.map((city, index) => ({
  ...city,
  portfolioPhotoIds: portfolioPhotoIdsForIndex(index),
}));

export function getSeoCityBySlug(slug: string) {
  return seoCities.find((city) => city.slug === slug);
}

export function isSeoCitySlug(slug: string) {
  return seoCities.some((city) => city.slug === slug);
}

export function cityPath(city: SeoCity) {
  return `/${city.slug}`;
}

export const seoCityNames = seoCities.map((city) => city.name);
