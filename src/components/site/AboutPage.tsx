import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import anaconda from "@/assets/reference/ref-about-anaconda.jpg";
import serpent from "@/assets/fauna/anaconda-stars.jpg";
import dusk from "@/assets/reference/ref-dusk-llanos.jpg";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import plants from "@/assets/sourced/portraits/yrmis-plants.jpg";
import heels from "@/assets/sourced/portraits/yrmis-red.jpg";

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
        <EditorialHero
          fauna="anaconda"
          kicker="A journey across territories, ideas and life."
          title="A curious way of belonging"
          deck={siteCopy.about}
          ground={serpent}
          groundAlt="An anaconda with starry scales coiled in a Llanos wetland at night"
        />
        <section className="yw-read" id="story">
          <h2>My story</h2>
          <figure className="yw-plate">
            <img src={blazer} width={2688} height={4032} alt="Yrmis Barroeta in a black blazer, hands at her waist, photographed in black and white" />
            <figcaption>Black blazer, black and white.</figcaption>
          </figure>
          {siteCopy.story.map((chapter, index) => (
            <article key={chapter.title} className="yw-story">
              <h3>{chapter.title}</h3>
              {chapter.paragraphs.map((paragraph) => <p key={paragraph} className="yw-prose">{paragraph}</p>)}
              {index === 0 && (
                <figure className="yw-plate">
                  <img src={plants} width={1400} height={1400} alt="Yrmis Barroeta smiling among large green leaves" />
                  <figcaption>Among the plants.</figcaption>
                </figure>
              )}
              {index === 1 && (
                <figure className="yw-plate">
                  <img src={heels} width={1440} height={1800} alt="Yrmis Barroeta in red tights and red heels, one hand resting on her shin" />
                  <figcaption>Red tights and red heels.</figcaption>
                </figure>
              )}
            </article>
          ))}
        </section>
        <Band src={anaconda}>
          <p className="yw-quote">“{siteCopy.story[2].paragraphs[1]}”</p>
        </Band>
        <section className="yw-sheet yw-read-maroon" style={{ marginTop: 0, borderRadius: 0 }}>
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
