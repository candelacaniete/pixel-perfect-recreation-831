import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { siteCopy } from "@/content/yrmis";
import street from "@/assets/sourced/portraits/yrmis-street.jpg";

export function WorkPage() {
  return (
    <Shell page>
      <main className="swrap">
        <header className="phead">
          <div>
            <div className="eyebrow red">Consulting Studio</div>
            <h1 className="d">
              Plan <em>and</em>
              <br />
              conspire.
            </h1>
          </div>
          <div className="side">
            <p className="lede">{siteCopy.studio}</p>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="btn red">
              Discuss your project
            </Link>
          </div>
        </header>
        <div className="cols">
          <div>
            <div className="eyebrow">Founders</div>
            <h3>From idea to next stage.</h3>
            <p>{siteCopy.founders}</p>
          </div>
          <div>
            <div className="eyebrow">Executive teams</div>
            <h3>A thinking partner.</h3>
            <p>{siteCopy.executives}</p>
          </div>
          <div>
            <div className="eyebrow">Institutions</div>
            <h3>Venture partners.</h3>
            <p>{siteCopy.institutions}</p>
          </div>
        </div>
        <div className="block" style={{ alignItems: "stretch" }}>
          <div className="media">
            <img src={street} alt="Yrmis Barroeta" />
          </div>
          <div className="panel">
            <div>
              <div className="eyebrow">Communications strategy</div>
              <p className="big">{siteCopy.communications}</p>
            </div>
            <Link to="/contact" search={{ interest: "Communications strategy" }} className="btn">
              Discuss newsletter growth
            </Link>
          </div>
        </div>
        <div className="split">
          <div className="panel red">
            <div>
              <div className="eyebrow">Something we haven’t named yet</div>
              <p className="big">{siteCopy.unnamed}</p>
            </div>
            <Link to="/contact" search={{ interest: "Other" }} className="btn">
              Start a conversation
            </Link>
          </div>
          <div className="panel gold">
            <div>
              <div className="eyebrow">Speaking</div>
              <p className="big">CLICK into Wild Innovation</p>
              <p>{siteCopy.speaking}</p>
            </div>
            <Link to="/speaking" className="btn">
              Speaking
            </Link>
          </div>
        </div>
      </main>
    </Shell>
  );
}
