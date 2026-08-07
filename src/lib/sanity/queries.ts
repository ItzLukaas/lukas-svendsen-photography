import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(year desc, title asc) {
    "slug": slug.current,
    title,
    discipline,
    category,
    galleryFormat,
    year,
    location,
    excerpt,
    featured,
    cover {
      alt,
      orientation,
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      cloudinaryId
    },
    images[] {
      alt,
      orientation,
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      cloudinaryId
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    discipline,
    category,
    galleryFormat,
    year,
    location,
    excerpt,
    featured,
    cover {
      alt,
      orientation,
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      cloudinaryId
    },
    images[] {
      alt,
      orientation,
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      cloudinaryId
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    email,
    phone,
    phoneDisplay,
    aboutHeadline,
    aboutBody
  }
`;
