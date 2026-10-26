import { Link } from "@tanstack/react-router";
import { Chapter, Shell } from "@/components/site/Shell";
import { siteCopy, ventureStories } from "@/content/yrmis";
import greenhouse from "@/assets/sourced/ventures/mh-greenhouse.jpg";
import family from "@/assets/sourced/ventures/abs-family.jpg";
import hem from "@/assets/sourced/ventures/hem-store.jpg";
import pants from "@/assets/sourced/ventures/yrmis-pants.jpg";

const photos = {
  greenhouse,
  family,
  hem,
  pants,
} as const;

const tones = ["ed-red", "ed-maroon", "ed-pink", "ed-copper"] as const;

export function VenturesPage() {
  return (
    <Shell>
      <Chapter n="04" title="Entrepreneurial Ventures" to="/ventures" />
      <div className="ed-block ed-maroon">
        <h1>
          Different ventures.
          <br />
          <em>More ways to see.</em>
        </h1>
        <p>{siteCopy.venturesLead}</p>
      </div>
      <div className="ed-grid ed-space">
        {ventureStories.map((venture, index) => (
          <article key={venture.name} className={`ed-block ${tones[index]}`}>
            <h3>{venture.name}</h3>
            <p>{venture.place}</p>
          </article>
        ))}
      </div>
      <div className="ed-grid ed-space">
        {ventureStories.map((venture) => (
          <article key={venture.name} className="ed-block ed-bone ed-w2 ed-venture">
            <img src={photos[venture.photo]} alt="" width={1400} height={1050} />
            <h3>{venture.name}</h3>
            <p>{venture.body}</p>
          </article>
        ))}
      </div>
      <div className="ed-controls">
        <Link to="/work" className="ed-control">
          Work with me
        </Link>
      </div>
    </Shell>
  );
}
