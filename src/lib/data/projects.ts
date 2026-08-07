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
    year: "2025",
    location: "Varde",
    excerpt:
      "Støv, sol og en festival, der fylder hele byen. Scenen, publikum og det derimellem.",
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
    year: "2025",
    location: "Bork",
    excerpt:
      "Artister, publikum og det, der sker mellem scenerne.",
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
    slug: "gron-koncert",
    title: "Sivas — Grøn Koncert",
    discipline: "koncerter",
    category: "Koncert",
    galleryFormat: "festival",
    year: "2025",
    location: "Danmark",
    excerpt:
      "Sivas live til Grøn Koncert — energi, publikum og øjeblikke foran scenen.",
    featured: false,
    cover: P(
      "/images/projects/gron-koncert/cover.jpg",
      "Sivas på scenen til Grøn Koncert",
      1467,
      2200
    ),
    images: [],
  },
  {
    slug: "esbjerg-streetfood",
    title: "Esbjerg Streetfood",
    discipline: "events",
    category: "Event",
    galleryFormat: "wide",
    year: "2025",
    location: "Esbjerg",
    excerpt:
      "Mad, mennesker og den løse stemning på Esbjerg Streetfood — eventfotografi fra Vestjylland.",
    featured: true,
    cover: L(
      "/images/projects/esbjerg-streetfood/02-dsc04915.jpg",
      "Gæster ved langborde på Esbjerg Streetfood",
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
    year: "2025",
    location: "Jylland",
    excerpt:
      "Tempo, dueller og de sekunder, hvor finalen afgøres.",
    featured: true,
    cover: L(
      "/images/projects/dm-finalen-herrer/09-dsc04227.jpg",
      "Sportsfotograf fanger mestre med pokalen til DM-finalen herrer i Jylland",
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
    year: "2025",
    location: "Jylland",
    excerpt:
      "Koncentration, kampevne og følelserne, når det gælder mest.",
    featured: true,
    cover: L(
      "/images/projects/dm-finalen-kvinder/09-dsc03531.jpg",
      "Sportsfotograf fanger danske mestre til DM-finalen kvinder i Jylland",
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

export const heroVideoSrc = "/videos/hero.mp4";
export const heroVideoHevcSrc = "/videos/hero-hevc.mp4";

export const heroImage: ProjectImage = L(
  "/images/hero-poster.jpg",
  "Droneoptagelse af fotograf og dronepilot Lukas Svendsen fra Grindsted",
  1920,
  1080
);

/** Dedicated portrait concert frame for mobile hero — not a crop of the desktop poster */
export const heroMobileImage: ProjectImage = P(
  "/images/hero-mobile.jpg",
  "Koncertfotograf fra Grindsted fanger artist live på scenen",
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

export function getProjectsByDiscipline(discipline?: DisciplineSlug | "alle") {
  if (!discipline || discipline === "alle") return projects;
  return projects.filter((project) => project.discipline === discipline);
}

export function isPortrait(image: ProjectImage) {
  return image.orientation === "portrait" || image.height > image.width;
}
