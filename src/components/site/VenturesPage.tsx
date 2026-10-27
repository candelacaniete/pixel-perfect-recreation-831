import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Reveal } from "@/components/editorial/Reveal";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, ventureStories } from "@/content/yrmis";
import greenhouse from "@/assets/sourced/ventures/mh-greenhouse.jpg";
import family from "@/assets/sourced/ventures/abs-family.jpg";
import hem from "@/assets/sourced/ventures/hem-store.jpg";
import pants from "@/assets/sourced/ventures/yrmis-pants.jpg";
import wetland from "@/assets/land-ventures-crocodile.jpg";

const photos = { greenhouse, family, hem, pants } as const;

export function VenturesPage() {
  useEffect(() => markVisited("ventures"), []);
  return (
    <Shell current="Ventures">
      <main className="llanos">
        <section className="ll-pad" style={{ paddingBottom: "2rem" }}>
          <p className="ll-kicker">04 · Entrepreneurial Ventures</p>
          <h1 className="ll-display" style={{ marginTop: "0.8rem", maxWidth: "12ch" }}>Different ventures. More ways to see.</h1>
          <p className="ll-lede">{siteCopy.venturesLead}</p>
        </section>
        <div style={{ display: "grid", gap: "1rem", padding: "0 5% 3rem" }}>
          {ventureStories.map((venture, index) => (
            <Reveal key={venture.name}>
              {index === 2 && (
                <figure className="ll-horizon" style={{ marginBottom: "1rem" }}>
                  <img src={wetland} alt="A crocodile resting in a surreal wetland, under a stone sphere and a floating red block" width={1376} height={768} />
                  <figcaption className="ll-kicker">The Llanos</figcaption>
                </figure>
              )}
              <article className="ll-venture">
                <img src={photos[venture.photo]} alt="" />
                <div>
                  <p className="ll-kicker">{venture.place}</p>
                  <h2>{venture.name}</h2>
                  <p>{venture.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <section className="ll-pad" style={{ paddingTop: 0 }}>
          <Link to="/work" className="ll-btn ll-btn-ink">Work with me</Link>
        </section>
      </main>
    </Shell>
  );
}
