import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RiverJourney } from "@/components/safari/river/RiverJourney";
import { markVisited } from "@/components/safari/visited";

export const Route = createFileRoute("/click")({
  head: () => ({
    meta: [
      { title: "Experience CLICK — Click into your wild · Yrmis" },
      { name: "description", content: "Board a small boat down a river in the Venezuelan Llanos and meet the five guardians of CLICK." },
      { property: "og:title", content: "Experience CLICK — Click into your wild" },
      { property: "og:description", content: "A first-person river journey through Yrmis World: Curiosity, Labels into Lenses, Ingenuity, Criticism and Kickstart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClickPage,
});

function ClickPage() {
  useEffect(() => markVisited("click"), []);
  return (
    <main>
      <h1 className="sr-only">Experience CLICK — a river journey through the five instincts</h1>
      <RiverJourney />
    </main>
  );
}
