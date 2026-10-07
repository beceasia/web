import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";

const path = new URL("../lib/freight-analyzer.ts", import.meta.url);
const source = ts.transpileModule(readFileSync(path, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const context = vm.createContext({ exports: {}, crypto: { randomUUID: () => "test-id" }, Intl, Date, Math });
vm.runInContext(source, context);
const { parseFreightQuote, calculateFreight, selectRateBreak, scopeCoverage, requiredDocuments } = context.exports;

const text = `Route: Jakarta (CGK) -> Incheon (ICN)
Mode: Air Freight
Commodity: Seafood
+45 kg: Rp43.600/kg
+100 kg: Rp36.800/kg
+300 kg: Rp30.400/kg
+500 kg: Rp29.500/kg
+1000 kg: Rp28.800/kg
PPN: 1,1%
Incoming fee: Rp4.700/kg
Included: AWB, origin handling, X-Ray, PEB/NPE
Not included: pickup, destination handling, customs Korea, trucking at destination
Term: DDU`;

const quote = parseFreightQuote(text, "Forwarder A");
assert.equal(quote.originCode, "CGK");
assert.equal(quote.destinationCode, "ICN");
assert.equal(quote.mode, "Air");
assert.equal(quote.rateBreaks.length, 5);
assert.equal(quote.vatPercent, 1.1);
assert.equal(quote.incomingRate, 4700);
assert.equal(quote.scope.awb, "included");
assert.equal(quote.scope.destinationCustoms, "excluded");
assert.equal(quote.incoterm, "DDU");
assert.equal(selectRateBreak(quote.rateBreaks, 475).threshold, 300);
assert.equal(selectRateBreak(quote.rateBreaks, 500).threshold, 500);
assert.equal(selectRateBreak(quote.rateBreaks, 850).threshold, 500);
assert.equal(selectRateBreak(quote.rateBreaks, 1000).threshold, 1000);

const result = calculateFreight(quote, 500, { pieces: 0, lengthCm: 0, widthCm: 0, heightCm: 0 }, true, 0, 5000);
assert.equal(result.selectedBreak.threshold, 500);
assert.equal(result.freight, 14_750_000);
assert.equal(result.incoming, 2_350_000);
assert.equal(result.total, 17_288_100);
assert.equal(result.effectivePerKg, 34_576.2);
assert.ok(scopeCoverage(quote.scope).score < 100);
assert.ok(requiredDocuments("Frozen seafood").includes("Health Certificate"));

console.log("PASS: parsing, weight breaks, taxes, incoming fees, scope, and document rules.");
