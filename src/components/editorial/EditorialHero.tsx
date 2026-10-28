import type { ReactNode } from "react";

type Plate = { src: string; alt: string; width: number; height: number };

export type Fauna = "puma" | "crocodile" | "capybara" | "heron" | "anaconda" | "piranha" | "cardinal" | "turtle";

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

  return (
    <section className={classes} aria-labelledby="ed-hero-title">
      <img className="ed-hero-ground" src={ground} alt={groundAlt} />
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
