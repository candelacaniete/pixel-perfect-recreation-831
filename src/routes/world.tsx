import { createFileRoute } from "@tanstack/react-router";
import { WorldPage } from "@/components/site/WorldPage";

export const Route = createFileRoute("/world")({
  head: () => ({
    meta: [
      { title: "Yrmis World" },
      { name: "description", content: "An optional map of speaking, the river, ventures, and 1•1•1 Signals." },
    ],
  }),
  component: WorldPage,
});
