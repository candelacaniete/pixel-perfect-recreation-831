import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { WorldMap } from "@/components/safari/WorldMap";
import { markVisited } from "@/components/safari/visited";

export function WorldPage() {
  useEffect(() => markVisited("world"), []);
  return (
    <Shell>
      <main className="yw-offset bg-night text-paper">
        <WorldMap />
      </main>
    </Shell>
  );
}
