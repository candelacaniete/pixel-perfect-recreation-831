import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import serpent from "@/assets/fauna/anaconda-stars.jpg";
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

const llanos = siteCopy.story[0];
const across = siteCopy.story[1];
const carry = siteCopy.story[2];

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

        <section className="diary-open" id="story">
          <svg className="diary-palm" viewBox="0 0 240 360" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M118 348c2-78 4-150 2-228" />
              <path d="M120 132c-28-18-62-16-96 2" />
              <path d="M120 118c-18-34-22-70 2-104" />
              <path d="M122 126c34-14 70-6 102 18" />
              <path d="M120 150c-36 6-64 28-78 62" />
              <path d="M122 146c32 10 58 32 70 66" />
            </g>
            <g fill="currentColor">
              <circle cx="28" cy="48" r="1.3" />
              <circle cx="54" cy="28" r="1" />
              <circle cx="86" cy="18" r="1.4" />
              <circle cx="168" cy="36" r="1.1" />
              <circle cx="198" cy="62" r="1.3" />
              <circle cx="210" cy="96" r="1" />
            </g>
          </svg>
          <div className="diary-copy">
            <p className="yw-kicker">My story · {llanos.title}</p>
            <h2 className="diary-lede">{llanos.paragraphs[0]}</h2>
            <p className="diary-lede diary-lede-next">{llanos.paragraphs[1]}</p>
            <figure className="diary-companion">
              <img src={plants} width={1400} height={1400} alt="Yrmis Barroeta smiling among large green leaves" />
              <figcaption>Among the plants.</figcaption>
            </figure>
          </div>
          <figure className="diary-frame">
            <div className="diary-print">
              <img
                src={blazer}
                width={2688}
                height={4032}
                alt="Yrmis Barroeta in a black blazer, hands at her waist, photographed in black and white"
              />
            </div>
            <figcaption>Black blazer, black and white.</figcaption>
          </figure>
        </section>

        <section className="diary-drives" aria-labelledby="drives-title">
          <h2 id="drives-title">What drives me</h2>
          <div className="diary-triptych">
            {drives.map((item) => (
              <article key={item.title} className="diary-card">
                <p className="diary-ico"><DriveIcon name={item.icon} /></p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="diary-close" aria-labelledby="experience-title">
          <img className="diary-hide" src={serpent} alt="" />
          <div className="diary-manifest">
            <p className="diary-quote">“{carry.paragraphs[1]}”</p>
            <p className="diary-aside">{carry.paragraphs[0]}</p>
            <figure className="diary-companion diary-companion-light">
              <img src={heels} width={1440} height={1800} alt="Yrmis Barroeta in red tights and red heels, one hand resting on her shin" />
              <figcaption>Red tights and red heels.</figcaption>
            </figure>
          </div>
          <div className="diary-experience">
            <p className="yw-kicker">{across.title}</p>
            <h2 id="experience-title">Experience & background</h2>
            <div className="diary-columns">
              <p>{across.paragraphs[0]}</p>
              <div>
                <p>{across.paragraphs[1]}</p>
                <p>{across.paragraphs[2]}</p>
              </div>
            </div>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">See my full journey →</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
