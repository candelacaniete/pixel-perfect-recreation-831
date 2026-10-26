import { createFileRoute } from "@tanstack/react-router";
import { VenturesPage } from "@/components/site/VenturesPage";

export const Route = createFileRoute("/ventures")({
  head: () => ({
    meta: [
      { title: "Entrepreneurial Ventures — Yrmis Barroeta" },
      { name: "description", content: "Mission Heirloom, All Black Sheep, (hĕm), and YRMIS." },
    ],
  }),
  component: VenturesPage,
});
