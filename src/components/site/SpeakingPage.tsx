import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, studio } from "@/content/yrmis";
import plain from "@/assets/reference/ref-dusk-llanos.jpg";
import palms from "@/assets/reference/ref-tile-palms.jpg";
import wetland from "@/assets/reference/ref-tile-wetland.jpg";
import field from "@/assets/reference/ref-tile-plain.jpg";
import night from "@/assets/reference/ref-tile-night.jpg";
import heron from "@/assets/fauna/heron-crystal.jpg";
const topics = [
  { title: studio.keynote.title, body: studio.keynote.out, img: palms },
  { title: "For the room", body: studio.keynote.for, img: wetland },
  { title: "Where it starts", body: studio.keynote.in, img: field },
  { title: "Across fields", body: siteCopy.venturesLead, img: night },
];

export function SpeakingPage() {
  useEffect(() => markVisited("speaking"), []);
  return (
    <Shell current="Speaking">
      <main className="yw">
        <EditorialHero
          fauna="heron"
          kicker="Speaking"
          title={studio.keynote.title}
          deck={siteCopy.speaking}
          ground={heron}
          groundAlt="A crystal heron stands in dark water, neon light dripping from its beak and wings"
        >
          <Link to="/contact" search={{ interest: "Speaking" }} className="yw-pill">Book Yrmis for an event</Link>
        </EditorialHero>
        <section className="yw-sheet" id="topics">
          <h2>Topics</h2>
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
