import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Yrmis Barroeta" },
      { name: "description", content: "New territory. Bring what you know." },
    ],
  }),
  component: HomePage,
});
