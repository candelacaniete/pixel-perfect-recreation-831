import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { principles } from "@/content/yrmis";
import { Encounter, CuriosityScene, LensScene, IngenuityScene, CriticismScene, KickstartScene } from "@/components/safari/Guardians";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";

export const Route = createFileRoute("/click")({
  head: () => ({
    meta: [
      { title: "CLICK — Five instincts every human already has · Yrmis" },
      { name: "description", content: "Curiosity, Labels into Lenses, Ingenuity, Criticism, Kickstart: five guardian encounters from night to dawn." },
      { property: "og:title", content: "CLICK — Five instincts every human already has" },
      { property: "og:description", content: "Five guardian encounters through Yrmis's CLICK framework." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClickPage,
});

const tones = [
  "bg-night text-paper",
  "bg-ink text-paper",
  "bg-cobalt text-paper",
  "bg-gum text-ink",
  "bg-dawn text-ink",
];

function ClickPage() {
  const [done, setDone] = useState<boolean[]>([false, false, false, false, false]);
  const finish = (i: number) => setDone((d) => (d[i] ? d : d.map((v, j) => (j === i ? true : v))));
  useEffect(() => markVisited("click"), []);
  const scenes = [CuriosityScene, LensScene, IngenuityScene, CriticismScene, KickstartScene];
  const count = done.filter(Boolean).length;

  return (
    <main>
      <section className="relative flex min-h-[80vh] flex-col justify-end bg-night px-5 pb-16 pt-28 text-paper md:px-12">
        <p className="eyebrow text-gold">Destination 01 · The framework</p>
        <h1 className="display-xl mt-4">CLICK<span className="text-gold">.</span></h1>
        <p className="mt-6 max-w-xl text-lg">Five instincts every human already has. Five guardians between the night and the dawn. Meet them in order — or jump ahead.</p>
        <nav aria-label="Jump to a principle" className="mt-8 flex gap-2">
          {principles.map((p, i) => (
            <a key={i} href={`#enc-${i}`} className={`font-display grid h-12 w-12 place-items-center rounded-full border-2 text-xl transition hover:bg-gold hover:text-ink ${done[i] ? "border-gold bg-gold text-ink" : "border-paper/50"}`} aria-label={`${p.name}${done[i] ? " (complete)" : ""}`}>{p.letter}</a>
          ))}
        </nav>
      </section>

      {principles.map((p, i) => {
        const Scene = scenes[i]!;
        return (
          <div id={`enc-${i}`} key={i}>
            <Encounter index={i} letter={p.letter} name={p.name} tagline={p.tagline} guardian={p.guardian} done={!!done[i]} tone={tones[i] ?? ""}>
              <Scene onDone={() => finish(i)} />
              {!done[i] && <button onClick={() => finish(i)} className="mt-4 text-sm underline opacity-70">Skip — just tell me</button>}
            </Encounter>
          </div>
        );
      })}

      <section className="bg-gold px-5 py-24 text-ink md:px-12" aria-labelledby="all-five">
        <p className="eyebrow">Dawn · {count}/5 guardians met</p>
        <h2 id="all-five" className="display-lg mt-3">All five, together.</h2>
        <ol className="mt-10 grid gap-px bg-ink md:grid-cols-5">
          {principles.map((p, i) => (
            <li key={i} className="bg-gold p-5">
              <span className="display-lg block">{p.letter}</span>
              <span className="mt-2 block font-semibold">{p.name}</span>
              <span className="font-display mt-2 block text-lg italic">{p.tagline}</span>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-lg">Handed back, story by story, from the reserve in Venezuela to the companies built on nothing but resourcefulness.</p>
        <Link to="/work" className="pill mt-6 bg-ink text-paper">Put CLICK in front of your team →</Link>
      </section>
      <NextStops current="CLICK" />
    </main>
  );
}
