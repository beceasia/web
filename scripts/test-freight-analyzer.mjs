import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";

const path = new URL("../lib/freight-analyzer.ts", import.meta.url);
const source = ts.transpileModule(readFileSync(path, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const context = vm.createContext({ exports: {}, Intl, Math, Number });
vm.runInContext(source, context);
const { estimateFreight } = context.exports;

const base = {
  mode: "air",
  region: "east-asia",
  cargoType: "general",
  serviceScope: "terminal-terminal",
  weightKg: 500,
  pieces: 5,
  lengthCm: 100,
  widthCm: 80,
  heightCm: 60,
  cargoValueUsd: 10_000,
  exchangeRate: 16_500,
};

const result = estimateFreight(base);
assert.equal(result.volumeCbm, 2.4);
assert.equal(result.volumetricWeight, 400);
assert.equal(result.chargeableWeight, 500);
assert.equal(result.billingBasis, "kg");
assert.ok(result.low.totalUsd < result.market.totalUsd);
assert.ok(result.market.totalUsd < result.high.totalUsd);
assert.equal(result.market.totalIdr, result.market.totalUsd * 16_500);

const volumetric = estimateFreight({ ...base, weightKg: 100 });
assert.equal(volumetric.chargeableWeight, 400);

const lcl = estimateFreight({ ...base, mode: "sea-lcl", serviceScope: "door-door" });
assert.equal(lcl.billingBasis, "cbm");
assert.equal(lcl.billingQuantity, 2.4);
assert.ok(lcl.market.destinationService > 0);
assert.ok(lcl.market.pickup > 0);

const perishable = estimateFreight({ ...base, cargoType: "perishable" });
assert.ok(perishable.market.totalUsd > result.market.totalUsd);

console.log("PASS: volumetric weight, mode basis, estimate bands, scope charges, cargo adjustment, and IDR conversion.");
