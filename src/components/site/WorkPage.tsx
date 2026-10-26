import { Link } from "@tanstack/react-router";
import { Chapter, Shell } from "@/components/site/Shell";
import { siteCopy } from "@/content/yrmis";
import plant from "@/assets/sourced/motifs/plant.webp";

export function WorkPage() {
  return (
    <Shell>
      <Chapter n="02" title="Work with me" to="/work" />
      <div className="ed-grid">
        <div className="ed-block ed-copper ed-w2">
          <p className="ed-eyebrow">Consulting Studio · Fractional & advisory</p>
          <h1>
            Plan <em>and</em>
            <br />
            conspire.
          </h1>
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
          <img src={plant} width={210} height={210} alt="" />
          <p>{siteCopy.executives}</p>
        </div>
      </div>
      <div className="ed-grid ed-space">
        <div className="ed-block ed-bone ed-w2">
          <h3>Institutions & venture partners</h3>
          <p>{siteCopy.institutions}</p>
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="ed-control">
            Discuss your project
          </Link>
        </div>
        <div className="ed-block ed-maroon ed-w2">
          <h3>Communications strategy</h3>
          <p>{siteCopy.communications}</p>
          <Link to="/contact" search={{ interest: "Communications strategy" }} className="ed-control">
            Discuss newsletter growth
          </Link>
        </div>
        <div className="ed-block ed-pink ed-w2">
          <h3>Something we haven’t named yet</h3>
          <p>{siteCopy.unnamed}</p>
          <Link to="/contact" search={{ interest: "Other" }} className="ed-control">
            Start a conversation
          </Link>
        </div>
        <div className="ed-block ed-red ed-w2">
          <p className="ed-eyebrow">Speaking</p>
          <h3>CLICK into Wild Innovation</h3>
          <p>{siteCopy.speaking}</p>
          <Link to="/speaking" className="ed-control">
            Speaking
          </Link>
        </div>
      </div>
    </Shell>
  );
}
