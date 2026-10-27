import { principles } from "@/content/yrmis";

/**
 * The original five-square CLICK framework. Colors are the exact brand hexes
 * from the approved identity (see --click-* tokens in styles.css) and are
 * intentionally NOT re-themed to the site palette. Yellow always carries
 * white text.
 */
const SQUARE_STYLE = [
  { bg: "bg-click-cream", fg: "text-click-umber" },
  { bg: "bg-click-yellow", fg: "" },
  { bg: "bg-click-orange", fg: "text-click-umber" },
  { bg: "bg-click-olive", fg: "text-click-umber" },
  { bg: "bg-click-maroon", fg: "text-paper" },
] as const;

export function ClickSquares({ className = "" }: { className?: string }) {
  return (
    <ol className={`click-row ${className}`}>
      {principles.map((p, i) => (
        <li key={p.name} className={`click-square ${SQUARE_STYLE[i]!.bg} ${SQUARE_STYLE[i]!.fg}`}>
          <span aria-hidden className="click-letter">{p.letter}</span>
          <p className="click-name">{p.name}</p>
        </li>
      ))}
    </ol>
  );
}
