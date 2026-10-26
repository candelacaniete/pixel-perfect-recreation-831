import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
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
  const [idea, setIdea] = useState<Record<IdeaKey, string>>({
    problem: "",
    lens: "",
    reuse: "",
    feedback: "",
    test: "",
  });
  const [shown, setShown] = useState<IdeaKey[]>([]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShown(fields.filter((field) => idea[field.key].trim()).map((field) => field.key));
  }

  return (
    <Shell>
      <p className="ed-eyebrow">CLICK · Innovation, put to work</p>
      <h1>
        What can be
        <br />
        <em>done better?</em>
      </h1>
      <p>Think of your desk, your company, your neighborhood. What’s one thing that bugs you? Start there.</p>
      <p>You can open this page without finishing the river.</p>
      <div className="ed-path" aria-label="Experience flow">
        <span>The Llanos</span>
        <span aria-hidden="true">→</span>
        <span>Five encounters</span>
        <span aria-hidden="true">→</span>
        <span>CLICK</span>
        <span aria-hidden="true">→</span>
        <span>Find. Adapt. Build.</span>
      </div>
      <ClickFive />
      <section className="ed-scene">
        <div className="ed-scene-top">
          <div>
            <p className="ed-eyebrow">Illustrative examples from the talk</p>
            <h2>
              Find. Adapt.
              <br />
              <em>Build.</em>
            </h2>
          </div>
          <div className="ed-controls" role="group" aria-label="Explore innovation examples">
            {clickExamples.map((item, index) => (
              <button key={item.title} type="button" className="ed-control" aria-pressed={scene === index} onClick={() => setScene(index)}>
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <div className="ed-scene-board">
          <div className="ed-object" data-kind={example.kind} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <h3>{example.title}</h3>
            <p className="ed-eyebrow">The problem</p>
            <p>{example.problem}</p>
            <p className="ed-eyebrow">A useful lens</p>
            <p>{example.lens}</p>
            <p className="ed-eyebrow">A first move</p>
            <p>{example.move}</p>
          </div>
        </div>
      </section>
      <section className="ed-workbench">
        <p className="ed-eyebrow">Your turn</p>
        <h2>
          Give that curiosity
          <br />
          <em>something to work on.</em>
        </h2>
        <p>Optional local exercise. Your notes stay in this page’s memory; they are not sent, saved, or evaluated by AI.</p>
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={`idea-${field.key}`}>{field.label}</label>
              {field.long ? (
                <textarea
                  id={`idea-${field.key}`}
                  maxLength={800}
                  required
                  value={idea[field.key]}
                  onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })}
                />
              ) : (
                <input
                  id={`idea-${field.key}`}
                  maxLength={300}
                  required={field.key === "test"}
                  value={idea[field.key]}
                  onChange={(event) => setIdea({ ...idea, [field.key]: event.target.value })}
                />
              )}
            </div>
          ))}
          <div className="ed-controls">
            <button className="ed-control" type="submit">
              Put the pieces together →
            </button>
          </div>
        </form>
        {shown.length > 0 && (
          <article className="ed-idea" aria-live="polite">
            <p className="ed-eyebrow">Your working idea</p>
            <h3>Find. Adapt. Build.</h3>
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
      </section>
      <section className="ed-block ed-maroon ed-space">
        <h2>What comes next?</h2>
        <div className="ed-controls">
          <Link to="/contact" search={{ interest: "Speaking" }} className="ed-control">
            Bring CLICK to your team
          </Link>
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="ed-control">
            Build with me
          </Link>
          <Link to="/signals" className="ed-control">
            Keep exploring
          </Link>
        </div>
      </section>
    </Shell>
  );
}
