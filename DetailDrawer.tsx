import { BookOpen, History, Lightbulb, X } from "lucide-react";
import type { DetailContent } from "../types";
import { useApp } from "../context/AppContext";
import { useEscape, useLockBodyScroll } from "../hooks/useLockBodyScroll";

interface Props {
  detail: DetailContent | null;
  onClose: () => void;
}

/** Shared drawer used for Tafsir, Shane Nuzul (Asbab al-Nuzul) and Hadith explanations. */
export function DetailDrawer({ detail, onClose }: Props) {
  const { tr } = useApp();
  useLockBodyScroll(!!detail);
  useEscape(!!detail, onClose);
  if (!detail) return null;

  const meta = {
    tafsir: { icon: BookOpen, label: tr("তাফসীর", "Tafsir") },
    asbab: { icon: History, label: tr("শানে নুযূল", "Asbab al-Nuzul") },
    sharh: { icon: Lightbulb, label: tr("ব্যাখ্যা", "Explanation") },
  }[detail.kind];
  const Icon = meta.icon;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={meta.label}>
      <button aria-label={tr("বন্ধ করুন", "Close")} onClick={onClose} className="animate-fade-in absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]" />
      <div className="animate-sheet-up absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-3xl border border-line bg-card shadow-2xl md:animate-side-in md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[460px] md:rounded-none md:rounded-l-3xl">
        <div className="flex items-center justify-between gap-3 rounded-t-3xl bg-navy px-5 py-4 text-white md:rounded-tl-3xl md:rounded-tr-none">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300">
              <Icon size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-300">{meta.label}</p>
              <h2 className="truncate text-base font-semibold">{detail.title}</h2>
            </div>
          </div>
          <button onClick={onClose} aria-label={tr("বন্ধ করুন", "Close")} className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {detail.subtitle && <p className="text-sm font-medium text-muted">{detail.subtitle}</p>}

          {detail.arabic && (
            <p dir="rtl" lang="ar" className="rounded-2xl bg-accent-soft p-4 text-center font-arabic text-2xl leading-[2.2] text-ink">
              {detail.arabic}
            </p>
          )}
          {detail.translation && <p className="text-[15px] leading-relaxed text-ink">{detail.translation}</p>}

          <div className="rounded-2xl border border-line p-4">
            <p className="whitespace-pre-line text-[15px] leading-[1.9] text-ink">{detail.body}</p>
          </div>

          <p className="rounded-xl bg-gold-soft px-4 py-3 text-xs leading-relaxed text-gold">
            {tr(
              "এটি সংক্ষিপ্ত সারসংক্ষেপ। বিস্তারিত জানতে নির্ভরযোগ্য তাফসীর গ্রন্থ ও যোগ্য আলেমের শরণাপন্ন হোন।",
              "This is a brief summary. For detail, consult reliable tafsir works and qualified scholars."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
