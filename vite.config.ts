import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { prepareStaticSite } from "./scripts/static-site";

export default defineConfig({
  nitro: false,
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
