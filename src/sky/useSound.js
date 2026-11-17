import { useCallback, useEffect, useRef, useState } from "react";

// Tiny synthesised sound effects (no audio files). Browsers only allow audio after the
// visitor's first click or tap, so hover sounds stay silent until then.
export function useSound() {
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem("sky-sound") !== "off"; } catch { return true; }
  });
  const ctxRef = useRef(null);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
    try { localStorage.setItem("sky-sound", enabled ? "on" : "off"); } catch { /* private mode */ }
  }, [enabled]);

  const unlock = useCallback(() => {
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctxRef.current = new AC();
      }
      if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    } catch { /* no audio available */ }
  }, []);

  const note = useCallback((freq, dur = 0.1, vol = 0.05, delay = 0, type = "sine", force = false) => {
    const ac = ctxRef.current;
    if (!ac || (!enabledRef.current && !force)) return;
    try {
      const at = ac.currentTime + delay;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, at);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, at + dur);
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(vol, at + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(at);
      osc.stop(at + dur + 0.03);
    } catch { /* ignore */ }
  }, []);

  // Hover sounds only once audio is already running, so nothing queues up before the first click.
  const hover = useCallback(() => {
    if (ctxRef.current?.state === "running") note(560, 0.07, 0.035);
  }, [note]);

  // Same, with a chosen pitch (used by the skill tiles so each one sounds a little different).
  const hoverTone = useCallback((freq) => {
    if (ctxRef.current?.state === "running") note(freq, 0.08, 0.035);
  }, [note]);

  const click = useCallback((freq = 330) => {
    unlock();
    note(freq, 0.11, 0.07, 0, "triangle");
  }, [unlock, note]);

  const toggle = useCallback(() => {
    setEnabled((on) => {
      if (!on) {
        unlock();
        note(440, 0.1, 0.06, 0, "triangle", true);
        note(660, 0.12, 0.06, 0.09, "triangle", true);
      }
      return !on;
    });
  }, [unlock, note]);

  return { enabled, toggle, unlock, note, hover, hoverTone, click };
}
