import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { MagazineHero } from "@/components/site/MagazineHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import capybara from "@/assets/fauna/capybara-constructor.jpg";

const tracks = [
  { n: "01", title: "Founders", body: siteCopy.founders },
  { n: "02", title: "Executive teams", body: siteCopy.executives },
  { n: "03", title: "Institutions", body: siteCopy.institutions },
];

export function WorkPage() {
  useEffect(() => markVisited("work"), []);
  return (
    <Shell tone="sunset" current="Work with me" bleed>
      <main>
        <MagazineHero
          tone="sunset"
          detail="grass"
          ground={capybara}
          groundAlt="A capybara in a Llanos wetland, reflected in still water"
          kicker="Work with me"
          title={<>Plan and<br /><em>conspire.</em></>}
          deck={siteCopy.studio}
        >
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="pill mag-accent">Discuss your project</Link>
        </MagazineHero>
        <section className="mag-sheet mag-sheet-night">
          <div className="mag-blocks">
            {tracks.map((track) => (
              <Link key={track.n} to="/contact" search={{ interest: "Consulting Studio" }} className="mag-block">
                <span className="mag-num">{track.n}</span>
                <h3>{track.title}</h3>
                <p>{track.body}</p>
              </Link>
            ))}
          </div>
          <ol className="mag-index">
            <li>
              <Link to="/contact" search={{ interest: "Communications strategy" }}>
                <span className="mag-num">04</span>
                <span className="mag-index-line">{siteCopy.communications}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" search={{ interest: "Other" }}>
                <span className="mag-num">05</span>
                <span className="mag-index-line">{siteCopy.unnamed}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ol>
        </section>
      </main>
    </Shell>
  );
}
