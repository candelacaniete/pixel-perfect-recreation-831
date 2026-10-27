import { Link } from "@tanstack/react-router";
import { clickOutcomes } from "@/content/yrmis";

const SQUARE_STYLE = [
  "bg-click-cream text-click-umber",
  "bg-click-yellow",
  "bg-click-orange text-click-umber",
  "bg-click-olive text-click-umber",
  "bg-click-maroon text-paper",
] as const;

export function ClickFive({ className = "" }: { className?: string }) {
  return (
    <ol className={`click-row ${className}`}>
      {clickOutcomes.map((item, index) => (
        <li key={item.name}>
          <Link
            to="/river"
            search={{ stop: index }}
            aria-label={`${item.letter}, ${item.name}. Open this part of the river.`}
            className={`click-square ${SQUARE_STYLE[index]}`}
          >
            <span aria-hidden className="click-letter">{item.letter}</span>
            <span className="click-name">{item.name}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
