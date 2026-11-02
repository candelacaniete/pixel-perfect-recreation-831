import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { BoatInvite, MagazineHero } from "@/components/site/MagazineHero";
import { ClickFive } from "@/components/site/ClickFive";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import crocodile from "@/assets/fauna/crocodile-neon.jpg";
import portrait from "@/assets/sourced/portraits/yrmis-plants.jpg";

const index = [
  { n: "01", title: "About", line: siteCopy.about, to: "/about" as const },
  { n: "02", title: "Work with me", line: siteCopy.studio, to: "/work" as const },
  { n: "03", title: "Speaking", line: siteCopy.speaking, to: "/speaking" as const },
  { n: "04", title: "Ventures", line: siteCopy.venturesLead, to: "/ventures" as const },
];

export function HomePage() {
  useEffect(() => markVisited("home"), []);
  return (
    <Shell tone="sunset" current="Home" bleed>
      <main>
        <MagazineHero
          tone="sunset"
          detail="ripple"
          ground={crocodile}
          groundAlt="A crocodile in a Llanos wetland at dusk, its body reflected in the water"
          kicker={`01 — ${siteCopy.identity}`}
          title={<>{siteCopy.headline}<br /><em>{siteCopy.headlineEm}</em></>}
          deck={siteCopy.homeIntro}
        >
          <Link to="/speaking" className="pill mag-accent">Speaking</Link>
          <Link to="/work" className="pill border-2 border-paper">Work with me</Link>
        </MagazineHero>
        <section className="mag-sheet">
          <div className="mag-split">
            <figure className="mag-frame">
              <img src={portrait} alt="Yrmis Barroeta smiling among large green leaves" width={1400} height={1400} />
            </figure>
            <div>
              <h2>{siteCopy.yellow}</h2>
              <ol className="mag-index">
                {index.map((item) => (
                  <li key={item.n}>
                    <Link to={item.to}>
                      <span className="mag-num">{item.n}</span>
                      <span className="mag-index-copy">
                        <strong>{item.title}</strong>
                        <span className="mag-index-line">{item.line}</span>
                      </span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-12">
            <ClickFive />
          </div>
        </section>
        <BoatInvite />
      </main>
    </Shell>
  );
}
