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
    title: "Vi starter med en snak",
    body: "Vi tager en kort snak om opgaven, dine behov, tidspunkt og hvad materialet skal bruges til. På den måde har vi en klar plan, inden vi går i gang.",
  },
  {
    id: "on-site",
    step: 2,
    title: "Jeg tager mig af resten",
    body: "Når dagen kommer, møder jeg op med udstyret klar og har styr på det praktiske. Du behøver ikke tænke på kamera, lys eller teknik. Jeg sørger for, at det hele spiller, så du kan fokusere på det, du selv skal.",
  },
  {
    id: "deliver",
    step: 3,
    title: "Du modtager det færdige materiale",
    body: "Efter optagelsen gennemgår jeg materialet, udvælger de bedste billeder eller klip og står for redigeringen. Du modtager derefter det færdige materiale, klar til brug på hjemmeside, sociale medier, markedsføring eller andet.",
  },
];
