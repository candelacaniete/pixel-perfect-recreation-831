import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { stops, LANDING_Z } from "@/content/journey";
import { journey, useJourney } from "./journeyStore";
import { useVisited } from "./visited";

const RIVER = "M 40 60 C 160 40, 120 160, 220 170 S 380 90, 420 190 S 300 300, 360 360 S 520 330, 560 420";

const DESTINATIONS = [
  { to: "/", label: "World map", id: "map" },
  { to: "/home", label: "Home", id: "home" },
  { to: "/click", label: "Experience CLICK", id: "click" },
  { to: "/studio", label: "Studio", id: "studio" },
  { to: "/ventures", label: "Ventures", id: "ventures" },
  { to: "/signals", label: "Signals", id: "signals" },
  { to: "/work", label: "Work with me", id: "work" },
] as const;

/** Routes with dark artwork behind the fixed header. */
const DARK_ROUTES = new Set(["/", "/click", "/signals", "/home", "/ventures"]);

/** An illustrated map artifact: discovered stops, your position, and free routes. */
function JourneyMap({ onGo }: { onGo: () => void }) {
  const j = useJourney();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const pts = [[150, 92], [270, 150], [395, 160], [330, 300], [440, 360]] as const;
  const go = (i: number) => { if (path !== "/click") navigate({ to: "/click" }); journey.requestJump(i); onGo(); };
  const prog = Math.min(1, j.cam / LANDING_Z);

  return (
    <div className="map-paper relative mx-auto w-full max-w-3xl rotate-[-1deg] p-4 md:p-8">
      <svg viewBox="0 0 600 460" className="h-auto w-full" role="img" aria-label="Hand-drawn map of the river">
        <path d={RIVER} fill="none" stroke="var(--river)" strokeWidth="22" strokeLinecap="round" opacity="0.5" />
        <path d={RIVER} fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 7" pathLength={1} strokeDashoffset={0} />
        <path d={RIVER} fill="none" stroke="var(--crimson)" strokeWidth="3" pathLength={1} strokeDasharray={`${prog} 1`} />
        <text x="30" y="40" className="map-ink">the Llanos</text>
        <text x="500" y="455" className="map-ink">the shore</text>
        {[[80, 300], [500, 120], [200, 400]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`} opacity="0.5"><path d="M0 0 l8 -16 l8 16 z M4 -6 l4 -10 l4 10" fill="none" stroke="var(--ink)" /></g>
        ))}
      </svg>
      {stops.map((s, i) => {
        const seen = j.completed.includes(i);
        const [x, y] = pts[i]!;
        return (
          <button key={i} onClick={() => go(i)} className="map-stop" style={{ left: `${(x / 600) * 100}%`, top: `${(y / 460) * 100}%` }} aria-label={`Sail to ${s.name}, guarded by ${s.guardian}${seen ? " (met)" : ""}`}>
            <span className={`map-dot ${seen ? "map-dot-seen" : ""}`}>{s.letter}</span>
            <span className="map-label">{s.name}<em>{s.guardian}</em></span>
          </button>
        );
      })}
      <button onClick={() => go(stops.length)} className="map-stop" style={{ left: "93%", top: "91%" }} aria-label="Sail straight to the shore">
        <span className="map-dot">✶</span><span className="map-label">The shore<em>Studio · Ventures · Signals</em></span>
      </button>
      <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 font-display italic">
        <Link to="/studio" onClick={onGo} className="underline-offset-4 hover:underline">The Studio</Link>
        <Link to="/ventures" onClick={onGo} className="underline-offset-4 hover:underline">Ventures</Link>
        <Link to="/signals" onClick={onGo} className="underline-offset-4 hover:underline">1•1•1 Signals</Link>
        <Link to="/work" onClick={onGo} className="underline-offset-4 hover:underline">Work with me</Link>
      </div>
    </div>
  );
}

/** Compact destination jump-list: a small panel, never a full-screen menu. */
function DestinationMenu({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const visited = useVisited();

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const c = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener("keydown", k);
    window.addEventListener("mousedown", c);
    return () => { window.removeEventListener("keydown", k); window.removeEventListener("mousedown", c); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} className="row-btn whitespace-nowrap max-sm:px-3" aria-haspopup="menu" aria-expanded={open}>
        <span className="max-sm:hidden">Destinations</span><span className="sm:hidden">Go</span> {open ? "▴" : "▾"}
      </button>
      {open && (
        <div role="menu" aria-label="Jump to a destination"
          className={`absolute right-0 top-full z-50 mt-2 w-60 rounded-lg border-2 p-2 shadow-[0_24px_50px_-16px_oklch(0_0_0/60%)] animate-in fade-in slide-in-from-top-1 ${dark ? "border-paper/30 bg-night/95" : "border-ink bg-paper"}`}>
          {DESTINATIONS.map((d) => {
            const current = path === d.to;
            return (
              <Link key={d.to} to={d.to} role="menuitem" aria-current={current ? "page" : undefined} onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold transition ${current ? (dark ? "bg-scarlet text-paper" : "bg-ink text-paper") : dark ? "text-paper hover:bg-paper/10" : "text-ink hover:bg-ink/10"}`}>
                <span>{d.label}</span>
                {visited.includes(d.id) && !current && <span className="h-2 w-2 rounded-full bg-gold" aria-label="visited" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SiteChrome() {
  const [mapOpen, setMapOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const dark = DARK_ROUTES.has(path);
  const onRiver = path === "/click";

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setMapOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <>
      <header data-ui className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between p-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:p-5">
        <Link to="/" aria-label="Yrmis — back to the world map"
          className={`pointer-events-auto font-display text-2xl italic md:text-3xl ${dark ? "text-paper text-shadow-river" : "text-ink"}`}>
          Yrmis
        </Link>
        <div className="pointer-events-auto flex items-center gap-2">
          {onRiver && (
            <button onClick={() => setMapOpen(true)} className="row-btn whitespace-nowrap max-sm:px-3" aria-haspopup="dialog" aria-expanded={mapOpen}><span className="max-sm:hidden">River map</span><span className="sm:hidden">River</span></button>
          )}
          <Link to="/" aria-current={path === "/" ? "page" : undefined} className={`row-btn whitespace-nowrap max-sm:px-3 ${path === "/" ? "row-btn-scarlet" : ""}`}>Map</Link>
          <DestinationMenu dark={dark} />
          <Link to="/work" className="row-btn row-btn-scarlet hidden sm:inline-flex">Work with me</Link>
        </div>
      </header>
      {mapOpen && onRiver && (
        <div data-ui role="dialog" aria-modal="true" aria-label="Map of the journey" className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-night/80 p-4 backdrop-blur-md animate-in fade-in">
          <button autoFocus onClick={() => setMapOpen(false)} className="row-btn absolute right-4 top-4">Fold map ✕</button>
          <JourneyMap onGo={() => setMapOpen(false)} />
        </div>
      )}
    </>
  );
}

export function NextStops({ current }: { current?: string }) {
  const navigate = useNavigate();
  const all = [
    { to: "/home", n: "Home" },
    { to: "/studio", n: "Studio" },
    { to: "/ventures", n: "Ventures" },
    { to: "/signals", n: "Signals" },
  ] as const;
  return (
    <nav aria-label="Other destinations" className="border-t-2 border-ink bg-paper px-5 py-10 text-ink md:px-12">
      <p className="eyebrow mb-4">Keep exploring</p>
      <div className="flex flex-wrap gap-3">
        <Link to="/" className="pill border-2 border-ink">✶ World map</Link>
        <button onClick={() => { journey.requestJump(0); navigate({ to: "/click" }); }} className="pill border-2 border-ink hover:bg-gold">CLICK — the river</button>
        {all.filter((a) => a.n !== current).map((a) => (
          <Link key={a.to} to={a.to} className="pill border-2 border-ink hover:bg-gold">{a.n}</Link>
        ))}
        <Link to="/work" className="pill bg-scarlet text-paper">Work with me →</Link>
      </div>
    </nav>
  );
}
