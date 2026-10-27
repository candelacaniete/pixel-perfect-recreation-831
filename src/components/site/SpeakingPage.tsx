import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, studio } from "@/content/yrmis";
import jabiru from "@/assets/reference/ref-speaking-jabiru.jpg";
import plain from "@/assets/living/speaking-llanos.jpg";
import stage from "@/assets/sourced/portraits/yrmis-stage.webp";
import seated from "@/assets/sourced/portraits/yrmis-seated.jpg";
import red from "@/assets/sourced/portraits/yrmis-red.jpg";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";
import typeSpeaking from "@/assets/reference/type-speaking.png";

const topics = [
  { title: studio.keynote.title, body: siteCopy.speaking, img: stage },
  { title: "For the room", body: studio.keynote.for, img: seated },
  { title: "What changes", body: studio.keynote.out, img: red },
  { title: "Where it starts", body: studio.keynote.in, img: glasses },
];

export function SpeakingPage() {
  useEffect(() => markVisited("speaking"), []);
  return (
    <Shell current="Speaking">
      <main className="yw">
        <section className="bleed" aria-label="Speaking">
          <img className="bleed-photo" src={jabiru} alt="A jabiru standing in the Llanos at sunset" style={{ objectPosition: "68% 28%" }} />
          <div className="bleed-copy">
            <h1 className="lockup-title"><img className="lockup" src={typeSpeaking} alt="Conversations that inspire a more alive world" /></h1>
            <p className="yw-standfirst">{siteCopy.speaking}</p>
            <Link to="/contact" search={{ interest: "Speaking" }} className="yw-pill">Book Yrmis for an event →</Link>
          </div>
        </section>
        <section className="yw-sheet" id="topics">
          <h2>Topics</h2>
          <p>{siteCopy.speaking}</p>
          <div className="yw-rows">
            {topics.map((topic) => (
              <article key={topic.title} className="yw-row">
                <img className="yw-thumb" src={topic.img} alt="" />
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="yw-block">
            <h2>Formats</h2>
            <div className="yw-rows">
              {studio.keynote.formats.map((format) => (
                <article key={format} className="yw-row">
                  <p className="yw-mark-num">Talk</p>
                  <h3>{format}</h3>
                </article>
              ))}
            </div>
            <Link to="/contact" search={{ interest: "Speaking" }} className="yw-pill">See all topics →</Link>
          </div>
        </section>
        <Band src={plain}>
          <p className="yw-quote">“{studio.keynote.out}”</p>
          <Link to="/contact" search={{ interest: "Speaking" }} className="yw-pill yw-pill-ghost">Book a conversation →</Link>
        </Band>
      </main>
    </Shell>
  );
}
