import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { riverWildlife } from "@/content/yrmis";
import crocodile from "@/assets/river-crocodile-refined.png";
import piranha from "@/assets/river-piranha-refined.png";
import { canLeaveCrocodile, type CrocodilePhase } from "./world";

export function CrocodileEncounter({ reduced, onContinue }: { reduced: boolean; onContinue: () => void }) {
  const [phase, setPhase] = useState<CrocodilePhase>("waiting");
  const [imageFailed, setImageFailed] = useState(false);
  const target = useRef<HTMLImageElement>(null);
  const dragging = useRef(false);
  const copy = riverWildlife.crocodile;
  useEffect(() => {
    if (phase !== "feeding") return;
    const timer = setTimeout(() => setPhase("ready"), reduced || imageFailed ? 250 : 1800);
    return () => clearTimeout(timer);
  }, [phase, reduced, imageFailed]);
  const offer = () => { if (phase === "waiting") setPhase("feeding"); };

  return (
    <section data-ui aria-label="Crocodile encounter" className="absolute inset-0 z-20" data-phase={phase}>
      <div className="crocodile-caption">
        <h2 className="font-display text-2xl italic text-shadow-river md:text-4xl">{copy.title}</h2>
        <p aria-live="polite" className="speech mx-auto mt-3">{phase === "waiting" ? copy.cue : phase === "feeding" ? copy.reacting : copy.fed}</p>
      </div>
      <div className={`crocodile-waterline ${phase === "feeding" ? "is-splashing" : ""}`} aria-hidden />
      {!imageFailed && <img ref={target} src={crocodile} alt="A crocodile rises vertically from the river toward the food" width={768} height={1024}
        onError={() => setImageFailed(true)} className={`crocodile-character ${phase === "waiting" ? "crocodile-arrives" : phase === "feeding" ? "crocodile-feeds" : "crocodile-dives"}`} />}
      {phase !== "ready" && (
        <Button variant="ghost" aria-label={copy.offer} disabled={phase === "feeding"} onClick={offer}
          onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            const r = target.current?.getBoundingClientRect();
            if (r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) offer();
          }}
          onPointerUp={() => { dragging.current = false; offer(); }}
          onPointerCancel={() => { dragging.current = false; }}
          className={`feeding-stick ${phase === "feeding" ? "is-offered" : ""}`}>
          <span className="stick-shaft" aria-hidden><span className="stick-food" /></span>
          <span className="stick-grip"><ArrowUp aria-hidden />{copy.offer}</span>
        </Button>
      )}
      <div className="crocodile-actions absolute inset-x-5 bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] flex flex-wrap items-center justify-center gap-3">
        {canLeaveCrocodile(phase) && <Button variant="ghost" onClick={onContinue} className="row-btn h-auto min-h-11"><ArrowDown />{copy.continue}</Button>}
        <Button asChild variant="ghost" className="row-btn h-auto min-h-11"><Link to="/">{copy.map}</Link></Button>
      </div>
    </section>
  );
}

/** Brief sightings, independently timed; never adds a CLICK principle or a gate. */
export function PiranhaSightings({ enabled, reduced }: { enabled: boolean; reduced: boolean }) {
  const [sighting, setSighting] = useState(0);
  const [visible, setVisible] = useState(false);
  const show = () => { setSighting((n) => n + 1); setVisible(true); };
  useEffect(() => {
    if (!enabled) { setVisible(false); return; }
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    let count = 0;
    const visit = () => {
      setSighting((n) => n + 1); setVisible(true); count++;
      timer = setTimeout(visit, 19000 + (count % 3) * 3700);
    };
    timer = setTimeout(visit, 5500);
    return () => clearTimeout(timer);
  }, [enabled, reduced]);
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), reduced ? 6000 : 2400);
    return () => clearTimeout(timer);
  }, [visible, sighting, reduced]);
  if (!enabled) return null;
  return (
    <div data-ui className="piranha-layer pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {visible && <Button key={sighting} variant="ghost" aria-label={riverWildlife.piranha.dive} onClick={() => setVisible(false)}
        className={`piranha-sighting pointer-events-auto ${sighting % 2 ? "piranha-high" : "piranha-low"} ${reduced ? "piranha-reduced" : ""}`}>
        <img src={piranha} alt="An expressive crimson and teal piranha with golden fins leaps right to left in front of the boat" width={1024} height={768} className="h-full w-full object-contain" />
      </Button>}
      <Button variant="ghost" onClick={show} className="row-btn pointer-events-auto absolute bottom-6 left-5 h-auto min-h-11" aria-label={riverWildlife.piranha.watch}>
        <Droplets aria-hidden /><span className="hidden md:inline">{riverWildlife.piranha.watch}</span>
      </Button>
    </div>
  );
}