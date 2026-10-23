import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { signals } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";

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
    <main className="bg-ink text-paper">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-12">
        <p aria-hidden className="display-xl pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap text-[30vw] text-scarlet/10">250K 250K</p>
        <p className="eyebrow text-scarlet">Destination 04 · Read</p>
        <h1 className="display-xl relative mt-4">1<span className="text-scarlet">•</span>1<span className="text-scarlet">•</span>1<br />Signals</h1>
        <p className="font-display relative mt-6 max-w-2xl text-2xl italic md:text-4xl">Field notes from the edge of the wild and the boardroom.</p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <a href={signals.substack} target="_blank" rel="noreferrer" className="pill bg-scarlet text-paper">Subscribe now ↗</a>
          <a href={signals.substack} target="_blank" rel="noreferrer" className="pill border-2 border-paper">Read on Substack ↗</a>
        </div>
      </section>
      <section className="grid md:grid-cols-3">
        {[
          { k: "05 · Read · Every other week", b: signals.cadence, c: "bg-scarlet text-paper" },
          { k: "03 · Feature · Minds on a Mission", b: signals.feature, c: "bg-paper text-ink" },
          { k: "04 · Grow · Newsletter Acceleration Blueprint", b: signals.blueprint, c: "bg-gold text-ink" },
        ].map((x) => (
          <article key={x.k} className={`p-6 md:p-10 ${x.c}`}>
            <p className="eyebrow">{x.k}</p>
            <p className="font-display mt-6 text-2xl leading-snug">{x.b}</p>
          </article>
        ))}
      </section>
      <section className="px-5 py-16 md:px-12">
        <p className="eyebrow text-scarlet">Recent issues</p>
        <p className="mt-3 max-w-xl text-paper/70">Issue archive will appear here. Until then, every issue lives on Substack.</p>
        <Link to="/work" className="pill mt-6 bg-paper text-ink">Feature your idea →</Link>
      </section>
      <NextStops current="Signals" />
    </main>
  );
}
