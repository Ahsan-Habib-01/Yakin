import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { readJSON } from "../hooks/useLocalStorage";
import { AIAssistant } from "./AIAssistant";

const SIZE = 58;
const MARGIN = 10;
const STORAGE_KEY = "ib:ai-bubble";
const DRAG_THRESHOLD = 6;

type Side = "left" | "right";
interface Dock {
  side: Side;
  y: number;
}

/**
 * Draggable floating AI bubble.
 * - Pointer Events cover mouse + touch + pen in one code path.
 * - On release it snaps to the nearest horizontal edge.
 * - A tap (movement under threshold) opens the AI Reference Assistant drawer.
 */
export function FloatingAI() {
  const { tr } = useApp();
  const [open, setOpen] = useState(false);
  const [vw, setVw] = useState(() => window.innerWidth);
  const [vh, setVh] = useState(() => window.innerHeight);
  const [dock, setDock] = useState<Dock>(() => readJSON<Dock>(STORAGE_KEY, { side: "right", y: Math.round(window.innerHeight * 0.6) }));
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const gesture = useRef<{ px: number; py: number; ox: number; oy: number; moved: boolean } | null>(null);

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dock));
    } catch {
      /* ignore */
    }
  }, [dock]);

  // keep bubble clear of the sticky navbar and the mobile bottom navigation
  const minY = (vw >= 768 ? 64 : 56) + MARGIN;
  const maxY = vh - SIZE - (vw >= 768 ? MARGIN + 6 : 64 + MARGIN);
  const clampY = useCallback((y: number) => Math.min(Math.max(y, minY), Math.max(minY, maxY)), [minY, maxY]);
  const clampX = (x: number) => Math.min(Math.max(x, MARGIN), vw - SIZE - MARGIN);

  const dockedX = dock.side === "right" ? vw - SIZE - MARGIN : MARGIN;
  const x = drag ? drag.x : dockedX;
  const y = drag ? drag.y : clampY(dock.y);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
    gesture.current = { px: e.clientX, py: e.clientY, ox: dockedX, oy: clampY(dock.y), moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const g = gesture.current;
    if (!g) return;
    const dx = e.clientX - g.px;
    const dy = e.clientY - g.py;
    if (!g.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    g.moved = true;
    setDrag({ x: clampX(g.ox + dx), y: Math.min(Math.max(g.oy + dy, MARGIN + 56), vh - SIZE - MARGIN) });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const g = gesture.current;
    gesture.current = null;
    if (!g) return;
    try {
      (e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (g.moved && drag) {
      setDock({ side: drag.x + SIZE / 2 < vw / 2 ? "left" : "right", y: clampY(drag.y) });
      setDrag(null);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          aria-label={tr("এআই রেফারেন্স অ্যাসিস্ট্যান্ট খুলুন (টেনে সরানো যায়)", "Open AI Reference Assistant (draggable)")}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            gesture.current = null;
            setDrag(null);
          }}
          onClick={(e) => {
            // keyboard activation only (detail === 0); pointer taps are handled in onPointerUp
            if (e.detail === 0) setOpen(true);
          }}
          style={{
            left: x,
            top: y,
            width: SIZE,
            height: SIZE,
            touchAction: "none",
            transition: drag ? "none" : "left 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), top 0.2s ease",
          }}
          className={`fixed z-[45] select-none rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 text-white shadow-xl shadow-emerald-900/30 ring-4 ring-white/70 dark:ring-slate-900/70 ${
            drag ? "scale-110 cursor-grabbing" : "cursor-grab"
          }`}
        >
          {!drag && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-400/40 [animation-duration:2.6s]" />}
          <span className="flex flex-col items-center justify-center leading-none">
            <Sparkles size={13} className="mb-0.5 text-amber-200" />
            <span className="text-[17px] font-extrabold tracking-wide">AI</span>
          </span>
        </button>
      )}
      <AIAssistant open={open} onClose={() => setOpen(false)} />
    </>
  );
}
