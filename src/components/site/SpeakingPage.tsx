import { Link } from "@tanstack/react-router";
import { Chapter, Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { clickOutcomes, siteCopy } from "@/content/yrmis";
import stage from "@/assets/sourced/portraits/yrmis-stage.webp";

export function SpeakingPage() {
  return (
    <Shell>
      <Chapter n="03" title="Speaking" to="/speaking" />
      <div className="ed-grid">
        <div className="ed-block ed-red ed-w2">
          <p className="ed-eyebrow">The signature keynote</p>
          <h1>
            CLICK into
            <br />
            <em>Wild Innovation</em>
          </h1>
          <p>{siteCopy.speaking}</p>
          <div className="ed-controls">
            <Link to="/contact" search={{ interest: "Speaking" }} className="ed-control">
              Check availability
            </Link>
            <a className="ed-textlink" href="#audience-outcomes">
              Audience outcomes ↓
            </a>
          </div>
        </div>
        <div className="ed-block ed-photo ed-w2" style={{ minHeight: 420 }}>
          <img src={stage} width={650} height={650} alt="Yrmis mid-story" />
        </div>
      </div>

      <section className="ed-space">
        <p className="ed-eyebrow">The framework · CLICK</p>
        <ClickFive />
        <div className="ed-controls">
          <Link to="/river" className="ed-control">
            Experience CLICK
          </Link>
        </div>
      </section>

      <section id="audience-outcomes" className="ed-grid ed-space">
        <div className="ed-block ed-bone ed-w2">
          <p className="ed-eyebrow">Audience outcomes</p>
          <h2>
            Five approaches
            <br />
            <em>to a new problem.</em>
          </h2>
          <ol className="ed-outcomes">
            {clickOutcomes.map((item) => (
              <li key={item.name}>
                <span aria-hidden="true">{item.letter}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="ed-block ed-maroon ed-w2">
          <p className="ed-eyebrow">Who it’s for</p>
          <p className="ed-serif">{siteCopy.speaking}</p>
          <p className="ed-eyebrow">Walking out</p>
          <h3>{siteCopy.walkingOut}</h3>
          <Link to="/contact" search={{ interest: "Speaking" }} className="ed-control">
            Inquire about your event
          </Link>
        </div>
      </section>

      <div className="ed-grid ed-space">
        <div className="ed-slot ed-w2">
          <p className="ed-slot-label">PLACEMENT · ASSET TO ADD</p>
          <h3>Watch Yrmis speak</h3>
          <p>Place an approved stage clip here, with captions, a clear play control and a mobile poster frame.</p>
        </div>
        <div className="ed-slot ed-w2">
          <p className="ed-slot-label">PLACEMENT · ASSET TO ADD</p>
          <h3>Testimonials & credentials</h3>
          <p>Place approved quotations with names and roles here. Verify publication permissions. TEDx speaker credential is distinct from the CLICK keynote.</p>
        </div>
        <div className="ed-slot ed-w2">
          <p className="ed-slot-label">PLACEMENT · ASSET TO ADD</p>
          <h3>Formats</h3>
          <p>Confirm keynote duration, virtual / in-person delivery and workshop or offsite formats. These are review slots, not confirmed packages.</p>
        </div>
        <div className="ed-block ed-red ed-w2">
          <p className="ed-eyebrow">Event inquiry</p>
          <h2>
            Bring CLICK
            <br />
            <em>to your team.</em>
          </h2>
          <p>Tell me about your audience, date, and location.</p>
          <div className="ed-controls">
            <Link to="/contact" search={{ interest: "Speaking" }} className="ed-control">
              Inquire about your event
            </Link>
            <a className="ed-control" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">
              Current speaker page & materials ↗
            </a>
          </div>
        </div>
      </div>
    </Shell>
  );
}
