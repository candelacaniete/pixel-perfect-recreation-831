import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { MagazineHero } from "@/components/site/MagazineHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, ventureStories } from "@/content/yrmis";
import puma from "@/assets/fauna/puma-llanos.jpg";
import greenhouse from "@/assets/sourced/ventures/mh-greenhouse.jpg";
import family from "@/assets/sourced/ventures/abs-family.jpg";
import hem from "@/assets/sourced/ventures/hem-store.jpg";
import pants from "@/assets/sourced/ventures/yrmis-pants.jpg";

const photos = { greenhouse, family, hem, pants } as const;

export function VenturesPage() {
  useEffect(() => markVisited("ventures"), []);
  return (
    <Shell tone="night" current="Ventures" bleed>
      <main>
        <MagazineHero
          tone="night"
          detail="ripple"
          ground={puma}
          groundAlt="A patterned puma walking through shallow Llanos water at dusk, reflected below"
          kicker="Ventures"
          title={<>Built on nothing<br /><em>but resourcefulness.</em></>}
          deck={siteCopy.venturesLead}
        />
        <section className="mag-sheet mag-sheet-night">
          <div className="mag-ventures">
            {ventureStories.map((venture) => (
              <article key={venture.name} className="mag-venture">
                <img src={photos[venture.photo]} alt="" />
                <div>
                  <p className="mag-kicker">{venture.place}</p>
                  <h2>{venture.name}</h2>
                  <p className="mt-2 leading-relaxed">{venture.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
