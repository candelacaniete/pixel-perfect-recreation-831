import { createFileRoute } from "@tanstack/react-router";
import { RiverPage } from "@/components/site/RiverPage";

function riverStop(value: unknown) {
  const n = typeof value === "string" || typeof value === "number" ? Number(value) : Number.NaN;
  return Number.isInteger(n) && n >= 0 && n <= 4 ? n : undefined;
}

export const Route = createFileRoute("/river")({
  validateSearch: (search: Record<string, unknown>): { stop?: number } => {
    const stop = riverStop(search["stop"]);
    return stop == null ? {} : { stop };
  },
  head: () => ({
    meta: [
      { title: "The river — Yrmis Barroeta" },
      { name: "description", content: "A trip from the Llanos to CLICK. The existing river, with a separate arrival." },
    ],
  }),
  component: RiverRoute,
});

function RiverRoute() {
  const { stop } = Route.useSearch();
  return <RiverPage stop={stop} />;
}
