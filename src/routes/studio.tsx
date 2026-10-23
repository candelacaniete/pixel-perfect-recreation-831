import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { studio } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "The Studio — Fractional & advisory · Yrmis" },
      { name: "description", content: "A boutique studio: part venture builder, part fractional executive, part sparring partner. Plus the Click Into Wild Innovation keynote." },
      { property: "og:title", content: "The Studio — Plan and conspire" },
      { property: "og:description", content: "Fractional & advisory for founders, institutions and executive teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  useEffect(() => markVisited("studio"), []);
  return (
    <main className="bg-paper text-ink">
      <section className="grid min-h-[90vh] gap-8 px-5 pb-16 pt-28 md:grid-cols-12 md:px-12">
        <div className="md:col-span-8">
          <p className="eyebrow">Destination 02 · Build · The Studio</p>
          <h1 className="display-xl mt-4">Plan<br /><em className="ml-[12vw] text-crimson">and conspire.</em></h1>
        </div>
        <div className="self-end md:col-span-4">
          <p className="text-xl leading-snug">{studio.intro}</p>
          <p className="eyebrow mt-6 text-muted-foreground">For</p>
          <p className="mt-1">{studio.for}</p>
        </div>
      </section>
      <section className="grid border-y-2 border-ink md:grid-cols-3">
        {studio.tracks.map((t, i) => (
          <article key={t.name} className={`p-6 md:p-10 ${i < 2 ? "border-b-2 border-ink md:border-b-0 md:border-r-2" : ""} transition hover:bg-crimson hover:text-paper`}>
            <span className="eyebrow">0{i + 1}</span>
            <h2 className="display-lg mt-6 text-5xl md:text-6xl">{t.name}</h2>
            <p className="mt-4 text-lg">{t.body}</p>
          </article>
        ))}
      </section>
      <section className="bg-crimson px-5 py-20 text-paper md:px-12" aria-labelledby="keynote">
        <p className="eyebrow text-gold">01 · Speak · The signature keynote</p>
        <h2 id="keynote" className="display-lg mt-3">{studio.keynote.title}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div><p className="eyebrow opacity-70">Walking in</p><p className="font-display mt-2 text-3xl italic">{studio.keynote.in}</p></div>
          <div><p className="eyebrow text-gold">Walking out</p><p className="font-display mt-2 text-3xl italic">{studio.keynote.out}</p></div>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2">{studio.keynote.formats.map((f) => <li key={f} className="rounded-full border-2 border-paper/40 px-4 py-2 text-sm">{f}</li>)}</ul>
        <p className="mt-8 max-w-2xl">{studio.keynote.for}</p>
        <Link to="/work" className="pill mt-8 bg-gold text-ink">Let's plan and conspire →</Link>
      </section>
      <NextStops current="Studio" />
    </main>
  );
}
