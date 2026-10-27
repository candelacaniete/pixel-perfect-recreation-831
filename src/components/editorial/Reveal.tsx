import { useEffect, useRef, useState, type ReactNode } from "react";

/** One entrance per block. Reduced motion, and the first paint, stay visible. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setShown(true);
      observer.disconnect();
    }, { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ll-reveal${shown ? " is-in" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
