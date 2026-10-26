import { createFileRoute } from "@tanstack/react-router";
import { PressPage } from "@/components/site/PressPage";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press kit — Yrmis Barroeta" },
      { name: "description", content: "Press kit, speaker materials, and a press inquiry." },
    ],
  }),
  component: PressPage,
});
