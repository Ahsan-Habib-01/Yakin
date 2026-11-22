import { useMemo, useState } from "react";
import { BadgeCheck, Copy, Lightbulb, Search } from "lucide-react";
import { HADITHS } from "../data/mockData";
import { useApp } from "../context/AppContext";

export function HadithView() {
  const { tr, pick, openDetail, toast } = useApp();
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return HADITHS;
    return HADITHS.filter((h) => [h.text.bn, h.text.en, h.ar, h.source.bn, h.source.en, h.narrator.bn, h.narrator.en].some((f) => f.toLowerCase().includes(t)));
  }, [q]);

  const copy = async (id: string) => {
    const h = HADITHS.find((x) => x.id === id)!;
    const text = `${h.ar}\n\n${pick(h.text)}\n— ${pick(h.narrator)} | ${pick(h.source)}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast(tr("হাদিস কপি হয়েছে", "Hadith copied"));
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold sm:text-3xl">{tr("যাচাইকৃত হাদিস", "Verified Hadith")}</h1>
        <p className="mt-1 text-sm text-muted">{tr("শুধুমাত্র সহীহ বুখারী ও সহীহ মুসলিমের রেফারেন্সসহ হাদিস।", "Hadith with references from Sahih al-Bukhari and Sahih Muslim only.")}</p>
      </div>

      <label className="relative mb-5 block">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tr("হাদিস খুঁজুন…", "Search hadith…")}
          className="h-12 w-full rounded-xl border border-line bg-card pl-11 pr-4 text-sm outline-none focus:border-accent"
        />
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((h) => (
          <article key={h.id} className="flex flex-col rounded-2xl border border-line bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                <BadgeCheck size={13} />
                {tr("সহীহ", "Sahih")}
              </span>
              <span className="truncate text-xs font-medium text-muted">{pick(h.source)}</span>
            </div>
            <p dir="rtl" lang="ar" className="font-arabic text-2xl leading-[2.2]">
              {h.ar}
            </p>
            <p className="mt-3 border-t border-line pt-3 text-[15px] leading-relaxed">{pick(h.text)}</p>
            <p className="mt-2 text-xs font-medium text-gold">{tr("বর্ণনাকারী", "Narrated by")}: {pick(h.narrator)}</p>
            <div className="mt-4 flex gap-2 pt-1">
              <button
                onClick={() => openDetail({ kind: "sharh", title: pick(h.source), arabic: h.ar, translation: pick(h.text), body: pick(h.explanation), subtitle: `${tr("বর্ণনাকারী", "Narrated by")}: ${pick(h.narrator)}` })}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent hover:bg-accent hover:text-white"
              >
                <Lightbulb size={15} />
                {tr("ব্যাখ্যা", "Explanation")}
              </button>
              <button onClick={() => copy(h.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-muted hover:bg-field">
                <Copy size={15} />
                {tr("কপি", "Copy")}
              </button>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="py-12 text-center text-sm text-muted">{tr("কোনো হাদিস পাওয়া যায়নি।", "No hadith found.")}</p>}
    </div>
  );
}
