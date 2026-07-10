export interface SeoService {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  paragraphs: string[];
  sections?: {
    label?: string;
    heading: string;
    paragraphs: string[];
  }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  lastModified: string;
}

export const seoServices: SeoService[] = [
  {
    slug: "fotografering",
    name: "Fotografering",
    title: "Fotografering",
    metaDescription:
      "Fotografering til portrætter, events, sport, koncerter og virksomheder. Lukas Svendsen — fotograf i Grindsted og Billund.",
    h1: "Fotografering",
    intro:
      "Den ydelse, som jeg er mest kendt for, er fotografering. Det er her, hele min karriere begyndte.",
    paragraphs: [
      "Min interesse for fotografering opstod gennem en fascination af at kunne fange øjeblikke, mennesker og historier gennem et kamera. Det hele startede med, at jeg købte mit første kamera, og hurtigt blev det tydeligt for mig, at fotografering var meget mere end blot at tage billeder. Det handlede om at skabe minder, formidle følelser og bevare de øjeblikke, som ellers kun eksisterer i et kort sekund.",
      "Jeg brugte utallige timer på at lære kameraets muligheder at kende, eksperimentere med lys, komposition og forskellige fotografiske udtryk. Med tiden udviklede min nysgerrighed sig til en passion, og passionen blev til en karriere. Jeg opdagede, hvor stor en forskel et godt billede kan gøre – både for en person, der ønsker at forevige en særlig begivenhed, og for en virksomhed, der ønsker at fortælle sin historie visuelt.",
      "Gennem årene har jeg opbygget erfaring med mange forskellige former for fotografering og arbejdet med en bred vifte af opgaver og kunder. Jeg har fotograferet alt fra portrætter, familier og personlige øjeblikke til virksomheder, events, koncerter, sport og kreative projekter. Hver opgave har været unik og har givet mig mulighed for at udvikle min evne til hurtigt at forstå situationen, finde de rigtige øjeblikke og skabe billeder, der passer til formålet.",
      "I dag arbejder jeg professionelt med fotografering og hjælper både private, virksomheder og organisationer med at skabe billeder, der fortæller en historie. Det kan være alt fra naturlige og personlige portrætter, hvor fokus er på mennesket bag billedet, til professionelle billeder for virksomheder, der ønsker at styrke deres visuelle identitet og fremstå mere autentiske. Det kan også være dokumentation af events, koncerter, sportsbegivenheder eller andre situationer, hvor stemningen, energien og de små detaljer skal bevares.",
      "Min tilgang til fotografering handler om mere end bare teknik. Selvfølgelig er lys, kameraindstillinger og komposition vigtige elementer, men de bedste billeder opstår efter min mening, når man forstår situationen og menneskene foran kameraet. Jeg går op i at skabe en tryg atmosfære, hvor mennesker kan være sig selv, og hvor billederne føles naturlige, ægte og personlige.",
      "Uanset om opgaven handler om et vigtigt øjeblik i privatlivet, en virksomheds kommunikation, et kreativt projekt eller noget helt andet, tilpasser jeg altid min tilgang efter kundens ønsker og behov. Mit mål er at levere billeder, der ikke bare ser professionelle ud, men som også har en betydning og kan bruges langt ud i fremtiden.",
      "Fra det første kamera, jeg købte, til hvor jeg er i dag, har fotografering været en konstant udvikling og en rejse fyldt med nye mennesker, oplevelser og historier. Det er netop det, der fortsat driver mig – muligheden for at skabe billeder, der fanger øjeblikke, fortæller historier og bliver husket.",
    ],
    sections: [
      {
        label: "Det praktiske",
        heading: "Kvalitet i hver eneste detalje",
        paragraphs: [
          "Du behøver ikke bekymre dig om kvaliteten af dine billeder. Mange billeder mister kvalitet på sociale medier og hjemmesider på grund af automatisk komprimering, men mine billeder bliver skabt med professionelt Sony-udstyr og behandlet med stor omhu.",
          "Jeg fotograferer med Sony A7 IV samt professionelle GM-objektiver – Sony 24-70mm f/2.8 GM og Sony 70-200mm f/2.8 GM – en kombination, der sikrer skarphed, detaljer og fleksibilitet til både foto og video.",
          "Alle billeder bliver professionelt redigeret i Adobe Lightroom, hvilket altid er inkluderet i prisen. Jeg leverer kun færdigbehandlede billeder, medmindre andet aftales.",
          "Mit udstyr vedligeholdes løbende og opdateres efter behov, så jeg altid kan levere den kvalitet og pålidelighed, mine kunder forventer. Mit fokus er enkelt: At skabe professionelle billeder, der holder – både visuelt og teknisk.",
        ],
      },
    ],
    benefits: [
      "Portrætter, familier og personlige øjeblikke",
      "Events, koncerter, sport og virksomheder",
      "Naturlige, ægte og personlige billeder",
      "Materiale til web, sociale medier og print",
    ],
    faqs: [
      {
        question: "Hvilke typer fotografering tilbyder du?",
        answer:
          "Portrætter, events, koncerter, sport, virksomheder, kreative projekter og andre opgaver, hvor det handler om at fange det rigtige øjeblik.",
      },
      {
        question: "Kan fotografering kombineres med videoproduktion eller droneflyvning?",
        answer:
          "Ja. Mange projekter dækkes bedst med fotografering, videoproduktion og droneflyvning fra samme produktion — det kan vi planlægge sammen.",
      },
    ],
    lastModified: "2026-07-09",
  },
  {
    slug: "videoproduktion",
    name: "Videoproduktion",
    title: "Videoproduktion",
    metaDescription:
      "Videoproduktion til virksomheder, events og private. Reklamefilm, virksomhedsfilm og indhold til sociale medier fra Lukas Svendsen.",
    h1: "Videoproduktion",
    intro:
      "Jeg tilbyder videoproduktion til sociale medier, reklame, events og virksomheder — planlægning, optagelse og redigering.",
    paragraphs: [],
    sections: [
      {
        heading: "Min rejse med videoproduktion",
        paragraphs: [
          "Efter at have udviklet mig inden for fotografering begyndte min interesse for videoproduktion naturligt at vokse. Gennem arbejdet med billeder opdagede jeg, hvor stærkt et visuelt udtryk kan være – men også hvor meget mere en video kan fortælle gennem bevægelse, lyd, stemning og en hel fortælling.",
          "Det næste skridt blev derfor at udvide mine kompetencer fra stillbilleder til levende billeder. Da jeg investerede i et professionelt Sony 7 IV-kamera og en af de nyeste DJI-droner, åbnede der sig helt nye muligheder for at producere video i høj kvalitet. Kombinationen af et fleksibelt kamerasystem og luftoptagelser gjorde det muligt at skabe mere dynamiske og kreative produktioner, hvor både detaljer, omgivelser og den store helhed kunne komme til udtryk.",
          "Efterfølgende har jeg løbende udvidet mit udstyr med professionelt lydudstyr, mikrofoner, lys og andet produktionsudstyr for at kunne levere en komplet videoløsning. For mig handler en god video nemlig ikke kun om flotte billeder – lyden, lyssætningen, stemningen og den samlede fortælling er mindst lige så vigtige elementer for at skabe et professionelt resultat.",
          "I dag arbejder jeg med videoproduktion til både virksomheder, organisationer, events og private, hvor målet altid er at skabe indhold, der fanger opmærksomheden og kommunikerer et klart budskab. En stærk video kan være med til at vise, hvem man er, hvad man tilbyder, og hvorfor kunder eller samarbejdspartnere skal vælge netop dig.",
        ],
      },
      {
        heading: "Video, der fortæller din historie",
        paragraphs: [
          "Jeg hjælper med at producere forskellige typer videoindhold afhængigt af behov og formål. Det kan være alt fra korte videoer til sociale medier og kampagner til større produktioner som reklamefilm, virksomhedsfilm og præsentationsvideoer.",
          "For virksomheder kan professionel video være et stærkt værktøj i markedsføringen. En god virksomhedsfilm kan give kunderne et indblik i virksomheden, medarbejderne, produkterne eller de værdier, der gør virksomheden unik. Video skaber en stærkere forbindelse til målgruppen og gør det lettere at formidle et budskab på en engagerende måde.",
          "Jeg hjælper blandt andet med produktion af reklamefilm, brandingvideoer, produktvideoer, videoer til hjemmesider, sociale medier, kampagner og markedsføring. Her handler det ikke kun om at filme – men om at forstå virksomhedens målgruppe og skabe indhold, der passer til den ønskede kommunikation.",
          "Jeg producerer også videoer til events, konferencer, koncerter, sport og andre oplevelser, hvor stemningen og de vigtigste øjeblikke skal fastholdes. Her er fokus på at fange energien, detaljerne og atmosfæren, så oplevelsen kan genopleves eller bruges som markedsføring efterfølgende.",
          "Derudover tilbyder jeg kreative videoløsninger, hvor droneoptagelser, filmiske sekvenser og visuelt storytelling kan være med til at give produktionen et ekstra professionelt udtryk. Uanset om det handler om en virksomhed, et projekt, en begivenhed eller en personlig historie, tilpasses produktionen altid efter formålet.",
        ],
      },
      {
        heading: "Sådan foregår det",
        paragraphs: [
          "En god videoproduktion starter med en god idé. Derfor arbejder jeg tæt sammen med kunden for at forstå ønskerne, budskabet og den følelse, videoen skal efterlade. Fra planlægning og optagelse til redigering og det færdige resultat sørger jeg for at skabe en sammenhængende produktion, der fungerer både visuelt og kommunikativt.",
          "Min erfaring med både fotografering og video giver mig en bred forståelse for visuel formidling. Jeg ved, hvordan man finder de rigtige vinkler, fanger de afgørende øjeblikke og skaber indhold, der ikke bare ser godt ud, men som også har et formål.",
          "I en tid hvor visuelt indhold fylder mere end nogensinde, er professionel video blevet et af de stærkeste værktøjer til at skabe opmærksomhed, bygge et brand og fortælle historier. Mit mål er at hjælpe kunder med netop det – at omsætte idéer og budskaber til levende billeder, der gør en forskel.",
        ],
      },
      {
        label: "Det praktiske",
        heading: "Professionel video i høj kvalitet",
        paragraphs: [
          "En professionel video handler ikke kun om selve optagelsen. Kvaliteten skabes gennem en kombination af det rigtige udstyr, godt lys, klar lyd og en professionel efterbehandling.",
          "Jeg optager med professionelt Sony-udstyr bestående af Sony A7 IV samt professionelle GM-objektiver – Sony 24-70mm f/2.8 GM og Sony 70-200mm f/2.8 GM. Denne kombination sikrer høj billedkvalitet, skarphed, detaljer og fleksibilitet til alt fra virksomhedsvideoer og events til sport, action og kreative produktioner.",
          "Lyd spiller en afgørende rolle i enhver professionel video. Derfor anvender jeg professionelt lydudstyr som RØDE VideoMic Pro+, der sikrer klarere og mere detaljeret lyd under optagelserne.",
          "Lys er ligeledes en vigtig del af det visuelle udtryk. Jeg anvender professionelt lysudstyr, som gør det muligt at skabe den rette stemning og sikre korrekt belysning – både med kraftigt hvidt lys til naturlige og professionelle optagelser samt kraftig RGB-belysning i alle farver til mere kreative produktioner.",
        ],
      },
      {
        heading: "Professionel redigering og færdigt resultat",
        paragraphs: [
          "En stor del af kvaliteten skabes efter optagelsen. Derfor bliver alt videomateriale behandlet professionelt i avancerede redigeringsprogrammer, hvor jeg arbejder med klipning, farver, lys, lyd og det samlede visuelle udtryk.",
          "Jeg leverer færdigbehandlede videoer, der er tilpasset formålet – uanset om det er til hjemmeside, sociale medier, virksomheder, events eller andre platforme.",
        ],
      },
      {
        heading: "Kreative muligheder med DJI Osmo 360",
        paragraphs: [
          "Som supplement til mit professionelle kameraudstyr anvender jeg også DJI Osmo 360, som giver mulighed for ekstra kreative optagelser med ultra-wide og 360-graders perspektiver.",
          "Kameraet er særligt velegnet til alternative vinkler, sport, action og situationer, hvor man ønsker et mere dynamisk udtryk. Ved særlige ønsker kan det anvendes med relevant monteringsudstyr til eksempelvis køretøjer eller andre kreative opsætninger, hvor sikkerhed og kvalitet altid prioriteres.",
          "Mit fokus er enkelt: At skabe professionelle videoer, hvor kamera, lyd, lys og redigering arbejder sammen for at fortælle den rigtige historie. Hver produktion tilpasses kundens behov, så resultatet både ser professionelt ud og fungerer på de platforme, hvor det skal bruges.",
        ],
      },
    ],
    benefits: [],
    faqs: [],
    lastModified: "2026-07-09",
  },
  {
    slug: "drone",
    name: "Drone",
    title: "Droneproduktion",
    metaDescription:
      "Professionelle droneoptagelser til virksomheder, events, ejendomme og kreative projekter. Luftfoto og dronevideo fra Lukas Svendsen.",
    h1: "Droneproduktion",
    intro:
      "Jeg tilbyder dronefoto og dronevideo — perspektiv fra luften til virksomheder, events og projekter.",
    paragraphs: [],
    sections: [
      {
        heading: "Min rejse med dronefotografering og luftoptagelser",
        paragraphs: [
          "Efter at have arbejdet med fotografering og videoproduktion begyndte min interesse for droneflyvning helt naturligt at vokse. Gennem kameraet havde jeg allerede lært værdien af stærke visuelle fortællinger, men jeg oplevede hurtigt, at luftperspektivet kunne tilføre noget helt særligt. Muligheden for at vise omgivelser, bygninger, mennesker og situationer fra en helt ny vinkel åbnede op for endnu flere kreative muligheder.",
          "Det første store skridt inden for droneproduktion kom, da jeg investerede i en professionel DJI-drone. Det gjorde det muligt at kombinere min erfaring med fotografering og videoproduktion med unikke optagelser fra luften. Pludselig kunne jeg skabe mere dynamiske og filmiske produktioner, hvor både de små detaljer og den store sammenhæng kunne fortælles gennem billeder.",
          "Med tiden har jeg udvidet mine kompetencer og mit udstyr for at kunne levere professionelle luftoptagelser til forskellige typer opgaver. Jeg flyver med en certificeret drone, der er godkendt til professionelle formål og giver større fleksibilitet i forhold til opgaver og lokationer – herunder også områder tættere på by, bygninger og andre miljøer, hvor der stilles større krav til udstyr, planlægning og sikkerhed. Alle flyvninger udføres naturligvis med fokus på ansvarlighed og i overensstemmelse med de gældende regler.",
          "For mig handler dronefotografering ikke kun om at få en drone i luften og optage flotte billeder. Det handler om at skabe et visuelt udtryk, der har et formål. Den rigtige luftoptagelse kan være med til at fortælle en historie, fremhæve en lokation, skabe stemning eller give modtageren en oplevelse, som traditionelle billeder ikke kan.",
        ],
      },
      {
        heading: "Droneoptagelser til virksomheder, events og kreative projekter",
        paragraphs: [
          "I dag hjælper jeg både virksomheder, organisationer og private med professionelle droneoptagelser, som kan bruges i mange forskellige sammenhænge. Dronevideo og luftfotografering er blevet et stærkt værktøj inden for markedsføring, branding og visuel kommunikation, fordi det giver mulighed for at præsentere produkter, steder og oplevelser på en mere imponerende og engagerende måde.",
          "For virksomheder kan professionelle luftoptagelser være med til at styrke deres visuelle identitet og skabe indhold til blandt andet hjemmesider, sociale medier, reklamefilm og kampagner. Det kan være præsentation af virksomhedens lokaler, arbejdsområder, produkter, faciliteter eller projekter – alt sammen med et mere professionelt og eksklusivt udtryk.",
          "Inden for ejendomme og byggeri kan droneoptagelser give et unikt overblik over bygninger, grunde og udviklingsprojekter. Luftbilleder kan bruges til salgsmateriale, dokumentation, præsentationer eller markedsføring, hvor det er vigtigt at vise helheden og skabe et stærkt førstehåndsindtryk.",
          "Droneoptagelser er også ideelle til events, sport, koncerter og andre større arrangementer, hvor stemningen, størrelsen og energien skal fanges. Kombinationen af optagelser fra jorden og luften giver mulighed for at skabe en komplet fortælling, der viser både detaljerne og den store oplevelse.",
          "Derudover indgår drone ofte som en del af større foto- og videoproduktioner, hvor luftoptagelser kan give en reklamefilm, virksomhedsfilm eller kreativ produktion et ekstra professionelt og filmisk udtryk.",
        ],
      },
      {
        heading: "Planlægning til levering",
        paragraphs: [
          "En god droneproduktion starter med at forstå formålet med optagelserne. Derfor arbejder jeg altid ud fra kundens behov og ønsker, så resultatet ikke kun bliver flotte billeder fra luften, men materiale der faktisk kan bruges og skabe værdi.",
          "Med erfaring inden for både fotografering, videoproduktion og droneflyvning kan jeg hjælpe med hele processen – fra idé og planlægning til optagelse og det færdige materiale. Kombinationen af jordbaserede billeder, professionel videoproduktion og luftoptagelser giver mulighed for at skabe en stærkere visuel historie.",
          "Mit mål er at levere droneoptagelser, der ikke bare imponerer ved første øjekast, men som hjælper med at formidle en oplevelse, et budskab eller en historie på en professionel og effektiv måde.",
        ],
      },
      {
        label: "Det praktiske",
        heading: "Præcise og sikre droneoptagelser",
        paragraphs: [
          "Professionelle droneoptagelser kræver mere end blot en god drone. Det handler om præcision, stabilitet og tillid til udstyret – især når der skal flyves tæt på bygninger, i mindre områder eller indendørs, hvor nøjagtighed og kontrol er afgørende.",
          "Jeg anvender DJI Mini 3 Fly More Combo, som giver mulighed for stabile luftoptagelser i høj kvalitet og fleksibilitet til mange forskellige typer opgaver.",
          "For mig er vedligeholdelse af udstyret en vigtig del af en professionel droneproduktion. En drone skal kunne flyve stabilt og præcist, og derfor sørger jeg løbende for at få udstyret kontrolleret, serviceret og udskiftet efter behov.",
          "Selv små skader på eksempelvis propeller eller dronearme kan påvirke stabiliteten og præcisionen under flyvning. Derfor prioriterer jeg altid, at mit udstyr er i optimal stand, så jeg kan levere den kvalitet og sikkerhed, mine kunder forventer.",
        ],
      },
      {
        heading: "Nyt og opdateret udstyr",
        paragraphs: [
          "Pr. 20. juli 2026 har jeg fået en helt ny DJI Mini 3 direkte fra DJI-fabrikken med nyt serienummer og ny registrering.",
          "Det betyder, at jeg fortsat kan arbejde med opdateret og pålideligt udstyr, hvor kvalitet, stabilitet og sikkerhed er i fokus.",
          "Det er vigtigt for mig, at mine kunder kan stole på, at arbejdet bliver udført med udstyr, der bliver passet på og løbende holdt på et højt niveau.",
          "Mit fokus er enkelt: At skabe professionelle droneoptagelser med skarpe billeder, stabile bevægelser og en sikker tilgang til hver eneste opgave.",
        ],
      },
    ],
    benefits: [],
    faqs: [],
    lastModified: "2026-07-09",
  },
];

export function getSeoServiceBySlug(slug: string) {
  return seoServices.find((service) => service.slug === slug);
}
