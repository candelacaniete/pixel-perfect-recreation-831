import { Link } from "@tanstack/react-router";
import { Chapter, Shell } from "@/components/site/Shell";
import { siteCopy, socials } from "@/content/yrmis";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import plants from "@/assets/sourced/portraits/yrmis-plants.jpg";
import red from "@/assets/sourced/portraits/yrmis-red.jpg";

const instagram = socials.find((item) => item.name === "Instagram");

export function AboutPage() {
  return (
    <Shell>
      <Chapter n="01" title="About" to="/about" />
      <div className="ed-grid">
        <div className="ed-block ed-photo ed-w2" style={{ minHeight: 460 }}>
          <img src={blazer} width={2688} height={4032} alt="Yrmis Barroeta in a blazer, original press-kit portrait" />
        </div>
        <div className="ed-block ed-red ed-w2">
          <p className="ed-eyebrow">{siteCopy.identity}</p>
          <h1>
            New territory.
            <br />
            <em>Bring what you know.</em>
          </h1>
          <p>{siteCopy.about}</p>
          <div className="ed-controls">
            <Link to="/work" className="ed-control">
              Work with me
            </Link>
            <Link to="/speaking" className="ed-control">
              Speaking
            </Link>
          </div>
        </div>
      </div>

      <div className="ed-story">
        <p className="ed-eyebrow">My story</p>
        <article>
          {siteCopy.story.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </div>

      <div className="ed-gallery">
        <figure>
          <img src={plants} width={1400} height={1400} alt="Yrmis laughing among green leaves, original press-kit photograph" />
          <figcaption>Original press-kit photograph</figcaption>
        </figure>
        <figure>
          <img src={red} width={1440} height={1800} alt="Yrmis in red tights and red heels, original press-kit photograph" />
          <figcaption>Original press-kit photograph</figcaption>
        </figure>
      </div>

      <section className="ed-band">
        <div>
          <p className="ed-eyebrow">All Black Sheep · Instagram</p>
          <h2>
            Find me
            <br />
            <em>on Instagram.</em>
          </h2>
        </div>
        <div>
          {instagram && (
            <a className="ed-control" href={instagram.href} target="_blank" rel="noreferrer">
              @allblacksheep_club ↗
            </a>
          )}
          <p>Direct profile link. No simulated or automatically updating feed.</p>
        </div>
      </section>

      <div className="ed-controls">
        <Link to="/ventures" className="ed-control">
          Entrepreneurial Ventures
        </Link>
        <Link to="/work" className="ed-control">
          Work with me
        </Link>
        <Link to="/press" className="ed-control">
          Press kit
        </Link>
      </div>
    </Shell>
  );
}
