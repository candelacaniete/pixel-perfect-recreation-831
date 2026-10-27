import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { siteCopy } from "@/content/yrmis";
import horizon from "@/assets/living/speaking-llanos.jpg";
import jabiru from "@/assets/g-jabiru-authored.png";
import portrait from "@/assets/sourced/portraits/yrmis-blazer.jpg";

/** Sticky Llanos hero. Scroll lifts the jabiru and raises Yrmis out of the grass. */
export function HomeScene() {
  const scene = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = scene.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const total = node.offsetHeight - window.innerHeight;
      const top = node.getBoundingClientRect().top;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, -top / total));
      node.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      node.style.setProperty("--mx", ((event.clientX / window.innerWidth) - 0.5).toFixed(3));
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <section ref={scene} className="ll-scene" style={{ ["--p" as string]: 0, ["--mx" as string]: 0 }} aria-label="The Llanos, with a jabiru larger than the plain">
      <div className="ll-scene-sticky">
        <img className="ll-scene-land" src={horizon} alt="Sunlit Venezuelan Llanos: a flat horizon, grasses, and a wide sky" width={1920} height={1080} />
        <img className="ll-scene-bird" src={jabiru} alt="A jabiru, far larger than the palms, standing in the grass" width={1024} height={1024} />
        <div className="ll-scene-shadow" aria-hidden />
        <figure className="ll-scene-portrait">
          <img src={portrait} alt="Yrmis Barroeta in a blazer, original press-kit portrait" width={2688} height={4032} />
          <figcaption className="ll-kicker">Yrmis Barroeta</figcaption>
        </figure>
        <img className="ll-scene-grass" src={horizon} alt="" width={1920} height={1080} />
        <div className="ll-scene-copy">
          <p className="ll-kicker">01 · {siteCopy.identity}</p>
          <h1 className="ll-display">
            {siteCopy.headline}
            <br />
            <em>{siteCopy.headlineEm}</em>
          </h1>
          <p className="ll-lede">{siteCopy.homeIntro}</p>
          <div className="ll-actions">
            <Link to="/river" className="ll-btn ll-btn-red">Explore CLICK</Link>
            <Link to="/work" className="ll-btn ll-btn-light">Work with me</Link>
            <Link to="/speaking" className="ll-btn ll-btn-light">Speaking</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
