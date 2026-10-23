import { useRef, useState } from "react";
import base from "@/assets/lens-base.jpg";
import vivid from "@/assets/lens-vivid.jpg";

/** Circular lens that follows pointer (desktop) or drag (touch) to reveal a second image layer. */
export function LensReveal({ onReveal }: { onReveal?: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const [full, setFull] = useState(false);
  const travelled = useRef(0);

  const move = (cx: number, cy: number) => {
    const r = box.current?.getBoundingClientRect(); if (!r) return;
    const x = ((cx - r.left) / r.width) * 100, y = ((cy - r.top) / r.height) * 100;
    travelled.current += Math.abs(x - pos.x) + Math.abs(y - pos.y);
    if (travelled.current > 120) onReveal?.();
    setPos({ x, y }); setActive(true);
  };

  const radius = full ? 150 : active ? 22 : 14;

  return (
    <div className="space-y-3">
      <div
        ref={box}
        className="relative aspect-square w-full cursor-none touch-none select-none overflow-hidden rounded-sm border-2 border-paper/30"
        onPointerMove={(e) => move(e.clientX, e.clientY)}
        onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX, e.clientY); }}
        onPointerLeave={() => setActive(false)}
        tabIndex={0}
        role="slider"
        aria-label="Lens position. Use arrow keys to move the lens."
        aria-valuenow={Math.round(pos.x)}
        onKeyDown={(e) => {
          const d = 6; const m: Record<string, [number, number]> = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, -d], ArrowDown: [0, d] };
          if (m[e.key]) { e.preventDefault(); setActive(true); onReveal?.(); setPos((p) => ({ x: Math.min(100, Math.max(0, p.x + m[e.key][0])), y: Math.min(100, Math.max(0, p.y + m[e.key][1])) })); }
        }}
      >
        <img src={base} alt="A muted, camouflaged snake coiled in dry grass" width={1200} height={1200} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <img
          src={vivid} alt="" aria-hidden width={1024} height={1024} loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-[clip-path] duration-500 ease-out"
          style={{ clipPath: `circle(${radius}% at ${pos.x}% ${pos.y}%)` }}
        />
        <span aria-hidden className="pointer-events-none absolute rounded-full border-4 border-paper shadow-[0_0_0_2px_var(--ink),0_20px_40px_-10px_oklch(0_0_0/50%)] transition-[width,height] duration-500"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: full ? 0 : `${radius * 2}%`, height: full ? 0 : `${radius * 2}%`, transform: "translate(-50%,-50%)" }} />
      </div>
      <button onClick={() => { setFull((f) => !f); onReveal?.(); }} className="pill border-2 border-paper text-paper">
        {full ? "Back to the label" : "Drop the label entirely"}
      </button>
    </div>
  );
}
