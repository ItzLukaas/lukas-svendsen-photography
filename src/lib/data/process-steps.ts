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
    body: "Vi starter med en kort snak om opgaven, tidspunktet og hvad materialet skal bruges til. Så ved vi begge, hvad der skal ske, inden jeg går i gang.",
  },
  {
    id: "on-site",
    step: 2,
    title: "Jeg møder op",
    body: "På dagen møder jeg op med udstyret klar og styr på opgaven. Du skal ikke tænke på kameraer, lys eller teknik – det har jeg styr på.",
  },
  {
    id: "deliver",
    step: 3,
    title: "Du får materialet",
    body: "Efter opgaven udvælger og redigerer jeg materialet, så det er klar til brug. Du får færdige billeder og/eller videoer, tilpasset det, du skal bruge dem til.",
  },
];
