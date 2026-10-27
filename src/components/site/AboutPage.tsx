import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Reveal } from "@/components/editorial/Reveal";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, socials } from "@/content/yrmis";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import plants from "@/assets/sourced/portraits/yrmis-plants.jpg";
import red from "@/assets/sourced/portraits/yrmis-red.jpg";
import heron from "@/assets/living/heron-glide.jpg";

const instagram = socials.find((item) => item.name === "Instagram");

export function AboutPage() {
  useEffect(() => markVisited("about"), []);
  const [first, ...rest] = siteCopy.story;
  return (
    <Shell current="About">
      <main className="llanos">
        <section className="ll-first">
          <div className="ll-first-copy">
            <p className="ll-kicker">01 · About</p>
            <h1 className="ll-display" style={{ marginTop: "1rem" }}>
              {siteCopy.headline}
              <br />
              <em>{siteCopy.headlineEm}</em>
            </h1>
            <p className="ll-lede">{siteCopy.about}</p>
            <div className="ll-actions">
              <Link to="/work" className="ll-btn ll-btn-red">Work with me</Link>
              <Link to="/speaking" className="ll-btn">Speaking</Link>
            </div>
          </div>
          <figure className="ll-portrait">
            <img src={blazer} alt="Yrmis Barroeta in a blazer, original press-kit portrait" width={2688} height={4032} />
          </figure>
        </section>

        <section className="ll-pad">
          <Reveal>
            <article className="ll-story">
              {first && (
                <section>
                  <h2>{first.title}</h2>
                  {first.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              )}
            </article>
          </Reveal>
        </section>

        <figure className="ll-horizon">
          <img src={heron} alt="The night heron crossing a dusk river in the Llanos" />
          <figcaption className="ll-kicker">The Llanos</figcaption>
        </figure>

        <section className="ll-pad">
          <Reveal>
            <article className="ll-story">
              {rest.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}
            </article>
          </Reveal>
          <div className="ll-grid-2" style={{ marginTop: "1rem" }}>
            <img src={plants} alt="Yrmis laughing among green leaves, original press-kit photograph" />
            <img src={red} alt="Yrmis in red tights and red heels, original press-kit photograph" />
          </div>
        </section>

        <section className="ll-pad ll-red">
          <h2 className="ll-title">Find me on Instagram.</h2>
          {instagram && (
            <a className="ll-btn ll-btn-light" style={{ marginTop: "1.4rem" }} href={instagram.href} target="_blank" rel="noreferrer">@allblacksheep_club ↗</a>
          )}
          <div className="ll-actions">
            <Link to="/ventures" className="ll-btn ll-btn-light">Entrepreneurial Ventures</Link>
            <Link to="/press" className="ll-btn ll-btn-light">Press kit</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
