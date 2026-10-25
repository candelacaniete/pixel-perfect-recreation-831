import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { journey } from "../journeyStore";
import { riverDestination as copy } from "@/content/yrmis";
import { ClickSquares } from "@/components/safari/ClickSquares";

/**
 * The river's final destination: applied innovation. Shown when the boat
 * reaches the shore, and reachable directly via "Skip to the shore" —
 * completing the river is never a requirement.
 */
export function Destination() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>(() => copy.exercise.prompts.map(() => ""));

  const backOnWater = () => journey.requestJump(0);
  const toMap = () => {
    journey.set({ cam: 0, passed: [], landed: false, jump: null });
    void navigate({ to: "/" });
  };

  return (
    <div data-ui className="absolute inset-0 z-40 overflow-y-auto bg-night text-paper">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-[calc(env(safe-area-inset-top)+5rem)] md:px-10">
        <p className="eyebrow text-gold">The shore · Applied innovation</p>
        <h2 className="display-xl mt-4">{copy.headline}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">{copy.intro}</p>

        <ClickSquares className="mt-10" />

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <section aria-label="Three examples from the keynote">
            <h3 className="font-display text-2xl italic md:text-3xl">Three small proofs</h3>
            <ul className="mt-5 space-y-3">
              {copy.examples.map((e, i) => (
                <li key={e} className="flex items-baseline gap-4 border-t border-paper/20 pt-3">
                  <span aria-hidden className="eyebrow text-gold">0{i + 1}</span>
                  <span className="font-display text-xl leading-snug md:text-2xl">{e}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label={copy.exercise.title} className="border-2 border-paper/25 p-5 md:p-7">
            <h3 className="font-display text-2xl italic md:text-3xl">{copy.exercise.title}</h3>
            <p className="eyebrow mt-2 text-paper/60">{copy.exercise.note}</p>
            <div className="mt-5 space-y-4">
              {copy.exercise.prompts.map((prompt, i) => (
                <label key={prompt} className="block">
                  <span className="eyebrow text-gold">{i + 1} · {prompt}</span>
                  <input
                    type="text"
                    value={answers[i]}
                    onChange={(e) => setAnswers((a) => a.map((v, k) => (k === i ? e.target.value : v)))}
                    className="mt-1 w-full border-b-2 border-paper/30 bg-transparent py-1.5 text-paper outline-none transition-colors focus:border-gold"
                  />
                </label>
              ))}
            </div>
          </section>
        </div>

        <p className="font-display mt-14 text-3xl italic leading-tight text-gold md:text-5xl">{copy.line}</p>

        <nav aria-label="Where to go next" className="mt-8 grid gap-3 sm:grid-cols-3">
          {copy.exits.map((x) => (
            <Link key={x.to} to={x.to} className="group border-2 border-paper/25 p-5 transition-colors hover:border-gold hover:bg-paper/5">
              <p className="font-display text-xl md:text-2xl">{x.name}</p>
              <p className="mt-1 text-sm text-paper/65">{x.note}</p>
              <p aria-hidden className="eyebrow mt-4 text-gold transition-transform group-hover:translate-x-1">→</p>
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-wrap gap-3">
          <button onClick={backOnWater} className="pill bg-scarlet text-paper">↺ {copy.water}</button>
          <button onClick={toMap} className="pill border-2 border-paper">{copy.map}</button>
        </div>
      </div>
    </div>
  );
}
