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
      <main className="bg-paper px-5 pb-16 pt-28 text-ink md:px-12">
        <p className="eyebrow text-crimson">Press kit</p>
        <h1 className="display-xl mt-3">Press kit</h1>
        <p className="mt-4 max-w-xl text-lg">{siteCopy.identity}</p>
        <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
          <img src={portrait} alt="Yrmis Barroeta, original red portrait" width={1440} height={1800} className="w-full border-2 border-ink object-cover" />
          <div>
            <div className="flex flex-wrap gap-3">
              <a className="pill bg-ink text-paper" href="/press/yrmis-barroeta-press-kit-2026.pdf">Press kit 2026</a>
              <a className="pill border-2 border-ink" href="/press/yrmis-media-kit-2025.pdf">Media kit 2025</a>
            </div>
            <p className="mt-6 max-w-md">Speaker materials and a press inquiry. The kits are the documents already published.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="pill border-2 border-ink" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">Speaker materials ↗</a>
              <Link to="/contact" search={{ interest: "Press" }} className="pill bg-scarlet text-paper">Press inquiry</Link>
            </div>
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {logos.map(([src, alt]) => (
            <li key={alt} className="grid aspect-[2/1] place-items-center border border-ink/15 bg-white p-4">
              <img src={src} alt={alt} className="max-h-10 w-auto" />
            </li>
          ))}
        </ul>
      </main>
    </Shell>
  );
}
