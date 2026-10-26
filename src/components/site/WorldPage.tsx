import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { WorldMap } from "@/components/safari/WorldMap";

export function WorldPage() {
  return (
    <Shell>
      <p className="ed-eyebrow">Optional exploration</p>
      <h1>
        Yrmis <em>World</em>
      </h1>
      <p>Speaking, ventures, ideas, and a few unlikely connections. Pick a place to start.</p>
      <div className="ed-grid">
        <div className="ed-block ed-maroon ed-w2">
          <h2>Experience CLICK</h2>
          <Link to="/river" className="ed-control">
            Explore CLICK
          </Link>
        </div>
        <div className="ed-block ed-red ed-w2">
          <h2>
            Plan <em>and</em>
            <br />
            conspire.
          </h2>
          <div className="ed-controls">
            <Link to="/speaking" className="ed-control">
              Speaking
            </Link>
            <Link to="/work" className="ed-control">
              Work with me
            </Link>
            <Link to="/signals" className="ed-control">
              Signals
            </Link>
          </div>
        </div>
      </div>
      <WorldMap />
    </Shell>
  );
}
