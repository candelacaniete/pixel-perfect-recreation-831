import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties, type FormEvent } from "react";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { clickExamples } from "@/content/yrmis";

const fields = [
  { key: "problem", label: "The problem I keep noticing", long: true },
  { key: "lens", label: "A lens I could borrow", long: false },
  { key: "reuse", label: "Something I can reuse", long: false },
  { key: "feedback", label: "Feedback that would help", long: false },
  { key: "test", label: "One small test I can try", long: false },
] as const;

type IdeaKey = (typeof fields)[number]["key"];

export function ClickPage() {
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
      <section className="chapter">
        <div className="chap">
          <span className="num">CLICK</span>
          <h1 className="d" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            What can be
            <br />
            <em>done better?</em>
          </h1>
          <p className="lede">Think of your desk, your company, your neighborhood. What’s one thing that bugs you? Start there. You can open this page without finishing the river.</p>
        </div>
        <ClickFive />
      </section>
      <section className="chapter short">
        <div className="sq bone" style={{ margin: "0 var(--m, 5vw)" }}>
          <div className="split" style={{ paddingTop: 0 }}>
            <div>
              <div className="eyebrow">Illustrative examples from the talk</div>
              <h2 className="d h-l">
                Find. Adapt.
                <br />
                <em>Build.</em>
              </h2>
            </div>
            <div className="actions" role="group" aria-label="Explore innovation examples">
              {clickExamples.map((item, index) => (
                <button key={item.title} type="button" className="btn" aria-pressed={scene === index} onClick={() => setScene(index)}>
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          <div className="split">
            <div className="sq oxb" data-kind={example.kind} aria-hidden="true" style={{ minHeight: 220, alignItems: "center", justifyContent: "center", gap: 16 }}>
              <span style={shape(example.kind, 0)} />
              <span style={shape(example.kind, 1)} />
            </div>
            <div>
              <h3 className="d h-l">{example.title}</h3>
              <div className="eyebrow">The problem</div>
              <p>{example.problem}</p>
              <div className="eyebrow">A useful lens</div>
              <p>{example.lens}</p>
              <div className="eyebrow">A first move</div>
              <p>{example.move}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="chapter short">
        <div className="sq redb" style={{ margin: "0 var(--m, 5vw)" }}>
          <div className="eyebrow">Your turn</div>
          <h2 className="d h-l">
            Give that curiosity
            <br />
            <em>something to work on.</em>
          </h2>
          <p className="small">Optional local exercise. Your notes stay in this page’s memory; they are not sent, saved, or evaluated by AI.</p>
          <form className="form" onSubmit={onSubmit}>
            {fields.map((field) => (
              <div key={field.key}>
                <label htmlFor={`idea-${field.key}`}>{field.label}</label>
                {field.long ? (
                  <textarea id={`idea-${field.key}`} maxLength={800} required value={idea[field.key]} onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })} />
                ) : (
                  <input id={`idea-${field.key}`} maxLength={300} required={field.key === "test"} value={idea[field.key]} onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })} />
                )}
              </div>
            ))}
            <button className="btn" type="submit">
              Put the pieces together
            </button>
          </form>
          {shown.length > 0 && (
            <article className="idea" aria-live="polite">
              <div className="eyebrow">Your working idea</div>
              <h3 className="d">Find. Adapt. Build.</h3>
              <dl>
                {fields
                  .filter((field) => shown.includes(field.key))
                  .map((field) => (
                    <div key={field.key}>
                      <dt>{field.label}</dt>
                      <dd>{idea[field.key].trim()}</dd>
                    </div>
                  ))}
              </dl>
            </article>
          )}
        </div>
        <div className="sq oxb" style={{ margin: "14px var(--m, 5vw) 0" }}>
          <h2 className="d h-l">What comes next?</h2>
          <div className="actions">
            <Link to="/contact" search={{ interest: "Speaking" }} className="btn">
              Bring CLICK to your team
            </Link>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="btn">
              Build with me
            </Link>
            <Link to="/signals" className="btn">
              Keep exploring
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}

function shape(kind: string, index: number): CSSProperties {
  if (kind === "table") {
    return { width: 90, height: 90, borderRadius: "50%", background: index ? "#DC235B" : "#E4701D", border: "12px solid #F7EEDA", display: "block" };
  }
  if (kind === "clip") {
    return index
      ? { width: 36, height: 36, borderRadius: "50%", background: "#750217", display: "block" }
      : { width: 150, height: 100, borderRadius: 15, background: "#E08A47", transform: "rotate(-20deg)", display: "block" };
  }
  return {
    width: 48,
    height: 160,
    borderRadius: "40% 40% 8% 8%",
    background: index ? "#FAB702" : "#DC235B",
    transform: index ? "rotate(-12deg)" : "rotate(12deg)",
    display: "block",
  };
}
