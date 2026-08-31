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
  /** Official client page when relevant (e.g. team roster) */
  clientUrl?: string;
  /** Link label for clientUrl — e.g. "fhk.dk" */
  clientUrlLabel?: string;
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
    excerpt: "Varde Open Air · Festivalfoto",
    client: "Varde Open Air",
    role: "Fotograf",
    outcome:
      "Fotograferede scener, artister og publikum til festivalens kommunikation.",
    featured: true,
    cover: L(
      "/images/projects/varde-open-air/00-publikum-i-skoven-til-varde-open-air.jpg",
      "Publikum i skoven til Varde Open Air",
      3600,
      2400
    ),
    images: [
      P(
        "/images/projects/varde-open-air/01-gnags-varde-open-air.jpg",
        "Gnags på scenen til Varde Open Air",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/02-ella-augusta-varde-open-air.jpg",
        "Ella Augusta på scenen til Varde Open Air",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/03-sofie1998-varde-open-air.jpg",
        "Sofie1998 på scenen til Varde Open Air",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/04-sofie1998-pink-varde-open-air.jpg",
        "Sofie1998 i pink scenelys på Varde Open Air",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/05-publikum-haender-i-vejret-varde-open-air.jpg",
        "Publikum med hænderne i vejret — Varde Open Air",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/06-publikum-festivalstemning-varde-open-air.jpg",
        "Publikum i festivalstemning — Varde Open Air",
        2400,
        3600
      ),
      P(
        "/images/projects/varde-open-air/07-publikum-midt-i-skoven-varde-open-air.jpg",
        "Publikum midt i skovkoncerten — Varde Open Air",
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
    excerpt: "Bork Festival · Festivalfoto",
    client: "Bork Festival",
    role: "Fotograf",
    outcome:
      "Livebilleder fra artister som Lukas Graham, TV-2 og Poul Krebs på Bork Festival.",
    featured: true,
    cover: P(
      "/images/projects/bork-festival/04-berg-bork-festival.jpg",
      "Berg på scenen til Bork Festival",
      2400,
      3600
    ),
    images: [
      P(
        "/images/projects/bork-festival/04-berg-bork-festival.jpg",
        "Berg på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/03-gilli-bork-festival.jpg",
        "Gilli på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/02-ardit-bork-festival.jpg",
        "Ardit i blåt scenelys på Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/01-lukas-graham-bork-festival.jpg",
        "Lukas Graham på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/12-poul-krebs-bork-festival.jpg",
        "Poul Krebs på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/16-karoline-mousing-bork-festival.jpg",
        "Karoline Mousing peger ud i publikum på Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/17-ardit-bork-festival.jpg",
        "Ardit på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/18-madsen-bork-festival.jpg",
        "Madsen på scenen til Bork Festival",
        2400,
        3600
      ),
      P(
        "/images/projects/bork-festival/19-tv2-bork-festival.jpg",
        "TV-2 på scenen til Bork Festival",
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
    excerpt: "Thor Farlov · Smukfest",
    client: "Smukfest",
    role: "Fotograf",
    outcome: "Livebilleder fra koncerten på Smukfest i Skanderborg.",
    featured: true,
    cover: P(
      "/images/projects/thor-farlov-smukfest/01-thor-farlov-synger-pa-scenen-til-smukfest-under-spot.jpg",
      "Thor Farlov synger på scenen til Smukfest under spotlys",
      1467,
      2200
    ),
    images: [
      P(
        "/images/projects/thor-farlov-smukfest/01-thor-farlov-synger-pa-scenen-til-smukfest-under-spot.jpg",
        "Thor Farlov synger på scenen til Smukfest under spotlys",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/02-thor-farlov-live-pa-smukfest-sceneportraet.jpg",
        "Thor Farlov live på Smukfest — sceneportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/03-thor-farlov-med-mikrofonen-hoejt-pa-smukfest-under-g.jpg",
        "Thor Farlov med mikrofonen højt på Smukfest under grønt scenelys",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/04-thor-farlov-pa-scenen-til-smukfest.jpg",
        "Thor Farlov på scenen til Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/05-thor-farlov-i-live-oejeblik-pa-smukfest.jpg",
        "Thor Farlov i live-øjeblik på Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/06-thor-farlov-i-bla-haettetroeje-peger-op-under-lilla-.jpg",
        "Thor Farlov i blå hættetrøje peger op under lilla scenelys på Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/07-thor-farlov-foran-publikum-pa-smukfest.jpg",
        "Thor Farlov foran publikum på Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/08-thor-farlov-i-pink-scenelys-pa-smukfest.jpg",
        "Thor Farlov i pink scenelys på Smukfest",
        1467,
        2200
      ),
      P(
        "/images/projects/thor-farlov-smukfest/09-thor-farlov-med-gaest-pa-scenen-til-smukfest.jpg",
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
    excerpt: "Sivas · Grøn Koncert",
    client: "Grøn Koncert",
    role: "Fotograf",
    outcome: "Koncertfoto fra Sivas' optræden til Grøn Koncert.",
    featured: true,
    cover: P(
      "/images/projects/gron-koncert/01-sivas-smiler-pa-scenen-til-groen-koncert.jpg",
      "Sivas smiler på scenen til Grøn Koncert",
      1600,
      2400
    ),
    images: [
      P(
        "/images/projects/gron-koncert/01-sivas-smiler-pa-scenen-til-groen-koncert.jpg",
        "Sivas smiler på scenen til Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/02-sivas-synger-pa-scenen-til-groen-koncert-under-spotl.jpg",
        "Sivas synger på scenen til Grøn Koncert under spotlys",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/03-sivas-med-armene-udstrakt-pa-scenen-til-groen-koncer.jpg",
        "Sivas med armene udstrakt på scenen til Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/04-sivas-peger-op-under-lilla-scenelys-pa-groen-koncert.jpg",
        "Sivas peger op under lilla scenelys på Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/05-sivas-live-pa-groen-koncert-sceneportraet.jpg",
        "Sivas live på Grøn Koncert — sceneportræt",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/06-sivas-under-blat-scenelys-pa-groen-koncert.jpg",
        "Sivas under blåt scenelys på Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/07-sivas-i-hvid-skjorte-foran-scenetage-pa-groen-koncer.jpg",
        "Sivas i hvid skjorte foran scenetåge på Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/08-sivas-med-mikrofonen-pa-groen-koncert.jpg",
        "Sivas med mikrofonen på Grøn Koncert",
        1600,
        2400
      ),
      P(
        "/images/projects/gron-koncert/09-sivas-foran-publikum-pa-groen-koncert.jpg",
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
    excerpt: "Rasmus Seebach · Suset, Esbjerg",
    client: "Suset",
    role: "Fotograf",
    outcome: "Livebilleder fra koncerten på Suset i Esbjerg.",
    featured: true,
    cover: P(
      "/images/projects/rasmus-seebach-suset/01-rasmus-seebach-pa-scenen-til-suset-i-esbjerg.jpg",
      "Rasmus Seebach på scenen til Suset i Esbjerg",
      1467,
      2200
    ),
    images: [
      P(
        "/images/projects/rasmus-seebach-suset/01-rasmus-seebach-pa-scenen-til-suset-i-esbjerg.jpg",
        "Rasmus Seebach på scenen til Suset i Esbjerg",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/02-rasmus-seebach-synger-live-pa-suset.jpg",
        "Rasmus Seebach synger live på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/03-rasmus-seebach-under-scenelys-pa-suset.jpg",
        "Rasmus Seebach under scenelys på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/04-rasmus-seebach-med-mikrofon-pa-suset.jpg",
        "Rasmus Seebach med mikrofon på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/05-rasmus-seebach-live-pa-suset-sceneportraet.jpg",
        "Rasmus Seebach live på Suset — sceneportræt",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/06-rasmus-seebach-foran-publikum-pa-suset.jpg",
        "Rasmus Seebach foran publikum på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/07-rasmus-seebach-i-spotlys-pa-suset.jpg",
        "Rasmus Seebach i spotlys på Suset",
        1467,
        2200
      ),
      P(
        "/images/projects/rasmus-seebach-suset/08-rasmus-seebach-pa-scenen-til-suset-i-esbjerg.jpg",
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
    excerpt: "Esbjerg Streetfood · Eventfoto",
    client: "Esbjerg Streetfood",
    role: "Eventfotograf",
    outcome:
      "Stemning, gæster og livemusik fra eventet — brugt til Esbjerg Streetfoods kommunikation.",
    featured: true,
    cover: L(
      "/images/projects/esbjerg-streetfood/09-fejring-under-lygterne-pa-esbjerg-streetfood.jpg",
      "Fejring under lygterne på Esbjerg Streetfood",
      3600,
      2400
    ),
    images: [
      L(
        "/images/projects/esbjerg-streetfood/01-soho-bar-cocktails-pa-esbjerg-streetfood.jpg",
        "SoHo Bar & Cocktails på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/02-gaester-ved-langborde-pa-esbjerg-streetfood.jpg",
        "Gæster ved langborde på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/03-live-musik-keyboardist-pa-esbjerg-streetfood.jpg",
        "Live musik — keyboardist på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/04-guitarist-live-pa-esbjerg-streetfood.jpg",
        "Guitarist live på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/05-keyboardist-i-roed-pa-esbjerg-streetfood.jpg",
        "Keyboardist i rød på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/06-gaest-fejrer-stemningen-pa-esbjerg-streetfood.jpg",
        "Gæst fejrer stemningen på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/07-gaest-ved-bordet-pa-esbjerg-streetfood.jpg",
        "Gæst ved bordet på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/08-applaus-og-aftenstemning-pa-esbjerg-streetfood.jpg",
        "Applaus og aftenstemning på Esbjerg Streetfood",
        3600,
        2400
      ),
      L(
        "/images/projects/esbjerg-streetfood/09-fejring-under-lygterne-pa-esbjerg-streetfood.jpg",
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
    location: "Herning",
    excerpt: "DanskHåndbold · DM-finalen herrer",
    client: "DanskHåndbold",
    role: "Sportsfotograf",
    outcome:
      "Kampbilleder fra finalen i Herning — action, jubel og pokaløjeblikket.",
    featured: true,
    cover: L(
      "/images/projects/dm-finalen-herrer/09-mestre-med-pokalen-dm-finalen-herrer.jpg",
      "Mestre med pokalen — DM-finalen herrer",
      3600,
      2400
    ),
    images: [
      L(
        "/images/projects/dm-finalen-herrer/01-jubel-efter-scoring-dm-finalen-herrer.jpg",
        "Jubel efter scoring — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/02-skud-i-luften-dm-finalen-herrer.jpg",
        "Skud i luften — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/03-action-pa-banen-dm-finalen-herrer.jpg",
        "Action på banen — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/04-springskud-dm-finalen-herrer.jpg",
        "Springskud — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/05-duel-midt-pa-banen-dm-finalen-herrer.jpg",
        "Duel midt på banen — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/06-kampens-intensitet-dm-finalen-herrer.jpg",
        "Kampens intensitet — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/07-afgoerende-oejeblik-dm-finalen-herrer.jpg",
        "Afgørende øjeblik — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/08-pokalen-og-champagne-dm-finalen-herrer.jpg",
        "Pokalen og champagne — DM-finalen herrer",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-herrer/09-mestre-med-pokalen-dm-finalen-herrer.jpg",
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
    location: "Herning",
    excerpt: "DanskHåndbold · DM-finalen kvinder",
    client: "DanskHåndbold",
    role: "Sportsfotograf",
    outcome:
      "Kampbilleder fra finalen i Herning — intensitet, jubel og mesterskabsøjeblikket.",
    featured: true,
    cover: L(
      "/images/projects/dm-finalen-kvinder/09-danske-mestre-dm-finalen-kvinder.jpg",
      "Danske mestre — DM-finalen kvinder",
      3600,
      2400
    ),
    images: [
      L(
        "/images/projects/dm-finalen-kvinder/01-jubel-efter-scoring-dm-finalen-kvinder.jpg",
        "Jubel efter scoring — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/02-springskud-dm-finalen-kvinder.jpg",
        "Springskud — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/03-action-pa-banen-dm-finalen-kvinder.jpg",
        "Action på banen — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/04-angreb-i-luften-dm-finalen-kvinder.jpg",
        "Angreb i luften — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/05-kampens-intensitet-dm-finalen-kvinder.jpg",
        "Kampens intensitet — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/06-duel-midt-pa-banen-dm-finalen-kvinder.jpg",
        "Duel midt på banen — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/07-afgoerende-oejeblik-dm-finalen-kvinder.jpg",
        "Afgørende øjeblik — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/08-pokalen-pa-podiet-dm-finalen-kvinder.jpg",
        "Pokalen på podiet — DM-finalen kvinder",
        3600,
        2400
      ),
      L(
        "/images/projects/dm-finalen-kvinder/09-danske-mestre-dm-finalen-kvinder.jpg",
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
    location: "Herning",
    excerpt: "DanskHåndbold · Bambuni Super Cup kvinder",
    client: "DanskHåndbold",
    role: "Sportsfotograf",
    outcome:
      "Kampdækning fra Super Cup i Herning — Team Esbjerg vandt finalen.",
    featured: true,
    cover: L(
      "/images/projects/super-cup-kvinder/09-team-esbjerg-fejrer-sejr-med-pokal-bambuni-super-cup.jpg",
      "Team Esbjerg fejrer sejr med pokal — Bambuni Super Cup kvinder",
      2200,
      1467
    ),
    images: [
      L(
        "/images/projects/super-cup-kvinder/01-arena-overblik-med-handboldkamp-i-gang-bambuni-super.jpg",
        "Arena overblik med håndboldkamp i gang — Bambuni Super Cup kvinder",
        2200,
        1467
      ),
      P(
        "/images/projects/super-cup-kvinder/02-select-ultimate-handbold-pa-stand-bambuni-super-cup-.jpg",
        "SELECT ULTIMATE-håndbold på stand — Bambuni Super Cup kvinder",
        1467,
        2200
      ),
      L(
        "/images/projects/super-cup-kvinder/03-marit-roesberg-jacobsen-i-team-esbjerg-troeje-super-.jpg",
        "Marit Røsberg Jacobsen i Team Esbjerg-trøje — Super Cup kvinder",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-kvinder/04-angreb-mod-mal-under-kampen-bambuni-super-cup-kvinde.jpg",
        "Angreb mod mål under kampen — Bambuni Super Cup kvinder",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-kvinder/05-odense-handbold-spiller-pa-banen-bambuni-super-cup-k.jpg",
        "Odense Håndbold-spiller på banen — Bambuni Super Cup kvinder",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-kvinder/06-hurtigt-angreb-langs-sidelinjen-bambuni-super-cup-kv.jpg",
        "Hurtigt angreb langs sidelinjen — Bambuni Super Cup kvinder",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-kvinder/07-duel-mellem-to-spillere-bambuni-super-cup-kvinder.jpg",
        "Duel mellem to spillere — Bambuni Super Cup kvinder",
        2200,
        1467
      ),
      P(
        "/images/projects/super-cup-kvinder/08-sandra-toft-i-malmandstroeje-bambuni-super-cup-kvind.jpg",
        "Sandra Toft i målmandstrøje — Bambuni Super Cup kvinder",
        1467,
        2200
      ),
      L(
        "/images/projects/super-cup-kvinder/09-team-esbjerg-fejrer-sejr-med-pokal-bambuni-super-cup.jpg",
        "Team Esbjerg fejrer sejr med pokal — Bambuni Super Cup kvinder",
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
    location: "Herning",
    excerpt: "DanskHåndbold · Bambuni Super Cup herrer",
    client: "DanskHåndbold",
    role: "Sportsfotograf",
    outcome:
      "Kampdækning fra Super Cup i Herning — Aalborg Håndbold løftede pokalen.",
    featured: true,
    cover: L(
      "/images/projects/super-cup-herrer/11-aalborg-handbold-loefter-pokalen-bambuni-super-cup-h.jpg",
      "Aalborg Håndbold løfter pokalen — Bambuni Super Cup herrer",
      2200,
      1467
    ),
    images: [
      L(
        "/images/projects/super-cup-herrer/01-thomas-arnoldsen-i-hopskud-for-aalborg-handbold-supe.jpg",
        "Thomas Arnoldsen i hopskud for Aalborg Håndbold — Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/02-handboldkamp-i-fyldt-arena-bambuni-super-cup-herrer.jpg",
        "Håndboldkamp i fyldt arena — Bambuni Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/03-tempofyldt-angreb-mod-mal-bambuni-super-cup-herrer.jpg",
        "Tempofyldt angreb mod mål — Bambuni Super Cup herrer",
        2200,
        1467
      ),
      P(
        "/images/projects/super-cup-herrer/04-niklas-landin-fejrer-redning-bambuni-super-cup-herre.jpg",
        "Niklas Landin fejrer redning — Bambuni Super Cup herrer",
        1467,
        2200
      ),
      L(
        "/images/projects/super-cup-herrer/05-forsvarsspil-midt-pa-banen-bambuni-super-cup-herrer.jpg",
        "Forsvarsspil midt på banen — Bambuni Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/06-spiller-i-fald-under-kampen-bambuni-super-cup-herrer.jpg",
        "Spiller i fald under kampen — Bambuni Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/07-hurtigt-kontraangreb-bambuni-super-cup-herrer.jpg",
        "Hurtigt kontraangreb — Bambuni Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/08-malscoring-i-malzonen-bambuni-super-cup-herrer.jpg",
        "Målscoring i målzonen — Bambuni Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/09-jubel-efter-scoring-bambuni-super-cup-herrer.jpg",
        "Jubel efter scoring — Bambuni Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/10-kampens-intensitet-under-loftslamperne-super-cup-her.jpg",
        "Kampens intensitet under loftslamperne — Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/11-aalborg-handbold-loefter-pokalen-bambuni-super-cup-h.jpg",
        "Aalborg Håndbold løfter pokalen — Bambuni Super Cup herrer",
        2200,
        1467
      ),
      L(
        "/images/projects/super-cup-herrer/12-fejring-pa-podiet-efter-finale-bambuni-super-cup-her.jpg",
        "Fejring på podiet efter finale — Bambuni Super Cup herrer",
        2200,
        1467
      ),
    ],
  },
  {
    slug: "fredericia-ribe-esbjerg",
    title: "Fredericia — Ribe Esbjerg",
    discipline: "sport",
    category: "Sport",
    galleryFormat: "wide",
    year: "2026",
    location: "Fredericia",
    excerpt: "Fredericia Håndboldklub · Liga mod Ribe-Esbjerg",
    client: "Fredericia Håndboldklub",
    role: "Sportsfotograf",
    outcome:
      "Kampbilleder fra hjemmekampen i Fredericia — angreb, dueller og jubel.",
    featured: false,
    cover: L(
      "/images/projects/fredericia-ribe-esbjerg/01-fhk-spiller-med-bold-mod-ribe-esbjerg.jpg",
      "Fredericia Håndbold spiller med bold mod Ribe-Esbjerg",
      2200,
      1467
    ),
    images: [
      L(
        "/images/projects/fredericia-ribe-esbjerg/01-fhk-spiller-med-bold-mod-ribe-esbjerg.jpg",
        "Fredericia Håndbold spiller med bold mod Ribe-Esbjerg",
        2200,
        1467
      ),
      L(
        "/images/projects/fredericia-ribe-esbjerg/02-springskud-mod-ribe-esbjerg-fredericia-haandbold.jpg",
        "Springskud i luften mod Ribe-Esbjerg — Fredericia Håndbold",
        2200,
        1467
      ),
      L(
        "/images/projects/fredericia-ribe-esbjerg/03-spring-angreb-mod-ribe-esbjerg-fredericia-haandbold.jpg",
        "Angreb mod Ribe-Esbjerg — Fredericia Håndbold",
        2200,
        1467
      ),
      L(
        "/images/projects/fredericia-ribe-esbjerg/04-duel-under-pres-mod-ribe-esbjerg-fredericia-haandbold.jpg",
        "Duel under pres mod Ribe-Esbjerg — Fredericia Håndbold",
        2200,
        1467
      ),
      L(
        "/images/projects/fredericia-ribe-esbjerg/05-palmar-klar-til-kast-mod-ribe-esbjerg-fredericia-haandbold.jpg",
        "Palmar klar til kast mod Ribe-Esbjerg — Fredericia Håndbold",
        2200,
        1467
      ),
      L(
        "/images/projects/fredericia-ribe-esbjerg/06-spiller-dirigerer-mod-ribe-esbjerg-fredericia-haandbold.jpg",
        "Fredericia Håndbold spiller dirigerer på banen mod Ribe-Esbjerg",
        2200,
        1467
      ),
      L(
        "/images/projects/fredericia-ribe-esbjerg/07-hopskud-mod-mal-mod-ribe-esbjerg-fredericia-haandbold.jpg",
        "Hopskud mod mål mod Ribe-Esbjerg — Fredericia Håndbold",
        2200,
        1467
      ),
      L(
        "/images/projects/fredericia-ribe-esbjerg/08-luftkamp-mod-ribe-esbjerg-fredericia-haandbold.jpg",
        "Kampduel mod Ribe-Esbjerg — Fredericia Håndbold",
        2200,
        1467
      ),
      P(
        "/images/projects/fredericia-ribe-esbjerg/09-jubel-efter-scoring-mod-ribe-esbjerg.jpg",
        "Jubel efter scoring mod Ribe-Esbjerg — håndboldkamp",
        1760,
        2200
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
      "Spillerportrætter · 1. Division Kvinder — til klubbens officielle spillertrup.",
    client: "Fredericia Håndboldklub",
    role: "Portrætfotograf",
    outcome:
      "Portrætterne bruges på Fredericia Håndboldklubs officielle spillertrup på fhk.dk.",
    clientUrl:
      "https://fhk.dk/1div-kvinder/1-div-kvinder-spillertrup-og-stab",
    clientUrlLabel: "fhk.dk — spillertrup",
    featured: true,
    cover: P(
      "/images/projects/fredericia-haandboldklub/02-fhk-freja-pose-hvid.jpg",
      "Freja Thor Ammidtsbøl Andersen jubler — Fredericia Håndbold, nummer 3",
      1467,
      2200
    ),
    images: [
      P(
        "/images/projects/fredericia-haandboldklub/01-fhk-gruppe-06-hvid.jpg",
        "Fredericia Håndboldklub — gruppefoto",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/02-fhk-freja-pose-hvid.jpg",
        "Freja Thor Ammidtsbøl Andersen jubler — Fredericia Håndbold, nummer 3",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/03-fhk-maria-pose-hvid.jpg",
        "Maria Husted jubler — Fredericia Håndbold, nummer 4",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/04-fhk-emma-pose-hvid.jpg",
        "Emma Skou Larsen jubler — Fredericia Håndbold, nummer 20",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/05-fhk-eline-pose-hvid.jpg",
        "Eline Osland jubler — Fredericia Håndbold, nummer 19",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/06-fhk-julie-laursen-halv-hvid.jpg",
        "Julie Laursen — Fredericia Håndbold, nummer 11",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/07-fhk-annette-pose-hvid.jpg",
        "Annette Wirén Larsen jubler — Fredericia Håndbold, nummer 27",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/08-fhk-julie-gronne-pose-hvid.jpg",
        "Julie Grønne Thinggård jubler — Fredericia Håndbold, nummer 29",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/09-fhk-nikoline-pose-hvid.jpg",
        "Nikoline Johansen jubler — Fredericia Håndbold, nummer 37",
        1467,
        2200
      ),
      P(
        "/images/projects/fredericia-haandboldklub/10-fhk-sophie-pose-hvid.jpg",
        "Sophie Voldby jubler — Fredericia Håndbold, nummer 23",
        1467,
        2200
      ),
    ],
  },
];

const projectsResolved: Project[] = projectSeed.map(withGeneratedGallery);

/** Listed in portfolio — projects with at least one gallery image */
export function isPublishedProject(project: Project) {
  return project.images.length > 0;
}

/** Projects with images — used for listings and homepage */
export const projects: Project[] = projectsResolved.filter(isPublishedProject);

/** About-page portrait — filename versioned for CDN cache bust. */
export const aboutPortrait: ProjectImage = P(
  "/images/about-lukas-2026.jpg",
  "Portræt af fotograf Lukas Svendsen",
  1650,
  2200
);

/** Desktop hero — handball through goal net at Super Cup. */
export const heroImage: ProjectImage = L(
  "/images/hero-handbold-maalnet-super-cup.jpg",
  "Håndboldspiller gennem målnet under kamp",
  2400,
  1600
);

/** Mobile hero — portrait crop of Super Cup handball action */
export const heroMobileImage: ProjectImage = P(
  "/images/hero-handbold-maalnet-super-cup-mobil.jpg",
  "Håndboldspiller gennem målnet under kamp",
  1200,
  1800
);

export function getProject(slug: string) {
  const project = projectsResolved.find((item) => item.slug === slug);
  if (!project || !isPublishedProject(project)) return undefined;
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
 * Mix covers for Arbejde masonry — maximize variation between neighbours.
 * Prefers alternating tall/wide and different disciplines side by side.
 * Priority slugs (e.g. Thor Farlov) stay near the front.
 * Super Cup kvinder/herrer are kept as a neighbouring pair.
 */
export function sortProjectsForMasonry(list: Project[]): Project[] {
  if (list.length <= 1) return [...list];

  const prioritySlugs = ["thor-farlov-smukfest"];
  /** Keep these project pairs adjacent (first slug first when both present). */
  const pairMate: Record<string, string> = {
    "super-cup-kvinder": "super-cup-herrer",
    "super-cup-herrer": "super-cup-kvinder",
  };
  const pairLead = "super-cup-kvinder";

  const ordered: Project[] = [];
  const remaining = [...list];

  for (const slug of prioritySlugs) {
    const index = remaining.findIndex((project) => project.slug === slug);
    if (index >= 0) ordered.push(remaining.splice(index, 1)[0]);
  }

  const takeBySlug = (slug: string) => {
    const index = remaining.findIndex((project) => project.slug === slug);
    if (index < 0) return null;
    return remaining.splice(index, 1)[0];
  };

  while (remaining.length > 0) {
    const prev = ordered[ordered.length - 1];

    // If the previous card is half of a Super Cup pair, place its mate next
    if (prev && pairMate[prev.slug]) {
      const mate = takeBySlug(pairMate[prev.slug]);
      if (mate) {
        ordered.push(mate);
        continue;
      }
    }

    let bestIndex = 0;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < remaining.length; i += 1) {
      const candidate = remaining[i];
      let score = 0;

      // Prefer starting the Super Cup pair with kvinder (herrer follows via mate rule)
      if (candidate.slug === pairLead) score += 4;
      if (candidate.slug === "super-cup-herrer" && remaining.some((p) => p.slug === pairLead)) {
        score -= 12;
      }

      if (prev) {
        const prevPortrait = isPortraitCase(prev);
        const nextPortrait = isPortraitCase(candidate);
        score += prevPortrait === nextPortrait ? -8 : 10;
        score += prev.discipline === candidate.discipline ? -6 : 7;
        score += prev.category === candidate.category ? -2 : 2;
      } else {
        score += isPortraitCase(candidate) ? 3 : 0;
      }

      score -= i * 0.01;

      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    ordered.push(remaining.splice(bestIndex, 1)[0]);
  }

  return ordered;
}

export function getProjectsByDiscipline(discipline?: DisciplineSlug | "alle") {
  if (!discipline || discipline === "alle") return projects;
  return sortProjectsForMasonry(
    projects.filter((project) => project.discipline === discipline)
  );
}
