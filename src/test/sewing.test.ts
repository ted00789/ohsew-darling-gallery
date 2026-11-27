import { describe, expect, it } from "vitest";
import {
  contactSchema,
  contactSearchSchema,
  similarDescription,
  categories,
} from "@/lib/sewing";

describe("Custom requests", () => {
  it("prefills the description with the requested item and customization option", () => {
    expect(similarDescription("Mint gingham flutter dress")).toBe(
      "I’d like something similar to Mint gingham flutter dress (or based on this design but with different colors/details).",
    );
  });
  it("requires a name", () => {
    expect(
      contactSchema.safeParse({
        name: "",
        email: "test@example.com",
        phone: "",
        description: "A dress",
      }).success,
    ).toBe(false);
  });
  it("requires a valid email", () => {
    expect(
      contactSchema.safeParse({
        name: "Sarah",
        email: "invalid",
        phone: "",
        description: "A dress",
      }).success,
    ).toBe(false);
  });
  it("requires a description", () => {
    expect(
      contactSchema.safeParse({
        name: "Sarah",
        email: "test@example.com",
        phone: "",
        description: "  ",
      }).success,
    ).toBe(false);
  });
  it("accepts an omitted phone number as an empty field", () => {
    expect(
      contactSchema.safeParse({
        name: "Sarah",
        email: "test@example.com",
        phone: "",
        description: "A dress",
      }).success,
    ).toBe(true);
  });
  it("preserves a valid request description in search", () => {
    expect(contactSearchSchema.parse({ description: "A pink bow" }).description).toBe("A pink bow");
  });
  it("includes all seven requested gallery categories", () => {
    expect(categories).toEqual([
      "Kids’ Clothing",
      "Hair Accessories",
      "Home Decor",
      "Birthday",
      "Quilts & Larger Pieces",
      "Embroidery & Appliqué",
      "Bookmarks & Small Items",
    ]);
  });
});
