import type { LocalArea } from "@/lib/data/local-areas";
import type { Locale } from "@/lib/i18n/config";

/** English copy for local SEO landings — same facts as Danish, natural EN tone. */
const localAreaEn: Record<
  string,
  Pick<
    LocalArea,
    | "title"
    | "metaDescription"
    | "headline"
    | "intro"
    | "processHeading"
    | "processBody"
    | "portfolioNote"
    | "portfolioLinks"
    | "proof"
  >
> = {
  grindsted: {
    title: "Photographer in Grindsted | Photo, video and content",
    metaDescription:
      "Photographer and videographer in Grindsted. Lukas Svendsen creates photography, video, content and drone for businesses, organisations and private clients. Book a chat about your project.",
    headline: "Photographer and videographer in Grindsted",
    intro: [
      "I'm a photographer and videographer based in Grindsted, working with photography, video, content and drone for businesses, organisations and private clients.",
      "That might mean portraits, product photos, social media film, website imagery or a larger multi-day production. We'll figure out what makes sense for you.",
    ],
    processHeading: "How we work together",
    processBody:
      "We have a short conversation about the project, I show up and deliver edited material you can use straight away. You always know what's happening and when to expect the files.",
    portfolioNote:
      "The portfolio shows examples of my work. It isn't a complete list of everything I can help with.",
    portfolioLinks: [
      { label: "View commercial work", href: "/arbejde?kategori=erhverv" },
      { label: "View portrait work", href: "/arbejde?kategori=portraetter" },
    ],
    proof:
      "Among other things, I've photographed for MAGION Grindsted and delivered material for local projects.",
  },
  billund: {
    title: "Photographer in Billund | Photo, video and content",
    metaDescription:
      "Photographer and videographer in Billund. Photography, video and content for businesses and private clients in Billund and the surrounding area. View work or book a project.",
    headline: "Photographer and videographer in Billund",
    intro: [
      "I create photography, video, content and drone in Billund and the surrounding area for businesses, organisations and private clients who need professional visual material.",
      "Many of my projects are about delivering images and film that can be used directly in communication, on social media or internally. That can be one day or an ongoing production.",
    ],
    processHeading: "From first chat to finished material",
    processBody:
      "You briefly describe the project, I show up in Billund or nearby, and you receive edited files ready to use. We always tailor the scope to what you actually need.",
    portfolioNote:
      "Below you can see examples of work that is also relevant for businesses and organisations in Billund.",
    portfolioLinks: [
      { label: "Commercial projects", href: "/arbejde?kategori=erhverv" },
      { label: "View all work", href: "/arbejde" },
    ],
    proof: "I've delivered photography for Billund Municipality and projects in the area.",
  },
  vejle: {
    title: "Photographer in Vejle | Photo, video and content",
    metaDescription:
      "Photographer and videographer in Vejle. Lukas Svendsen creates photography, video, content and drone for businesses, organisations and private clients in Vejle and nearby.",
    headline: "Photographer and videographer in Vejle",
    intro: [
      "I work as a photographer and videographer in Vejle with photography, video, content and drone for businesses, organisations, brands and private clients.",
      "Whether you need material for marketing, a campaign, social media or a specific event, we start from what you'll use it for.",
    ],
    processHeading: "A collaboration that's easy to start",
    processBody:
      "We start with a short conversation about needs, date and location. I show up in Vejle, produce the material and deliver files you can use straight away. No unnecessary complexity.",
    portfolioNote:
      "The portfolio below shows examples of productions with high demands on quality and delivery.",
    portfolioLinks: [
      { label: "View commercial work", href: "/arbejde?kategori=erhverv" },
      { label: "View portfolio", href: "/arbejde" },
    ],
    proof:
      "I've photographed for Vejle Municipality and Bygningen Vejle, among other projects in the area.",
  },
  esbjerg: {
    title: "Photographer in Esbjerg | Photo, video and content",
    metaDescription:
      "Photographer and videographer in Esbjerg. Photography, video and content for businesses and private clients. Lukas Svendsen has delivered work in Esbjerg and still takes on projects in the area.",
    headline: "Photographer and videographer in Esbjerg",
    intro: [
      "I've delivered photography and video in Esbjerg and still take on projects in West Jutland for businesses, organisations and private clients.",
      "I work with the same broad setup as on my other jobs: photography, video, content and drone, tailored to what you need the material for.",
    ],
    processHeading: "A clear process from start to finish",
    processBody:
      "Write with a date, location and a short description. I'll get back to you, and we'll figure out scope and format together before production begins.",
    portfolioNote:
      "Below you can see examples of work from Esbjerg and similar productions.",
    portfolioLinks: [
      { label: "Suset", href: "/arbejde/rasmus-seebach-suset" },
      { label: "Esbjerg Streetfood", href: "/arbejde/esbjerg-streetfood" },
    ],
    proof:
      "I've delivered material from Suset and Esbjerg Streetfood, among other projects in the area.",
  },
  give: {
    title: "Photographer in Give | Photo, video and content",
    metaDescription:
      "Photographer and videographer in Give and the surrounding area. Photography, video, content and drone for businesses and private clients in southwest Jutland.",
    headline: "Photographer and videographer in Give",
    intro: [
      "I create photography and video in Give and southwest Jutland for businesses, organisations and private clients.",
      "Contact me with a date, location and a short description of the project. Then we'll figure out whether photography, video, drone or content makes the most sense.",
    ],
    processHeading: "How we get started",
    processBody:
      "We have a short conversation, agree on date and location, and I deliver edited material afterwards. You don't need every detail sorted when you write the first time.",
    proof: undefined,
    portfolioNote: undefined,
    portfolioLinks: undefined,
  },
  kolding: {
    title: "Photographer in Kolding | Photo, video and content",
    metaDescription:
      "Photographer and videographer in Kolding. Photography, video, content and drone for businesses, organisations and private clients in Kolding and nearby.",
    headline: "Photographer and videographer in Kolding",
    intro: [
      "I create photography, video, drone and content in Kolding for businesses, organisations and private clients.",
      "Whether you need a single shoot or a larger production, we start from what you'll use the material for and find the solution that fits.",
    ],
    processHeading: "From idea to delivery",
    processBody:
      "You describe the project, I show up in Kolding or nearby, and you receive files ready to use. We keep it simple and concrete.",
    proof: undefined,
    portfolioNote: undefined,
    portfolioLinks: undefined,
  },
  jelling: {
    title: "Photographer in Jelling | Photo, video and content",
    metaDescription:
      "Photographer and videographer in Jelling and the surrounding area. Photography, video and content for businesses and private clients locally.",
    headline: "Photographer and videographer in Jelling",
    intro: [
      "I create photography and video in Jelling and nearby for businesses, organisations and private clients.",
      "If you have a project in the area, write a short note about what you need. I'll get back to you with a concrete answer.",
    ],
    processHeading: "A simple process",
    processBody:
      "A short conversation, production on location and delivery of edited material. That's how we keep most projects.",
    proof: undefined,
    portfolioNote: undefined,
    portfolioLinks: undefined,
  },
};

export function localizeLocalArea(area: LocalArea, locale: Locale): LocalArea {
  if (locale !== "en") return area;
  const copy = localAreaEn[area.slug];
  if (!copy) return area;
  return {
    ...area,
    ...copy,
    path: `/en${area.path}`,
  };
}

export function getLocalAreaEnPath(slug: string) {
  return `/en/fotograf-${slug}`;
}
