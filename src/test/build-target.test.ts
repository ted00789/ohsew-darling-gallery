import { describe, expect, it } from "vitest";
import { needsLovableAdapter } from "../../scripts/build-target";

describe("Hosting target compatibility", () => {
  it("keeps ordinary local builds static", () => {
    expect(needsLovableAdapter({})).toBe(false);
  });
  it("keeps GitHub Pages builds static", () => {
    expect(needsLovableAdapter({ GITHUB_ACTIONS: "true", CI: "true" })).toBe(false);
  });
  it("retains the adapter required by Lovable publishing", () => {
    expect(needsLovableAdapter({ LOVABLE_SANDBOX: "1" })).toBe(true);
  });
  it("recognizes the existing Lovable project environment", () => {
    expect(needsLovableAdapter({ DEV_SERVER__PROJECT_PATH: "/dev-server" })).toBe(true);
  });
});