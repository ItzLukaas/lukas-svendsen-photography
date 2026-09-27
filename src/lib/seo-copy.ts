import type { Project } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

type PageSeoEntry = {
  title: string;
  description: string;
};

/** Public page titles and unique meta descriptions (70–155 characters). */
export const pageSeoDa = {
  home: {
    title: "Lukas Svendsen | Foto- og videografi i hele Danmark",
    description:
      "Fotograf og videograf i Grindsted. Lukas Svendsen laver foto, video, drone og content til virksomheder og private i Danmark.",
  },
  arbejde: {
    title: "Arbejde | Lukas Svendsen",
    description:
      "Udvalgte foto- og videoprojekter fra Lukas Svendsen. Festival, sport, events og erhverv — se portfolioen.",
  },
  hvadJegLaver: {
    title: "Hvad jeg laver | Foto, video og content",
    description:
      "Foto, video, drone og content til virksomheder, events, sport, koncerter og private. Se hvad fotograf Lukas Svendsen laver.",
  },
  om: {
    title: "Om Lukas Svendsen | Fotograf og videograf",
    description:
      "Mød Lukas Svendsen, fotograf og videograf i Grindsted. Om arbejdet med foto, video og content til virksomheder og private.",
  },
  kontakt: {
    title: "Kontakt Lukas Svendsen",
    description:
      "Kontakt fotograf Lukas Svendsen. Skriv om foto, video eller content via formular, mail eller telefon — svar inden 1–2 hverdage.",
  },
  booking: {
    title: "Book Lukas Svendsen | Foto og video",
    description:
      "Book Lukas Svendsen til foto, video og content. Beskriv opgaven som virksomhed eller privat, og få svar inden 1–2 hverdage.",
  },
  privatliv: {
    title: "Privatlivspolitik | Lukas Svendsen",
    description:
      "Privatlivspolitik for lukassvendsen.dk. Sådan behandles navn, email og besked fra kontakt- og bookingforespørgsler.",
  },
  notFound: {
    title: "Siden findes ikke | Lukas Svendsen",
    description:
      "Siden findes ikke. Gå til portfolio, booking eller forsiden hos fotograf og videograf Lukas Svendsen.",
  },
} as const satisfies Record<string, PageSeoEntry>;

/** English SEO titles & descriptions — search intent for photographer Denmark. */
export const pageSeoEn = {
  home: {
    title: "Photographer & Videographer in Denmark | Lukas Svendsen",
    description:
      "Photographer and videographer in Denmark. Lukas Svendsen creates photography, video, drone and content for businesses and private clients.",
  },
  arbejde: {
    title: "Work | Photography, Video & Content | Lukas Svendsen",
    description:
      "Selected photography and video projects by Lukas Svendsen — festivals, sports, events and commercial work across Denmark.",
  },
  hvadJegLaver: {
    title: "What I Do | Photography, Video & Content in Denmark",
    description:
      "Photography, video, drone and content for businesses, events, sports, concerts and private clients. See what Lukas Svendsen offers.",
  },
  om: {
    title: "About Lukas Svendsen | Photographer & Videographer",
    description:
      "Meet Lukas Svendsen, photographer and videographer based in Grindsted, Denmark. Photography, video and content for business and private work.",
  },
  kontakt: {
    title: "Contact Lukas Svendsen | Photographer in Denmark",
    description:
      "Contact photographer Lukas Svendsen about photography, video or content. Message, email or call — reply within 1–2 business days.",
  },
  booking: {
    title: "Book Lukas Svendsen | Photography & Video in Denmark",
    description:
      "Book Lukas Svendsen for photography, video and content. Describe your project and get a clear reply within 1–2 business days.",
  },
  privatliv: {
    title: "Privacy Policy | Lukas Svendsen",
    description:
      "Privacy policy for lukassvendsen.dk. How name, email and messages from contact and booking requests are handled.",
  },
  notFound: {
    title: "Page not found | Lukas Svendsen",
    description:
      "This page could not be found. Continue to the portfolio, booking or homepage of photographer Lukas Svendsen.",
  },
} as const satisfies Record<string, PageSeoEntry>;

