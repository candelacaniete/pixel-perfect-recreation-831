import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ventures, hqPillars } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
import landVentures from "@/assets/land-ventures.jpg";
import { Scene, CrossingBird } from "@/components/safari/motion";
import horses from "@/assets/horses.png";
import spCapybara from "@/assets/sp-capybara.webp";
import spBird from "@/assets/sp-bird.webp";

export const Route = createFileRoute("/ventures")({
  head: () => ({
    meta: [
      { title: "Ventures — Four companies, four industries · Yrmis" },
      { name: "description", content: "Mission Heirloom, All Black Sheep, (hĕm) and conservation work: Yrmis's entrepreneurial journey." },
      { property: "og:title", content: "Ventures — Built on resourcefulness" },
      { property: "og:description", content: "Four companies across four industries, and an economist's mind." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VenturesPage,
});

const tints = ["bg-scarlet text-paper", "bg-ink text-paper", "bg-gold text-ink", "bg-crimson text-paper"];
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

function VenturesPage() {
  useEffect(() => markVisited("ventures"), []);
  return (
    <main className="overflow-hidden bg-tangerine/20 text-ink">
      <Scene className="isolate relative min-h-[88vh] overflow-hidden px-5 pb-12 pt-28 text-paper md:px-12">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <img src={landVentures} alt="" width={1920} height={1088} className="photo-bg cloud-drift object-[40%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.25_0.1_262/70%),transparent_50%)]" />
        </div>
        <img src={horses} alt="" aria-hidden width={1024} height={1024} className="cross-x pointer-events-none absolute -bottom-10 right-0 w-[60vw] max-w-2xl [--d:80vw]" />
        <img src={spBird} alt="" width={560} height={560} loading="lazy" aria-hidden
          className="drift-up pointer-events-none absolute right-[6%] top-16 w-24 rotate-12 [--d:200px] md:w-36" />
        <p className="eyebrow relative text-gold">Destination 03 · Ventures</p>
        <h1 className="display-xl relative mt-4 text-shadow-river">Four companies.<br /><span className="text-gold">Four industries.</span></h1>
        <p className="relative mt-6 max-w-xl text-lg text-shadow-river">An economist's mind, and a habit of reading rooms the way I read the jungle.</p>
      </Scene>
      <Scene className="relative grid gap-6 px-5 pb-16 md:grid-cols-4 md:px-12" aria-label="Ventures">
        {ventures.map((v, i) => (
          <article key={v} className={`drift-up flex aspect-[3/4] flex-col justify-between p-5 shadow-[0_24px_50px_-20px_oklch(0_0_0/50%)] transition duration-300 hover:rotate-0 hover:scale-[1.03] ${tints[i]} ${tilts[i]}`} style={{ marginTop: `${(i % 2) * 3}rem`, ["--d" as string]: `${(i % 2 ? 1 : -1) * 90}px` }}>
            <span className="eyebrow">Venture 0{i + 1}</span>
            {i === 1 && <img src={spCapybara} alt="" width={560} height={560} loading="lazy" className="w-3/4 self-center rounded-full border-2 border-paper/40" aria-hidden />}
            <h2 className="display-lg text-4xl md:text-5xl">{v}</h2>
          </article>
        ))}
      </Scene>
      <Scene className="relative overflow-hidden border-t-2 border-ink bg-paper px-5 py-16 md:px-12">
        <CrossingBird flip />
        <p aria-hidden className="display-xl pointer-events-none absolute -right-4 -top-8 whitespace-nowrap text-[20vw] text-gold/40 swell">HQ</p>
        <p className="eyebrow">Headquarters</p>
        <ul className="relative mt-4 space-y-2">
          {hqPillars.map((p) => <li key={p} className="font-display text-3xl italic md:text-5xl">{p}.</li>)}
        </ul>
      </Scene>
      <NextStops current="Ventures" />
    </main>
  );
}
