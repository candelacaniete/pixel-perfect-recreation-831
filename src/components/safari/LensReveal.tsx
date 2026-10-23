import { useRef, useState } from "react";
import base from "@/assets/lens-base.jpg";
import vivid from "@/assets/lens-vivid.jpg";

/** Two synchronized layers; a circular lens follows pointer / touch and reveals the transformed world. */
export function LensReveal({ onReveal, fill = false }: { onReveal?: () => void; fill?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 55 });
  const travelled = useRef(0);
  const reveal = () => { if (travelled.current > 90) onReveal?.(); };

  const move = (cx: number, cy: number) => {
    const r = box.current?.getBoundingClientRect(); if (!r) return;
    const x = ((cx - r.left) / r.width) * 100, y = ((cy - r.top) / r.height) * 100;
    travelled.current += Math.abs(x - pos.x) + Math.abs(y - pos.y);
    reveal();
    setPos({ x, y });
  };
  const r = fill ? "min(22vmin, 180px)" : "22%";

  return (
    <div
      ref={box}
      className={`relative cursor-none touch-none select-none overflow-hidden ${fill ? "h-full w-full" : "aspect-square w-full"}`}
      onPointerMove={(e) => move(e.clientX, e.clientY)}
      onPointerDown={(e) => move(e.clientX, e.clientY)}
      tabIndex={0}
      role="application"
      aria-label="Magic lens. Move the pointer, drag, or use arrow keys to look through it."
      onKeyDown={(e) => {
        const d = 5; const m: Record<string, [number, number]> = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, -d], ArrowDown: [0, d] };
        const v = m[e.key];
        if (v) { e.preventDefault(); travelled.current += 20; reveal(); setPos((p) => ({ x: Math.min(100, Math.max(0, p.x + v[0])), y: Math.min(100, Math.max(0, p.y + v[1])) })); }
      }}
    >
      <img src={base} alt="A muted, camouflaged anaconda coiled among roots and dry grass" width={1200} height={1200} className="absolute inset-0 h-full w-full object-cover" />
      <img src={vivid} alt="" aria-hidden width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `circle(${r} at ${pos.x}% ${pos.y}%)` }} />
      <span aria-hidden className="lens-ring pointer-events-none absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `calc(${r} * 2)`, height: `calc(${r} * 2)` }} />
    </div>
  );
}
