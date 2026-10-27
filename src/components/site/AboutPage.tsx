import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import anaconda from "@/assets/reference/ref-about-anaconda.jpg";
import dusk from "@/assets/reference/ref-dusk-llanos.jpg";
import portrait from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import typeAbout from "@/assets/reference/type-about.png";

const drives = [
  { title: "Curiosity", body: "Notice what bugs you. Ask what could work better.", icon: "eye" },
  { title: "Nature", body: "What I found was a problem I cared about too much to ignore.", icon: "leaf" },
  { title: "People", body: "I work with founders and leadership teams.", icon: "people" },
] as const;

function DriveIcon({ name }: { name: (typeof drives)[number]["icon"] }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "eye") {
    return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" /></svg>;
  }
  if (name === "leaf") {
    return <svg {...common}><path d="M5 19c8 0 14-8 14-14-6 0-14 6-14 14z" /><path d="M8 14c2-2 5-4 8-5" /></svg>;
  }
  return <svg {...common}><circle cx="9" cy="9" r="2.2" /><circle cx="16" cy="10" r="1.7" /><path d="M4.5 18c.6-2.2 2.4-3.4 4.5-3.4S13 15.8 13.6 18M14 18c.3-1.5 1.4-2.5 3-2.5 1.2 0 2.2.6 2.7 1.6" /></svg>;
}

export function AboutPage() {
  useEffect(() => markVisited("about"), []);
  return (
    <Shell current="About">
      <main className="yw">
        <section className="bleed" aria-label="About">
          <img className="bleed-photo" src={anaconda} alt="An anaconda coiled through dark water at dusk" style={{ objectPosition: "18% 38%" }} />
          <div className="bleed-copy">
            <p className="yw-kicker">A journey across territories, ideas and life.</p>
            <h1 className="lockup-title"><img className="lockup" src={typeAbout} alt="A curious way of belonging" /></h1>
            <p className="yw-standfirst">{siteCopy.about}</p>
          </div>
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
        </section>
        <Band src={anaconda}>
          <p className="yw-quote">“{siteCopy.story[2].paragraphs[1]}”</p>
        </Band>
        <section className="yw-sheet" style={{ marginTop: 0, borderRadius: 0 }}>
          <div className="yw-block">
            <h2>What drives me</h2>
            <div className="yw-drives">
              {drives.map((item) => (
                <article key={item.title}>
                  <p className="yw-ico-ink"><DriveIcon name={item.icon} /></p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="yw-block">
            <h2>Experience & background</h2>
            <p>{siteCopy.story[1].paragraphs[0]}</p>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">See my full journey →</Link>
          </div>
        </section>
        <section className="yw-strip"><img src={dusk} alt="" /></section>
      </main>
    </Shell>
  );
}
