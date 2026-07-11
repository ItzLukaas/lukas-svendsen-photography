import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  privacyPolicyMeta,
  privacyPolicySections,
  type PrivacyBlock,
} from "@/data/privacy-policy";
import { siteConfig } from "@/data/photos";
import { webPageJsonLd } from "@/lib/json-ld";
import { sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: privacyPolicyMeta.title,
  description: privacyPolicyMeta.description,
  path: "/privatlivspolitik",
  keywords: ["privatlivspolitik", "GDPR", "cookies", "persondata"],
});

function PrivacyContactBlock() {
  return (
    <div className="my-6 border border-border bg-accent p-6 sm:p-7">
      <p className="text-sm font-medium text-foreground">Dataansvarlig:</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/65">Lukas Guldager Svendsen</p>
      <p className="text-sm leading-relaxed text-foreground/65">Ribersvej 90</p>
      <p className="text-sm leading-relaxed text-foreground/65">7200 Danmark</p>
      <p className="mt-4 text-sm text-foreground/65">
        E-mail:{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-foreground/80 underline decoration-white/20 underline-offset-4 transition-colors duration-500 ease-premium hover:text-foreground"
        >
          {siteConfig.email}
        </a>
      </p>
      <p className="mt-2 text-sm text-foreground/65">
        Telefon:{" "}
        <a
          href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
          className="text-foreground/80 underline decoration-white/20 underline-offset-4 transition-colors duration-500 ease-premium hover:text-foreground"
        >
          {siteConfig.phone}
        </a>
      </p>
    </div>
  );
}

function PrivacyBlockView({ block }: { block: PrivacyBlock }) {
  switch (block.type) {
    case "paragraph":
      if ("segments" in block) {
        return (
          <p className={sectionBody}>
            {block.segments.map((segment, index) =>
              segment.strong ? (
                <strong key={index} className="font-medium text-foreground/75">
                  {segment.text}
                </strong>
              ) : (
                <span key={index}>{segment.text}</span>
              ),
            )}
          </p>
        );
      }
      return <p className={sectionBody}>{block.text}</p>;
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted marker:text-muted-subtle">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "labeled-list":
      return (
        <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-muted marker:text-muted-subtle">
          {block.items.map((item) => (
            <li key={item.label}>
              <span className="font-medium text-foreground/75">{item.label}</span> {item.text}
            </li>
          ))}
        </ul>
      );
    case "contact":
      return <PrivacyContactBlock />;
    case "link":
      return block.external ? (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-base text-foreground/70 underline decoration-white/20 underline-offset-4 transition-colors duration-500 ease-premium hover:text-foreground"
        >
          {block.label}
        </a>
      ) : (
        <Link
          href={block.href}
          className="inline-block text-base text-foreground/70 underline decoration-white/20 underline-offset-4 transition-colors duration-500 ease-premium hover:text-foreground"
        >
          {block.label}
        </Link>
      );
    default:
      return null;
  }
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: privacyPolicyMeta.title,
          description: privacyPolicyMeta.description,
          path: "/privatlivspolitik",
        })}
      />

      <div className="min-h-screen bg-background pt-28">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
          <Breadcrumbs
            items={[
              { name: "Forside", path: "/" },
              { name: privacyPolicyMeta.title, path: "/privatlivspolitik" },
            ]}
          />

          <header className="mb-14 border-b border-foreground/[0.06] pb-10">
            <p className={sectionLabel}>Juridisk</p>
            <h1 className={sectionTitle}>{privacyPolicyMeta.title}</h1>
            <p className="mt-5 text-sm text-muted">
              Senest opdateret: {privacyPolicyMeta.lastUpdated}
            </p>
          </header>

          <div className="space-y-14">
            {privacyPolicySections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-xl font-light text-foreground sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-6 space-y-5">
                  {section.blocks.map((block, index) => (
                    <PrivacyBlockView key={`${section.id}-${index}`} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
