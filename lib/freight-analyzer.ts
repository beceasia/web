export type FreightLocale = "id" | "en" | "zh";
export type ChargeStatus = "included" | "excluded" | "unclear";

export type RateBreak = {
  threshold: number;
  rate: number;
  currency: "IDR" | "USD";
};

export type ScopeKey =
  | "awb"
  | "handling"
  | "exportCustoms"
  | "xray"
  | "pickup"
  | "destinationHandling"
  | "destinationCustoms"
  | "delivery";

export type FreightScope = Record<ScopeKey, ChargeStatus>;

export type FreightQuote = {
  id: string;
  label: string;
  rawText: string;
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  mode: "Air" | "Sea" | "Land" | "Unknown";
  commodity: string;
  carrier: string;
  transitTime: string;
  validity: string;
  incoterm: string;
  vatPercent: number;
  incomingRate: number;
  rateBreaks: RateBreak[];
  scope: FreightScope;
  notes: string[];
  createdAt: string;
};

export type PackageDimensions = {
  pieces: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
};

export type FreightCalculation = {
  actualWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
  billedWeight: number;
  selectedBreak: RateBreak | null;
  freight: number;
  freightVat: number;
  incoming: number;
  incomingVat: number;
  additionalCharges: number;
  total: number;
  effectivePerKg: number;
  effectivePerUnit: number;
};

export const scopeKeys: ScopeKey[] = [
  "awb",
  "handling",
  "exportCustoms",
  "xray",
  "pickup",
  "destinationHandling",
  "destinationCustoms",
  "delivery",
];

const scopePatterns: Record<ScopeKey, RegExp[]> = {
  awb: [/\bawb\b/i, /air\s*waybill/i],
  handling: [/origin\s+handling/i, /handling\s+(?:fee|charge)/i],
  exportCustoms: [/\bpeb\b/i, /\bnpe\b/i, /export\s+customs/i, /customs\s+clearance\s+(?:origin|export)/i],
  xray: [/x[\s-]?ray/i, /screening/i],
  pickup: [/pick[\s-]?up/i, /collection/i, /door\s+to\s+airport/i],
  destinationHandling: [/destination\s+handling/i, /terminal\s+handling\s+(?:destination|arrival)/i],
  destinationCustoms: [/destination\s+customs/i, /customs\s+(?:in\s+)?korea/i, /import\s+clearance/i],
  delivery: [/delivery\s+(?:to|at)\s+(?:buyer|warehouse)/i, /final\s+delivery/i, /trucking\s+(?:at|in)\s+destination/i, /door\s+to\s+door/i],
};

const exclusionPattern = /not\s+included|exclude(?:d|s)?|belum\s+termasuk|tidak\s+termasuk|di\s+luar|excluded|不包含|未包含/i;
const inclusionPattern = /included|include(?:d|s)?|sudah\s+termasuk|termasuk|inclusive|包含|已包含/i;

export function parseFreightQuote(rawText: string, label = "Quotation") : FreightQuote {
  const text = normalizeText(rawText);
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const route = parseRoute(text, lines);
  const mode = /\bair\s*(?:freight|cargo)?\b|via\s+air|航空/i.test(text)
    ? "Air"
    : /\bsea\s*(?:freight|cargo)?\b|ocean\s+freight|海运/i.test(text)
      ? "Sea"
      : /\bland\s*(?:freight|cargo)?\b|trucking|road\s+freight|陆运/i.test(text)
        ? "Land"
        : "Unknown";
  const commodity = captureField(text, ["commodity", "komoditas", "goods", "product", "品名", "货物"]) || "-";
  const carrier = captureField(text, ["carrier", "airline", "shipping line", "maskapai", "承运人"]) || "-";
  const transitTime = capturePattern(text, /(?:transit(?:\s+time)?|estimasi\s+transit|tt)\s*[:\-]?\s*([^\n]+)/i) || "-";
  const validity = capturePattern(text, /(?:validity|valid\s+until|berlaku(?:\s+sampai)?|有效期)\s*[:\-]?\s*([^\n]+)/i) || "-";
  const incoterm = findIncoterm(text);
  const vatPercent = parsePercent(text, /(?:ppn|vat|tax)\s*[:=]?\s*([\d.,]+)\s*%/i);
  const incomingRate = parseNamedRate(text, /(?:incoming\s*(?:fee|handling)?|biaya\s+incoming)[^\n\r]{0,30}?(?:rp|idr)\s*([\d.,]+)\s*(?:\/|per)\s*kg/i);
  const rateBreaks = parseRateBreaks(text);
  const scope = parseScope(lines);
  const notes: string[] = [];

  if (!rateBreaks.length) notes.push("rate-break-not-found");
  if (incomingRate > 0 && rateBreaks.some((rate) => rate.currency !== "IDR")) notes.push("mixed-currency");
  if (incoterm === "DDU") notes.push("legacy-ddu");
  if (scope.destinationCustoms !== "included" || scope.delivery !== "included") notes.push("destination-cost-incomplete");
  if (mode === "Unknown") notes.push("mode-unclear");

  return {
    id: createId(),
    label,
    rawText,
    origin: route.origin,
    destination: route.destination,
    originCode: route.originCode,
    destinationCode: route.destinationCode,
    mode,
    commodity,
    carrier,
    transitTime,
    validity,
    incoterm,
    vatPercent,
    incomingRate,
    rateBreaks,
    scope,
    notes,
    createdAt: new Date().toISOString(),
  };
}

