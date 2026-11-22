import { MODERN_KEYWORDS, TOPICS } from "../data/mockData";
import type { Reference } from "../types";

export type AssistantAnswer =
  | { type: "refs"; refs: Reference[] }
  | { type: "abstain"; reason: "modern" | "unmatched" };

const tokenize = (s: string) => s.split(/[\s,.;:?!।\-–—()"'“”]+/).filter(Boolean);

function matches(query: string, tokens: string[], kw: string) {
  const k = kw.toLowerCase();
  // very short keywords (e.g. “মা”, “dad”) must match a whole word, otherwise they match inside unrelated words
  return k.length <= 3 ? tokens.includes(k) : query.includes(k);
}

/**
 * Strict reference-only retrieval. The assistant never composes rulings:
 * it either returns verified Quran/Hadith references from the local index, or abstains.
 */
export function answerQuery(raw: string): AssistantAnswer {
  const query = raw.trim().toLowerCase();
  const tokens = tokenize(query);

  if (MODERN_KEYWORDS.some((k) => matches(query, tokens, k))) return { type: "abstain", reason: "modern" };

  const seen = new Set<string>();
  const refs: Reference[] = [];
  for (const topic of TOPICS) {
    if (topic.keywords.some((k) => matches(query, tokens, k))) {
      for (const r of topic.refs) {
        if (!seen.has(r.id)) {
          seen.add(r.id);
          refs.push(r);
        }
      }
    }
  }
  if (refs.length) return { type: "refs", refs: refs.slice(0, 4) };
  return { type: "abstain", reason: "unmatched" };
}
