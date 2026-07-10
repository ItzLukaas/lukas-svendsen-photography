export interface ClientLogo {
  id: string;
  name: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  /** Officiel hjemmeside for kunden */
  href?: string;
}

function clientAlt(name: string, detail: string) {
  return `${name} logo — ${detail}, samarbejdspartner hos Lukas Svendsen`;
}

export const clientLogos: ClientLogo[] = [
  {
    id: "billund-kommune",
    name: "Billund Kommune",
    alt: clientAlt("Billund Kommune", "kommune i Sydjylland"),
    src: "/images/clients/billund-kommune.webp",
    width: 288,
    height: 112,
    href: "https://www.billund.dk",
  },
  {
    id: "vejle-kommune",
    name: "Vejle Kommune",
    alt: clientAlt("Vejle Kommune", "kommune i Trekantsområdet"),
    src: "/images/clients/vejle-kommune.webp",
    width: 280,
    height: 112,
    href: "https://www.vejle.dk",
  },
  {
    id: "dansk-handbold",
    name: "Dansk Håndbold",
    alt: clientAlt("Dansk Håndbold", "dansk håndboldforbund"),
    src: "/images/clients/dansk-handbold.webp",
    width: 440,
    height: 96,
    href: "https://danskhaandbold.dk",
  },
  {
    id: "bambuni-herreligaen",
    name: "Bambuni Herreligaen",
    alt: clientAlt("Bambuni Herreligaen", "dansk herrehåndboldliga"),
    src: "/images/clients/bambuni-herreligaen.webp",
    width: 440,
    height: 97,
    href: "https://tophaandbold.dk",
  },
  {
    id: "kif-kolding",
    name: "KIF Kolding",
    alt: clientAlt("KIF Kolding", "håndboldklub fra Kolding"),
    src: "/images/clients/kif-kolding.webp",
    width: 268,
    height: 112,
    href: "https://kif.dk",
  },
  {
    id: "ggif-handbold",
    name: "GGIF Håndbold",
    alt: clientAlt("GGIF Håndbold", "håndboldklub"),
    src: "/images/clients/ggif-handbold.webp",
    width: 268,
    height: 112,
    href: "https://www.ggif-handbold.dk",
  },
  {
    id: "dgi",
    name: "DGI",
    alt: clientAlt("DGI", "Danske Gymnastik- og Idrætsforeninger"),
    src: "/images/clients/dgi.webp",
    width: 204,
    height: 112,
    href: "https://www.dgi.dk",
  },
  {
    id: "magion",
    name: "MAGION",
    alt: clientAlt("MAGION Kultur og Idræt", "kultur- og idrætsorganisation"),
    src: "/images/clients/magion.webp",
    width: 296,
    height: 112,
    href: "https://www.magion.dk",
  },
  {
    id: "bygningen",
    name: "Bygningen",
    alt: clientAlt("Bygningen Vejle", "kulturhus og koncertsted"),
    src: "/images/clients/bygningen.webp",
    width: 248,
    height: 112,
    href: "https://www.bygningen.dk",
  },
  {
    id: "esbjerg-street-food",
    name: "Esbjerg Street Food",
    alt: clientAlt("Esbjerg Street Food", "street food i Det Gamle Teater"),
    src: "/images/clients/esbjerg-street-food.webp",
    width: 138,
    height: 112,
    href: "https://esbjergstreetfood.com",
  },
  {
    id: "frisko",
    name: "Frisko",
    alt: clientAlt("Frisko", "dansk fødevarebrand"),
    src: "/images/clients/frisko.webp",
    width: 150,
    height: 112,
    href: "https://www.frisko.dk",
  },
  {
    id: "3p-group",
    name: "3P Group",
    alt: clientAlt("3P Group", "erhvervsvirksomhed"),
    src: "/images/clients/3p-group.webp",
    width: 203,
    height: 112,
    href: "https://www.3pl.dk",
  },
  {
    id: "royal-fireworks",
    name: "Royal Fireworks",
    alt: clientAlt("Royal Fireworks", "fyrværkeri og pyroteknik"),
    src: "/images/clients/royal-fireworks-2026.webp",
    width: 164,
    height: 112,
    href: "https://royalfireworks.dk",
  },
  {
    id: "stay-and-sleep",
    name: "Stay and Sleep",
    alt: clientAlt("Stay and Sleep", "hotel og overnatning"),
    src: "/images/clients/stay-and-sleep.webp",
    width: 440,
    height: 97,
    href: "https://stayandsleep.dk",
  },
  {
    id: "ung-billund-ungdomsskolen",
    name: "Ung Billund Ungdomsskolen",
    alt: clientAlt("Ung Billund Ungdomsskolen", "ungdomsskole i Billund"),
    src: "/images/clients/ung-billund-ungdomsskolen.webp",
    width: 280,
    height: 112,
    href: "https://www.ungbillund.dk",
  },
  {
    id: "venstre",
    name: "Venstre",
    alt: clientAlt("Venstre", "politisk parti"),
    src: "/images/clients/venstre.webp",
    width: 440,
    height: 112,
    href: "https://www.venstre.dk",
  },
];
