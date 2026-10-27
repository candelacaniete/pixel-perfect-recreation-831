import { Link } from "@tanstack/react-router";
import { clickOutcomes } from "@/content/yrmis";

const tones = ["bone", "gold", "caramel", "olive", "oxb"] as const;

export function ClickFive() {
  return (
    <div className="grid five">
      {clickOutcomes.map((item, index) => (
        <Link
          key={item.name}
          to="/river"
          search={{ stop: index }}
          className={`sq ${tones[index]}`}
          aria-label={`${item.letter}, ${item.name}. Open this part of the river.`}
        >
          <span className="ltr" aria-hidden="true">
            {item.letter}
          </span>
          <div>
            <div className="eyebrow">{item.name}</div>
            <p className="small">{item.line}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
