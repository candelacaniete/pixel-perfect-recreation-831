import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { markVisited } from "@/components/safari/visited";
import { clickExamples, riverDestination } from "@/content/yrmis";
import coil from "@/assets/living/anaconda-coil-1.jpg";

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
      <main className="llanos">
        <section className="ll-split">
          <div className="ll-panel">
            <p className="ll-kicker">CLICK</p>
            <h1 className="ll-display" style={{ marginTop: "0.7rem" }}>{riverDestination.headline}</h1>
            <p className="ll-lede">Think of your desk, your company, your neighborhood. What’s one thing that bugs you? Start there. You can open this page without finishing the river.</p>
          </div>
          <figure className="ll-portrait" style={{ minHeight: "22rem" }}>
            <img src={coil} alt="The anaconda coiled in the night water" />
          </figure>
        </section>
        <section className="ll-pad">
          <ClickFive />
        </section>
        <section className="ll-pad" style={{ paddingTop: 0 }}>
          <p className="ll-kicker">Illustrative examples from the talk</p>
          <h2 className="ll-title" style={{ marginTop: "0.6rem" }}>Find. Adapt. Build.</h2>
          <div className="ll-examples" style={{ marginTop: "1.2rem" }} role="group" aria-label="Explore innovation examples">
            {clickExamples.map((item, index) => (
              <button key={item.title} type="button" aria-pressed={scene === index} onClick={() => setScene(index)} className="ll-btn">
                {item.title}
              </button>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", maxWidth: "40rem" }}>
            <h3 className="ll-title" style={{ fontSize: "2rem" }}>{example.title}</h3>
            <p><strong>The problem. </strong>{example.problem}</p>
            <p><strong>A useful lens. </strong>{example.lens}</p>
            <p><strong>A first move. </strong>{example.move}</p>
          </div>
        </section>
        <section className="ll-pad ll-red">
          <p className="ll-kicker">Your turn</p>
          <h2 className="ll-title" style={{ marginTop: "0.6rem" }}>Give that curiosity something to work on.</h2>
          <p className="ll-lede">Optional local exercise. Your notes stay in this page’s memory; they are not sent, saved, or evaluated by AI.</p>
          <form onSubmit={onSubmit} className="ll-form" style={{ maxWidth: "40rem", marginTop: "1.5rem" }}>
            {fields.map((field) => (
              <label key={field.key}>
                <span className="ll-kicker">{field.label}</span>
                {field.long ? (
                  <textarea className="ll-field" style={{ borderColor: "#fff", color: "#fff" }} maxLength={800} required value={idea[field.key]} onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })} />
                ) : (
                  <input className="ll-field" style={{ borderColor: "#fff", color: "#fff" }} maxLength={300} required={field.key === "test"} value={idea[field.key]} onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })} />
                )}
              </label>
            ))}
            <button className="ll-btn ll-btn-light" type="submit" style={{ width: "fit-content" }}>Put the pieces together</button>
          </form>
          {shown.length > 0 && (
            <article className="ll-panel" style={{ marginTop: "1.5rem", maxWidth: "40rem", background: "var(--ll-bone)", color: "var(--ll-ink)" }} aria-live="polite">
              <p className="ll-kicker">Your working idea</p>
              <h3 className="ll-title" style={{ fontSize: "2rem", marginTop: "0.4rem" }}>Find. Adapt. Build.</h3>
              <dl>
                {fields.filter((field) => shown.includes(field.key)).map((field) => (
                  <div key={field.key} style={{ marginTop: "1rem" }}>
                    <dt className="ll-kicker">{field.label}</dt>
                    <dd style={{ margin: "0.3rem 0 0" }}>{idea[field.key].trim()}</dd>
                  </div>
                ))}
              </dl>
            </article>
          )}
        </section>
        <section className="ll-pad">
          <h2 className="ll-title">What comes next?</h2>
          <div className="ll-actions">
            <Link to="/contact" search={{ interest: "Speaking" }} className="ll-btn ll-btn-red">Bring CLICK to your team</Link>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="ll-btn">Build with me</Link>
            <Link to="/signals" className="ll-btn">Keep exploring</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