/** @deprecated Prefer getPageSeo(locale) — kept for Danish call sites. */
export const pageSeo = pageSeoDa;

export function getPageSeo(locale: Locale = "da") {
  return locale === "en" ? pageSeoEn : pageSeoDa;
}

/**
 * Unique case descriptions — grounded in existing title, category, location and outcome.
 */
export const projectSeoDescriptionsDa: Record<string, string> = {
  "varde-open-air":
    "Festivalfoto fra Varde Open Air. Scener, artister og publikum, fotograferet til festivalens kommunikation.",
  "bork-festival":
    "Festivalfoto fra Bork Festival. Livebilleder med artister som Lukas Graham, TV-2 og Poul Krebs.",
  "thor-farlov-smukfest":
    "Koncertfoto af Thor Farlov på Smukfest i Skanderborg. Livebilleder fra scenen, fotograferet af Lukas Svendsen.",
  "gron-koncert":
    "Koncertfoto af Sivas til Grøn Koncert i Esbjerg. Livebilleder fra scenen, fotograferet af Lukas Svendsen.",
  "rasmus-seebach-suset":
    "Koncertfoto af Rasmus Seebach på Suset i Esbjerg. Livebilleder fra koncerten, fotograferet af Lukas Svendsen.",
  "esbjerg-streetfood":
    "Eventfoto fra Esbjerg Streetfood. Stemning, gæster og livemusik til Streetfoods egen kommunikation.",
  "dm-finalen-herrer":
    "Sportsfoto fra herrernes DM-finale i Aarhus. Kampbilleder med action, jubel og pokaløjeblikket.",
  "dm-finalen-kvinder":
    "Sportsfoto fra kvindernes DM-finale i Esbjerg. Kampbilleder med intensitet, jubel og mesterskabet.",
  "super-cup-kvinder":
    "Sportsfoto fra Bambuni Super Cup kvinder i Arena Randers. Kampdækning, da Team Esbjerg vandt.",
  "super-cup-herrer":
    "Sportsfoto fra Bambuni Super Cup herrer i Arena Randers. Kampdækning, da Aalborg Håndbold vandt.",
  "fredericia-ribe-esbjerg":
    "Sportsfoto fra Fredericia Håndboldklubs ligakamp mod Ribe-Esbjerg. Kampbilleder fra hjemmebanen i Fredericia.",
  "bjerringbro-silkeborg-fredericia":
    "Sportsfoto fra Fredericia HK mod Bjerringbro-Silkeborg. Kampbilleder fra udebanekampen i Silkeborg.",
};

export const projectSeoDescriptionsEn: Record<string, string> = {
  "varde-open-air":
    "Festival photography from Varde Open Air — stages, artists and crowds, shot for the festival’s own communication.",
  "bork-festival":
    "Festival photography from Bork Festival. Live images with artists such as Lukas Graham, TV-2 and Poul Krebs.",
  "thor-farlov-smukfest":
    "Concert photography of Thor Farlov at Smukfest in Skanderborg. Live stage images by Lukas Svendsen.",
  "gron-koncert":
    "Concert photography of Sivas at Grøn Koncert in Esbjerg. Live stage images by photographer Lukas Svendsen.",
  "rasmus-seebach-suset":
    "Concert photography of Rasmus Seebach at Suset in Esbjerg. Live concert images by Lukas Svendsen.",
  "esbjerg-streetfood":
    "Event photography from Esbjerg Streetfood — atmosphere, guests and live music for Streetfood’s communication.",
  "dm-finalen-herrer":
    "Sports photography from the men’s Danish Championship final in Aarhus — action, celebration and the trophy moment.",
  "dm-finalen-kvinder":
    "Sports photography from the women’s Danish Championship final in Esbjerg — intensity, celebration and the title.",
  "super-cup-kvinder":
    "Sports photography from Bambuni Super Cup women in Arena Randers, covering Team Esbjerg’s win.",
  "super-cup-herrer":
    "Sports photography from Bambuni Super Cup men in Arena Randers, covering Aalborg Håndbold’s win.",
  "fredericia-ribe-esbjerg":
    "Sports photography from Fredericia Handball Club’s league match against Ribe-Esbjerg at home in Fredericia.",
  "bjerringbro-silkeborg-fredericia":
    "Sports photography from Fredericia HK vs Bjerringbro-Silkeborg — match coverage from the away game in Silkeborg.",
};

