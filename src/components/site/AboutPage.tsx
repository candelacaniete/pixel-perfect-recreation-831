import { useEffect, useRef } from "react";
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
  const board = useRef<HTMLDivElement>(null);
  useEffect(() => markVisited("about"), []);
  useEffect(() => {
    const node = board.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = [...node.querySelectorAll<HTMLElement>(".story-card")];
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    }, { threshold: 0.22, rootMargin: "0px 0px -6% 0px" });
    for (const card of cards) io.observe(card);
    return () => io.disconnect();
  }, []);
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
          <p className="yw-kicker">My story · {llanos.title}</p>
          <div className="diary-board" ref={board}>
            <article className="story-card story-card-lead">
              <h2>{llanos.paragraphs[0]}</h2>
            </article>
            <figure className="story-card story-card-photo story-card-plants">
              <img src={plants} width={1400} height={1400} alt="Yrmis Barroeta smiling among large green leaves" />
              <figcaption>Among the plants.</figcaption>
            </figure>
            <article className="story-card story-card-note">
              <p>{llanos.paragraphs[1]}</p>
            </article>
            <figure className="story-card story-card-photo story-card-portrait">
              <img
                src={blazer}
                width={2688}
                height={4032}
                alt="Yrmis Barroeta in a black blazer, hands at her waist, photographed in black and white"
              />
              <figcaption>Black blazer, black and white.</figcaption>
            </figure>
          </div>
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
