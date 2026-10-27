import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { Fireflies, FlyingGuardian, Scene } from "@/components/safari/motion";
import { WaterLive } from "@/components/site/habitat";
import { markVisited } from "@/components/safari/visited";
import { signalIssues, siteCopy, substackArchive, subscribeUrl } from "@/content/yrmis";
import land from "@/assets/land-signals-observation.jpg";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";
import macaw from "@/assets/g-macaw-authored.png";

export function SignalsPage() {
  useEffect(() => markVisited("signals"), []);
  return (
    <Shell current="Signals">
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="isolate relative min-h-[88svh] overflow-hidden px-5 pb-20 pt-28 md:px-12">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <img src={land} alt="" width={1920} height={1088} className="photo-bg object-[75%_center]" />
            <div className="absolute inset-0 bg-night/45" />
            <div className="scrim-l absolute inset-0" />
            <Fireflies />
            <WaterLive />
          </div>
          <FlyingGuardian src={macaw} alt="The macaw flying in front of the moon" top="8%" className="w-36 md:w-56" />
          <div className="relative max-w-3xl">
              <p className="eyebrow text-gold">The newsletter · guarded by the macaw</p>
              <h1 className="display-xl mt-4 text-shadow-river">
                1<span className="text-scarlet">•</span>1<span className="text-scarlet">•</span>1<br />
                <em className="text-scarlet">Signals</em>
              </h1>
              <p className="font-display mt-8 max-w-xl text-2xl italic leading-snug text-shadow-river md:text-4xl">{siteCopy.yellow}</p>
              <p className="mt-4 max-w-xl text-shadow-river">{siteCopy.signalsOffer}</p>
              <a href={subscribeUrl} target="_blank" rel="noreferrer" className="pill mt-8 bg-scarlet text-paper">Subscribe free ↗</a>
          </div>
        </Scene>
        <Scene className="relative px-5 py-16 md:px-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <article className="bg-scarlet p-6 shadow-[0_30px_60px_-20px_oklch(0_0_0/70%)] md:p-10">
              <p className="eyebrow text-gold">Every other week</p>
              <p className="font-display mt-4 text-2xl leading-snug md:text-3xl">{siteCopy.signalsPromise}</p>
            </article>
            <img src={glasses} alt="Yrmis wearing glasses, the portrait used in 1•1•1 Signals" width={212} height={258} className="mx-auto w-48 border-2 border-gold bg-night" />
          </div>
        </Scene>
        <Scene className="relative overflow-hidden border-t border-gold/30 bg-night px-5 py-16 md:px-12">
          <Fireflies count={16} />
          <div className="relative mx-auto max-w-3xl">
          <p className="eyebrow text-gold">Recent issues</p>
          <ul className="mt-6 max-w-xl divide-y divide-paper/25">
            {signalIssues.map((issue) => (
              <li key={issue.href} className="py-4">
                <a href={issue.href} target="_blank" rel="noreferrer" className="font-display text-2xl hover:underline">{issue.title} ↗</a>
              </li>
            ))}
          </ul>
          <a href={substackArchive} target="_blank" rel="noreferrer" className="pill mt-8 bg-paper text-ink">Browse the archive ↗</a>
          </div>
        </Scene>
      </main>
    </Shell>
  );
}