/** @deprecated Prefer locale-aware helpers */
export const projectSeoDescriptions = projectSeoDescriptionsDa;

export function projectDocumentTitle(
  project: Project,
  locale: Locale = "da",
  localizedTitle?: string,
  localizedCategory?: string
) {
  const title = localizedTitle ?? project.title;
  const category = localizedCategory ?? project.category;
  return `${title} | ${category} | ${siteConfig.name}`;
}

export function projectMetaDescription(
  project: Project,
  locale: Locale = "da"
) {
  const curated =
    locale === "en"
      ? projectSeoDescriptionsEn[project.slug]
      : projectSeoDescriptionsDa[project.slug];
  if (curated) return curated;
  return clampMetaDescription(fallbackProjectDescription(project, locale));
}

function fallbackProjectDescription(project: Project, locale: Locale) {
  const place = project.location
    ? locale === "en"
      ? ` in ${project.location}`
      : ` i ${project.location}`
    : "";
  const outcome = project.outcome?.replace(/\.$/, "") ?? project.excerpt;
  if (locale === "en") {
    return `${project.category} project: ${project.title}${place}. ${outcome}.`;
  }
  return `${project.category}projekt: ${project.title}${place}. ${outcome}.`;
}

export function clampMetaDescription(text: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length >= 70 && compact.length <= 155) return compact;

  if (compact.length > 155) {
    const sliced = compact.slice(0, 155);
    const atSpace = sliced.lastIndexOf(" ");
    const cut = (atSpace >= 70 ? sliced.slice(0, atSpace) : sliced).trim();
    return cut.replace(/[.,;:–-]*$/, "") + ".";
  }

  const pad = `${compact} Photo and video by Lukas Svendsen.`;
  return pad.length <= 155 ? pad : compact;
}

const META_MIN = 70;
const META_MAX = 155;

function assertMetaDescription(text: string, label: string) {
  if (text.length < META_MIN || text.length > META_MAX) {
    throw new Error(
      `Meta description "${label}" is ${text.length} chars (need ${META_MIN}–${META_MAX}): ${text}`
    );
  }
}

for (const [key, value] of Object.entries(pageSeoDa)) {
  assertMetaDescription(value.description, `da.${key}`);
}
for (const [key, value] of Object.entries(pageSeoEn)) {
  assertMetaDescription(value.description, `en.${key}`);
}
for (const [slug, description] of Object.entries(projectSeoDescriptionsDa)) {
  assertMetaDescription(description, `da.${slug}`);
}
for (const [slug, description] of Object.entries(projectSeoDescriptionsEn)) {
  assertMetaDescription(description, `en.${slug}`);
}

const uniqueDescriptions = new Set<string>();
for (const bundle of [pageSeoDa, pageSeoEn] as const) {
  for (const value of Object.values(bundle)) {
    if (uniqueDescriptions.has(value.description)) {
      throw new Error(`Duplicate page meta description: ${value.description}`);
    }
    uniqueDescriptions.add(value.description);
  }
}
for (const [slug, description] of Object.entries(projectSeoDescriptionsDa)) {
  if (uniqueDescriptions.has(description)) {
    throw new Error(`Duplicate project meta description for ${slug}`);
  }
  uniqueDescriptions.add(description);
}
for (const [slug, description] of Object.entries(projectSeoDescriptionsEn)) {
  if (uniqueDescriptions.has(description)) {
    throw new Error(`Duplicate EN project meta description for ${slug}`);
  }
  uniqueDescriptions.add(description);
}
