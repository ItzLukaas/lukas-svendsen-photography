import { siteConfig } from "@/lib/site";

import type { AssistantSuggestion } from "@/lib/assistant/types";

/**
 * Context-aware starter suggestions from pathname — soft prompts only.
 */
export function suggestionsForPath(pathname: string): AssistantSuggestion[] {
  if (pathname.startsWith("/booking") || pathname.startsWith("/kontakt")) {
    return [
      { label: "Hvordan foregår en booking?", prompt: "Hvordan foregår en booking hos dig?" },
      { label: "Jeg vil gerne sende en forespørgsel", prompt: "Jeg vil gerne sende en forespørgsel — hvad skal jeg skrive?" },
      { label: "Hvad koster det?", prompt: "Hvad koster en fotografering eller video?" },
    ];
  }

  if (pathname.includes("dm-finalen") || pathname.includes("sport")) {
    return [
      { label: "Fotograferer du sport?", prompt: "Fotograferer du sport og hold?" },
      { label: "Kan du fotografere vores hold?", prompt: "Kan du fotografere vores hold til Instagram?" },
      { label: "Book sport", prompt: "Jeg vil gerne booke sportsfotografering." },
    ];
  }

  if (
    pathname.includes("koncert") ||
    pathname.includes("festival") ||
    pathname.includes("smukfest") ||
    pathname.includes("gron-koncert") ||
    pathname.includes("varde") ||
    pathname.includes("bork")
  ) {
    return [
      { label: "Fotograferer du koncerter?", prompt: "Fotograferer du koncerter og festivaler?" },
      { label: "Se mere koncert", prompt: "Hvad laver du til koncerter og live events?" },
      { label: "Book koncertfoto", prompt: "Jeg skal bruge en koncertfotograf." },
    ];
  }

  if (pathname.startsWith("/arbejde")) {
    return [
      { label: "Hvad fotograferer du?", prompt: "Hvilke typer jobs laver du?" },
      { label: "Kan du lave noget lignende?", prompt: "Kan du lave noget i samme stil til mit projekt?" },
      { label: "Book mig", prompt: "Jeg vil gerne booke dig til et projekt." },
    ];
  }

  if (pathname.startsWith("/om")) {
    return [
      { label: "Hvem er Lukas?", prompt: "Fortæl kort hvem Lukas er." },
      { label: "Hvor arbejder du?", prompt: "Hvor arbejder du hen — kun Grindsted?" },
      { label: "Book mig", prompt: "Jeg vil gerne booke dig." },
    ];
  }

  return [
    { label: "Hvad tilbyder du?", prompt: "Hvad tilbyder du — foto, video og drone?" },
    { label: "Hvad koster det?", prompt: "Hvad koster det ca.?" },
    { label: "Jeg vil gerne booke", prompt: "Jeg vil gerne booke dig til et projekt." },
  ];
}

/**
 * Offline / no-AI fallback — truthful, short, never invents prices.
 */
export function ruleBasedReply(userText: string): string {
  const q = userText.toLowerCase();

  if (/pris|koster|budget|tilbud/.test(q)) {
    return "Prisen afhænger af opgaven, så jeg vil helst ikke gætte.\n\nDen bedste løsning er at sende en kort forespørgsel med lidt info om projektet — så kan Lukas vende tilbage med noget konkret.\n\nDu kan booke via /booking.";
  }

  if (/drone|luft/.test(q)) {
    return "Det lyder som droneoptagelser 🚁\n\nLukas laver luftfoto og -video til events, lokationer og virksomheder — til overblik, stemning og dynamik.\n\nSkal det primært være stills, video, eller begge dele?";
  }

  if (/video|film|aftermovie|reel|tiktok|youtube/.test(q)) {
    return "Det lyder som videoproduktion 🎥\n\nLukas laver blandt andet aftermovies, eventfilm og korte klip til SoMe og web.\n\nSkal videoen bruges til sociale medier, hjemmeside eller begge dele?";
  }

  if (/sport|hold|kamp|håndbold|fodbold|træning/.test(q)) {
    return "Det lyder som sportsfotografering 📸\n\nLukas kan hjælpe med billeder fra kamp, træning og stemningen omkring holdet — ofte til Instagram og web.\n\nSkal billederne primært bruges til sociale medier, hjemmeside eller begge dele?";
  }

  if (/koncert|festival|live|artist|scene/.test(q)) {
    return "Det lyder som koncert- eller festivalfotografering 📸\n\nLukas fotograferer artister, publikum og stemning — blandt andet Smukfest, Grøn Koncert og Varde Open Air.\n\nEr det et konkret event, du har i tankerne?";
  }

  if (/foto|billede|portræt|event|virksomhed|brand/.test(q)) {
    return "Det lyder som fotografering 📸\n\nLukas laver koncert, festival, sport, events, erhverv og portrætter — klar til SoMe og web.\n\nHvad skal billederne bruges til, og hvor/hvornår ca.?";
  }

  if (/book|kontakt|forespørg|ring|mail/.test(q)) {
    return `Du kan sende en forespørgsel via /booking eller skrive direkte til ${siteConfig.email}.\n\nFortæl gerne kort: hvad du skal bruge, hvornår og hvor — så er Lukas godt klædt på.`;
  }

  if (/ved ikke|usikker|hjælp|hvad skal/.test(q)) {
    return "Helt i orden — så tager vi det stille og roligt.\n\nSkal du mest bruge **billeder**, **video** eller **drone**? Eller er det en blanding?\n\nDu må også bare beskrive projektet med dine egne ord.";
  }

  return "Tak for beskeden.\n\nLukas hjælper med foto, video og drone fra Grindsted — også Billund, Vejle, Esbjerg og resten af Jylland.\n\nFortæl gerne lidt mere om projektet (hvad, hvornår, hvor), eller gå direkte til /booking.\n\nHvis jeg ikke har noget konkret i mine noter, gætter jeg ikke — så er direkte kontakt den sikre vej.";
}
