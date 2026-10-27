import { createFileRoute } from "@tanstack/react-router";
import { SpeakingPage } from "@/components/site/SpeakingPage";

export const Route = createFileRoute("/speaking")({
  head: () => ({
    meta: [
      { title: "Speaking — Yrmis Barroeta" },
      { name: "description", content: "CLICK into Wild Innovation. A keynote, five approaches, and an event inquiry." },
    ],
  }),
  component: SpeakingPage,
});
