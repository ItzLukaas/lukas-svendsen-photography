export interface ReferenceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ReferenceArticleSection {
  title: string;
  paragraphs: string[];
}

export type ReferenceArticleBlock =
  | { type: "section"; sectionIndex: number }
  | { type: "cover" }
  | { type: "gallery" };

export interface Reference {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  year: string;
  location: string;
  cardDescription: string;
  metaDescription: string;
  coverImage: ReferenceImage;
  intro: string;
  articleSections: ReferenceArticleSection[];
  articleFlow: ReferenceArticleBlock[];
  gallery: ReferenceImage[];
}

export const referencesPageMeta = {
  title: "Referencer — fotografprojekter",
  description:
    "Referencer fra event-, sport- og erhvervsfotografi — se udvalgte projekter fra fotograf Lukas Svendsen.",
  heroTitle: "Udvalgte projekter",
  heroDescription:
    "Et udsnit af samarbejder, du kan gå i dybden med. Klik på et projekt for at læse om opgaven, samarbejdet og resultatet.",
};

export const references: Reference[] = [
  {
    slug: "fredericia-handboldklub",
    title: "Fredericia Håndboldklub",
    subtitle: "Sportsfotografi og visuelt indhold",
    tags: ["Sportsfotografi", "Content"],
    year: "2024–2026",
    location: "Fredericia",
    cardDescription:
      "Fast fotograf under slutspillet med mere end 15 kampe dækket og stærkt visuelt indhold til klubbens platforme.",
    metaDescription:
      "Reference: Fredericia Håndboldklub — fast fotograf, kampdækning, holdfotos og visuelt indhold til en af Danmarks førende håndboldklubber.",
    coverImage: {
      src: "/images/references/fredericia-handboldklub/dsc07398.webp",
      alt: "Fredericia Håndboldklub kampaktion med spillere i klubtrøjer",
      width: 1800,
      height: 1200,
    },
    intro:
      "Et samarbejde med fokus på at skabe stærke visuelle fortællinger omkring klubben, spillerne og stemningen omkring sporten.",
    articleSections: [
      {
        title: "Projektet",
        paragraphs: [
          "Et af de samarbejder, jeg er allermest stolt af, er mit partnerskab med Fredericia Håndboldklub – en af Danmarks førende håndboldklubber. Det, der startede som et enkeltstående samarbejde, udviklede sig hurtigt til et stærkt og kontinuerligt partnerskab, hvor tillid, kvalitet og fælles ambitioner har været fundamentet.",
          "Gennem den seneste sæson har jeg dækket mere end 15 kampe for klubben og haft rollen som fast fotograf under slutspillet – både på hjemmebane og udebane. Det har været en enormt givende oplevelse, hvor jeg ikke blot har leveret billeder, men været en del af klubbens rejse og visuelle fortælling gennem en afgørende periode af sæsonen.",
        ],
      },
      {
        title: "Bag billederne",
        paragraphs: [
          "Samarbejdet med Fredericia Håndboldklub har været en stor personlig og professionel udvikling for mig. Klubben repræsenterer et højt sportsligt niveau med ambitioner både nationalt og internationalt, og det har givet mig en unik mulighed for at udvikle mine kompetencer inden for sportsfotografi. At arbejde tæt på en professionel organisation med høje krav til kvalitet, tempo og levering har givet mig værdifuld erfaring og en dybere forståelse for den professionelle sportsbranche.",
          "Som fast fotograf har jeg samtidig været med til at skabe visuelt indhold, der har opnået stor synlighed. Mine billeder er blevet eksponeret for mere end 500.000 organiske brugere gennem Fredericia Håndboldklubs egne digitale platforme samt klubbens mediepartnere, herunder lokale medier, der følger klubben tæt. Denne eksponering har været med til at styrke mit personlige brand og øge kendskabet til mit arbejde – både i Fredericia og på den nationale sportsscene.",
          "For mig handler samarbejdet dog om langt mere end rækkevidde og synlighed. Noget af det, der betyder mest, er at være en del af en klub, hvor der er et tydeligt fokus på udvikling, fællesskab og arbejdet med unge talenter. Det er inspirerende at samarbejde med en organisation, der investerer i fremtiden og skaber rammerne for, at spillere og mennesker omkring klubben kan udvikle sig.",
        ],
      },
      {
        title: "Resultatet",
        paragraphs: [
          "Samarbejdet fortsætter i den kommende sæson, hvor jeg allerede er booket til de første fire kampe på både kvinde- og herresiden samt produktionen af holdfotos og portrætfotos af hele kvindeholdet. Det er en stor anerkendelse af den kvalitet og tillid, der er blevet opbygget gennem vores samarbejde.",
          "Derudover har jeg opbygget stærke relationer til klubbens stab, spillere og menneskerne omkring holdet. Disse relationer betyder utrolig meget for mig, da de ikke blot skaber et stærkere samarbejde, men også giver mig et værdifuldt netværk og en endnu større forståelse for livet omkring en professionel sportsklub.",
          "Samarbejdet med Fredericia Håndboldklub er derfor ikke kun et vigtigt kapitel i min udvikling som fotograf – det er også et eksempel på, hvordan passion, kvalitet og gode relationer kan skabe et stærkt og langsigtet partnerskab.",
        ],
      },
    ],
    articleFlow: [
      { type: "section", sectionIndex: 0 },
      { type: "cover" },
      { type: "section", sectionIndex: 1 },
      { type: "gallery" },
      { type: "section", sectionIndex: 2 },
    ],
    gallery: [
      {
        src: "/images/references/fredericia-handboldklub/dsc07230-4.webp",
        alt: "Fredericia Håndboldklub spiller i duel i klubtrøje",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/fredericia-handboldklub/dsc07343-2.webp",
        alt: "Fredericia Håndboldklub opvarmning i klubtrøjer før kamp",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/fredericia-handboldklub/dsc07417.webp",
        alt: "Fredericia Håndboldklub detalje fra hallen",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/fredericia-handboldklub/dsc07471.webp",
        alt: "Fredericia Håndboldklub spillerportræt i aktion med klublogo på trøjen",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/fredericia-handboldklub/dsc08173-2.webp",
        alt: "Fredericia Håndboldklub kampmoment med høj intensitet",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/fredericia-handboldklub/dsc08253.webp",
        alt: "Fredericia Håndboldklub stemning i arenaen",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/fredericia-handboldklub/dsc08414-2.webp",
        alt: "Fredericia Håndboldklub afslutning på mål",
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    slug: "kif-kolding",
    title: "KIF Kolding",
    subtitle: "At fortælle historien om en afgørende kamp",
    tags: ["Sportsfotografi", "Playoff"],
    year: "2025",
    location: "Kolding",
    cardDescription:
      "Dokumentation af KIF Koldings afgørende playoff-kamp mod Aarhus Håndbold — fra spænding til de afgørende øjeblikke.",
    metaDescription:
      "Reference: KIF Kolding — sportsfotografi fra den afgørende playoff-kamp mod Aarhus Håndbold om oprykning til Danmarks bedste håndboldliga.",
    coverImage: {
      src: "/images/references/kif-kolding/dsc09566-3.webp",
      alt: "Fans og publikum jubler til KIF Kolding kamp",
      width: 1800,
      height: 1200,
    },
    intro:
      "Et samarbejde skabt omkring et enkelt, men afgørende øjeblik — hvor ambitioner, pres og følelser kulminerede i en kamp, der kunne ændre klubbens fremtid.",
    articleSections: [
      {
        title: "Projektet",
        paragraphs: [
          "Et af de projekter, jeg er særligt stolt af, opstod i forbindelse med KIF Koldings afgørende playoff-kamp mod Aarhus Håndbold.",
          "Forud for kampen blev jeg kontaktet direkte af KIF Kolding, som ønskede en ekstra fotograf til at dække den vigtige kamp om oprykning til Danmarks bedste håndboldliga. Det var en kamp med enorm betydning for klubben, spillerne og alle omkring holdet — en aften hvor hver eneste detalje talte, og hvor følelserne var helt i centrum.",
          "Min opgave var at dokumentere kampen fra sidelinjen og skabe en visuel fortælling, der kunne indfange mere end blot resultatet på måltavlen. Fokus var på at fortælle historien om kampen gennem billeder — fra spændingen før første fløjt til intensiteten undervejs og reaktionerne efter kampens afgørende øjeblikke.",
          "I en kamp med så meget på spil handler sportsfotografi ikke kun om at være det rigtige sted på det rigtige tidspunkt. Det handler om at forstå sporten, læse situationerne og være klar til at fange de små øjeblikke, som fortæller den store historie.",
        ],
      },
      {
        title: "Bag billederne",
        paragraphs: [
          "Håndbold er en sport fyldt med energi, bevægelse og følelser, og netop derfor brænder jeg for at fotografere den. De stærkeste billeder opstår ofte ikke kun i selve aktionen, men i alt det omkringliggende: koncentrationen i spillernes ansigter, sammenholdet på bænken, trænernes reaktioner, fansenes engagement og de sekunder, hvor kampen hænger i en tynd tråd.",
          "At få mulighed for at arbejde tæt på KIF Kolding i en så afgørende kamp var en stor tillidserklæring. Som fotograf er det mit ansvar at træde ind i klubbens univers og forstå, hvad der betyder noget for dem — både sportsligt og menneskeligt.",
          "Jeg ønskede derfor ikke kun at levere klassiske kampbilleder, men skabe en samling billeder, der kunne mærkes. Billeder, der viser kampen, stemningen og historien bag præstationen.",
          "For mig er det netop dét, der gør sportsfotografi unikt. Et billede kan fastholde en følelse, et øjeblik eller en milepæl, som ellers kun eksisterer i få sekunder.",
        ],
      },
      {
        title: "Resultatet",
        paragraphs: [
          "Efter kampen havde KIF Kolding en visuel fortælling fra en af sæsonens vigtigste aftener. Billederne dokumenterede både den sportslige kamp på banen og de mange følelser, der fulgte med — fra spændingen inden kampen til de intense situationer undervejs.",
          "Projektet blev et stærkt eksempel på, hvordan et enkelt samarbejde kan opstå omkring en fælles ambition om at skabe billeder med værdi. Selvom opgaven kun omfattede én kamp, var oplevelsen både professionelt og personligt betydningsfuld.",
          "At blive valgt af en professionel klub til at dokumentere et så vigtigt øjeblik er noget, jeg sætter stor pris på. Det bekræfter for mig, hvor vigtigt det er at kombinere tekniske færdigheder med forståelsen for menneskerne, sporten og de historier, der gemmer sig bag.",
          "Samarbejdet med KIF Kolding er derfor ikke bare en samling billeder fra en håndboldkamp — det er en fortælling om ambitioner, fællesskab og de øjeblikke, der definerer en sæson.",
        ],
      },
    ],
    articleFlow: [
      { type: "section", sectionIndex: 0 },
      { type: "cover" },
      { type: "section", sectionIndex: 1 },
      { type: "gallery" },
      { type: "section", sectionIndex: 2 },
    ],
    gallery: [
      {
        src: "/images/references/kif-kolding/dsc09393.webp",
        alt: "KIF Kolding spiller i duel i klubtrøje",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/kif-kolding/dsc09416.webp",
        alt: "KIF Kolding opbygning i angreb",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/kif-kolding/dsc09468.webp",
        alt: "KIF Kolding stemning i hallen",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/kif-kolding/dsc09548-6-2.webp",
        alt: "KIF Kolding hurtig omstilling",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/kif-kolding/dsc09613-9.webp",
        alt: "KIF Kolding jubelscene med spillere i klubtrøjer",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/kif-kolding/dsc09621-5.webp",
        alt: "KIF Kolding duel ved målfeltet",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/kif-kolding/dsc09694.webp",
        alt: "KIF Kolding detaljer fra kampen",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/kif-kolding/dsc09742.webp",
        alt: "KIF Kolding afslutning på mål i klubtrøje",
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    slug: "esbjerg-streetfood",
    title: "Esbjerg Street Food",
    subtitle: "At fange stemningen på årets travleste sommerdag",
    tags: ["Eventfotografi", "Livsstil"],
    year: "2025",
    location: "Esbjerg",
    cardDescription:
      "Stemning, gæster og oplevelser fra en af sommerens travleste dage under Esbjerg Festuge.",
    metaDescription:
      "Reference: Esbjerg Street Food — event- og livsstilsfotografi fra en travl sommerdag under Esbjerg Festuge med koncerter, gæster og stemning i gårdhaven.",
    coverImage: {
      src: "/images/references/esbjerg-streetfood/dsc05265.webp",
      alt: "Artist fra Alley-Cats peger mod kameraet ved Esbjerg Street Food",
      width: 1800,
      height: 1200,
    },
    intro:
      "Et samarbejde skabt omkring mennesker, oplevelser og den helt særlige energi, der opstår, når en by samles til fest.",
    articleSections: [
      {
        title: "Projektet",
        paragraphs: [
          "Jeg fik fornøjelsen af at levere billeder til Esbjerg Street Food i forbindelse med en af sommerens absolut travleste dage – fredagen under Esbjerg Festuge.",
          "Med blå himmel, 27 graders varme og tusindvis af mennesker i byens gader var rammerne sat for en dag fyldt med liv, musik og gode oplevelser. På Torvet i Esbjerg var der arrangeret gratis koncerter af Skala FM med store navne som blandt andet Ankerstjerne og Martin Jensen, og få meter derfra lå Esbjerg Street Food som et naturligt samlingspunkt midt i festlighederne.",
          "Min opgave var at dokumentere den unikke stemning omkring stedet – fra de første gæster, der ankom, til de travle timer hvor restauranterne summede af liv, drinks blev serveret, fadøl blev skænket, og gårdhaven blev fyldt med mennesker.",
          "Fokus var ikke kun på maden og omgivelserne, men på hele oplevelsen. De små øjeblikke mellem mennesker, grinene ved bordene, fællesskabet omkring musikken og den energi, der gør Esbjerg Street Food til mere end bare et sted at spise.",
        ],
      },
      {
        title: "Bag billederne",
        paragraphs: [
          "Når jeg fotograferer steder som Esbjerg Street Food, handler det ikke kun om at skabe pæne billeder – det handler om at fortælle en historie.",
          "Et sted lever gennem de mennesker, der besøger det, og derfor var det vigtigt for mig at fange den atmosfære, som gæsterne selv oplevede. De spontane øjeblikke, de gode samtaler, de kolde drikke på en varm sommerdag og følelsen af at være en del af noget større.",
          "I gårdhaven blev der skabt ekstra liv med live musik fra Alley-Cats, som samlede hundredvis af mennesker til en aften fyldt med musik, mad og fællesskab. Kombinationen af festugen, koncerterne på Torvet og aktiviteterne hos Esbjerg Street Food skabte en helt særlig energi, som var fantastisk at dokumentere.",
          "Projektet gav mig samtidig mulighed for at arbejde endnu mere med livsstils- og eventfotografi, hvor relationer, mennesker og stemninger er i centrum. Det er netop i de situationer, hvor der sker meget på én gang, at jeg elsker at finde de små detaljer og øjeblikke, der fortæller den største historie.",
        ],
      },
      {
        title: "Resultatet",
        paragraphs: [
          "Billederne blev en visuel fortælling om en dag, hvor Esbjerg Street Food viste sig fra sin bedste side – fyldt med liv, gæster og oplevelser.",
          "For mig var samarbejdet både lærerigt og inspirerende. Det gav værdifuld erfaring med at arbejde i et dynamisk miljø med mange forskellige lysforhold, hurtige situationer og mange mennesker i bevægelse. Samtidig skabte dagen nye relationer og netværk, som jeg sætter stor pris på.",
          "Samarbejdet med Esbjerg Street Food har åbnet døren for flere muligheder, og jeg ser frem til at fortsætte med at dokumentere oplevelser, events og virksomheder i både Esbjerg og resten af området i den kommende tid.",
          "For mig handler fotografi om mere end selve billedet – det handler om at bevare følelsen af et øjeblik. Og denne dag var et perfekt eksempel på, hvordan billeder kan fortælle historien om et sted, en by og de mennesker, der skaber stemningen.",
        ],
      },
    ],
    articleFlow: [
      { type: "section", sectionIndex: 0 },
      { type: "cover" },
      { type: "section", sectionIndex: 1 },
      { type: "gallery" },
      { type: "section", sectionIndex: 2 },
    ],
    gallery: [
      {
        src: "/images/references/esbjerg-streetfood/dsc04919.webp",
        alt: "Esbjerg Street Food stemning i gårdhaven",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/esbjerg-streetfood/dsc05100.webp",
        alt: "Gæster og oplevelser hos Esbjerg Street Food",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/esbjerg-streetfood/dsc05255.webp",
        alt: "Esbjerg Street Food under Esbjerg Festuge",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/esbjerg-streetfood/dsc05616.webp",
        alt: "Liv og aktivitet hos Esbjerg Street Food",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/esbjerg-streetfood/dsc05685.webp",
        alt: "Sommerstemning hos Esbjerg Street Food",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/references/esbjerg-streetfood/dsc05783.webp",
        alt: "Fællesskab og musik i gårdhaven",
        width: 1800,
        height: 1200,
      },
    ],
  },
];

export function getReferenceBySlug(slug: string): Reference | undefined {
  return references.find((ref) => ref.slug === slug);
}
