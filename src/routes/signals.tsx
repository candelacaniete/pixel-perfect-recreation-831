import { createFileRoute } from "@tanstack/react-router";
import { SignalsPage } from "@/components/site/SignalsPage";

export const Route = createFileRoute("/signals")({
  head: () => ({
    meta: [
      { title: "1•1•1 Signals — Yrmis Barroeta" },
      { name: "description", content: "Where tech meets human performance. Join 350K+ readers on Substack." },
    ],
  }),
  component: SignalsPage,
});
