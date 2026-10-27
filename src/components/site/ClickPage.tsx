import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { ClickFive } from "@/components/site/ClickFive";
import { markVisited } from "@/components/safari/visited";
import { clickExamples, clickOutcomes, riverDestination } from "@/content/yrmis";
import llanos from "@/assets/reference/ref-click-llanos.jpg";

const crops = ["20% 70%", "70% 40%", "40% 30%", "80% 80%", "30% 50%"];

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
    <Shell current="CLICK">
      <main className="yw">
        <section className="yw-sheet">
          <h2>A way of seeing.<br />A way of acting.</h2>
          <p>{riverDestination.intro}</p>
          <Link to="/river" className="yw-play">
            <img src={llanos} alt="" />
            <span className="yw-play-btn" aria-hidden="true">▶</span>
            <span className="sr-only">Enter the CLICK experience</span>
          </Link>
          <div className="yw-block">
            <h2>The principles of CLICK</h2>
            <div className="yw-principles">
              {clickOutcomes.map((item, index) => (
                <Link key={item.name} to="/river" search={{ stop: index }} className="yw-principle">
                  <img className="yw-thumb" src={llanos} alt="" style={{ height: "4.4rem", objectPosition: crops[index] }} />
                  <strong>0{index + 1} {item.name}</strong>
                  <span>{item.line}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="yw-block">
            <p className="yw-kicker">Illustrative examples from the talk</p>
            <div className="yw-examples" role="group" aria-label="Explore innovation examples">
              {clickExamples.map((item, index) => (
                <button key={item.title} type="button" aria-pressed={scene === index} onClick={() => setScene(index)}>{item.title}</button>
              ))}
            </div>
            <h3 className="yw-display" style={{ fontSize: "2rem", marginTop: "1.2rem", textTransform: "none" }}>{example.title}</h3>
            <p><strong>The problem. </strong>{example.problem}</p>
            <p><strong>A useful lens. </strong>{example.lens}</p>
            <p><strong>A first move. </strong>{example.move}</p>
          </div>
          <div className="yw-block">
            <h2>Give that curiosity something to work on.</h2>
            <p>Optional local exercise. Your notes stay in this page’s memory; they are not sent, saved, or evaluated by AI.</p>
            <form onSubmit={onSubmit} className="ll-form" style={{ maxWidth: "40rem", marginTop: "1.2rem" }}>
              {fields.map((field) => (
                <label key={field.key}>
                  <span className="yw-kicker">{field.label}</span>
                  {field.long ? (
                    <textarea className="ll-field" maxLength={800} required value={idea[field.key]} onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })} />
                  ) : (
                    <input className="ll-field" maxLength={300} required={field.key === "test"} value={idea[field.key]} onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })} />
                  )}
                </label>
              ))}
              <button className="yw-pill" type="submit">Put the pieces together</button>
            </form>
            {shown.length > 0 && (
              <article aria-live="polite" style={{ marginTop: "1.4rem" }}>
                <p className="yw-kicker">Your working idea</p>
                {fields.filter((field) => shown.includes(field.key)).map((field) => (
                  <p key={field.key}><strong>{field.label}. </strong>{idea[field.key].trim()}</p>
                ))}
              </article>
            )}
          </div>
          <div className="yw-block">
            <h2>Open a part of the river</h2>
            <div style={{ marginTop: "1rem" }}><ClickFive /></div>
          </div>
        </section>
        <Band src={llanos} tall>
          <h2>Explore the CLICK experience</h2>
          <p>A separate journey. It is not part of this page, and it is not in the main menu.</p>
          <Link to="/river" className="yw-pill">Enter the experience →</Link>
        </Band>
      </main>
    </Shell>
  );
}
