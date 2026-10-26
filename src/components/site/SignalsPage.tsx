import { Chapter, Shell } from "@/components/site/Shell";
import { signalIssues, siteCopy, substackArchive, subscribeUrl } from "@/content/yrmis";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";

export function SignalsPage() {
  return (
    <Shell>
      <Chapter n="06" title="1•1•1 Signals Newsletter" to="/signals" />
      <div className="ed-grid">
        <div className="ed-block ed-red ed-w2">
          <p className="ed-eyebrow">The newsletter</p>
          <h1>
            1•1•1
            <br />
            <em>Signals</em>
          </h1>
          <p className="ed-serif">{siteCopy.signalsPromise}</p>
          <p>{siteCopy.signalsOffer}</p>
          <a className="ed-control" href={subscribeUrl} target="_blank" rel="noreferrer">
            Subscribe free ↗
          </a>
        </div>
        <div className="ed-block ed-maroon ed-w2 ed-signals-photo">
          <img
            src={glasses}
            width={212}
            height={258}
            alt="Yrmis wearing glasses, the portrait used in 1•1•1 Signals"
          />
          <p className="ed-eyebrow">1•1•1 Signals Newsletter · Yrmis Barroeta</p>
        </div>
        <div className="ed-block ed-bone ed-w2">
          <h3>Recent issues</h3>
          <ul className="ed-issues">
            {signalIssues.map((issue) => (
              <li key={issue.href}>
                <a href={issue.href} target="_blank" rel="noreferrer">
                  {issue.title} ↗
                </a>
              </li>
            ))}
          </ul>
          <a className="ed-control" href={substackArchive} target="_blank" rel="noreferrer">
            Browse the archive ↗
          </a>
        </div>
        <div className="ed-block ed-maroon ed-w2">
          <p className="ed-eyebrow">Read & subscribe on Substack</p>
          <h2>
            See sooner.
            <br />
            <em>Think sharper.</em>
          </h2>
          <p>{siteCopy.signalsPromise}</p>
          <a className="ed-control" href={subscribeUrl} target="_blank" rel="noreferrer">
            Continue on Substack ↗
          </a>
        </div>
      </div>
    </Shell>
  );
}
