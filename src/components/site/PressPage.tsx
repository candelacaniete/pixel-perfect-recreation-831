import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import turtle from "@/assets/reference/ref-press-turtle.jpg";
import red from "@/assets/sourced/portraits/yrmis-red.jpg";
import plants from "@/assets/sourced/portraits/yrmis-plants.jpg";
import street from "@/assets/sourced/portraits/yrmis-street.jpg";
import hand from "@/assets/sourced/portraits/yrmis-hand.jpg";
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
  { title: "Press kit 2026", note: "Biography and published materials.", href: "/press/yrmis-barroeta-press-kit-2026.pdf", external: false, img: red },
  { title: "Media kit 2025", note: "Photographs and supporting files.", href: "/press/yrmis-media-kit-2025.pdf", external: false, img: plants },
  { title: "Speaker materials", note: "The keynote page at My Headquarters.", href: "https://www.myheadquarters.club/innovationkeynote", external: true, img: street },
] as const;

export function PressPage() {
  useEffect(() => markVisited("press"), []);
  return (
    <Shell current="Press kit">
      <main className="yw">
        <section className="open press-open" aria-label="Press kit">
          <div className="open-copy">
            <h1 className="yw-display">Press kit<br />& resources</h1>
            <p className="yw-standfirst">{siteCopy.identity}. Official materials for media, events, and collaborations.</p>
          </div>
          <figure>
            <img src={turtle} alt="An Arrau turtle under the surface, among water lilies" />
          </figure>
        </section>
        <section className="yw-sheet">
          <h2>Media assets</h2>
          <p>These are the files already published. Nothing here is a placeholder download.</p>
          <div className="yw-assets">
            {assets.map((asset) => (
              <a key={asset.title} className="yw-asset" href={asset.href} {...(asset.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                <img src={asset.img} alt="" />
                <span>
                  <h3>{asset.title}</h3>
                  <p>{asset.note}</p>
                </span>
                <span className="yw-go">Open →</span>
              </a>
            ))}
            <Link className="yw-asset" to="/contact" search={{ interest: "Press" }}>
              <img src={hand} alt="" />
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
          <div className="yw-block">
            <h2>Press contact</h2>
            <p>For media inquiries, interviews, and speaking, write directly.</p>
            <Link to="/contact" search={{ interest: "Press" }} className="yw-pill">Get in touch →</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
