import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/ContactPage";
import { inquiryFromSearch, type InquiryType } from "@/content/yrmis";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { interest: InquiryType } => ({
    interest: inquiryFromSearch(search["interest"]),
  }),
  head: () => ({
    meta: [
      { title: "Contact — Yrmis Barroeta" },
      { name: "description", content: "Start a project or event inquiry. The form does not send; the published email does." },
    ],
  }),
  component: ContactRoute,
});

function ContactRoute() {
  const { interest } = Route.useSearch();
  return <ContactPage interest={interest} />;
}
