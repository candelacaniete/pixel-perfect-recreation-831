import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import capy from "@/assets/living/capy-work.png";

const tracks = [
  { eyebrow: "Founders", title: "From idea to next stage.", body: siteCopy.founders, tone: "ll-red", interest: "Consulting Studio" as const },
  { eyebrow: "Executive teams", title: "A thinking partner.", body: siteCopy.executives, tone: "ll-ox", interest: "Consulting Studio" as const },
  { eyebrow: "Institutions", title: "Venture partners.", body: siteCopy.institutions, tone: "ll-copper", interest: "Consulting Studio" as const },
];

export function WorkPage() {
  useEffect(() => markVisited("work"), []);
  return (
    <Shell current="Work with me">
      <main className="llanos">
        <section className="ll-split">
          <div className="ll-panel">
            <p className="ll-kicker">02 · Consulting Studio</p>
            <h1 className="ll-display" style={{ marginTop: "0.8rem" }}>Plan and<br /><em>conspire.</em></h1>
            <p className="ll-lede">{siteCopy.studio}</p>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="ll-btn ll-btn-red" style={{ marginTop: "1.5rem" }}>
              Discuss your project
            </Link>
          </div>
          <figure className="ll-portrait" style={{ minHeight: "28rem", background: "var(--ll-copper)" }}>
            <img src={capy} alt="The capybara mechanic, tools in hand" style={{ objectFit: "contain", background: "var(--ll-copper)" }} />
          </figure>
        </section>
        <section className="ll-grid-3 ll-work-tracks">
          {tracks.map((track) => (
            <Link key={track.eyebrow} to="/contact" search={{ interest: track.interest }} className={track.tone}>
              <span className="ll-kicker">{track.eyebrow}</span>
              <h2>{track.title}</h2>
              <p>{track.body}</p>
            </Link>
          ))}
        </section>
        <section className="ll-grid-2 ll-pair">
          <Link to="/contact" search={{ interest: "Communications strategy" }} className="ll-ink">
            <span className="ll-kicker">Communications strategy</span>
            <h2>{siteCopy.communications}</h2>
          </Link>
          <Link to="/contact" search={{ interest: "Other" }} className="ll-panel" style={{ padding: "1.6rem" }}>
            <span className="ll-kicker">Something we haven’t named yet</span>
            <h2>{siteCopy.unnamed}</h2>
          </Link>
        </section>
      </main>
    </Shell>
  );
}
