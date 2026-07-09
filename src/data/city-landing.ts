export type CityServiceCategory = {
  title: string;
  description: string;
  items: string[];
  icon: "private" | "sport" | "events" | "business" | "production" | "drone";
};

export type CityWhyChoosePoint = {
  title: string;
  description: string;
  icon: "layers" | "users" | "delivery" | "dialog";
};

/** Fuld dækning — gælder alle bysider; {city} erstattes i tekster */
export const cityServiceCategories: CityServiceCategory[] = [
  {
    title: "Private & festlige arrangementer",
    icon: "private",
    description:
      "Til konfirmationer, fødselsdage, bryllup og andre festlige øjeblikke i {city} — naturligt, stemningsfuldt og personligt.",
    items: [
      "Konfirmationer",
      "Fødselsdage",
      "Bryllup",
      "Festlige arrangementer",
      "Portrætfotos",
      "Familiebegivenheder",
    ],
  },
  {
    title: "Sport",
    icon: "sport",
    description:
      "Action, intensitet og detaljer — fra lokale kampe til større turneringer i og omkring {city}.",
    items: [
      "Kampdækning",
      "Turneringer",
      "Klubber og foreninger",
      "Sportsfotografi",
      "Sportsvideo",
      "Hold- og spillerportrætter",
    ],
  },
  {
    title: "Events & koncerter",
    icon: "events",
    description:
      "Stemning, energi og de øjeblikke, der definerer dagen — til events og koncerter i {city}.",
    items: [
      "Events og festivaler",
      "Koncerter og live shows",
      "Konferencer",
      "Lanceringer",
      "Stemningsbilleder",
      "Eventvideo",
    ],
  },
  {
    title: "Virksomheder & organisationer",
    icon: "business",
    description:
      "Professionelt visuelt indhold til virksomheder, brands og organisationer i {city}-området.",
    items: [
      "Erhvervsfotografi",
      "Virksomhedsvideo",
      "Portrætter og teamfotos",
      "Branding og content",
      "Sociale medier",
      "Produktionsmiljøer",
    ],
  },
  {
    title: "Foto & videoproduktion",
    icon: "production",
    description:
      "Fotografering og videoproduktion til private, sport, events og erhverv i {city} — med fokus på stemning og historiefortælling.",
    items: [
      "Fotografering",
      "Videoproduktion",
      "Visuel produktion",
      "Content creation",
      "Portræt- og eventvideo",
      "Materiale til web og sociale medier",
    ],
  },
  {
    title: "Droneproduktion",
    icon: "drone",
    description:
      "Dronefoto og dronevideo i {city} og omegn — unikke luftperspektiver til events, sport, erhverv og private projekter.",
    items: [
      "Dronefoto",
      "Dronevideo",
      "Droneproduktion",
      "Luftbilleder",
      "Luftvideo",
      "Events og erhverv fra luften",
    ],
  },
];

export function getCityWhyChoose(
  cityName: string,
  preposition: "i" | "på" = "i",
): CityWhyChoosePoint[] {
  const inCity = `${preposition} ${cityName}`;

  return [
    {
      title: "Alt under ét tag",
      description: `Foto, video og drone fra én kontakt — til private fester, sport, events, koncerter og virksomheder ${inCity}.`,
      icon: "layers",
    },
    {
      title: "Bred erfaring",
      description:
        "Fra konfirmationer og portrætter til sportsdækning, koncertfoto og erhvervsproduktion — jeg tilpasser produktionen til dit behov.",
      icon: "users",
    },
    {
      title: "Klar til brug",
      description:
        "Materialet leveres klar til web, sociale medier og tryk — med fokus på kvalitet og et professionelt udtryk.",
      icon: "delivery",
    },
    {
      title: "Personlig dialog",
      description: `Uforpligtende snak inden projektet, tydelig planlægning og løbende dialog — også når det går stærkt ${inCity}.`,
      icon: "dialog",
    },
  ];
}

export function applyCityName(text: string, cityName: string) {
  return text.replaceAll("{city}", cityName);
}
