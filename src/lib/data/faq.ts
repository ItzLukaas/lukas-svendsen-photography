export type FaqItem = {
  id: string;
  question: string;
  /** One or more paragraphs (separate with blank lines). */
  answer: string;
};

/**
 * FAQ — booking-focused answers for homepage and offerings page.
 */
export const faqItems: FaqItem[] = [
  {
    id: "what",
    question: "Hvad kan jeg booke dig til?",
    answer: `Jeg arbejder med foto, video, drone og content for virksomheder, organisationer, foreninger, events og private. Det kan være alt fra billeder til hjemmeside og sociale medier til større produktioner som kampagnefilm, virksomhedsvideoer, sportsfotografi, koncert- og eventdækning.

Jeg tilpasser produktionen efter opgaven, så du ikke behøver købe en bestemt pakke, bare fordi det står på en prisliste. Har du brug for billeder, video eller en kombination af flere ting, finder vi den løsning, der giver bedst mening for dig og det, materialet skal bruges til.`,
  },
  {
    id: "pricing",
    question: "Hvad koster en foto- eller videoopgave?",
    answer: `Der findes ikke én fast pris, der passer til alle produktioner. Prisen afhænger blandt andet af, hvor lang tid opgaven tager, hvor meget materiale der skal produceres, hvor den foregår, og hvad materialet skal bruges til bagefter.

Når du sender en forespørgsel, tager vi udgangspunkt i dine behov og finder et omfang, der passer til opgaven. Du får selvfølgelig et klart tilbud, inden vi går i gang, så du ved, hvad produktionen kommer til at koste.`,
  },
  {
    id: "areas",
    question: "Arbejder du kun i Grindsted?",
    answer: `Nej. Jeg tager opgaver i hele Danmark og arbejder blandt andet ofte i Grindsted, Billund, Vejle og Esbjerg. Hvor opgaven foregår, er derfor ikke det vigtigste.

Det kan være en lokal virksomhed, der skal have nye billeder, en sportsklub, der spiller kamp et andet sted i landet, eller en event, hvor du har brug for fotograf og videograf på selve dagen. Hvis opgaven giver mening, finder vi ud af det praktiske omkring location og transport.`,
  },
  {
    id: "brief",
    question: "Skal jeg vide præcis, hvad jeg skal bruge, inden jeg kontakter dig?",
    answer: `Nej, faktisk ikke. Du behøver ikke have en færdig idé, et manuskript eller en komplet plan, før du skriver.

Fortæl mig i stedet, hvad du gerne vil opnå, hvem materialet skal ramme, og hvor det skal bruges. Så kan vi sammen finde ud af, om det giver bedst mening med billeder, video, drone, content eller en kombination. Jeg hjælper gerne med idé, planlægning og format, så produktionen ikke bare ser godt ud, men også fungerer til det, den skal bruges til.`,
  },
  {
    id: "delivery",
    question: "Hvor hurtigt får jeg mine billeder eller videoer?",
    answer: `Leveringstiden afhænger af opgavens størrelse og typen af materiale. En mindre fotosession kan naturligvis leveres hurtigere end en større produktion med mange billeder, video og flere forskellige formater.

Jeg aftaler altid en forventet levering med dig på forhånd, så du ved, hvornår materialet kommer. Hvis du har en bestemt deadline, eksempelvis en kampagne, lancering eller et arrangement, så sig det allerede ved forespørgslen. Så tager vi højde for det i planlægningen.`,
  },
  {
    id: "booking",
    question: "Hvordan foregår en booking?",
    answer: `Det starter helt enkelt med, at du sender en forespørgsel. Fortæl gerne lidt om opgaven, hvad du har brug for, hvor den skal foregå, og hvornår du tænker, den skal finde sted. Du behøver ikke have alle detaljer på plads.

Herefter tager vi en snak om idéen, omfanget og hvad der skal leveres. Når vi er enige om rammerne, planlægger vi produktionen, og så står jeg for resten. Målet er, at det skal være nemt at få produceret godt materiale uden, at du selv skal holde styr på alle de tekniske detaljer.`,
  },
];
