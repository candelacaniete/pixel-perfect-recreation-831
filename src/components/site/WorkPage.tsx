import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Scene } from "@/components/safari/motion";
import { markVisited } from "@/components/safari/visited";
import { assetUrl } from "@/lib/asset-url";
import { siteCopy } from "@/content/yrmis";
import puma from "@/assets/puma.png";
import pumaWalk from "@/assets/videos/puma-walk.mp4.asset.json";
import pumaWalkWebm from "@/assets/videos/puma-walk.webm.asset.json";
import threshold from "@/assets/work-threshold.jpg";

const tracks = [
  { eyebrow: "Founders", title: "From idea to next stage.", body: siteCopy.founders, interest: "Consulting Studio" as const },
  { eyebrow: "Executive teams", title: "A thinking partner.", body: siteCopy.executives, interest: "Consulting Studio" as const },
  { eyebrow: "Institutions", title: "Venture partners.", body: siteCopy.institutions, interest: "Consulting Studio" as const },
];

export function WorkPage() {
  useEffect(() => markVisited("work"), []);
  return (
    <Shell tone="scarlet" current="Work with me">
      <main className="overflow-hidden bg-scarlet text-paper">
        <Scene className="relative overflow-hidden px-5 pb-6 pt-28 md:px-12">
          <p aria-hidden className="display-xl swell pointer-events-none absolute -right-6 bottom-0 whitespace-nowrap text-[22vw] text-ink/15">CLICK</p>
          <p className="eyebrow">Consulting Studio</p>
          <h1 className="display-xl relative mt-4">Plan and<br /><em>conspire.</em></h1>
          <p className="relative mt-6 max-w-2xl text-lg">{siteCopy.studio}</p>
          <video autoPlay muted loop playsInline aria-label="A Venezuelan Llanos puma walking" width={1280} height={720}
            className="pointer-events-none relative -mx-5 mt-6 block w-[calc(100%+2.5rem)] max-w-none [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_80%)] md:-mx-12 md:w-[calc(100%+6rem)]">
            <source src={assetUrl(pumaWalkWebm)} type="video/webm" />
            <source src={assetUrl(pumaWalk)} type="video/mp4" />
          </video>
        </Scene>
        <Scene className="relative h-48 overflow-hidden bg-night md:h-72" aria-label="The river opens into the Llanos">
          <img src={threshold} alt="A river passage opens between vermilion banks toward the wide golden Llanos horizon" width={1536} height={1024} className="photo-bg object-center" />
        </Scene>
        <section className="grid gap-px bg-ink md:grid-cols-3">
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
            <span className="font-display mt-4 block text-3xl">{siteCopy.communications}</span>
          </Link>
          <Link to="/contact" search={{ interest: "Other" }} className="block bg-paper p-6 text-ink md:p-10">
            <span className="eyebrow">Something we haven’t named yet</span>
            <span className="font-display mt-4 block text-3xl">{siteCopy.unnamed}</span>
          </Link>
        </section>
        <Scene className="relative overflow-hidden bg-paper px-5 py-16 text-ink md:px-12">
          <h2 className="display-lg">The puma keeps walking.</h2>
          <p className="mt-3 max-w-xl">The same animal from the film, crossing the page as you move through the work.</p>
          <img src={puma} alt="A puma crossing the page" width={1024} height={1024} className="cross-x relative mt-6 w-40 [--d:70vw] md:w-56" />
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="pill mt-8 bg-ink text-paper">Discuss your project</Link>
        </Scene>
      </main>
    </Shell>
  );
}
