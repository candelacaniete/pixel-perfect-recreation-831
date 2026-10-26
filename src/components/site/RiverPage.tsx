import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Shell } from "@/components/site/Shell";
import { SiteChrome } from "@/components/safari/SiteChrome";
import { RiverJourney } from "@/components/safari/river/RiverJourney";
import { journey } from "@/components/safari/journeyStore";
import { LANDING_Z } from "@/content/journey";

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
      <p className="ed-eyebrow">The river experience</p>
      <h1>
        CLICK into
        <br />
        <em>Wild Innovation</em>
      </h1>
      <p className="ed-serif">Trust me. You’re gonna want a window seat.</p>
      <p>A trip through the way I solve problems. We start in the Llanos. We end with what you could build next.</p>
      <div className="ed-riverline">
        <span>THE LLANOS</span>
        <i aria-hidden="true" />
        <strong>
          CLICK
          <br />
          <em>Find. Adapt. Build.</em>
        </strong>
      </div>
      <div className="ed-block ed-maroon">
        <h2>
          Five ways to spot problems,
          <br />
          <em>cross industries, and make something work.</em>
        </h2>
        <p>Bring your curiosity.</p>
        <div className="ed-controls">
          <button
            type="button"
            className="ed-control"
            onClick={() => {
              const state = journey.get();
              if (state.landed || state.cam >= LANDING_Z - 1) {
                journey.set({ cam: 0, passed: [], landed: false, jump: null });
              }
              setEntered(true);
            }}
          >
            Enter the river
          </button>
          <Link to="/click" className="ed-control">
            Preview where the river ends
          </Link>
          <Link to="/speaking" className="ed-control">
            Speaking
          </Link>
        </div>
      </div>
    </Shell>
  );
}
