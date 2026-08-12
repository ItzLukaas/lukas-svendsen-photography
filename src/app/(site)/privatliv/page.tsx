import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Privatlivspolitik",
    description:
      "Privatlivspolitik for lukassvendsen.dk — hvordan kontakt- og bookingforespørgsler behandles.",
    path: "/privatliv",
  }),
  robots: { index: false, follow: true },
};

export default function PrivatlivPage() {
  return (
    <div className="mx-auto max-w-[720px] px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-20 md:px-8 md:pb-28 lg:px-12">
      <FadeIn>
        <p className="label-meta">Juridisk</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
          Privatlivspolitik
        </h1>
        <div className="mt-8 space-y-5 text-body">
          <p>
            Når du skriver via kontakt- eller bookingformularen på{" "}
            {siteConfig.domain}, sender du oplysninger som navn, email,
            telefonnummer og en besked om dit projekt.
          </p>
          <p>
            Oplysningerne bruges kun til at besvare din henvendelse og aftale
            et eventuelt samarbejde. De deles ikke med tredjeparter til
            markedsføring.
          </p>
          <p>
            Beskeder behandles via email. Du kan til enhver tid bede om at få
            slettet oplysninger, du har sendt, ved at skrive til{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-quiet font-medium text-foreground underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
            .
          </p>
          <p>
            Siden bruger teknisk nødvendige cookies til at fungere. Der
            trackes ikke til reklame.
          </p>
          <p>
            Den valgfrie fotografi-assistent kan bruges uden konto eller
            personoplysninger. Samtaler gemmes ikke permanent på sitet. Hvis
            assistenten bruger en ekstern AI-tjeneste, sendes kun den aktuelle
            besked og relevant offentlig sideviden — ikke din bookinghistorik
            eller unødvendige persondata. Når du vil booke, bruger du den
            almindelige formular, hvor personoplysninger behandles som beskrevet
            ovenfor.
          </p>
        </div>
        <p className="mt-10">
          <Link href="/kontakt" className="btn-ghost">
            Tilbage til kontakt
          </Link>
        </p>
      </FadeIn>
    </div>
  );
}
