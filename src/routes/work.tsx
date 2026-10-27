import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "@/components/site/WorkPage";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work with me — Yrmis Barroeta" },
      { name: "description", content: "Consulting Studio: founders, executive teams, institutions, and communications strategy." },
    ],
  }),
  component: WorkPage,
});
