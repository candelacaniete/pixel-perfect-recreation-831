import { describe, expect, it } from "vitest";
import { inquiryFromSearch } from "@/content/yrmis";

describe("inquiry links", () => {
  it("preselects Speaking and Consulting Studio from the query", () => {
    expect(inquiryFromSearch("Speaking")).toBe("Speaking");
    expect(inquiryFromSearch("consulting studio")).toBe("Consulting Studio");
    expect(inquiryFromSearch("Communications strategy")).toBe("Communications strategy");
    expect(inquiryFromSearch("Press")).toBe("Press");
    expect(inquiryFromSearch("nope")).toBe("Consulting Studio");
    expect(inquiryFromSearch(undefined)).toBe("Consulting Studio");
  });
});
