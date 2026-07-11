import Link from "next/link";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";

type RelatedLink = {
  href: string;
  label: string;
};

type SeoLandingTemplateProps = {
  breadcrumbs: BreadcrumbItem[];
  label: string;
  h1: string;
  intro: string;
  paragraphs: string[];
  highlights?: string[];
  faqs?: { question: string; answer: string }[];
  relatedLinks?: RelatedLink[];
  path: string;
  metaDescription: string;
  pageTitle: string;
};

export function SeoLandingTemplate({
  breadcrumbs,
  label,
  h1,
  intro,
  paragraphs,
  highlights = [],
  faqs = [],
  relatedLinks = [],
  path,
  metaDescription,
  pageTitle,
}: SeoLandingTemplateProps) {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: pageTitle,
          description: metaDescription,
          path,
        })}
      />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      <div className="min-h-screen bg-background pt-28">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-14">
            <p className={sectionLabel}>{label}</p>
            <h1 className={sectionTitle}>{h1}</h1>
            <p className={`mt-7 max-w-3xl ${sectionBody}`}>{intro}</p>
          </header>

          <article className="space-y-6">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={sectionBody}>
                {paragraph}
              </p>
            ))}
          </article>

          {highlights.length > 0 && (
            <section aria-labelledby="highlights-heading" className="mt-14 border-t border-foreground/[0.06] pt-14">
              <h2 id="highlights-heading" className="font-display text-2xl font-light text-foreground">
                Det får du
              </h2>
              <ul className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="mt-14 border-t border-foreground/[0.06] pt-14">
              <h2 id="faq-heading" className="font-display text-2xl font-light text-foreground">
                Ofte stillede spørgsmål
              </h2>
              <div className="mt-8 space-y-8">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-base text-foreground/85">{faq.question}</h3>
                    <p className={`mt-3 ${sectionBody}`}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {relatedLinks.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-14 border-t border-foreground/[0.06] pt-14">
              <h2 id="related-heading" className="font-display text-2xl font-light text-foreground">
                Relaterede sider
              </h2>
              <ul className="mt-6 space-y-3">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-500 ease-premium hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
