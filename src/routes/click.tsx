import { createFileRoute } from "@tanstack/react-router";
import { ClickPage } from "@/components/site/ClickPage";

export const Route = createFileRoute("/click")({
  head: () => ({
    meta: [
      { title: "CLICK — Yrmis Barroeta" },
      { name: "description", content: "What can be done better? Five squares, three examples, and a small local exercise." },
    ],
  }),
  component: ClickPage,
});
