import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import grass from "@/assets/sp-grass.webp";
import river from "@/assets/living/ventures-water.jpg";
import "./magazine.css";

export type MagazineTone = "sunset" | "day" | "scarlet" | "night";

export function MagazineHero({
  kicker,
  title,
  deck,
  ground,
  groundAlt,
  tone,
  detail = "grass",
  children,
}: {
  kicker: string;
  title: ReactNode;
  deck?: string;
  ground: string;
  groundAlt: string;
  tone: MagazineTone;
  detail?: "grass" | "ripple" | "firefly";
  children?: ReactNode;
}) {
  const frame = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frameId = 0;
    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
        node.style.setProperty("--p", progress.toFixed(3));
      });
    };
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (detail === "grass") node.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      node.removeEventListener("pointermove", onMove);
    };
  }, [detail]);

  return (
    <section ref={frame} className={`mag-hero mag-tone-${tone}`} data-detail={detail}>
      <div className="mag-sky" aria-hidden="true">
        <img src={ground} alt="" />
      </div>
      <div className="mag-land">
        <img src={ground} alt={groundAlt} />
      </div>
      <div className="mag-grass" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <img key={index} src={grass} alt="" />)}
      </div>
      <div className="mag-veil" aria-hidden="true" />
      {detail === "firefly" && <span className="mag-fly" aria-hidden="true" />}
      {detail === "ripple" && <span className="mag-ripple" aria-hidden="true" />}
      <div className="mag-copy">
        <p className="mag-kicker">{kicker}</p>
        <h1>{title}</h1>
        {deck && <p className="mag-deck">{deck}</p>}
        {children && <div className="mag-actions">{children}</div>}
      </div>
    </section>
  );
}

export function BoatInvite() {
  return (
    <Link to="/river" className="boat-invite">
      <img src={river} alt="" />
      <div>
        <p className="mag-kicker">The river</p>
        <p className="boat-line">Want to travel it?<br />Board the boat →</p>
      </div>
    </Link>
  );
}
