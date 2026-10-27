import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { Fireflies, Lanterns, Scene } from "@/components/safari/motion";
import { PoseCycle } from "@/components/site/habitat";
import { markVisited } from "@/components/safari/visited";
import { siteCopy } from "@/content/yrmis";
import landHome from "@/assets/land-home.jpg";
import gallop1 from "@/assets/living/horses-gallop-1.jpg";
import gallop2 from "@/assets/living/horses-gallop-2.jpg";
import gallop3 from "@/assets/living/horses-gallop-3.jpg";

const gallop = [gallop1, gallop2, gallop3];

export function HomePage() {
  useEffect(() => markVisited("home"), []);
  return (
    <Shell current="Home">
      <main className="overflow-hidden bg-night text-paper">
        <Scene as="header" className="isolate relative min-h-[100svh] overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <img src={landHome} alt="" width={1920} height={1088} className="photo-bg cloud-drift object-[70%_center]" />
            <div className="lightning" />
            <div className="scrim-l absolute inset-0" />
            <Fireflies count={28} />
          </div>
          <Lanterns count={5} />
          <div className="relative z-20 flex min-h-[100svh] items-end px-5 pb-16 pt-28 md:px-12">
            <div className="max-w-3xl">
              <p className="eyebrow text-gold">{siteCopy.identity}</p>
              <h1 className="display-xl mt-4">
                {siteCopy.headline}
                <br />
                <em className="text-gold">{siteCopy.headlineEm}</em>
              </h1>
              <p className="font-display mt-6 max-w-xl text-2xl italic leading-snug md:text-3xl">{siteCopy.homeIntro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/river" className="pill bg-yellow-surface text-yellow-foreground">Explore CLICK</Link>
                <Link to="/work" className="pill border-2 border-paper">Work with me</Link>
                <Link to="/speaking" className="pill border-2 border-paper">Speaking</Link>
              </div>
            </div>
          </div>
        </Scene>

        <section className="border-t border-gold/30 px-5 py-16 md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-gold">About</p>
            <h2 className="display-lg mt-3">Another field. Another lens.</h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/85">{siteCopy.about}</p>
            <p className="font-display mt-6 text-3xl italic text-gold md:text-4xl">{siteCopy.yellow}</p>
            <Link to="/about" className="pill mt-8 bg-paper text-ink">Read the story</Link>
          </div>
        </section>

        <PoseCycle frames={gallop} interval={420} alt="Four horses — crimson, black, gold and green — galloping in place on the plain" />

        <section className="bg-scarlet px-5 py-16 md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-gold">Speaking</p>
            <h2 className="display-lg mt-3">CLICK into<br /><em>Wild Innovation</em></h2>
            <p className="mt-6 text-lg">{siteCopy.speaking}</p>
            <Link to="/speaking" className="pill mt-8 bg-paper text-ink">The keynote</Link>
          </div>
        </section>

        <section className="bg-crimson px-5 py-16 md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-gold">Consulting Studio</p>
            <h2 className="display-lg mt-3">Plan and conspire.</h2>
            <p className="mt-6 text-lg">{siteCopy.studio}</p>
            <Link to="/work" className="pill mt-8 bg-paper text-ink">Work with me</Link>
          </div>
        </section>

        <section className="bg-paper px-5 py-16 text-ink md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-crimson">Entrepreneurial Ventures</p>
            <h2 className="display-lg mt-3">Different ventures. More ways to see.</h2>
            <p className="mt-6 text-lg">{siteCopy.venturesLead}</p>
            <Link to="/ventures" className="pill mt-8 bg-ink text-paper">Meet the ventures</Link>
          </div>
        </section>

        <section className="border-t border-paper/15 px-5 py-16 md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-gold">1•1•1 Signals</p>
            <h2 className="display-lg mt-3">{siteCopy.yellow}</h2>
            <p className="mt-6 text-lg">{siteCopy.signalsOffer}</p>
            <Link to="/signals" className="pill mt-8 bg-scarlet text-paper">Read Signals</Link>
          </div>
        </section>

        <section className="bg-paper px-5 py-16 text-center text-ink md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-crimson">Start a conversation</p>
            <h2 className="display-lg mt-3">Let’s make things happen.</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg">{siteCopy.conversation}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" search={{ interest: "Speaking" }} className="pill bg-ink text-paper">Event inquiry</Link>
              <Link to="/contact" search={{ interest: "Consulting Studio" }} className="pill border-2 border-ink">Project inquiry</Link>
              <Link to="/world" className="pill border-2 border-ink">Explore Yrmis World</Link>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
