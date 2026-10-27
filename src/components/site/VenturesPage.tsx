import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Scene } from "@/components/safari/motion";
import { WaterSurface } from "@/components/site/habitat";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, ventureStories } from "@/content/yrmis";
import land from "@/assets/land-ventures-crocodile.jpg";
import water from "@/assets/living/ventures-water.jpg";
import greenhouse from "@/assets/sourced/ventures/mh-greenhouse.jpg";
import family from "@/assets/sourced/ventures/abs-family.jpg";
import hem from "@/assets/sourced/ventures/hem-store.jpg";
import pants from "@/assets/sourced/ventures/yrmis-pants.jpg";

const photos = { greenhouse, family, hem, pants } as const;
const tints = ["bg-scarlet text-paper", "bg-ink text-paper", "bg-yellow-surface text-yellow-foreground", "bg-crimson text-paper"];
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export function VenturesPage() {
  useEffect(() => markVisited("ventures"), []);
  return (
    <Shell current="Ventures">
      <main className="overflow-hidden bg-tangerine/20 text-ink">
        <Scene className="isolate relative min-h-[88svh] overflow-hidden px-5 pb-12 pt-28 text-paper md:px-12">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img src={land} alt="A crocodile resting in a surreal wetland, under a stone sphere and a floating red block" width={1376} height={768} className="photo-bg object-right" />
            <div aria-hidden className="absolute inset-0 bg-night/35" />
          </div>
          <div className="relative flex min-h-[70svh] items-end">
            <div className="max-w-3xl">
              <p className="eyebrow text-gold">Entrepreneurial Ventures · guarded by the crocodile</p>
              <h1 className="display-xl mt-4 text-shadow-river">Different ventures.<br /><span className="text-gold">More ways to see.</span></h1>
              <p className="mt-6 max-w-xl text-lg text-shadow-river">{siteCopy.venturesLead}</p>
            </div>
          </div>
        </Scene>
        <Scene className="relative px-5 py-16 md:px-12">
          <WaterSurface src={water} position="center" />
          <div className="relative z-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {ventureStories.map((venture, index) => (
            <article key={venture.name} className={`reveal flex flex-col overflow-hidden shadow-[0_24px_50px_-20px_oklch(0_0_0/50%)] transition duration-300 hover:rotate-0 hover:scale-[1.03] ${tints[index]} ${tilts[index]}`}>
              <img src={photos[venture.photo]} alt="" className="aspect-[4/5] w-full object-cover" />
              <div className="p-5">
                <span className="eyebrow">{venture.place}</span>
                <h2 className="font-display mt-2 text-3xl">{venture.name}</h2>
                <p className="mt-3 text-sm leading-relaxed">{venture.body}</p>
              </div>
            </article>
          ))}
          </div>
        </Scene>
        <section className="relative px-5 py-16 md:px-12">
          <WaterSurface src={water} position="center 60%" />
          <div className="relative z-10">
            <Link to="/work" className="pill bg-ink text-paper">Work with me</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
