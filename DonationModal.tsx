import { useState } from "react";
import { Check, Copy, Heart, LogOut, X } from "lucide-react";
import { DONATION_INFO } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useEscape, useLockBodyScroll } from "../hooks/useLockBodyScroll";

export type DonationMode = "manual" | "exit";

interface Props {
  open: boolean;
  mode: DonationMode;
  onStay: () => void;
  onExit: () => void;
}

export function DonationModal({ open, mode, onStay, onExit }: Props) {
  const { tr, toast } = useApp();
  const [showInfo, setShowInfo] = useState(false);
  useLockBodyScroll(open);
  useEscape(open, onStay);

  if (!open) return null;

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value.replace(/-/g, ""));
      toast(tr("নম্বর কপি হয়েছে", "Number copied"));
    } catch {
      toast(value);
    }
  };

  const NumberRow = ({ name, color, value }: { name: string; color: string; value: string }) => (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-field px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg text-sm font-extrabold text-white" style={{ background: color }}>
          {name[0]}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold">{name}</p>
          <p className="font-mono text-sm text-muted">{value}</p>
        </div>
      </div>
      <button onClick={() => copy(value)} aria-label={tr("কপি", "Copy")} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-card hover:text-accent">
        <Copy size={16} />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="donate-title">
      <button aria-label={tr("অ্যাপে থাকুন", "Stay")} onClick={onStay} className="animate-fade-in absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      <div className="animate-pop relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-card shadow-2xl">
        <div className="relative bg-gradient-to-br from-navy to-emerald-900 px-6 pb-6 pt-7 text-center text-white">
          <button onClick={onStay} aria-label={tr("বন্ধ করুন", "Close")} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full hover:bg-white/10">
            <X size={18} />
          </button>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold shadow-lg">
            <Heart size={26} className="fill-white" />
          </span>
          <h2 id="donate-title" className="mt-3 text-xl font-bold">
            {mode === "exit" ? tr("যাওয়ার আগে একটু সময়…", "Before you go…") : tr("সদকায়ে জারিয়ায় অংশ নিন", "Join in a continuing charity")}
          </h2>
          <p dir="rtl" lang="ar" className="font-arabic text-lg leading-[2.2] text-amber-200">
            جَزَاكَ اللَّهُ خَيْرًا
          </p>
        </div>

        <div className="space-y-4 p-6">
          <p className="text-center text-[15px] leading-relaxed">
            {tr(
              "এই প্ল্যাটফর্মটি সম্পূর্ণ ফ্রি ও বিজ্ঞাপনমুক্ত। ডোমেইন, সার্ভার ও AI আপডেটের জন্য আপনার সামর্থ্য অনুযায়ী সহযোগিতা করতে পারেন।",
              "This platform is completely free and ad-free. You may support the domain, server and AI update costs according to your means."
            )}
          </p>

          {showInfo && (
            <div className="animate-fade-in space-y-2">
              <NumberRow name="bKash" color="#E2136E" value={DONATION_INFO.bkash} />
              <NumberRow name="Nagad" color="#F6921E" value={DONATION_INFO.nagad} />
              <p className="px-1 text-xs text-muted">{tr(DONATION_INFO.note.bn, DONATION_INFO.note.en)}</p>
            </div>
          )}

          <div className="space-y-2.5">
            <button
              onClick={() => setShowInfo((s) => !s)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-[15px] font-bold text-white shadow-sm transition hover:brightness-110"
            >
              {showInfo ? <Check size={18} /> : <Heart size={18} className="fill-white/90" />}
              {tr("ডোনেট করুন (bKash / Nagad info)", "Donate (bKash / Nagad info)")}
            </button>
            <div className={mode === "exit" ? "grid grid-cols-2 gap-2.5" : ""}>
              <button onClick={onStay} className="w-full rounded-xl bg-accent px-4 py-3 text-[15px] font-semibold text-white transition hover:brightness-110">
                {tr("অ্যাপে থাকুন (Stay)", "Stay in the app")}
              </button>
              {mode === "exit" && (
                <button onClick={onExit} className="flex w-full items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 text-[15px] font-semibold text-muted transition hover:bg-field">
                  <LogOut size={16} />
                  {tr("বের হন (Exit)", "Exit")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
