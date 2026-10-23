import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { studio } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
import landStudio from "@/assets/land-studio-refined.jpg";
import { Scene } from "@/components/safari/motion";
import spPalm from "@/assets/sp-palm.webp";
import spTree from "@/assets/sp-tree.webp";
import spCapy from "@/assets/sp-capybara.webp";

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
      <Scene className="isolate relative grid min-h-[92svh] content-end overflow-hidden px-5 pb-16 pt-28 md:grid-cols-12 md:content-center md:px-12">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <img src={landStudio} alt="The capybara inventor pulls a rope and repurposed jerrycan beside a truck in the flooded Llanos" width={1920} height={1088} className="photo-bg object-[23%_center] md:object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--paper)_6%,transparent_45%)] md:bg-[linear-gradient(270deg,oklch(0.96_0.02_85/85%)_18%,transparent_55%)]" />
        </div>
        <p aria-hidden className="display-xl pointer-events-none absolute -left-6 bottom-0 whitespace-nowrap text-[24vw] text-scarlet/15 swell">BUILD</p>
        <div className="relative md:col-span-7 md:col-start-6 md:text-right">
          <p className="eyebrow">Destination 02 · Build · The Studio</p>
          <h1 className="display-xl mt-4">Plan<br /><em className="text-crimson">and conspire.</em></h1>
        </div>
      </Scene>
      <section className="grid gap-8 px-5 py-16 md:grid-cols-12 md:px-12">
        <p className="font-display text-3xl leading-snug md:col-span-7 md:text-4xl">{studio.intro}</p>
        <div className="md:col-span-4 md:col-start-9">
          <p className="eyebrow text-muted-foreground">For</p>
          <p className="mt-2 text-lg">{studio.for}</p>
        </div>
      </section>
      <Scene className="relative isolate grid overflow-hidden border-y-2 border-ink md:grid-cols-3">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
          <div className="reveal absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,oklch(0.78_0.12_85/45%),transparent)]" style={{ transitionDelay: "0s" }} />
          <span className="reveal absolute bottom-[8%] right-[20%] h-20 w-20 rounded-full bg-gold/70 md:h-28 md:w-28" style={{ transitionDelay: ".2s" }} />
          {[
            { src: spPalm, cls: "left-[4%] w-28 md:w-44", d: ".4s" },
            { src: spPalm, cls: "left-[36%] w-20 md:w-32 -scale-x-100", d: ".6s" },
            { src: spTree, cls: "right-[4%] w-32 md:w-52", d: ".8s" },
            { src: spCapy, cls: "left-[58%] w-20 md:w-28", d: "1.1s" },
          ].map((l, i) => (
            <img key={i} src={l.src} alt="" loading="lazy" className={`reveal absolute bottom-0 ${l.cls}`} style={{ transitionDelay: l.d }} />
          ))}
        </div>
        {studio.tracks.map((t, i) => (
          <article key={t.name} className={`relative isolate overflow-hidden reveal ${i === 1 ? "reveal-2" : i === 2 ? "reveal-3" : ""} p-6 pb-40 md:p-10 md:pb-48 ${i < 2 ? "border-b-2 border-ink md:border-b-0 md:border-r-2" : ""} transition hover:bg-crimson hover:text-paper`}>
            <span className="eyebrow">0{i + 1}</span>
            <h2 className="display-lg mt-6 text-5xl md:text-6xl">{t.name}</h2>
            <p className="mt-4 text-lg">{t.body}</p>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 md:hidden">
              <div className="absolute inset-0 bg-[linear-gradient(0deg,oklch(0.78_0.12_85/45%),transparent)]" />
              {i === 0 && <img src={spPalm} alt="" loading="lazy" className="reveal absolute bottom-0 left-[10%] w-24" style={{ transitionDelay: ".3s" }} />}
              {i === 1 && <><img src={spPalm} alt="" loading="lazy" className="reveal absolute bottom-0 left-[12%] w-20 -scale-x-100" style={{ transitionDelay: ".3s" }} /><img src={spCapy} alt="" loading="lazy" className="reveal absolute bottom-1 right-[10%] w-24" style={{ transitionDelay: ".6s" }} /></>}
              {i === 2 && <><span className="reveal absolute bottom-6 right-[38%] h-16 w-16 rounded-full bg-gold/70" style={{ transitionDelay: ".2s" }} /><img src={spTree} alt="" loading="lazy" className="reveal absolute bottom-0 right-[6%] w-32" style={{ transitionDelay: ".5s" }} /></>}
            </div>
          </article>
        ))}
      </Scene>
      <Scene className="relative overflow-hidden bg-crimson px-5 py-20 text-paper md:px-12" aria-labelledby="keynote">
        <p className="eyebrow text-gold">01 · Speak · The signature keynote</p>
        <h2 id="keynote" className="display-lg relative mt-3">{studio.keynote.title}</h2>
        <div className="relative mt-10 grid gap-8 md:grid-cols-2">
          <div><p className="eyebrow opacity-70">Walking in</p><p className="font-display mt-2 text-3xl italic">{studio.keynote.in}</p></div>
          <div><p className="eyebrow text-gold">Walking out</p><p className="font-display mt-2 text-3xl italic">{studio.keynote.out}</p></div>
        </div>
        <div className="relative mt-12 max-w-3xl">
          <p className="eyebrow text-gold">Formats</p>
          <ol className="mt-3 border-t border-paper/30">
            {studio.keynote.formats.map((f, i) => (
              <li key={f} className="group flex items-baseline gap-5 border-b border-paper/30 py-4 transition-[padding,color] duration-300 hover:pl-3 hover:text-gold">
                <span className="eyebrow w-8 shrink-0 text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl italic md:text-3xl">{f}</span>
                <span aria-hidden className="ml-auto text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">→</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="relative mt-8 max-w-2xl">{studio.keynote.for}</p>
        <Link to="/work" className="pill relative mt-8 bg-yellow-surface text-yellow-foreground">Let's plan and conspire →</Link>
      </Scene>
      <NextStops current="Studio" tone="paper" />
    </main>
  );
}
