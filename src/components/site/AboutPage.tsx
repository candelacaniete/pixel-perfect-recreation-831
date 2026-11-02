import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { MagazineHero } from "@/components/site/MagazineHero";
import { ClickFive } from "@/components/site/ClickFive";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, socials } from "@/content/yrmis";
import plain from "@/assets/living/speaking-llanos.jpg";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";

const instagram = socials.find((item) => item.name === "Instagram");

export function AboutPage() {
  useEffect(() => markVisited("about"), []);
  return (
    <Shell tone="day" current="About" bleed>
      <main>
        <MagazineHero
          tone="day"
          detail="grass"
          ground={plain}
          groundAlt="An open Llanos savanna under a high sky, with palms and a low horizon"
          kicker="About"
          title={<>The Llanos</>}
          deck={siteCopy.about}
        >
          <Link to="/work" className="pill mag-accent">Work with me</Link>
          <Link to="/speaking" className="pill border-2 border-paper">Speaking</Link>
        </MagazineHero>
        <section className="mag-sheet">
          <div className="mag-split">
            <figure className="mag-frame">
              <img src={blazer} width={2688} height={4032} alt="Yrmis Barroeta in a black blazer, photographed in black and white" />
            </figure>
            <div>
              <ol className="mag-index">
                {siteCopy.story.map((section, index) => (
                  <li key={section.title}>
                    <div className="mag-index-head">
                      <span className="mag-num">0{index + 1}</span>
                      <strong>{section.title}</strong>
                    </div>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </li>
                ))}
              </ol>
              {instagram && (
                <a className="pill mt-6 bg-ink text-paper" href={instagram.href} target="_blank" rel="noreferrer">Instagram ↗</a>
              )}
            </div>
          </div>
          <div className="mt-12">
            <ClickFive />
          </div>
        </section>
      </main>
    </Shell>
  );
}
