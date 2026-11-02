import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { BoatInvite, MagazineHero } from "@/components/site/MagazineHero";
import { ClickFive } from "@/components/site/ClickFive";
import { markVisited } from "@/components/safari/visited";
import { clickOutcomes, siteCopy, studio } from "@/content/yrmis";
import heron from "@/assets/fauna/heron-crystal.jpg";

export function SpeakingPage() {
  useEffect(() => markVisited("speaking"), []);
  return (
    <Shell tone="night" current="Speaking" bleed>
      <main>
        <MagazineHero
          tone="scarlet"
          detail="grass"
          ground={heron}
          groundAlt="A heron standing in a Llanos wetland, reflected in the water"
          kicker="Speaking"
          title={<>CLICK into<br /><em>Wild Innovation</em></>}
          deck={siteCopy.speaking}
        >
          <Link to="/contact" search={{ interest: "Speaking" }} className="pill mag-accent">Check availability</Link>
        </MagazineHero>
        <section className="mag-sheet">
          <p className="mag-kicker">Walking out</p>
          <h2>{siteCopy.walkingOut}</h2>
          <ol className="mag-index">
            {clickOutcomes.map((item, index) => (
              <li key={item.name}>
                <div className="mag-index-head">
                  <span className="mag-num">0{index + 1}</span>
                  <strong>{item.letter} · {item.name}</strong>
                </div>
                <p>{item.line}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {studio.keynote.formats.map((format) => <li key={format}>{format}</li>)}
          </ul>
          <div className="mt-10">
            <ClickFive />
          </div>
        </section>
        <BoatInvite />
      </main>
    </Shell>
  );
}
