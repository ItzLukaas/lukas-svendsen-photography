import { buildKnowledgeChunks } from "@/lib/assistant/knowledge";
import type { KnowledgeChunk } from "@/lib/assistant/types";

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9æøå]+/i)
    .filter((t) => t.length > 1);
}

/**
 * Lightweight keyword retrieval — no embeddings, no full-site dump.
 */
export function retrieveKnowledge(
  query: string,
  pagePath?: string,
  limit = 6
): KnowledgeChunk[] {
  const chunks = buildKnowledgeChunks();
  const terms = tokenize(query);
  if (terms.length === 0 && !pagePath) {
    return chunks.filter((c) =>
      ["about", "services", "contact"].includes(c.id)
    );
  }

  const scored = chunks.map((chunk) => {
    const hay = tokenize(`${chunk.title} ${chunk.text} ${chunk.tags.join(" ")}`);
    let score = 0;

    for (const term of terms) {
      if (chunk.tags.some((t) => t.includes(term) || term.includes(t))) score += 3;
      if (hay.includes(term)) score += 2;
      if (chunk.title.toLowerCase().includes(term)) score += 2;
    }

    if (pagePath && chunk.paths?.some((p) => pagePath.startsWith(p) || p === pagePath)) {
      score += 4;
    }

    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.chunk);
}

export function formatKnowledgeContext(chunks: KnowledgeChunk[]): string {
  if (chunks.length === 0) {
    return "Ingen specifikke vidensbidder matchede. Hold dig til generel, sandfærdig info om Lukas, eller henvis til kontakt.";
  }

  return chunks
    .map((c) => `### ${c.title}\n${c.text}`)
    .join("\n\n");
}
