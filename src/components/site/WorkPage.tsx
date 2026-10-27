import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Scene } from "@/components/safari/motion";
import { WaterLive } from "@/components/site/habitat";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import territory from "@/assets/territory.jpg";
import mechanic from "@/assets/land-studio-inventor.jpg";

const tracks = [
  { eyebrow: "Founders", title: "From idea to next stage.", body: siteCopy.founders, interest: "Consulting Studio" as const },
  { eyebrow: "Executive teams", title: "A thinking partner.", body: siteCopy.executives, interest: "Consulting Studio" as const },
  { eyebrow: "Institutions", title: "Venture partners.", body: siteCopy.institutions, interest: "Consulting Studio" as const },
];

export function WorkPage() {
  useEffect(() => markVisited("work"), []);
  return (
    <Shell current="Work with me">
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="isolate relative min-h-[100svh] overflow-hidden">
          <img src={territory} alt="A capybara on a surreal scarlet shore, blowing a golden bubble among flowers, arches and stone spheres" width={1920} height={1088} className="photo-bg cloud-drift object-center" />
          <div aria-hidden className="bubble-breath" />
          <WaterLive />
          <div aria-hidden className="scrim-l absolute inset-0" />
          <div className="relative z-10 flex min-h-[100svh] items-end px-5 pb-16 pt-28 md:px-12">
            <div className="max-w-3xl">
              <p className="eyebrow text-gold">Consulting Studio · the capybara</p>
              <h1 className="display-xl mt-4 text-shadow-river">
                Plan and
                <br />
                <em className="text-gold">conspire.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-shadow-river">{siteCopy.studio}</p>
              <Link to="/contact" search={{ interest: "Consulting Studio" }} className="pill mt-8 bg-yellow-surface text-yellow-foreground">
                Discuss your project
              </Link>
            </div>
          </div>
        </Scene>

        <Scene className="relative min-h-[70svh] overflow-hidden">
          <img src={mechanic} alt="The capybara mechanic on a half-sunk red car, a rope in its paws and a red balloon over the palms" width={1376} height={768} className="photo-bg object-[20%_center]" />
          <div aria-hidden className="balloon-breath" />
          <WaterLive />
        </Scene>

        <section className="relative grid gap-px overflow-hidden bg-ink md:grid-cols-3">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <span className="arch right-[4%] -top-2" />
          </div>
          {tracks.map((track, index) => (
            <Link key={track.eyebrow} to="/contact" search={{ interest: track.interest }} className={`block p-6 md:p-8 ${index % 2 ? "bg-crimson" : "bg-scarlet"} hover:bg-paper hover:text-ink`}>
              <span className="eyebrow">{track.eyebrow}</span>
              <span className="font-display mt-4 block text-3xl">{track.title}</span>
              <span className="mt-3 block">{track.body}</span>
            </Link>
          ))}
        </section>
        <section className="grid gap-px bg-ink md:grid-cols-2">
          <Link to="/contact" search={{ interest: "Communications strategy" }} className="block bg-ink p-6 text-paper md:p-10">
            <span className="eyebrow text-gold">Communications strategy</span>
            <span className="font-display mt-4 block text-3xl leading-snug">{siteCopy.communications}</span>
          </Link>
          <Link to="/contact" search={{ interest: "Other" }} className="block bg-paper p-6 text-ink md:p-10">
            <span className="eyebrow">Something we haven’t named yet</span>
            <span className="font-display mt-4 block text-3xl leading-snug">{siteCopy.unnamed}</span>
          </Link>
        </section>
      </main>
    </Shell>
  );
}
