import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { FlyingGuardian, Scene } from "@/components/safari/motion";
import { LlanosSky } from "@/components/site/habitat";
import { markVisited } from "@/components/safari/visited";
import { clickOutcomes, siteCopy } from "@/content/yrmis";
import stage from "@/assets/sourced/portraits/yrmis-stage.webp";
import jabiru from "@/assets/g-jabiru-authored.png";

export function SpeakingPage() {
  useEffect(() => markVisited("speaking"), []);
  return (
    <Shell current="Speaking">
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="relative min-h-[88svh] overflow-hidden bg-night px-5 pb-16 pt-28 md:px-12">
          <LlanosSky />
          <div className="sky-lane">
            <FlyingGuardian src={jabiru} alt="The jabiru flying across the Llanos sky" top="0%" className="w-24 md:w-32" />
          </div>
          <div className="relative grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-gold">The signature keynote · guarded by the jabiru</p>
              <h1 className="display-xl mt-4">CLICK into<br /><em className="text-gold">Wild Innovation</em></h1>
              <p className="mt-6 max-w-xl text-lg">{siteCopy.speaking}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" search={{ interest: "Speaking" }} className="pill bg-yellow-surface text-yellow-foreground">Check availability</Link>
                <a href="#audience-outcomes" className="pill border-2 border-paper">Audience outcomes</a>
              </div>
            </div>
            <img src={stage} alt="Yrmis mid-story" width={650} height={650} className="relative aspect-[4/5] max-h-[56vh] w-full border-2 border-gold object-cover object-top md:col-span-5 md:w-auto md:justify-self-end" />
          </div>
        </Scene>
        <Scene className="relative h-36 overflow-hidden md:h-44">
          <LlanosSky />
          <FlyingGuardian src={jabiru} alt="" flip top="18%" className="w-20 md:w-28" />
        </Scene>
        <section className="bg-scarlet px-5 py-16 text-center md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-gold">Walking out</p>
            <h2 className="display-lg mt-3">{siteCopy.walkingOut}</h2>
            <Link to="/river" className="pill mt-8 bg-paper text-ink">Experience CLICK</Link>
          </div>
        </section>
        <section className="bg-night px-5 py-12 md:px-12">
          <ClickFive />
        </section>
        <section id="audience-outcomes" className="bg-paper px-5 py-16 text-ink md:px-12">
          <p className="eyebrow text-crimson">Audience outcomes</p>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {clickOutcomes.map((item) => (
              <li key={item.name} className="border-t-2 border-ink pt-4">
                <h3 className="font-display text-3xl">{item.letter} · {item.name}</h3>
                <p className="mt-2">{item.line}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="grid gap-4 bg-night px-5 py-12 md:grid-cols-3 md:px-12">
          {[
            ["Watch Yrmis speak", "Place an approved stage clip here, with captions, a clear play control and a mobile poster frame."],
            ["Testimonials & credentials", "Place approved quotations with names and roles here. TEDx is distinct from the CLICK keynote."],
            ["Formats", "Confirm keynote duration, virtual or in-person delivery, and workshop or offsite formats. These are review slots, not confirmed packages."],
          ].map(([title, body]) => (
            <article key={title} className="border border-dashed border-paper/40 p-6">
              <p className="eyebrow text-gold">Placement · asset to add</p>
              <h3 className="font-display mt-3 text-2xl">{title}</h3>
              <p className="mt-3 text-sm text-paper/75">{body}</p>
            </article>
          ))}
        </section>
        <section className="bg-scarlet px-5 py-16 md:px-12">
          <h2 className="display-lg">Bring CLICK to your team.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" search={{ interest: "Speaking" }} className="pill bg-paper text-ink">Inquire about your event</Link>
            <a className="pill border-2 border-paper" href="https://www.myheadquarters.club/innovationkeynote" target="_blank" rel="noreferrer">Speaker materials ↗</a>
          </div>
        </section>
      </main>
    </Shell>
  );
}
