import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { signals } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
import landSignals from "@/assets/land-signals.jpg";
import { Scene } from "@/components/safari/motion";
import puma from "@/assets/puma.png";

export const Route = createFileRoute("/signals")({
  head: () => ({
    meta: [
      { title: "1•1•1 Signals — Field notes from the wild and the boardroom · Yrmis" },
      { name: "description", content: "A free newsletter every other week, read by 250,000 executives and builders." },
      { property: "og:title", content: "1•1•1 Signals" },
      { property: "og:description", content: "One upgrade. One Mind on a Mission. One invitation to build. Free." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignalsPage,
});

function SignalsPage() {
  useEffect(() => markVisited("signals"), []);
  return (
    <main className="overflow-hidden bg-night text-paper">
      {/* Hero — the observatory, the macaw interrupting the masthead */}
      <Scene className="isolate relative overflow-hidden px-5 pb-20 pt-28 md:px-12">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <img src={landSignals} alt="" width={1920} height={1088} className="photo-bg object-[75%_center]" />
          <div className="scrim-l absolute inset-0" />
        </div>
        <p aria-hidden className="display-xl drift-down pointer-events-none absolute -right-8 top-16 rotate-90 whitespace-nowrap text-[18vw] text-scarlet/20 [--d:300px]">OBSERVE</p>
        <p className="eyebrow text-gold">Destination · The observatory</p>
        <div className="relative mt-4">
          <h1 className="display-xl relative z-10">
            1<span className="text-scarlet">•</span>1<span className="text-scarlet">•</span>1<br />
            <em className="text-scarlet">Signals</em>
          </h1>
        </div>
        <p className="font-display relative z-10 mt-8 max-w-2xl text-2xl italic leading-snug md:text-4xl">
          Field notes from the edge of the wild and the boardroom.
        </p>
        <p className="mt-4 max-w-xl text-paper/70">
          A free newsletter, every other week — read by <strong className="font-display text-3xl not-italic text-gold">250,000</strong> executives and builders.
        </p>
        <div className="relative z-10 mt-8 flex flex-wrap gap-3">
          <a href={signals.substack} target="_blank" rel="noreferrer" className="pill bg-scarlet text-paper">Subscribe now ↗</a>
          <a href={signals.substack} target="_blank" rel="noreferrer" className="pill border-2 border-paper">Read on Substack ↗</a>
        </div>
      </Scene>

      {/* The three dispatches — scattered field notes, not a card grid */}
      <Scene className="relative px-5 pb-24 md:px-12" aria-label="What lands in your inbox">
        <article className="reveal relative z-10 max-w-xl rotate-[-1.5deg] bg-scarlet p-6 text-paper shadow-[0_30px_60px_-20px_oklch(0_0_0/70%)] md:p-10">
          <p className="eyebrow text-gold">05 · Read · Every other week</p>
          <p className="font-display mt-6 text-2xl leading-snug md:text-3xl">{signals.cadence}</p>
        </article>
        <article className="reveal reveal-2 relative z-20 ml-auto mt-8 max-w-xl rotate-[1deg] bg-paper p-6 text-ink shadow-[0_30px_60px_-20px_oklch(0_0_0/70%)] md:mr-[8%] md:p-10">
          <p className="eyebrow text-crimson">03 · Feature · Minds on a Mission</p>
          <p className="font-display mt-6 text-2xl leading-snug md:text-3xl">{signals.feature}</p>
        </article>
        <article className="reveal reveal-3 relative z-10 mt-8 max-w-xl rotate-[-0.5deg] bg-gold p-6 text-ink shadow-[0_30px_60px_-20px_oklch(0_0_0/70%)] md:ml-[14%] md:p-10">
          <p className="eyebrow">04 · Grow · Newsletter Acceleration Blueprint</p>
          <p className="font-display mt-6 text-2xl leading-snug md:text-3xl">{signals.blueprint}</p>
        </article>
      </Scene>

      {/* Archive note + onward path */}
      <Scene className="relative overflow-hidden border-t-2 border-scarlet bg-scarlet px-5 py-20 md:px-12">
        <p aria-hidden className="display-xl mask-word pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap text-[30vw] text-ink/25">READ</p>
        <img src={puma} alt="" aria-hidden width={1024} height={1024} loading="lazy" className="emerge pointer-events-none absolute -bottom-10 right-[-6%] w-56 md:w-[26rem]" />
        <p className="eyebrow relative text-gold">Recent issues</p>
        <p className="relative mt-3 max-w-md text-paper/85">The issue archive will appear here. Until then, every issue lives on Substack.</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href={signals.substack} target="_blank" rel="noreferrer" className="pill bg-paper text-ink">Browse the archive ↗</a>
          <Link to="/work" className="pill border-2 border-paper">Feature your idea →</Link>
        </div>
      </Scene>
      <NextStops current="Signals" tone="night" />
    </main>
  );
}
