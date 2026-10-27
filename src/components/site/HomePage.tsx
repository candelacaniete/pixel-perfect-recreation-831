import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Reveal } from "@/components/editorial/Reveal";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import portrait from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import horizon from "@/assets/living/speaking-llanos.jpg";
import jabiru from "@/assets/living/jabiru-glide.jpg";
import horses from "@/assets/living/horses-gallop-2.jpg";

const chapters = [
  { n: "02", title: "About", line: "Another field. Another lens.", to: "/about", go: "Read the story" },
  { n: "03", title: "Speaking", line: "CLICK into Wild Innovation", to: "/speaking", go: "The keynote" },
  { n: "04", title: "Work with me", line: "Plan and conspire.", to: "/work", go: "Work with me" },
  { n: "05", title: "Ventures", line: "Different ventures. More ways to see.", to: "/ventures", go: "Meet the ventures" },
  { n: "06", title: "1•1•1 Signals", line: siteCopy.yellow, to: "/signals", go: "Read Signals" },
] as const;

export function HomePage() {
  useEffect(() => markVisited("home"), []);
  return (
    <Shell current="Home">
      <main className="llanos">
        <section className="ll-first">
          <div className="ll-first-copy">
            <p className="ll-kicker">01 · {siteCopy.identity}</p>
            <h1 className="ll-display" style={{ marginTop: "1rem" }}>
              {siteCopy.headline}
              <br />
              <em>{siteCopy.headlineEm}</em>
            </h1>
            <p className="ll-lede">{siteCopy.homeIntro}</p>
            <div className="ll-actions">
              <Link to="/river" className="ll-btn ll-btn-red">Explore CLICK</Link>
              <Link to="/work" className="ll-btn">Work with me</Link>
              <Link to="/speaking" className="ll-btn">Speaking</Link>
            </div>
          </div>
          <figure className="ll-portrait">
            <img src={portrait} alt="Yrmis Barroeta in a blazer, original press-kit portrait" width={2688} height={4032} />
            <figcaption className="ll-kicker">Yrmis Barroeta</figcaption>
          </figure>
        </section>

        <figure className="ll-horizon">
          <img src={horizon} alt="Sunlit Venezuelan Llanos: flat water, grasses, and a wide sky" />
          <figcaption className="ll-kicker">The Llanos</figcaption>
        </figure>
        <img className="ll-animal" src={jabiru} alt="A jabiru crossing the horizon, larger than the plain behind it" />

        <Reveal>
          <section className="ll-split">
            <div className="ll-panel">
              <p className="ll-kicker">About</p>
              <h2 className="ll-title" style={{ marginTop: "0.8rem" }}>Another field. Another lens.</h2>
              <p className="ll-lede">{siteCopy.about}</p>
              <Link to="/about" className="ll-btn" style={{ marginTop: "1.5rem" }}>Read the story</Link>
            </div>
            <div className="ll-panel ll-yellow">
              <p className="ll-kicker">1•1•1 Signals</p>
              <h2 className="ll-title" style={{ marginTop: "0.8rem" }}>{siteCopy.yellow}</h2>
              <p className="ll-lede">{siteCopy.signalsOffer}</p>
              <Link to="/signals" className="ll-btn ll-btn-light" style={{ marginTop: "1.5rem" }}>Read Signals</Link>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="ll-split">
            <figure className="ll-portrait" style={{ minHeight: "24rem" }}>
              <img src={horses} alt="Four horses — crimson, black, gold and green — galloping on the plain" />
            </figure>
            <div className="ll-panel ll-ox">
              <p className="ll-kicker">Speaking</p>
              <h2 className="ll-title" style={{ marginTop: "0.8rem" }}>CLICK into<br /><em>Wild Innovation</em></h2>
              <p className="ll-lede">{siteCopy.speaking}</p>
              <Link to="/speaking" className="ll-btn ll-btn-light" style={{ marginTop: "1.5rem" }}>The keynote</Link>
            </div>
          </section>
        </Reveal>

        <section className="ll-pad">
          <p className="ll-kicker">{siteCopy.identity}</p>
          <nav className="ll-index" aria-label="Sections" style={{ marginTop: "1rem" }}>
            {chapters.map((chapter) => (
              <Link key={chapter.n} to={chapter.to}>
                <span className="ll-kicker">{chapter.n}</span>
                <h2>{chapter.title}</h2>
                <span className="ll-go">{chapter.go}</span>
              </Link>
            ))}
            <Link to="/world">
              <span className="ll-kicker">✶</span>
              <h2>Yrmis World</h2>
              <span className="ll-go">Explore Yrmis World</span>
            </Link>
          </nav>
        </section>

        <section className="ll-pad ll-red">
          <p className="ll-kicker">Start a conversation</p>
          <h2 className="ll-title" style={{ marginTop: "0.8rem" }}>Let’s make things happen.</h2>
          <p className="ll-lede">{siteCopy.conversation}</p>
          <div className="ll-actions">
            <Link to="/contact" search={{ interest: "Speaking" }} className="ll-btn ll-btn-light">Event inquiry</Link>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="ll-btn ll-btn-light">Project inquiry</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
