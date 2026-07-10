export interface ClientLogo {
  id: string;
  name: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  /** Valgfri intern side — logoer linker ikke til eksterne domæner */
  href?: string;
}

export const clientLogos: ClientLogo[] = [
  {
    id: "billund-kommune",
    name: "Billund Kommune",
    alt: "Billund Kommune logo",
    src: "/images/clients/billund-kommune.webp",
    width: 288,
    height: 112,
  },
  {
    id: "dansk-handbold",
    name: "Dansk Håndbold",
    alt: "Dansk Håndbold logo",
    src: "/images/clients/dansk-handbold.webp",
    width: 440,
    height: 96,
  },
  {
    id: "frisko",
    name: "Frisko",
    alt: "Frisko logo",
    src: "/images/clients/frisko.webp",
    width: 150,
    height: 112,
  },
  {
    id: "3p-group",
    name: "3P Group",
    alt: "3P Group logo",
    src: "/images/clients/3p-group.webp",
    width: 203,
    height: 112,
  },
  {
    id: "vejle-kommune",
    name: "Vejle Kommune",
    alt: "Vejle Kommune logo",
    src: "/images/clients/vejle-kommune.webp",
    width: 280,
    height: 112,
  },
  {
    id: "bygningen",
    name: "Bygningen",
    alt: "Bygningen Vejle logo — Vejles kulturelle puls",
    src: "/images/clients/bygningen.webp",
    width: 248,
    height: 112,
  },
  {
    id: "ggif-handbold",
    name: "GGIF Håndbold",
    alt: "GGIF Håndbold logo",
    src: "/images/clients/ggif-handbold.webp",
    width: 268,
    height: 112,
  },
  {
    id: "magion",
    name: "MAGION",
    alt: "MAGION Kultur og Idræt logo",
    src: "/images/clients/magion.webp",
    width: 296,
    height: 112,
  },
  {
    id: "dgi",
    name: "DGI",
    alt: "DGI logo — Danske Gymnastik- og Idrætsforeninger",
    src: "/images/clients/dgi.webp",
    width: 204,
    height: 112,
  },
  {
    id: "bambuni-herreligaen",
    name: "Bambuni Herreligaen",
    alt: "Bambuni Herreligaen logo",
    src: "/images/clients/bambuni-herreligaen.webp",
    width: 440,
    height: 97,
  },
  {
    id: "esbjerg-street-food",
    name: "Esbjerg Street Food",
    alt: "Esbjerg Street Food logo — Det Gamle Teater",
    src: "/images/clients/esbjerg-street-food.webp",
    width: 138,
    height: 112,
    href: "/referencer/esbjerg-streetfood",
  },
  {
    id: "royal-fireworks",
    name: "Royal Fireworks",
    alt: "Royal Fireworks logo",
    src: "/images/clients/royal-fireworks-2026.webp",
    width: 164,
    height: 112,
  },
  {
    id: "venstre",
    name: "Venstre",
    alt: "Venstre logo",
    src: "/images/clients/venstre.webp",
    width: 440,
    height: 112,
  },
  {
    id: "stay-and-sleep",
    name: "Stay and Sleep",
    alt: "Stay and Sleep logo — Rest, Relax, Recharge",
    src: "/images/clients/stay-and-sleep.webp",
    width: 440,
    height: 97,
  },
];
