import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";
const path = new URL("../lib/export-plan.ts", import.meta.url);
const source = ts.transpileModule(readFileSync(path, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const context = vm.createContext({ exports: {} });
vm.runInContext(source, context);
const { blankPlan, examplePlan, calculatePlan, readinessScore, isExportPlan } =
  context.exports;
const result = calculatePlan(examplePlan);
assert.equal(result.totalCost, 47000000);
assert.equal(result.revenue, 62500000);
assert.equal(result.margin, 15500000);
assert.equal(result.perUnit, 94000);
assert.equal(readinessScore(examplePlan.answers), 58);
assert.equal(readinessScore(Array(7).fill("yes")), 100);
assert.equal(readinessScore(Array(7).fill("unknown")), 0);
assert.equal(calculatePlan(blankPlan), null);
for (const quantity of ["0", "-1", "", "NaN", "Infinity"])
  assert.equal(calculatePlan({ ...examplePlan, quantity }), null);
for (const unitCost of ["-1", "", "abc", "Infinity"])
  assert.equal(calculatePlan({ ...examplePlan, unitCost }), null);
assert.equal(
  calculatePlan({ ...examplePlan, quantity: "1e308", unitPrice: "1e308" }),
  null,
);
assert.ok(calculatePlan({ ...examplePlan, unitPrice: "0" }).margin < 0);
assert.equal(calculatePlan({ ...examplePlan, unitPrice: "0" }).marginRate, 0);
assert.equal(isExportPlan(examplePlan), true);
for (const value of [
  null,
  {},
  { ...examplePlan, version: 2 },
  { ...examplePlan, answers: [] },
  { ...examplePlan, currency: "INVALID" },
  { ...examplePlan, quantity: 500 },
])
  assert.equal(isExportPlan(value), false);
console.log(
  "PASS: export costs, negative margins, readiness, invalid inputs, and saved-plan schema.",
);
