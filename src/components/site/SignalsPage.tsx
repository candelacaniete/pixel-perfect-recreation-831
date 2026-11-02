import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { MagazineHero } from "@/components/site/MagazineHero";
import { markVisited } from "@/components/safari/visited";
import { signalIssues, siteCopy, substackArchive, subscribeUrl } from "@/content/yrmis";
import cardinal from "@/assets/fauna/cardinal-orinoco.jpg";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";

export function SignalsPage() {
  useEffect(() => markVisited("signals"), []);
  return (
    <Shell tone="night" current="Signals" bleed>
      <main>
        <MagazineHero
          tone="night"
          detail="firefly"
          ground={cardinal}
          groundAlt="The Orinoco cardinal on a branch over a moonlit Llanos wetland"
          kicker="1•1•1 Signals"
          title={<>1•1•1<br /><em>Signals</em></>}
          deck={siteCopy.signalsOffer}
        >
          <a href={subscribeUrl} target="_blank" rel="noreferrer" className="pill mag-accent">Subscribe free ↗</a>
        </MagazineHero>
        <section className="mag-sheet mag-sheet-night">
          <div className="mag-split">
            <figure className="mag-frame">
              <img src={glasses} alt="Yrmis wearing glasses, the portrait used in 1•1•1 Signals" width={212} height={258} />
            </figure>
            <div>
              <p className="mag-kicker">Every other week</p>
              <h2>{siteCopy.signalsPromise}</h2>
              <p className="mt-3">{siteCopy.yellow}</p>
              <ol className="mag-index">
                {signalIssues.map((issue, index) => (
                  <li key={issue.href}>
                    <a href={issue.href} target="_blank" rel="noreferrer">
                      <span className="mag-num">0{index + 1}</span>
                      <strong>{issue.title}</strong>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ol>
              <a href={substackArchive} target="_blank" rel="noreferrer" className="pill mt-6 border-2 border-paper">Browse the archive ↗</a>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
