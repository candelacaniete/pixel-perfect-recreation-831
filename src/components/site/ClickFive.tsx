import { Link } from "@tanstack/react-router";
import { clickOutcomes } from "@/content/yrmis";

export function ClickFive() {
  return (
    <div className="ed-click">
      {clickOutcomes.map((item, index) => (
        <Link
          key={item.name}
          to="/river"
          search={{ stop: index }}
          className={`ed-square ed-c${index}`}
          aria-label={`${item.letter}, ${item.name}. Open this part of the river.`}
        >
          <span className="ed-letter" aria-hidden="true">
            {item.letter}
          </span>
          <div>
            <h3>{item.name}</h3>
            <p>{item.line}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
