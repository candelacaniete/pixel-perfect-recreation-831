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
  as?: "section" | "div" | "header"; className?: string; style?: CSSProperties; children: ReactNode; "aria-label"?: string; "aria-labelledby"?: string; id?: string; "data-guide"?: string;
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
      <path pathLength={1} d="M-20 300 C 160 80, 320 380, 520 210 S 860 40, 980 220 S 1160 360, 1240 120"
        fill="none" stroke="var(--ink)" strokeWidth="4" strokeDasharray="0.012 0.03" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** The scarlet ibis that guides a visitor down one page, one section at a time. */
export function GuideBird({ stops }: { stops: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let f = 0;
    const tick = () => {
      f = 0;
      const vh = window.innerHeight;
      let label = stops[0] ?? "";
      document.querySelectorAll<HTMLElement>("[data-guide]").forEach((s) => { if (s.getBoundingClientRect().top < vh * 0.55) label = s.dataset["guide"] ?? label; });
      const max = document.documentElement.scrollHeight - vh;
      const k = max > 0 ? window.scrollY / max : 0;
      el.style.setProperty("--k", reduced ? "0" : k.toFixed(4));
      const t = el.querySelector("[data-label]"); if (t && t.textContent !== label) t.textContent = label;
    };
    const on = () => { if (!f) f = requestAnimationFrame(tick); };
    tick(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [stops]);
  return (
    <div ref={ref} aria-hidden className="guide-bird pointer-events-none fixed right-2 z-30 flex flex-col items-end md:right-6">
      <img src={birdImg} alt="" width={560} height={560} className="w-14 md:w-24" />
      <span data-label className="eyebrow mt-1 rounded-full bg-ink/80 px-2 py-1 text-[0.6rem] text-gold" />
    </div>
  );
}

/** Hanging lianas that sway and part as the scene scrolls, framing the headline. */
export function Lianas({ className = "", count = 7 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-between ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const len = 30 + ((i * 37) % 45);
        return (
          <svg key={i} viewBox="0 0 40 400" preserveAspectRatio="none" className="liana" style={{ height: `${len}vh`, width: "2.5rem", animationDelay: `${-i * 0.9}s`, ["--side" as string]: i < count / 2 ? -1 : 1 }}>
            <path d="M20 0 C 8 80, 32 160, 18 240 S 26 360, 20 400" fill="none" stroke="var(--moss)" strokeWidth="5" strokeLinecap="round" />
            {[60, 140, 220, 300].map((y, j) => (
              <ellipse key={y} cx={j % 2 ? 30 : 10} cy={y} rx="9" ry="4" fill={j === 2 && i % 3 === 0 ? "var(--scarlet)" : "var(--moss)"} transform={`rotate(${j % 2 ? 30 : -30} ${j % 2 ? 30 : 10} ${y})`} />
            ))}
          </svg>
        );
      })}
    </div>
  );
}
