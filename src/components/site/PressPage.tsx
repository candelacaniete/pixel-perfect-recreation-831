import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
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
  return (
    <Shell page>
      <main className="swrap">
        <header className="phead">
          <div>
            <div className="eyebrow red">Press kit</div>
            <h1 className="d">
              Press <em>kit</em>
            </h1>
          </div>
          <div className="side">
            <p className="lede">{siteCopy.identity}</p>
            <div className="actions">
              <a className="btn red" href="/press/yrmis-barroeta-press-kit-2026.pdf">
                Press kit 2026
              </a>
              <a className="btn" href="/press/yrmis-media-kit-2025.pdf">
                Media kit 2025
              </a>
            </div>
          </div>
        </header>
        <div className="block">
          <div className="media">
            <img src={portrait} width={1440} height={1800} alt="Yrmis Barroeta, original red portrait" />
          </div>
          <div>
            <p className="lede">Speaker materials and a press inquiry. The kits are the documents already published.</p>
            <div className="actions" style={{ marginTop: 18 }}>
              <a className="btn" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">
                Speaker materials ↗
              </a>
              <Link to="/contact" search={{ interest: "Press" }} className="btn red">
                Press inquiry
              </Link>
            </div>
          </div>
        </div>
        <div className="logos">
          {logos.map(([src, alt]) => (
            <div key={alt}>
              <img src={src} alt={alt} />
            </div>
          ))}
        </div>
      </main>
    </Shell>
  );
}
