import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, MoreVertical, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type { AudioMode, Reciter } from "../types";
import { RECITERS } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { hasBanglaVoice } from "../hooks/useAyahPlayer";
import { cn } from "../utils/cn";

interface Props {
  index: number;
  total: number;
  playing: boolean;
  continuous: boolean;
  mode: AudioMode;
  reciter: Reciter;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
  onTogglePlay: () => void;
  onContinuous: (v: boolean) => void;
  onMode: (m: AudioMode) => void;
  onReciter: (id: string) => void;
}

/** Slim, ayah-by-ayah navigation bar — deliberately has NO time scrubber. */
export function PlayerBar(p: Props) {
  const { tr, pick, n } = useApp();
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

  const atFirst = p.index === 0;
  const atLast = p.index === p.total - 1;
  const ctl = "grid h-9 w-9 place-items-center rounded-full text-slate-200 transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent";

  const Radio = ({ checked, label, sub, onClick }: { checked: boolean; label: string; sub?: string; onClick: () => void }) => (
    <button role="menuitemradio" aria-checked={checked} onClick={onClick} className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left hover:bg-accent-soft">
      <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2", checked ? "border-accent bg-accent text-white" : "border-line")}>
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
      <span className="text-sm leading-snug">
        {label}
        {sub && <span className="block text-xs text-muted">{sub}</span>}
      </span>
    </button>
  );

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 md:bottom-0" role="region" aria-label={tr("আয়াত প্লেয়ার", "Ayah player")}>
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-1 rounded-t-2xl border border-b-0 border-white/10 bg-navy px-3 text-white shadow-[0_-6px_24px_rgba(15,23,42,0.35)] md:px-5">
        {/* current ayah indicator */}
        <div className="min-w-[72px] leading-tight">
          <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-300">{p.playing ? tr("চলছে", "Playing") : tr("আয়াত", "Ayah")}</p>
          <p className="whitespace-nowrap text-sm font-semibold">
            {tr("আয়াত", "Ayah")} {n(p.index + 1)} / {n(p.total)}
          </p>
        </div>

        {/* transport controls */}
        <div className="flex items-center gap-0.5 sm:gap-1.5">
          <button className={ctl} onClick={p.onFirst} disabled={atFirst} aria-label={tr("প্রথম আয়াতে যান", "Jump to first ayah")} title={tr("প্রথম আয়াত", "First ayah")}>
            <SkipBack size={17} className="fill-current" />
          </button>
          <button className={ctl} onClick={p.onPrev} disabled={atFirst} aria-label={tr("আগের আয়াত", "Previous ayah")} title={tr("আগের আয়াত", "Previous ayah")}>
            <Play size={15} className="rotate-180 fill-current" />
          </button>
          <button
            onClick={p.onTogglePlay}
            aria-label={p.playing ? tr("থামান", "Pause") : tr("চালান", "Play")}
            className="mx-1 grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white shadow-md transition hover:bg-emerald-400 active:scale-95"
          >
            {p.playing ? <Pause size={18} className="fill-current" /> : <Play size={18} className="ml-0.5 fill-current" />}
          </button>
          <button className={ctl} onClick={p.onNext} disabled={atLast} aria-label={tr("পরের আয়াত", "Next ayah")} title={tr("পরের আয়াত", "Next ayah")}>
            <Play size={15} className="fill-current" />
          </button>
          <button className={ctl} onClick={p.onLast} disabled={atLast} aria-label={tr("শেষ আয়াতে যান", "Jump to last ayah")} title={tr("শেষ আয়াত", "Last ayah")}>
            <SkipForward size={17} className="fill-current" />
          </button>
        </div>

        {/* 3-dot settings */}
        <div ref={wrapRef} className="relative flex min-w-[72px] justify-end">
          <button onClick={() => setMenu((m) => !m)} aria-haspopup="menu" aria-expanded={menu} aria-label={tr("প্লেয়ার সেটিংস", "Player settings")} className={cn(ctl, menu && "bg-white/10")}>
            <MoreVertical size={19} />
          </button>

          {menu && (
            <div role="menu" className="animate-pop absolute bottom-12 right-0 z-50 max-h-[70vh] w-[min(20rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-line bg-card p-3 text-ink shadow-2xl">
              {/* continuous toggle */}
              <button
                role="menuitemcheckbox"
                aria-checked={p.continuous}
                onClick={() => p.onContinuous(!p.continuous)}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left hover:bg-accent-soft"
              >
                <span className="text-sm leading-snug">
                  <span className="font-semibold">{tr("ধারাবাহিক আয়াত-বাই-আয়াত প্লেব্যাক", "Continuous Ayah-by-Ayah Playback")}</span>
                  <span className="block text-xs text-muted">{tr("এক আয়াত শেষ হলে স্বয়ংক্রিয়ভাবে পরেরটি", "Auto-advance to the next ayah")}</span>
                </span>
                <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", p.continuous ? "bg-accent" : "bg-slate-300 dark:bg-slate-600")}>
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", p.continuous ? "left-[22px]" : "left-0.5")} />
                </span>
              </button>

              <div className="my-2 border-t border-line" />
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{tr("অডিও মোড", "Audio Mode")}</p>
              <Radio checked={p.mode === "ar"} label={tr("শুধু আরবি তিলাওয়াত", "Arabic Only")} sub={tr("(Arabic Only)", "Recitation only")} onClick={() => p.onMode("ar")} />
              <Radio
                checked={p.mode === "ar-bn"}
                label={tr("আরবি + বাংলা অনুবাদ ভয়েস", "Arabic + Bangla Voice")}
                sub={tr("(Arabic + Bangla Voice)", "Bangla translation read aloud")}
                onClick={() => p.onMode("ar-bn")}
              />
              {p.mode === "ar-bn" && !hasBanglaVoice() && (
                <p className="mx-2 mt-1 flex items-start gap-1.5 rounded-lg bg-gold-soft px-2.5 py-2 text-xs text-gold">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  {tr("এই ডিভাইসে বাংলা ভয়েস পাওয়া যায়নি; শুধু আরবি চলবে।", "No Bangla voice found on this device; only Arabic will play.")}
                </p>
              )}

              <div className="my-2 border-t border-line" />
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{tr("ক্বারী নির্বাচন", "Reciter (Qari)")}</p>
              {RECITERS.map((r) => (
                <Radio key={r.id} checked={p.reciter.id === r.id} label={pick(r.name)} onClick={() => p.onReciter(r.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
