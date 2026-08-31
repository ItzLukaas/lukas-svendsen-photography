"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { WideGallery } from "@/components/work/galleries/wide-gallery";
import { fredericiaRibeEsbjergImages } from "@/lib/data/fredericia-ribe-esbjerg";

const Lightbox = dynamic(
  () => import("@/components/work/lightbox").then((mod) => mod.Lightbox),
  { ssr: false }
);

export function FredericiaRibeEsbjerg() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="fredericia-ribe-esbjerg-heading"
      className="mt-24 border-t border-foreground/10 md:mt-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12">
        <FadeIn>
          <p className="label-meta">Kampfoto</p>
          <h2
            id="fredericia-ribe-esbjerg-heading"
            className="mt-3 max-w-[16ch] font-display text-[clamp(1.85rem,3.8vw,2.85rem)] leading-[1.05] tracking-[-0.03em]"
          >
            Fredericia — Ribe Esbjerg
          </h2>
          <p className="text-body mt-5 max-w-[52ch]">
            Action fra håndboldkampen mellem Fredericia Håndboldklub og
            Ribe-Esbjerg — springskud, dueller og jubel i arenaen.
          </p>
        </FadeIn>

        <WideGallery
          images={fredericiaRibeEsbjergImages}
          projectSlug="fredericia-haandboldklub-ribe-esbjerg"
          onOpen={setActiveIndex}
        />
      </div>

      {activeIndex !== null ? (
        <Lightbox
          images={fredericiaRibeEsbjergImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
          projectTitle="Fredericia — Ribe Esbjerg"
        />
      ) : null}
    </section>
  );
}
