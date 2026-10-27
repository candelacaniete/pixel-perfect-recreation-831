import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { WorldMap } from "@/components/safari/WorldMap";

export function WorldPage() {
  return (
    <Shell>
      <section className="chapter short">
        <div className="chap">
          <span className="num">World</span>
          <h1 className="d" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
            Yrmis <em>World</em>
          </h1>
          <p className="lede">Speaking, ventures, ideas, and a few unlikely connections. Pick a place to start. This route stays outside the service menu.</p>
        </div>
        <div className="grid">
          <Link to="/river" className="sq oxb">
            <div className="eyebrow">Experience CLICK</div>
            <p className="d h-l">Explore the river</p>
          </Link>
          <Link to="/speaking" className="sq redb">
            <p className="d h-m">Speaking</p>
          </Link>
          <Link to="/work" className="sq copper">
            <p className="d h-m">Work with me</p>
          </Link>
          <Link to="/signals" className="sq gold">
            <p className="d h-m">Signals</p>
          </Link>
        </div>
      </section>
      <WorldMap />
    </Shell>
  );
}
