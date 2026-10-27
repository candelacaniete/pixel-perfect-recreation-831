import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { Band } from "@/components/editorial/Reference";
import { markVisited } from "@/components/safari/visited";
import { signalIssues, signals, siteCopy, substackArchive, subscribeUrl } from "@/content/yrmis";
import puma from "@/assets/reference/ref-signals-puma.jpg";
import night from "@/assets/land-signals-observation.jpg";
import typeSignals from "@/assets/reference/type-signals.png";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.png";

const finds = [
  { title: "Reflections", body: "Ideas and questions from the field.", icon: "home" },
  { title: "Stories", body: "People, places and projects.", icon: "book" },
  { title: "Connections", body: signals.cadence, icon: "link" },
  { title: "Opportunities", body: "Calls, events and the archive.", icon: "pin" },
] as const;

function FindIcon({ name }: { name: (typeof finds)[number]["icon"] }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "home") return <svg {...common}><path d="M4 11.5 12 5l8 6.5V20H4z" /></svg>;
  if (name === "book") return <svg {...common}><path d="M5 5.5h6.2A3 3 0 0 1 14 7.2V19a2.4 2.4 0 0 0-2.2-1.2H5zM19 5.5h-6.2A3 3 0 0 0 10 7.2V19a2.4 2.4 0 0 1 2.2-1.2H19z" /></svg>;
  if (name === "link") return <svg {...common}><circle cx="8" cy="12" r="2.2" /><circle cx="16" cy="8" r="2" /><circle cx="16" cy="16" r="2" /><path d="M9.8 11.2 14.2 9M9.8 12.8l4.4 2.2" /></svg>;
  return <svg {...common}><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" /><circle cx="12" cy="11" r="1.6" /></svg>;
}

export function SignalsPage() {
  useEffect(() => markVisited("signals"), []);
  return (
    <Shell current="Signals">
      <main className="yw yw-night page-pad">
        <section className="bleed" aria-label="1.1.1 Signals">
          <img className="bleed-photo" src={puma} alt="A puma on a rock under a full moon" style={{ objectPosition: "30% 36%" }} />
          <div className="bleed-copy">
            <h1 className="lockup-title"><img className="lockup" src={typeSignals} alt="1.1.1 Signals" /></h1>
            <p className="yw-standfirst">{siteCopy.signalsPromise}</p>
          </div>
        </section>
        <section className="yw-dark">
          <p>{siteCopy.signalsPromise}</p>
          <h2>What you’ll find</h2>
          <div className="yw-find-list">
            {finds.map((item) => (
              <article key={item.title}>
                <p className="yw-ico"><FindIcon name={item.icon} /></p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="signals-card">
          <figure className="yw-signals-portrait">
            <img src={glasses} width={212} height={258} alt="Yrmis Barroeta wearing glasses, the portrait published in the 1.1.1 Signals footer" />
            <figcaption>The portrait from the 1.1.1 Signals footer.</figcaption>
          </figure>
          <div>
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
        <Band src={night}>
          <p className="yw-quote">No spam. Field notes, free.</p>
        </Band>
      </main>
    </Shell>
  );
}
