import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { DuskClose } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, ventureStories } from "@/content/yrmis";
import caiman from "@/assets/reference/ref-ventures-caiman.jpg";
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
        <section className="yw-hero" aria-label="Ventures" style={{ background: "#0c241c" }}>
          <img className="yw-hero-img" src={caiman} alt="An Orinoco caiman in dark green water" style={{ objectPosition: "center 55%" }} />
          <div className="yw-hero-copy">
            <h1 className="yw-display">Ideas<br />into real<br />worlds</h1>
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
        <DuskClose>
          <h2>Let’s build what’s next</h2>
          <p>{siteCopy.studio}</p>
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="yw-pill">Get in touch →</Link>
        </DuskClose>
      </main>
    </Shell>
  );
}
