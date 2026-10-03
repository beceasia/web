import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import vm from "node:vm";
const modules = new Map();
function load(path) {
  const filename = resolve(path);
  if (modules.has(filename)) return modules.get(filename);
  const exports = {};
  modules.set(filename, exports);
  const source = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const require = (specifier) =>
    load(
      specifier.startsWith("@/")
        ? `${specifier.slice(2)}.ts`
        : resolve(filename, "..", `${specifier}.ts`),
    );
  vm.runInNewContext(source, { exports, require }, { filename });
  return exports;
}
const { catalog, appMatchesSearch, resourceResults } = load("lib/search.ts");
const { filterMarketRecords } = load("data/export-intelligence.ts");
assert.ok(
  catalog
    .filter((app) => appMatchesSearch(app, "kakao"))
    .some((app) => app.slug === "btki-smart-search"),
);
for (const locale of ["id", "en", "zh"]) {
  assert.ok(
    resourceResults("kakao", locale).some(
      (item) => item.path === "/export-os/intelligence",
    ),
  );
  assert.ok(
    resourceResults("Hong Kong", locale).some(
      (item) => item.path === "/market-intelligence/hong-kong",
    ),
  );
  assert.equal(resourceResults("xyz-no-matching-result", locale).length, 0);
}
assert.equal(resourceResults("   ", "id").length, 0);
assert.ok(
  catalog
    .filter((app) => appMatchesSearch(app, "HS"))
    .some((app) => app.slug === "btki-smart-search"),
);
assert.ok(filterMarketRecords("kakao").length > 0);
assert.ok(filterMarketRecords("cacao").length > 0);
assert.ok(filterMarketRecords("kopi jepang").length > 0);
assert.ok(filterMarketRecords("咖啡").length > 0);
assert.equal(filterMarketRecords("random-unmatched").length, 0);
assert.equal(new Set(catalog.map((app) => app.slug)).size, catalog.length);
console.log(
  "PASS: multilingual product synonyms, market guides, combined search, empty results, and unique catalog entries.",
);
