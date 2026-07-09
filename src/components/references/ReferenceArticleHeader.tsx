import Link from "next/link";
import type { Reference } from "@/data/references";

interface ReferenceArticleHeaderProps {
  reference: Reference;
}

export function ReferenceArticleHeader({ reference }: ReferenceArticleHeaderProps) {
  const metaLine = [...reference.tags, reference.year].join(" · ");

  return (
    <header className="mx-auto max-w-2xl px-6 pt-32 pb-16 lg:px-8 lg:pt-40 lg:pb-20">
      <Link
        href="/referencer"
        className="text-xs tracking-[0.25em] text-white/35 uppercase transition-colors duration-500 ease-premium hover:text-white/70"
      >
        ← Referencer
      </Link>

      <h1 className="mt-10 font-display text-4xl font-light leading-[1.1] text-white sm:text-5xl md:text-6xl">
        {reference.title}
      </h1>

      {reference.subtitle ? (
        <p className="mt-5 font-display text-xl font-light leading-snug text-white/70 md:text-2xl">
          {reference.subtitle}
        </p>
      ) : null}

      <p className="mt-5 text-sm tracking-wide text-white/45">{metaLine}</p>

      <p className="mt-10 text-lg leading-relaxed text-white/60 md:text-xl">
        {reference.intro}
      </p>
    </header>
  );
}
