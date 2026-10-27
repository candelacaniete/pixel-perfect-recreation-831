import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { siteCopy, socials } from "@/content/yrmis";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import plants from "@/assets/sourced/portraits/yrmis-plants.jpg";
import red from "@/assets/sourced/portraits/yrmis-red.jpg";

const instagram = socials.find((item) => item.name === "Instagram");

export function AboutPage() {
  return (
    <Shell page>
      <main className="swrap">
        <header className="phead">
          <div>
            <div className="eyebrow red">About</div>
            <h1 className="d">
              New territory.
              <br />
              <em>Bring what you know.</em>
            </h1>
          </div>
          <div className="side">
            <p className="lede">{siteCopy.about}</p>
            <div className="actions">
              <Link to="/work" className="btn">
                Work with me
              </Link>
              <Link to="/speaking" className="btn red">
                Speaking
              </Link>
            </div>
          </div>
        </header>
        <div className="block">
          <div className="media">
            <img src={blazer} width={2688} height={4032} alt="Yrmis Barroeta in a blazer, original press-kit portrait" />
          </div>
          <div className="story">
            <div className="eyebrow">My story</div>
            {siteCopy.story.map((section) => (
              <section key={section.title}>
                <h2 className="d" style={{ fontSize: "clamp(28px, 3vw, 44px)", margin: "28px 0 8px" }}>
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
        <div className="gallery" style={{ marginTop: 28 }}>
          <figure>
            <img src={plants} width={1400} height={1400} alt="Yrmis laughing among green leaves, original press-kit photograph" />
            <figcaption>Original press-kit photograph</figcaption>
          </figure>
          <figure>
            <img src={red} width={1440} height={1800} alt="Yrmis in red tights and red heels, original press-kit photograph" />
            <figcaption>Original press-kit photograph</figcaption>
          </figure>
        </div>
        <div className="sband">
          <div>
            <div className="eyebrow">All Black Sheep · Instagram</div>
            <p className="big">
              Find me <em>on Instagram.</em>
            </p>
            <p className="small">Direct profile link. No simulated or automatically updating feed.</p>
          </div>
          {instagram && (
            <a className="btn bone" href={instagram.href} target="_blank" rel="noreferrer">
              @allblacksheep_club ↗
            </a>
          )}
        </div>
        <div className="actions" style={{ margin: "28px 0 8px" }}>
          <Link to="/ventures" className="btn">
            Entrepreneurial Ventures
          </Link>
          <Link to="/press" className="btn">
            Press kit
          </Link>
        </div>
      </main>
    </Shell>
  );
}
