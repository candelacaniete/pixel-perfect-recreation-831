import { useEffect, useId, useState, type CSSProperties } from "react";

/** Crossfades poses in place. The animal stays; only its body changes. */
export function PoseCycle({ frames, alt, interval = 680, className = "" }: { frames: readonly string[]; alt: string; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((n) => (n + 1) % frames.length), interval);
    return () => window.clearInterval(id);
  }, [frames.length, interval]);
  return (
    <div className={`relative ${className}`}>
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          className={`w-full object-cover transition-opacity duration-500 ${i === 0 ? "relative" : "absolute inset-0 h-full"} ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}

/** A photograph of water, displaced so the surface ripples. */
export function WaterSurface({ src, position = "center 82%", className = "" }: { src: string; position?: string; className?: string }) {
  const id = `ripple-${useId().replace(/:/g, "")}`;
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const plate: CSSProperties = { objectPosition: position, filter: `url(#${id})` };
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg className="absolute h-0 w-0">
        <filter id={id} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.009 0.035" numOctaves="2" seed="4" result="noise">
            {reduced ? null : <animate attributeName="baseFrequency" dur="16s" values="0.008 0.028;0.015 0.05;0.008 0.028" repeatCount="indefinite" />}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={reduced ? 0 : 16} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" style={plate} />
    </div>
  );
}
