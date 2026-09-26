import type { Project } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

/** Public page titles and unique meta descriptions (70–155 characters). */
export const pageSeo = {
  home: {
    title: "Lukas Svendsen | Fotograf og videograf",
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
} as const;

/**
 * Unique case descriptions — grounded in existing title, category, location and outcome.
 */
export const projectSeoDescriptions: Record<string, string> = {
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

export function projectDocumentTitle(project: Project) {
  return `${project.title} | ${project.category} | ${siteConfig.name}`;
}

export function projectMetaDescription(project: Project) {
  const curated = projectSeoDescriptions[project.slug];
  if (curated) return curated;
  return clampMetaDescription(fallbackProjectDescription(project));
}

function fallbackProjectDescription(project: Project) {
  const place = project.location ? ` i ${project.location}` : "";
  const outcome = project.outcome?.replace(/\.$/, "") ?? project.excerpt;
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

  const pad = `${compact} Foto og video af Lukas Svendsen.`;
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

for (const [key, value] of Object.entries(pageSeo)) {
  assertMetaDescription(value.description, key);
}

for (const [slug, description] of Object.entries(projectSeoDescriptions)) {
  assertMetaDescription(description, slug);
}

const uniqueDescriptions = new Set<string>();
for (const value of Object.values(pageSeo)) {
  if (uniqueDescriptions.has(value.description)) {
    throw new Error(`Duplicate page meta description: ${value.description}`);
  }
  uniqueDescriptions.add(value.description);
}
for (const [slug, description] of Object.entries(projectSeoDescriptions)) {
  if (uniqueDescriptions.has(description)) {
    throw new Error(`Duplicate project meta description for ${slug}`);
  }
  uniqueDescriptions.add(description);
}
