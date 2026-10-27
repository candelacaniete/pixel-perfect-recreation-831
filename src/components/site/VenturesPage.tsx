import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, ventureStories } from "@/content/yrmis";
import caiman from "@/assets/reference/ref-ventures-caiman.jpg";
import aerial from "@/assets/worldmap-flatlands.jpg";
import greenhouse from "@/assets/sourced/ventures/mh-greenhouse.jpg";
import family from "@/assets/sourced/ventures/abs-family.jpg";
import hem from "@/assets/sourced/ventures/hem-store.jpg";
import pants from "@/assets/sourced/ventures/yrmis-pants.jpg";
import typeVentures from "@/assets/reference/type-ventures.png";

const photos = { greenhouse, family, hem, pants } as const;

export function VenturesPage() {
  useEffect(() => markVisited("ventures"), []);
  return (
    <Shell current="Ventures">
      <main className="yw">
        <section className="bleed" aria-label="Ventures">
          <img className="bleed-photo" src={caiman} alt="An Orinoco caiman in dark green water" style={{ objectPosition: "58% 48%" }} />
          <div className="bleed-copy">
            <h1 className="lockup-title"><img className="lockup" src={typeVentures} alt="Ideas into real worlds" /></h1>
            <p className="yw-standfirst">{siteCopy.venturesLead}</p>
          </div>
        </section>
        <section className="yw-sheet">
          <h2>Featured projects</h2>
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
        <Band src={aerial}>
          <h2>Let’s build what’s next</h2>
          <p>{siteCopy.studio}</p>
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">Get in touch →</Link>
        </Band>
      </main>
    </Shell>
  );
}
