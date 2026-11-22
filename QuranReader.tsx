import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { RECITERS, SURAHS } from "../data/mockData";
import type { AudioMode } from "../types";
import { useApp } from "../context/AppContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAyahPlayer } from "../hooks/useAyahPlayer";
import { cn } from "../utils/cn";
import { AyahCard } from "./AyahCard";
import { PlayerBar } from "./PlayerBar";

export interface QuranTarget {
  surah: number;
  ayah: number;
  nonce: number;
}

interface Settings {
  continuous: boolean;
  mode: AudioMode;
  reciter: string;
}

export const LAST_READ_KEY = "ib:quran:last";

export function QuranReader({ target }: { target: QuranTarget | null }) {
  const { tr, pick, n, openDetail, toast } = useApp();
  const [last, setLast] = useLocalStorage<{ surah: number; index: number }>(LAST_READ_KEY, { surah: 1, index: 0 });
  const [settings, setSettings] = useLocalStorage<Settings>("ib:quran:settings", { continuous: true, mode: "ar", reciter: "alafasy" });
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("ib:bookmarks", []);
  const [playing, setPlaying] = useState(false);

  const surah = SURAHS.find((s) => s.id === last.surah) ?? SURAHS[0];
  const index = Math.min(last.index, surah.ayahs.length - 1);
  const reciter = RECITERS.find((r) => r.id === settings.reciter) ?? RECITERS[0];

  const setIndex = (i: number) => setLast({ surah: surah.id, index: i });

  // jump from global search
  useEffect(() => {
    if (!target) return;
    const s = SURAHS.find((x) => x.id === target.surah);
    if (!s) return;
    setPlaying(false);
    setLast({ surah: s.id, index: Math.max(0, Math.min(target.ayah - 1, s.ayahs.length - 1)) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.nonce]);

  useAyahPlayer({
    playing,
    setPlaying,
    surahId: surah.id,
    ayahs: surah.ayahs,
    index,
    setIndex,
    continuous: settings.continuous,
    mode: settings.mode,
    reciter,
  });

  // keep the current ayah in view (skip the very first render at ayah 1)
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current && index === 0) {
      mounted.current = true;
      return;
    }
    mounted.current = true;
    const el = document.getElementById(`ayah-${surah.id}-${surah.ayahs[index].n}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surah.id, index, target?.nonce]);

  const selectSurah = (id: number) => {
    setPlaying(false);
    setLast({ surah: id, index: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goto = (i: number) => setIndex(Math.max(0, Math.min(i, surah.ayahs.length - 1)));
  const bmKey = (ayahN: number) => `${surah.id}:${ayahN}`;
  const surahName = pick(surah.name);

  const copyAyah = async (ayahN: number) => {
    const a = surah.ayahs[ayahN - 1];
    const text = `${a.ar}\n\n${tr(a.bn, a.en)}\n— ${surahName} ${surah.id}:${a.n}`;
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
    toast(tr("আয়াত কপি হয়েছে", "Ayah copied"));
  };

  const progress = ((index + 1) / surah.ayahs.length) * 100;

  return (
    <div className="pb-36 md:pb-28">
      {/* Surah picker */}
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4" role="tablist" aria-label={tr("সূরা নির্বাচন", "Select surah")}>
        {SURAHS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === surah.id}
            onClick={() => selectSurah(s.id)}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2.5 text-left transition",
              s.id === surah.id ? "border-accent bg-accent text-white shadow" : "border-line bg-card hover:border-accent"
            )}
          >
            <span className={cn("grid h-7 w-7 place-items-center rounded-full text-xs font-bold", s.id === surah.id ? "bg-white/20" : "bg-gold-soft text-gold")}>{n(s.id)}</span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">{pick(s.name)}</span>
              <span className={cn("block text-[11px]", s.id === surah.id ? "text-white/80" : "text-muted")}>
                {pick(s.meaning)} • {n(s.ayahs.length)} {tr("আয়াত", "ayahs")}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Surah header */}
      <section className="relative mb-5 overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-slate-800 to-emerald-900 p-6 text-center text-white shadow-lg">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[18px] border-white/5" />
        <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full border-[16px] border-emerald-400/10" />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/90 px-3 py-0.5 text-xs font-bold">
          <MapPin size={12} />
          {pick(surah.revelation)} • {n(surah.ayahs.length)} {tr("আয়াত", "ayahs")}
        </span>
        <h1 className="mt-3 font-arabic text-5xl leading-[2.2]" dir="rtl" lang="ar">
          {surah.ar}
        </h1>
        <p className="text-lg font-semibold">
          {surahName} <span className="font-normal text-white/70">— {pick(surah.meaning)}</span>
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/75">{pick(surah.intro)}</p>

        <div className="mx-auto mt-4 max-w-xs">
          <div className="mb-1 flex justify-between text-[11px] font-medium text-white/70">
            <span>{tr("পড়ার অগ্রগতি", "Reading progress")}</span>
            <span>
              {n(index + 1)} / {n(surah.ayahs.length)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      {/* Ayahs */}
      <div className="space-y-4">
        {surah.ayahs.map((a, i) => (
          <AyahCard
            key={`${surah.id}-${a.n}`}
            ayah={a}
            surahId={surah.id}
            active={i === index}
            playing={playing}
            bookmarked={bookmarks.includes(bmKey(a.n))}
            onSelect={() => setIndex(i)}
            onTogglePlay={() => {
              if (i === index) setPlaying((p) => !p);
              else {
                setIndex(i);
                setPlaying(true);
              }
            }}
            onToggleBookmark={() => {
              const k = bmKey(a.n);
              const has = bookmarks.includes(k);
              setBookmarks(has ? bookmarks.filter((x) => x !== k) : [...bookmarks, k]);
              toast(has ? tr("বুকমার্ক সরানো হয়েছে", "Bookmark removed") : tr("বুকমার্ক করা হয়েছে", "Ayah bookmarked"));
            }}
            onCopy={() => copyAyah(a.n)}
            onTafsir={() =>
              openDetail({
                kind: "tafsir",
                title: `${surahName} ${n(surah.id)}:${n(a.n)}`,
                subtitle: tr("তাফসীরের সংক্ষিপ্ত সারসংক্ষেপ", "Brief tafsir summary"),
                arabic: a.ar,
                translation: tr(a.bn, a.en),
                body: pick(a.tafsir),
              })
            }
            onAsbab={() =>
              openDetail({
                kind: "asbab",
                title: `${surahName} ${n(surah.id)}:${n(a.n)}`,
                subtitle: tr(`সূরা ${surah.name.bn} — ${pick(surah.revelation)}`, `Surah ${surah.name.en} — ${pick(surah.revelation)}`),
                arabic: a.ar,
                translation: tr(a.bn, a.en),
                body: pick(a.asbab),
              })
            }
          />
        ))}
      </div>

      <PlayerBar
        index={index}
        total={surah.ayahs.length}
        playing={playing}
        continuous={settings.continuous}
        mode={settings.mode}
        reciter={reciter}
        onFirst={() => goto(0)}
        onPrev={() => goto(index - 1)}
        onNext={() => goto(index + 1)}
        onLast={() => goto(surah.ayahs.length - 1)}
        onTogglePlay={() => setPlaying((p) => !p)}
        onContinuous={(v) => setSettings({ ...settings, continuous: v })}
        onMode={(m) => setSettings({ ...settings, mode: m })}
        onReciter={(id) => setSettings({ ...settings, reciter: id })}
      />
    </div>
  );
}
