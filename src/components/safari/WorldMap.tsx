import { Link, useRouterState } from "@tanstack/react-router";
import { useVisited } from "./visited";
import worldmap from "@/assets/worldmap-flatlands.jpg";
import jabiruSprite from "@/assets/g-jabiru-authored.png";
import heronSprite from "@/assets/g-heron-authored.png";
import capybaraSprite from "@/assets/g-capymech-authored.png";
import crocodileSprite from "@/assets/river-crocodile-authored.png";
import macawSprite from "@/assets/g-macaw-authored.png";
import anacondaSprite from "@/assets/g-anaconda-authored.png";

type Landmark = {
  id: string;
  to: "/speaking" | "/river" | "/work" | "/ventures" | "/signals" | "/click";
  name: string;
  kicker: string;
  creature: string;
  img: string;
};

const LANDMARKS: Landmark[] = [
  { id: "speaking", to: "/speaking", name: "Speaking", kicker: "The keynote", creature: "The Jabiru", img: jabiruSprite },
  { id: "river", to: "/river", name: "The river", kicker: "From the Llanos", creature: "The Night Heron", img: heronSprite },
  { id: "work", to: "/work", name: "Work with me", kicker: "Consulting Studio", creature: "The Capybara Mechanic", img: capybaraSprite },
  { id: "ventures", to: "/ventures", name: "Ventures", kicker: "Four companies", creature: "The Crocodile", img: crocodileSprite },
  { id: "signals", to: "/signals", name: "Signals", kicker: "1•1•1 Signals", creature: "The Macaw", img: macawSprite },
  { id: "click", to: "/click", name: "CLICK", kicker: "Innovation arrival", creature: "The Anaconda", img: anacondaSprite },
];

function LandmarkLink({ l, visited, current }: { l: Landmark; visited: boolean; current: boolean }) {
  return (
    <Link
      to={l.to}
      aria-current={current ? "page" : undefined}
      aria-label={`${l.name} — ${l.kicker}${visited ? " (visited)" : ""}`}
      className="group flex min-w-0 items-center gap-4 text-left"
    >
      <span className={`relative grid w-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 lg:w-24 aspect-square ${visited ? "border-gold" : "border-paper/70"} bg-night/70 transition-colors group-hover:border-gold`}>
        <img src={l.img} alt="" loading="lazy" className="h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-110" />
        {visited && <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-gold" aria-hidden />}
      </span>
      <span className="min-w-0 text-shadow-river">
        <span className="eyebrow block text-gold">{l.kicker}</span>
        <span className="font-display block text-2xl leading-tight text-paper lg:text-3xl">{l.name}</span>
        <span className="mt-1 block text-xs italic text-paper/80">guided by {l.creature}</span>
      </span>
    </Link>
  );
}

/** The world map: the entrance and persistent navigation hub of the whole site. */
export function WorldMap() {
  const visited = useVisited();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-night text-paper" aria-label="Yrmis World map">
      <img src={worldmap} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover object-[48%_center]" />
      <div className="map-exposure absolute inset-0" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="pointer-events-none relative z-10 px-5 pt-8 md:px-12 md:pt-10">
        <p className="eyebrow text-gold">Optional creative route</p>
        <h2 className="display-xl text-shadow-river mt-2 text-paper">Yrmis<br />World</h2>
        <p className="font-display text-shadow-river mt-3 max-w-md text-xl italic md:text-2xl">
          Speaking, ventures, ideas, and a few unlikely connections.
        </p>
      </div>

      {/* One ordered destination grid, below the title at every width. */}
      <nav aria-label="Destinations" className="relative z-10 grid gap-x-8 gap-y-6 px-5 pb-20 pt-12 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:gap-y-10">
        {LANDMARKS.map((l) => (
          <LandmarkLink key={l.id} l={l} visited={visited.includes(l.id)} current={path === l.to} />
        ))}
      </nav>

      <p className="text-shadow-river relative z-10 px-5 pb-8 text-sm italic text-paper/80 md:px-12">
        The river is optional. Speaking, work, and the newsletter are on this map too.
      </p>
    </section>
  );
}
