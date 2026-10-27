import { Shell } from "@/components/site/Shell";
import { signalIssues, siteCopy, substackArchive, subscribeUrl } from "@/content/yrmis";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";

export function SignalsPage() {
  return (
    <Shell page>
      <main className="swrap">
        <header className="phead">
          <div>
            <div className="eyebrow red">The newsletter</div>
            <h1 className="d">
              1•1•1
              <br />
              <em>Signals</em>
            </h1>
          </div>
          <div className="side">
            <p className="lede">{siteCopy.signalsPromise}</p>
            <p className="lede">{siteCopy.signalsOffer}</p>
            <a className="btn red" href={subscribeUrl} target="_blank" rel="noreferrer">
              Subscribe free
            </a>
          </div>
        </header>
        <div className="block">
          <div className="media" style={{ background: "var(--ink)", display: "grid", placeItems: "center", padding: 28 }}>
            <img
              src={glasses}
              width={212}
              height={258}
              alt="Yrmis wearing glasses, the portrait used in 1•1•1 Signals"
              style={{ width: "min(100%, 270px)", height: "auto", aspectRatio: "auto", objectFit: "contain" }}
            />
          </div>
          <div>
            <div className="eyebrow">Recent issues</div>
            <ul className="issues">
              {signalIssues.map((issue) => (
                <li key={issue.href}>
                  <a href={issue.href} target="_blank" rel="noreferrer">
                    {issue.title} ↗
                  </a>
                </li>
              ))}
            </ul>
            <a className="btn" href={substackArchive} target="_blank" rel="noreferrer">
              Browse the archive ↗
            </a>
          </div>
        </div>
        <div className="sband red">
          <div>
            <div className="eyebrow">Read and subscribe on Substack</div>
            <p className="big">
              See sooner.
              <br />
              <em>Think sharper.</em>
            </p>
          </div>
          <a className="btn bone" href={subscribeUrl} target="_blank" rel="noreferrer">
            Continue on Substack ↗
          </a>
        </div>
      </main>
    </Shell>
  );
}
