import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, ventureStories } from "@/content/yrmis";
import dusk from "@/assets/reference/ref-dusk-llanos.jpg";
import caiman from "@/assets/reference/ref-ventures-caiman.jpg";
import emerald from "@/assets/river-crocodile-emerald.png";
import greenhouse from "@/assets/sourced/ventures/mh-greenhouse.jpg";
import family from "@/assets/sourced/ventures/abs-family.jpg";
import hem from "@/assets/sourced/ventures/hem-store.jpg";
import pants from "@/assets/sourced/ventures/yrmis-pants.jpg";
const photos = { greenhouse, family, hem, pants } as const;

export function VenturesPage() {
  useEffect(() => markVisited("ventures"), []);
  return (
    <Shell current="Ventures">
      <main className="yw">
        <EditorialHero
          kicker="Ventures"
          title="Featured projects"
          deck={siteCopy.venturesLead}
          ground={caiman}
          groundAlt="A caiman on the bank of a Llanos river"
          animal={{ src: emerald, width: 896, height: 1200, alt: "A crocodile drawn with emerald scales" }}
        />
        <section className="yw-sheet">
          <p>I develop and collaborate on projects that turn a way of seeing into a working business.</p>
          <div className="yw-ventures">
            {ventureStories.map((venture) => (
              <article key={venture.name} className="yw-venture">
                <img src={photos[venture.photo]} alt="" />
                <div>
                  <p className="yw-kicker">{venture.place}</p>
                  <h3>{venture.name}</h3>
                  <p>{venture.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <Band src={dusk}>
          <h2>Let’s build what’s next</h2>
          <p>{siteCopy.studio}</p>
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">Get in touch →</Link>
        </Band>
      </main>
    </Shell>
  );
}
