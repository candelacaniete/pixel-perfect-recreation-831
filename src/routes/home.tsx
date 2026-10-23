import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { reframe, origin, capybaraLaw, studio, signals } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
import landHome from "@/assets/land-home.jpg";
import { Scene } from "@/components/safari/motion";
import yrmisPhoto from "@/assets/yrmis.jpg.asset.json";
import horses from "@/assets/horses.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Yrmis — Not a new self. A wilder permission." },
      { name: "description", content: "Keynotes, a boutique studio, four ventures and 1•1•1 Signals — one wild, resourceful mind behind all of it." },
      { property: "og:title", content: "Yrmis — Not a new self. A wilder permission." },
      { property: "og:description", content: "Permission to use the wild, resourceful self you already have." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useEffect(() => markVisited("home"), []);
  return (
    <main className="bg-paper text-ink">
      {/* Hero — the storm over the savanna */}
      <Scene className="isolate relative overflow-hidden bg-night text-paper" data-guide="Start">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <img src={landHome} alt="" width={1920} height={1088} className="photo-bg cloud-drift object-[70%_center]" />
          <div className="lightning" />
          <div className="scrim-l absolute inset-0" />
        </div>
        <div className="grid min-h-[92vh] items-center gap-6 px-5 pb-14 pt-24 md:grid-cols-12 md:px-12">
          <div className="relative z-10 md:col-span-7">
            <p className="eyebrow text-gold">Yrmis Barroeta</p>
            <h1 className="display-xl mt-4">
              {reframe.lead}<br />
              <em className="text-gold">A wilder<br />permission.</em>
            </h1>
            <p className="font-display mt-6 max-w-xl text-2xl italic leading-snug md:text-3xl">{reframe.rest}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/click" className="pill bg-gold text-ink">Experience CLICK — the river →</Link>
              <Link to="/work" className="pill border-2 border-paper">Work with me</Link>
            </div>
          </div>
        </div>
        <p aria-hidden className="display-xl swell pointer-events-none absolute -bottom-8 right-0 whitespace-nowrap text-[26vw] text-scarlet/35 mix-blend-screen">WILD</p>
      </Scene>

      {/* Origin — the facts, in her words */}
      <Scene className="relative overflow-hidden border-y-2 border-ink bg-night px-5 py-24 text-paper md:px-12" data-guide="Origin">
        <div className="relative grid gap-10 md:grid-cols-12">
          <figure className="reveal md:col-span-7">
            <blockquote className="font-display text-3xl italic leading-snug md:text-5xl">&ldquo;{origin}&rdquo;</blockquote>
            <figcaption className="eyebrow mt-6 text-gold">Yrmis · The Llanos, Venezuela</figcaption>
          </figure>
          <div className="reveal reveal-2 md:col-span-5">
            <img src={yrmisPhoto.url} alt="Yrmis Barroeta in red tights and red heels, leaning toward the camera" loading="lazy" width={1440} height={1800}
              className="mb-10 aspect-[4/5] w-full max-w-sm border-2 border-gold object-cover md:ml-auto" />
            <p className="border-l-4 border-scarlet pl-5 text-xl leading-snug">{capybaraLaw}</p>
            <p className="mt-6 text-paper/70">{reframe.body}</p>
          </div>
        </div>
      </Scene>

      {/* Ventures — horses running through the type */}
      <Scene className="relative overflow-hidden px-5 py-20 md:px-12" aria-labelledby="home-ventures" data-guide="Ventures">
        <p aria-hidden className="display-xl cross-x-rtl pointer-events-none absolute left-0 top-1/3 whitespace-nowrap text-[22vw] text-crimson/10 [--d:50vw]">GALLOP GALLOP</p>
        <p className="eyebrow text-crimson">Ventures</p>
        <h2 id="home-ventures" className="display-lg mt-3 max-w-4xl">Four companies.<br /><span className="text-crimson">Four industries.</span></h2>
        <img src={horses} alt="Four wild horses — crimson, black, gold and green, one for each company — galloping across the page" loading="lazy" width={1376} height={768}
          className="cross-x pointer-events-none relative z-10 -my-6 ml-auto w-full max-w-2xl [--d:90vw] md:-my-16" />
        <div className="relative z-20 flex flex-wrap items-center gap-3">
          <Link to="/ventures" className="pill bg-ink text-paper">Meet the ventures →</Link>
          <span className="eyebrow text-muted-foreground">Mission Heirloom · All Black Sheep · (hĕm) · Conservation</span>
        </div>
      </Scene>

      {/* Studio + Signals — asymmetric editorial links */}
      <section className="grid border-t-2 border-ink md:grid-cols-2" data-guide="Studio · Signals">
        <Link to="/studio" className="group relative block overflow-hidden border-b-2 border-ink bg-crimson p-8 text-paper transition hover:bg-ink md:border-b-0 md:border-r-2 md:p-12">
          <p className="eyebrow text-gold">The Studio</p>
          <p className="display-lg mt-4">Plan<br />and conspire.</p>
          <p className="mt-6 max-w-md text-lg">{studio.intro}</p>
          <span className="pill mt-8 bg-paper text-ink transition group-hover:bg-gold">Into the Studio →</span>
        </Link>
        <Link to="/signals" className="group relative block overflow-hidden bg-gold p-8 text-ink transition hover:bg-tangerine md:p-12">
          <p className="eyebrow">1•1•1 Signals</p>
          <p className="display-lg mt-4">Field notes<br />from the edge.</p>
          <p className="mt-6 max-w-md text-lg">{signals.cadence} Read by 250,000 executives and builders.</p>
          <span className="pill mt-8 bg-ink text-paper">Visit the observatory →</span>
        </Link>
      </section>

      <NextStops current="Home" tone="night" />
    </main>
  );
}
