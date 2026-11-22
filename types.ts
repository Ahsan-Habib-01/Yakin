export type Lang = "bn" | "en";
export type Tab = "home" | "quran" | "hadith" | "library" | "tracker";

/** Bilingual string */
export interface Bi {
  bn: string;
  en: string;
}

export interface Ayah {
  n: number;
  ar: string;
  bn: string;
  en: string;
  tafsir: Bi;
  asbab: Bi;
}

export interface Surah {
  id: number;
  ar: string;
  name: Bi;
  meaning: Bi;
  revelation: Bi;
  intro: Bi;
  ayahs: Ayah[];
}

export interface Hadith {
  id: string;
  ar: string;
  text: Bi;
  narrator: Bi;
  source: Bi;
  explanation: Bi;
}

/** A verified reference returned by the AI Reference Assistant */
export interface Reference {
  id: string;
  kind: "quran" | "hadith";
  ar: string;
  text: Bi;
  cite: Bi;
  explanation: Bi;
}

export interface BookPage {
  heading: string;
  ar?: string;
  text: string;
}

export interface Book {
  id: string;
  title: Bi;
  author: Bi;
  lang: Lang;
  license: Bi;
  description: Bi;
  gradient: string;
  glyph: string;
  pages: BookPage[];
}

export interface Reciter {
  id: string;
  name: Bi;
  /** folder name on everyayah.com */
  folder: string;
}

export type AudioMode = "ar" | "ar-bn";

export interface DetailContent {
  kind: "tafsir" | "asbab" | "sharh";
  title: string;
  subtitle?: string;
  arabic?: string;
  translation?: string;
  body: string;
}
