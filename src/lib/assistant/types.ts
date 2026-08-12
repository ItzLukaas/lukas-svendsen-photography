export type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  tags: string[];
  /** Optional page paths that boost this chunk */
  paths?: string[];
};

export type AssistantQuickAction = {
  id: "foto" | "video" | "drone" | "ukendt";
  label: string;
  prompt: string;
};

export type AssistantSuggestion = {
  label: string;
  prompt: string;
};

export const ASSISTANT_NAME = "Lukas' assistent";
export const ASSISTANT_TAGLINE = "Her for at hjælpe dig på vej.";

export const quickActions: AssistantQuickAction[] = [
  {
    id: "foto",
    label: "📸 Jeg skal bruge billeder",
    prompt: "Jeg skal bruge billeder til et projekt.",
  },
  {
    id: "video",
    label: "🎥 Jeg skal bruge video",
    prompt: "Jeg skal bruge video til et projekt.",
  },
  {
    id: "drone",
    label: "🚁 Jeg skal bruge drone",
    prompt: "Jeg skal bruge droneoptagelser til et projekt.",
  },
  {
    id: "ukendt",
    label: "🤷 Jeg ved det ikke endnu",
    prompt:
      "Jeg er ikke helt sikker på, hvad jeg har brug for — kan du hjælpe mig med at finde ud af det?",
  },
];
