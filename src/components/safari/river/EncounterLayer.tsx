import { useEffect, useState } from "react";
import type { Stop } from "@/content/journey";
import { LensReveal } from "../LensReveal";
import { Button } from "@/components/ui/button";

export type Phase = "dialogue" | "interaction" | "revelation" | "departure";

/** Arrival → Recognition happen in-world; this layer runs Dialogue → Interaction → Revelation → Departure. */
export function EncounterLayer({ stop, phase, setPhase, onDepart, onClearLog, onFog }: {
  stop: Stop; phase: Phase; setPhase: (p: Phase) => void; onDepart: (completed: boolean) => void; onClearLog: () => void; onFog: (n: number) => void;
}) {
  const [line, setLine] = useState(0);
  useEffect(() => { setLine(0); }, [stop]);
  const solved = () => setPhase("revelation");

  return (
    <>
      {phase === "dialogue" && (
        <Button variant="ghost" data-ui className="pointer-events-auto block h-auto w-full whitespace-normal p-0 text-left hover:bg-transparent" onClick={() => (line + 1 < stop.dialogue.length ? setLine(line + 1) : setPhase("interaction"))}>
          <span className="eyebrow block text-gold">{stop.guardian}</span>
          <span key={line} className="speech mt-1 block animate-in fade-in slide-in-from-bottom-1 duration-700">{stop.dialogue[line]}</span>
          <span className="eyebrow mt-2 block text-paper/70">tap to listen ›</span>
        </Button>
      )}

      {phase === "interaction" && (
        <div data-ui className="pointer-events-auto">
          <p className="speech">{stop.prompt}</p>
          <ScreenPortal>
            {stop.interaction === "clues" && <Clues onDone={solved} />}
            {stop.interaction === "lens" && <LensStage onDone={solved} />}
            {stop.interaction === "truck" && <Truck onDone={() => { onClearLog(); solved(); }} />}
            {stop.interaction === "signals" && <Signals onDone={solved} />}
            {stop.interaction === "fog" && <Fog onStep={onFog} onDone={solved} />}
            <button data-ui onClick={solved} className="eyebrow absolute bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-5 p-2 z-30 text-paper/70 underline">Skip — just tell me</button>
          </ScreenPortal>
        </div>
      )}

      {phase === "revelation" && (
        <ScreenPortal>
          <div data-ui className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+6rem)] top-[calc(env(safe-area-inset-top)+5rem)] flex items-center justify-center overflow-y-auto px-6 py-4 text-center">
            <div className="my-auto w-full max-w-2xl animate-in fade-in zoom-in-95 duration-1000">
              <p className="speech mx-auto mb-6 max-w-md">{stop.revelation}</p>
              <span className="font-display block text-7xl leading-none text-gold text-shadow-river md:text-9xl">{stop.letter}</span>
              <span className="eyebrow mt-2 block">{stop.name}</span>
              <span className="font-display mt-3 block break-words text-2xl italic text-shadow-river md:text-4xl">“{stop.tagline}”</span>
            </div>
          </div>
          <Button variant="ghost" data-ui autoFocus onClick={() => setPhase("departure")} className="row-btn absolute bottom-8 left-1/2 z-30 h-auto w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 whitespace-normal">Thank the {stop.guardian.replace("The ", "")}</Button>
        </ScreenPortal>
      )}

      {phase === "departure" && (
        <div data-ui className="pointer-events-auto">
          <p className="speech animate-in fade-in duration-700">{stop.departure}</p>
          <ScreenPortal>
            <Button variant="ghost" data-ui autoFocus onClick={() => onDepart(true)} className="row-btn absolute bottom-8 left-1/2 z-30 h-auto w-max -translate-x-1/2 whitespace-normal">Push off downstream ↓</Button>
          </ScreenPortal>
        </div>
      )}

      {phase !== "departure" && phase !== "revelation" && (
        <ScreenPortal>
          <button data-ui onClick={() => onDepart(false)} className="eyebrow absolute bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] right-5 p-2 z-30 text-paper/70 underline">Row past</button>
        </ScreenPortal>
      )}
    </>
  );
}

