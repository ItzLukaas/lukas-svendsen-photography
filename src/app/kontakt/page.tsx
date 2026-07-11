import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ContactLocationMap } from "@/components/ContactLocationMap";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedContactLink } from "@/components/TrackedContactLink";
import { contactFaqs } from "@/data/faq";
import { siteConfig } from "@/data/photos";
import { contactPageJsonLd, faqJsonLd } from "@/lib/json-ld";
import { sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";
import { pageMetadata } from "@/lib/seo";

const ContactForm = dynamic(
  () =>
    import("@/components/ContactForm").then((mod) => ({
      default: mod.ContactForm,
    })),
  {
    loading: () => (
      <div
        className="min-h-[420px] w-full animate-pulse bg-white/[0.03]"
        aria-hidden="true"
      />
    ),
  },
);

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakt Lukas Svendsen for fotografering, videoproduktion, droneflyvning eller samarbejde. Jeg glæder mig til at høre fra dig.",
  path: "/kontakt",
  keywords: [
    "kontakt fotograf",
    "book fotograf Grindsted",
    "fotograf Vejle",
    "fotograf Kolding",
    "Lukas Svendsen",
  ],
});

const contactInfo = [
  {
    label: "E-mail",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: "mail" as const,
  },
  {
    label: "Telefon",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    icon: "phone" as const,
  },
];

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <JsonLd data={faqJsonLd([...contactFaqs])} />
      <div className="min-h-screen bg-[#0a0a0a] pt-28">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <Breadcrumbs
          items={[
            { name: "Forside", path: "/" },
            { name: "Kontakt", path: "/kontakt" },
          ]}
        />
        <ScrollReveal className="mb-20 text-center">
          <p className={sectionLabel}>Kontakt</p>
          <h1 className={sectionTitle}>Lad os tale sammen</h1>
          <p className={`mx-auto mt-7 max-w-lg ${sectionBody}`}>
            Har du en idé, et projekt eller lyst til at høre mere om fotografering,
            videoproduktion eller droneflyvning? Jeg vil meget gerne høre fra dig.
          </p>
        </ScrollReveal>

        <div className="grid gap-20 lg:grid-cols-5 lg:gap-28">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="font-display text-xl text-white">
                Kontaktinformation
              </h2>
              <p className={`mt-4 text-sm ${sectionBody}`}>
                Skriv til mig via formularen, eller kontakt mig direkte. Jeg svarer så hurtigt som
                muligt.
              </p>

              <div className="mt-12 space-y-7">
                {contactInfo.map((item) => (
                  <TrackedContactLink
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    value={item.value}
                    icon={item.icon}
                  />
                ))}
              </div>

              <ContactLocationMap />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
