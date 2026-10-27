import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Scene } from "@/components/safari/motion";
import { Guide, GuideEnd, GuideHero, GuideSlot } from "@/components/site/Guide";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import territory from "@/assets/territory.jpg";
import stand from "@/assets/living/capy-stand.png";
import work from "@/assets/living/capy-work.png";
import step from "@/assets/living/capy-step.png";

const poses = [stand, work, step];

const tracks = [
  { eyebrow: "Founders", title: "From idea to next stage.", body: siteCopy.founders, interest: "Consulting Studio" as const },
  { eyebrow: "Executive teams", title: "A thinking partner.", body: siteCopy.executives, interest: "Consulting Studio" as const },
  { eyebrow: "Institutions", title: "Venture partners.", body: siteCopy.institutions, interest: "Consulting Studio" as const },
];

export function WorkPage() {
  const tracksRef = useRef<HTMLElement>(null);
  const [pose, setPose] = useState(0);
  useEffect(() => markVisited("work"), []);
  useEffect(() => {
    const onScroll = () => {
      const rect = tracksRef.current?.getBoundingClientRect();
      if (!rect) return;
      const t = (window.innerHeight * 0.45 - rect.top) / Math.max(rect.height, 1);
      const p = Math.min(1, Math.max(0, t));
      setPose(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Shell current="Work with me">
      <main className="overflow-hidden bg-night text-paper">
        <Guide frames={poses} alt="The capybara mechanic, tools in hand" fit="contain" plain pose={pose}>
        <GuideHero>
        <Scene className="isolate relative min-h-[100svh] overflow-hidden">
          <img src={territory} alt="A capybara on a surreal scarlet shore, blowing a golden bubble among flowers, arches and stone spheres" width={1920} height={1088} className="photo-bg object-center" />
          <div aria-hidden className="scrim-l absolute inset-0" />
          <div className="relative z-10 grid min-h-[100svh] items-end gap-4 px-5 pb-10 pt-28 md:grid-cols-[minmax(0,42rem)_auto] md:px-12">
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
            <GuideSlot className="w-36 justify-self-end md:w-52" />
          </div>
        </Scene>
        </GuideHero>

        <section ref={tracksRef} className="relative grid gap-px overflow-hidden bg-ink md:grid-cols-3">
          <svg className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 w-full" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden>
            <path d="M20 10 C 180 46, 360 4, 560 26 S 920 48, 1180 12" fill="none" stroke="var(--gold)" strokeWidth="5" strokeLinecap="round" />
          </svg>
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
        <GuideEnd />
        </Guide>
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
