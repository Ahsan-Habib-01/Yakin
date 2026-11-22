import { useMemo } from "react";
import { Check, RotateCcw } from "lucide-react";
import { DHIKR_TARGET, GOALS, PRAYERS } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { readJSON } from "../hooks/useLocalStorage";
import { dayKey, useTracker, type TrackerData } from "../hooks/useTracker";
import { cn } from "../utils/cn";

export function TrackerView() {
  const { tr, pick, n, lang } = useApp();
  const { data, togglePrayer, toggleGoal, addDhikr, resetDhikr } = useTracker();

  // last 7 days of prayer completion (read-only summary)
  const week = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const stored = readJSON<TrackerData | null>(dayKey(d), null);
      const count = i === 6 ? data.prayers.length : (stored?.prayers.length ?? 0);
      return { label: d.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", { weekday: "short" }), count, today: i === 6 };
    });
  }, [data.prayers.length, lang]);

  const dhikrPct = Math.min(100, (data.dhikr / DHIKR_TARGET) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{tr("দৈনিক ইবাদত ট্র্যাকার", "Daily Ibadah Tracker")}</h1>
        <p className="mt-1 text-sm text-muted">{tr("আপনার অগ্রগতি এই ডিভাইসে সংরক্ষিত থাকে।", "Your progress is stored on this device.")}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Prayers */}
        <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{tr("পাঁচ ওয়াক্ত নামাজ", "Five Daily Prayers")}</h2>
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-white">
              {n(data.prayers.length)}/{n(5)}
            </span>
          </div>
          <ul className="space-y-2">
            {PRAYERS.map((p) => {
              const done = data.prayers.includes(p.id);
              return (
                <li key={p.id}>
                  <button
                    onClick={() => togglePrayer(p.id)}
                    aria-pressed={done}
                    className={cn("flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition", done ? "border-accent bg-accent-soft" : "border-line hover:bg-field")}
                  >
                    <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border-2", done ? "border-accent bg-accent text-white" : "border-line")}>{done && <Check size={14} strokeWidth={3} />}</span>
                    <span className="flex-1 font-semibold">{pick(p.name)}</span>
                    <span className="text-xs text-muted">{p.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="space-y-5">
          {/* Goals */}
          <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{tr("ইবাদত লক্ষ্য", "Ibadah Goals")}</h2>
              <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-white">
                {n(data.goals.length)}/{n(GOALS.length)}
              </span>
            </div>
            <ul className="space-y-2">
              {GOALS.map((g) => {
                const done = data.goals.includes(g.id);
                return (
                  <li key={g.id}>
                    <button onClick={() => toggleGoal(g.id)} aria-pressed={done} className={cn("flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition", done ? "border-accent bg-accent-soft" : "border-line hover:bg-field")}>
                      <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-md border-2", done ? "border-accent bg-accent text-white" : "border-line")}>{done && <Check size={12} strokeWidth={3} />}</span>
                      <span className={cn("flex-1", done && "text-muted line-through")}>{pick(g.name)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Dhikr counter */}
          <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">{tr("তাসবীহ কাউন্টার", "Tasbih Counter")}</h2>
              <button onClick={resetDhikr} aria-label={tr("রিসেট", "Reset")} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-field">
                <RotateCcw size={16} />
              </button>
            </div>
            <div className="flex items-center gap-5">
              <button
                onClick={addDhikr}
                aria-label={tr("গণনা করুন", "Count")}
                className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-3xl font-bold text-white shadow-lg transition active:scale-95"
              >
                {n(data.dhikr)}
              </button>
              <div className="flex-1">
                <p dir="rtl" lang="ar" className="font-arabic text-xl leading-[2.2]">
                  سُبْحَانَ اللَّهِ وَبِحَمْدِهِ
                </p>
                <p className="mb-1.5 text-xs text-muted">
                  {tr("লক্ষ্য", "Target")}: {n(DHIKR_TARGET)}
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${dhikrPct}%` }} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Weekly summary */}
      <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">{tr("গত ৭ দিনের নামাজ", "Prayers — last 7 days")}</h2>
        <div className="flex h-32 items-end justify-between gap-2">
          {week.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[11px] font-semibold text-muted">{n(d.count)}</span>
              <div className="flex h-20 w-full max-w-9 items-end rounded-lg bg-field">
                <div className={cn("w-full rounded-lg transition-all", d.today ? "bg-accent" : "bg-gold/70")} style={{ height: `${(d.count / 5) * 100}%` }} />
              </div>
              <span className={cn("text-[11px]", d.today ? "font-bold text-accent" : "text-muted")}>{d.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
