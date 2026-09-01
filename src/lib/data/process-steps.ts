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
    body: "Jeg møder op med udstyret klar og en plan for, hvad vi skal have med hjem. Du skal ikke tænke på teknikken.",
  },
  {
    id: "deliver",
    step: 3,
    title: "Du får filerne",
    body: "Du får redigerede filer til web, sociale medier eller intern brug.",
  },
];
