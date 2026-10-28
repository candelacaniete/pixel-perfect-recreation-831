import { useEffect, useRef, useState } from "react";
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
  { title: "Curiosity", body: "Notice what bugs you. Ask what could work better." },
  { title: "Nature", body: "What I found was a problem I cared about too much to ignore." },
  { title: "People", body: "I work with founders and leadership teams." },
] as const;

type DriveName = (typeof drives)[number]["title"];

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function CuriosityScene() {
  return (
    <>
      <svg className="mark glass-a" viewBox="0 0 64 64" aria-hidden="true"><circle {...stroke} cx="26" cy="26" r="14" /><path {...stroke} d="M36 36 L50 50" /></svg>
      <svg className="mark glass-b" viewBox="0 0 64 64" aria-hidden="true"><circle {...stroke} cx="26" cy="26" r="14" /><path {...stroke} d="M36 36 L50 50" /></svg>
      <span className="mark q-small q-a">?</span>
      <span className="mark q-small q-b">?</span>
      <span className="mark q-big">?</span>
      <svg className="mark book" viewBox="0 0 72 48" aria-hidden="true"><path {...stroke} d="M8 12c8-6 16-6 24 0v26c-8-6-16-6-24 0z" /><path {...stroke} d="M64 12c-8-6-16-6-24 0v26c8-6 16-6 24 0z" /><path {...stroke} d="M32 12v26" /></svg>
      <svg className="mark bins" viewBox="0 0 64 40" aria-hidden="true"><circle {...stroke} cx="16" cy="22" r="10" /><circle {...stroke} cx="46" cy="22" r="10" /><path {...stroke} d="M26 22h10M8 12h10M44 12h10" /></svg>
    </>
  );
}

function NatureScene() {
  const drops = ["d1", "d2", "d3", "d4", "d5"];
  return (
    <>
      <svg className="mark palm palm-a" viewBox="0 0 120 160" aria-hidden="true">
        <path {...stroke} d="M58 152c2-40 2-78 0-112" />
        <path {...stroke} d="M58 48c-16-8-34-6-52 6" />
        <path {...stroke} d="M58 42c-8-22-8-44 6-64" />
        <path {...stroke} d="M60 46c18-6 38-2 56 12" />
        <path {...stroke} d="M58 62c-18 4-32 16-40 34" />
        <path {...stroke} d="M60 60c16 6 30 18 36 36" />
      </svg>
      <svg className="mark palm palm-b" viewBox="0 0 120 160" aria-hidden="true">
        <path {...stroke} d="M58 152c2-40 2-78 0-112" />
        <path {...stroke} d="M58 48c-16-8-34-6-52 6" />
        <path {...stroke} d="M58 42c-8-22-8-44 6-64" />
        <path {...stroke} d="M60 46c18-6 38-2 56 12" />
        <path {...stroke} d="M58 62c-18 4-32 16-40 34" />
        <path {...stroke} d="M60 60c16 6 30 18 36 36" />
      </svg>
      {drops.map((name) => (
        <svg key={name} className={`mark drop ${name}`} viewBox="0 0 24 36" aria-hidden="true">
          <path {...stroke} d="M12 3c5 8 8 13 8 18a8 8 0 1 1-16 0c0-5 3-10 8-18z" />
        </svg>
      ))}
      <svg className="mark leaf" viewBox="0 0 72 40" aria-hidden="true"><path {...stroke} d="M6 30c16-2 32-16 52-26-4 16-16 28-34 32" /><path {...stroke} d="M22 28c6-6 14-10 24-12" /></svg>
    </>
  );
}

function PeopleScene() {
  return (
    <>
      <svg className="mark circles" viewBox="0 0 88 72" aria-hidden="true">
        <circle {...stroke} cx="30" cy="30" r="16" />
        <circle {...stroke} cx="56" cy="30" r="16" />
        <circle {...stroke} cx="43" cy="46" r="16" />
      </svg>
      <svg className="mark people-line" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true">
        <path {...stroke} pathLength={1} d="M0 2h100" />
      </svg>
      <svg className="mark arc arc-a" viewBox="0 0 64 36" aria-hidden="true"><path {...stroke} d="M6 28c8-16 44-16 52 0" /></svg>
      <svg className="mark arc arc-b" viewBox="0 0 64 36" aria-hidden="true"><path {...stroke} d="M6 28c8-16 44-16 52 0" /></svg>
    </>
  );
}

const llanos = siteCopy.story[0];
const across = siteCopy.story[1];
const carry = siteCopy.story[2];
const openSentences = llanos.paragraphs[0].split(/(?<=\.)\s+/);
const foundAt = llanos.paragraphs[1].indexOf("I didn’t");
const foundLines = [llanos.paragraphs[1].slice(0, foundAt).trim(), llanos.paragraphs[1].slice(foundAt).trim()];

function StoryLines({ lines }: { lines: string[] }) {
  return (
    <span className="story-lines">
      {lines.map((line) => <span key={line}>{line}</span>)}
    </span>
  );
}

export function AboutPage() {
  const board = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState<DriveName | null>(null);
  const [scene, setScene] = useState<DriveName | null>(null);
  useEffect(() => markVisited("about"), []);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (!open || !stage.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stage.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }, [open]);
  function toggle(title: DriveName) {
    if (timer.current) clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (open === title) {
      setScene(null);
      if (reduce) setOpen(null);
      else timer.current = setTimeout(() => setOpen(null), 260);
      return;
    }
    setScene(null);
    setOpen(title);
    if (reduce) setScene(title);
    else timer.current = setTimeout(() => setScene(title), 420);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") toggle(open); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
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
              <h2><StoryLines lines={openSentences} /></h2>
            </article>
            <figure className="story-card story-card-photo story-card-plants">
              <img src={plants} width={1400} height={1400} alt="Yrmis Barroeta smiling among large green leaves" />
              <figcaption>Among the plants.</figcaption>
            </figure>
            <figure className="story-card story-card-photo story-card-portrait">
              <img
                src={blazer}
                width={2688}
                height={4032}
                alt="Yrmis Barroeta in a black blazer, hands at her waist, photographed in black and white"
              />
              <figcaption>Black blazer, black and white.</figcaption>
            </figure>
            <article className="story-card story-card-note">
              <p><StoryLines lines={foundLines} /></p>
            </article>
          </div>
        </section>

        <section className="diary-drives" aria-labelledby="drives-title">
          <h2 id="drives-title">What drives me</h2>
          <div className={`diary-stage${open ? " is-open" : ""}`} data-open={open ?? "none"} ref={stage}>
            <div className="drive-scene" aria-hidden="true">
              {scene === "Curiosity" && <CuriosityScene />}
              {scene === "Nature" && <NatureScene />}
              {scene === "People" && <PeopleScene />}
            </div>
            <div className="diary-triptych">
              {drives.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className={`diary-card${open === item.title ? " is-chosen" : ""}`}
                  data-drive={item.title}
                  aria-expanded={open === item.title}
                  onClick={() => toggle(item.title)}
                >
                  <h3>{item.title}</h3>
                  <span className="sr-only">{item.body}</span>
                </button>
              ))}
            </div>
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
