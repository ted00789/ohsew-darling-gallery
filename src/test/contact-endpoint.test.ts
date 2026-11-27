import { describe, expect, it } from "vitest";
import { FORM_ENDPOINT } from "@/routes/contact";

describe("Static contact submission", () => {
  it("uses the exact requested placeholder Formspree endpoint", () => {
    expect(FORM_ENDPOINT).toBe("https://formspree.io/f/YOUR_FORM_ID");
  });
});