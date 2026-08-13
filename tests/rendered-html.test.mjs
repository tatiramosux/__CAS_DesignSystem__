import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the CAS documentation shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>CAS Design System<\/title>/i);
  assert.match(html, /Build consistent products/);
  assert.match(html, /CarBrain · Light/);
  assert.match(html, /Foundations/);
  assert.match(html, /Components/);
  assert.match(html, /Patterns/);
  assert.match(html, /Resources/);
  assert.match(html, /--action:#003B76/);
});

test("keeps Figma variables as the canonical local source", async () => {
  const [source, integration, componentConfig] = await Promise.all([
    readFile(new URL("../app/data/variables.json", import.meta.url), "utf8"),
    readFile(new URL("../app/token-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../components.json", import.meta.url), "utf8"),
  ]);
  const variables = JSON.parse(source);
  const count = Object.values(variables).reduce((sum, collection) => sum + collection.variables.length, 0);
  assert.equal(count, 267);
  assert.match(integration, /resolveVariable/);
  assert.match(integration, /carbrain-light/);
  assert.match(integration, /carbrain-dark/);
  assert.match(integration, /brandx-light/);
  assert.equal(JSON.parse(componentConfig).style, "new-york");
});
