import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const html = readFileSync(fileURLToPath(new URL("../public/apps/kalkulator-sawit/index.html", import.meta.url)), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
// Compile the complete inline app, then exercise its actual calculation functions
// without network requests, browser storage, or page event listeners.
new vm.Script(script);
const elements = new Map();
const element = (id) => {
  if (!elements.has(id)) elements.set(id, { value: "", textContent: "", innerHTML: "", disabled: false });
  return elements.get(id);
};
const context = vm.createContext({
  document: { getElementById: element },
  localStorage: { getItem: () => null },
  crypto: { randomUUID },
  console,
});
vm.runInContext(script.split("// EVENT LISTENERS")[0], context);
const data = vm.runInContext("DATA", context);
const months = [
  { month: "September 2026", price: 1007.51, bk: 148, levy: 125.93875, column: 8, regulation: 1777 },
  { month: "Oktober 2026", price: 1042.15, bk: 178, levy: 130.26875, column: 9, regulation: 1921 },
];
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-7, `${actual} != ${expected}`);
function calculate(month, product = "CPO", hs = "1511.10.00", volume = "100") {
  Object.entries({ bulan: month, produk: product, hs, volume, kurs: "17000", tanggal: "2026-10-01", satuan: "MT" })
    .forEach(([id, value]) => { element(id).value = value; });
  context.autoLookup();
  return context.calculate();
}

context.fillSelects();
assert.equal(element("bulan").value, "Oktober 2026");
for (const { month, price, bk, levy, column, regulation } of months) {
  const rows = data.hpe.filter(row => row.Bulan === month);
  assert.equal(rows.length, data.hpe.filter(row => row.Bulan === "Agustus 2026").length);
  for (const product of data.master) {
    for (const hs of product["HS Code"].split(";")) {
      const row = context.findHpe(month, product.Produk, hs);
      assert.ok(row, `${month}: missing ${product.Produk} / ${hs}`);
      assert.equal(row["HPE USD/MT"], price);
      assert.equal(row["Nomor Regulasi"], `Kepmen Perdagangan ${regulation} Tahun 2026`);
    }
  }
  assert.equal(new Set(rows.map(row => row["Lookup Key"])).size, rows.length);
  assert.ok(data.regulasi.some(row => row["Nomor regulasi"] === `Kepmen Perdagangan ${regulation} Tahun 2026`));
  for (const volume of [1, 100]) {
    const result = calculate(month, "CPO", "1511.10.00", String(volume));
    assert.equal(result.isValid, true);
    assert.equal(result.hpe, price);
    close(result.nilaiBk, volume * bk);
    close(result.nilaiPungutan, volume * levy);
    close(result.total, volume * (bk + levy));
    close(result.totalIdr, result.total * 17000);
    assert.ok(result.kolomBk.includes(`angka ${column} `));
    assert.ok(element("monthNotice").textContent.includes(month));
    assert.ok(element("monthNotice").textContent.includes(`angka ${column} `));
    assert.equal(element("btnTambah").disabled, false);
  }
  const fixedLevy = calculate(month, "Palm Kernel Shell", "ex1404.90.91");
  assert.equal(fixedLevy.isValid, true);
  close(fixedLevy.nilaiPungutan, 500);
  const pfad = calculate(month, "PFAD", "3823.19.20");
  assert.equal(pfad.isValid, true);
  close(pfad.nilaiPungutan, 100 * price * 0.12);
}

// Existing months and missing-data safeguards must continue to work.
assert.equal(calculate("Agustus 2026").hpe, 996.52);
close(calculate("Agustus 2026").nilaiPungutan, 12456.5);
for (const result of [calculate("November 2026"), calculate("Oktober 2026", "CPO", "unknown"), calculate("Oktober 2026", "CPO", "1511.10.00", "0")]) {
  assert.equal(result.isValid, false);
  assert.equal(result.total, 0);
}
assert.equal(element("btnTambah").disabled, true);
console.log("Palm oil calculator checks passed: monthly coverage, official CPO amounts, tariff columns, fixed/percentage levies, and validation.");
