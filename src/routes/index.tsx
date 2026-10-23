import { createFileRoute, Link } from "@tanstack/react-router";
import { Origin } from "@/components/safari/Origin";
import { SafariMap } from "@/components/safari/SafariMap";
import { Territory } from "@/components/safari/Territory";
import { reframe } from "@/content/yrmis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yrmis — Click into your wild" },
      { name: "description", content: "An editorial safari through Yrmis's world: CLICK, the Studio, Ventures and 1•1•1 Signals." },
      { property: "og:title", content: "Yrmis — Click into your wild" },
      { property: "og:description", content: "An editorial safari through Yrmis's world: CLICK, the Studio, Ventures and 1•1•1 Signals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Origin />
      <section className="bg-paper px-5 pb-16 pt-10 text-ink md:px-12" aria-labelledby="map-title">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Chapter I · The river becomes a map</p>
            <h2 id="map-title" className="display-lg mt-3">Pick a shore.<br /><em className="text-crimson">The boat follows.</em></h2>
          </div>
          <p className="self-end text-lg md:col-span-5 md:col-start-8">
            <strong className="font-display text-2xl italic">{reframe.lead}</strong> {reframe.rest} {reframe.body}
          </p>
        </div>
        <div className="mt-10 pb-8 md:mt-16"><SafariMap /></div>
        <p className="eyebrow mt-6 text-center text-muted-foreground">The map stays with you — top right, anytime.</p>
      </section>
      <Territory />
      <section className="bg-ink px-5 py-20 text-paper md:px-12">
        <p className="eyebrow text-gold">Or skip the river</p>
        <Link to="/work" className="display-lg mt-4 block hover:text-gum">Tell me about the room, the company, or the goal →</Link>
      </section>
    </main>
  );
}
