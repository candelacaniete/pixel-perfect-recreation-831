import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SafariMap } from "./SafariMap";

export function SiteChrome() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between p-3 md:p-5">
        <Link to="/" className="pointer-events-auto font-display text-2xl italic tracking-tight mix-blend-difference text-paper md:text-3xl" aria-label="Yrmis — home">
          Yrmis
        </Link>
        <div className="pointer-events-auto flex gap-2">
          <button onClick={() => setOpen(true)} className="pill border-2 border-ink bg-paper text-ink" aria-haspopup="dialog" aria-expanded={open}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M1 3l4.5-2 5 2L15 1v12l-4.5 2-5-2L1 15z M5.5 1v12 M10.5 3v12" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            Map
          </button>
          <Link to="/work" className="pill bg-gum text-ink" activeProps={{ className: "pill bg-tangerine text-ink" }}>
            Work with me
          </Link>
        </div>
      </header>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Safari map" className="fixed inset-0 z-50 flex flex-col bg-paper/95 backdrop-blur-sm animate-in fade-in">
          <div className="flex items-center justify-between p-4 md:p-6">
            <p className="eyebrow">The river · choose a destination</p>
            <button autoFocus onClick={() => setOpen(false)} className="pill border-2 border-ink">Close ✕</button>
          </div>
          <div className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 pb-10">
            <SafariMap compact onDepart={() => setOpen(false)} />
          </div>
          <div className="flex flex-wrap justify-center gap-3 pb-6">
            <Link to="/" onClick={() => setOpen(false)} className="pill border-2 border-ink">↺ Back to the origin</Link>
            <Link to="/work" onClick={() => setOpen(false)} className="pill bg-gum">Work with me →</Link>
          </div>
        </div>
      )}
    </>
  );
}

export function NextStops({ current }: { current?: string }) {
  const all = [
    { to: "/click", n: "CLICK" }, { to: "/studio", n: "Studio" },
    { to: "/ventures", n: "Ventures" }, { to: "/signals", n: "Signals" },
  ] as const;
  return (
    <nav aria-label="Other destinations" className="border-t-2 border-ink bg-paper px-5 py-10 text-ink md:px-12">
      <p className="eyebrow mb-4">Keep sailing</p>
      <div className="flex flex-wrap gap-3">
        <Link to="/" className="pill border-2 border-ink">← The map</Link>
        {all.filter((a) => a.n !== current).map((a) => (
          <Link key={a.to} to={a.to} className="pill border-2 border-ink hover:bg-gold">{a.n}</Link>
        ))}
        <Link to="/work" className="pill bg-gum">Work with me →</Link>
      </div>
    </nav>
  );
}
