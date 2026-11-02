import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { MagazineHero } from "@/components/site/MagazineHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import turtle from "@/assets/fauna/turtle-crystal.jpg";
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
    <Shell tone="night" current="Press kit" bleed>
      <main>
        <MagazineHero
          tone="night"
          detail="firefly"
          ground={turtle}
          groundAlt="A crystal-shelled turtle on a log beside a Llanos river at night"
          kicker="Press kit"
          title={<>Press kit</>}
          deck={siteCopy.identity}
        >
          <a className="pill mag-accent" href="/press/yrmis-barroeta-press-kit-2026.pdf">Press kit 2026</a>
          <Link to="/contact" search={{ interest: "Press" }} className="pill border-2 border-paper">Press inquiry</Link>
        </MagazineHero>
        <section className="mag-sheet">
          <div className="mag-split">
            <figure className="mag-frame">
              <img src={portrait} alt="Yrmis Barroeta, original red portrait" width={1440} height={1800} />
            </figure>
            <div>
              <p className="max-w-md text-lg">Speaker materials and a press inquiry. The kits are the documents already published.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="pill border-2 border-ink" href="/press/yrmis-media-kit-2025.pdf">Media kit 2025</a>
                <a className="pill border-2 border-ink" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">Speaker materials ↗</a>
              </div>
              <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
                {logos.map(([src, alt]) => (
                  <li key={alt} className="grid aspect-[2/1] place-items-center border border-ink/15 bg-white p-4">
                    <img src={src} alt={alt} className="max-h-10 w-auto" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
