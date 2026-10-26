import { Link } from "@tanstack/react-router";
import { Chapter, Shell } from "@/components/site/Shell";
import { siteCopy } from "@/content/yrmis";
import portrait from "@/assets/sourced/portraits/yrmis-red.jpg";

export function PressPage() {
  return (
    <Shell>
      <Chapter n="05" title="Press kit" to="/press" />
      <div className="ed-grid">
        <div className="ed-block ed-photo ed-w2" style={{ minHeight: 420 }}>
          <img src={portrait} width={1440} height={1800} alt="Yrmis Barroeta, original red portrait" />
        </div>
        <div className="ed-block ed-bone ed-w2">
          <p className="ed-eyebrow">Yrmis Barroeta</p>
          <h1>
            Press <em>kit</em>
          </h1>
          <p>{siteCopy.identity}</p>
          <div className="ed-controls">
            <a className="ed-control" href="/press/yrmis-barroeta-press-kit-2026.pdf">
              Press kit 2026
            </a>
            <a className="ed-control" href="/press/yrmis-media-kit-2025.pdf">
              Media kit 2025
            </a>
            <a className="ed-control" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">
              Speaker materials ↗
            </a>
            <Link to="/contact" search={{ interest: "Press" }} className="ed-control">
              Press inquiry
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  );
}
