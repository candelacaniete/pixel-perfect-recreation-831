import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ventures, hqPillars } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
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
      <section className="relative px-5 pb-12 pt-28 md:px-12">
        <img src={spBird} alt="" width={560} height={560} loading="lazy" aria-hidden
          className="pointer-events-none absolute right-[6%] top-16 w-24 rotate-12 md:w-36" />
        <p className="eyebrow">Destination 03 · Ventures</p>
        <h1 className="display-xl mt-4">Four companies.<br /><span className="text-crimson">Four industries.</span></h1>
        <p className="mt-6 max-w-xl text-lg">An economist's mind, and a habit of reading rooms the way I read the jungle.</p>
      </section>
      <section className="relative grid gap-6 px-5 pb-16 md:grid-cols-4 md:px-12" aria-label="Ventures">
        {ventures.map((v, i) => (
          <article key={v} className={`flex aspect-[3/4] flex-col justify-between p-5 shadow-[0_24px_50px_-20px_oklch(0_0_0/50%)] transition duration-300 hover:rotate-0 hover:scale-[1.03] ${tints[i]} ${tilts[i]}`} style={{ marginTop: `${(i % 2) * 3}rem` }}>
            <span className="eyebrow">Venture 0{i + 1}</span>
            {i === 1 && <img src={spCapybara} alt="" width={560} height={560} loading="lazy" className="w-3/4 self-center rounded-full border-2 border-paper/40" aria-hidden />}
            <h2 className="display-lg text-4xl md:text-5xl">{v}</h2>
          </article>
        ))}
      </section>
      <section className="relative overflow-hidden border-t-2 border-ink bg-paper px-5 py-16 md:px-12">
        <p aria-hidden className="display-xl pointer-events-none absolute -right-4 -top-8 whitespace-nowrap text-[20vw] text-gold/30">HQ</p>
        <p className="eyebrow">Headquarters</p>
        <ul className="relative mt-4 space-y-2">
          {hqPillars.map((p) => <li key={p} className="font-display text-3xl italic md:text-5xl">{p}.</li>)}
        </ul>
      </section>
      <NextStops current="Ventures" />
    </main>
  );
}
