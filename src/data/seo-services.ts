export interface SeoService {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  paragraphs: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  lastModified: string;
}

export const seoServices: SeoService[] = [
  {
    slug: "eventfotograf",
    name: "Eventfotograf",
    title: "Eventfotograf",
    metaDescription:
      "Eventfotograf til konferencer, festivaler, lanceringer og private events. Professionelle billeder og video fra Lukas Svendsen.",
    h1: "Eventfotograf",
    intro:
      "Jeg dokumenterer events med fokus på stemning, mennesker og de øjeblikke, der fortæller historien om dagen.",
    paragraphs: [
      "Et godt eventbillede handler ikke kun om teknik — det handler om timing, overblik og evnen til at fange energien i rummet.",
      "Jeg arbejder diskret og effektivt og leverer materiale, der kan bruges til hjemmesider, sociale medier, presse og intern kommunikation.",
      "Jeg dækker events i Midt- og Syddanmark — fra Vejle og Kolding til Fredericia, Aarhus og Odense.",
    ],
    benefits: [
      "Dokumentation af stemning og nøgleøjeblikke",
      "Materiale klar til web og sociale medier",
      "Erfaring med skiftende lys og tempo",
      "Kan kombineres med video og drone",
    ],
    faqs: [
      {
        question: "Hvilke typer events fotograferer du?",
        answer:
          "Konferencer, festivaler, lanceringer, sportsevents, private arrangementer og andre begivenheder, hvor visuelt indhold er vigtigt.",
      },
      {
        question: "Kan du levere billeder hurtigt efter eventet?",
        answer:
          "Ja, hurtig levering kan aftales på forhånd afhængigt af projektets omfang.",
      },
    ],
    lastModified: "2026-07-01",
  },
  {
    slug: "sportsfotograf",
    name: "Sportsfotograf",
    title: "Sportsfotograf",
    metaDescription:
      "Sportsfotograf til kampe, turneringer og idrætsbegivenheder. Actionbilleder og video med fokus på intensitet og bevægelse.",
    h1: "Sportsfotograf",
    intro:
      "Jeg fotograferer sport med fokus på action, intensitet og de øjeblikke, der definerer en kamp eller en turnering.",
    paragraphs: [
      "Sportsfotografi kræver hurtige beslutninger, godt overblik og udstyr, der kan følge med tempoet. Det er en disciplin, jeg arbejder med løbende.",
      "Jeg leverer billeder og video, der kan bruges til klubber, forbund, sociale medier og presse — med fokus på både detaljer og helhed.",
      "Jeg tager opgaver i hele Midt- og Syddanmark, herunder Vejle, Kolding, Fredericia, Horsens og Esbjerg.",
    ],
    benefits: [
      "Action og bevægelse i fokus",
      "Erfaring med kamp- og turneringsforhold",
      "Materiale til klubber og sociale medier",
      "Kan kombineres med videoproduktion",
    ],
    faqs: [
      {
        question: "Fotograferer du både indendørs og udendørs sport?",
        answer:
          "Ja. Jeg tilpasser udstyr og tilgang efter sportsgren, arena og lysforhold.",
      },
      {
        question: "Kan du dække en hel turnering?",
        answer:
          "Ja. Turneringer og større sportsbegivenheder aftales med en plan for dækning og leverance.",
      },
    ],
    lastModified: "2026-07-01",
  },
  {
    slug: "koncertfotograf",
    name: "Koncertfotograf",
    title: "Koncertfotograf",
    metaDescription:
      "Koncertfotograf til livekoncerter, festivaler og kulturarrangementer. Stemning, lys og energi fanget professionelt.",
    h1: "Koncertfotograf",
    intro:
      "Jeg fotograferer koncerter og liveevents, hvor lys, publikum og energi skal fanges i ét stærkt visuelt udtryk.",
    paragraphs: [
      "Koncertfotografi er en balance mellem teknik og timing — især når lyset skifter hurtigt og scenen er i konstant bevægelse.",
      "Jeg leverer billeder og video, der kan bruges til promotion, sociale medier og presse — med respekt for artistens og arrangørens behov.",
      "Jeg har erfaring med koncertmiljøer i bl.a. Fredericia og dækker opgaver i hele regionen.",
    ],
    benefits: [
      "Erfaring med scenelys og mørke omgivelser",
      "Materiale til promotion og sociale medier",
      "Diskret arbejde under live performance",
      "Kan leveres sammen med kort video",
    ],
    faqs: [
      {
        question: "Arbejder du med photo pit og adgangsregler?",
        answer:
          "Ja. Jeg forholder mig til arrangørens regler og planlægger adgang og positionering på forhånd.",
      },
      {
        question: "Kan du levere billeder samme aften?",
        answer:
          "Hurtig levering kan aftales for koncerter og festivaler, afhængigt af omfanget.",
      },
    ],
    lastModified: "2026-07-01",
  },
  {
    slug: "bryllupsfotograf",
    name: "Bryllupsfotograf",
    title: "Bryllupsfotograf",
    metaDescription:
      "Bryllupsfotograf med fokus på ægte øjeblikke, stemning og detaljer. Personlig fotografering i Midt- og Syddanmark.",
    h1: "Bryllupsfotograf",
    intro:
      "Jeg fotograferer bryllup med fokus på de ægte øjeblikke, stemningen og de detaljer, I vil huske i årene frem.",
    paragraphs: [
      "Et bryllup handler om mennesker, følelser og timing. Mit mål er at dokumentere dagen naturligt — uden at det føles stift eller påtaget.",
      "Før brylluppet tager vi en uforpligtende snak om jeres ønsker, lokation og tidsplan, så produktionen passer til jeres dag.",
      "Jeg tager bryllupsopgaver i Midt- og Syddanmark, herunder Vejle, Kolding, Odense og omegn.",
    ],
    benefits: [
      "Naturligt og stemningsfuldt udtryk",
      "Planlægning i dialog med jer",
      "Fokus på øjeblikke og detaljer",
      "Materiale klar til deling og print",
    ],
    faqs: [
      {
        question: "Hvordan foregår en bryllupsforespørgsel?",
        answer:
          "I kontakter mig med dato, lokation og jeres ønsker. Derefter tager vi en snak og aftaler omfang og leverance.",
      },
      {
        question: "Laver du også video fra bryllup?",
        answer:
          "Ja. Videoproduktion kan kombineres med fotografering efter aftale.",
      },
    ],
    lastModified: "2026-07-01",
  },
  {
    slug: "erhvervsfotograf",
    name: "Erhvervsfotograf",
    title: "Erhvervsfotograf",
    metaDescription:
      "Erhvervsfotograf til virksomheder, portrætter, lokationer og branding. Professionelt foto til web, sociale medier og tryk.",
    h1: "Erhvervsfotograf",
    intro:
      "Jeg leverer erhvervsfotografi til virksomheder og organisationer — portrætter, lokationer, events og visuelt indhold til branding.",
    paragraphs: [
      "Erhvervsfoto skal se professionelt ud og passe til jeres brand. Jeg arbejder med lys, komposition og retning, så materialet kan bruges på tværs af kanaler.",
      "Jeg fotograferer både på location og i miljøer, hvor medarbejdere og produkter skal fremstå autentisk og troværdigt.",
      "Jeg dækker erhvervsopgaver i bl.a. Billund, Esbjerg, Vejle og resten af Midt- og Syddanmark.",
    ],
    benefits: [
      "Portrætter og teamfotos",
      "Lokationer og produktionsmiljøer",
      "Materiale til web og sociale medier",
      "Konsistent visuelt udtryk",
    ],
    faqs: [
      {
        question: "Kan du fotografere medarbejdere og ledelse?",
        answer:
          "Ja. Portrætter og teamfotos er en fast del af erhvervsfotografi, og jeg guider gerne med posering og udtryk.",
      },
      {
        question: "Leverer du billeder i web- og printkvalitet?",
        answer:
          "Ja. Leverance aftales efter jeres behov og kanaler.",
      },
    ],
    lastModified: "2026-07-01",
  },
  {
    slug: "videograf",
    name: "Videograf",
    title: "Videograf",
    metaDescription:
      "Videograf til events, erhverv, sport og sociale medier. Videoproduktion og visuel storytelling fra Lukas Svendsen.",
    h1: "Videograf",
    intro:
      "Jeg producerer video til events, erhverv, sport og sociale medier — med fokus på historiefortælling og stærkt visuelt udtryk.",
    paragraphs: [
      "Video er et stærkt værktøj til at vise stemning, mennesker og handling. Jeg planlægger optagelser efter budskab, format og kanal.",
      "Jeg leverer alt fra korte klip til sociale medier til længere produktioner til hjemmesider og præsentationer.",
      "Videoproduktion kan kombineres med fotografering og droneoptagelser for et samlet visuelt materiale.",
    ],
    benefits: [
      "Video til web og sociale medier",
      "Planlægning efter budskab og format",
      "Kan kombineres med foto og drone",
      "Erfaring med events og erhverv",
    ],
    faqs: [
      {
        question: "Hvilke videoformater leverer du?",
        answer:
          "Format og længde aftales efter projekt — fx sociale medier, hjemmeside eller præsentation.",
      },
      {
        question: "Laver du både optagelse og redigering?",
        answer:
          "Ja. Produktionen omfatter typisk optagelse og redigering efter aftalt omfang.",
      },
    ],
    lastModified: "2026-07-01",
  },
  {
    slug: "dronefoto",
    name: "Dronefoto og dronevideo",
    title: "Dronefoto og dronevideo",
    metaDescription:
      "Dronefoto og dronevideo til events, erhverv, sport og projekter. Luftbilleder og video med professionelt udtryk.",
    h1: "Dronefoto og dronevideo",
    intro:
      "Jeg leverer dronefoto og dronevideo, der giver nye perspektiver til events, erhverv, sport og visuelle projekter.",
    paragraphs: [
      "Droneoptagelser kan løfte et projekt med unikke vinkler og overblik — men kræver planlægning, sikkerhed og respekt for regler og omgivelser.",
      "Jeg aftaler altid produktionen med fokus på lovlige flyveområder og projektets behov.",
      "Drone kan kombineres med fotografering og videoproduktion på jorden for et komplet visuelt materiale.",
    ],
    benefits: [
      "Luftperspektiver til events og erhverv",
      "Planlægning med fokus på sikkerhed",
      "Kan kombineres med foto og video",
      "Materiale til web og sociale medier",
    ],
    faqs: [
      {
        question: "Må du flyve drone overalt?",
        answer:
          "Nej. Droneproduktion planlægges altid med fokus på lovgivning, sikkerhed og eventuelle restriktioner i området.",
      },
      {
        question: "Kan drone kombineres med eventfoto?",
        answer:
          "Ja. Det er en stærk kombination til større events og projekter, hvor både overblik og detaljer er vigtige.",
      },
    ],
    lastModified: "2026-07-01",
  },
  {
    slug: "portraetfotograf",
    name: "Portrætfotograf",
    title: "Portrætfotograf",
    metaDescription:
      "Portrætfotograf til personlige og erhvervsmæssige portrætter. Naturlige billeder med fokus på udtryk og stemning.",
    h1: "Portrætfotograf",
    intro:
      "Jeg fotograferer portrætter til private og erhverv — med fokus på udtryk, lys og et naturligt resultat.",
    paragraphs: [
      "Et godt portræt handler om tillid, lys og timing. Jeg arbejder med en rolig tilgang, så billedet føles autentisk.",
      "Portrætfotografi kan bruges til hjemmesider, sociale medier, CV, branding og personlige projekter.",
      "Jeg tager portrætopgaver i Midt- og Syddanmark — på location eller i miljøer, der passer til dit udtryk.",
    ],
    benefits: [
      "Personlige og erhvervsmæssige portrætter",
      "Naturligt og autentisk udtryk",
      "Til web, sociale medier og print",
      "Guidning i posering og stemning",
    ],
    faqs: [
      {
        question: "Laver du både studie- og location-portrætter?",
        answer:
          "Ja. Vi vælger location efter det udtryk, du ønsker — indendørs eller udendørs.",
      },
      {
        question: "Kan portrætter bruges til erhvervsprofil?",
        answer:
          "Ja. Mange portrætter bruges til LinkedIn, hjemmesider og virksomhedsmateriale.",
      },
    ],
    lastModified: "2026-07-01",
  },
];

export function getSeoServiceBySlug(slug: string) {
  return seoServices.find((service) => service.slug === slug);
}
