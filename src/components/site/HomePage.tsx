import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { ClickFive } from "@/components/site/ClickFive";
import { Fireflies, Lanterns, Scene } from "@/components/safari/motion";
import { markVisited } from "@/components/safari/visited";
import { signalIssues, siteCopy, subscribeUrl } from "@/content/yrmis";
import landHome from "@/assets/land-home.jpg";
import horses from "@/assets/horses.png";
import crocodileLand from "@/assets/land-ventures-crocodile.jpg";
import crocodile from "@/assets/river-crocodile-authored.png";
import portrait from "@/assets/sourced/portraits/yrmis-blazer.jpg";
import stage from "@/assets/sourced/portraits/yrmis-stage.webp";
import glasses from "@/assets/sourced/portraits/yrmis-glasses.webp";

export function HomePage() {
  useEffect(() => markVisited("home"), []);
  return (
    <Shell current="Home">
      <main className="overflow-hidden bg-night text-paper">
        <Scene as="header" className="isolate relative min-h-[100svh] overflow-hidden" data-guide="Home">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <img src={landHome} alt="" width={1920} height={1088} className="photo-bg cloud-drift object-[70%_center]" />
            <div className="lightning" />
            <div className="scrim-l absolute inset-0" />
            <Fireflies count={28} />
          </div>
          <Lanterns count={5} />
          <div className="relative z-10 grid min-h-[100svh] items-end gap-8 px-5 pb-16 pt-28 md:grid-cols-12 md:items-center md:px-12">
            <div className="md:col-span-7">
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

        <Scene className="relative overflow-hidden border-y-2 border-gold bg-night px-5 py-16 md:px-12" data-guide="About">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <figure className="md:col-span-5">
              <img src={portrait} alt="Yrmis Barroeta, black and white blazer portrait from the press kit" width={2688} height={4032} className="aspect-[4/5] w-full max-w-md border-2 border-gold object-cover" />
            </figure>
            <div className="md:col-span-7">
              <p className="eyebrow text-gold">01 · About</p>
              <h2 className="display-lg mt-3">Another field. Another lens.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85">{siteCopy.about}</p>
              <p className="font-display mt-6 text-3xl italic text-gold md:text-4xl">{siteCopy.yellow}</p>
              <Link to="/about" className="pill mt-8 bg-paper text-ink">Read the story</Link>
            </div>
          </div>
        </Scene>

        <Scene className="relative overflow-hidden bg-scarlet px-5 py-16 text-paper md:px-12" data-guide="Speaking">
          <Lanterns count={4} />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow text-gold">03 · Speaking</p>
              <h2 className="display-lg mt-3">CLICK into<br /><em>Wild Innovation</em></h2>
              <p className="mt-6 max-w-xl text-lg">{siteCopy.speaking}</p>
              <Link to="/contact" search={{ interest: "Speaking" }} className="pill mt-8 bg-paper text-ink">Check availability</Link>
            </div>
            <img src={stage} alt="Yrmis mid-story" width={650} height={650} className="aspect-square w-full border-2 border-gold object-cover" />
          </div>
          <ClickFive className="relative mt-12" />
        </Scene>

        <Scene className="relative overflow-hidden bg-paper px-5 py-16 text-ink md:px-12" data-guide="Ventures">
          <p className="eyebrow text-crimson">04 · Entrepreneurial Ventures</p>
          <h2 className="display-lg mt-3 max-w-4xl">Different ventures.<br /><span className="text-crimson">More ways to see.</span></h2>
          <p className="mt-4 max-w-xl">{siteCopy.venturesLead}</p>
          <img src={horses} alt="Four wild horses — crimson, black, gold and green — galloping across the page" width={1376} height={768} className="cross-x pointer-events-none relative z-10 -my-4 w-full max-w-4xl [--d:80vw]" />
          <img src={horses} alt="" aria-hidden width={1376} height={768} className="cross-x-rtl pointer-events-none relative z-10 -mt-16 w-full max-w-3xl opacity-90 [--d:70vw] md:-mt-28" />
          <Link to="/ventures" className="pill relative z-20 bg-ink text-paper">Meet the ventures</Link>
        </Scene>

        <Scene className="isolate relative min-h-[70vh] overflow-hidden px-5 py-20 text-paper md:px-12" data-guide="Crocodile">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <img src={crocodileLand} alt="" width={1376} height={768} className="photo-bg object-right" />
            <div className="absolute inset-0 bg-night/40" />
          </div>
          <img src={crocodile} alt="" aria-hidden width={768} height={1024} className="drift-up pointer-events-none absolute bottom-0 right-0 w-40 md:w-64 [--d:80px]" />
          <p className="eyebrow relative text-gold">The river</p>
          <h2 className="display-lg relative mt-3 max-w-3xl text-shadow-river">Something stirs<br />beneath the surface.</h2>
          <Link to="/river" className="pill relative mt-8 bg-yellow-surface text-yellow-foreground">Enter the river</Link>
        </Scene>

        <Scene className="relative bg-crimson px-5 py-16 text-paper md:px-12" data-guide="Work">
          <p className="eyebrow text-gold">02 · Consulting Studio</p>
          <h2 className="display-lg mt-3">Plan<br />and conspire.</h2>
          <p className="mt-6 max-w-xl text-lg">{siteCopy.studio}</p>
          <Link to="/work" className="pill mt-8 bg-paper text-ink">Work with me</Link>
        </Scene>

        <Scene className="isolate relative overflow-hidden bg-night px-5 py-16 md:px-12" data-guide="Signals">
          <Fireflies count={22} />
          <Lanterns count={4} />
          <div className="relative grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-gold">06 · 1•1•1 Signals</p>
              <h2 className="display-lg mt-3">{siteCopy.yellow}</h2>
              <p className="mt-6 max-w-xl text-lg">{siteCopy.signalsOffer}</p>
              <a href={subscribeUrl} target="_blank" rel="noreferrer" className="pill mt-8 bg-scarlet text-paper">Subscribe free</a>
            </div>
            <img src={glasses} alt="Yrmis wearing glasses, the portrait used in 1•1•1 Signals" width={212} height={258} className="w-40 border-2 border-gold bg-night md:col-span-5 md:w-56" />
          </div>
          <ul className="relative mt-10 max-w-xl divide-y divide-paper/20">
            {signalIssues.map((issue) => (
              <li key={issue.href} className="py-3">
                <a href={issue.href} target="_blank" rel="noreferrer" className="hover:underline">{issue.title} ↗</a>
              </li>
            ))}
          </ul>
        </Scene>

        <Scene className="bg-paper px-5 py-16 text-ink md:px-12">
          <p className="eyebrow text-crimson">Start a conversation</p>
          <h2 className="display-lg mt-3 max-w-3xl">Let’s make<br />things happen.</h2>
          <p className="mt-6 max-w-xl text-lg">{siteCopy.conversation}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" search={{ interest: "Speaking" }} className="pill bg-ink text-paper">Event inquiry</Link>
            <Link to="/contact" search={{ interest: "Consulting Studio" }} className="pill border-2 border-ink">Project inquiry</Link>
            <Link to="/world" className="pill border-2 border-ink">Explore Yrmis World</Link>
          </div>
        </Scene>
      </main>
    </Shell>
  );
}
