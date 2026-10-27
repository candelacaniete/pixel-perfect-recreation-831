import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import portrait from "@/assets/sourced/portraits/yrmis-red.jpg";
import tedx from "@/assets/sourced/logos/tedx.svg";
import vogue from "@/assets/sourced/logos/vogue.svg";
import chronicle from "@/assets/sourced/logos/sfchronicle.svg";
import east from "@/assets/sourced/logos/24east.svg";
import berkeley from "@/assets/sourced/logos/berkeleyside.png";
import kresser from "@/assets/sourced/logos/kresser.svg";
import bullet from "@/assets/sourced/logos/bulletproof.svg";

const logos = [
  [tedx, "TEDx"],
  [vogue, "Vogue"],
  [chronicle, "San Francisco Chronicle"],
  [east, "24 East"],
  [berkeley, "Berkeleyside"],
  [kresser, "Chris Kresser"],
  [bullet, "Bulletproof"],
] as const;

export function PressPage() {
  useEffect(() => markVisited("press"), []);
  return (
    <Shell tone="paper" current="Press kit">
      <main className="llanos">
        <section className="ll-split">
          <figure className="ll-portrait" style={{ minHeight: "28rem" }}>
            <img src={portrait} alt="Yrmis Barroeta, original red portrait" width={1440} height={1800} />
          </figure>
          <div className="ll-panel">
            <p className="ll-kicker">05 · Press kit</p>
            <h1 className="ll-display" style={{ marginTop: "0.7rem" }}>Press kit</h1>
            <p className="ll-lede">{siteCopy.identity}</p>
            <p>Speaker materials and a press inquiry. The kits are the documents already published.</p>
            <div className="ll-actions">
              <a className="ll-btn ll-btn-ink" href="/press/yrmis-barroeta-press-kit-2026.pdf">Press kit 2026</a>
              <a className="ll-btn" href="/press/yrmis-media-kit-2025.pdf">Media kit 2025</a>
              <a className="ll-btn" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">Speaker materials ↗</a>
              <Link to="/contact" search={{ interest: "Press" }} className="ll-btn ll-btn-red">Press inquiry</Link>
            </div>
          </div>
        </section>
        <section className="ll-pad">
          <ul className="ll-logos">
            {logos.map(([src, alt]) => (
              <li key={alt}><img src={src} alt={alt} /></li>
            ))}
          </ul>
        </section>
      </main>
    </Shell>
  );
}
