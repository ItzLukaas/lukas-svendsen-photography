import { getGeneratedGallery } from "@/lib/data/generated-images";
import type { DisciplineSlug } from "@/lib/site";

export type ImageOrientation = "portrait" | "landscape";

export type GalleryFormat = "mixed" | "wide" | "festival";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: ImageOrientation;
  cloudinaryId?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Filter key used in navigation */
  discipline: DisciplineSlug;
  /** Display category, e.g. "Festival" */
  category: string;
  galleryFormat: GalleryFormat;
  year: string;
  location: string;
  excerpt: string;
  /** Client / organizer when known */
  client?: string;
  /** Role on the job, e.g. "Fotograf" */
  role?: string;
  /** Short delivery outcome — no invented KPIs */
  outcome?: string;
  cover: ProjectImage;
  images: ProjectImage[];
  featured?: boolean;
};

const L = (
  src: string,
  alt: string,
  width = 2400,
  height = 1600
): ProjectImage => ({
  src,
  alt,
  width,
  height,
  orientation: "landscape",
});

const P = (
  src: string,
  alt: string,
  width = 1600,
  height = 2000
): ProjectImage => ({
  src,
  alt,
  width,
  height,
  orientation: "portrait",
});

function withGeneratedGallery<T extends Project>(project: T): T {
  const generated = getGeneratedGallery(project.slug);
  if (!generated?.images?.length) return project;

  return {
    ...project,
    cover: generated.cover ?? generated.images[0] ?? project.cover,
    images: generated.images,
  };
}

/**
 * Portfolio projects — gallery format follows the photography.
 * Drop raw files in inbox/<slug>/ and run `npm run images:process`.
 */
