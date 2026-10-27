import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { Scene } from "@/components/safari/motion";
import { PoseCycle, WaterSurface } from "@/components/site/habitat";
import { markVisited } from "@/components/safari/visited";
import { clickExamples } from "@/content/yrmis";
import coil1 from "@/assets/living/anaconda-coil-1.jpg";
import coil2 from "@/assets/living/anaconda-coil-2.jpg";
import nightWater from "@/assets/land-signals-observation.jpg";

const coils = [coil1, coil2];

const fields = [
  { key: "problem", label: "The problem I keep noticing", long: true },
  { key: "lens", label: "A lens I could borrow", long: false },
  { key: "reuse", label: "Something I can reuse", long: false },
  { key: "feedback", label: "Feedback that would help", long: false },
  { key: "test", label: "One small test I can try", long: false },
] as const;

type IdeaKey = (typeof fields)[number]["key"];

export function ClickPage() {
  useEffect(() => markVisited("click"), []);
  const [scene, setScene] = useState(0);
  const example = clickExamples[scene] ?? clickExamples[0];
  const [idea, setIdea] = useState<Record<IdeaKey, string>>({ problem: "", lens: "", reuse: "", feedback: "", test: "" });
  const [shown, setShown] = useState<IdeaKey[]>([]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShown(fields.filter((field) => idea[field.key].trim()).map((field) => field.key));
  }

  return (
    <Shell>
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="relative overflow-hidden bg-night px-5 pb-16 pt-28 md:px-12">
          <WaterSurface src={nightWater} position="center 65%" className="-z-10" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-night/55" />
          <div className="relative mx-auto max-w-3xl">
            <p className="eyebrow text-gold">CLICK · guarded by the anaconda</p>
            <h1 className="display-xl mt-3">What can be<br /><em className="text-gold">done better?</em></h1>
            <p className="mt-6 max-w-xl text-lg">Think of your desk, your company, your neighborhood. What’s one thing that bugs you? Start there. You can open this page without finishing the river.</p>
          </div>
        </Scene>
        <PoseCycle frames={coils} interval={1100} alt="The anaconda coiled in the night water, shifting its head" />
        <section className="bg-night px-5 py-12 md:px-12">
          <ClickFive />
        </section>
        <section className="bg-paper px-5 py-14 text-ink md:px-12">
          <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-crimson">Illustrative examples from the talk</p>
          <h2 className="display-lg mt-3">Find. Adapt. Build.</h2>
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Explore innovation examples">
            {clickExamples.map((item, index) => (
              <button key={item.title} type="button" aria-pressed={scene === index} onClick={() => setScene(index)} className={`pill border-2 border-ink ${scene === index ? "bg-ink text-paper" : ""}`}>
                {item.title}
              </button>
            ))}
          </div>
          <div className="mt-8 max-w-2xl">
            <h3 className="font-display text-3xl">{example.title}</h3>
            <p className="mt-4"><strong>The problem. </strong>{example.problem}</p>
            <p className="mt-3"><strong>A useful lens. </strong>{example.lens}</p>
            <p className="mt-3"><strong>A first move. </strong>{example.move}</p>
          </div>
          </div>
        </section>
        <section className="bg-scarlet px-5 py-14 md:px-12">
          <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-gold">Your turn</p>
          <h2 className="display-lg mt-3">Give that curiosity something to work on.</h2>
          <p className="mt-4 max-w-xl text-sm text-paper/80">Optional local exercise. Your notes stay in this page’s memory; they are not sent, saved, or evaluated by AI.</p>
          <form onSubmit={onSubmit} className="mt-8 grid max-w-2xl gap-4">
            {fields.map((field) => (
              <label key={field.key}>
                <span className="eyebrow">{field.label}</span>
                {field.long ? (
                  <textarea className="mt-2 w-full border-b-2 border-paper bg-transparent py-2 text-lg outline-none" maxLength={800} required value={idea[field.key]} onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })} />
                ) : (
                  <input className="mt-2 w-full border-b-2 border-paper bg-transparent py-2 text-lg outline-none" maxLength={300} required={field.key === "test"} value={idea[field.key]} onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })} />
                )}
              </label>
            ))}
            <button className="pill w-fit bg-paper text-ink" type="submit">Put the pieces together</button>
          </form>
          {shown.length > 0 && (
            <article className="mt-8 max-w-2xl bg-paper p-6 text-ink" aria-live="polite">
              <p className="eyebrow">Your working idea</p>
              <h3 className="font-display mt-2 text-3xl">Find. Adapt. Build.</h3>
              <dl>
                {fields.filter((field) => shown.includes(field.key)).map((field) => (
                  <div key={field.key} className="mt-4">
                    <dt className="font-semibold">{field.label}</dt>
                    <dd>{idea[field.key].trim()}</dd>
                  </div>
                ))}
              </dl>
            </article>
          )}
          </div>
        </section>
        <section className="px-5 py-14 md:px-12">
          <div className="mx-auto max-w-5xl">
          <h2 className="display-lg">What comes next?</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" search={{ interest: "Speaking" }} className="pill bg-scarlet text-paper">Bring CLICK to your team</Link>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="pill border-2 border-paper">Build with me</Link>
            <Link to="/signals" className="pill border-2 border-paper">Keep exploring</Link>
          </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
