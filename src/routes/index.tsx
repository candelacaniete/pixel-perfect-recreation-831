import { createFileRoute } from "@tanstack/react-router";
import { WorldMap } from "@/components/safari/WorldMap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yrmis — A map of an impossible territory" },
      { name: "description", content: "The world of Yrmis Barroeta as one surreal map: Home, the CLICK river journey, the Studio, Ventures, 1•1•1 Signals and Work with me." },
      { property: "og:title", content: "Yrmis — A map of an impossible territory" },
      { property: "og:description", content: "Six landmarks, one river. Explore the Studio, Ventures, Signals and the CLICK experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <WorldMap />;
}