const projectSeed: Project[] = [
  {
    slug: "varde-open-air",
    title: "Varde Open Air",
    discipline: "koncerter",
    category: "Festival",
    galleryFormat: "festival",
    year: "2026",
    location: "Varde",
    excerpt:
      "Støv, sol og en festival, der fylder hele byen. Scenen, publikum og det derimellem.",
    client: "Varde Open Air",
    role: "Fotograf",
    outcome:
      "Leverede et festivalgalleri med fokus på scenen, publikum og stemningen mellem sets — klar til web og sociale medier.",
    featured: true,
    cover: L(
      "/images/projects/varde-open-air/00-dsc08572-cover.jpg",
      "Publikum i skoven til Varde Open Air",
      3600,
      2400
    ),
    images: [
      P(
        "/images/projects/varde-open-air/01-dsc00062.jpg",
        "Sanger i spotlys på Varde Open Air",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/02-dsc08235.jpg",
        "Sangerinde med lilla mikrofonstativ",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/03-dsc08653.jpg",
        "Artist i orange på scenen til Varde Open Air",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/04-dsc08717.jpg",
        "Sangerinde i pink scenelys",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/05-dsc08738.jpg",
        "Gæst med hænderne i vejret",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/06-dsc08779.jpg",
        "Venner i festivalstemning",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/07-dsc08787.jpg",
        "Gæst midt i publikum",
        2400,
        3600
      ),
    ],
  },
  {
    slug: "bork-festival",
    title: "Bork Festival",
    discipline: "koncerter",
    category: "Festival",
    galleryFormat: "festival",
    year: "2026",
    location: "Bork",
    excerpt:
      "Artister, publikum og det, der sker mellem scenerne.",
    client: "Bork Festival",
    role: "Fotograf",
    outcome:
      "Dokumenterede artister og live-energi på tværs af scener — skarpe portrætter og scenefotos til festivalens kommunikation.",
    featured: true,
    cover: P(
      "/images/projects/bork-festival/04-sangerinde.jpg",
      "Berg på scenen til Bork Festival",
      2400,
      3600
    ),
    images: [
      P(
        "/images/projects/bork-festival/04-sangerinde.jpg",
        "Berg på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/03-gilli-plakat.jpg",
        "Gilli på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/02-20260731-lgs-img007.jpg",
        "Rapper i blåt scenelys på Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/01-artist-orange.jpg",
        "Artist i orange på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/12-20260731-lgs-img009.jpg",
        "Guitarist på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/16-20260729-lgs-dsc00590.jpg",
        "Berg peger ud i publikum på Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/17-20260731-lgs-img002.jpg",
        "Rapper i hoodie på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/18-20260801-lgs-0004.jpg",
        "Guitarist i tropisk skjorte på Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/19-dsc02599.jpg",
        "Akustisk artist på scenen til Bork Festival",
        2400,
        3600
      ),
    ],
  },
  {
    slug: "thor-farlov-smukfest",
    title: "Thor Farlov — Smukfest",
    discipline: "koncerter",
    category: "Festival",
    galleryFormat: "festival",
    year: "2026",
    location: "Skanderborg",
    excerpt:
      "Thor Farlov live på Smukfest — scenelys, energi og øjeblikke i højformat.",
    client: "Smukfest",
    role: "Fotograf",
    outcome:
      "Ni lodrette koncertbilleder fra Thor Farlov på Smukfest — klar til web og sociale medier.",
    featured: true,
    cover: P(
      "/images/projects/thor-farlov-smukfest/01-dsc05949.jpg",
      "Thor Farlov synger på scenen til Smukfest under spotlys",
      1467,
      2200
    ),
    images: [
      P(
        "/images/projects/thor-farlov-smukfest/01-dsc05949.jpg",
        "Thor Farlov synger på scenen til Smukfest under spotlys",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/02-dsc06232.jpg",
        "Thor Farlov live på Smukfest — sceneportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/03-dsc06274.jpg",
        "Thor Farlov med mikrofonen højt på Smukfest under grønt scenelys",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/04-dsc06570.jpg",
        "Thor Farlov på scenen til Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/05-dsc06584.jpg",
        "Thor Farlov i live-øjeblik på Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/06-dsc06719.jpg",
        "Thor Farlov i blå hættetrøje peger op under lilla scenelys på Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/07-dsc06739.jpg",
        "Thor Farlov foran publikum på Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/08-dsc06775.jpg",
        "Thor Farlov i pink scenelys på Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/09-dsc06863.jpg",
        "Thor Farlov med gæst på scenen til Smukfest",
        1467,
        2200
      ),
    ],
  },
  {
    slug: "gron-koncert",
    title: "Sivas — Grøn Koncert",
    discipline: "koncerter",
    category: "Koncert",
    galleryFormat: "festival",
    year: "2026",
    location: "Danmark",
    excerpt:
      "Sivas live til Grøn Koncert — scenelys, energi og øjeblikke i højformat.",
    client: "Grøn Koncert",
    role: "Fotograf",
    outcome:
      "Ni lodrette koncertbilleder fra Sivas på Grøn Koncert — klar til web og sociale medier.",
    featured: true,
    cover: P(
      "/images/projects/gron-koncert/01-dsc06913.jpg",
      "Sivas smiler på scenen til Grøn Koncert",
      1600,
      2400
    ),
    images: [
      P(
        "/images/projects/gron-koncert/01-dsc06913.jpg",
        "Sivas smiler på scenen til Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/02-dsc06798-2.jpg",
        "Sivas synger på scenen til Grøn Koncert under spotlys",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/03-dsc06827-2.jpg",
        "Sivas med armene udstrakt på scenen til Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/04-dsc06862-2.jpg",
        "Sivas peger op under lilla scenelys på Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/05-dsc06869.jpg",
        "Sivas live på Grøn Koncert — sceneportræt",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/06-dsc06897.jpg",
        "Sivas under blåt scenelys på Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/07-dsc06963-2.jpg",
        "Sivas i hvid skjorte foran scenetåge på Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/08-dsc07053.jpg",
        "Sivas med mikrofonen på Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/09-dsc07223.jpg",
        "Sivas foran publikum på Grøn Koncert",
        1600,
        2400
      ),
    ],
  },
  {
    slug: "rasmus-seebach-suset",
    title: "Rasmus Seebach — Suset",
    discipline: "koncerter",
    category: "Koncert",
    galleryFormat: "festival",
    year: "2026",
    location: "Esbjerg",
    excerpt:
      "Rasmus Seebach live på Suset i Esbjerg — scenelys, stemning og de store øjeblikke i højformat.",
    client: "Suset",
    role: "Fotograf",
    outcome:
      "Otte lodrette koncertbilleder fra Rasmus Seebach på Suset — klar til web og sociale medier.",
    featured: true,
    cover: P(
      "/images/projects/rasmus-seebach-suset/01-01-dsc09692.jpg",
      "Rasmus Seebach på scenen til Suset i Esbjerg",
      1467,
      2200
    ),
    images: [
      P(
        "/images/projects/rasmus-seebach-suset/01-01-dsc09692.jpg",
        "Rasmus Seebach på scenen til Suset i Esbjerg",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/02-02-dsc09715.jpg",
        "Rasmus Seebach synger live på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/03-03-dsc09787-2.jpg",
        "Rasmus Seebach under scenelys på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/04-04-dsc09885.jpg",
        "Rasmus Seebach med mikrofon på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/05-05-dsc00090.jpg",
        "Rasmus Seebach live på Suset — sceneportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/06-06-dsc00214.jpg",
        "Rasmus Seebach foran publikum på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/07-07-dsc00352.jpg",
        "Rasmus Seebach i spotlys på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/08-08-dsc00562.jpg",
        "Rasmus Seebach på scenen til Suset i Esbjerg",
        1467,
        2200
      ),
    ],
  },
  {
    slug: "esbjerg-streetfood",
    title: "Esbjerg Streetfood",
    discipline: "events",
    category: "Event",
    galleryFormat: "wide",
    year: "2026",
    location: "Esbjerg",
    excerpt:
      "Mad, mennesker og den løse stemning på Esbjerg Streetfood — eventfotografi fra Vestjylland.",
    client: "Esbjerg Streetfood",
    role: "Eventfotograf",
    outcome:
      "Fangede gæster, madboder og live-musik i én sammenhængende eventfortælling — klar til branding og sociale kanaler.",
    featured: true,
    cover: L(
      "/images/projects/esbjerg-streetfood/09-dsc05783.jpg",
      "Fejring under lygterne på Esbjerg Streetfood",
      3600,
      2400
    ),
    images: [
      L(
        "/images/projects/esbjerg-streetfood/01-dsc04763.jpg",
        "SoHo Bar & Cocktails på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/02-dsc04915.jpg",
        "Gæster ved langborde på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/03-dsc05088.jpg",
        "Live musik — keyboardist på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/04-dsc05100.jpg",
        "Guitarist live på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/05-dsc05265.jpg",
        "Keyboardist i rød på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/06-dsc05724.jpg",
        "Gæst fejrer stemningen på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/07-dsc05727.jpg",
        "Gæst ved bordet på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/08-dsc05775.jpg",
        "Applaus og aftenstemning på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/09-dsc05783.jpg",
        "Fejring under lygterne på Esbjerg Streetfood",
        3600,
        2400
      ),
    ],
  },
  {
    slug: "dm-finalen-herrer",
    title: "DM-finalen – Herrer",
    discipline: "sport",
    category: "Sport",
    galleryFormat: "wide",
    year: "2026",
    location: "Jylland",
    excerpt:
      "Håndbold-DM for herrer — tempo, dueller og de sekunder, hvor finalen afgøres.",
    client: "DanskHåndbold",
    role: "Sportsfotograf",
    outcome:
      "Leverede action- og jubelbilleder fra finalen — fra dueller på banen til pokaløjeblikket.",
    featured: true,
    cover: L(
      "/images/projects/dm-finalen-herrer/09-dsc04227.jpg",
      "Mestre med pokalen — DM-finalen herrer",
      3600,
      2400
    ),
    images: [
      L(
        "/images/projects/dm-finalen-herrer/01-dsc03679.jpg",
        "Jubel efter scoring — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/02-dsc03711.jpg",
        "Skud i luften — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/03-dsc03716.jpg",
        "Action på banen — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/04-dsc03786.jpg",
        "Springskud — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/05-dsc03845.jpg",
        "Duel midt på banen — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/06-dsc03868.jpg",
        "Kampens intensitet — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/07-dsc03945-2.jpg",
        "Afgørende øjeblik — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/08-dsc04153.jpg",
        "Pokalen og champagne — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/09-dsc04227.jpg",
        "Mestre med pokalen — DM-finalen herrer",
        3600,
        2400
      ),
    ],
  },
  {
    slug: "dm-finalen-kvinder",
    title: "DM-finalen – Kvinder",
    discipline: "sport",
    category: "Sport",
    galleryFormat: "wide",
    year: "2026",
    location: "Jylland",
    excerpt:
      "Håndbold-DM for kvinder — koncentration, kampevne og følelserne, når det gælder mest.",
    client: "DanskHåndbold",
    role: "Sportsfotograf",
    outcome:
      "Dokumenterede finalens intensitet og mesterskabsøjeblikket — billeder til presse, klub og sociale medier.",
    featured: true,
    cover: L(
      "/images/projects/dm-finalen-kvinder/09-dsc03531.jpg",
      "Danske mestre — DM-finalen kvinder",
      3600,
      2400
    ),
    images: [
      L(
        "/images/projects/dm-finalen-kvinder/01-dsc02942.jpg",
        "Jubel efter scoring — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/02-dsc02946.jpg",
        "Springskud — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/03-dsc02960.jpg",
        "Action på banen — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/04-dsc03015.jpg",
        "Angreb i luften — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/05-dsc03162-2.jpg",
        "Kampens intensitet — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/06-dsc03177.jpg",
        "Duel midt på banen — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/07-dsc03297.jpg",
        "Afgørende øjeblik — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/08-dsc03416.jpg",
        "Pokalen på podiet — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/09-dsc03531.jpg",
        "Danske mestre — DM-finalen kvinder",
        3600,
        2400
      ),
    ],
  },
  {
    slug: "super-cup-kvinder",
    title: "Super Cup 2026 – Kvinder",
    discipline: "sport",
    category: "Sport",
    galleryFormat: "wide",
    year: "2026",
    location: "Jylland",
    excerpt:
      "Bambuni Super Cup for kvinder — tempo, dueller og de afgørende øjeblikke under loftslamperne.",
    client: "DanskHåndbold",
    role: "Sportsfotograf",
    outcome:
      "Leverede action- og stemningsbilleder fra Super Cup — klar til presse, klub og sociale medier.",
    featured: true,
    cover: L(
      "/images/projects/super-cup-kvinder/01-01-dsc01122.jpg",
      "Action under loftslamperne — Super Cup 2026 kvinder",
      2200,
      1467
    ),
    images: [
      L(
        "/images/projects/super-cup-kvinder/01-01-dsc01122.jpg",
        "Action under loftslamperne — Super Cup 2026 kvinder",
        2200,
        1467
      ),
      P(
        "/images/projects/super-cup-kvinder/02-02-dsc00672.jpg",
        "Super Cup 2026 – Kvinder — øjeblik 2",
        1467,
        2200
      ),
      L(
        "/images/projects/super-cup-kvinder/03-03-dsc00800.jpg",
        "Super Cup 2026 – Kvinder — øjeblik 3",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-kvinder/04-04-dsc00820.jpg",
        "Super Cup 2026 – Kvinder — øjeblik 4",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-kvinder/05-05-dsc01053.jpg",
        "Super Cup 2026 – Kvinder — øjeblik 5",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-kvinder/06-06-dsc01104.jpg",
        "Super Cup 2026 – Kvinder — øjeblik 6",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-kvinder/07-07-dsc01171.jpg",
        "Super Cup 2026 – Kvinder — øjeblik 7",
        2200,
        1467
      ),
      P(
        "/images/projects/super-cup-kvinder/08-08-dsc01210.jpg",
        "Super Cup 2026 – Kvinder — øjeblik 8",
        1467,
        2200
      ),
      L(
        "/images/projects/super-cup-kvinder/09-09-dsc01396.jpg",
        "Super Cup 2026 – Kvinder — øjeblik 9",
        2200,
        1467
      ),
    ],
  },
  {
    slug: "super-cup-herrer",
    title: "Super Cup 2026 – Herrer",
    discipline: "sport",
    category: "Sport",
    galleryFormat: "wide",
    year: "2026",
    location: "Jylland",
    excerpt:
      "Bambuni Super Cup for herrer — tempo, dueller og de afgørende øjeblikke under loftslamperne.",
    client: "DanskHåndbold",
    role: "Sportsfotograf",
    outcome:
      "Leverede action- og stemningsbilleder fra Super Cup — klar til presse, klub og sociale medier.",
    featured: true,
    cover: L(
      "/images/projects/super-cup-herrer/11-11-dsc01990-2.jpg",
      "Super Cup 2026 – Herrer — øjeblik 11",
      2200,
      1467
    ),
    images: [
      L(
        "/images/projects/super-cup-herrer/01-01-dsc01426.jpg",
        "Super Cup 2026 – Herrer — øjeblik 1",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/02-02-dsc01475.jpg",
        "Super Cup 2026 – Herrer — øjeblik 2",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/03-03-dsc01533.jpg",
        "Super Cup 2026 – Herrer — øjeblik 3",
        2200,
        1467
      ),
      P(
        "/images/projects/super-cup-herrer/04-04-dsc01546.jpg",
        "Super Cup 2026 – Herrer — øjeblik 4",
        1467,
        2200
      ),
      L(
        "/images/projects/super-cup-herrer/05-05-dsc01572.jpg",
        "Super Cup 2026 – Herrer — øjeblik 5",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/06-06-dsc01624.jpg",
        "Super Cup 2026 – Herrer — øjeblik 6",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/07-07-dsc01831.jpg",
        "Super Cup 2026 – Herrer — øjeblik 7",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/08-08-dsc01859.jpg",
        "Super Cup 2026 – Herrer — øjeblik 8",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/09-09-dsc01868.jpg",
        "Super Cup 2026 – Herrer — øjeblik 9",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/10-10-dsc01914.jpg",
        "Super Cup 2026 – Herrer — øjeblik 10",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/11-11-dsc01990-2.jpg",
        "Super Cup 2026 – Herrer — øjeblik 11",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/12-12-dsc02010-2.jpg",
        "Super Cup 2026 – Herrer — øjeblik 12",
        2200,
        1467
      ),
    ],
  },
  {
    slug: "fredericia-haandboldklub",
    title: "Fredericia Håndboldklub",
    discipline: "portraetter",
    category: "Portræt",
    galleryFormat: "mixed",
    year: "2026",
    location: "Fredericia",
    excerpt:
      "Spillerportrætter og holdfotos for Fredericia Håndboldklubs 1. divisionskvinder — skarpt, enkelt og klar til klubbens kommunikation.",
    client: "Fredericia Håndboldklub",
    role: "Portrætfotograf",
    outcome:
      "Leverede hold- og spillerportrætter til web og sociale medier — fra gruppemotiver til individuelle poses.",
    featured: true,
    cover: L(
      "/images/projects/fredericia-haandboldklub/01-00-1-div-kvinder.jpg",
      "Fredericia Håndboldklub — 1. DIV Kvinder",
      2200,
      1237
    ),
    images: [
      L(
        "/images/projects/fredericia-haandboldklub/01-00-1-div-kvinder.jpg",
        "Fredericia Håndboldklub — 1. DIV Kvinder",
        2200,
        1237
      ),
      P(
        "/images/projects/fredericia-haandboldklub/02-01-fhk-gruppe-06.jpg",
        "Fredericia Håndboldklub — gruppefoto",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/03-02-fhk-gruppe-03.jpg",
        "Fredericia Håndboldklub — gruppefoto",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/04-fhk-gruppe-04.jpg",
        "Fredericia Håndboldklub — gruppefoto",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/05-04-fhk-03-pose.jpg",
        "Fredericia Håndboldklub — spillerportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/06-05-fhk-04-pose.jpg",
        "Fredericia Håndboldklub — spillerportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/07-06-fhk-19-pose.jpg",
        "Fredericia Håndboldklub — spillerportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/08-07-fhk-29-pose.jpg",
        "Fredericia Håndboldklub — spillerportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/09-08-fhk-27-pose.jpg",
        "Fredericia Håndboldklub — spillerportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/10-09-fhk-37-pose.jpg",
        "Fredericia Håndboldklub — spillerportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/11-10-fhk-82-pose.jpg",
        "Fredericia Håndboldklub — spillerportræt",
        1467,
        2200
      ),
    ],
  },
];

