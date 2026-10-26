import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Yrmis Barroeta" },
      { name: "description", content: "Economist, founder, and keynote speaker. The long story, and press-kit photographs." },
    ],
  }),
  component: AboutPage,
});
