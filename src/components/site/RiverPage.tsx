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
      <section className="chapter hero">
        <div className="chap">
          <span className="num">River</span>
          <h1 className="d" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
            CLICK into
            <br />
            <em>Wild Innovation</em>
          </h1>
          <p className="lede">Trust me. You’re gonna want a window seat. A trip through the way I solve problems. We start in the Llanos. We end with what you could build next.</p>
        </div>
        <div className="grid">
          <div className="sq w2 oxb">
            <div className="eyebrow">The Llanos</div>
            <p className="d h-l">
              Five ways to spot problems, cross industries, and make something work.
            </p>
            <p className="small">Bring your curiosity.</p>
          </div>
          <div className="sq w2 gold">
            <p className="d h-l">
              CLICK
              <br />
              <em>Find. Adapt. Build.</em>
            </p>
          </div>
          <div className="sq w3 bone">
            <div className="actions">
              <button
                type="button"
                className="btn red"
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
              <Link to="/click" className="btn">
                Preview where the river ends
              </Link>
              <Link to="/speaking" className="btn">
                Speaking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
