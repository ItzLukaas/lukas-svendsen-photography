export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  body: string;
};

/**
 * How a job runs — four clear steps from first talk to delivery.
 */
export const processSteps: ProcessStep[] = [
  {
    id: "talk",
    step: 1,
    title: "Vi starter med en snak",
    body: "Jeg vil gerne forstå, hvad du har i tankerne, før jeg tager kameraet frem. Vi snakker om idéen, om det er ét job eller en større contentløsning, og hvordan resultatet skal bruges.",
  },
  {
    id: "on-site",
    step: 2,
    title: "Jeg kommer til dig",
    body: "Jeg tager kameraet med og møder op hos dig. Uanset om det er på arbejdspladsen, til et event, på en koncertbane eller et helt andet sted, sørger jeg for at få de rigtige øjeblikke med.",
  },
  {
    id: "edit",
    step: 3,
    title: "Jeg klarer resten",
    body: "Når optagelserne er i kassen, går jeg i gang med redigeringen. Jeg udvælger de bedste billeder og klip, arbejder med farver, lyd og detaljer og giver materialet det sidste finish.",
  },
  {
    id: "deliver",
    step: 4,
    title: "Du får noget, du kan bruge",
    body: "Til sidst får du det færdige materiale — klar til hjemmeside, sociale medier, kampagne eller lige dér, hvor du har brug for det.",
  },
];
