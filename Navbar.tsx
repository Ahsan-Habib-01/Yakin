import { BookOpen, Heart, Home, Library, Moon, MoonStar, ScrollText, Search, Sun, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Tab } from "../types";
import { useApp } from "../context/AppContext";
import { cn } from "../utils/cn";

export function useNavItems(): { id: Tab; label: string; icon: LucideIcon }[] {
  const { tr } = useApp();
  return [
    { id: "home", label: tr("হোম", "Home"), icon: Home },
    { id: "quran", label: tr("কোরআন", "Quran"), icon: BookOpen },
    { id: "hadith", label: tr("হাদিস", "Hadith"), icon: ScrollText },
    { id: "library", label: tr("বই", "Library"), icon: Library },
    { id: "tracker", label: tr("ট্র্যাকার", "Tracker"), icon: Target },
  ];
}

interface Props {
  tab: Tab;
  onTab: (t: Tab) => void;
  onSearch: () => void;
  onDonate: () => void;
}

export function Navbar({ tab, onTab, onSearch, onDonate }: Props) {
  const { lang, setLang, dark, toggleDark, tr } = useApp();
  const items = useNavItems();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:px-5 md:h-16">
        {/* Left: logo + name */}
        <button onClick={() => onTab("home")} className="flex shrink-0 items-center gap-2.5" aria-label={tr("নূর — হোমে যান", "Noor — go home")}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white shadow-inner">
            <MoonStar size={20} />
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-base font-bold tracking-tight">{tr("নূর", "Noor")}</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-300">{tr("ইসলামিক সঙ্গী", "Islamic Companion")}</span>
          </span>
        </button>

        {/* Center: desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label={tr("প্রধান মেনু", "Main navigation")}>
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTab(id)}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                tab === id ? "bg-emerald-500/20 text-emerald-300" : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button onClick={onSearch} aria-label={tr("সার্চ", "Search")} title="Ctrl/⌘ + K" className="grid h-9 w-9 place-items-center rounded-lg text-slate-200 hover:bg-white/10">
            <Search size={18} />
          </button>

          <button
            onClick={onDonate}
            aria-label={tr("ডোনেট করুন", "Donate")}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-gold px-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 sm:px-3.5"
          >
            <Heart size={16} className="fill-white/90" />
            <span className="hidden sm:inline">{tr("ডোনেট করুন", "Donate")}</span>
          </button>

          <div className="flex h-9 items-center rounded-lg bg-white/10 p-0.5 text-xs font-semibold" role="group" aria-label={tr("ভাষা", "Language")}>
            <button onClick={() => setLang("bn")} aria-pressed={lang === "bn"} className={cn("rounded-md px-2 py-1.5 transition", lang === "bn" ? "bg-emerald-500 text-white" : "text-slate-300 hover:text-white")}>
              বাংলা
            </button>
            <button onClick={() => setLang("en")} aria-pressed={lang === "en"} className={cn("rounded-md px-2 py-1.5 transition", lang === "en" ? "bg-emerald-500 text-white" : "text-slate-300 hover:text-white")}>
              EN
            </button>
          </div>

          <button onClick={toggleDark} aria-label={dark ? tr("লাইট মোড", "Light mode") : tr("ডার্ক মোড", "Dark mode")} className="grid h-9 w-9 place-items-center rounded-lg text-slate-200 hover:bg-white/10">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