const projectsResolved: Project[] = projectSeed.map(withGeneratedGallery);

/** Projects with images — used for listings and homepage */
export const projects: Project[] = projectsResolved.filter(
  (project) => project.images.length > 0
);

export const aboutPortrait: ProjectImage = P(
  "/images/about.jpg",
  "Portræt af fotograf Lukas Svendsen fra Grindsted",
  1650,
  2200
);

/** Desktop hero — DSC06190 church still. Filename versioned for CDN cache bust. */
export const heroImage: ProjectImage = L(
  "/images/hero-church-dsc06190.jpg",
  "Hvid kirke under blå himmel — fotografi af Lukas Svendsen",
  2400,
  1600
);

/** Mobile hero — portrait crop of DSC06190 */
export const heroMobileImage: ProjectImage = P(
  "/images/hero-church-dsc06190-mobile.jpg",
  "Hvid kirke under blå himmel — fotografi af Lukas Svendsen",
  1200,
  1800
);

export function getProject(slug: string) {
  const project = projectsResolved.find((item) => item.slug === slug);
  if (!project || project.images.length === 0) return undefined;
  return project;
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function isPortrait(image: ProjectImage) {
  return image.orientation === "portrait" || image.height > image.width;
}

/** Case format from the cover — used for category list ordering. */
export function isPortraitCase(project: Project) {
  return isPortrait(project.cover);
}

/**
 * Portrait/high-format cases first, then landscape.
 * Stable within each group so curated order is preserved.
 */
export function sortProjectsPortraitFirst(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const aRank = isPortraitCase(a) ? 0 : 1;
    const bRank = isPortraitCase(b) ? 0 : 1;
    return aRank - bRank;
  });
}

