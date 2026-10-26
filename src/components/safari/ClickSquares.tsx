import { principles } from "@/content/yrmis";

/**
 * The original five-square CLICK framework. Colors are the exact brand hexes
 * from the approved identity (see --click-* tokens in styles.css) and are
 * intentionally NOT re-themed to the site palette. Yellow always carries
 * white text.
 */
const SQUARE_STYLE = [
  { bg: "bg-click-cream", fg: "text-click-umber" },
  { bg: "bg-click-yellow", fg: "text-paper" },
  { bg: "bg-click-orange", fg: "text-click-umber" },
  { bg: "bg-click-olive", fg: "text-click-umber" },
  { bg: "bg-click-maroon", fg: "text-paper" },
] as const;

export function ClickSquares({ className = "" }: { className?: string }) {
  return (
    <ol className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 ${className}`}>
      {principles.map((p, i) => (
        <li key={p.name} className={`flex min-h-40 flex-col justify-between p-4 md:min-h-56 md:p-5 ${SQUARE_STYLE[i]!.bg} ${SQUARE_STYLE[i]!.fg} ${i === 4 ? "max-lg:col-span-2 max-lg:sm:col-span-1" : ""}`}>
          <span aria-hidden className="font-display text-5xl leading-none md:text-7xl">{p.letter}</span>
          <div className="mt-6">
            <p className="font-display text-lg leading-tight md:text-xl">{p.name}</p>
            <p className="mt-2 text-sm leading-snug opacity-80">{p.tagline}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
