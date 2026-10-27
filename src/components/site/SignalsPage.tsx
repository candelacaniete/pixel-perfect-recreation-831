import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { Fireflies, Lanterns, Scene } from "@/components/safari/motion";
import { markVisited } from "@/components/safari/visited";
import { signalIssues, siteCopy, substackArchive, subscribeUrl } from "@/content/yrmis";
import land from "@/assets/land-signals-observation.jpg";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";

export function SignalsPage() {
  useEffect(() => markVisited("signals"), []);
  return (
    <Shell current="Signals">
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="isolate relative overflow-hidden px-5 pb-20 pt-28 md:px-12">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <img src={land} alt="" width={1920} height={1088} className="photo-bg object-[75%_center]" />
            <div className="absolute inset-0 bg-night/45" />
            <div className="scrim-l absolute inset-0" />
            <Fireflies />
          </div>
          <Lanterns count={6} />
          <p className="eyebrow relative text-gold">The newsletter</p>
          <h1 className="display-xl relative mt-4">
            1<span className="text-scarlet">•</span>1<span className="text-scarlet">•</span>1<br />
            <em className="text-scarlet">Signals</em>
          </h1>
          <p className="font-display relative mt-8 max-w-2xl text-2xl italic leading-snug md:text-4xl">{siteCopy.yellow}</p>
          <p className="relative mt-4 max-w-xl text-lg text-paper/80">{siteCopy.signalsPromise}</p>
          <p className="relative mt-4 max-w-xl">{siteCopy.signalsOffer}</p>
          <a href={subscribeUrl} target="_blank" rel="noreferrer" className="pill relative mt-8 bg-scarlet text-paper">Subscribe free ↗</a>
        </Scene>
        <Scene className="relative px-5 py-16 md:px-12">
          <article className="reveal relative z-10 max-w-xl rotate-[-1.5deg] bg-scarlet p-6 shadow-[0_30px_60px_-20px_oklch(0_0_0/70%)] md:p-10">
            <p className="eyebrow text-gold">Every other week</p>
            <p className="font-display mt-4 text-2xl leading-snug md:text-3xl">{siteCopy.signalsOffer}</p>
          </article>
          <img src={glasses} alt="Yrmis wearing glasses, the portrait used in 1•1•1 Signals" width={212} height={258} className="reveal relative z-0 mt-8 w-48 border-2 border-gold bg-night md:ml-[8%]" />
        </Scene>
        <Scene className="relative border-t-2 border-scarlet bg-scarlet px-5 py-16 md:px-12">
          <p className="eyebrow text-gold">Recent issues</p>
          <ul className="mt-6 max-w-xl divide-y divide-paper/25">
            {signalIssues.map((issue) => (
              <li key={issue.href} className="py-4">
                <a href={issue.href} target="_blank" rel="noreferrer" className="font-display text-2xl hover:underline">{issue.title} ↗</a>
              </li>
            ))}
          </ul>
          <a href={substackArchive} target="_blank" rel="noreferrer" className="pill mt-8 bg-paper text-ink">Browse the archive ↗</a>
        </Scene>
      </main>
    </Shell>
  );
}