/**
 * Interleave portrait and landscape covers for a balanced masonry rhythm.
 * When landscapes dominate, spaces them so tall covers keep punctuating the grid.
 * Priority slugs (e.g. Thor Farlov) are pinned near the front.
 */
export function sortProjectsForMasonry(list: Project[]): Project[] {
  const prioritySlugs = ["thor-farlov-smukfest"];
  const priority = prioritySlugs
    .map((slug) => list.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
  const rest = list.filter((project) => !prioritySlugs.includes(project.slug));

  const portraits: Project[] = [];
  const landscapes: Project[] = [];

  for (const project of rest) {
    if (isPortraitCase(project)) portraits.push(project);
    else landscapes.push(project);
  }

  if (portraits.length === 0 && landscapes.length === 0) return [...priority];

  const mixed: Project[] = [...priority];
  let p = 0;
  let l = 0;

  // After priority pins, keep tall/wide rhythm
  while (p < portraits.length || l < landscapes.length) {
    if (p < portraits.length) {
      mixed.push(portraits[p]);
      p += 1;
    }

    const landscapesPerPortrait =
      Math.ceil(landscapes.length / Math.max(portraits.length, 1)) || 1;
    for (let n = 0; n < landscapesPerPortrait && l < landscapes.length; n += 1) {
      mixed.push(landscapes[l]);
      l += 1;
    }
  }

  return mixed;
}

export function getProjectsByDiscipline(discipline?: DisciplineSlug | "alle") {
  if (!discipline || discipline === "alle") return projects;
  return sortProjectsForMasonry(
    projects.filter((project) => project.discipline === discipline)
  );
}
