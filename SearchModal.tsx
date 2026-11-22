import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Library, ScrollText, Search, X } from "lucide-react";
import { BOOKS } from "../data/books";
import { HADITHS, SURAHS } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useEscape, useLockBodyScroll } from "../hooks/useLockBodyScroll";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenAyah: (surah: number, ayah: number) => void;
  onOpenHadith: () => void;
  onOpenBook: (id: string) => void;
}

const norm = (s: string) => s.toLowerCase().normalize("NFC");

export function SearchModal({ open, onClose, onOpenAyah, onOpenHadith, onOpenBook }: Props) {
  const { tr, pick, n } = useApp();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useLockBodyScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      setQ("");
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const results = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return null;
    const surahs = SURAHS.filter((s) => [s.name.bn, s.name.en, s.ar, s.meaning.bn, s.meaning.en, String(s.id)].some((f) => norm(f).includes(t)));
    const ayahs = t.length < 2 ? [] : SURAHS.flatMap((s) => s.ayahs.filter((a) => [a.bn, a.en, a.ar].some((f) => norm(f).includes(t))).map((a) => ({ s, a }))).slice(0, 6);
    const hadiths = t.length < 2 ? [] : HADITHS.filter((h) => [h.text.bn, h.text.en, h.ar, h.source.en].some((f) => norm(f).includes(t))).slice(0, 4);
    const books = BOOKS.filter((b) => [b.title.bn, b.title.en, b.author.en].some((f) => norm(f).includes(t)));
    return { surahs, ayahs, hadiths, books };
  }, [q]);

  if (!open) return null;
  const empty = results && !results.surahs.length && !results.ayahs.length && !results.hadiths.length && !results.books.length;

  const go = (fn: () => void) => () => {
    fn();
    onClose();
  };

  const Row = ({ icon, title, sub, onClick }: { icon: React.ReactNode; title: string; sub?: string; onClick: () => void }) => (
    <button onClick={go(onClick)} className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-accent-soft">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{title}</span>
        {sub && <span className="line-clamp-2 text-xs text-muted">{sub}</span>}
      </span>
    </button>
  );

  const Label = ({ children }: { children: React.ReactNode }) => <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted">{children}</p>;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-3 pt-16 sm:pt-24" role="dialog" aria-modal="true" aria-label={tr("সার্চ", "Search")}>
      <button aria-label={tr("বন্ধ করুন", "Close")} onClick={onClose} className="animate-fade-in absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]" />
      <div className="animate-pop relative flex max-h-[75vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr("সূরা, আয়াত, হাদিস বা বই খুঁজুন…", "Search surahs, ayahs, hadith or books…")}
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          />
          <button onClick={onClose} aria-label={tr("বন্ধ করুন", "Close")} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-field">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-2">
          {!results && (
            <div className="px-3 py-6 text-center text-sm text-muted">
              <p className="mb-3">{tr("কিছু লিখে খুঁজুন। যেমন:", "Start typing. For example:")}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[tr("ফাতিহা", "Fatihah"), tr("ইখলাস", "Ikhlas"), tr("নিয়ত", "intentions"), tr("নামাজ", "Salah")].map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="rounded-full border border-line px-3 py-1 hover:bg-field">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {empty && <p className="px-3 py-8 text-center text-sm text-muted">{tr("কোনো ফলাফল পাওয়া যায়নি।", "No results found.")}</p>}

          {results && results.surahs.length > 0 && (
            <>
              <Label>{tr("সূরা", "Surahs")}</Label>
              {results.surahs.map((s) => (
                <Row key={s.id} icon={<BookOpen size={16} />} title={`${n(s.id)}. ${pick(s.name)} — ${s.ar}`} sub={`${pick(s.meaning)} • ${n(s.ayahs.length)} ${tr("আয়াত", "ayahs")}`} onClick={() => onOpenAyah(s.id, 1)} />
              ))}
            </>
          )}
          {results && results.ayahs.length > 0 && (
            <>
              <Label>{tr("আয়াত", "Ayahs")}</Label>
              {results.ayahs.map(({ s, a }) => (
                <Row key={`${s.id}-${a.n}`} icon={<BookOpen size={16} />} title={`${pick(s.name)} ${n(s.id)}:${n(a.n)}`} sub={tr(a.bn, a.en)} onClick={() => onOpenAyah(s.id, a.n)} />
              ))}
            </>
          )}
          {results && results.hadiths.length > 0 && (
            <>
              <Label>{tr("হাদিস", "Hadith")}</Label>
              {results.hadiths.map((h) => (
                <Row key={h.id} icon={<ScrollText size={16} />} title={pick(h.source)} sub={pick(h.text)} onClick={onOpenHadith} />
              ))}
            </>
          )}
          {results && results.books.length > 0 && (
            <>
              <Label>{tr("বই", "Books")}</Label>
              {results.books.map((b) => (
                <Row key={b.id} icon={<Library size={16} />} title={pick(b.title)} sub={pick(b.author)} onClick={() => onOpenBook(b.id)} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
