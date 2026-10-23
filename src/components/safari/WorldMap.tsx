import { Link, useRouterState } from "@tanstack/react-router";
import { useVisited } from "./visited";
import worldmap from "@/assets/worldmap-flatlands.jpg";
import homeLandscape from "@/assets/land-home.jpg";
import studioLandscape from "@/assets/land-studio-inventor.jpg";
import venturesLandscape from "@/assets/land-ventures-crocodile.jpg";
import signalsLandscape from "@/assets/land-signals-observation.jpg";
import workLandscape from "@/assets/work-threshold.jpg";

type Landmark = {
  id: string;
  to: "/home" | "/click" | "/studio" | "/ventures" | "/signals" | "/work";
  name: string;
  kicker: string;
  creature: string;
  img: string;
  position: string;
};

const LANDMARKS: Landmark[] = [
  { id: "home", to: "/home", name: "Home", kicker: "The clearing", creature: "The Jabiru", img: homeLandscape, position: "object-[75%_center]" },
  { id: "click", to: "/click", name: "Experience CLICK", kicker: "The river journey", creature: "The Night Heron", img: worldmap, position: "object-[45%_70%]" },
  { id: "studio", to: "/studio", name: "Studio", kicker: "Plan and conspire", creature: "The Capybara Mechanic", img: studioLandscape, position: "object-left" },
  { id: "ventures", to: "/ventures", name: "Ventures", kicker: "Four companies", creature: "The Crocodile", img: venturesLandscape, position: "object-[85%_center]" },
  { id: "signals", to: "/signals", name: "Signals", kicker: "The observatory", creature: "The Macaw", img: signalsLandscape, position: "object-right" },
  { id: "work", to: "/work", name: "Work with me", kicker: "Start a conversation", creature: "The Anaconda", img: workLandscape, position: "object-center" },
];

function LandmarkLink({ l, visited, current }: { l: Landmark; visited: boolean; current: boolean }) {
  return (
    <Link
      to={l.to}
      aria-current={current ? "page" : undefined}
      aria-label={`${l.name} — ${l.kicker}${visited ? " (visited)" : ""}`}
      className="group flex min-w-0 items-center gap-4 text-left"
    >
      <span className={`relative grid w-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 lg:w-24 aspect-square ${visited ? "border-gold" : "border-paper/70"} bg-night/60 transition-colors group-hover:border-gold`}>
        <img src={l.img} alt="" loading="lazy" width={560} height={560} className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 ${l.position}`} />
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
    <main className="relative min-h-screen overflow-hidden bg-night text-paper">
      <img src={worldmap} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover object-[48%_center]" />
      <div className="map-exposure absolute inset-0" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="pointer-events-none relative z-10 px-5 pt-20 md:px-12 md:pt-24">
        <p className="eyebrow text-gold">A map of an impossible territory</p>
        <h1 className="display-xl text-shadow-river mt-2 text-paper">Yrmis&rsquo;s<br />world</h1>
        <p className="font-display text-shadow-river mt-3 max-w-md text-xl italic md:text-2xl">
          Six landmarks, one river running through all of them. Pick anywhere — you can never get lost.
        </p>
      </div>

      {/* One ordered destination grid, below the title at every width. */}
      <nav aria-label="Destinations" className="relative z-10 grid gap-x-8 gap-y-6 px-5 pb-20 pt-12 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:gap-y-10">
        {LANDMARKS.map((l) => (
          <LandmarkLink key={l.id} l={l} visited={visited.includes(l.id)} current={path === l.to} />
        ))}
      </nav>

      <p className="text-shadow-river absolute bottom-4 left-12 z-10 hidden max-w-xs text-right text-xs italic text-paper/80 md:block">
        The river is the way in: Experience CLICK is a first-person boat ride through the five instincts.
      </p>
    </main>
  );
}
