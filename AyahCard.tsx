import { useEffect, useRef, useState } from "react";
import { Bookmark, BookOpen, Copy, History, MoreVertical, Pause, Play } from "lucide-react";
import type { Ayah } from "../types";
import { useApp } from "../context/AppContext";
import { cn } from "../utils/cn";

interface Props {
  ayah: Ayah;
  surahId: number;
  active: boolean;
  playing: boolean;
  bookmarked: boolean;
  onSelect: () => void;
  onTogglePlay: () => void;
  onToggleBookmark: () => void;
  onCopy: () => void;
  onTafsir: () => void;
  onAsbab: () => void;
}

export function AyahCard({ ayah, surahId, active, playing, bookmarked, onSelect, onTogglePlay, onToggleBookmark, onCopy, onTafsir, onAsbab }: Props) {
  const { tr, lang, n } = useApp();
  const [menu, setMenu] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const item = (icon: React.ReactNode, label: string, fn: () => void, highlight = false) => (
    <button
      role="menuitem"
      onClick={() => {
        setMenu(false);
        fn();
      }}
      className={cn("flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-accent-soft", highlight && "text-accent")}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <article
      id={`ayah-${surahId}-${ayah.n}`}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative rounded-2xl border bg-card p-4 transition-all sm:p-5",
        active ? "border-accent bg-accent-soft shadow-md ring-1 ring-accent/50" : "border-line shadow-sm"
      )}
    >
      {/* header row */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("grid h-8 min-w-8 place-items-center rounded-full border px-2 text-xs font-bold", active ? "border-gold bg-gold text-white" : "border-gold/60 bg-gold-soft text-gold")}>
            {n(ayah.n)}
          </span>
          {active && playing && (
            <span className="flex h-4 items-end gap-0.5" aria-label={tr("চলছে", "Playing")}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-full w-0.5 origin-bottom animate-bar rounded-full bg-accent" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
          )}
          {bookmarked && <Bookmark size={15} className="fill-gold text-gold" aria-label={tr("বুকমার্ক করা", "Bookmarked")} />}
        </div>

        {/* 3-dot ayah menu */}
        <div ref={wrapRef} className="relative">
          <button
            onClick={() => setMenu((m) => !m)}
            aria-haspopup="menu"
            aria-expanded={menu}
            aria-label={tr("আয়াত মেনু", "Ayah menu")}
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-field hover:text-ink"
          >
            <MoreVertical size={19} />
          </button>
          {menu && (
            <div role="menu" className="animate-pop absolute right-0 top-10 z-30 w-60 overflow-hidden rounded-xl border border-line bg-card py-1 shadow-xl">
              {item(<BookOpen size={17} className="text-accent" />, tr("তাফসীর দেখুন", "Read Tafsir"), onTafsir)}
              {item(<History size={17} className="text-accent" />, tr("শানে নুযূল", "Asbab al-Nuzul"), onAsbab)}
              <div className="my-1 border-t border-line" />
              {item(
                <Bookmark size={17} className={bookmarked ? "fill-gold text-gold" : "text-accent"} />,
                bookmarked ? tr("বুকমার্ক সরান", "Remove Bookmark") : tr("বুকমার্ক", "Bookmark"),
                onToggleBookmark
              )}
              {item(<Copy size={17} className="text-accent" />, tr("কপি", "Copy"), onCopy)}
            </div>
          )}
        </div>
      </div>

      {/* Arabic + translation */}
      <div onClick={onSelect} className="cursor-pointer">
        <p dir="rtl" lang="ar" className="font-arabic text-[28px] leading-[2.2] text-ink sm:text-[32px]">
          {ayah.ar}
        </p>
        <p className="mt-3 border-t border-line pt-3 text-[15px] leading-relaxed text-ink/90 sm:text-base">{lang === "bn" ? ayah.bn : ayah.en}</p>
      </div>

      <button
        onClick={onTogglePlay}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted hover:border-accent hover:text-accent"
      >
        {active && playing ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
        {active && playing ? tr("থামান", "Pause") : tr("এই আয়াত শুনুন", "Play this ayah")}
      </button>
    </article>
  );
}
