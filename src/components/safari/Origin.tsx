import { useEffect, useRef, useState } from "react";
import originImg from "@/assets/origin.jpg";
import { origin } from "@/content/yrmis";
import { useReducedMotion } from "./visited";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/** Scroll-driven opening: a flower drops from the araguaney into the river and drifts downstream. */
export function Origin() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        setP(clamp(-r.top / (r.height - window.innerHeight)));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  const fall = seg(p, 0.05, 0.4);
  const drift = seg(p, 0.4, 0.85);
  const fade = seg(p, 0.78, 1);
  // flower path: from canopy (66%,32%) to river (58%,74%), then downstream to (22%,70%)
  const fx = 66 - fall * 8 - drift * 36 + Math.sin(fall * 9) * 3 * (1 - fall);
  const fy = 32 + fall * 42 - drift * 4 + Math.sin(drift * 12) * 0.8;
  const rot = fall * 540 + drift * 60;
  const zoom = reduced ? 1 : 1 + drift * 0.5;
  const camX = reduced ? 0 : drift * 14;

  return (
    <section ref={ref} className="relative h-[320vh] bg-night" aria-label="The origin">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 origin-[40%_70%] will-change-transform" style={{ transform: `scale(${zoom}) translateX(${camX}%)` }}>
          <img src={originImg} alt="A golden araguaney tree on the Venezuelan Llanos at blue hour, reflected in a river" width={1920} height={1088} className="h-full w-full object-cover object-[65%_center]" />
          {/* ripple where the flower lands */}
          {fall >= 1 && drift < 0.3 && !reduced && (
            <span className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold animate-ripple" style={{ left: "58%", top: "74%" }} />
          )}
          <svg aria-hidden className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg md:h-14 md:w-14" viewBox="-20 -20 40 40" style={{ left: `${fx}%`, top: `${fy}%`, transform: `translate(-50%,-50%) rotate(${rot}deg)` }}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-9" rx="6" ry="10" fill="var(--gold)" transform={`rotate(${a})`} />
            ))}
            <circle r="4" fill="var(--tangerine)" />
          </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-transparent to-night/60" />

        <div className="relative flex h-full flex-col justify-between px-5 pb-10 pt-24 text-paper md:px-12">
          <div style={{ opacity: 1 - seg(p, 0.1, 0.3) }}>
            <p className="eyebrow text-gold">An editorial safari · Chapter 0 · The Llanos</p>
            <h1 className="display-xl mt-4 max-w-5xl">
              Click into <em className="text-gold">your wild.</em>
            </h1>
          </div>
          <p className="max-w-md text-lg leading-snug md:text-xl" style={{ opacity: seg(p, 0.35, 0.5) * (1 - seg(p, 0.7, 0.8)) }}>
            “{origin}”
          </p>
          <p className="eyebrow animate-pulse" style={{ opacity: 1 - seg(p, 0, 0.08) }}>Scroll — follow the flower ↓</p>
        </div>
        <div className="absolute inset-0 bg-paper" style={{ opacity: fade }} aria-hidden />
      </div>
    </section>
  );
}
