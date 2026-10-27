import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Scene } from "@/components/safari/motion";
import { markVisited } from "@/components/safari/visited";
import { siteCopy, socials } from "@/content/yrmis";
import blazer from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import plants from "@/assets/sourced/portraits/yrmis-plants.jpg";
import red from "@/assets/sourced/portraits/yrmis-red.jpg";
import origin from "@/assets/origin.jpg";
import heron from "@/assets/g-heron-authored.png";

const instagram = socials.find((item) => item.name === "Instagram");

export function AboutPage() {
  useEffect(() => markVisited("about"), []);
  return (
    <Shell current="About">
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="isolate relative min-h-[88svh] overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10">
            <img src={origin} alt="" className="photo-bg object-center" />
            <div className="absolute inset-0 bg-night/50" />
            <div className="scrim-l absolute inset-0" />
          </div>
          <div className="relative grid min-h-[88svh] items-end gap-6 px-5 pb-16 pt-28 md:grid-cols-12 md:px-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-gold">About · guarded by the night heron</p>
              <h1 className="display-xl mt-4 text-shadow-river">
                {siteCopy.headline}
                <br />
                <em className="text-gold">{siteCopy.headlineEm}</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-shadow-river">{siteCopy.about}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/work" className="pill bg-yellow-surface text-yellow-foreground">Work with me</Link>
                <Link to="/speaking" className="pill border-2 border-paper">Speaking</Link>
              </div>
            </div>
            <img src={heron} alt="The night heron, guardian of this part of the Llanos" className="w-40 justify-self-center object-contain md:col-span-5 md:w-64 md:justify-self-end" />
          </div>
        </Scene>
        <section className="grid items-start gap-10 px-5 py-16 md:grid-cols-12 md:px-12">
          <img src={blazer} alt="Yrmis Barroeta in a blazer, original press-kit portrait" width={2688} height={4032} className="aspect-[4/5] w-full border-2 border-gold object-cover md:col-span-5" />
          <div className="max-w-2xl md:col-span-7">
            {siteCopy.story.map((section) => (
              <section key={section.title} className="mb-12">
                <h2 className="font-display text-4xl">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-lg leading-relaxed text-paper/85">{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </section>
        <section className="grid gap-6 px-5 pb-16 md:grid-cols-2 md:px-12">
          <figure>
            <img src={plants} alt="Yrmis laughing among green leaves, original press-kit photograph" className="aspect-square w-full rotate-[-1.5deg] border-2 border-gold object-cover" />
          </figure>
          <figure>
            <img src={red} alt="Yrmis in red tights and red heels, original press-kit photograph" className="aspect-[4/5] w-full rotate-[1.5deg] border-2 border-scarlet object-cover" />
          </figure>
        </section>
        <section className="bg-scarlet px-5 py-14 md:px-12">
          <h2 className="display-lg">Find me on Instagram.</h2>
          {instagram && (
            <a className="pill mt-6 bg-paper text-ink" href={instagram.href} target="_blank" rel="noreferrer">@allblacksheep_club ↗</a>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/ventures" className="pill border-2 border-paper">Entrepreneurial Ventures</Link>
            <Link to="/press" className="pill border-2 border-paper">Press kit</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
