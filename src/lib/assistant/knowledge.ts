import { clientLogos } from "@/lib/data/clients";
import { processSteps } from "@/lib/data/process-steps";
import { projects } from "@/lib/data/projects";
import { homeServices, videoServiceFeatures } from "@/lib/data/services";
import { valueProps } from "@/lib/data/value-props";
import { siteConfig } from "@/lib/site";

import type { KnowledgeChunk } from "@/lib/assistant/types";

/**
 * Structured public knowledge for the assistant — derived from live site data.
 * Keep chunks small so retrieval stays cheap and privacy-friendly.
 */
export function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    {
      id: "about",
      title: "Om Lukas",
      tags: ["om", "lukas", "fotograf", "grindsted", "alder", "hvem"],
      paths: ["/", "/om"],
      text: [
        "Lukas Guldager Svendsen er fotograf fra Grindsted.",
        "Han laver foto, video, drone og content — især til koncerter, festivaler, sport, events og brands.",
        "Han arbejder også i Billund, Esbjerg, Vejle, Kolding, Herning og resten af Jylland.",
        "Kontakt: personlig og direkte. Ingen opdigtede priser eller garantier.",
      ].join(" "),
    },
    {
      id: "contact",
      title: "Kontakt & booking",
      tags: [
        "kontakt",
        "booking",
        "book",
        "email",
        "telefon",
        "pris",
        "priser",
        "forespørgsel",
      ],
      paths: ["/kontakt", "/booking"],
      text: [
        `Telefon: ${siteConfig.phoneDisplay}.`,
        `E-mail: ${siteConfig.email}.`,
        `Adresse: ${siteConfig.location.street}, ${siteConfig.location.postalCode} ${siteConfig.location.city}.`,
        "Booking via /booking — fortæl kort hvad, hvornår og hvor.",
        "Der er ingen offentlige prislister. Pris afhænger af opgaven; send en forespørgsel.",
        "Svar typisk inden for 1–2 hverdage.",
      ].join(" "),
    },
    {
      id: "services",
      title: "Ydelser",
      tags: [
        "ydelser",
        "service",
        "foto",
        "video",
        "drone",
        "fotografering",
        "videoproduktion",
      ],
      paths: ["/", "/#services"],
      text: [
        "Tre hovedydelser:",
        ...homeServices.map(
          (s) => `${s.title}: ${s.description} (booking-type: ${s.bookingType}).`
        ),
        "Video & drone: aftermovies, branded video, luftoptagelser, SoMe & YouTube.",
        ...videoServiceFeatures.map((f) => `${f.title}: ${f.body}`),
      ].join(" "),
    },
    {
      id: "process",
      title: "Proces",
      tags: ["proces", "hvordan", "forløb", "levering", "workflow"],
      paths: ["/"],
      text: processSteps
        .map((s) => `${s.step}. ${s.title}: ${s.body}`)
        .join(" "),
    },
    {
      id: "why",
      title: "Hvorfor Lukas",
      tags: ["hvorfor", "fordel", "tilgang", "kvalitet"],
      paths: ["/"],
      text: valueProps.map((v) => `${v.title}: ${v.body}`).join(" "),
    },
    {
      id: "areas",
      title: "Område",
      tags: [
        "grindsted",
        "billund",
        "vejle",
        "esbjerg",
        "kolding",
        "herning",
        "jylland",
        "lokation",
        "område",
      ],
      paths: ["/", "/om", "/kontakt"],
      text: "Primært Grindsted. Også Billund, Vejle, Esbjerg, Kolding, Herning og Jylland i øvrigt. Lukas kommer til dig på lokationen.",
    },
    {
      id: "partners",
      title: "Samarbejder",
      tags: ["kunde", "klient", "samarbejde", "partner", "logo"],
      paths: ["/"],
      text: `Udvalgte samarbejder (offentlige): ${clientLogos.map((c) => c.name).join(", ")}.`,
    },
    {
      id: "photo-categories",
      title: "Fotokategorier",
      tags: [
        "sport",
        "koncert",
        "festival",
        "event",
        "erhverv",
        "portræt",
        "instagram",
        "some",
      ],
      paths: ["/arbejde"],
      text: `Discipliner: ${siteConfig.disciplines.map((d) => d.label).join(", ")}. Typiske opgaver: sportsfotografering, koncert/festival, events, virksomhed/brand og portrætter. Indhold til sociale medier og web.`,
    },
  ];

  for (const project of projects) {
    chunks.push({
      id: `project:${project.slug}`,
      title: project.title,
      tags: [
        project.discipline,
        project.category.toLowerCase(),
        project.location.toLowerCase(),
        project.slug,
        "portfolio",
        "arbejde",
        "projekt",
        ...(project.client ? [project.client.toLowerCase()] : []),
      ],
      paths: ["/arbejde", `/arbejde/${project.slug}`],
      text: [
        `${project.title} (${project.category}, ${project.location}, ${project.year}).`,
        project.excerpt,
        project.client ? `Klient/arrangør: ${project.client}.` : "",
        project.outcome ? project.outcome : "",
        `Se projektet på /arbejde/${project.slug}.`,
      ]
        .filter(Boolean)
        .join(" "),
    });
  }

  return chunks;
}
