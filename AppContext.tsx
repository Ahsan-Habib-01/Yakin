import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import type { Bi, DetailContent, Lang } from "../types";
import { DetailDrawer } from "../components/DetailDrawer";

interface AppContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  toggleDark: () => void;
  /** pick between a Bangla and English literal */
  tr: (bn: string, en: string) => string;
  /** pick from a bilingual object */
  pick: (b: Bi) => string;
  /** localise digits (Bangla numerals when বাংলা is active) */
  n: (x: number | string) => string;
  toast: (message: string) => void;
  openDetail: (d: DetailContent) => void;
}

const Ctx = createContext<AppContextValue | null>(null);

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function readLang(): Lang {
  try {
    const v = localStorage.getItem("ib:lang");
    if (v === "bn" || v === "en") return v;
  } catch {
    /* ignore */
  }
  return "bn";
}

function readDark(): boolean {
  try {
    const v = localStorage.getItem("ib:dark");
    if (v !== null) return v === "1";
  } catch {
    /* ignore */
  }
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);
  const [dark, setDark] = useState<boolean>(readDark);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [detail, setDetail] = useState<DetailContent | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("ib:lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#162033" : "#1E293B");
    try {
      localStorage.setItem("ib:dark", dark ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [dark]);

  const toast = useCallback((m: string) => {
    setToastMsg(m);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 2200);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      dark,
      toggleDark: () => setDark((d) => !d),
      tr: (bn, en) => (lang === "bn" ? bn : en),
      pick: (b) => b[lang],
      n: (x) => (lang === "bn" ? String(x).replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : String(x)),
      toast,
      openDetail: setDetail,
    }),
    [lang, dark, toast]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <DetailDrawer detail={detail} onClose={() => setDetail(null)} />
      {toastMsg && (
        <div
          role="status"
          className="animate-pop fixed bottom-36 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-medium text-white shadow-lg md:bottom-24"
        >
          <Check size={16} className="text-emerald-400" />
          {toastMsg}
        </div>
      )}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside <AppProvider>");
  return v;
}
