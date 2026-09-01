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
    body: "Du fortæller, hvad du skal bruge. Dato, sted og hvad materialet skal bruges til.",
  },
  {
    id: "on-site",
    step: 2,
    title: "Jeg møder op",
    body: "På lokationen. Der, hvor det skal ske. Jeg fanger det, der skal med.",
  },
  {
    id: "deliver",
    step: 3,
    title: "Du får filerne",
    body: "Udvalgte og redigerede billeder eller video. Klar til det, du skal bruge dem til.",
  },
];
