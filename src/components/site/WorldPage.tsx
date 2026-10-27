import { useEffect } from "react";
import { Shell } from "@/components/site/Shell";
import { WorldMap } from "@/components/safari/WorldMap";
import { markVisited } from "@/components/safari/visited";

export function WorldPage() {
  useEffect(() => markVisited("world"), []);
  return (
    <Shell>
      <main className="bg-night pt-16 text-paper">
        <WorldMap />
      </main>
    </Shell>
  );
}
