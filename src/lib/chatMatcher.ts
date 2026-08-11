import { faqData, type FAQEntry } from "@/data/faqData";

/* ══════════════════════════════════════════════════════════
   MYSTERYX Smart Chat Matcher
   ──────────────────────────────────────────────────────────
   Multi-signal scoring: patterns > synonyms > keywords > stems
   ══════════════════════════════════════════════════════════ */

/* ── Synonym map — maps casual/alternative words to canonical terms ── */
const SYNONYMS: Record<string, string[]> = {
  price: ["cost", "rate", "rates", "charge", "charges", "fee", "fees", "kitna", "kitne", "paisa", "paise", "rupee", "rupees", "inr", "₹"],
  shipping: ["delivery", "deliver", "ship", "dispatch", "courier", "parcel", "post"],
  return: ["refund", "exchange", "replace", "replacement", "money back"],
  trunk: ["box", "package", "pack", "mystery box", "mystery trunk", "loot box"],
  gems: ["gem", "coins", "points", "currency", "credits"],
  buy: ["purchase", "order", "get", "grab", "shop", "kharidna", "kharide", "lena"],
  work: ["works", "working", "function", "functions"],
  inside: ["contain", "contains", "contents", "included", "includes"],
  help: ["support", "assist", "assistance", "service"],
  scam: ["fraud", "fake", "cheat", "con", "rip off", "ripoff"],
  safe: ["secure", "security", "protected", "trustworthy", "reliable"],
  good: ["great", "nice", "awesome", "amazing", "worth"],
  bad: ["terrible", "awful", "horrible", "worst", "sucks"],
  fast: ["quick", "quickly", "rapid", "speed", "speedy"],
  cancel: ["cancellation", "cancelled", "canceled"],
  customize: ["customise", "personalize", "personalise", "custom"],
};

/* ── Common stop words to ignore ─── */
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "must",
  "i", "me", "my", "we", "our", "you", "your", "he", "she", "it",
  "they", "them", "their", "its", "this", "that", "these", "those",
  "am", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "up", "about", "into", "through", "during", "before", "after",
  "above", "below", "and", "but", "or", "nor", "not", "no", "so",
  "if", "then", "than", "too", "very", "just", "also", "any",
  "some", "all", "each", "every", "both", "few", "more", "most",
  "other", "only", "own", "same", "here", "there", "when", "where",
  "why", "again", "once", "please", "plz", "pls", "tell", "know",
  "want", "like", "really", "actually", "basically", "literally",
]);

/* ── Normalize ─────────────────────────────────────────── */
function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/['']/g, "'")       // smart quotes → straight
    .replace(/[^a-z0-9₹'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ── Expand input with synonyms ──────────────────────────── */
function expandWithSynonyms(words: string[]): Set<string> {
  const expanded = new Set(words);
  for (const word of words) {
    // Check if this word IS a synonym → add canonical
    for (const [canonical, syns] of Object.entries(SYNONYMS)) {
      if (syns.includes(word) || word === canonical) {
        expanded.add(canonical);
        for (const s of syns) expanded.add(s);
      }
    }
  }
  return expanded;
}

/* ── Extract meaningful words ────────────────────────────── */
function extractWords(text: string): string[] {
  return text.split(" ").filter((w) => w.length > 0 && !STOP_WORDS.has(w));
}

/* ── Stem matching (crude but effective) ─────────────────── */
function stemMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length < 3 || b.length < 3) return false;
  // One starts with the other (ship→shipping, deliver→delivery, etc.)
  const shorter = a.length <= b.length ? a : b;
  const longer = a.length > b.length ? a : b;
  return longer.startsWith(shorter) && (longer.length - shorter.length) <= 4;
}

/* ── Intent detection ──────────────────────────────────── */
const GREETINGS = new Set([
  "hi", "hello", "hey", "hola", "yo", "sup", "hii", "hiii", "heya",
  "namaste", "howdy", "whats up", "wassup", "good morning", "good evening",
  "good afternoon", "good night", "gm", "morning",
]);

const THANKS = new Set([
  "thanks", "thank", "thank you", "thankyou", "thx", "ty", "appreciate",
  "thanks a lot", "thank u", "thnx", "thnks", "gracias", "shukriya",
  "dhanyavaad", "dhanyawad", "appreciated", "thanks so much",
  "thank you so much", "thanks man", "thanks bro", "thanks buddy",
]);

