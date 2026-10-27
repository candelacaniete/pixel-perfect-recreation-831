import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import capybara from "@/assets/reference/ref-home-capybara.jpg";
import dusk from "@/assets/reference/ref-dusk-llanos.jpg";
import palms from "@/assets/reference/ref-tile-palms.jpg";
import wetland from "@/assets/reference/ref-tile-wetland.jpg";
import plain from "@/assets/reference/ref-tile-plain.jpg";
import night from "@/assets/reference/ref-tile-night.jpg";

const areas = [
  { title: "Speaking", line: "Click Into Wild Innovation", to: "/speaking" as const, img: palms },
  { title: "Ventures", line: siteCopy.venturesLead, to: "/ventures" as const, img: plain },
  { title: "The Llanos", line: siteCopy.story[0].title, to: "/about" as const, img: capybara },
  { title: "1.1.1 Signals", line: siteCopy.signalsPromise, to: "/signals" as const, img: night },
];

export function HomePage() {
  useEffect(() => markVisited("home"), []);
  return (
    <Shell current="Home">
      <main className="yw">
        <section className="home-open" aria-label="Home">
          <img src={capybara} alt="A capybara among water lilies at sunset in the Llanos" />
          <div className="open-copy">
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
            <img className="yw-notch" src={wetland} alt="" />
          </div>
        </section>
        <section className="yw-dark">
          <p className="yw-kicker">Areas of exploration</p>
          <div className="yw-quad">
            {areas.map((area) => (
              <Link key={area.to} to={area.to}>
                <figure>
                  <img src={area.img} alt="" style={area.to === "/about" ? { objectPosition: "50% 96%" } : undefined} />
                  <figcaption>{area.title}</figcaption>
                  <p>{area.line}</p>
                </figure>
              </Link>
            ))}
          </div>
        </section>
        <Band src={dusk} tall>
          <h2>Conversations.<br />Projects.<br />Collaborations.</h2>
          <p>{siteCopy.conversation}</p>
          <Link to="/ventures" className="yw-pill">Explore my projects →</Link>
        </Band>
        <section className="home-bridge">
          <div>
            <p className="yw-kicker">1.1.1 Signals</p>
            <h2>{siteCopy.signalsPromise}</h2>
            <p>{siteCopy.signalsOffer}</p>
            <Link to="/signals" className="yw-pill">Read the letter →</Link>
          </div>
          <div>
            <p className="yw-kicker">Contact</p>
            <h2>Start a conversation.</h2>
            <p>{siteCopy.conversation}</p>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">Write to Yrmis →</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
