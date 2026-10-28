import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import capy from "@/assets/fauna/capybara-constructor.jpg";

const tracks = [
  { eyebrow: "Founders", title: "From idea to next stage.", body: siteCopy.founders, interest: "Consulting Studio" as const },
  { eyebrow: "Executive teams", title: "A thinking partner.", body: siteCopy.executives, interest: "Consulting Studio" as const },
  { eyebrow: "Institutions", title: "Venture partners.", body: siteCopy.institutions, interest: "Consulting Studio" as const },
];

export function WorkPage() {
  useEffect(() => markVisited("work"), []);
  return (
    <Shell current="Work with me">
      <main className="yw">
        <EditorialHero
          fauna="capybara"
          kicker="Consulting studio"
          title="Plan and conspire."
          deck={siteCopy.studio}
          ground={capy}
          groundAlt="A capybara in work clothes studies a glowing blueprint on a dock in the Llanos"
        />
        <section className="yw-plain">
        <div className="yw-tracks">
          {tracks.map((track) => (
            <Link key={track.eyebrow} to="/contact" search={{ interest: track.interest }}>
              <span className="yw-kicker">{track.eyebrow}</span>
              <h2>{track.title}</h2>
              <p>{track.body}</p>
            </Link>
          ))}
        </div>
        <div className="yw-pair">
          <Link to="/contact" search={{ interest: "Communications strategy" }}>
            <span className="yw-kicker">Communications strategy</span>
            <h2>{siteCopy.communications}</h2>
          </Link>
          <Link to="/contact" search={{ interest: "Other" }}>
            <span className="yw-kicker">Something we haven’t named yet</span>
            <h2>{siteCopy.unnamed}</h2>
          </Link>
        </div>
        </section>
      </main>
    </Shell>
  );
}
