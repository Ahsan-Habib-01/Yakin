import { useEffect } from "react";
import type { Ayah, AudioMode, Reciter } from "../types";

interface Options {
  playing: boolean;
  setPlaying: (v: boolean) => void;
  surahId: number;
  ayahs: Ayah[];
  index: number;
  setIndex: (i: number) => void;
  continuous: boolean;
  mode: AudioMode;
  reciter: Reciter;
}

const pad = (n: number) => String(n).padStart(3, "0");

export function ayahAudioUrl(reciter: Reciter, surahId: number, ayah: number) {
  return `https://everyayah.com/data/${reciter.folder}/${pad(surahId)}${pad(ayah)}.mp3`;
}

export function hasBanglaVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const voices = window.speechSynthesis.getVoices();
  // voices may not be loaded yet — be optimistic in that case
  return voices.length === 0 || voices.some((v) => v.lang.toLowerCase().startsWith("bn"));
}

/**
 * Plays ONE ayah at a time (Arabic recitation, optionally followed by a Bangla voice reading),
 * then either auto-advances (continuous mode) or stops. This is an ayah player, not a time scrubber.
 */
export function useAyahPlayer({ playing, setPlaying, surahId, ayahs, index, setIndex, continuous, mode, reciter }: Options) {
  useEffect(() => {
    if (!playing) return;
    const ayah = ayahs[index];
    if (!ayah) {
      setPlaying(false);
      return;
    }

    let cancelled = false;
    let fallbackTimer: number | undefined;
    let safetyTimer: number | undefined;
    let fallbackScheduled = false;

    const finishAyah = () => {
      if (cancelled) return;
      window.clearTimeout(safetyTimer);
      if (continuous && index < ayahs.length - 1) setIndex(index + 1);
      else setPlaying(false);
    };

    const speakBangla = () => {
      if (cancelled) return;
      if (!("speechSynthesis" in window) || !hasBanglaVoice()) {
        finishAyah();
        return;
      }
      const u = new SpeechSynthesisUtterance(ayah.bn);
      u.lang = "bn-BD";
      u.rate = 0.95;
      u.onend = finishAyah;
      u.onerror = finishAyah;
      safetyTimer = window.setTimeout(finishAyah, 30000);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    };

    const afterArabic = () => {
      if (cancelled) return;
      if (mode === "ar-bn") speakBangla();
      else finishAyah();
    };

    // If audio cannot be loaded (offline / blocked) we keep the UX moving with a short timed pass.
    const fallback = () => {
      if (cancelled || fallbackScheduled) return;
      fallbackScheduled = true;
      fallbackTimer = window.setTimeout(afterArabic, 3500);
    };

    const audio = new Audio(ayahAudioUrl(reciter, surahId, ayah.n));
    audio.preload = "auto";
    audio.addEventListener("ended", afterArabic);
    audio.addEventListener("error", fallback);
    audio.play().catch(fallback);

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(safetyTimer);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
    // setIndex / setPlaying are stable enough for this usage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, surahId, continuous, mode, reciter.id]);
}
