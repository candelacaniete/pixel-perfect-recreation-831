import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { stops, LANDING_Z } from "@/content/journey";
import { socials, subscribeUrl, substackHome } from "@/content/yrmis";
import { journey, useJourney } from "./journeyStore";
import macaw from "@/assets/footer/macaw.webp";
import capybara from "@/assets/footer/capybara.webp";
import fanPalm from "@/assets/footer/fan-palm.webp";
import leaves from "@/assets/footer/leaves.webp";

const RIVER = "M 40 60 C 160 40, 120 160, 220 170 S 380 90, 420 190 S 300 300, 360 360 S 520 330, 560 420";

/** Primary menu from the guide: logo home, six pages, conversation opens Contact. */
const NAV = [
  { to: "/about", label: "About" },
  { to: "/work", label: "Work with me" },
  { to: "/speaking", label: "Speaking" },
  { to: "/ventures", label: "Ventures" },
  { to: "/press", label: "Press kit" },
  { to: "/signals", label: "Signals" },
] as const;

const SOCIAL_MARK: Record<(typeof socials)[number]["name"], string> = {
  LinkedIn: "in",
  Instagram: "IG",
  X: "𝕏",
};

/** An illustrated map artifact: discovered stops, your position, and free routes. */
function JourneyMap({ onGo }: { onGo: () => void }) {
  const j = useJourney();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const pts = [[150, 92], [270, 150], [395, 160], [330, 300], [440, 360]] as const;
  const go = (i: number) => {
    if (i >= stops.length) { onGo(); void navigate({ to: "/click" }); return; }
    if (path !== "/river") void navigate({ to: "/river", search: { stop: i } });
    journey.requestJump(i);
    onGo();
  };
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
        <span className="map-dot">✶</span><span className="map-label">The shore<em>CLICK arrival</em></span>
      </button>
      <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 font-display italic">
        <Link to="/speaking" onClick={onGo} className="underline-offset-4 hover:underline">Speaking</Link>
        <Link to="/ventures" onClick={onGo} className="underline-offset-4 hover:underline">Ventures</Link>
        <Link to="/signals" onClick={onGo} className="underline-offset-4 hover:underline">1•1•1 Signals</Link>
        <Link to="/work" onClick={onGo} className="underline-offset-4 hover:underline">Work with me</Link>
      </div>
    </div>
  );
}

function currentPath(path: string, to: string) {
  return path === to;
}

export function SiteChrome({ overlay = false }: { overlay?: boolean }) {
  const [mapOpen, setMapOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onRiver = path === "/river";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMapOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [path]);

  return (
    <>
      <header data-ui className={`site-chrome${overlay ? " site-chrome-overlay" : ""}`}>
        <Link to="/" className="site-logo" aria-label="Yrmis Barroeta, home">YRMIS</Link>
        <button type="button" className="site-menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((open) => !open)}>
          Menu
        </button>
        <nav id="site-nav" aria-label="Site navigation" className={menuOpen ? "site-nav menu-open" : "site-nav"}>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} aria-current={currentPath(path, item.to) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        {onRiver && (
          <button type="button" className="site-river-map" onClick={() => setMapOpen(true)} aria-haspopup="dialog" aria-expanded={mapOpen}>
            River map
          </button>
        )}
        <Link to="/contact" search={{ interest: "Consulting Studio" }} className="site-cta" aria-current={path === "/contact" ? "page" : undefined}>
          Start a conversation →
        </Link>
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

/** Three zones from the guide: the wool line and networks, Site, and 1•1•1 Signals. */
export function NextStops({ current, tone = "night" }: { current?: string; tone?: "night" | "paper" | "scarlet" | "sunset" | "day" }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <footer className="site-footer" data-current={current} data-tone={tone}>
      <img className="footer-bird" src={macaw} alt="" />
      <div className="footer-grid">
        <div className="footer-statement">
          <h2>Wild black wool<br /><em>never dyes.</em></h2>
          <p className="footer-kicker">Yrmis Barroeta · Wild Innovation</p>
          <div className="footer-socials">
            {socials.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noreferrer" aria-label={item.name}>{SOCIAL_MARK[item.name]}</a>
            ))}
          </div>
          <img className="footer-capy" src={capybara} alt="" />
        </div>
        <nav className="footer-site" aria-label="Footer">
          <p className="footer-kicker">Site</p>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} aria-current={currentPath(path, item.to) ? "page" : undefined}>{item.label}</Link>
          ))}
        </nav>
        <div className="footer-signals">
          <p className="footer-kicker">1•1•1 Signals Newsletter</p>
          <p>Field notes, free, every other week.</p>
          <a className="footer-subscribe" href={subscribeUrl} target="_blank" rel="noreferrer">Subscribe now</a>
          <a className="footer-url" href={substackHome} target="_blank" rel="noreferrer">yrmis.substack.com ↗</a>
        </div>
      </div>
      <img className="footer-flora footer-flora-left" src={fanPalm} alt="" />
      <img className="footer-flora footer-flora-right" src={leaves} alt="" />
      <div className="footer-fine">
        <span>© Yrmis Barroeta</span>
        <Link to="/contact" search={{ interest: "Consulting Studio" }}>Start a conversation →</Link>
      </div>
    </footer>
  );
}
