import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { siteCopy, ventureStories } from "@/content/yrmis";
import greenhouse from "@/assets/sourced/ventures/mh-greenhouse.jpg";
import family from "@/assets/sourced/ventures/abs-family.jpg";
import hem from "@/assets/sourced/ventures/hem-store.jpg";
import pants from "@/assets/sourced/ventures/yrmis-pants.jpg";

const photos = { greenhouse, family, hem, pants } as const;

export function VenturesPage() {
  return (
    <Shell page>
      <main className="swrap">
        <header className="phead">
          <div>
            <div className="eyebrow red">Entrepreneurial Ventures</div>
            <h1 className="d">
              Different ventures.
              <br />
              <em>More ways to see.</em>
            </h1>
          </div>
          <div className="side">
            <p className="lede">{siteCopy.venturesLead}</p>
            <Link to="/work" className="btn red">
              Work with me
            </Link>
          </div>
        </header>
        {ventureStories.map((venture, index) => (
          <div key={venture.name}>
            <div className="srule">
              <span className="num">0{index + 1}</span>
              <span className="eyebrow">{venture.place}</span>
            </div>
            <section className={index % 2 ? "block flip" : "block"}>
              <div>
                <h2 className="d">{venture.name}</h2>
                <p>{venture.body}</p>
              </div>
              <div className="media">
                <img src={photos[venture.photo]} alt="" />
              </div>
            </section>
          </div>
        ))}
      </main>
    </Shell>
  );
}
