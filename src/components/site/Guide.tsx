import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { PoseCycle } from "@/components/site/habitat";

type Phase = "hero" | "follow" | "done";

type GuideValue = {
  phase: Phase;
  reduced: boolean;
  follow: boolean;
  heroRef: RefObject<HTMLDivElement | null>;
  endRef: RefObject<HTMLDivElement | null>;
  renderFigure: () => ReactNode;
};

const GuideContext = createContext<GuideValue | null>(null);

function useGuide() {
  const value = useContext(GuideContext);
  if (!value) throw new Error("Guide pieces belong inside Guide");
  return value;
}

/** The pose cycle lives in the hero, then keeps the reader company down the section. */
export function Guide({
  frames,
  alt,
  interval = 680,
  focus = "center",
  fit = "cover",
  frame = "aspect-[4/5]",
  follow = true,
  pose,
  plain = false,
  children,
}: {
  frames: readonly string[];
  alt: string;
  interval?: number;
  focus?: string;
  fit?: "cover" | "contain";
  frame?: string;
  follow?: boolean;
  pose?: number;
  plain?: boolean;
  children: ReactNode;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("hero");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduced = () => setReduced(motion.matches);
    applyReduced();
    motion.addEventListener("change", applyReduced);
    if (!follow) return () => motion.removeEventListener("change", applyReduced);

    const onScroll = () => {
      if (motion.matches) {
        setPhase("hero");
        return;
      }
      const hero = heroRef.current?.getBoundingClientRect();
      const end = endRef.current?.getBoundingClientRect();
      if (!hero || !end) return;
      if (end.top < window.innerHeight * 0.62) setPhase("done");
      else if (hero.bottom < 96) setPhase("follow");
      else setPhase("hero");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      motion.removeEventListener("change", applyReduced);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [follow]);

  const renderFigure = () => (
    <PoseCycle
      frames={frames}
      alt={alt}
      interval={interval}
      focus={focus}
      fit={fit}
      frame={frame}
      {...(pose !== undefined ? { index: pose } : {})}
    />
  );

  return (
    <GuideContext.Provider value={{ phase, reduced, follow, heroRef, endRef, renderFigure }}>
      {children}
      {follow && phase === "follow" && !reduced
        ? createPortal(
            <div className={`guide-follow ${plain ? "guide-follow-plain" : ""}`}>{renderFigure()}</div>,
            document.body,
          )
        : null}
    </GuideContext.Provider>
  );
}

export function GuideHero({ className = "", children }: { className?: string; children: ReactNode }) {
  const { heroRef } = useGuide();
  return (
    <div ref={heroRef} className={className}>
      {children}
    </div>
  );
}

export function GuideSlot({ className = "" }: { className?: string }) {
  const { phase, reduced, follow, renderFigure } = useGuide();
  const show = !follow || reduced || phase === "hero";
  return <div className={`guide-slot ${className}`}>{show ? renderFigure() : null}</div>;
}

export function GuideEnd() {
  const { endRef } = useGuide();
  return <div ref={endRef} className="h-px w-full" aria-hidden />;
}
