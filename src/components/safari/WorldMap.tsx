import { Link, useRouterState } from "@tanstack/react-router";
import { useVisited } from "./visited";
import worldmap from "@/assets/worldmap.jpg";
import gJabiru from "@/assets/g-jabiru.webp";
import gHeron from "@/assets/g-heron.webp";
import gCapymech from "@/assets/g-capymech.webp";
import spCapybara from "@/assets/sp-capybara.webp";
import gMacaw from "@/assets/g-macaw.webp";
import gAnaconda from "@/assets/g-anaconda.webp";

type Landmark = {
  id: string;
  to: "/home" | "/click" | "/studio" | "/ventures" | "/signals" | "/work";
  name: string;
  kicker: string;
  creature: string;
  img: string;
  // desktop position on the map, in %
  x: number;
  y: number;
  size: string; // tailwind width class for the creature cutout
  rotate: string;
};

const LANDMARKS: Landmark[] = [
  { id: "home", to: "/home", name: "Home", kicker: "The clearing", creature: "The Jabiru", img: gJabiru, x: 10, y: 46, size: "w-24 md:w-32", rotate: "-rotate-3" },
  { id: "click", to: "/click", name: "Experience CLICK", kicker: "The river journey", creature: "The Night Heron", img: gHeron, x: 36, y: 58, size: "w-24 md:w-32", rotate: "rotate-2" },
  { id: "studio", to: "/studio", name: "Studio", kicker: "Plan and conspire", creature: "The Capybara Mechanic", img: gCapymech, x: 60, y: 26, size: "w-24 md:w-32", rotate: "rotate-3" },
  { id: "ventures", to: "/ventures", name: "Ventures", kicker: "Four companies", creature: "The Capybara", img: spCapybara, x: 76, y: 52, size: "w-24 md:w-32", rotate: "-rotate-2" },
  { id: "signals", to: "/signals", name: "Signals", kicker: "The observatory", creature: "The Macaw", img: gMacaw, x: 56, y: 80, size: "w-24 md:w-32", rotate: "rotate-6" },
  { id: "work", to: "/work", name: "Work with me", kicker: "Start a conversation", creature: "The Anaconda", img: gAnaconda, x: 22, y: 84, size: "w-24 md:w-32", rotate: "-rotate-6" },
];

function LandmarkLink({ l, visited, current }: { l: Landmark; visited: boolean; current: boolean }) {
  return (
    <Link
      to={l.to}
      aria-current={current ? "page" : undefined}
      aria-label={`${l.name} — ${l.kicker}${visited ? " (visited)" : ""}`}
      className={`group flex items-center gap-3 text-left transition-transform duration-300 hover:scale-105`}
    >
      <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border-2 ${l.size} aspect-square ${visited ? "border-gold" : "border-paper/70"} bg-night/60 shadow-[0_18px_40px_-12px_oklch(0_0_0/70%)] backdrop-blur-sm transition-colors group-hover:border-gold`}>
        <img src={l.img} alt="" loading="lazy" width={560} height={560} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
        {visited && <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-gold" aria-hidden />}
      </span>
      <span className="text-shadow-river">
        <span className="eyebrow block text-gold">{l.kicker}</span>
        <span className="font-display block text-2xl leading-none text-paper md:text-3xl">{l.name}</span>
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
      <img src={worldmap} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-night/50" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.14_0.03_260/55%)_100%)]" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-20 md:px-12 md:pt-24">
        <p className="eyebrow text-gold">A map of an impossible territory</p>
        <h1 className="display-xl text-shadow-river mt-2 text-paper">Yrmis&rsquo;s<br />world</h1>
        <p className="font-display text-shadow-river mt-3 max-w-md text-xl italic md:text-2xl">
          Six landmarks, one river running through all of them. Pick anywhere — you can never get lost.
        </p>
      </div>

      {/* Desktop: landmarks in an ordered grid below the title */}
      <nav aria-label="Destinations" className="relative z-10 hidden grid-cols-3 gap-x-10 gap-y-10 px-12 pb-20 pt-[max(58vh,33rem)] md:grid">
        {LANDMARKS.map((l) => (
          <LandmarkLink key={l.id} l={l} visited={visited.includes(l.id)} current={path === l.to} />
        ))}
      </nav>

      {/* Mobile: the same landmarks as a scrollable expedition list */}
      <nav aria-label="Destinations" className="relative z-10 mt-[62vh] grid gap-5 bg-gradient-to-t from-night via-night/85 to-transparent px-5 pb-16 pt-10 md:hidden">
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
