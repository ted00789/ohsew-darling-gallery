import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

// Build tooling only: these files serve the same client-rendered shell, not SSR pages.
export const staticRoutes = ["/", "/gallery", "/pricing", "/how-it-works", "/contact"] as const;

export async function prepareStaticSite(root: string, html: string) {
  const output = resolve(root, "dist/client");
  await mkdir(output, { recursive: true });
  await Promise.all(
    staticRoutes.map(async (route) => {
      const entry = resolve(output, `.${route}`, "index.html");
      await mkdir(dirname(entry), { recursive: true });
      await writeFile(entry, html);
    }),
  );
  await Promise.all([
    writeFile(resolve(output, "404.html"), html),
    writeFile(resolve(output, ".nojekyll"), ""),
    readFile(resolve(root, "CNAME")).then((domain) => writeFile(resolve(output, "CNAME"), domain)),
  ]);

  // Keep the existing image URLs unchanged, but include their bytes for non-Lovable hosting.
  const assetsDirectory = resolve(root, "src/assets");
  const pointers = (await readdir(assetsDirectory)).filter((name) => name.endsWith(".asset.json"));
  await Promise.all(
    pointers.map(async (name) => {
      const pointer: { url: string; content_type: string; size: number } = JSON.parse(
        await readFile(resolve(assetsDirectory, name), "utf8"),
      );
      if (!/^\/__l5e\/assets-v1\/[^/]+\/[^/]+$/.test(pointer.url) || pointer.url.includes("..")) {
        throw new Error(`Unsupported static asset URL in ${name}`);
      }
      const response = await fetch(new URL(pointer.url, "https://ohsew-darling-gallery.lovable.app"), {
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok || !response.headers.get("content-type")?.includes(pointer.content_type)) {
        throw new Error(`Could not package ${name}: HTTP ${response.status}`);
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.byteLength !== pointer.size) throw new Error(`Incomplete static asset: ${name}`);
      const destination = resolve(output, `.${pointer.url}`);
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, bytes);
    }),
  );
}