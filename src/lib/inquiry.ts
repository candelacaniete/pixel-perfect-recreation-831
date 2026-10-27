import type { InquiryType } from "@/content/yrmis";

export type InquiryFields = {
  interest: InquiryType;
  name: string;
  email: string;
  message: string;
  organization: string;
  date: string;
  location: string;
  audience: string;
  project: string;
  challenge: string;
  timing: string;
  outlet: string;
  deadline: string;
};

export function validateInquiry(fields: InquiryFields) {
  const errors: Partial<Record<keyof InquiryFields, string>> = {};
  if (!fields.name.trim()) errors.name = "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Add a valid email.";
  if (!fields.message.trim()) errors.message = "Say what you need.";
  if (fields.interest === "Speaking") {
    if (!fields.organization.trim()) errors.organization = "Add the organization.";
    if (!fields.date.trim()) errors.date = "Add the event date.";
    if (!fields.location.trim()) errors.location = "Add the location, or say it is virtual.";
    if (!fields.audience.trim()) errors.audience = "Describe the audience.";
  } else if (fields.interest === "Press") {
    if (!fields.outlet.trim()) errors.outlet = "Add the publication or outlet.";
    if (!fields.deadline.trim()) errors.deadline = "Add the deadline.";
  } else {
    if (!fields.project.trim()) errors.project = "Add the company or project.";
    if (!fields.challenge.trim()) errors.challenge = "Describe the challenge.";
    if (!fields.timing.trim()) errors.timing = "Add the timing.";
  }
  return errors;
}

/** Packs the fields the table does not have into the message body. */
export function inquiryMessage(fields: InquiryFields) {
  const lines = [`Inquiry: ${fields.interest}`];
  const extra: Array<[string, string]> = [
    ["Organization", fields.organization],
    ["Event date", fields.date],
    ["Location", fields.location],
    ["Audience", fields.audience],
    ["Company / project", fields.project],
    ["Challenge", fields.challenge],
    ["Timing", fields.timing],
    ["Outlet", fields.outlet],
    ["Deadline", fields.deadline],
  ];
  for (const [label, value] of extra) {
    if (value.trim()) lines.push(`${label}: ${value.trim()}`);
  }
  lines.push("", fields.message.trim());
  return lines.join("\n");
}
