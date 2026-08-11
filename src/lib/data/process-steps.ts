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
    body: "Jeg vil gerne forstå, hvad du har i tankerne, før jeg tager kameraet frem. Vi snakker om idéen, hvad billederne eller videoen skal bruges til, og hvordan vi får det til at føles helt rigtigt.",
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
    body: "Til sidst får du det færdige materiale, klar til at blive brugt. På hjemmesiden, sociale medier, i markedsføring eller lige dér, hvor du har brug for det.",
  },
];
