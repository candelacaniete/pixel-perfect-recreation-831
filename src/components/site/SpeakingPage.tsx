import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { DuskClose } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, studio } from "@/content/yrmis";
import jabiru from "@/assets/reference/ref-speaking-jabiru.jpg";
import llanos from "@/assets/reference/ref-click-llanos.jpg";

const topics = [
  { title: studio.keynote.title, body: siteCopy.speaking, pos: "30% 40%" },
  { title: studio.keynote.formats[0], body: studio.keynote.for, pos: "70% 30%" },
  { title: studio.keynote.formats[2], body: studio.keynote.in, pos: "50% 75%" },
  { title: studio.keynote.formats[3], body: studio.keynote.out, pos: "20% 60%" },
];

export function SpeakingPage() {
  useEffect(() => markVisited("speaking"), []);
  return (
    <Shell current="Speaking">
      <main className="yw">
        <section className="yw-hero yw-hero-speak" aria-label="Speaking">
          <img className="yw-hero-img" src={jabiru} alt="A jabiru standing in the Llanos at sunset" style={{ objectPosition: "center 30%" }} />
          <div className="yw-hero-copy">
            <h1 className="yw-display">Conversations<br />that inspire<br />a more alive<br />world</h1>
            <p className="yw-standfirst">{siteCopy.speaking}</p>
            <Link to="/contact" search={{ interest: "Speaking" }} className="yw-pill">Book Yrmis for an event →</Link>
          </div>
        </section>
        <section className="yw-sheet" id="topics">
          <h2>Topics</h2>
          <p>{studio.keynote.out}</p>
          <div className="yw-rows">
            {topics.map((topic) => (
              <article key={topic.title} className="yw-row">
                <img className="yw-thumb" src={llanos} alt="" style={{ objectPosition: topic.pos }} />
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.body}</p>
                </div>
              </article>
            ))}
          </div>
          <a href="#topics" className="yw-pill">See all topics →</a>
        </section>
        <DuskClose>
          <p className="yw-quote">“{studio.keynote.out}”</p>
          <Link to="/contact" search={{ interest: "Speaking" }} className="yw-pill yw-pill-ghost">Book a conversation →</Link>
        </DuskClose>
      </main>
    </Shell>
  );
}
