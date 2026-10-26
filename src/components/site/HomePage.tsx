import { Link } from "@tanstack/react-router";
import { Chapter, Shell } from "@/components/site/Shell";
import { clickOutcomes, signalIssues, siteCopy, subscribeUrl } from "@/content/yrmis";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";

export function HomePage() {
  return (
    <Shell>
      <Chapter n="01" title="About" to="/about" />
      <div className="ed-grid ed-about">
        <div className="ed-block ed-photo">
          <img
            src={blazer}
            width={2688}
            height={4032}
            alt="Yrmis Barroeta, black and white blazer portrait from the press kit"
          />
        </div>
        <div className="ed-block ed-red ed-hero">
          <div>
            <p className="ed-eyebrow">{siteCopy.identity}</p>
            <h1>
              {siteCopy.headline}
              <br />
              <em>{siteCopy.headlineEm}</em>
            </h1>
            <p>{siteCopy.homeIntro}</p>
            <div className="ed-controls">
              <Link to="/river" className="ed-control">
                Explore CLICK
              </Link>
              <Link to="/work" className="ed-control">
                Work with me
              </Link>
              <Link to="/speaking" className="ed-textlink">
                Speaking
              </Link>
            </div>
          </div>
        </div>
        <div className="ed-block ed-bone">
          <p className="ed-serif">{siteCopy.about}</p>
        </div>
        <div className="ed-block ed-yellow">
          <h3>
            See sooner.
            <br />
            <em>Think sharper.</em>
          </h3>
        </div>
      </div>

      <div className="ed-space">
        <Chapter n="03" title="Speaking" to="/speaking" />
        <div className="ed-grid">
          <div className="ed-block ed-red ed-w2">
            <p className="ed-eyebrow">The signature keynote</p>
            <h2>
              CLICK into
              <br />
              <em>Wild Innovation</em>
            </h2>
            <p>{siteCopy.speaking}</p>
            <Link to="/contact" search={{ interest: "Speaking" }} className="ed-control">
              Check availability
            </Link>
          </div>
          <div className="ed-block ed-bone ed-w2">
            <p className="ed-eyebrow">Audience outcomes</p>
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
            <Link to="/speaking" className="ed-textlink">
              Explore the keynote
            </Link>
          </div>
        </div>
      </div>

      <div className="ed-space">
        <Chapter n="02" title="Work with me" to="/work" />
        <div className="ed-grid">
          <div className="ed-block ed-copper ed-w2">
            <p className="ed-eyebrow">Consulting Studio · Fractional & advisory</p>
            <h2>
              Plan <em>and</em>
              <br />
              conspire.
            </h2>
            <p>{siteCopy.studio}</p>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="ed-control">
              Discuss your project
            </Link>
          </div>
          <div className="ed-block ed-bone">
            <p className="ed-eyebrow">Founders</p>
            <h3>
              From idea
              <br />
              <em>to next stage.</em>
            </h3>
            <p>{siteCopy.founders}</p>
          </div>
          <div className="ed-block ed-maroon">
            <p className="ed-eyebrow">Executive teams</p>
            <p>{siteCopy.executives}</p>
          </div>
        </div>
      </div>

      <div className="ed-space">
        <Chapter n="04" title="Entrepreneurial Ventures" to="/ventures" />
        <div className="ed-block ed-maroon">
          <h2>
            Different ventures.
            <br />
            <em>More ways to see.</em>
          </h2>
          <p>{siteCopy.venturesLead}</p>
          <Link to="/ventures" className="ed-control">
            Explore the ventures
          </Link>
        </div>
      </div>

      <div className="ed-space">
        <Chapter n="06" title="1•1•1 Signals Newsletter" to="/signals" />
        <div className="ed-grid">
          <div className="ed-block ed-red ed-w2">
            <h2>
              Where tech meets
              <br />
              <em>human performance.</em>
            </h2>
            <p>{siteCopy.signalsOffer}</p>
            <a className="ed-control" href={subscribeUrl} target="_blank" rel="noreferrer">
              Subscribe free ↗
            </a>
          </div>
          <div className="ed-block ed-bone ed-w2">
            <div className="ed-inline-photo">
              <img src={glasses} width={212} height={258} alt="Yrmis wearing glasses, newsletter portrait" />
              <div>
                <p className="ed-eyebrow">1•1•1 Signals</p>
                <h3>
                  See sooner.
                  <br />
                  <em>Think sharper.</em>
                </h3>
              </div>
            </div>
            <p className="ed-eyebrow">Recent issues</p>
            <ul className="ed-issues">
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
      </div>

      <div className="ed-block ed-maroon ed-space">
        <p className="ed-eyebrow">Start a conversation</p>
        <h2>
          Let’s make
          <br />
          <em>things happen.</em>
        </h2>
        <p>{siteCopy.conversation}</p>
        <div className="ed-controls">
          <Link to="/contact" search={{ interest: "Speaking" }} className="ed-control">
            Event inquiry
          </Link>
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="ed-control">
            Project inquiry
          </Link>
        </div>
      </div>

      <div className="ed-worldstrip">
        <div>
          <p className="ed-eyebrow">A few unlikely connections</p>
          <h3>Explore Yrmis World</h3>
        </div>
        <Link to="/world" className="ed-control">
          Explore Yrmis World
        </Link>
      </div>
    </Shell>
  );
}
