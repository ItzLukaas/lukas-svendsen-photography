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
    body: "Vi starter med en kort snak om, hvad du har brug for, hvornår det skal ske, og hvad billederne eller videoen skal bruges til. Så er vi på samme side fra start.",
  },
  {
    id: "on-site",
    step: 2,
    title: "Jeg møder op",
    body: "Når dagen kommer, møder jeg op med udstyret klar og har styr på det praktiske. Du behøver ikke tænke på kamera, lys eller teknik – det sørger jeg for.",
  },
  {
    id: "deliver",
    step: 3,
    title: "Du får materialet",
    body: "Efter opgaven går jeg materialet igennem, udvælger de bedste billeder og sørger for redigeringen. Derefter får du det færdige materiale, klar til at bruge.",
  },
];
