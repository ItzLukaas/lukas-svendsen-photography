import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Siden findes ikke",
  description:
    "Siden findes ikke. Gå til arbejde, booking eller forsiden hos Lukas Svendsen.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1600px] flex-col justify-center px-5 md:px-8 lg:px-12">
      <p className="label-meta text-muted-ink">404</p>
      <h1 className="mt-3 font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em]">
        Siden findes ikke.
      </h1>
      <p className="mt-4 max-w-md text-body">
        Enten er linket forkert, eller også er siden flyttet. Her er et par
        steder at fortsætte.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Link href="/arbejde" className="btn-solid bg-ink text-paper">
          Se arbejde
        </Link>
        <Link href="/booking" className="btn-ghost">
          Book mig
        </Link>
        <Link href="/" className="btn-ghost">
          Til forsiden
        </Link>
      </div>
    </div>
  );
}
