export type GeneratedImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: "portrait" | "landscape";
};

export type GeneratedGallery = {
  slug: string;
  updatedAt: string;
  cover?: GeneratedImage;
  images: GeneratedImage[];
};

const modules = import.meta.glob("./generated/*.json", {
  eager: true,
  import: "default",
}) as Record<string, GeneratedGallery>;

/**
 * Returns curated generated gallery for a project slug, if any.
 */
export function getGeneratedGallery(slug: string): GeneratedGallery | null {
  const entry = Object.entries(modules).find(([file]) => {
    const normalized = file.replace(/\\/g, "/");
    return (
      normalized.endsWith(`/${slug}.json`) ||
      normalized.endsWith(`${slug}.json`)
    );
  });
  if (!entry) return null;

  const data = entry[1];
  if (!data?.images?.length) return null;
  return data;
}

/** @deprecated Prefer getGeneratedGallery */
export function getGeneratedImages(slug: string): GeneratedImage[] | null {
  return getGeneratedGallery(slug)?.images ?? null;
}
