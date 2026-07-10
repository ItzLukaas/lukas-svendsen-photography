export const privacyPolicyMeta = {
  title: "Privatlivspolitik",
  description:
    "Læs hvordan Lukas Svendsen behandler personoplysninger ved forespørgsler, booking og levering af fotografering, videoproduktion og droneflyvning.",
  lastUpdated: "10/07/2026",
};

export type PrivacyBlock =
  | { type: "paragraph"; text: string }
  | {
      type: "paragraph";
      segments: Array<{ text: string; strong?: boolean }>;
    }
  | { type: "list"; items: string[] }
  | { type: "labeled-list"; items: Array<{ label: string; text: string }> }
  | { type: "contact" }
  | { type: "link"; label: string; href: string; external?: boolean };

export interface PrivacySection {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
}

export const privacyPolicySections: PrivacySection[] = [
  {
    id: "dataansvarlig",
    title: "1. Dataansvarlig",
    blocks: [
      {
        type: "paragraph",
        text: "Denne privatlivspolitik beskriver, hvordan jeg behandler dine personoplysninger, når du kontakter mig, sender en forespørgsel eller bestiller fotografering, videoproduktion eller droneflyvning.",
      },
      { type: "contact" },
      {
        type: "paragraph",
        text: "Jeg er ansvarlig for behandlingen af de personoplysninger, jeg modtager fra dig.",
      },
    ],
  },
  {
    id: "indsamling",
    title: "2. Hvilke oplysninger indsamler jeg?",
    blocks: [
      {
        type: "paragraph",
        text: "Når du udfylder min bookingformular eller kontakter mig, kan jeg indsamle følgende oplysninger:",
      },
      {
        type: "list",
        items: [
          "Navn",
          "Virksomhedsnavn (hvis du vælger at oplyse det)",
          "E-mailadresse",
          "Telefonnummer",
          "Lokation/adresse for opgaven",
          "Oplysninger om projektet og dine ønsker",
          "Valg af ydelse (fotografering, videoproduktion eller droneflyvning)",
          "Ønsket tidspunkt for opgaven",
          "Andre oplysninger, du selv vælger at give",
        ],
      },
      {
        type: "paragraph",
        text: "Jeg indsamler kun de oplysninger, der er nødvendige for at kunne besvare din forespørgsel og levere den aftalte ydelse.",
      },
    ],
  },
  {
    id: "formaal",
    title: "3. Formål med behandling af oplysninger",
    blocks: [
      {
        type: "paragraph",
        text: "Jeg behandler dine personoplysninger for at:",
      },
      {
        type: "list",
        items: [
          "besvare forespørgsler",
          "planlægge og gennemføre opgaver med fotografering, videoproduktion og droneflyvning",
          "udarbejde tilbud og aftaler",
          "kommunikere med dig før, under og efter en opgave",
          "sende bekræftelser og relevant information",
          "udstede fakturaer",
          "håndtere eventuelle efterfølgende spørgsmål eller ændringer",
        ],
      },
    ],
  },
  {
    id: "retsgrundlag",
    title: "4. Retsgrundlag for behandling",
    blocks: [
      {
        type: "paragraph",
        text: "Jeg behandler dine personoplysninger på følgende grundlag:",
      },
      {
        type: "labeled-list",
        items: [
          {
            label: "Aftale eller forberedelse af aftale:",
            text: "Når du kontakter mig med henblik på en opgave eller bestiller en ydelse.",
          },
          {
            label: "Retlig forpligtelse:",
            text: "Når oplysninger skal opbevares af hensyn til eksempelvis dokumentation og regnskab.",
          },
          {
            label: "Legitim interesse:",
            text: "Når det er nødvendigt for at kunne drive min aktivitet, yde kundeservice og beskytte mine eller kundens interesser.",
          },
        ],
      },
    ],
  },
  {
    id: "bookingformular",
    title: "5. Bookingformular og tekniske leverandører",
    blocks: [
      {
        type: "paragraph",
        text: "Min bookingformular er udviklet af mig selv og anvender ikke et eksternt bookingsystem.",
      },
      {
        type: "paragraph",
        text: "Når du indsender en forespørgsel via formularen, sendes oplysningerne til mig via min e-mailtjeneste, som leveres gennem Resend API. Du modtager samtidig en bekræftelse på din forespørgsel.",
      },
      {
        type: "paragraph",
        text: "Min hjemmeside anvender følgende tekniske leverandører:",
      },
      {
        type: "list",
        items: [
          "Vercel – hosting af hjemmesiden",
          "Cloudflare – DNS, sikkerhed og teknisk infrastruktur",
          "Simply.com – registrering af domæne",
          "Resend – levering af e-mails fra bookingformularen",
          "Dropbox – ekstern lagring af materiale og backup",
        ],
      },
      {
        type: "paragraph",
        text: "Disse leverandører kan behandle tekniske oplysninger, der er nødvendige for at levere deres tjenester.",
      },
      {
        type: "paragraph",
        text: "Nogle af disse leverandører kan være etableret uden for EU/EØS. Hvis personoplysninger overføres uden for EU/EØS, sker dette kun i overensstemmelse med gældende databeskyttelseslovgivning, eksempelvis gennem EU-Kommissionens standardkontrakter eller andre godkendte overførselsgrundlag.",
      },
    ],
  },
  {
    id: "fakturering",
    title: "6. Fakturering og regnskab",
    blocks: [
      {
        type: "paragraph",
        text: "Hvis du bestiller en ydelse, anvendes dine oplysninger til fakturering.",
      },
      {
        type: "paragraph",
        text: "Fakturaer og relevante oplysninger opbevares i henhold til gældende regler for dokumentation og regnskab.",
      },
    ],
  },
  {
    id: "materiale",
    title: "7. Opbevaring af billeder og video",
    blocks: [
      {
        type: "paragraph",
        segments: [
          {
            text: "Efter en opgave kan jeg opbevare billeder, videoer og andet leveret materiale i op til ",
          },
          { text: "24 måneder efter levering", strong: true },
          { text: "." },
        ],
      },
      {
        type: "paragraph",
        text: "Formålet med opbevaringen er at kunne:",
      },
      {
        type: "list",
        items: [
          "hjælpe kunden med eventuelle efterfølgende ønsker eller ændringer",
          "levere materialet igen, hvis kunden mister sine filer",
          "håndtere eventuelle spørgsmål vedrørende den leverede opgave",
        ],
      },
      {
        type: "paragraph",
        text: "Efter opbevaringsperioden slettes materialet som udgangspunkt, medmindre der er en særlig grund til at opbevare det længere, eller andet er aftalt med kunden.",
      },
      {
        type: "paragraph",
        text: "Materialet opbevares på egne enheder og/eller eksterne lagringstjenester.",
      },
    ],
  },
  {
    id: "markedsfoering",
    title: "8. Brug af billeder og videoer til markedsføring",
    blocks: [
      {
        type: "paragraph",
        text: "Jeg offentliggør ikke automatisk billeder, videoer eller andet materiale fra kunders projekter.",
      },
      {
        type: "paragraph",
        text: "Eventuel brug af materiale på hjemmeside, sociale medier, portfolio eller anden markedsføring aftales individuelt med kunden.",
      },
      {
        type: "paragraph",
        text: "Rettigheder, brugstilladelser og eventuelle begrænsninger aftales separat for den enkelte opgave.",
      },
    ],
  },
  {
    id: "cookies",
    title: "9. Cookies og analyseværktøjer",
    blocks: [
      {
        type: "paragraph",
        text: "Min hjemmeside anvender cookies og analyseværktøjer til blandt andet at forstå brugen af hjemmesiden og forbedre brugeroplevelsen.",
      },
      {
        type: "paragraph",
        text: "Jeg anvender blandt andet:",
      },
      {
        type: "list",
        items: ["Google Analytics", "Cookiebot", "Meta Pixel (ved aktivering)"],
      },
      {
        type: "paragraph",
        text: "Disse værktøjer kan indsamle oplysninger om besøgendes brug af hjemmesiden afhængigt af deres cookievalg.",
      },
      {
        type: "paragraph",
        text: "Ikke-nødvendige cookies aktiveres kun efter brugerens samtykke via cookie-banneret.",
      },
    ],
  },
  {
    id: "deling",
    title: "10. Deling af personoplysninger",
    blocks: [
      {
        type: "paragraph",
        text: "Jeg sælger ikke dine personoplysninger.",
      },
      {
        type: "paragraph",
        text: "Dine oplysninger deles kun med tredjeparter, når det er nødvendigt for:",
      },
      {
        type: "list",
        items: [
          "at levere mine ydelser",
          "drive hjemmesiden og de nødvendige tekniske systemer",
          "håndtere betaling og dokumentation",
          "overholde lovgivning",
        ],
      },
    ],
  },
  {
    id: "sikkerhed",
    title: "11. Sikkerhed",
    blocks: [
      {
        type: "paragraph",
        text: "Jeg tager rimelige tekniske og organisatoriske forholdsregler for at beskytte personoplysninger mod:",
      },
      {
        type: "list",
        items: [
          "uautoriseret adgang",
          "tab",
          "misbrug",
          "utilsigtet offentliggørelse",
        ],
      },
      {
        type: "paragraph",
        text: "Dette inkluderer blandt andet beskyttelse af mine enheder, konti og lagringsløsninger.",
      },
    ],
  },
  {
    id: "rettigheder",
    title: "12. Dine rettigheder",
    blocks: [
      {
        type: "paragraph",
        text: "Efter databeskyttelsesreglerne har du blandt andet ret til at:",
      },
      {
        type: "list",
        items: [
          "få indsigt i de oplysninger, jeg behandler om dig",
          "få rettet forkerte oplysninger",
          "få slettet oplysninger, når reglerne tillader det",
          "gøre indsigelse mod visse former for behandling",
          "få begrænset behandlingen af dine oplysninger",
        ],
      },
      {
        type: "paragraph",
        text: "Hvis du ønsker at gøre brug af dine rettigheder, kan du kontakte mig:",
      },
      {
        type: "link",
        label: "kontakt@lukassvendsen.dk",
        href: "mailto:kontakt@lukassvendsen.dk",
      },
    ],
  },
  {
    id: "klage",
    title: "13. Klage",
    blocks: [
      {
        type: "paragraph",
        text: "Hvis du mener, at dine personoplysninger ikke behandles korrekt, kan du klage til:",
      },
      {
        type: "paragraph",
        segments: [{ text: "Datatilsynet", strong: true }],
      },
      {
        type: "link",
        label: "www.datatilsynet.dk",
        href: "https://www.datatilsynet.dk",
        external: true,
      },
    ],
  },
  {
    id: "aendringer",
    title: "14. Ændringer til privatlivspolitikken",
    blocks: [
      {
        type: "paragraph",
        text: "Jeg kan løbende opdatere denne privatlivspolitik, hvis mine tjenester eller behandlingen af personoplysninger ændrer sig.",
      },
      {
        type: "paragraph",
        text: "Den seneste version vil altid være tilgængelig på min hjemmeside.",
      },
    ],
  },
];
