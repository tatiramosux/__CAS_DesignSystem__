import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import test from "node:test";

const PORT = 3100 + (process.pid % 300);
const ROOT = new URL("..", import.meta.url);

function waitForReady(server) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timeout = setTimeout(() => { cleanup(); reject(new Error(`Timed out waiting for Next.js server. Output so far:\n${output}`)); }, 20000);
    const onData = (chunk) => { output += chunk.toString(); if (/Ready in/i.test(output)) { cleanup(); resolve(); } };
    const onError = (err) => { cleanup(); reject(err); };
    function cleanup() { clearTimeout(timeout); server.stdout.off("data", onData); server.stderr.off("data", onData); server.off("error", onError); }
    server.stdout.on("data", onData);
    server.stderr.on("data", onData);
    server.on("error", onError);
  });
}

async function withServer(fn) {
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: ROOT, stdio: "pipe" });
  try {
    await waitForReady(server);
    return await fn(`http://localhost:${PORT}`);
  } finally {
    server.kill();
  }
}

test("server-renders the CAS documentation shell", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/`, { headers: { accept: "text/html" } });
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
});

test("keeps Figma variables as the canonical local source", async () => {
  const [source, integration, componentConfig] = await Promise.all([
    readFile(new URL("../app/data/variables.json", import.meta.url), "utf8"),
    readFile(new URL("../app/token-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../components.json", import.meta.url), "utf8"),
  ]);
  const variables = JSON.parse(source);
  const count = Object.values(variables).reduce((sum, collection) => sum + collection.variables.length, 0);
  assert.equal(count, 299);
  assert.match(integration, /resolveVariable/);
  assert.match(integration, /carbrain-light/);
  assert.match(integration, /carbrain-dark/);
  assert.match(integration, /brandx-light/);
  assert.equal(JSON.parse(componentConfig).style, "new-york");
});
