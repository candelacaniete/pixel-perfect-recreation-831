import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yrmis Barroeta" },
      { name: "description", content: "New territory. Bring what you know. Speaking, Consulting Studio, and 1•1•1 Signals." },
      { property: "og:title", content: "Yrmis Barroeta" },
      { property: "og:description", content: "Speaking, Consulting Studio, and 1•1•1 Signals." },
    ],
  }),
  component: HomePage,
});
