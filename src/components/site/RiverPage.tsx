import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Shell } from "@/components/site/Shell";
import { SiteChrome } from "@/components/safari/SiteChrome";
import { Scene } from "@/components/safari/motion";
import { KeyedPuma } from "@/components/site/KeyedPuma";
import { WaterSurface } from "@/components/site/habitat";
import { RiverJourney } from "@/components/safari/river/RiverJourney";
import { journey } from "@/components/safari/journeyStore";
import { markVisited } from "@/components/safari/visited";
import { LANDING_Z } from "@/content/journey";
import canyon from "@/assets/work-threshold.jpg";

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
        <SiteChrome overlay />
        <RiverJourney onShore={onShore} />
      </>
    );
  }

  return (
    <Shell>
      <main className="overflow-hidden bg-night text-paper">
        <Scene className="relative min-h-[100svh] overflow-hidden">
          <img src={canyon} alt="" className="photo-bg object-[86%_center] md:object-center" />
          <div aria-hidden className="absolute inset-0 bg-night/25" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[42%] md:block">
            <WaterSurface src={canyon} position="center 78%" />
          </div>
          <KeyedPuma className="pointer-events-none absolute bottom-[34%] right-0 z-10 w-36 md:bottom-[32%] md:right-[4%] md:w-[min(34vw,20rem)]" />
          <div className="relative z-20 flex min-h-[100svh] items-start px-5 pb-16 pt-32 md:px-12">
          <div className="max-w-xl">
          <p className="eyebrow text-gold">The Llanos</p>
          <h1 className="display-xl mt-4">CLICK into<br /><em className="text-gold">Wild Innovation</em></h1>
          <p className="mt-6 text-lg">Trust me. You’re gonna want a window seat. A trip through the way I solve problems. We start in the Llanos. We end with what you could build next.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="pill bg-yellow-surface text-yellow-foreground" onClick={() => {
              const state = journey.get();
              if (state.landed || state.cam >= LANDING_Z - 1) journey.set({ cam: 0, passed: [], landed: false, jump: null });
              setEntered(true);
            }}>Enter the river</button>
            <Link to="/click" className="pill border-2 border-paper">Preview where the river ends</Link>
          </div>
          </div>
          </div>
        </Scene>
      </main>
    </Shell>
  );
}
