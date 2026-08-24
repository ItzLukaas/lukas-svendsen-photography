export type ClientLogo = {
  name: string;
  src: string;
  /** Official brand website */
  href: string;
  /** Meaningful image alternative for accessibility & SEO */
  alt: string;
  /** Optional title shown on hover */
  title?: string;
  /** Intrinsic asset width — used for aspect-ratio / CLS */
  width: number;
  /** Intrinsic asset height — used for aspect-ratio / CLS */
  height: number;
  /**
   * Optical display height — tuned so every mark reads at equal visual weight.
   * Wide / dense logos sit smaller; compact / light logos sit larger.
   * Never stretch: width follows intrinsic aspect ratio via w-auto.
   */
  heightClass: string;
};

/**
 * Selected clients & collaborations — only verified official logo assets.
 * Order curated to alternate color and monochrome marks where possible.
 */
export const clientLogos: ClientLogo[] = [
  {
    name: "MAGION Grindsted",
    src: "/logos/magion.png",
    href: "https://magion.dk/",
    alt: "MAGION Grindsted logo",
    title: "MAGION Grindsted",
    width: 439,
    height: 120,
    heightClass: "h-[1.65rem] md:h-[1.85rem]",
  },
  {
    name: "Vejle Kommune",
    src: "/logos/vejle-kommune.svg",
    href: "https://www.vejle.dk/",
    alt: "Vejle Kommune logo",
    title: "Vejle Kommune",
    width: 441,
    height: 176,
    heightClass: "h-[2.35rem] md:h-[2.6rem]",
  },
  {
    name: "Frisko",
    src: "/logos/frisko.svg",
    href: "https://www.frisko.dk/",
    alt: "Frisko logo",
    title: "Frisko",
    width: 400,
    height: 299,
    heightClass: "h-[2.2rem] md:h-[2.45rem]",
  },
  {
    name: "REKOM Group",
    src: "/logos/rekom-group.png",
    href: "https://rekomgroup.com/",
    alt: "REKOM Group logo",
    title: "REKOM Group",
    width: 500,
    height: 94,
    heightClass: "h-[1.55rem] md:h-[1.75rem]",
  },
  {
    name: "Billund Kommune",
    src: "/logos/billund-kommune.png",
    href: "https://www.billund.dk/",
    alt: "Billund Kommune logo",
    title: "Billund Kommune",
    width: 1200,
    height: 485,
    heightClass: "h-[2.8rem] md:h-[3.15rem]",
  },
  {
    name: "Bygningen Vejle",
    src: "/logos/bygningen-vejle.svg",
    href: "https://www.bygningen-vejle.dk/",
    alt: "Bygningen Vejle logo",
    title: "Bygningen Vejle",
    width: 712,
    height: 290,
    heightClass: "h-[2.05rem] md:h-[2.25rem]",
  },
  {
    name: "DanskHåndbold",
    src: "/logos/dansk-haandbold.svg",
    href: "https://danskhaandbold.dk/",
    alt: "DanskHåndbold logo",
    title: "DanskHåndbold",
    width: 655,
    height: 150,
    heightClass: "h-[2rem] md:h-[2.25rem]",
  },
  {
    name: "Fredericia Håndboldklub",
    src: "/logos/fredericia-haandboldklub.svg",
    href: "https://fhk.dk/",
    alt: "Fredericia Håndboldklub logo",
    title: "Fredericia Håndboldklub",
    width: 157,
    height: 157,
    heightClass: "h-[2.45rem] md:h-[2.75rem]",
  },
  {
    name: "Bork Festival",
    src: "/logos/bork-festival.png",
    href: "https://borkfestival.dk/",
    alt: "Bork Festival logo",
    title: "Bork Festival",
    width: 900,
    height: 538,
    heightClass: "h-[2.85rem] md:h-[3.2rem]",
  },
  {
    name: "Suset",
    src: "/logos/suset-esbjerg.svg",
    href: "https://www.suset.dk/",
    alt: "Suset Esbjerg logo",
    title: "Suset",
    width: 400,
    height: 181,
    heightClass: "h-[2.15rem] md:h-[2.4rem]",
  },
  {
    name: "Stay And Sleep",
    src: "/logos/stay-and-sleep.png",
    href: "https://stayandsleep.dk/",
    alt: "Stay And Sleep logo",
    title: "Stay And Sleep",
    width: 700,
    height: 176,
    heightClass: "h-[2.4rem] md:h-[2.65rem]",
  },
  {
    name: "Smukfest",
    src: "/logos/smukfest.svg",
    href: "https://www.smukfest.dk/",
    alt: "Smukfest logo",
    title: "Smukfest",
    width: 115,
    height: 111,
    heightClass: "h-[2.4rem] md:h-[2.7rem]",
  },
  {
    name: "Venstre",
    src: "/logos/venstre.svg",
    href: "https://www.venstre.dk/",
    alt: "Venstre logo",
    title: "Venstre",
    width: 128,
    height: 33,
    heightClass: "h-[1.8rem] md:h-[2rem]",
  },
  {
    name: "DGI",
    src: "/logos/dgi.png",
    href: "https://www.dgi.dk/",
    alt: "DGI logo",
    title: "DGI",
    width: 624,
    height: 231,
    heightClass: "h-[1.4rem] md:h-[1.55rem]",
  },
  {
    name: "Varde Open Air",
    src: "/logos/varde-open-air.svg",
    href: "https://vardeopenair.dk/",
    alt: "Varde Open Air logo",
    title: "Varde Open Air",
    width: 460,
    height: 238,
    heightClass: "h-[1.9rem] md:h-[2.15rem]",
  },
  {
    name: "Royal Fireworks",
    src: "/logos/royal-fireworks.png",
    href: "https://royalfireworks.dk/",
    alt: "Royal Fireworks logo",
    title: "Royal Fireworks",
    width: 787,
    height: 206,
    heightClass: "h-[2.15rem] md:h-[2.4rem]",
  },
  {
    name: "Esbjerg Streetfood",
    src: "/logos/esbjerg-streetfood.png",
    href: "https://esbjergstreetfood.dk/",
    alt: "Esbjerg Streetfood logo",
    title: "Esbjerg Streetfood",
    width: 507,
    height: 419,
    heightClass: "h-[2.2rem] md:h-[2.45rem]",
  },
  {
    name: "3PL",
    src: "/logos/3pl.png",
    href: "https://www.3pl.dk/",
    alt: "3PL logo",
    title: "3PL",
    width: 524,
    height: 246,
    heightClass: "h-[2.55rem] md:h-[2.85rem]",
  },
  {
    name: "migogesbjerg",
    src: "/logos/migogesbjerg.svg",
    href: "https://migogesbjerg.dk/",
    alt: "migogesbjerg logo",
    title: "migogesbjerg",
    width: 1206,
    height: 283,
    heightClass: "h-[2.15rem] md:h-[2.4rem]",
  },
  {
    name: "SPORT 24",
    src: "/logos/sport24.png",
    href: "https://www.sport24.dk/",
    alt: "SPORT 24 logo",
    title: "SPORT 24",
    width: 232,
    height: 72,
    heightClass: "h-[1.85rem] md:h-[2.05rem]",
  },
];

/** Crawlable summary of collaborations for accessibility & SEO. */
export const collaborationsSummary = `Udvalgte samarbejder og opgaver med ${clientLogos
  .map((logo) => logo.name)
  .join(", ")}.`;

export function getCollaborationsJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/#collaborations`,
    name: "Samarbejder & opgaver",
    description:
      "Udvalgte samarbejder og opgaver — blandt andet MAGION Grindsted, Vejle Kommune, Billund Kommune, DanskHåndbold, Fredericia Håndboldklub, Varde Open Air, Bork Festival, Suset, Smukfest og SPORT 24.",
    numberOfItems: clientLogos.length,
    itemListElement: clientLogos.map((logo, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: logo.name,
        url: logo.href,
        image: `${siteUrl}${logo.src}`,
      },
    })),
  };
}
