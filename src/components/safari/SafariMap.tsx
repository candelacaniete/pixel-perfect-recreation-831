import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { destinations, type DestinationId } from "@/content/yrmis";
import { getBoat, setBoat, useReducedMotion, useVisited } from "./visited";

const RIVER =
  "M 30 90 C 220 40, 260 250, 400 250 S 600 110, 690 250 S 540 470, 760 500 S 960 400, 975 330";

type Pt = { x: number; y: number };

export function SafariMap({ onDepart, compact = false }: { onDepart?: () => void; compact?: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [boat, setBoatState] = useState(getBoat());
  const [moving, setMoving] = useState<DestinationId | null>(null);
  const navigate = useNavigate();
  const visited = useVisited();
  const reduced = useReducedMotion();

  useEffect(() => { if (pathRef.current) setLen(pathRef.current.getTotalLength()); }, []);

  const pt = (t: number): Pt => {
    const p = pathRef.current;
    if (!p || !len) return { x: 30, y: 90 };
    const a = p.getPointAtLength(t * len);
    return { x: a.x, y: a.y };
  };
  const angle = (t: number) => {
    const a = pt(Math.max(0, t - 0.005)), b = pt(Math.min(1, t + 0.005));
    return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  };

  const sail = (id: DestinationId, at: number, to: string) => {
    if (moving) return;
    setMoving(id);
    const from = boat;
    const dur = reduced ? 0 : 900 + Math.abs(at - from) * 1400;
    const start = performance.now();
    const step = (now: number) => {
      const k = dur === 0 ? 1 : Math.min(1, (now - start) / dur);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const v = from + (at - from) * e;
      setBoatState(v); setBoat(v);
      if (k < 1) requestAnimationFrame(step);
      else setTimeout(() => { onDepart?.(); navigate({ to: to as "/click" }); setMoving(null); }, reduced ? 0 : 250);
    };
    requestAnimationFrame(step);
  };

  const b = pt(boat);

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 1000 580" className="h-auto w-full" role="img" aria-label="Safari map of the river and its four destinations">
        <defs>
          <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="var(--ink)" strokeOpacity="0.08" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="1000" height="580" fill="url(#hatch)" />
        {/* land masses */}
        <path d="M 820 560 C 860 470, 980 470, 1000 420 L 1000 580 L 800 580 Z" fill="var(--gum)" opacity="0.9" />
        <circle cx="140" cy="430" r="90" fill="var(--gold)" opacity="0.35" />
        <circle cx="860" cy="120" r="60" fill="var(--tangerine)" opacity="0.5" />
        {/* river */}
        <path d={RIVER} fill="none" stroke="var(--river)" strokeWidth="46" strokeLinecap="round" opacity="0.55" />
        <path ref={pathRef} d={RIVER} fill="none" stroke="var(--paper)" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" />
        {/* tree at origin */}
        <g transform="translate(30 90)">
          <circle r="26" fill="var(--gold)" />
          <text y="52" textAnchor="middle" className="eyebrow" fill="var(--ink)">Origin</text>
        </g>
        {len > 0 && destinations.map((d) => {
          const p = pt(d.at);
          const seen = visited.includes(d.id);
          return (
            <g key={d.id} transform={`translate(${p.x} ${p.y})`}>
              {!reduced && <circle r="18" fill="var(--tangerine)" className="animate-ripple origin-center [transform-box:fill-box]" />}
              <circle r="14" fill={seen ? "var(--ink)" : "var(--tangerine)"} stroke="var(--paper)" strokeWidth="3" />
            </g>
          );
        })}
        {len > 0 && (
          <g transform={`translate(${b.x} ${b.y}) rotate(${angle(boat)})`} aria-hidden>
            <path d="M -22 -2 L 22 -2 L 14 10 L -14 10 Z" fill="var(--crimson)" />
            <path d="M 0 -2 L 0 -30 L 18 -6 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
          </g>
        )}
      </svg>
      {/* Accessible landmark buttons positioned over the svg */}
      {len > 0 && destinations.map((d, i) => {
        const p = pt(d.at);
        const seen = visited.includes(d.id);
        const above = i % 2 === 0;
        return (
          <button
            key={d.id}
            onClick={() => sail(d.id, d.at, d.to)}
            disabled={!!moving}
            className={`group absolute -translate-x-1/2 text-left transition ${above ? "-translate-y-[130%]" : "translate-y-[30%]"} ${moving === d.id ? "scale-110" : ""}`}
            style={{ left: `${p.x / 10}%`, top: `${(p.y / 580) * 100}%` }}
            aria-label={`Sail to ${d.name}${seen ? " (visited)" : ""}`}
          >
            <span className={`block rounded-sm border-2 border-ink bg-paper px-3 py-2 shadow-[4px_4px_0_var(--ink)] transition group-hover:-rotate-2 group-hover:bg-gold group-focus-visible:bg-gold ${compact ? "" : "md:px-4 md:py-3"}`}>
              <span className="eyebrow block text-muted-foreground">{seen ? "✓ visited" : d.kicker}</span>
              <span className={`font-display block leading-none ${compact ? "text-xl" : "text-xl md:text-3xl"}`}>{d.name}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
