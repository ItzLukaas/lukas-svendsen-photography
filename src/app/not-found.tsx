import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary } from "@/lib/styles";
import { notFoundMetadata } from "@/lib/seo";

export const metadata: Metadata = notFoundMetadata();

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#0a0a0a] px-6 pt-28">
      <div className="max-w-lg text-center">
        <p className="text-xs tracking-[0.3em] text-white/35 uppercase">404</p>
        <h1 className="mt-5 font-display text-3xl font-light text-white md:text-4xl">
          Siden blev ikke fundet
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-white/50">
          Den side, du leder efter, findes ikke eller er blevet flyttet.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className={btnPrimary}>
            Gå til forsiden
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/portfolio"
            className="text-xs tracking-[0.2em] text-white/50 uppercase transition-colors duration-500 ease-premium hover:text-white"
          >
            Se portefølje
          </Link>
        </div>
      </div>
    </div>
  );
}
