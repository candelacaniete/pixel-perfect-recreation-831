import { useState, type ReactNode } from "react";
import { LensReveal } from "./LensReveal";

export function Encounter({ index, letter, name, tagline, guardian, done, children, tone }: {
  index: number; letter: string; name: string; tagline: string; guardian: string; done: boolean; children: ReactNode; tone: string;
}) {
  return (
    <section className={`relative min-h-screen overflow-hidden px-5 py-24 md:px-12 ${tone}`} aria-labelledby={`p-${index}`}>
      <span aria-hidden className="display-xl pointer-events-none absolute -right-4 top-10 select-none text-[40vw] leading-none opacity-10 md:text-[28vw]">{letter}</span>
      <div className="relative grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow opacity-70">Encounter {index + 1} of 5 · {guardian}</p>
          <h2 id={`p-${index}`} className="display-lg mt-4"><span className="italic">{letter}</span> — {name}</h2>
          <p aria-live="polite" className={`font-display mt-8 text-3xl italic leading-tight transition-all duration-700 md:text-5xl ${done ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            {done ? `“${tagline}”` : ""}
          </p>
          {!done && <p className="mt-8 eyebrow opacity-70">Interact to hear the guardian →</p>}
        </div>
        <div className="md:col-span-6 md:col-start-7">{children}</div>
      </div>
    </section>
  );
}

/* C — Curiosity: find clues hidden in the dark before deciding. */
export function CuriosityScene({ onDone }: { onDone: () => void }) {
  const clues = [
    { x: 18, y: 30, t: "Tracks lead to water, not away from it." },
    { x: 70, y: 22, t: "The heron isn't hunting. It's watching." },
    { x: 52, y: 72, t: "The ripple is a fish, not a threat." },
  ];
  const [found, setFound] = useState<number[]>([]);
  const find = (i: number) => { const n = [...new Set([...found, i])]; setFound(n); if (n.length === clues.length) onDone(); };
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-night ring-1 ring-paper/20">
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} aria-hidden className="absolute h-1.5 w-1.5 rounded-full bg-gold animate-flicker" style={{ left: `${(i * 37) % 95}%`, top: `${(i * 53) % 90}%`, animationDelay: `${i * 0.3}s` }} />
      ))}
      {clues.map((c, i) => (
        <button key={i} onClick={() => find(i)} aria-label={`Look closer, clue ${i + 1}`}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${found.includes(i) ? "h-auto w-48 bg-paper p-3 text-left text-sm text-ink" : "h-12 w-12 border-2 border-dashed border-gold/70 hover:bg-gold/20"}`}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}>
          {found.includes(i) ? c.t : <span className="sr-only">Unrevealed clue</span>}
        </button>
      ))}
      <p className="eyebrow absolute bottom-3 left-3 text-paper/70">{found.length}/3 clues observed</p>
    </div>
  );
}

/* L — Labels into Lenses */
export function LensScene({ onDone }: { onDone: () => void }) {
  return (
    <div>
      <p className="mb-3 text-paper/80">They called it dangerous, dull, camouflage. Move the lens across it.</p>
      <LensReveal onReveal={onDone} />
    </div>
  );
}

/* I — Ingenuity: combine what's in the truck. */
const kit = ["Rope", "Tarp", "Jerrycan", "Flashlight", "Machete", "Old map"] as const;
const outcomes: Record<string, string> = {
  "Rope+Tarp": "A shade sail. Dawn heat, solved.",
  "Jerrycan+Rope": "A float. The river is now a road.",
  "Flashlight+Old map": "Night navigation, by an old route.",
  "Tarp+Jerrycan": "A rain catcher. Water until dusk.",
};
export function IngenuityScene({ onDone }: { onDone: () => void }) {
  const [pick, setPick] = useState<string[]>([]);
  const toggle = (k: string) => {
    const n = pick.includes(k) ? pick.filter((p) => p !== k) : [...pick, k].slice(-2);
    setPick(n); if (n.length === 2) onDone();
  };
  const key = [...pick].sort().join("+");
  const res = pick.length === 2 ? outcomes[key] ?? outcomes[[...pick].reverse().join("+")] ?? `${pick[0]} + ${pick[1]}: improbable, and it works.` : null;
  return (
    <div className="rounded-sm border-2 border-paper/30 p-5">
      <p className="eyebrow mb-4 opacity-80">The truck bed · pick any two</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {kit.map((k) => (
          <button key={k} onClick={() => toggle(k)} aria-pressed={pick.includes(k)}
            className={`rounded-sm border-2 px-3 py-6 font-display text-xl transition ${pick.includes(k) ? "-rotate-2 border-gold bg-gold text-ink" : "border-paper/40 hover:border-gold"}`}>{k}</button>
        ))}
      </div>
      <p aria-live="polite" className="font-display mt-5 min-h-8 text-2xl italic text-gold">{res}</p>
    </div>
  );
}

