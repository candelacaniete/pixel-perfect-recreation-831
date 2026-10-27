import { describe, expect, it } from "vitest";
import { inquiryFromSearch } from "@/content/yrmis";
import { inquiryMessage, validateInquiry, type InquiryFields } from "@/lib/inquiry";

const blank: InquiryFields = {
  interest: "Speaking",
  name: "",
  email: "",
  message: "",
  organization: "",
  date: "",
  location: "",
  audience: "",
  project: "",
  challenge: "",
  timing: "",
  outlet: "",
  deadline: "",
};

describe("inquiry links", () => {
  it("preselects Speaking and Consulting Studio from the query", () => {
    expect(inquiryFromSearch("Speaking")).toBe("Speaking");
    expect(inquiryFromSearch("consulting studio")).toBe("Consulting Studio");
    expect(inquiryFromSearch("Communications strategy")).toBe("Communications strategy");
    expect(inquiryFromSearch("Press")).toBe("Press");
    expect(inquiryFromSearch("nope")).toBe("Consulting Studio");
    expect(inquiryFromSearch(undefined)).toBe("Consulting Studio");
  });

  it("asks for the speaking fields and packs them into the message", () => {
    const fields: InquiryFields = {
      ...blank,
      name: "Ada",
      email: "ada@example.com",
      message: "A summit in May.",
      organization: "North Lab",
      date: "2026-05-12",
      location: "Virtual",
      audience: "Two hundred managers",
    };
    expect(validateInquiry(fields)).toEqual({});
    expect(validateInquiry({ ...fields, email: "ada" }).email).toBeTruthy();
    expect(inquiryMessage(fields)).toContain("Organization: North Lab");
    expect(inquiryMessage(fields)).toContain("A summit in May.");
  });

  it("asks a press inquiry for the outlet and the deadline", () => {
    const fields: InquiryFields = { ...blank, interest: "Press", name: "Ada", email: "ada@example.com", message: "A profile." };
    expect(validateInquiry(fields).outlet).toBeTruthy();
    expect(validateInquiry({ ...fields, outlet: "Chronicle", deadline: "Friday" })).toEqual({});
  });
});
