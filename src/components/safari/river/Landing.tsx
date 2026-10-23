import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import territory from "@/assets/territory.jpg";
import { journey } from "../journeyStore";
import { capybaraLaw } from "@/content/yrmis";

const spots = [
  { to: "/studio", name: "The Studio", note: "Plan and conspire", x: 67, y: 52 },
  { to: "/ventures", name: "Ventures", note: "Four companies, four industries", x: 69, y: 15 },
  { to: "/signals", name: "1•1•1 Signals", note: "Field notes, every other week", x: 86, y: 62 },
  { to: "/work", name: "Work with me", note: "Through the tall arch", x: 88, y: 30 },
] as const;

/** The boat touches the shore: the river world gives way to the surreal landing territory. */
export function Landing() {
  const scroller = useRef<HTMLDivElement>(null);
  const [gum, setGum] = useState(0);
  useEffect(() => {
    const el = scroller.current; if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);
  return (
    <div data-ui ref={scroller} className="absolute inset-0 z-30 touch-pan-x overflow-x-auto overflow-y-hidden bg-scarlet animate-in fade-in duration-[1500ms]">
      <div className="relative h-full" style={{ width: "max(100vw, 177.8vh)" }}>
        <img src={territory} alt="A surreal scarlet shore: a giant red flower, floating stone spheres, vermilion arches, and a capybara blowing a golden bubble" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <button onClick={() => journey.requestJump(0)} className="landmark" style={{ left: "15%", top: "22%" }}>
          <span className="landmark-orb" /><span className="landmark-label">CLICK<em>Meet the five guardians again</em></span>
        </button>
        {spots.map((s) => (
          <Link key={s.to} to={s.to} className="landmark" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            <span className="landmark-orb" /><span className="landmark-label">{s.name}<em>{s.note}</em></span>
          </Link>
        ))}
        <button onClick={() => setGum((g) => g + 1)} className="absolute rounded-full" style={{ left: "38%", top: "30%", width: "14%", aspectRatio: "1" }} aria-label="Poke the capybara's bubble" />
        {gum > 0 && <p role="status" className="speech absolute" style={{ left: "26%", top: "64%", maxWidth: 320 }}>{gum % 2 ? capybaraLaw : "Pop. It starts another one, unbothered."}</p>}
        <p className="speech absolute left-[44%] top-[8%] -translate-x-1/2 text-center">You've reached the shore. Wander.</p>
      </div>
      <button onClick={() => journey.requestJump(0)} className="row-btn fixed bottom-6 left-5">↺ Back on the water</button>
    </div>
  );
}
