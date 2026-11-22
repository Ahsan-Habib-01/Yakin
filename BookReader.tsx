import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import type { Book } from "../types";
import { useApp } from "../context/AppContext";
import { useEscape, useLockBodyScroll } from "../hooks/useLockBodyScroll";

interface Props {
  book: Book;
  page: number;
  onPage: (p: number) => void;
  onClose: () => void;
}

const SIZES = [15, 17, 19, 22];

/** Built-in reader. Every page turn immediately persists progress through onPage. */
export function BookReader({ book, page, onPage, onClose }: Props) {
  const { tr, pick, n } = useApp();
  const total = book.pages.length;
  const [size, setSize] = useState(1);
  useLockBodyScroll(true);
  useEscape(true, onClose);

  const current = Math.min(Math.max(page, 1), total);
  const content = book.pages[current - 1];
  const percent = Math.round((current / total) * 100);

  useEffect(() => {
    // opening the reader on an unstarted book records page 1 as the starting point
    if (page < 1) onPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onPage(Math.min(total, current + 1));
      if (e.key === "ArrowLeft") onPage(Math.max(1, current - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, total, onPage]);

  const bodyFont = book.lang === "bn" ? "font-bn" : "font-en";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={pick(book.title)}>
      <button aria-label={tr("বন্ধ করুন", "Close")} onClick={onClose} className="animate-fade-in absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
      <div className="animate-sheet-up relative flex h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-card shadow-2xl sm:h-[88vh] sm:rounded-3xl">
        <header className="flex shrink-0 items-center justify-between gap-3 bg-navy px-4 py-3 text-white">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold sm:text-base">{pick(book.title)}</h2>
            <p className="text-xs text-emerald-300">
              {tr("পৃষ্ঠা", "Page")} {n(current)} / {n(total)} • {n(percent)}%
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button onClick={() => setSize((s) => Math.max(0, s - 1))} disabled={size === 0} aria-label={tr("ছোট লেখা", "Smaller text")} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10 disabled:opacity-30">
              <Minus size={16} />
            </button>
            <span className="text-xs font-bold">Aa</span>
            <button onClick={() => setSize((s) => Math.min(SIZES.length - 1, s + 1))} disabled={size === SIZES.length - 1} aria-label={tr("বড় লেখা", "Larger text")} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10 disabled:opacity-30">
              <Plus size={16} />
            </button>
            <button onClick={onClose} aria-label={tr("বন্ধ করুন", "Close")} className="ml-1 grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="h-1 shrink-0 bg-line">
          <div className="h-full bg-gold transition-all" style={{ width: `${percent}%` }} />
        </div>

        <article key={current} className="animate-fade-in flex-1 overflow-y-auto px-6 py-8 sm:px-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
            {tr("অধ্যায়", "Section")} {n(current)}
          </p>
          <h3 className={`${bodyFont} mb-6 text-2xl font-bold leading-snug`}>{content.heading}</h3>
          {content.ar && (
            <p dir="rtl" lang="ar" className="mb-6 rounded-2xl bg-accent-soft px-4 py-3 text-center font-arabic text-[26px] leading-[2.2]">
              {content.ar}
            </p>
          )}
          <p className={`${bodyFont} leading-[2]`} style={{ fontSize: SIZES[size] }}>
            {content.text}
          </p>
        </article>

        <footer className="shrink-0 border-t border-line bg-card px-4 py-3">
          <input
            type="range"
            min={1}
            max={total}
            value={current}
            onChange={(e) => onPage(Number(e.target.value))}
            aria-label={tr("পৃষ্ঠা নির্বাচন", "Select page")}
            className="mb-3 w-full"
          />
          <div className="flex items-center justify-between gap-3">
            <button onClick={() => onPage(current - 1)} disabled={current <= 1} className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-line text-sm font-semibold hover:bg-field disabled:opacity-35">
              <ChevronLeft size={18} />
              {tr("আগের পৃষ্ঠা", "Previous")}
            </button>
            <button onClick={() => onPage(current + 1)} disabled={current >= total} className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent text-sm font-semibold text-white hover:brightness-110 disabled:opacity-35">
              {tr("পরের পৃষ্ঠা", "Next")}
              <ChevronRight size={18} />
            </button>
          </div>
          {current === total && <p className="mt-2 text-center text-xs font-medium text-accent">{tr("মাশাআল্লাহ! আপনি বইটি শেষ করেছেন।", "MashaAllah! You have finished this book.")}</p>}
        </footer>
      </div>
    </div>
  );
}
