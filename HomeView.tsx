import { useEffect, useState } from "react";
import { BookOpen, ChevronRight, Clock, Library, MapPin, ScrollText, Target } from "lucide-react";
import { BOOKS } from "../data/books";
import { CITY, GOALS, HADITHS, PRAYERS, SURAHS } from "../data/mockData";
import type { Tab } from "../types";
import { useApp } from "../context/AppContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTracker } from "../hooks/useTracker";
import { cn } from "../utils/cn";
import { LAST_READ_KEY } from "./QuranReader";
import { DEFAULT_PROGRESS, LAST_BOOK_KEY, PROGRESS_KEY } from "./LibraryView";

interface Props {
  onTab: (t: Tab) => void;
  onOpenBook: (id: string) => void;
}

function nextPrayer(now: Date) {
  const mins = now.getHours() * 60 + now.getMinutes();
  const upcoming = PRAYERS.find((p) => p.minutes > mins);
  const target = upcoming ?? PRAYERS[0];
  const diff = (target.minutes - mins + 24 * 60) % (24 * 60) || 24 * 60;
  return { prayer: target, diff };
}

export function HomeView({ onTab, onOpenBook }: Props) {
  const { tr, pick, n, lang } = useApp();
  const { data, togglePrayer } = useTracker();
  const [now, setNow] = useState(() => new Date());
  const [last] = useLocalStorage<{ surah: number; index: number }>(LAST_READ_KEY, { surah: 1, index: 0 });
  const [progress] = useLocalStorage<Record<string, number>>(PROGRESS_KEY, DEFAULT_PROGRESS);
  const [lastBookId] = useLocalStorage<string>(LAST_BOOK_KEY, "nawawi-40");

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 20000);
    return () => window.clearInterval(t);
  }, []);

  const { prayer, diff } = nextPrayer(now);
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  const countdown =
    lang === "bn"
      ? `${h ? `${n(h)} ঘণ্টা ` : ""}${n(m)} মিনিট পর`
      : `in ${h ? `${h}h ` : ""}${m}m`;

  const surah = SURAHS.find((s) => s.id === last.surah) ?? SURAHS[0];
  const ayahIdx = Math.min(last.index, surah.ayahs.length - 1);
  const book = BOOKS.find((b) => b.id === lastBookId) ?? BOOKS[0];
  const page = Math.min(progress[book.id] ?? 0, book.pages.length);
  const percent = Math.round((page / book.pages.length) * 100);
  const doneCount = data.prayers.length;
  const goalCount = data.goals.length;
  const featured = HADITHS[now.getDate() % HADITHS.length];

  const Card = ({
    icon: Icon,
    tone,
    title,
    line1,
    line2,
    bar,
    onClick,
  }: {
    icon: typeof BookOpen;
    tone: string;
    title: string;
    line1: string;
    line2?: string;
    bar?: number;
    onClick: () => void;
  }) => (
    <button onClick={onClick} className="group flex min-h-[168px] flex-col rounded-2xl border border-line bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md sm:p-5">
      <span className={cn("mb-3 grid h-10 w-10 place-items-center rounded-xl", tone)}>
        <Icon size={20} />
      </span>
      <h3 className="text-[15px] font-bold leading-snug">{title}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted sm:text-[13px]">{line1}</p>
      <div className="mt-auto pt-3">
        {bar !== undefined && (
          <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-gold" style={{ width: `${bar}%` }} />
          </div>
        )}
        <span className="flex items-center justify-between text-xs font-semibold text-accent">
          <span>{line2}</span>
          <ChevronRight size={16} className="transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="font-arabic text-xl leading-[2.2] text-accent" dir="rtl" lang="ar">
          السلام عليكم ورحمة الله
        </p>
        <h1 className="text-2xl font-bold sm:text-3xl">{tr("আজকের ইবাদত শুরু করুন", "Start today’s worship")}</h1>
      </div>

      {/* Next prayer + quick prayer tracker */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-slate-800 to-emerald-900 p-5 text-white shadow-lg sm:p-6" aria-label={tr("পরবর্তী নামাজ", "Next prayer")}>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-300">
              <Clock size={26} />
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                <MapPin size={13} />
                {pick(CITY)} • {tr("আনুমানিক সময়সূচি", "approx. timetable")}
              </p>
              <p className="text-xl font-bold sm:text-2xl">
                {pick(prayer.name)} <span className="font-medium text-white/80">{countdown}</span>
              </p>
              <p className="text-xs text-white/60">{prayer.label}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-3 md:min-w-[320px]">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
              <span className="text-white/80">{tr("আজকের নামাজ ট্র্যাকার", "Daily Prayer Tracker")}</span>
              <span className="rounded-full bg-gold px-2 py-0.5 text-white">
                {n(doneCount)}/{n(5)}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {PRAYERS.map((p) => {
                const done = data.prayers.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePrayer(p.id)}
                    aria-pressed={done}
                    aria-label={`${pick(p.name)}: ${done ? tr("সম্পন্ন", "done") : tr("বাকি", "pending")}`}
                    className={cn("flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold transition", done ? "bg-emerald-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/20")}
                  >
                    <span className={cn("grid h-5 w-5 place-items-center rounded-full border-2 text-[10px]", done ? "border-white bg-white text-emerald-600" : "border-white/40")}>{done && "✓"}</span>
                    {pick(p.name)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2x2 quick access */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4" aria-label={tr("দ্রুত অ্যাক্সেস", "Quick access")}>
        <Card
          icon={BookOpen}
          tone="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
          title={tr("কোরআন পড়া চালিয়ে যান", "Continue Reading Quran")}
          line1={`${pick(surah.name)} — ${tr("আয়াত", "Ayah")} ${n(ayahIdx + 1)} / ${n(surah.ayahs.length)}`}
          bar={((ayahIdx + 1) / surah.ayahs.length) * 100}
          line2={tr("পড়ুন", "Resume")}
          onClick={() => onTab("quran")}
        />
        <Card
          icon={Library}
          tone="bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
          title={tr("বই পড়া চালিয়ে যান", "Continue Reading Book")}
          line1={pick(book.title)}
          bar={percent}
          line2={tr(`${n(percent)}% পড়া হয়েছে`, `${percent}% read`)}
          onClick={() => onOpenBook(book.id)}
        />
        <Card
          icon={ScrollText}
          tone="bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400"
          title={tr("যাচাইকৃত হাদিস", "Verified Hadith")}
          line1={pick(featured.text)}
          line2={tr("সহীহ হাদিস দেখুন", "Browse Sahih hadith")}
          onClick={() => onTab("hadith")}
        />
        <Card
          icon={Target}
          tone="bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400"
          title={tr("দৈনিক ইবাদত লক্ষ্য", "Daily Ibadah Goals")}
          line1={tr(`${n(goalCount)}/${n(GOALS.length)} লক্ষ্য সম্পন্ন • ${n(doneCount)}/${n(5)} নামাজ`, `${goalCount}/${GOALS.length} goals done • ${doneCount}/5 prayers`)}
          bar={(goalCount / GOALS.length) * 100}
          line2={tr("ট্র্যাকার খুলুন", "Open tracker")}
          onClick={() => onTab("tracker")}
        />
      </section>
    </div>
  );
}
