import { Link } from "@tanstack/react-router";
import { clickOutcomes } from "@/content/yrmis";

const SQUARE_STYLE = [
  "bg-click-cream text-click-umber",
  "bg-yellow-surface text-yellow-foreground",
  "bg-click-orange text-click-umber",
  "bg-click-olive text-click-umber",
  "bg-click-maroon text-paper",
] as const;

export function ClickFive({ className = "" }: { className?: string }) {
  return (
    <ol className={`grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5 ${className}`}>
      {clickOutcomes.map((item, index) => (
        <li key={item.name} className={index === 4 ? "sm:col-span-2 lg:col-span-1" : undefined}>
          <Link
            to="/river"
            search={{ stop: index }}
            aria-label={`${item.letter}, ${item.name}. Open this part of the river.`}
            className={`flex min-h-36 flex-col justify-between p-4 md:min-h-52 md:p-5 ${SQUARE_STYLE[index]}`}
          >
            <span aria-hidden className="font-display text-6xl leading-none md:text-7xl">
              {item.letter}
            </span>
            <span>
              <span className="font-display block text-lg leading-tight md:text-xl">{item.name}</span>
              <span className="mt-2 block text-sm leading-snug">{item.line}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
