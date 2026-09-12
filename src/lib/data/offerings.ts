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
    title: "Virksomheder & branding",
    audience: "business",
    summary:
      "Foto og video til virksomheder, organisationer og brands, der har brug for stærkt indhold til hjemmeside, sociale medier, kampagner og intern kommunikation.",
    forWho: "Virksomheder, organisationer og brands",
    value:
      "Stærkt visuelt indhold til hjemmeside, sociale medier, kampagner og intern kommunikation.",
    href: "/hvad-jeg-laver#virksomheder",
  },
  {
    id: "events",
    title: "Events, koncerter & sport",
    audience: "business",
    summary:
      "Foto og video fra events, koncerter, festivaler og sport. Fra de store øjeblikke til de små detaljer, der tilsammen fortæller historien om dagen.",
    forWho: "Arrangører, klubber, festivals, venues og medier",
    value:
      "Billeder og film, der fanger både de store øjeblikke og de små detaljer fra dagen.",
    href: "/hvad-jeg-laver#virksomheder",
  },
  {
    id: "content",
    title: "Content & video",
    audience: "both",
    summary:
      "Indhold til sociale medier, hjemmesider og kampagner. Fra korte videoer og reels til større produktioner, hvor foto, video og drone går op i en højere enhed.",
    forWho: "Brands, virksomheder og projekter med behov for indhold",
    value:
      "Sammenhængende content — fra korte videoer og reels til større produktioner med foto, video og drone.",
    href: "/hvad-jeg-laver#virksomheder",
  },
  {
    id: "private",
    title: "Privat fotografering",
    audience: "private",
    summary:
      "Fotografering til portrætter, fester, mærkedage og andre private begivenheder, hvor de gode øjeblikke skal foreviges.",
    forWho: "Private kunder, familier og personlige brands",
    value: "Personlige billeder, der holder på de gode øjeblikke.",
    href: "/hvad-jeg-laver#privat",
  },
];

export const businessAudiencePoints = [
  "Hjemmeside & digitalt indhold",
  "Sociale medier & content",
  "Kampagner & markedsføring",
  "Events, sport & live",
  "Employer branding & portrætter",
  "PR & visuelt materiale",
] as const;

export const offeringsIntro = {
  eyebrow: "Hvad jeg laver",
  title: "Professionel foto, video og content",
  body: "Jeg hjælper virksomheder, organisationer og private med foto, video og content til blandt andet web, events, sport, koncerter og sociale medier.",
} as const;
