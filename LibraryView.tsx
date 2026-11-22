import { useEffect, useState } from "react";
import { BookMarked, CheckCircle2, Languages } from "lucide-react";
import { BOOKS } from "../data/books";
import { useApp } from "../context/AppContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BookReader } from "./BookReader";

export const PROGRESS_KEY = "ib:library:progress";
export const LAST_BOOK_KEY = "ib:library:last";
/** Demo state for a first-time visitor so the progress UI is visible immediately */
export const DEFAULT_PROGRESS: Record<string, number> = { "nawawi-40": 4, "namaz-shikkha": 2 };

export interface LibraryTarget {
  bookId: string;
  nonce: number;
}

export function LibraryView({ target }: { target: LibraryTarget | null }) {
  const { tr, pick, n, lang } = useApp();
  const [progress, setProgress] = useLocalStorage<Record<string, number>>(PROGRESS_KEY, DEFAULT_PROGRESS);
  const [, setLastBook] = useLocalStorage<string>(LAST_BOOK_KEY, "nawawi-40");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (target) setOpenId(target.bookId);
  }, [target]);

  const openBook = (id: string) => {
    setLastBook(id);
    setOpenId(id);
  };

  const setPage = (id: string, page: number) => {
    const total = BOOKS.find((b) => b.id === id)!.pages.length;
    setProgress((p) => ({ ...p, [id]: Math.min(Math.max(page, 1), total) }));
    setLastBook(id);
  };

  const openBookData = BOOKS.find((b) => b.id === openId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{tr("ইসলামিক বইয়ের লাইব্রেরি", "Islamic Book Library")}</h1>
        <p className="mt-1 text-sm text-muted">
          {tr("ফ্রি ও পাবলিক ডোমেইন বই। আপনার পড়ার অগ্রগতি এই ডিভাইসে স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়।", "Free and public-domain books. Your reading progress is saved automatically on this device.")}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {BOOKS.map((book) => {
          const total = book.pages.length;
          const page = Math.min(progress[book.id] ?? 0, total);
          const percent = Math.round((page / total) * 100);
          const started = page > 0;
          const done = page === total;

          return (
            <article key={book.id} className="flex overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition hover:shadow-md">
              {/* cover */}
              <div className={`relative flex w-28 shrink-0 flex-col items-center justify-center bg-gradient-to-b ${book.gradient} p-3 text-center text-white sm:w-32`}>
                <div aria-hidden className="absolute inset-2 rounded-lg border border-white/25" />
                <span className="font-arabic text-4xl leading-[2.2]" dir="rtl" lang="ar">
                  {book.glyph}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/70">{book.lang === "bn" ? "বাংলা" : "English"}</span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col p-4">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-semibold text-gold">
                    <BookMarked size={11} />
                    {pick(book.license)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-field px-2 py-0.5 text-[11px] font-medium text-muted">
                    <Languages size={11} />
                    {book.lang === "bn" ? "বাংলা" : "English"}
                  </span>
                </div>
                <h2 className="text-[15px] font-bold leading-snug">{pick(book.title)}</h2>
                <p className="mt-0.5 text-xs text-muted">{pick(book.author)}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{pick(book.description)}</p>

                {/* progress */}
                <div className="mt-auto pt-3">
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium">
                    {done && <CheckCircle2 size={14} className="text-accent" />}
                    {started
                      ? tr(`পৃষ্ঠা ${n(page)} / ${n(total)} — ${n(percent)}% পড়া হয়েছে`, `Page ${page} / ${total} — ${percent}% read`)
                      : tr(`${n(total)} পৃষ্ঠা — এখনো শুরু হয়নি`, `${total} pages — not started yet`)}
                  </p>
                  <div className="h-2 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${percent}%` }} />
                  </div>
                  <button
                    onClick={() => openBook(book.id)}
                    className="mt-3 w-full rounded-xl bg-accent px-3 py-2.5 text-sm font-semibold leading-snug text-white transition hover:brightness-110"
                  >
                    {started && !done
                      ? lang === "bn"
                        ? "যেখান থেকে শেষ করেছেন সেখান থেকে পড়ুন"
                        : "Continue Reading"
                      : done
                        ? tr("আবার পড়ুন", "Read Again")
                        : tr("পড়া শুরু করুন", "Start Reading")}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {openBookData && <BookReader book={openBookData} page={progress[openBookData.id] ?? 0} onPage={(p) => setPage(openBookData.id, p)} onClose={() => setOpenId(null)} />}
    </div>
  );
}
