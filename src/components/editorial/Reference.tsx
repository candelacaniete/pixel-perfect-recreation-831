import type { ReactNode } from "react";
import dusk from "@/assets/reference/ref-dusk-llanos.jpg";

export function DuskClose({ children }: { children: ReactNode }) {
  return (
    <section className="yw-dusk">
      <img src={dusk} alt="" />
      <div className="yw-dusk-copy">{children}</div>
    </section>
  );
}
