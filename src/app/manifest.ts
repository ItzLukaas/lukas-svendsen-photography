import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name}, foto og video`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f4f1",
    theme_color: "#f5f4f1",
    lang: "da",
    icons: [
      {
        src: "/brand/icon.svg",
        sizes: "32x32",
        type: "image/svg+xml",
      },
      {
        src: "/brand/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  };
}
