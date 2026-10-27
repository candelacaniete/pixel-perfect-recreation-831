import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { signalIssues, siteCopy, subscribeUrl } from "@/content/yrmis";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import stage from "@/assets/sourced/portraits/yrmis-stage.webp";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";
import plants from "@/assets/sourced/portraits/yrmis-plants.jpg";
import tedx from "@/assets/sourced/logos/tedx.svg";
import vogue from "@/assets/sourced/logos/vogue.svg";
import chronicle from "@/assets/sourced/logos/sfchronicle.svg";
import east from "@/assets/sourced/logos/24east.svg";
import berkeley from "@/assets/sourced/logos/berkeleyside.png";
import kresser from "@/assets/sourced/logos/kresser.svg";
import bullet from "@/assets/sourced/logos/bulletproof.svg";

const logos = [
  [tedx, "TEDx"],
  [vogue, "Vogue"],
  [chronicle, "San Francisco Chronicle"],
  [east, "24 East"],
  [berkeley, "Berkeleyside"],
  [kresser, "Chris Kresser"],
  [bullet, "Bulletproof"],
] as const;

export function HomePage() {
  return (
    <Shell>
      <header className="chapter hero">
        <div className="grid">
          <div className="sq w2 h2 bone">
            <div className="eyebrow">{siteCopy.identity}</div>
            <h1 className="d" style={{ margin: 0 }}>
              <span className="word tight" style={{ display: "block" }}>
                New
                <br />
                territory.
              </span>
              <span className="word tight i" style={{ display: "block" }}>
                Bring what
                <br />
                you know.
              </span>
            </h1>
            <div className="controls" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/river" className="btn">
                Explore CLICK
              </Link>
              <Link to="/work" className="btn red">
                Work with me
              </Link>
              <Link to="/speaking" className="small" style={{ alignSelf: "center", textDecoration: "underline" }}>
                Speaking
              </Link>
            </div>
          </div>
          <div className="sq w2 h3">
            <img src={blazer} width={2688} height={4032} alt="Yrmis Barroeta, black and white blazer portrait from the press kit" />
          </div>
          <div className="sq olive tile" aria-hidden="true">
            <div className="t">
              <span>CLICK</span>
              <span>CLICK</span>
              <span>CLICK</span>
            </div>
          </div>
          <div className="sq gold">
            <p className="d h-m">{siteCopy.about}</p>
            <p className="d h-l">
              See sooner.
              <br />
              <em>Think sharper.</em>
            </p>
          </div>
        </div>
        <div className="proof">
          {logos.map(([src, alt]) => (
            <img key={alt} src={src} alt={alt} />
          ))}
        </div>
      </header>

      <section className="chapter" style={{ ["--rows" as string]: 2 }}>
        <div className="chap">
          <Link to="/speaking" className="num">
            03
          </Link>
          <h2 className="d">
            <Link to="/speaking">
              Speaking — <em>CLICK into Wild Innovation</em>
            </Link>
          </h2>
          <p className="lede">{siteCopy.speaking}</p>
        </div>
        <div className="grid">
          <div className="sq w2 redb">
            <div className="eyebrow">The signature keynote</div>
            <div className="word" style={{ fontSize: "clamp(40px, 5vw, 92px)" }}>
              Click
              <br />
              <span className="i">into</span> Wild
            </div>
            <Link to="/contact" search={{ interest: "Speaking" }} className="btn">
              Check availability
            </Link>
          </div>
          <div className="sq h2">
            <img src={stage} width={650} height={650} alt="Yrmis mid-story" />
          </div>
          <div className="sq bone">
            <div className="eyebrow">Audience outcomes</div>
            <p className="d h-m">Five approaches to a new problem.</p>
            <Link to="/speaking" className="btn">
              Explore the keynote
            </Link>
          </div>
        </div>
      </section>

      <section className="chapter short">
        <ClickFive />
      </section>

      <section className="chapter">
        <div className="chap">
          <Link to="/work" className="num">
            02
          </Link>
          <h2 className="d">
            <Link to="/work">
              Work with me — <em>Consulting Studio</em>
            </Link>
          </h2>
          <p className="lede">{siteCopy.studio}</p>
        </div>
        <div className="grid">
          <div className="sq w2 copper">
            <div className="eyebrow">Consulting Studio</div>
            <div className="word" style={{ fontSize: "clamp(40px, 5vw, 88px)" }}>
              Plan <span className="i">and</span>
              <br />
              conspire
            </div>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="btn">
              Discuss your project
            </Link>
          </div>
          <div className="sq bone">
            <div className="eyebrow">Founders</div>
            <p className="d h-m">From idea to next stage.</p>
            <p className="small">{siteCopy.founders}</p>
          </div>
          <div className="sq oxb">
            <div className="eyebrow">Executive teams</div>
            <p className="small">{siteCopy.executives}</p>
          </div>
        </div>
      </section>

      <section className="chapter short">
        <div className="chap">
          <Link to="/ventures" className="num">
            04
          </Link>
          <h2 className="d">
            <Link to="/ventures">
              Entrepreneurial Ventures — <em>more ways to see.</em>
            </Link>
          </h2>
          <p className="lede">{siteCopy.venturesLead}</p>
        </div>
        <div className="grid">
          <Link to="/ventures" className="sq">
            <img src={plants} alt="" />
          </Link>
          <div className="sq jungleb">
            <div className="eyebrow">Four companies</div>
            <p className="d h-m">Mission Heirloom · All Black Sheep · (hĕm) · YRMIS</p>
          </div>
          <Link to="/ventures" className="sq w2 redb">
            <p className="d h-l">Different ventures. More ways to see.</p>
            <span className="btn">Explore the ventures</span>
          </Link>
        </div>
      </section>

      <section className="chapter">
        <div className="chap">
          <Link to="/signals" className="num">
            06
          </Link>
          <h2 className="d">
            <Link to="/signals">
              1•1•1 Signals — <em>where tech meets human performance.</em>
            </Link>
          </h2>
          <p className="lede">{siteCopy.signalsOffer}</p>
        </div>
        <div className="grid">
          <div className="sq w2 redb">
            <div className="eyebrow">The newsletter</div>
            <p className="d h-l">
              See sooner.
              <br />
              <em>Think sharper.</em>
            </p>
            <a className="btn" href={subscribeUrl} target="_blank" rel="noreferrer">
              Subscribe free
            </a>
          </div>
          <div className="sq">
            <img src={glasses} width={212} height={258} alt="Yrmis wearing glasses, newsletter portrait" />
          </div>
          <div className="sq bone">
            <div className="eyebrow">Recent issues</div>
            <ul className="issues">
              {signalIssues.map((issue) => (
                <li key={issue.href}>
                  <a href={issue.href} target="_blank" rel="noreferrer">
                    {issue.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="chapter short">
        <div className="grid">
          <div className="sq w3 oxb">
            <div className="eyebrow">Start a conversation</div>
            <p className="d h-l">
              Let’s make
              <br />
              <em>things happen.</em>
            </p>
            <p className="small">{siteCopy.conversation}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/contact" search={{ interest: "Speaking" }} className="btn">
                Event inquiry
              </Link>
              <Link to="/contact" search={{ interest: "Consulting Studio" }} className="btn">
                Project inquiry
              </Link>
            </div>
          </div>
          <Link to="/world" className="sq gold">
            <div className="eyebrow">Optional</div>
            <p className="d h-m">Explore Yrmis World</p>
            <span className="small">Speaking, the river, and a few unlikely connections.</span>
          </Link>
        </div>
      </section>
    </Shell>
  );
}
