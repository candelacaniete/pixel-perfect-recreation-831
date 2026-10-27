import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import dusk from "@/assets/reference/ref-dusk-llanos.jpg";
import wetland from "@/assets/reference/ref-click-llanos.jpg";
import palms from "@/assets/reference/ref-tile-palms.jpg";
import anaconda from "@/assets/reference/ref-about-anaconda.jpg";
import capybara from "@/assets/reference/ref-home-capybara.jpg";
import portrait from "@/assets/sourced/portraits/yrmis-red.jpg";

const areas = [
  { title: "Science & innovation", to: "/speaking" as const, img: dusk, focus: "30% 55%" },
  { title: "Nature & conservation", to: "/about" as const, img: wetland, focus: "50% 60%" },
  { title: "Culture & education", to: "/ventures" as const, img: anaconda, focus: "55% 62%" },
  { title: "Territory & community", to: "/signals" as const, img: palms, focus: "50% 40%" },
];

function Arrow() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomePage() {
  useEffect(() => markVisited("home"), []);
  return (
    <Shell current="Home">
      <main className="yw">
        <EditorialHero
          kicker="Yrmis Barroeta"
          title={siteCopy.identity}
          deck={siteCopy.about}
          ground={capybara}
          groundAlt="A capybara at the edge of a Venezuelan Llanos wetland"
          plate={{
            src: portrait,
            width: 1440,
            height: 1800,
            alt: "Yrmis Barroeta in a black dress, red tights, and red heels, one hand resting on her shin",
          }}
        >
          <div className="yw-actions">
            <Link to="/speaking" className="yw-pill">Speaking</Link>
            <Link to="/work" className="yw-pill yw-pill-ink">Work with me</Link>
          </div>
        </EditorialHero>
        <section className="yw-sheet yw-sheet-home">
          <div className="yw-split">
            <div>
              <h2>A shared perspective.<br />Multiple territories.</h2>
              <p>{siteCopy.homeShared}</p>
            </div>
            <img className="yw-wave" src={dusk} alt="" />
          </div>
        </section>
        <section className="yw-dark">
          <p className="yw-kicker">Areas of exploration</p>
          <div className="yw-quad">
            {areas.map((area) => (
              <Link key={area.title} to={area.to}>
                <span className="yw-area-label">{area.title}</span>
                <span className="yw-shot">
                  <img src={area.img} alt="" style={{ objectPosition: area.focus }} />
                  <span className="yw-orb"><Arrow /></span>
                </span>
              </Link>
            ))}
          </div>
        </section>
        <Band src={dusk} tall>
          <h2>Conversations.<br />Projects.<br />Collaborations.</h2>
          <p>{siteCopy.homeClose}</p>
          <Link to="/ventures" className="yw-pill yw-pill-ghost">Explore my projects →</Link>
        </Band>
      </main>
    </Shell>
  );
}
