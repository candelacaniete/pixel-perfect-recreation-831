import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import turtle from "@/assets/reference/ref-press-turtle.jpg";
import dusk from "@/assets/reference/ref-dusk-llanos.jpg";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import plants from "@/assets/sourced/portraits/yrmis-plants.jpg";
import heels from "@/assets/sourced/portraits/yrmis-red.jpg";
import anaconda from "@/assets/reference/ref-about-anaconda.jpg";
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
  { title: "Press kit 2026", note: "Biography and published materials.", href: "/press/yrmis-barroeta-press-kit-2026.pdf", external: false, img: turtle },
  { title: "Media kit 2025", note: "Photographs and supporting files.", href: "/press/yrmis-media-kit-2025.pdf", external: false, img: dusk },
  { title: "Speaker materials", note: "The keynote page at My Headquarters.", href: "https://www.myheadquarters.club/innovationkeynote", external: true, img: anaconda },
] as const;

const gallery = [
  { src: blazer, width: 2688, height: 4032, alt: "Yrmis Barroeta in a black blazer, hands at her waist, photographed in black and white", caption: "Black blazer, black and white." },
  { src: plants, width: 1400, height: 1400, alt: "Yrmis Barroeta smiling among large green leaves", caption: "Among the plants." },
  { src: heels, width: 1440, height: 1800, alt: "Yrmis Barroeta in red tights and red heels, one hand resting on her shin", caption: "Red tights and red heels." },
] as const;

export function PressPage() {
  useEffect(() => markVisited("press"), []);
  return (
    <Shell current="Press kit">
      <main className="yw">
        <section className="yw-sheet">
          <p className="yw-kicker">Press kit</p>
          <h2>Media assets</h2>
          <p>{siteCopy.identity}. Official materials for media, events, and collaborations.</p>
          <p>These are the files already published. Nothing here is a placeholder download.</p>
          <div className="yw-assets">
            {assets.map((asset) => (
              <a key={asset.title} className="yw-asset" href={asset.href} {...(asset.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                <img src={asset.img} alt="" />
                <span>
                  <h3>{asset.title}</h3>
                  <p>{asset.note}</p>
                </span>
                <span className="yw-go" aria-hidden="true">+</span>
              </a>
            ))}
            <Link className="yw-asset" to="/contact" search={{ interest: "Press" }}>
              <img src={dusk} alt="" />
              <span>
                <h3>Press contact</h3>
                <p>Interviews, speaking, and press inquiries.</p>
              </span>
              <span className="yw-go" aria-hidden="true">+</span>
            </Link>
          </div>
          <h2>Photographs</h2>
          <p>The portraits published with the press kit. Each frame shows the full photograph.</p>
          <div className="yw-gallery">
            {gallery.map((photo) => (
              <figure key={photo.caption}>
                <a href={photo.src} target="_blank" rel="noreferrer">
                  <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} />
                </a>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
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
        <section className="yw-strip"><img src={dusk} alt="" /></section>
      </main>
    </Shell>
  );
}
