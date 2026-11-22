import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface TrackerData {
  prayers: string[];
  goals: string[];
  dhikr: number;
}

const SEED_FLAG = "ib:tracker:seeded";

export function dayKey(d: Date = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `ib:tracker:${d.getFullYear()}-${m}-${day}`;
}

/** Daily prayer + ibadah tracker, stored per calendar day. */
export function useTracker() {
  const [data, setData] = useLocalStorage<TrackerData>(dayKey(), () => {
    // First-ever visit shows a friendly demo state (3/5); every new day starts clean.
    const firstVisit = !localStorage.getItem(SEED_FLAG);
    return { prayers: firstVisit ? ["fajr", "dhuhr", "asr"] : [], goals: firstVisit ? ["quran"] : [], dhikr: 0 };
  });

  useEffect(() => {
    try {
      localStorage.setItem(SEED_FLAG, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (field: "prayers" | "goals", id: string) =>
    setData((d) => ({ ...d, [field]: d[field].includes(id) ? d[field].filter((x) => x !== id) : [...d[field], id] }));

  return {
    data,
    togglePrayer: (id: string) => toggle("prayers", id),
    toggleGoal: (id: string) => toggle("goals", id),
    addDhikr: () => setData((d) => ({ ...d, dhikr: d.dhikr + 1 })),
    resetDhikr: () => setData((d) => ({ ...d, dhikr: 0 })),
  };
}
