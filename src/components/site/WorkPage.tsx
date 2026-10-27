import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, studio } from "@/content/yrmis";
import capybara from "@/assets/reference/ref-home-capybara.jpg";

export function WorkPage() {
  useEffect(() => markVisited("work"), []);
  return (
    <Shell current="Work with me">
      <main className="yw">
        <section className="yw-intro">
          <div>
            <p className="yw-kicker">Consulting Studio</p>
            <h1 className="yw-lead">{studio.intro}</h1>
            <p>{siteCopy.studio}</p>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">Start a project</Link>
          </div>
          <img className="yw-portrait yw-frame" src={capybara} width={864} height={1152} alt="A capybara among water lilies at sunset in the Llanos" />
        </section>
        <section className="yw-sheet">
          <p className="yw-kicker">Who I work with</p>
          <div className="yw-tracks">
            {studio.tracks.map((track) => (
              <Link key={track.name} to="/contact" search={{ interest: "Consulting Studio" }}>
                <span className="yw-kicker">{track.name}</span>
                <h2>{track.name}</h2>
                <p>{track.body}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="yw-sheet yw-read-maroon" style={{ marginTop: 0, borderRadius: 0 }}>
          <div className="yw-block">
            <p className="yw-kicker">Communications strategy</p>
            <h2>{siteCopy.communications}</h2>
            <Link to="/contact" search={{ interest: "Communications strategy" }} className="yw-pill">Start a project</Link>
          </div>
        </section>
        <section className="yw-dark">
          <p className="yw-kicker">Start a project</p>
          <h2>Tell me what you’re building.</h2>
          <p>{siteCopy.conversation}</p>
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">Start a project inquiry</Link>
        </section>
      </main>
    </Shell>
  );
}
