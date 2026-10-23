import { useEffect, useState } from "react";

const KEY = "yrmis-visited";
let boatAt = 0.02; // shared boat position along the river (0..1)
export const getBoat = () => boatAt;
export const setBoat = (v: number) => { boatAt = v; };

export function markVisited(id: string) {
  try {
    const s = new Set<string>(JSON.parse(localStorage.getItem(KEY) || "[]"));
    s.add(id);
    localStorage.setItem(KEY, JSON.stringify([...s]));
    window.dispatchEvent(new Event("yrmis-visited"));
  } catch { /* ignore */ }
}

export function useVisited() {
  const [v, setV] = useState<string[]>([]);
  useEffect(() => {
    const read = () => { try { setV(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ } };
    read();
    window.addEventListener("yrmis-visited", read);
    return () => window.removeEventListener("yrmis-visited", read);
  }, []);
  return v;
}

export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const f = () => setR(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return r;
}
