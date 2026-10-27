import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { DuskClose } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { signalIssues, signals, siteCopy, substackArchive, subscribeUrl } from "@/content/yrmis";
import puma from "@/assets/reference/ref-signals-puma.jpg";

const finds = [
  { title: "The letter", body: siteCopy.signalsPromise },
  { title: "The rhythm", body: signals.cadence },
  { title: "The offer", body: siteCopy.signalsOffer },
  { title: "The archive", body: "Recent issues stay on Substack, where the letter is published." },
];

export function SignalsPage() {
  useEffect(() => markVisited("signals"), []);
  return (
    <Shell current="Signals">
      <main className="yw yw-night">
        <section className="yw-hero" aria-label="1.1.1 Signals">
          <img className="yw-hero-img" src={puma} alt="A puma on a rock under a full moon" style={{ objectPosition: "center 40%" }} />
          <div className="yw-hero-copy">
            <h1 className="yw-display">1.1.1<br />Signals</h1>
            <p className="yw-standfirst">{siteCopy.signalsOffer}</p>
          </div>
        </section>
        <section className="yw-dark">
          <p>{siteCopy.signalsPromise}</p>
          <div className="yw-block">
            <h2>What you’ll find</h2>
            <div className="yw-find">
              {finds.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="yw-block">
            <h2>Subscribe to 1.1.1 Signals</h2>
            <p>Get it in your inbox. This opens the Substack subscribe page.</p>
            <form className="yw-sub" action={subscribeUrl} method="get" target="_blank">
              <label className="sr-only" htmlFor="signals-email">Email address</label>
              <input id="signals-email" name="email" type="email" required placeholder="Your email address" autoComplete="email" />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
            <ul className="yw-issues">
              {signalIssues.map((issue) => (
                <li key={issue.href}><a href={issue.href} target="_blank" rel="noreferrer">{issue.title} ↗</a></li>
              ))}
            </ul>
            <a className="yw-pill" href={substackArchive} target="_blank" rel="noreferrer">Browse the archive →</a>
          </div>
        </section>
        <DuskClose>
          <p className="yw-quote">No spam. Field notes, free.</p>
        </DuskClose>
      </main>
    </Shell>
  );
}
