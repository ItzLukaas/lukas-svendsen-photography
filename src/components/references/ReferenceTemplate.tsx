import type { Reference } from "@/data/references";
import { ReferenceArticleHeader } from "./ReferenceArticleHeader";
import { ReferenceArticleContent } from "./ReferenceArticleContent";

interface ReferenceTemplateProps {
  reference: Reference;
}

export function ReferenceTemplate({ reference }: ReferenceTemplateProps) {
  return (
    <article>
      <ReferenceArticleHeader reference={reference} />
      <ReferenceArticleContent reference={reference} />
    </article>
  );
}