export function calculateFreight(
  quote: FreightQuote,
  actualWeight: number,
  dimensions: PackageDimensions,
  includeIncoming: boolean,
  additionalCharges: number,
  units: number,
): FreightCalculation {
  const volumetricDivisor = quote.mode === "Air" ? 6000 : quote.mode === "Sea" ? 1000000 : 4000;
  const volumetricWeight = dimensions.pieces > 0
    ? (dimensions.pieces * dimensions.lengthCm * dimensions.widthCm * dimensions.heightCm) / volumetricDivisor
    : 0;
  const chargeableWeight = Math.ceil(Math.max(0, actualWeight, volumetricWeight));
  const selectedBreak = selectRateBreak(quote.rateBreaks, chargeableWeight);
  const billedWeight = selectedBreak ? Math.max(chargeableWeight, selectedBreak.threshold) : chargeableWeight;
  const freight = selectedBreak ? billedWeight * selectedBreak.rate : 0;
  const freightVat = freight * Math.max(0, quote.vatPercent) / 100;
  const incoming = includeIncoming && selectedBreak?.currency !== "USD" ? billedWeight * Math.max(0, quote.incomingRate) : 0;
  const incomingVat = incoming * Math.max(0, quote.vatPercent) / 100;
  const safeAdditional = Math.max(0, additionalCharges);
  const total = freight + freightVat + incoming + incomingVat + safeAdditional;

  return {
    actualWeight: Math.max(0, actualWeight),
    volumetricWeight,
    chargeableWeight,
    billedWeight,
    selectedBreak,
    freight,
    freightVat,
    incoming,
    incomingVat,
    additionalCharges: safeAdditional,
    total,
    effectivePerKg: actualWeight > 0 ? total / actualWeight : 0,
    effectivePerUnit: units > 0 ? total / units : 0,
  };
}

export function selectRateBreak(rateBreaks: RateBreak[], weight: number) {
  const sorted = [...rateBreaks].sort((a, b) => a.threshold - b.threshold);
  if (!sorted.length) return null;
  return [...sorted].reverse().find((item) => weight >= item.threshold) ?? sorted[0];
}

export function scopeCoverage(scope: FreightScope) {
  const included = scopeKeys.filter((key) => scope[key] === "included").length;
  const excluded = scopeKeys.filter((key) => scope[key] === "excluded").length;
  return { included, excluded, unclear: scopeKeys.length - included - excluded, score: Math.round((included / scopeKeys.length) * 100) };
}

export function inferServiceScope(scope: FreightScope) {
  if (scope.pickup === "included" && scope.delivery === "included") return "Door to Door";
  if (scope.pickup === "included") return "Door to Airport";
  if (scope.delivery === "included") return "Airport to Door";
  return "Airport to Airport";
}

export function requiredDocuments(commodity: string) {
  const baseline = ["AWB", "Commercial Invoice", "Packing List"];
  const lower = commodity.toLowerCase();
  if (/seafood|fish|shrimp|ikan|udang|makanan|food|frozen|水产|食品/.test(lower)) {
    return [...baseline, "Certificate of Origin", "Health Certificate"];
  }
  if (/wood|timber|furniture|kayu|木/.test(lower)) return [...baseline, "Certificate of Origin", "Timber legality document"];
  return [...baseline, "Certificate of Origin"];
}

