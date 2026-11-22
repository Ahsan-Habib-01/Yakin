import { BadgeCheck, BookOpen, ScrollText } from "lucide-react";
import type { Reference } from "../types";
import { useApp } from "../context/AppContext";

export function ReferenceCard({ reference }: { reference: Reference }) {
  const { tr, pick, openDetail } = useApp();
  const isQuran = reference.kind === "quran";

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
      <header className="flex items-center justify-between gap-2 border-b border-line bg-field/60 px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2 text-xs font-semibold text-muted">
          {isQuran ? <BookOpen size={14} className="shrink-0 text-accent" /> : <ScrollText size={14} className="shrink-0 text-accent" />}
          <span className="truncate">{pick(reference.cite)}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
          <BadgeCheck size={13} />
          {isQuran ? tr("কোরআন", "Quran") : tr("সহীহ", "Sahih")}
        </span>
      </header>

      <div className="space-y-3 p-4">
        <p dir="rtl" lang="ar" className="font-arabic text-[22px] leading-[2.2] text-ink">
          {reference.ar}
        </p>
        <p className="text-sm leading-relaxed text-ink/90">{pick(reference.text)}</p>
        <button
          onClick={() =>
            openDetail({
              kind: "tafsir",
              title: pick(reference.cite),
              arabic: reference.ar,
              translation: pick(reference.text),
              body: pick(reference.explanation),
            })
          }
          className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
        >
          <BookOpen size={15} />
          {tr("তাফসীর দেখুন", "Read Tafsir")}
        </button>
      </div>
    </article>
  );
}
