import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { studio } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
import landStudio from "@/assets/land-studio.jpg";
import { Scene, CrossingBird, SerpentPath } from "@/components/safari/motion";
import gCapymech from "@/assets/g-capymech.webp";
import gAnaconda from "@/assets/g-anaconda.webp";

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
    <main className="overflow-hidden bg-paper text-ink">
      <Scene className="isolate relative grid min-h-[90vh] gap-8 overflow-hidden px-5 pb-16 pt-28 md:grid-cols-12 md:px-12">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <img src={landStudio} alt="" width={1920} height={1088} className="photo-bg object-[30%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--paper)_8%,transparent_55%)] md:bg-[linear-gradient(270deg,var(--paper)_22%,transparent_60%)]" />
        </div>
        <p aria-hidden className="display-xl pointer-events-none absolute -left-6 bottom-0 whitespace-nowrap text-[24vw] text-scarlet/15 swell">BUILD</p>
        <div className="relative md:col-span-7 md:col-start-6 md:text-right">
          <p className="eyebrow">Destination 02 · Build · The Studio</p>
          <h1 className="display-xl mt-4">Plan<br /><em className="text-crimson">and conspire.</em></h1>
          <img src={gCapymech} alt="The Capybara Mechanic, the Studio's unlikely foreman" width={560} height={560}
            className="drift-up mt-8 hidden w-36 -rotate-3 rounded-full [--d:200px] border-2 border-ink shadow-[0_24px_50px_-18px_oklch(0_0_0/60%)] transition-transform duration-500 hover:rotate-0 md:absolute md:-right-4 md:top-24 md:mt-0 md:w-56" />
        </div>
        <div className="relative self-end bg-paper/90 p-4 md:col-span-5 md:col-start-8 md:p-6">
          <p className="text-xl leading-snug">{studio.intro}</p>
          <p className="eyebrow mt-6 text-muted-foreground">For</p>
          <p className="mt-1">{studio.for}</p>
        </div>
      </Scene>
      <Scene className="relative grid border-y-2 border-ink md:grid-cols-3">
        <CrossingBird className="top-[-2rem]" />
        {studio.tracks.map((t, i) => (
          <article key={t.name} className={`reveal ${i === 1 ? "reveal-2" : i === 2 ? "reveal-3" : ""} p-6 md:p-10 ${i < 2 ? "border-b-2 border-ink md:border-b-0 md:border-r-2" : ""} transition hover:bg-crimson hover:text-paper`}>
            <span className="eyebrow">0{i + 1}</span>
            <h2 className="display-lg mt-6 text-5xl md:text-6xl">{t.name}</h2>
            <p className="mt-4 text-lg">{t.body}</p>
          </article>
        ))}
      </Scene>
      <Scene className="relative overflow-hidden bg-crimson px-5 py-20 text-paper md:px-12" aria-labelledby="keynote">
        <SerpentPath className="inset-x-0 bottom-10 h-48 w-full opacity-50" />
        <img src={gAnaconda} alt="" width={560} height={560} loading="lazy"
          className="drift-down pointer-events-none absolute -right-16 -top-16 w-72 rotate-12 rounded-full opacity-40 [--d:260px] md:w-96" aria-hidden />
        <p className="eyebrow text-gold">01 · Speak · The signature keynote</p>
        <h2 id="keynote" className="display-lg relative mt-3">{studio.keynote.title}</h2>
        <div className="relative mt-10 grid gap-8 md:grid-cols-2">
          <div><p className="eyebrow opacity-70">Walking in</p><p className="font-display mt-2 text-3xl italic">{studio.keynote.in}</p></div>
          <div><p className="eyebrow text-gold">Walking out</p><p className="font-display mt-2 text-3xl italic">{studio.keynote.out}</p></div>
        </div>
        <ul className="relative mt-10 flex flex-wrap gap-2">{studio.keynote.formats.map((f) => <li key={f} className="rounded-full border-2 border-paper/40 px-4 py-2 text-sm">{f}</li>)}</ul>
        <p className="relative mt-8 max-w-2xl">{studio.keynote.for}</p>
        <Link to="/work" className="pill relative mt-8 bg-gold text-ink">Let's plan and conspire →</Link>
      </Scene>
      <NextStops current="Studio" />
    </main>
  );
}
