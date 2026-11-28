import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { prepareStaticSite } from "./scripts/static-site";
import { needsLovableAdapter } from "./scripts/build-target";

export default defineConfig({
  // Keep GitHub/local output static, but retain the adapter required by Lovable hosting.
  nitro: needsLovableAdapter(process.env),
  vite: { base: "/", build: { outDir: "dist" } },
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index",
        onSuccess: ({ html }: { html: string }) => prepareStaticSite(process.cwd(), html),
      },
    },
    prerender: { autoStaticPathsDiscovery: false },
  },
});
