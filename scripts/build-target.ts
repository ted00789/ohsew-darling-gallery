// Lovable's published host expects its deployment adapter; GitHub Pages does not.
export function needsLovableAdapter(environment: Record<string, string | undefined>) {
  return environment["LOVABLE_SANDBOX"] === "1" || Boolean(environment["DEV_SERVER__PROJECT_PATH"]);
}