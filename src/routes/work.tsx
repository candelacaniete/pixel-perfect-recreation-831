import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { workOptions } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work with me — Five ways to click into your wild · Yrmis" },
      { name: "description", content: "Keynotes, the Studio, a feature in Signals, a newsletter engine of your own — or something not yet named." },
      { property: "og:title", content: "Work with Yrmis" },
      { property: "og:description", content: "Five ways to click into your wild." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const [pick, setPick] = useState<string>("");
  const [sent, setSent] = useState(false);
  return (
    <main className="bg-gum text-ink">
      <section className="px-5 pb-10 pt-28 md:px-12">
        <p className="eyebrow">Work with me</p>
        <h1 className="display-xl mt-4">Five ways to<br /><em>click into your wild.</em></h1>
        <p className="mt-6 max-w-2xl text-lg">One room turned around in ninety minutes, a newsletter that reaches the right 250,000 people, or a company built from inception to scale — underneath, the work is the same.</p>
      </section>
      <section className="grid gap-px bg-ink md:grid-cols-3" aria-label="Ways to work together">
        {[...workOptions, { n: "∞", verb: "Custom", title: "Something we haven't named yet", body: "Not seeing exactly what you need? Good — that's usually where the interesting work is." }].map((o) => (
          <button key={o.n} onClick={() => { setPick(o.title); document.getElementById("form")?.scrollIntoView({ behavior: "smooth" }); }} aria-pressed={pick === o.title}
            className={`p-6 text-left transition md:p-8 ${pick === o.title ? "bg-ink text-paper" : "bg-gum hover:bg-paper"}`}>
            <span className="eyebrow">{o.n} · {o.verb}</span>
            <span className="font-display mt-4 block text-3xl">{o.title}</span>
            <span className="mt-3 block">{o.body}</span>
          </button>
        ))}
      </section>
      <section id="form" className="bg-paper px-5 py-16 md:px-12">
        <h2 className="display-lg">Start a conversation</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Tell me about the room, the company, or the goal. We'll build the approach around where you actually are.</p>
        {sent ? (
          <p role="status" className="font-display mt-10 text-3xl italic">Message drafted. (Prototype: sending isn't connected yet.)</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
            <label className="block"><span className="eyebrow">Name</span><input required className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-lg outline-none focus:border-tangerine" /></label>
            <label className="block"><span className="eyebrow">Email</span><input required type="email" className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-lg outline-none focus:border-tangerine" /></label>
            <label className="block md:col-span-2"><span className="eyebrow">Interested in</span><input value={pick} onChange={(e) => setPick(e.target.value)} placeholder="Keynote, Studio, Signals…" className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-lg outline-none focus:border-tangerine" /></label>
            <label className="block md:col-span-2"><span className="eyebrow">The room, the company, or the goal</span><textarea required rows={4} className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-lg outline-none focus:border-tangerine" /></label>
            <button className="pill w-fit bg-ink text-paper">Send →</button>
          </form>
        )}
      </section>
      <NextStops />
    </main>
  );
}
