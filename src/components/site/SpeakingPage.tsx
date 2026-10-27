import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { Scene } from "@/components/safari/motion";
import { Guide, GuideEnd, GuideHero, GuideSlot } from "@/components/site/Guide";
import { markVisited } from "@/components/safari/visited";
import { clickOutcomes, siteCopy } from "@/content/yrmis";
import llanos from "@/assets/living/speaking-llanos.jpg";
import jabiruUp from "@/assets/living/jabiru-up.jpg";
import jabiruDown from "@/assets/living/jabiru-down.jpg";
import jabiruGlide from "@/assets/living/jabiru-glide.jpg";

const jabiruFlight = [jabiruUp, jabiruDown, jabiruGlide];

export function SpeakingPage() {
  useEffect(() => markVisited("speaking"), []);
  return (
    <Shell current="Speaking">
      <main className="overflow-hidden bg-night text-paper">
        <Guide frames={jabiruFlight} focus="center 40%" alt="The jabiru beating its wings over the sunlit Llanos">
        <GuideHero>
        <Scene className="relative min-h-[88svh] overflow-hidden bg-night px-5 pb-12 pt-28 md:px-12">
          <img src={llanos} alt="" className="photo-bg object-center" />
          <div aria-hidden className="sky-drift"><img src={llanos} alt="" /></div>
          <div aria-hidden className="sun-glow" />
          <div aria-hidden className="scrim-l absolute inset-0" />
          <div className="relative grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-gold">The signature keynote · guarded by the jabiru</p>
              <h1 className="display-xl mt-4">CLICK into<br /><em className="text-gold">Wild Innovation</em></h1>
              <p className="mt-6 max-w-xl text-lg">{siteCopy.speaking}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" search={{ interest: "Speaking" }} className="pill bg-yellow-surface text-yellow-foreground">Check availability</Link>
                <a href="#audience-outcomes" className="pill border-2 border-paper">Audience outcomes</a>
              </div>
            </div>
            <GuideSlot className="w-full max-w-xs md:col-span-5 md:max-w-sm md:justify-self-end" />
          </div>
        </Scene>
        </GuideHero>
        <section className="bg-scarlet px-5 py-16 text-center md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-gold">Walking out</p>
            <h2 className="display-lg mt-3">{siteCopy.walkingOut}</h2>
            <Link to="/river" className="pill mt-8 bg-paper text-ink">Experience CLICK</Link>
          </div>
        </section>
        <section className="bg-night px-5 py-12 md:py-12 md:pl-12 md:pr-40">
          <ClickFive />
        </section>
        <section id="audience-outcomes" className="bg-paper px-5 py-16 text-ink md:px-12">
          <p className="eyebrow text-crimson">Audience outcomes</p>
          <ol className="mt-8 grid gap-6 md:grid-cols-2 md:pr-36">
            {clickOutcomes.map((item) => (
              <li key={item.name} className="border-t-2 border-ink pt-4">
                <h3 className="font-display text-3xl">{item.letter} · {item.name}</h3>
                <p className="mt-2">{item.line}</p>
              </li>
            ))}
          </ol>
        </section>
        <GuideEnd />
        </Guide>
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
