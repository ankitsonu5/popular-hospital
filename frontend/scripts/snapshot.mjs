// Usage: node scripts/snapshot.mjs <out.json> [baseUrl]
// Fetches every static content route and stores normalized HTML, so before/after
// comparisons prove the page output is unchanged.
import fs from "node:fs";
import { snapshotRoutes } from "./content-config.mjs";

const out = process.argv[2];
const base = process.argv[3] || "http://localhost:3000";
if (!out) throw new Error("out file required");

const normalize = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .trim();

const routes = snapshotRoutes();
const result = {};
let i = 0;
for (const route of routes) {
  i++;
  try {
    const res = await fetch(base + route, { signal: AbortSignal.timeout(180000) });
    const html = await res.text();
    result[route] = { status: res.status, html: normalize(html) };
    console.log(`[${i}/${routes.length}] ${res.status} ${route} (${html.length})`);
  } catch (e) {
    result[route] = { status: 0, html: "ERR " + e.message };
    console.log(`[${i}/${routes.length}] ERR ${route} ${e.message}`);
  }
}
fs.writeFileSync(out, JSON.stringify(result));
console.log("saved", out);
