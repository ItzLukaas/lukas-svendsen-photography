export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  body: string;
};

/** How a job runs — short and concrete. */
export const processSteps: ProcessStep[] = [
  {
    id: "talk",
    step: 1,
    title: "Kort snak",
    body: "Vi tager en kort snak om, hvad du skal bruge, hvornår det skal ske, og hvad materialet skal bruges til. Så er vi enige om udgangspunktet, før vi går i gang.",
  },
  {
    id: "on-site",
    step: 2,
    title: "Jeg møder op",
    body: "Jeg møder op på lokationen og arbejder fokuseret igennem opgaven. Du skal ikke bekymre dig om teknikken. Den del tager jeg mig af.",
  },
  {
    id: "deliver",
    step: 3,
    title: "Du får filerne",
    body: "Du får redigerede filer, klar til web, sociale medier eller intern brug. Klar til at poste og dele.",
  },
];
