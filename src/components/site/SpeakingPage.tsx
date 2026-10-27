import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { clickOutcomes, siteCopy } from "@/content/yrmis";
import stage from "@/assets/sourced/portraits/yrmis-stage.webp";

export function SpeakingPage() {
  return (
    <Shell page>
      <main className="swrap">
        <header className="phead">
          <div>
            <div className="eyebrow red">The signature keynote</div>
            <h1 className="d">
              CLICK into
              <br />
              <em>Wild Innovation</em>
            </h1>
          </div>
          <div className="side">
            <p className="lede">{siteCopy.speaking}</p>
            <div className="actions">
              <Link to="/contact" search={{ interest: "Speaking" }} className="btn red">
                Check availability
              </Link>
              <a className="btn" href="#audience-outcomes">
                Audience outcomes
              </a>
            </div>
          </div>
        </header>
        <div className="block">
          <div className="media">
            <img src={stage} width={650} height={650} alt="Yrmis mid-story" />
          </div>
          <div>
            <div className="eyebrow">Who it’s for</div>
            <p className="lede">{siteCopy.speaking}</p>
            <div className="eyebrow" style={{ marginTop: 24 }}>
              Walking out
            </div>
            <h2 className="d" style={{ fontSize: "clamp(28px, 3vw, 48px)" }}>
              {siteCopy.walkingOut}
            </h2>
          </div>
        </div>
        <div className="srule">
          <span className="num">CLICK</span>
          <span className="eyebrow">Five colored squares</span>
        </div>
        <div style={{ paddingTop: 18 }}>
          <ClickFive />
        </div>
        <div className="actions" style={{ marginTop: 16 }}>
          <Link to="/river" className="btn">
            Experience CLICK
          </Link>
        </div>
        <section id="audience-outcomes">
          <div className="srule">
            <span className="num">05</span>
            <span className="eyebrow">Audience outcomes</span>
          </div>
          <div className="cols">
            {clickOutcomes.map((item) => (
              <div key={item.name}>
                <h3>
                  {item.letter} · {item.name}
                </h3>
                <p>{item.line}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="cols">
          <div className="slot">
            <div className="eyebrow">Placement · asset to add</div>
            <h3>Watch Yrmis speak</h3>
            <p>Place an approved stage clip here, with captions, a clear play control and a mobile poster frame.</p>
          </div>
          <div className="slot">
            <div className="eyebrow">Placement · asset to add</div>
            <h3>Testimonials & credentials</h3>
            <p>Place approved quotations with names and roles here. TEDx is distinct from the CLICK keynote.</p>
          </div>
          <div className="slot">
            <div className="eyebrow">Placement · asset to add</div>
            <h3>Formats</h3>
            <p>Confirm keynote duration, virtual or in-person delivery, and workshop or offsite formats. These are review slots, not confirmed packages.</p>
          </div>
        </div>
        <div className="sband red">
          <div>
            <div className="eyebrow">Event inquiry</div>
            <p className="big">
              Bring CLICK <em>to your team.</em>
            </p>
            <p>Tell me about your audience, date, and location.</p>
          </div>
          <div className="actions">
            <Link to="/contact" search={{ interest: "Speaking" }} className="btn bone">
              Inquire about your event
            </Link>
            <a className="btn" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">
              Speaker materials ↗
            </a>
          </div>
        </div>
      </main>
    </Shell>
  );
}
