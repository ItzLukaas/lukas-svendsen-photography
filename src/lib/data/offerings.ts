export type OfferingAudience = "business" | "private" | "both";

export type Offering = {
  id: string;
  title: string;
  audience: OfferingAudience;
  summary: string;
  forWho: string;
  value: string;
  href?: string;
};

/**
 * What clients can hire Lukas for — grounded in booking types + portfolio.
 */
export const offerings: Offering[] = [
  {
    id: "business",
    title: "Virksomhedsfoto & video",
    audience: "business",
    summary:
      "Foto og video, der viser virksomheden, menneskene bag og det, I tilbyder. Det kan være alt fra billeder til hjemmeside og præsentationer til produkter, medarbejdere, kampagner og andet visuelt materiale.",
    forWho: "Virksomheder, organisationer og brands",
    value:
      "Foto og video til hjemmeside, kampagner, produkter, medarbejdere og visuel kommunikation.",
    href: "/hvad-jeg-laver#virksomheder",
  },
  {
    id: "content",
    title: "Content & markedsføring",
    audience: "both",
    summary:
      "Indhold til sociale medier, hjemmesider og markedsføring, skabt med udgangspunkt i virksomhedens udtryk og behov. Fra enkelte billeder og korte videoer til større produktioner med foto, video og drone.",
    forWho: "Virksomheder og brands med behov for indhold",
    value:
      "Enkeltstående billeder og videoer — eller et samlet contentunivers med foto, video og drone.",
    href: "/hvad-jeg-laver#virksomheder",
  },
  {
    id: "events",
    title: "Events, sport & oplevelser",
    audience: "business",
    summary:
      "Foto og video fra events, konferencer, koncerter, festivaler, sport og andre arrangementer. Jeg fanger både stemningen, menneskene og de øjeblikke, der gør dagen til noget særligt, så materialet kan bruges både under og efter arrangementet.",
    forWho: "Arrangører, klubber, festivals, venues og virksomheder",
    value:
      "Billeder og film, der fanger stemningen, menneskene og de særlige øjeblikke.",
    href: "/hvad-jeg-laver#virksomheder",
  },
  {
    id: "private",
    title: "Privat fotografering",
    audience: "private",
    summary:
      "Foto er ikke kun til virksomheder. Jeg fotograferer også for private til portrætter, fester, mærkedage og andre begivenheder. Uanset om det er en enkelt fotografering eller en større dag, handler det om at skabe naturlige og gennemarbejdede billeder, som man har lyst til at gemme og se tilbage på.",
    forWho: "Private kunder og familier",
    value: "Billeder, man har lyst til at gemme og se tilbage på.",
    href: "/hvad-jeg-laver#privat",
  },
];

export const businessAudiencePoints = [
  "Hjemmeside og virksomhedsprofil",
  "Sociale medier og content",
  "Kampagner og markedsføring",
  "Produktfoto",
  "Medarbejder- og portrætfoto",
  "Employer branding",
  "Events og arrangementer",
  "PR og presse",
  "Video- og droneproduktion",
] as const;

export const offeringsIntro = {
  eyebrow: "Hvad jeg laver",
  title: "Professionel foto, video og content",
  body: "Jeg hjælper virksomheder, organisationer og private med foto, video og content til blandt andet web, events, sport, koncerter og sociale medier.",
} as const;

export const businessOfferingsIntro = {
  eyebrow: "Primært",
  title: "Til virksomheder, organisationer og brands",
  body: "Jeg arbejder med virksomheder i alle størrelser og brancher og tilpasser altid foto og video til den enkelte virksomhed, opgave og situation. Det kan være alt fra billeder til hjemmesiden og medarbejderportrætter til content, kampagner, video og visuelt materiale til sociale medier. Uanset behovet er målet at skabe indhold, der får virksomheden til at stå skarpt og kan bruges aktivt i kommunikationen.",
} as const;

export const privateOfferingsIntro = {
  eyebrow: "Også til private",
} as const;
