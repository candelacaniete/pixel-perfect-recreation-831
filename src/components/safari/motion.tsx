// Shared scroll-motion system for the editorial pages. One hook writes a
// --p custom property (0 → 1 as an element travels through the viewport);
// CSS utilities in styles.css turn --p into parallax, crossings, scale shifts
// and reveals. Reduced motion pins --p at 0.5 and disables the transforms.
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import birdImg from "@/assets/sp-bird.webp";

const tracked = new Set<HTMLElement>();
let raf = 0;
function update() {
  raf = 0;
  const vh = window.innerHeight;
  for (const el of tracked) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -vh || r.top > vh * 2) continue;
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    el.style.setProperty("--p", p.toFixed(4));
    el.classList.toggle("is-in", r.top < vh * 0.85 && r.bottom > vh * 0.1);
  }
}
const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

export function useScrollP<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "0.5"); el.classList.add("is-in"); return;
    }
    tracked.add(el);
    if (tracked.size === 1) { window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule); }
    schedule();
    return () => {
      tracked.delete(el);
      if (!tracked.size) { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); }
    };
  }, []);
  return ref;
}

/** A section whose children can react to its scroll progress. */
export function Scene({ as: Tag = "section", className = "", style, children, ...rest }: {
  as?: "section" | "div" | "header"; className?: string; style?: CSSProperties; children: ReactNode; "aria-label"?: string; "aria-labelledby"?: string; id?: string;
}) {
  const ref = useScrollP<HTMLElement>();
  return <Tag ref={ref as never} className={`scene ${className}`} style={style} {...rest}>{children}</Tag>;
}

/** A bird that crosses the viewport as its scene scrolls past. */
export function CrossingBird({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <img src={birdImg} alt="" aria-hidden width={560} height={560} loading="lazy"
      className={`cross-bird pointer-events-none absolute z-30 w-20 md:w-32 ${flip ? "cross-bird-rtl" : ""} ${className}`} />
  );
}

/** An anaconda-like path that draws itself through a composition as you scroll. */
export function SerpentPath({ className = "", tone = "var(--gold)" }: { className?: string; tone?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1200 400" preserveAspectRatio="none" className={`pointer-events-none absolute ${className}`}>
      <path className="serpent" pathLength={1} d="M-20 300 C 160 80, 320 380, 520 210 S 860 40, 980 220 S 1160 360, 1240 120"
        fill="none" stroke={tone} strokeWidth="26" strokeLinecap="round" />
      <path className="serpent" pathLength={1} d="M-20 300 C 160 80, 320 380, 520 210 S 860 40, 980 220 S 1160 360, 1240 120"
        fill="none" stroke="var(--ink)" strokeWidth="4" strokeDasharray="0.012 0.03" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