export function clarificationQuestions(quote: FreightQuote, locale: FreightLocale) {
  const t = questionCopy[locale];
  const questions: string[] = [];
  if (quote.incoterm === "DDU") questions.push(t.ddu);
  if (quote.scope.awb !== "included") questions.push(t.awb);
  if (quote.scope.exportCustoms !== "included") questions.push(t.exportCustoms);
  if (quote.scope.destinationHandling !== "included") questions.push(t.destinationHandling);
  if (quote.scope.destinationCustoms !== "included" || quote.scope.delivery !== "included") questions.push(t.destinationScope);
  if (quote.validity === "-") questions.push(t.validity);
  return questions;
}

export function formatMoney(value: number, currency: "IDR" | "USD", locale: FreightLocale = "id") {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function parseRateBreaks(text: string) {
  const matches: RateBreak[] = [];
  const expressions = [
    /(?:\+|above\s*)?\s*([\d.,]+)\s*kg[^\n\r]{0,45}?(rp|idr|usd|\$)\s*([\d.,]+)\s*(?:\/|per)\s*kg/gi,
    /(rp|idr|usd|\$)\s*([\d.,]+)\s*(?:\/|per)\s*kg[^\n\r]{0,45}?(?:\+|above\s*)?\s*([\d.,]+)\s*kg/gi,
  ];
  for (const [index, expression] of expressions.entries()) {
    for (const match of text.matchAll(expression)) {
      const thresholdRaw = index === 0 ? match[1] : match[3];
      const currencyRaw = index === 0 ? match[2] : match[1];
      const rateRaw = index === 0 ? match[3] : match[2];
      const currency = /usd|\$/i.test(currencyRaw) ? "USD" : "IDR";
      const threshold = parseLocalizedNumber(thresholdRaw, "IDR");
      const rate = parseLocalizedNumber(rateRaw, currency);
      if (threshold > 0 && rate > 0 && !matches.some((item) => item.threshold === threshold && item.rate === rate)) {
        matches.push({ threshold, rate, currency });
      }
    }
  }
  return matches.sort((a, b) => a.threshold - b.threshold);
}

function parseRoute(text: string, lines: string[]) {
  const explicit = text.match(/(?:route|rute)\s*[:\-]?\s*([^\n→>-]+?)\s*(?:→|->|>|\bto\b|\bke\b)\s*([^\n]+)/i);
  const routeLine = explicit ? [explicit[1], explicit[2]] : findRouteLine(lines);
  const originRaw = cleanRoutePoint(routeLine?.[0] ?? "-");
  const destinationRaw = cleanRoutePoint(routeLine?.[1] ?? "-");
  return {
    origin: stripAirportCode(originRaw),
    destination: stripAirportCode(destinationRaw),
    originCode: extractAirportCode(originRaw),
    destinationCode: extractAirportCode(destinationRaw),
  };
}

function findRouteLine(lines: string[]) {
  for (const line of lines) {
    const match = line.match(/^(.{2,45}?)\s*(?:→|->|>|\bto\b|\bke\b)\s*(.{2,45})$/i);
    if (match) return [match[1], match[2]];
  }
  const codes = normalizeText(lines.join(" ")).match(/\b([A-Z]{3})\b[^\n]{0,25}?(?:→|->|>|\bto\b|\bke\b|-)[^\n]{0,25}?\b([A-Z]{3})\b/);
  return codes ? [codes[1], codes[2]] : null;
}

function parseScope(lines: string[]) {
  const scope = Object.fromEntries(scopeKeys.map((key) => [key, "unclear"])) as FreightScope;
  for (const key of scopeKeys) {
    for (const line of lines) {
      if (!scopePatterns[key].some((pattern) => pattern.test(line))) continue;
      if (exclusionPattern.test(line)) scope[key] = "excluded";
      else if (inclusionPattern.test(line) || /\b(?:rp|idr|usd|\$)\s*[\d.,]+/i.test(line)) scope[key] = "included";
    }
  }
  return scope;
}

function captureField(text: string, labels: string[]) {
  const escaped = labels.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  return capturePattern(text, new RegExp(`(?:${escaped})\\s*[:\\-]?\\s*([^\\n]+)`, "i"));
}

function capturePattern(text: string, expression: RegExp) {
  return text.match(expression)?.[1]?.trim().replace(/[|;]+$/, "") ?? "";
}

function parsePercent(text: string, expression: RegExp) {
  const raw = text.match(expression)?.[1];
  return raw ? parseLocalizedNumber(raw, "USD") : 0;
}

function parseNamedRate(text: string, expression: RegExp) {
  const raw = text.match(expression)?.[1];
  return raw ? parseLocalizedNumber(raw, "IDR") : 0;
}

function parseLocalizedNumber(raw: string, currency: "IDR" | "USD") {
  const clean = raw.replace(/\s/g, "");
  if (clean.includes(".") && clean.includes(",")) {
    const decimal = clean.lastIndexOf(".") > clean.lastIndexOf(",") ? "." : ",";
    const thousands = decimal === "." ? /,/g : /\./g;
    return Number(clean.replace(thousands, "").replace(decimal, ".")) || 0;
  }
  if (clean.includes(",")) {
    const digits = clean.split(",")[1]?.length ?? 0;
    return Number(digits === 3 && currency === "IDR" ? clean.replace(/,/g, "") : clean.replace(",", ".")) || 0;
  }
  if (clean.includes(".")) {
    const digits = clean.split(".")[1]?.length ?? 0;
    return Number(digits === 3 && currency === "IDR" ? clean.replace(/\./g, "") : clean) || 0;
  }
  return Number(clean) || 0;
}

function findIncoterm(text: string) {
  return text.match(/\b(EXW|FCA|FAS|FOB|CFR|CIF|CPT|CIP|DAP|DPU|DDP|DDU)\b/i)?.[1]?.toUpperCase() ?? "-";
}

function extractAirportCode(value: string) {
  return value.match(/\b([A-Z]{3})\b/)?.[1] ?? "-";
}

function stripAirportCode(value: string) {
  const cleaned = value.replace(/[()]/g, " ").replace(/\b[A-Z]{3}\b/g, "").replace(/\s+/g, " ").trim();
  return cleaned || (extractAirportCode(value) !== "-" ? extractAirportCode(value) : "-");
}

function cleanRoutePoint(value: string) {
  return value.replace(/\s*(?:mode|commodity|rate|ppn|vat)\s*:.*$/i, "").trim();
}

function normalizeText(text: string) {
  return text.replace(/\r\n?/g, "\n").replace(/[–—]/g, "-").replace(/\u00a0/g, " ").trim();
}

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `quote-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const questionCopy = {
  id: {
    ddu: "Quotation menyebut DDU. Mohon konfirmasi scope aktual: airport-to-airport atau DAP di tujuan?",
    awb: "Apakah biaya AWB sudah termasuk dalam rate?",
    exportCustoms: "Apakah pengurusan PEB/NPE dan customs clearance ekspor sudah termasuk?",
    destinationHandling: "Apakah destination handling dan terminal charges sudah termasuk?",
    destinationScope: "Apakah customs clearance tujuan dan delivery ke gudang buyer termasuk?",
    validity: "Sampai tanggal berapa quotation ini berlaku?",
  },
  en: {
    ddu: "The quote mentions DDU. Please confirm the actual scope: airport-to-airport or DAP at destination?",
    awb: "Is the AWB fee included in the rate?",
    exportCustoms: "Are export customs clearance and PEB/NPE processing included?",
    destinationHandling: "Are destination handling and terminal charges included?",
    destinationScope: "Are destination customs clearance and delivery to the buyer's warehouse included?",
    validity: "Until what date is this quotation valid?",
  },
  zh: {
    ddu: "报价使用了DDU。请确认实际服务范围：机场到机场，还是目的地DAP？",
    awb: "运价是否已包含AWB费用？",
    exportCustoms: "是否包含出口清关及PEB/NPE办理？",
    destinationHandling: "是否包含目的地操作费及码头费用？",
    destinationScope: "是否包含目的地清关及送货至买方仓库？",
    validity: "此报价的有效期至何日？",
  },
} satisfies Record<FreightLocale, Record<string, string>>;
