import { useState } from "react";
import { Link } from "@tanstack/react-router";
import territory from "@/assets/territory.jpg";
import { capybaraLaw } from "@/content/yrmis";

const landmarks = [
  { to: "/click", name: "CLICK", note: "The giant flower", x: 14, y: 22 },
  { to: "/studio", name: "Studio", note: "The far arch", x: 67, y: 58 },
  { to: "/ventures", name: "Ventures", note: "The floating stones", x: 70, y: 18 },
  { to: "/signals", name: "Signals", note: "The great sphere", x: 86, y: 66 },
  { to: "/work", name: "Work with me", note: "The tall arch", x: 89, y: 22 },
] as const;

/** The landing territory: a surreal scene with clickable landmarks and one small secret. */
export function Territory() {
  const [pop, setPop] = useState(0);
  return (
    <section className="relative bg-gum text-ink" aria-labelledby="territory-title">
      <div className="px-5 pb-6 pt-16 md:px-12">
        <p className="eyebrow">Chapter II · Landfall</p>
        <h2 id="territory-title" className="display-lg mt-3 max-w-4xl">The boat touches land. <em>Nothing here is literal.</em></h2>
      </div>
      <div className="relative mx-auto max-w-[1600px] overflow-hidden">
        <img src={territory} alt="A surreal pink savanna with a giant flower, floating stone spheres, pink arches and a capybara blowing pink bubble gum" width={1920} height={1088} loading="lazy" className="w-full" />
        <button
          onClick={() => setPop((n) => n + 1)}
          className="group absolute rounded-full focus-visible:outline-paper"
          style={{ left: "38%", top: "30%", width: "14%", aspectRatio: "1" }}
          aria-label="Poke the bubble"
        >
          <span className={`block h-full w-full rounded-full ${pop % 3 === 2 ? "" : "animate-bubble"}`} />
        </button>
        {pop > 0 && (
          <p role="status" className="absolute bottom-4 left-4 max-w-xs rounded-sm bg-paper p-3 text-sm shadow-[4px_4px_0_var(--ink)] md:bottom-8 md:left-8">
            {pop % 3 === 2 ? "Pop. The capybara starts again — unbothered." : capybaraLaw}
          </p>
        )}
        <ul className="absolute inset-0 hidden md:block">
          {landmarks.map((l) => (
            <li key={l.to} className="absolute" style={{ left: `${l.x}%`, top: `${l.y}%` }}>
              <Link to={l.to} className="group block -translate-x-1/2">
                <span className="mx-auto mb-1 block h-3 w-3 rounded-full bg-paper ring-4 ring-ink/30 transition group-hover:scale-150" />
                <span className="block whitespace-nowrap rounded-sm border-2 border-ink bg-paper px-3 py-1.5 text-center shadow-[3px_3px_0_var(--ink)] transition group-hover:-rotate-3 group-hover:bg-gold">
                  <span className="font-display block text-xl leading-none">{l.name}</span>
                  <span className="eyebrow text-muted-foreground">{l.note}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className="grid grid-cols-2 gap-2 p-5 md:hidden">
        {landmarks.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="block rounded-sm border-2 border-ink bg-paper p-3 active:bg-gold">
              <span className="font-display block text-xl">{l.name}</span>
              <span className="eyebrow text-muted-foreground">{l.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
