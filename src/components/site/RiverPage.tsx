import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Shell } from "@/components/site/Shell";
import { SiteChrome } from "@/components/safari/SiteChrome";
import { Fireflies, Lanterns, Scene } from "@/components/safari/motion";
import { RiverJourney } from "@/components/safari/river/RiverJourney";
import { journey } from "@/components/safari/journeyStore";
import { markVisited } from "@/components/safari/visited";
import { LANDING_Z } from "@/content/journey";
import land from "@/assets/land-home.jpg";
import crocodile from "@/assets/river-crocodile-authored.png";

export function RiverPage({ stop }: { stop: number | undefined }) {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(stop != null);
  const onShore = useCallback(() => {
    journey.set({ landed: false });
    void navigate({ to: "/click" });
  }, [navigate]);

  useEffect(() => {
    if (!entered || stop == null) return;
    journey.requestJump(stop);
  }, [entered, stop]);
  useEffect(() => { if (!entered) markVisited("river"); }, [entered]);

  if (entered) {
    return (
      <>
        <SiteChrome />
        <RiverJourney onShore={onShore} />
      </>
    );
  }

  return (
    <Shell>
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="isolate relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-28 md:px-12">
          <div aria-hidden className="absolute inset-0 -z-10">
            <img src={land} alt="" className="photo-bg object-[70%_center]" />
            <div className="absolute inset-0 bg-night/50" />
            <Fireflies />
          </div>
          <Lanterns count={6} />
          <img src={crocodile} alt="" aria-hidden className="drift-up pointer-events-none absolute bottom-0 right-0 w-40 md:w-64 [--d:70px]" />
          <p className="eyebrow relative text-gold">The Llanos</p>
          <h1 className="display-xl relative mt-4 text-shadow-river">CLICK into<br /><em className="text-gold">Wild Innovation</em></h1>
          <p className="relative mt-6 max-w-xl text-lg text-shadow-river">Trust me. You’re gonna want a window seat. A trip through the way I solve problems. We start in the Llanos. We end with what you could build next.</p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <button type="button" className="pill bg-yellow-surface text-yellow-foreground" onClick={() => {
              const state = journey.get();
              if (state.landed || state.cam >= LANDING_Z - 1) journey.set({ cam: 0, passed: [], landed: false, jump: null });
              setEntered(true);
            }}>Enter the river</button>
            <Link to="/click" className="pill border-2 border-paper">Preview where the river ends</Link>
          </div>
        </Scene>
      </main>
    </Shell>
  );
}
