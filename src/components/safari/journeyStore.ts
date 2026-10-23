import { useSyncExternalStore } from "react";
import { stops } from "@/content/journey";

type State = { cam: number; completed: number[]; passed: number[]; landed: boolean; jump: number | null };
let state: State = { cam: 0, completed: [], passed: [], landed: false, jump: null };
const subs = new Set<() => void>();

export const journey = {
  get: () => state,
  set(p: Partial<State>) { state = { ...state, ...p }; subs.forEach((f) => f()); },
  subscribe(f: () => void) { subs.add(f); return () => { subs.delete(f); }; },
  /** Send the boat to stop i (i === stops.length means the landing shore). */
  requestJump(i: number) {
    const passed = Array.from({ length: Math.min(i, stops.length) }, (_, k) => k);
    journey.set({ jump: i, passed, landed: false });
  },
};

export function useJourney() {
  return useSyncExternalStore(journey.subscribe, journey.get, journey.get);
}
