import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ventures, hqPillars } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";

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

const tints = ["bg-tangerine", "bg-ink text-paper", "bg-gum", "bg-moss text-paper"];

function VenturesPage() {
  useEffect(() => markVisited("ventures"), []);
  return (
    <main className="bg-tangerine/20 text-ink">
      <section className="px-5 pb-12 pt-28 md:px-12">
        <p className="eyebrow">Destination 03 · Ventures</p>
        <h1 className="display-xl mt-4">Four companies.<br /><span className="text-crimson">Four industries.</span></h1>
        <p className="mt-6 max-w-xl text-lg">An economist's mind, and a habit of reading rooms the way I read the jungle.</p>
      </section>
      <section className="grid gap-4 px-5 pb-16 md:grid-cols-4 md:px-12" aria-label="Ventures">
        {ventures.map((v, i) => (
          <article key={v} className={`flex aspect-[3/4] flex-col justify-between rounded-sm p-5 transition hover:-rotate-1 ${tints[i]}`} style={{ marginTop: `${(i % 2) * 3}rem` }}>
            <span className="eyebrow">Venture 0{i + 1}</span>
            <h2 className="display-lg text-4xl md:text-5xl">{v}</h2>
            <p className="eyebrow opacity-70">Story · coming soon</p>
          </article>
        ))}
      </section>
      <section className="border-t-2 border-ink px-5 py-16 md:px-12">
        <p className="eyebrow">Headquarters</p>
        <ul className="mt-4 space-y-2">
          {hqPillars.map((p) => <li key={p} className="font-display text-3xl italic md:text-5xl">{p}.</li>)}
        </ul>
      </section>
      <NextStops current="Ventures" />
    </main>
  );
}
