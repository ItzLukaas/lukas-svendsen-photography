import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Siden findes ikke",
  description: "Siden findes ikke. Gå til forsiden for at se portfolio og kontakt.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1600px] flex-col justify-center px-5 md:px-8 lg:px-12">
      <p className="label-meta text-muted-ink">404</p>
      <h1 className="mt-3 font-display text-[clamp(2.25rem,5.5vw,3.75rem)]">
        Siden findes ikke.
      </h1>
      <p className="mt-3 max-w-md text-muted-ink">
        Enten er linket forkert, eller også er siden flyttet.
      </p>
      <Link href="/" className="btn-ghost mt-8">
        Til forsiden
      </Link>
    </div>
  );
}
