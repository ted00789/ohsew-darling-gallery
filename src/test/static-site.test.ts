import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { prepareStaticSite } from "../../scripts/static-site";

let root: string | undefined;

afterEach(async () => {
  vi.unstubAllGlobals();
  if (root) await rm(root, { recursive: true, force: true });
});

async function fixture() {
  root = await mkdtemp(resolve(tmpdir(), "ohsew-static-"));
  await mkdir(resolve(root, "src/assets"), { recursive: true });
  await writeFile(resolve(root, "CNAME"), "example.test\n");
  return root;
}

describe("Static hosting output", () => {
  it.each(["index.html", "gallery/index.html", "pricing/index.html", "how-it-works/index.html", "contact/index.html", "404.html"])(
    "writes the same client shell to %s without a rewrite server",
    async (entry) => {
      const directory = await fixture();
      await prepareStaticSite(directory, "client-shell-fixture");
      expect(await readFile(resolve(directory, "dist/client", entry), "utf8")).toBe("client-shell-fixture");
    },
  );

  it("preserves the custom domain and disables Jekyll for underscore asset paths", async () => {
    const directory = await fixture();
    await prepareStaticSite(directory, "client-shell-fixture");
    expect(await readFile(resolve(directory, "dist/client/CNAME"), "utf8")).toBe("example.test\n");
    expect(await readFile(resolve(directory, "dist/client/.nojekyll"), "utf8")).toBe("");
  });

  it("packages pointer assets at their existing root-relative URL", async () => {
    const directory = await fixture();
    const url = "/__l5e/assets-v1/test/photo.webp";
    await writeFile(resolve(directory, "src/assets/photo.webp.asset.json"), JSON.stringify({ url, content_type: "image/webp", size: 3 }));
    const fetchMock = vi.fn().mockResolvedValue(new Response(new Uint8Array([1, 2, 3]), { headers: { "content-type": "image/webp" } }));
    vi.stubGlobal("fetch", fetchMock);
    await prepareStaticSite(directory, "client-shell-fixture");
    expect(fetchMock.mock.calls[0]?.[0]?.toString()).toBe(`https://ohsew-darling-gallery.lovable.app${url}`);
    expect([...await readFile(resolve(directory, "dist/client", `.${url}`))]).toEqual([1, 2, 3]);
  });

  it("fails the build instead of shipping a broken image when download fails", async () => {
    const directory = await fixture();
    await writeFile(resolve(directory, "src/assets/photo.webp.asset.json"), JSON.stringify({ url: "/__l5e/assets-v1/test/photo.webp", content_type: "image/webp", size: 3 }));
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 404 })));
    await expect(prepareStaticSite(directory, "client-shell-fixture")).rejects.toThrow("HTTP 404");
  });
});