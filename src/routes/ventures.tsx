import { assetUrl } from "@/lib/asset-url";
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ventures, hqPillars } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
import landVentures from "@/assets/land-ventures-refined.jpg";
import mhImg from "@/assets/mh-greenhouse.jpg.asset.json";
import absImg from "@/assets/abs-family.jpg.asset.json";
import hemImg from "@/assets/hem-todo.jpg.asset.json";
import yrmisImg from "@/assets/yrmis-pants.jpg.asset.json";
import { Scene } from "@/components/safari/motion";

export const Route = createFileRoute("/ventures")({
  head: () => ({
    meta: [
      { title: "Ventures — Four companies, four industries · Yrmis" },
      { name: "description", content: "Mission Heirloom, All Black Sheep, (hĕm) and YRMIS: Yrmis's entrepreneurial journey." },
      { property: "og:title", content: "Ventures — Built on resourcefulness" },
      { property: "og:description", content: "Four companies across four industries, and an economist's mind." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VenturesPage,
});

const tints = ["bg-scarlet text-paper", "bg-ink text-paper", "bg-yellow-surface text-yellow-foreground", "bg-crimson text-paper"];
const photos = [
  { src: assetUrl(mhImg), alt: "Mission Heirloom greenhouse", pos: "object-center" },
  { src: assetUrl(absImg), alt: "A mother and her child — All Black Sheep", pos: "object-center" },
  { src: assetUrl(hemImg), alt: "(hĕm)", pos: "object-center" },
  { src: assetUrl(yrmisImg), alt: "Yrmis Barroeta wearing YRMIS trousers", pos: "object-top" },
];
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

function VenturesPage() {
  useEffect(() => markVisited("ventures"), []);
  return (
    <main className="overflow-hidden bg-tangerine/20 text-ink">
      <Scene className="isolate relative min-h-[88vh] overflow-hidden px-5 pb-12 pt-28 text-paper md:px-12">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <img src={landVentures} alt="A monumental crocodile rests in an open Llanos wetland beneath impossible ochre and vermilion forms" width={1376} height={768} className="photo-bg object-right" />
          <div className="absolute inset-0 bg-night/45" /><div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.14_0.03_260/70%),transparent_60%)]" />
        </div>
        <p className="eyebrow relative text-gold">Destination 03 · Ventures</p>
        <h1 className="display-xl relative mt-4 text-shadow-river">Four companies.<br /><span className="text-gold">Four industries.</span></h1>
        <p className="relative mt-6 max-w-xl text-lg text-shadow-river">An economist's mind, and a habit of reading rooms the way I read the jungle.</p>
      </Scene>
      <Scene className="relative grid gap-6 bg-tangerine/20 px-5 py-16 md:grid-cols-4 md:px-12" aria-label="Ventures">
        {ventures.map((v, i) => {
          const photo = photos[i];
          if (!photo) return null;
          return (
          <article key={v} className={`reveal group flex aspect-[3/4] flex-col overflow-hidden shadow-[0_24px_50px_-20px_oklch(0_0_0/50%)] transition duration-300 hover:rotate-0 hover:scale-[1.03] ${tints[i]} ${tilts[i]}`} >
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <img src={photo.src} alt={photo.alt} loading="lazy" className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${photo.pos}`} />
            </div>
            <div className="p-5">
              <span className="eyebrow">Venture 0{i + 1}</span>
              <h2 className="display-lg mt-2 text-4xl md:text-4xl">{v}</h2>
            </div>
          </article>
          );
        })}
      </Scene>
      <Scene className="relative overflow-hidden border-t-2 border-ink bg-paper px-5 py-16 md:px-12">
        <p aria-hidden className="display-xl pointer-events-none absolute -right-4 -top-8 whitespace-nowrap text-[20vw] text-gold/40 swell">HQ</p>
        <p className="eyebrow">Headquarters</p>
        <ul className="relative mt-4 space-y-2">
          {hqPillars.map((p) => <li key={p} className="font-display text-3xl italic md:text-5xl">{p}.</li>)}
        </ul>
      </Scene>
      <NextStops current="Ventures" tone="night" />
    </main>
  );
}
