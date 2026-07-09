import type { ReferenceArticleSection } from "@/data/references";
import { sectionBody } from "@/lib/styles";

interface ReferenceArticleSectionBlockProps {
  section: ReferenceArticleSection;
}

export function ReferenceArticleSectionBlock({ section }: ReferenceArticleSectionBlockProps) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-14 lg:px-8 lg:py-20">
      <h2 className="font-display text-2xl font-light text-white md:text-3xl">{section.title}</h2>
      <div className="mt-8 space-y-6">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={`${sectionBody} text-[1.05rem] leading-relaxed`}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
