import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { DuskClose } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import capybara from "@/assets/reference/ref-home-capybara.jpg";
import llanos from "@/assets/reference/ref-click-llanos.jpg";
import dusk from "@/assets/reference/ref-dusk-llanos.jpg";

const areas = [
  { title: "Speaking", line: "Click Into Wild Innovation", to: "/speaking" as const, pos: "20% 40%" },
  { title: "Ventures", line: siteCopy.venturesLead, to: "/ventures" as const, pos: "78% 35%" },
  { title: "The Llanos", line: "Another field. Another lens.", to: "/about" as const, pos: "40% 70%" },
  { title: "1.1.1 Signals", line: siteCopy.signalsPromise, to: "/signals" as const, pos: "70% 60%" },
];

export function HomePage() {
  useEffect(() => markVisited("home"), []);
  return (
    <Shell current="Home">
      <main className="yw">
        <section className="yw-hero yw-hero-home" aria-label="Home">
          <img className="yw-hero-img" src={capybara} alt="A capybara among water lilies at sunset in the Llanos" />
          <div className="yw-hero-copy">
            <h1 className="yw-display">Ideas<br />that move<br />territories</h1>
            <p className="yw-standfirst">{siteCopy.homeIntro}</p>
            <Link to="/about" className="yw-pill">Explore Yrmis’s world →</Link>
          </div>
        </section>
        <section className="yw-sheet">
          <div className="yw-split">
            <div>
              <h2>A shared perspective.<br />Multiple territories.</h2>
              <p>{siteCopy.about}</p>
            </div>
            <img className="yw-notch" src={llanos} alt="" />
          </div>
        </section>
        <section className="yw-dark">
          <p className="yw-kicker">Areas of exploration</p>
          <div className="yw-quad">
            {areas.map((area) => (
              <Link key={area.to} to={area.to}>
                <figure>
                  <img src={area.to === "/signals" ? dusk : llanos} alt="" style={{ objectPosition: area.pos }} />
                  <figcaption>{area.title}</figcaption>
                  <p>{area.line}</p>
                </figure>
              </Link>
            ))}
          </div>
        </section>
        <DuskClose>
          <h2>Conversations.<br />Projects.<br />Collaborations.</h2>
          <p>{siteCopy.conversation}</p>
          <Link to="/ventures" className="yw-pill">Explore my projects →</Link>
        </DuskClose>
      </main>
    </Shell>
  );
}
