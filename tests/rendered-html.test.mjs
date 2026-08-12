import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Akhil Madineni — AI &amp; Full-Stack Engineer<\/title>/i);
  assert.match(html, /AKHIL/);
  assert.match(html, /MADINENI/);
  assert.match(html, /AI \/ Full-Stack Engineer/);
  assert.match(html, /id="experience"/);
  assert.match(html, /id="ai-lab"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /Akhil_Madineni_Resume_AI_Engineering\.pdf/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the Matrix experience and accessibility controls in source", async () => {
  const [page, matrixRain, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/matrix-rain.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<MatrixRain \/>/);
  assert.match(page, /className="skip-link"/);
  assert.match(page, /href="#main"/);
  assert.match(page, /Download resume/);
  assert.match(matrixRain, /prefers-reduced-motion/);
  assert.match(matrixRain, /aria-label="Reduce motion"/);
  assert.match(matrixRain, /rain\.speed/);
  assert.match(matrixRain, /rain\.density/);
  assert.match(layout, /Akhil Madineni — AI & Full-Stack Engineer/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
});
