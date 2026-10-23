import { createFileRoute } from "@tanstack/react-router";
import { RiverJourney } from "@/components/safari/river/RiverJourney";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yrmis — Click into your wild" },
      { name: "description", content: "Board a small boat down a river in the Venezuelan Llanos and meet the five guardians of CLICK." },
      { property: "og:title", content: "Yrmis — Click into your wild" },
      { property: "og:description", content: "A first-person river journey through Yrmis's world: CLICK, the Studio, Ventures and 1•1•1 Signals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <h1 className="sr-only">Yrmis — a river journey through CLICK, the Studio, Ventures and Signals</h1>
      <RiverJourney />
    </main>
  );
}
