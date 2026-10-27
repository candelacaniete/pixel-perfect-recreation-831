import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { markVisited } from "@/components/safari/visited";
import { credentials, speakingWatch, studio } from "@/content/yrmis";
import jabiru from "@/assets/reference/ref-speaking-jabiru.jpg";
import tedx from "@/assets/sourced/logos/tedx.svg";
import vogue from "@/assets/sourced/logos/vogue.svg";
import chronicle from "@/assets/sourced/logos/sfchronicle.svg";

const proof = [
  [tedx, "TEDx"],
  [vogue, "Vogue"],
  [chronicle, "San Francisco Chronicle"],
] as const;

export function SpeakingPage() {
  useEffect(() => markVisited("speaking"), []);
  return (
    <Shell current="Speaking" tone="scarlet">
      <main className="yw">
        <section className="bleed" aria-labelledby="keynote-title">
          <img className="bleed-photo" src={jabiru} alt="A jabiru standing in the Llanos at sunset" style={{ objectPosition: "22% 30%" }} />
          <div className="bleed-copy">
            <p className="yw-kicker">Keynote</p>
            <h1 id="keynote-title" className="yw-hero-title">{studio.keynote.title}</h1>
            <p className="yw-standfirst">{studio.keynote.for}</p>
            <Link to="/contact" search={{ interest: "Speaking" }} className="yw-pill">Event inquiry</Link>
          </div>
        </section>
        <section className="yw-sheet">
          <p className="yw-kicker">CLICK</p>
          <h2>Five instincts every human already has.</h2>
          <ClickFive />
        </section>
        <section className="yw-sheet yw-read-maroon" style={{ marginTop: 0, borderRadius: 0 }}>
          <div className="yw-block">
            <p className="yw-kicker">Audience outcomes</p>
            <div className="yw-outcomes">
              <p>{studio.keynote.in}</p>
              <p><em>{studio.keynote.out}</em></p>
            </div>
          </div>
        </section>
        <section className="yw-dark">
          <p className="yw-kicker">Watch Yrmis speak</p>
          <h2>{speakingWatch.title}</h2>
          <p>The talk opens on YouTube. Nothing plays until you start it.</p>
          <a className="yw-pill" href={speakingWatch.href} target="_blank" rel="noreferrer">Watch the talk</a>
        </section>
        <section className="yw-sheet">
          <p className="yw-kicker">Testimonials and credentials</p>
          <h2>Where the work has been published.</h2>
          <ul className="yw-credentials">
            {credentials.map((line) => <li key={line}>{line}</li>)}
          </ul>
          <ul className="yw-logos">
            {proof.map(([src, alt]) => <li key={alt}><img src={src} alt={alt} /></li>)}
          </ul>
        </section>
        <section className="yw-sheet" style={{ marginTop: 0 }}>
          <p className="yw-kicker">Formats</p>
          <div>
            {studio.keynote.formats.map((format, index) => (
              <Link key={format} to="/contact" search={{ interest: "Speaking" }} className="yw-format">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <em>{format}</em>
              </Link>
            ))}
          </div>
        </section>
        <section className="yw-dark">
          <p className="yw-kicker">Event inquiry</p>
          <h2>Book the room.</h2>
          <p>{studio.keynote.for}</p>
          <Link to="/contact" search={{ interest: "Speaking" }} className="yw-pill">Start an event inquiry</Link>
        </section>
      </main>
    </Shell>
  );
}
