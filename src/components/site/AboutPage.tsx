import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import anaconda from "@/assets/reference/ref-about-anaconda.jpg";
import portrait from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import tree from "@/assets/origin.jpg";

const drives = [
  { n: "01", title: "Curiosity", body: "Notice what bugs you. Ask what could work better." },
  { n: "02", title: "Nature", body: siteCopy.story[0].paragraphs[1] },
  { n: "03", title: "People", body: siteCopy.studio },
];

export function AboutPage() {
  useEffect(() => markVisited("about"), []);
  return (
    <Shell current="About">
      <main className="yw">
        <section className="open about-open" aria-label="About">
          <div className="open-copy">
            <p className="yw-kicker">A journey across territories, ideas and life.</p>
            <h1 className="yw-display">A curious<br />way of<br />belonging</h1>
            <p className="yw-standfirst">{siteCopy.about}</p>
          </div>
          <figure>
            <img src={anaconda} alt="An anaconda coiled through dark water at dusk" />
          </figure>
        </section>
        <section className="yw-sheet" id="story">
          <img className="story-photo" src={portrait} alt="Yrmis Barroeta" />
          <h2>My story</h2>
          {siteCopy.story.map((chapter) => (
            <article key={chapter.title} className="yw-story">
              <p className="yw-kicker">{chapter.title}</p>
              {chapter.paragraphs.map((paragraph) => <p key={paragraph} className="yw-prose">{paragraph}</p>)}
            </article>
          ))}
          <blockquote className="yw-quote" style={{ color: "var(--yw-ink)", marginTop: "2.2rem" }}>
            “{siteCopy.story[2].paragraphs[1]}”
          </blockquote>
          <div className="yw-block">
            <h2>What drives me</h2>
            <div className="yw-drives">
              {drives.map((item) => (
                <article key={item.n}>
                  <p className="yw-mark-num">{item.n}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="yw-block">
            <h2>Experience & background</h2>
            <p>{siteCopy.walkingOut}</p>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">See my full journey →</Link>
          </div>
        </section>
        <Band src={tree}>
          <p className="yw-quote">“{siteCopy.yellow}”</p>
        </Band>
      </main>
    </Shell>
  );
}
