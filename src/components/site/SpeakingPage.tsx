import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { markVisited } from "@/components/safari/visited";
import { clickOutcomes, siteCopy } from "@/content/yrmis";
import llanos from "@/assets/living/speaking-llanos.jpg";
import jabiru from "@/assets/living/jabiru-up.jpg";

const slots = [
  ["Watch Yrmis speak", "Place an approved stage clip here, with captions, a clear play control and a mobile poster frame."],
  ["Testimonials & credentials", "Place approved quotations with names and roles here. TEDx is distinct from the CLICK keynote."],
  ["Formats", "Confirm keynote duration, virtual or in-person delivery, and workshop or offsite formats. These are review slots, not confirmed packages."],
] as const;

export function SpeakingPage() {
  useEffect(() => markVisited("speaking"), []);
  return (
    <Shell current="Speaking">
      <main className="llanos">
        <section className="ll-split">
          <div className="ll-panel">
            <p className="ll-kicker">03 · The signature keynote</p>
            <h1 className="ll-display" style={{ marginTop: "0.8rem" }}>CLICK into<br /><em>Wild Innovation</em></h1>
            <p className="ll-lede">{siteCopy.speaking}</p>
            <div className="ll-actions">
              <Link to="/contact" search={{ interest: "Speaking" }} className="ll-btn ll-btn-red">Check availability</Link>
              <a href="#audience-outcomes" className="ll-btn">Audience outcomes</a>
            </div>
          </div>
          <figure className="ll-portrait" style={{ minHeight: "28rem" }}>
            <img src={llanos} alt="The Llanos under a wide sky, the setting of the keynote" />
          </figure>
        </section>
        <img className="ll-animal" src={jabiru} alt="A jabiru above the plain, set against the keynote" />

        <section className="ll-pad ll-ox" style={{ textAlign: "left" }}>
          <p className="ll-kicker">Walking out</p>
          <h2 className="ll-title" style={{ marginTop: "0.7rem", maxWidth: "16ch" }}>{siteCopy.walkingOut}</h2>
          <Link to="/river" className="ll-btn ll-btn-light" style={{ marginTop: "1.5rem" }}>Experience CLICK</Link>
        </section>

        <section className="ll-pad">
          <ClickFive />
        </section>

        <section id="audience-outcomes" className="ll-pad" style={{ paddingTop: 0 }}>
          <p className="ll-kicker">Audience outcomes</p>
          <ol className="ll-grid-2" style={{ marginTop: "1.5rem", padding: 0, listStyle: "none" }}>
            {clickOutcomes.map((item) => (
              <li key={item.name} style={{ borderTop: "1px solid #22171033", paddingTop: "1rem" }}>
                <h3 className="ll-title" style={{ fontSize: "2rem" }}>{item.letter} · {item.name}</h3>
                <p>{item.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ll-pad ll-slots" style={{ paddingTop: 0 }}>
          {slots.map(([title, body]) => (
            <article key={title} className="ll-slot">
              <p className="ll-kicker">Placement · asset to add</p>
              <h3 className="ll-title" style={{ fontSize: "1.8rem", marginTop: "0.6rem" }}>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <section className="ll-pad ll-red">
          <h2 className="ll-title">Bring CLICK to your team.</h2>
          <div className="ll-actions">
            <Link to="/contact" search={{ interest: "Speaking" }} className="ll-btn ll-btn-light">Inquire about your event</Link>
            <a className="ll-btn ll-btn-light" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">Speaker materials ↗</a>
          </div>
        </section>
      </main>
    </Shell>
  );
}
