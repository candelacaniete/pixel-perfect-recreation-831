import { useEffect, useRef } from "react";
import { assetUrl } from "@/lib/asset-url";
import pumaWalk from "@/assets/videos/puma-walk.mp4.asset.json";

/** The walking film has a flat red field. Key it out so the puma stands on the canyon. */
export function KeyedPuma({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = document.createElement("video");
    video.src = assetUrl(pumaWalk);
    video.muted = true;
    video.loop = !reduced;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    let raf = 0;
    let stopped = false;

    const paint = () => {
      if (stopped) return;
      if (video.readyState >= 2) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.drawImage(video, 0, 0, w, h);
        const frame = ctx.getImageData(0, 0, w, h);
        const data = frame.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          if (g < 72 && b < 72 && r > 140 && r - g > 80) {
            const edge = Math.min(g, b);
            const t = edge > 46 ? (72 - edge) / 26 : 1;
            data[i + 3] = Math.round((data[i + 3] ?? 255) * (1 - Math.min(1, t)));
          }
        }
        ctx.putImageData(frame, 0, 0);
        if (reduced) return;
      }
      raf = requestAnimationFrame(paint);
    };

    const start = () => {
      void video.play().catch(() => undefined);
      paint();
    };
    video.addEventListener("loadeddata", start, { once: true });
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={360}
      aria-label="A puma walking the near bank of the canyon"
      className={className}
    />
  );
}