/** Renders children in viewport space rather than at the guardian anchor. */
function ScreenPortal({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none fixed inset-0 z-20 [&>*]:pointer-events-auto">{children}</div>;
}

function Clues({ onDone }: { onDone: () => void }) {
  const clues = [
    { x: 22, y: 70, t: "Fish scales on the bank. It eats fish, not travellers." },
    { x: 50, y: 58, t: "A nest of eggs tucked behind its legs." },
    { x: 78, y: 74, t: "Its eyes glow to see the shallows at night." },
  ];
  const [found, setFound] = useState<number[]>([]);
  useEffect(() => { if (found.length === 3) { const t = setTimeout(onDone, 1400); return () => clearTimeout(t); } return undefined; }, [found, onDone]);
  return (
    <div className="absolute inset-0">
      {clues.map((c, i) => (
        <button key={i} onClick={() => setFound((f) => [...new Set([...f, i])])} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${c.x}%`, top: `${c.y}%` }} aria-label={`Look closer at glint ${i + 1}`}>
          {found.includes(i) ? (
            <span className="speech block w-[min(13rem,36vw)] animate-in fade-in duration-500 text-sm">{c.t}</span>
          ) : (
            <span className="glint block h-14 w-14" />
          )}
        </button>
      ))}
    </div>
  );
}

function LensStage({ onDone }: { onDone: () => void }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="absolute inset-0 animate-in fade-in duration-1000">
      <LensReveal fill onReveal={() => setRevealed(true)} />
      {revealed && (
        <button onClick={onDone} className="row-btn absolute bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-1/2 z-30 -translate-x-1/2 animate-in fade-in">Lower the lens</button>
      )}
    </div>
  );
}

const kit = ["Rope", "Tarp", "Jerrycan", "Machete", "Flashlight", "Old map"];
const quips: Record<string, string> = {
  "Machete+Tarp": "A very sharp sail. The trunk is unimpressed.",
  "Flashlight+Old map": "Now you can see exactly how stuck you are.",
  "Jerrycan+Tarp": "A rain catcher. Useful — just not here.",
  "Machete+Rope": "You could hack at it until dusk. The capybara yawns.",
};
/** One wrong combination gets a quip; whatever the traveller tries next works. */
export function truckOutcome(key: string, misses: number) {
  return key === "Jerrycan+Rope" || misses >= 1 ? "solved" : "miss";
}
function Truck({ onDone }: { onDone: () => void }) {
  const [pick, setPick] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [misses, setMisses] = useState(0);
  const tap = (k: string) => {
    const n = pick.includes(k) ? pick.filter((p) => p !== k) : [...pick, k].slice(-2);
    setPick(n);
    if (n.length === 2) {
      const key = [...n].sort().join("+");
      if (truckOutcome(key, misses) === "solved") {
        setMsg(key === "Jerrycan+Rope" ? "Tie the empty jerrycan to the trunk…" : `${n[0]} and ${n[1]}? Unexpected — and it works. The trunk shifts.`);
        setTimeout(onDone, 1300);
      }
      else { setMisses(misses + 1); setMsg(quips[key] ?? `${n[0]} and ${n[1]}? Bold. Try something that floats.`); setTimeout(() => setPick([]), 900); }
    }
  };
  return (
    <div className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-4 px-4">
      <p aria-live="polite" className="speech min-h-6 text-center">{msg}</p>
      <div className="flex max-w-xl flex-wrap justify-center gap-3">
        {kit.map((k, i) => (
          <button key={k} onClick={() => tap(k)} aria-pressed={pick.includes(k)} className={`driftwood ${pick.includes(k) ? "driftwood-on" : ""}`} style={{ animationDelay: `${i * 0.4}s` }}>{k}</button>
        ))}
      </div>
    </div>
  );
}

const storm = [
  { w: "too loud", s: false }, { w: "people stalled at step two", s: true }, { w: "who asked?", s: false },
  { w: "hate the colour", s: false }, { w: "the price is unclear", s: true }, { w: "meh", s: false },
  { w: "nobody reads this", s: false }, { w: "onboarding took forty minutes", s: true }, { w: "lol", s: false }, { w: "boring", s: false },
];
const STORM_X = [6, 46, 14, 52, 4, 40, 10, 48, 2, 34];
function Signals({ onDone }: { onDone: () => void }) {
  const [kept, setKept] = useState<string[]>([]);
  const [hit, setHit] = useState<string | null>(null);
  const k = kept.length / 3;
  useEffect(() => { if (kept.length === 3) { const t = setTimeout(onDone, 900); return () => clearTimeout(t); } return undefined; }, [kept, onDone]);
  return (
    <div className="absolute inset-0">
      {storm.map((w, i) => {
        const on = kept.includes(w.w);
        return (
          <button key={w.w} onClick={() => (w.s ? setKept((x) => [...new Set([...x, w.w])]) : setHit(w.w))}
            className={`storm-word absolute max-w-[42vw] min-h-11 px-1 text-left md:max-w-none ${on ? "storm-kept" : ""}`}
            style={{ top: `calc(6.5rem + ${i} * (100% - 12rem) / 10)`, left: `${STORM_X[i] ?? 10}%`, animationDelay: `${-i * 1.3}s`, opacity: w.s || on ? 1 : 1 - k * 0.75, filter: w.s || on ? "none" : `blur(${k * 4}px)` }}>
            {w.w}
          </button>
        );
      })}
      <p aria-live="polite" className="speech absolute inset-x-0 bottom-24 mx-auto w-fit max-w-sm text-center">{hit ? `“${hit}” — ouch. Take the hit, let it blow past.` : `${kept.length}/3 signals kept`}</p>
    </div>
  );
}

function Fog({ onStep, onDone }: { onStep: (n: number) => void; onDone: () => void }) {
  const [n, setN] = useState(0);
  const notes = ["The fog draws back a little.", "A channel opens — not the one you planned. A real one.", "Light, ahead. It arrived because you moved."];
  const go = () => { const m = n + 1; setN(m); onStep(m); if (m === 3) setTimeout(onDone, 1200); };
  return (
    <div className="absolute inset-x-0 bottom-28 flex flex-col items-center gap-4">
      <p aria-live="polite" className="speech text-center">{n ? notes[n - 1] : "Two channels. No map. Pick one."}</p>
      {n < 3 && (
        <div className="flex gap-6">
          <button onClick={go} className="row-btn">← Left channel</button>
          <button onClick={go} className="row-btn">Right channel →</button>
        </div>
      )}
    </div>
  );
}
