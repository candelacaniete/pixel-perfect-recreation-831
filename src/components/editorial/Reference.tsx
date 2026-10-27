import type { ReactNode } from "react";

export function Band({ src, children, tall = false }: { src: string; children: ReactNode; tall?: boolean }) {
  return (
    <section className={tall ? "yw-dusk band-tall" : "yw-dusk"}>
      <img src={src} alt="" />
      <div className="yw-dusk-copy">{children}</div>
    </section>
  );
}
