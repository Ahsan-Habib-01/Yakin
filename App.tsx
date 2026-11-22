import { useCallback, useEffect, useRef, useState } from "react";
import { LogOut, MoonStar } from "lucide-react";
import type { Tab } from "./types";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { BottomNav } from "./components/BottomNav";
import { HomeView } from "./components/HomeView";
import { QuranReader, type QuranTarget } from "./components/QuranReader";
import { HadithView } from "./components/HadithView";
import { LibraryView, type LibraryTarget } from "./components/LibraryView";
import { TrackerView } from "./components/TrackerView";
import { FloatingAI } from "./components/FloatingAI";
import { SearchModal } from "./components/SearchModal";
import { DonationModal, type DonationMode } from "./components/DonationModal";

const EXIT_SHOWN_KEY = "ib:exit-modal-shown";

function Shell() {
  const { tr } = useApp();
  const [tab, setTab] = useState<Tab>("home");
  const [quranTarget, setQuranTarget] = useState<QuranTarget | null>(null);
  const [libraryTarget, setLibraryTarget] = useState<LibraryTarget | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [donation, setDonation] = useState<{ open: boolean; mode: DonationMode; nonce: number }>({ open: false, mode: "manual", nonce: 0 });
  const [left, setLeft] = useState(false);
  const exitArmed = useRef(true);

  const goTab = useCallback((t: Tab) => {
    setTab(t);
    window.scrollTo({ top: 0 });
  }, []);

  const showDonation = useCallback((mode: DonationMode) => {
    setDonation((d) => ({ open: true, mode, nonce: d.nonce + 1 }));
  }, []);

  /* Ctrl/⌘ + K opens search */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Exit-intent (desktop: pointer leaves through the top edge) — shown once per session */
  useEffect(() => {
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 0 || !exitArmed.current) return;
      try {
        if (sessionStorage.getItem(EXIT_SHOWN_KEY)) return;
        sessionStorage.setItem(EXIT_SHOWN_KEY, "1");
      } catch {
        /* ignore */
      }
      showDonation("exit");
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => document.documentElement.removeEventListener("mouseleave", onLeave);
  }, [showDonation]);

  /* beforeunload: the browser shows its own native "leave site?" prompt; custom UI is not allowed here */
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!exitArmed.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  const handleExit = () => {
    exitArmed.current = false;
    setDonation((d) => ({ ...d, open: false }));
    window.close(); // only works for script-opened windows / installed PWAs
    setLeft(true);
  };

  const returnToApp = () => {
    exitArmed.current = true;
    setLeft(false);
  };

  if (left) {
    return (
      <div className="grid min-h-screen place-items-center bg-app px-6 text-center">
        <div className="max-w-sm">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-navy text-emerald-400">
            <MoonStar size={32} />
          </span>
          <p dir="rtl" lang="ar" className="mt-4 font-arabic text-3xl leading-[2.2] text-accent">
            فِي أَمَانِ اللَّهِ
          </p>
          <h1 className="text-xl font-bold">{tr("আল্লাহ হাফেজ! আবার দেখা হবে ইনশাআল্লাহ।", "Allah Hafiz! See you again, in sha Allah.")}</h1>
          <p className="mt-2 text-sm text-muted">{tr("আপনি এখন ট্যাব বন্ধ করতে পারেন। আপনার সব অগ্রগতি সংরক্ষিত আছে।", "You may close this tab now. All your progress is saved.")}</p>
          <button onClick={returnToApp} className="mt-6 rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:brightness-110">
            {tr("অ্যাপে ফিরে যান", "Return to app")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app text-ink">
      <Navbar tab={tab} onTab={goTab} onSearch={() => setSearchOpen(true)} onDonate={() => showDonation("manual")} />

      <main className="mx-auto max-w-5xl px-4 py-6 pb-28 md:pb-10">
        {tab === "home" && (
          <HomeView
            onTab={goTab}
            onOpenBook={(id) => {
              setLibraryTarget({ bookId: id, nonce: Date.now() });
              goTab("library");
            }}
          />
        )}
        {tab === "quran" && <QuranReader target={quranTarget} />}
        {tab === "hadith" && <HadithView />}
        {tab === "library" && <LibraryView target={libraryTarget} />}
        {tab === "tracker" && <TrackerView />}
      </main>

      {tab !== "quran" && (
        <footer className="mx-auto max-w-5xl px-4 pb-28 pt-2 text-center text-xs text-muted md:pb-8">
          <p>{tr("সম্পূর্ণ ফ্রি ও বিজ্ঞাপনমুক্ত • নূর — ইসলামিক সঙ্গী", "Completely free & ad-free • Noor — Islamic Companion")}</p>
          <button
            onClick={() => showDonation("exit")}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-3 py-1.5 font-medium hover:border-accent hover:text-accent"
          >
            <LogOut size={13} />
            {tr("অ্যাপ ছাড়া সিমুলেট করুন (Simulate Exit)", "Simulate Exit / App Leave")}
          </button>
        </footer>
      )}

      <BottomNav tab={tab} onTab={goTab} />
      <FloatingAI />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenAyah={(surah, ayah) => {
          setQuranTarget({ surah, ayah, nonce: Date.now() });
          goTab("quran");
        }}
        onOpenHadith={() => goTab("hadith")}
        onOpenBook={(id) => {
          setLibraryTarget({ bookId: id, nonce: Date.now() });
          goTab("library");
        }}
      />

      <DonationModal
        key={donation.nonce}
        open={donation.open}
        mode={donation.mode}
        onStay={() => setDonation((d) => ({ ...d, open: false }))}
        onExit={handleExit}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
