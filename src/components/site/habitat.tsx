import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

/** Crossfades poses in place. The animal stays; only its body changes. */
export function PoseCycle({
  frames,
  alt,
  interval = 680,
  className = "",
  focus = "center",
  fit = "cover",
  frame = "aspect-[4/5]",
  index: controlled,
}: {
  frames: readonly string[];
  alt: string;
  interval?: number;
  className?: string;
  focus?: string;
  fit?: "cover" | "contain";
  frame?: string;
  index?: number;
}) {
  const [index, setIndex] = useState(0);
  const active = controlled ?? index;
  useEffect(() => {
    if (controlled != null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((n) => (n + 1) % frames.length), interval);
    return () => window.clearInterval(id);
  }, [controlled, frames.length, interval]);
  const shown = ((active % frames.length) + frames.length) % frames.length;
  const boxed = fit === "cover";
  return (
    <div className={`relative overflow-hidden ${boxed ? `${frame} rounded-2xl` : ""} ${className}`}>
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          style={{ objectPosition: focus }}
          className={`w-full transition-opacity duration-500 ${fit === "contain" ? "object-contain" : "object-cover"} ${boxed || i > 0 ? "absolute inset-0 h-full" : "relative"} ${i === shown ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}

/** Moving water drawn from color, not from a photograph. */
export function LiveWater({ tone = "day", className = "" }: { tone?: "day" | "night"; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className={tone === "night" ? "live-water live-water-night" : "live-water"} />
      <svg className="live-waves" viewBox="0 0 2880 320" preserveAspectRatio="none">
        <path className="wave wave-a" d="M0 180 Q180 90 360 180 T720 180 T1080 180 T1440 180 T1800 180 T2160 180 T2520 180 T2880 180 V320 H0 Z" />
        <path className="wave wave-b" d="M0 210 Q180 140 360 210 T720 210 T1080 210 T1440 210 T1800 210 T2160 210 T2520 210 T2880 210 V320 H0 Z" />
        <path className="wave wave-c" d="M0 250 Q220 200 440 250 T880 250 T1320 250 T1760 250 T2200 250 T2640 250 T2880 250 V320 H0 Z" />
      </svg>
      <div className="live-glint" />
    </div>
  );
}

/** Five CLICK colors, drawn across the gap and taken back as the section passes. */
export function ClickSnake() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(1);
  const grad = `snake-${useId().replace(/:/g, "")}`;
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tick = () => {
      const el = ref.current;
      if (!el) return;
      if (motion.matches) {
        setOffset(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const t = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.min(1, Math.max(0, t));
      const draw = clamped < 0.5 ? clamped / 0.5 : (1 - clamped) / 0.5;
      setOffset(1 - draw);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);
  return (
    <div ref={ref} className="pointer-events-none relative z-10 -my-8 h-28 md:h-32" aria-hidden>
      <svg viewBox="0 0 1200 140" className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={grad} x1="0" x2="1">
            <stop offset="0" stopColor="#F7EEDA" />
            <stop offset="0.25" stopColor="#FAB702" />
            <stop offset="0.5" stopColor="#E08A47" />
            <stop offset="0.75" stopColor="#A98E2B" />
            <stop offset="1" stopColor="#5E1208" />
          </linearGradient>
        </defs>
        <path
          d="M-40 78 C 140 18, 240 122, 380 64 S 640 12, 790 74 S 1020 128, 1260 42"
          fill="none"
          stroke={`url(#${grad})`}
          strokeWidth="14"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={offset}
        />
      </svg>
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
