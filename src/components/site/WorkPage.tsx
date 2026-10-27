import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Scene } from "@/components/safari/motion";
import { markVisited } from "@/components/safari/visited";
import { assetUrl } from "@/lib/asset-url";
import { siteCopy } from "@/content/yrmis";
import capybara from "@/assets/g-capymech-authored.png";
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
    <Shell current="Work with me">
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="isolate relative min-h-[100svh] overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <img src={threshold} alt="" width={1536} height={1024} className="photo-bg object-center" />
            <div className="absolute inset-0 bg-night/55" />
            <div className="scrim-l absolute inset-0" />
          </div>
          <div className="relative z-10 grid min-h-[100svh] items-end gap-8 px-5 pb-16 pt-28 md:grid-cols-12 md:px-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-gold">Consulting Studio</p>
              <h1 className="display-xl mt-4 text-shadow-river">
                Plan and
                <br />
                <em className="text-gold">conspire.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-shadow-river">{siteCopy.studio}</p>
              <Link to="/contact" search={{ interest: "Consulting Studio" }} className="pill mt-8 bg-yellow-surface text-yellow-foreground">
                Discuss your project
              </Link>
              <figure className="mt-10 max-w-xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="A Venezuelan Llanos puma walking"
                  width={1280}
                  height={720}
                  className="aspect-video w-full border-2 border-gold object-cover"
                >
                  <source src={assetUrl(pumaWalkWebm)} type="video/webm" />
                  <source src={assetUrl(pumaWalk)} type="video/mp4" />
                </video>
              </figure>
            </div>
            <img
              src={capybara}
              alt="The capybara mechanic, a Llanos guardian carrying tools"
              width={768}
              height={1024}
              className="w-48 justify-self-center object-contain md:col-span-5 md:w-full md:max-w-sm md:justify-self-end"
            />
          </div>
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
