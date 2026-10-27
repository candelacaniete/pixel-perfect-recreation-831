import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { markVisited } from "@/components/safari/visited";
import { signalIssues, siteCopy, substackArchive, subscribeUrl } from "@/content/yrmis";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";

export function SignalsPage() {
  useEffect(() => markVisited("signals"), []);
  return (
    <Shell current="Signals">
      <main className="llanos">
        <section className="ll-split">
          <div className="ll-panel">
            <p className="ll-kicker">06 · The newsletter</p>
            <h1 className="ll-display" style={{ marginTop: "0.7rem" }}>
              1•1•1<br /><em>Signals</em>
            </h1>
            <p className="ll-title" style={{ marginTop: "1.4rem", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>{siteCopy.signalsPromise}</p>
          </div>
          <figure className="ll-portrait" style={{ minHeight: "24rem", background: "var(--ll-ink)" }}>
            <img src={glasses} alt="Yrmis wearing glasses, the portrait used in 1•1•1 Signals" width={212} height={258} style={{ objectFit: "contain", padding: "8%" }} />
          </figure>
        </section>
        <section className="ll-pad ll-yellow">
          <p className="ll-lede" style={{ marginTop: 0 }}>{siteCopy.signalsOffer}</p>
          <a href={subscribeUrl} target="_blank" rel="noreferrer" className="ll-btn ll-btn-light" style={{ marginTop: "1.4rem" }}>Subscribe free ↗</a>
        </section>
        <section className="ll-pad">
          <p className="ll-kicker">Recent issues</p>
          <ul className="ll-issues" style={{ marginTop: "1rem" }}>
            {signalIssues.map((issue) => (
              <li key={issue.href}>
                <a href={issue.href} target="_blank" rel="noreferrer">{issue.title} ↗</a>
              </li>
            ))}
          </ul>
          <a href={substackArchive} target="_blank" rel="noreferrer" className="ll-btn ll-btn-ink" style={{ marginTop: "1.5rem" }}>Browse the archive ↗</a>
        </section>
      </main>
    </Shell>
  );
}
