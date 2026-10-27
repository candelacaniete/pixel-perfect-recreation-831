import type { ReactNode } from "react";

type Plate = { src: string; alt: string; width: number; height: number };

/** Editorial hero. The photograph and the animal sit behind the type. */
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
  night?: boolean;
  stage?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={`ed-hero${plate ? "" : " ed-hero-open"}${night ? " ed-night" : ""}`} aria-labelledby="ed-hero-title">
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
      {night && (
        <div className="ed-fireflies" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      )}
    </section>
  );
}