/* C — Criticism: find the signal in the noise. */
const words = [
  { w: "too loud", s: false }, { w: "users stalled at step 2", s: true }, { w: "who even asked", s: false },
  { w: "hate the font", s: false }, { w: "pricing unclear", s: true }, { w: "meh", s: false },
  { w: "nobody reads this", s: false }, { w: "onboarding took 40 min", s: true }, { w: "lol", s: false },
];
export function CriticismScene({ onDone }: { onDone: () => void }) {
  const [kept, setKept] = useState<string[]>([]);
  const [miss, setMiss] = useState<string | null>(null);
  const signals = words.filter((w) => w.s).length;
  const clarity = kept.length / signals;
  const tap = (w: (typeof words)[number]) => {
    if (!w.s) { setMiss(w.w); return; }
    const n = [...new Set([...kept, w.w])]; setKept(n); setMiss(null);
    if (n.length === signals) onDone();
  };
  return (
    <div className="rounded-sm border-2 border-ink/20 bg-paper/60 p-5 text-ink">
      <p className="eyebrow mb-4">The feedback storm · keep only the useful signals ({kept.length}/{signals})</p>
      <div className="flex flex-wrap gap-2">
        {words.map((w, i) => (
          <button key={w.w} onClick={() => tap(w)}
            className={`rounded-full border-2 px-3 py-1.5 text-sm transition ${kept.includes(w.w) ? "border-crimson bg-crimson text-paper" : "border-ink/30"}`}
            style={{ filter: w.s || kept.includes(w.w) ? "none" : `blur(${clarity * 3}px)`, opacity: w.s ? 1 : 1 - clarity * 0.7, transform: `rotate(${(i % 3) - 1}deg)` }}>
            {w.w}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 min-h-6 text-sm opacity-80">{miss ? `“${miss}” — take the hit, move on.` : ""}</p>
    </div>
  );
}

/* K — Kickstart: choose a direction, the path appears as you go. */
export function KickstartScene({ onDone }: { onDone: () => void }) {
  const [steps, setSteps] = useState<("left" | "right")[]>([]);
  const go = (d: "left" | "right") => { const n = [...steps, d]; setSteps(n); if (n.length === 3) onDone(); };
  const notes = ["The fog moves back a little.", "A trail. Not the one you planned — a real one.", "The light arrives because you moved."];
  return (
    <div className="relative overflow-hidden rounded-sm border-2 border-ink/20 bg-dawn p-5 text-ink">
      <svg viewBox="0 0 300 200" className="w-full" aria-hidden>
        <circle cx="150" cy="200" r={30 + steps.length * 30} fill="var(--tangerine)" opacity={0.3 + steps.length * 0.2} />
        {steps.map((s, i) => {
          const y = 190 - i * 50; const x = 150 + (s === "left" ? -1 : 1) * (20 + i * 15);
          return <line key={i} x1={i === 0 ? 150 : 150 + (steps[i - 1] === "left" ? -1 : 1) * (20 + (i - 1) * 15)} y1={y + 50} x2={x} y2={y} stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />;
        })}
        <rect width="300" height={200 - steps.length * 55} fill="var(--paper)" opacity="0.85" />
      </svg>
      <p aria-live="polite" className="mt-3 min-h-6">{steps.length ? notes[steps.length - 1] : "The map ends here. Choose anyway."}</p>
      {steps.length < 3 && (
        <div className="mt-3 flex gap-3">
          <button onClick={() => go("left")} className="pill border-2 border-ink">← Left</button>
          <button onClick={() => go("right")} className="pill border-2 border-ink">Right →</button>
        </div>
      )}
    </div>
  );
}
