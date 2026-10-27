import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { DuskClose } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import turtle from "@/assets/reference/ref-press-turtle.jpg";
import llanos from "@/assets/reference/ref-click-llanos.jpg";
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

const assets = [
  { title: "Press kit 2026", note: "Biography and published materials.", href: "/press/yrmis-barroeta-press-kit-2026.pdf", external: false, pos: "30% 40%" },
  { title: "Media kit 2025", note: "Photographs and supporting files.", href: "/press/yrmis-media-kit-2025.pdf", external: false, pos: "60% 55%" },
  { title: "Speaker materials", note: "The keynote page at My Headquarters.", href: "https://www.myheadquarters.club/innovationkeynote", external: true, pos: "75% 30%" },
] as const;

export function PressPage() {
  useEffect(() => markVisited("press"), []);
  return (
    <Shell current="Press kit">
      <main className="yw">
        <section className="yw-hero" aria-label="Press kit" style={{ background: "#0b3a40" }}>
          <img className="yw-hero-img" src={turtle} alt="An Arrau turtle under the surface, among water lilies" style={{ objectPosition: "center 42%" }} />
          <div className="yw-hero-copy">
            <h1 className="yw-display">Press kit<br />& resources</h1>
            <p className="yw-standfirst">{siteCopy.identity}. Official materials for media, events, and collaborations.</p>
          </div>
        </section>
        <section className="yw-sheet">
          <h2>Media assets</h2>
          <p>These are the files already published. Nothing here is a placeholder download.</p>
          <div className="yw-assets">
            {assets.map((asset) => (
              <a key={asset.title} className="yw-asset" href={asset.href} {...(asset.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                <img src={llanos} alt="" style={{ objectPosition: asset.pos }} />
                <span>
                  <h3>{asset.title}</h3>
                  <p>{asset.note}</p>
                </span>
                <span className="yw-go">Open →</span>
              </a>
            ))}
            <Link className="yw-asset" to="/contact" search={{ interest: "Press" }}>
              <img src={llanos} alt="" style={{ objectPosition: "40% 80%" }} />
              <span>
                <h3>Press contact</h3>
                <p>Interviews, speaking, and press inquiries.</p>
              </span>
              <span className="yw-go">Write →</span>
            </Link>
          </div>
          <ul className="yw-logos">
            {logos.map(([src, alt]) => <li key={alt}><img src={src} alt={alt} /></li>)}
          </ul>
        </section>
        <DuskClose>
          <h2>Press contact</h2>
          <p>For media inquiries, interviews, and speaking, write directly.</p>
          <Link to="/contact" search={{ interest: "Press" }} className="yw-pill">Get in touch →</Link>
        </DuskClose>
      </main>
    </Shell>
  );
}
