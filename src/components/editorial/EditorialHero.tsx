import type { PointerEvent, ReactNode } from "react";

type Plate = { src: string; alt: string; width: number; height: number };

export type Fauna = "puma" | "crocodile" | "capybara" | "heron" | "anaconda" | "piranha" | "cardinal" | "turtle";

function Dots({ count, className }: { count: number; className: string }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => <span key={index} className={className} />)}
    </>
  );
}

/** Motion that stays on the animal, off the type. No bands, scan lines, or grids. */
function FaunaFx({ fauna }: { fauna: Fauna }) {
  if (fauna === "puma") {
    return (
      <div className="ed-fx ed-fx-puma" aria-hidden="true">
        <i className="pulse" />
        <Dots count={12} className="spore" />
      </div>
    );
  }
  if (fauna === "crocodile") {
    return (
      <div className="ed-fx ed-fx-crocodile" aria-hidden="true">
        <Dots count={6} className="spark" />
        <Dots count={3} className="ripple" />
      </div>
    );
  }
  if (fauna === "capybara") {
    return (
      <div className="ed-fx ed-fx-capybara" aria-hidden="true">
        <i className="holo" />
        <Dots count={7} className="spark" />
      </div>
    );
  }
  if (fauna === "heron") {
    return (
      <div className="ed-fx ed-fx-heron" aria-hidden="true">
        <Dots count={5} className="drip" />
        <Dots count={3} className="ripple" />
      </div>
    );
  }
  if (fauna === "anaconda") {
    return (
      <div className="ed-fx ed-fx-anaconda" aria-hidden="true">
        <Dots count={10} className="star" />
        <Dots count={5} className="fly" />
      </div>
    );
  }
  if (fauna === "cardinal") {
    return (
      <div className="ed-fx ed-fx-cardinal" aria-hidden="true">
        <i className="breath" />
        <Dots count={10} className="ember" />
        <i className="glow" />
      </div>
    );
  }
  if (fauna === "turtle") {
    return (
      <div className="ed-fx ed-fx-turtle" aria-hidden="true">
        <i className="shell" />
        <Dots count={4} className="beam" />
        <Dots count={3} className="step" />
      </div>
    );
  }
  return (
    <div className="ed-fx ed-fx-piranha" aria-hidden="true">
      <Dots count={8} className="bubble" />
      <Dots count={3} className="trail" />
    </div>
  );
}

/** Editorial hero. The illustration keeps the right side; the type keeps the left. */
export function EditorialHero({
  kicker,
  title,
  deck,
  ground,
  groundAlt,
  plate,
  animal,
  animalSide = "right",
  companion,
  fauna,
  night = false,
  stage,
  children,
}: {
  kicker: string;
  title: string;
  deck?: string;
  ground: string;
  groundAlt: string;
  plate?: Plate;
  animal?: Plate;
  animalSide?: "left" | "right";
  companion?: ReactNode;
  fauna?: Fauna;
  night?: boolean;
  stage?: ReactNode;
  children?: ReactNode;
}) {
  const classes = [
    "ed-hero",
    plate ? "" : "ed-hero-open",
    fauna ? `ed-fauna ed-fauna-${fauna}` : "",
    night ? "ed-night" : "",
  ].filter(Boolean).join(" ");
  const interactive = fauna === "cardinal" || fauna === "turtle";

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const near = x > 0.42 ? Math.min(1, (x - 0.42) / 0.45) : 0;
    const style = event.currentTarget.style;
    style.setProperty("--fx-x", x.toFixed(3));
    style.setProperty("--fx-y", y.toFixed(3));
    style.setProperty("--fx-near", near.toFixed(3));
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--fx-near", "0");
  }

  return (
    <section
      className={classes}
      aria-labelledby="ed-hero-title"
      {...(interactive ? { onPointerMove, onPointerLeave } : {})}
    >
      <img className="ed-hero-ground" src={ground} alt={groundAlt} />
      {fauna && <FaunaFx fauna={fauna} />}
      <div className="ed-hero-copy">
        <p className="yw-kicker">{kicker}</p>
        <h1 id="ed-hero-title">{title}</h1>
        {deck && <p className="ed-deck">{deck}</p>}
        {children}
      </div>
      {plate && (
        <img className="ed-hero-plate" src={plate.src} alt={plate.alt} width={plate.width} height={plate.height} />
      )}
      {animal && (
        <img
          className={`ed-animal${animalSide === "left" ? " is-left" : ""}`}
          src={animal.src}
          alt={animal.alt}
          width={animal.width}
          height={animal.height}
        />
      )}
      {companion}
      {stage && <div className="ed-hero-squares">{stage}</div>}
      {night && !fauna && (
        <div className="ed-fireflies" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      )}
    </section>
  );
}
