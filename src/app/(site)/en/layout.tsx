import type { Metadata } from "next";

import { englishKeywords } from "@/lib/seo";

/**
 * Nested English layout — keeps English keywords even if root metadata merges.
 * Page-level `pageMetadata` still owns title, description, canonical and hreflang.
 */
export const metadata: Metadata = {
  keywords: [...englishKeywords],
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
