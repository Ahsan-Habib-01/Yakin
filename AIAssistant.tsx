import { useEffect, useRef, useState } from "react";
import { Send, ShieldAlert, Sparkles, X } from "lucide-react";
import type { Reference } from "../types";
import { useApp } from "../context/AppContext";
import { answerQuery } from "../utils/assistant";
import { useEscape, useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { ReferenceCard } from "./ReferenceCard";

interface Message {
  id: number;
  role: "user" | "ai";
  text?: string;
  refs?: Reference[];
  abstain?: "modern" | "unmatched";
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AIAssistant({ open, onClose }: Props) {
  const { tr } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const timer = useRef<number | undefined>(undefined);

  useLockBodyScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking, open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const suggestions = [
    tr("ধৈর্য সম্পর্কে", "About patience"),
    tr("মা-বাবার হক", "Rights of parents"),
    tr("নামাজ", "Prayer"),
    tr("ক্রিপ্টো কি হালাল?", "Is crypto halal?"),
  ];

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { id: idRef.current++, role: "user", text: q }]);
    setInput("");
    setThinking(true);
    timer.current = window.setTimeout(() => {
      const a = answerQuery(q);
      setMessages((m) => [
        ...m,
        a.type === "refs" ? { id: idRef.current++, role: "ai", refs: a.refs } : { id: idRef.current++, role: "ai", abstain: a.reason },
      ]);
      setThinking(false);
    }, 700);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={tr("এআই রেফারেন্স অ্যাসিস্ট্যান্ট", "AI Reference Assistant")}>
      <button aria-label={tr("বন্ধ করুন", "Close")} onClick={onClose} className="animate-fade-in absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]" />

      <div className="animate-sheet-up absolute inset-x-0 bottom-0 flex h-[88vh] flex-col overflow-hidden rounded-t-3xl border border-line bg-app shadow-2xl md:animate-side-in md:inset-x-auto md:bottom-4 md:right-4 md:top-20 md:h-auto md:w-[450px] md:rounded-3xl">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between bg-navy px-4 py-3.5 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white">
              <Sparkles size={18} />
            </span>
            <div className="leading-tight">
              <h2 className="text-base font-semibold">{tr("এআই রেফারেন্স অ্যাসিস্ট্যান্ট", "AI Reference Assistant")}</h2>
              <p className="text-xs text-emerald-300">{tr("শুধু যাচাইকৃত রেফারেন্স", "Verified references only")}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label={tr("বন্ধ করুন", "Close")} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">
            <X size={20} />
          </button>
        </header>

        {/* Mandatory clarification banner — always visible, never scrolls away */}
        <div className="shrink-0 border-b border-gold/30 bg-gold-soft px-4 py-3" role="note">
          <div className="flex gap-2.5">
            <ShieldAlert size={18} className="mt-0.5 shrink-0 text-gold" />
            <p className="text-[13px] font-medium leading-relaxed text-ink">
              {tr(
                "আমি একটি AI রেফারেন্স অ্যাসিস্ট্যান্ট, কোনো আলেম বা মুফতি নই। আমি কোনো ফতোয়া দিই না—আপনার প্রশ্নের প্রেক্ষিতে শুধুমাত্র যাচাইকৃত ডেটাবেস থেকে কোরআনের আয়াত ও সহীহ হাদিসের রেফারেন্স এনে দিতে পারি।",
                "I am an AI reference assistant, not a scholar or mufti. I do not issue fatwas — in response to your question I can only bring Quran verses and Sahih hadith references from a verified database."
              )}
            </p>
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-line bg-card px-4 py-3 text-sm leading-relaxed">
            {tr(
              "আস-সালামু আলাইকুম! কোনো বিষয়ে প্রশ্ন লিখুন—আমি সংশ্লিষ্ট আয়াত ও সহীহ হাদিসের রেফারেন্স দেখাব।",
              "As-salamu alaykum! Ask about a topic and I will show the related Quran verses and Sahih hadith references."
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => ask(s)} className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-white">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-4 py-2.5 text-sm text-white">{m.text}</p>
              </div>
            ) : m.refs ? (
              <div key={m.id} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {tr(`${m.refs.length}টি যাচাইকৃত রেফারেন্স পাওয়া গেছে`, `${m.refs.length} verified reference${m.refs.length > 1 ? "s" : ""} found`)}
                </p>
                {m.refs.map((r) => (
                  <ReferenceCard key={r.id} reference={r} />
                ))}
              </div>
            ) : (
              <div key={m.id} className="rounded-2xl border border-gold/40 bg-card p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-gold">
                  <ShieldAlert size={16} />
                  {tr("বিরত থাকছি (Abstention)", "I must abstain")}
                </div>
                <p className="text-sm leading-relaxed">
                  {m.abstain === "modern"
                    ? tr(
                        "এটি একটি আধুনিক বিষয়, যার সরাসরি যাচাইকৃত কোনো রেফারেন্স আমার ডেটাবেসে পাইনি। এ ধরনের বিষয়ে হালাল-হারামের সিদ্ধান্ত যোগ্য আলেম বা ফিকহ একাডেমির কাজ—আমি অনুমান করে কোনো মত দেব না। অনুগ্রহ করে নির্ভরযোগ্য মুফতি বা ইসলামিক ফিকহ একাডেমির শরণাপন্ন হোন।",
                        "This is a modern topic and I found no directly verified reference in my database. Rulings on such matters belong to qualified scholars or fiqh academies — I will not guess. Please consult a trustworthy mufti or an Islamic fiqh academy."
                      )
                    : tr(
                        "আপনার প্রশ্নের সাথে মিলে যায় এমন কোনো যাচাইকৃত আয়াত বা সহীহ হাদিস আমার ডেটাবেসে পাইনি, তাই আমি উত্তর দেওয়া থেকে বিরত থাকছি। অন্য শব্দে প্রশ্ন করে দেখতে পারেন, অথবা কোনো যোগ্য আলেমের কাছে জানুন।",
                        "I found no verified verse or Sahih hadith in my database that matches your question, so I abstain from answering. Try rephrasing, or ask a qualified scholar."
                      )}
                </p>
              </div>
            )
          )}

          {thinking && (
            <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-sm border border-line bg-card px-4 py-3" aria-label={tr("খোঁজা হচ্ছে", "Searching")}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex shrink-0 items-center gap-2 border-t border-line bg-card p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tr("আপনার প্রশ্ন লিখুন…", "Type your question…")}
            aria-label={tr("প্রশ্ন", "Question")}
            className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-field px-4 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label={tr("পাঠান", "Send")}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-white transition disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