const BYES = new Set([
  "bye", "goodbye", "see you", "later", "cya", "good night", "gn",
  "take care", "see ya", "adios", "tata", "ok bye", "okay bye",
]);

/* Whole-word/phrase containment — avoids "quality" matching "ty" */
function containsPhrase(input: string, phrase: string): boolean {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|\\s)${escaped}($|\\s)`).test(input);
}

type SpecialIntent = "greeting" | "thanks" | "bye";

const INTENT_SETS: Array<[SpecialIntent, Set<string>]> = [
  ["greeting", GREETINGS],
  ["thanks", THANKS],
  ["bye", BYES],
];

/**
 * Strict intent check — only fires when the message is *purely* a
 * greeting/thanks/bye (so "hey, what are the prices?" still gets the
 * price answer, but "hey there!" gets a greeting).
 */
function checkPureIntent(input: string, words: string[]): SpecialIntent | null {
  for (const [intent, set] of INTENT_SETS) {
    if (set.has(input)) return intent;
  }
  if (words.length > 4) return null;
  const meaningful = words.filter((w) => !STOP_WORDS.has(w));
  for (const [intent, set] of INTENT_SETS) {
    const vocab = new Set<string>();
    for (const phrase of set) for (const w of phrase.split(" ")) vocab.add(w);
    if (
      meaningful.length > 0 &&
      meaningful.every((w) => vocab.has(w)) &&
      [...set].some((p) => containsPhrase(input, p))
    ) {
      return intent;
    }
  }
  return null;
}

/**
 * Loose intent check — used only when no FAQ matched, so a trailing
 * "thanks" or "bye" still gets a friendly reply instead of the fallback.
 */
function checkLooseIntent(input: string): SpecialIntent | null {
  for (const [intent, set] of INTENT_SETS) {
    for (const phrase of set) {
      if (containsPhrase(input, phrase)) return intent;
    }
  }
  return null;
}

/* ── Scoring engine ──────────────────────────────────────── */
function scoreEntry(
  normalizedInput: string,
  inputWords: string[],
  expandedWords: Set<string>,
  entry: FAQEntry
): number {
  let score = 0;

  // ── SIGNAL 1: Pattern matching (strongest signal) ──
  // Patterns are full phrases that strongly indicate this intent
  for (const pattern of entry.patterns) {
    const normalizedPattern = pattern.toLowerCase();

    // Exact pattern found in input → very strong
    if (normalizedInput.includes(normalizedPattern)) {
      const wordCount = normalizedPattern.split(" ").length;
      score += 25 + wordCount * 5; // longer patterns = stronger signal
      continue;
    }

    // Check if all words of the pattern appear in input (any order)
    const patternWords = extractWords(normalizedPattern);
    if (patternWords.length > 1) {
      const matchCount = patternWords.filter((pw) =>
        inputWords.some((iw) => iw === pw || stemMatch(iw, pw))
      ).length;
      const matchRatio = matchCount / patternWords.length;
      if (matchRatio >= 0.8) {
        score += 18;
      } else if (matchRatio >= 0.6) {
        score += 10;
      }
    }
  }

  // ── SIGNAL 2: Keyword matching with synonym expansion ──
  let keywordHits = 0;
  for (const keyword of entry.keywords) {
    const kw = keyword.toLowerCase();

    // Direct match in expanded word set
    if (expandedWords.has(kw)) {
      score += 8;
      keywordHits++;
      continue;
    }

    // Check stem matching against input words
    if (inputWords.some((iw) => stemMatch(iw, kw))) {
      score += 5;
      keywordHits++;
      continue;
    }

    // Substring check (e.g., input "shipping" contains keyword "ship")
    if (normalizedInput.includes(kw) && kw.length >= 3) {
      score += 4;
      keywordHits++;
    }
  }

  // Bonus for multiple keyword hits (indicates topic convergence)
  if (keywordHits >= 3) score += 8;
  if (keywordHits >= 5) score += 10;

  // ── SIGNAL 3: Category-specific question words ──
  // Boost if the input contains question words that match the entry's nature
  const hasQuestionWord = /^(what|how|where|when|can|do|does|is|are|will|why|which)\b/.test(normalizedInput);
  if (hasQuestionWord && score > 0) {
    score += 3;
  }

  return score;
}

/* ══════════════════════════════════════════════════════════
   PUBLIC API
   ══════════════════════════════════════════════════════════ */

export interface ChatResponse {
  answer: string;
  type: "faq" | "greeting" | "thanks" | "bye" | "fallback";
}

const GREETING_RESPONSES = [
  "Hey! 👋 I'm MystiQ, the MYSTERYX assistant. Ask me anything about mystery trunks, shipping, gems, or how things work!",
  "Hello! 🎉 MystiQ here. What can I help you with today? I know everything about MYSTERYX — trunks, pricing, delivery, gems, you name it!",
  "Hey there! 🔥 MystiQ at your service. Ask me anything — prices, shipping, what's inside, how gems work, whatever you're curious about!",
];

const THANKS_RESPONSES = [
  "You're welcome! 😊 Let me know if you have any other questions!",
  "Happy to help! 🎉 Anything else you'd like to know about MYSTERYX?",
  "Anytime! Feel free to ask more questions! ✌️",
];

const BYE_RESPONSES = [
  "See you! 👋 Come back anytime you need help!",
  "Catch you later! 🎉 Happy trunk hunting!",
  "Bye! Don't forget to check out our mystery trunks! 🔥",
];

const FALLBACK_RESPONSES = [
  "Hmm, I'm not sure about that one 🤔\n\nI can help with:\n• Trunk prices & tiers\n• Shipping & delivery\n• Gems & rewards\n• Returns & refunds\n• How MYSTERYX works\n\nOr email us at support@cornorstoneconsulting.com!",
  "I don't have a specific answer for that! Try asking about:\n\n• \"What are the trunk prices?\"\n• \"How does shipping work?\"\n• \"How do gems work?\"\n• \"What's inside a trunk?\"\n\nFor anything else, our email support team can help — support@cornorstoneconsulting.com!",
  "That's outside my wheelhouse 😅 But I can answer questions about trunks, pricing, delivery, gems, rarity odds, returns, and more!\n\nOr tap 'Talk to a human' to reach our email support.",
];

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

const MATCH_THRESHOLD = 12;

export function findBestMatch(input: string): ChatResponse {
  const normalized = normalize(input);

  if (!normalized || normalized.length < 1) {
    return { answer: pickRandom(GREETING_RESPONSES), type: "greeting" };
  }

  const allWords = normalized.split(" ");
  const meaningfulWords = extractWords(normalized);

  // Check pure special intents first (message is ONLY a greeting/thanks/bye)
  const intent = checkPureIntent(normalized, allWords);
  if (intent === "greeting") return { answer: pickRandom(GREETING_RESPONSES), type: "greeting" };
  if (intent === "thanks") return { answer: pickRandom(THANKS_RESPONSES), type: "thanks" };
  if (intent === "bye") return { answer: pickRandom(BYE_RESPONSES), type: "bye" };

  // Expand words with synonyms for broader matching
  const expandedWords = expandWithSynonyms(meaningfulWords);

  // Score all FAQ entries
  let bestEntry: FAQEntry | null = null;
  let bestScore = 0;
  let secondBest = 0;

  for (const entry of faqData) {
    const score = scoreEntry(normalized, meaningfulWords, expandedWords, entry);
    if (score > bestScore) {
      secondBest = bestScore;
      bestScore = score;
      bestEntry = entry;
    } else if (score > secondBest) {
      secondBest = score;
    }
  }

  // Only match if we have a clear winner above threshold
  if (bestEntry && bestScore >= MATCH_THRESHOLD) {
    return { answer: bestEntry.answer, type: "faq" };
  }

  // If score is close but below threshold, try a softer match
  // (single-word queries that clearly map to a topic)
  if (bestEntry && bestScore >= 8 && meaningfulWords.length <= 2) {
    return { answer: bestEntry.answer, type: "faq" };
  }

  // No FAQ match — see if the message loosely contains a social intent
  const looseIntent = checkLooseIntent(normalized);
  if (looseIntent === "greeting") return { answer: pickRandom(GREETING_RESPONSES), type: "greeting" };
  if (looseIntent === "thanks") return { answer: pickRandom(THANKS_RESPONSES), type: "thanks" };
  if (looseIntent === "bye") return { answer: pickRandom(BYE_RESPONSES), type: "bye" };

  return { answer: pickRandom(FALLBACK_RESPONSES), type: "fallback" };
}
