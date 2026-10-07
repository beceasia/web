export type FreightLocale = "id" | "en" | "zh";
export type FreightMode = "express" | "air" | "sea-lcl" | "sea-fcl20" | "sea-fcl40";
export type DestinationRegion = "asean" | "east-asia" | "japan" | "middle-east" | "europe" | "north-america" | "australia";
export type CargoType = "general" | "food" | "perishable" | "electronics" | "dangerous" | "textile";
export type ServiceScope = "terminal-terminal" | "door-terminal" | "terminal-door" | "door-door";

export type FreightEstimateInput = {
  mode: FreightMode;
  region: DestinationRegion;
  cargoType: CargoType;
  serviceScope: ServiceScope;
  weightKg: number;
  pieces: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  cargoValueUsd: number;
  exchangeRate: number;
};

export type EstimateBreakdown = {
  baseFreight: number;
  fuelAndSecurity: number;
  originHandling: number;
  exportDocuments: number;
  pickup: number;
  destinationService: number;
  cargoAdjustment: number;
  insurance: number;
  totalUsd: number;
  totalIdr: number;
};

export type FreightEstimate = {
  volumeCbm: number;
  volumetricWeight: number;
  chargeableWeight: number;
  billingBasis: "kg" | "cbm" | "container";
  billingQuantity: number;
  rateBand: { low: number; high: number; unit: string };
  transitDays: { min: number; max: number };
  low: EstimateBreakdown;
  market: EstimateBreakdown;
  high: EstimateBreakdown;
};

type Band = Record<DestinationRegion, [number, number]>;

const rateBands: Record<FreightMode, Band> = {
  express: {
    asean: [6, 10], "east-asia": [7, 12], japan: [8, 13], "middle-east": [9, 15], europe: [11, 18], "north-america": [12, 21], australia: [10, 17],
  },
  air: {
    asean: [2.4, 4.2], "east-asia": [2.8, 5.2], japan: [3.4, 6.2], "middle-east": [3.5, 6.5], europe: [4.5, 8.5], "north-america": [5.5, 10.5], australia: [3.8, 7],
  },
  "sea-lcl": {
    asean: [65, 140], "east-asia": [90, 180], japan: [120, 240], "middle-east": [150, 300], europe: [180, 360], "north-america": [220, 450], australia: [160, 320],
  },
  "sea-fcl20": {
    asean: [600, 1400], "east-asia": [700, 1600], japan: [900, 1900], "middle-east": [1400, 2800], europe: [1800, 3500], "north-america": [2500, 5200], australia: [1600, 3200],
  },
  "sea-fcl40": {
    asean: [950, 2100], "east-asia": [1100, 2500], japan: [1400, 2900], "middle-east": [2200, 4300], europe: [2900, 5400], "north-america": [3900, 7800], australia: [2500, 4800],
  },
};

const transitDays: Record<FreightMode, Record<DestinationRegion, [number, number]>> = {
  express: {
    asean: [1, 3], "east-asia": [2, 4], japan: [2, 4], "middle-east": [3, 5], europe: [3, 6], "north-america": [3, 6], australia: [3, 5],
  },
  air: {
    asean: [2, 5], "east-asia": [3, 6], japan: [3, 6], "middle-east": [4, 8], europe: [5, 9], "north-america": [5, 10], australia: [4, 8],
  },
  "sea-lcl": {
    asean: [7, 16], "east-asia": [10, 22], japan: [12, 24], "middle-east": [18, 35], europe: [28, 48], "north-america": [30, 52], australia: [18, 35],
  },
  "sea-fcl20": {
    asean: [6, 14], "east-asia": [9, 20], japan: [10, 22], "middle-east": [17, 32], europe: [26, 45], "north-america": [28, 48], australia: [16, 30],
  },
  "sea-fcl40": {
    asean: [6, 14], "east-asia": [9, 20], japan: [10, 22], "middle-east": [17, 32], europe: [26, 45], "north-america": [28, 48], australia: [16, 30],
  },
};

const cargoFactor: Record<CargoType, number> = {
  general: 1,
  food: 1.05,
  perishable: 1.25,
  electronics: 1.08,
  dangerous: 1.35,
  textile: 1,
};

const destinationLocal: Record<DestinationRegion, number> = {
  asean: 140,
  "east-asia": 220,
  japan: 260,
  "middle-east": 320,
  europe: 420,
  "north-america": 500,
  australia: 380,
};

export function estimateFreight(input: FreightEstimateInput): FreightEstimate {
  const safe = sanitize(input);
  const volumeCbm = safe.pieces * safe.lengthCm * safe.widthCm * safe.heightCm / 1_000_000;
  const divisor = safe.mode === "express" ? 5000 : 6000;
  const volumetricWeight = safe.mode === "express" || safe.mode === "air"
    ? safe.pieces * safe.lengthCm * safe.widthCm * safe.heightCm / divisor
    : 0;
  const chargeableWeight = Math.ceil(Math.max(safe.weightKg, volumetricWeight));
  const [lowRate, highRate] = rateBands[safe.mode][safe.region];
  const billingBasis = safe.mode === "sea-lcl" ? "cbm" : safe.mode.startsWith("sea-fcl") ? "container" : "kg";
  const billingQuantity = billingBasis === "kg" ? Math.max(1, chargeableWeight) : billingBasis === "cbm" ? Math.max(1, roundUp(volumeCbm, 3)) : 1;
  const marketRate = (lowRate + highRate) / 2;

  return {
    volumeCbm,
    volumetricWeight,
    chargeableWeight,
    billingBasis,
    billingQuantity,
    rateBand: { low: lowRate, high: highRate, unit: billingBasis === "kg" ? "USD/kg" : billingBasis === "cbm" ? "USD/CBM" : "USD/container" },
    transitDays: { min: transitDays[safe.mode][safe.region][0], max: transitDays[safe.mode][safe.region][1] },
    low: calculateScenario(safe, billingQuantity, lowRate, 0.92),
    market: calculateScenario(safe, billingQuantity, marketRate, 1),
    high: calculateScenario(safe, billingQuantity, highRate, 1.12),
  };
}

function calculateScenario(input: FreightEstimateInput, quantity: number, rate: number, feeFactor: number): EstimateBreakdown {
  const rawFreight = quantity * rate;
  const cargoAdjustment = rawFreight * (cargoFactor[input.cargoType] - 1);
  const fuelRate = input.mode === "express" ? 0.22 : input.mode === "air" ? 0.15 : 0.12;
  const fuelAndSecurity = rawFreight * fuelRate;
  const originBase = input.mode === "express" ? 25 : input.mode === "air" ? 160 : input.mode === "sea-lcl" ? 250 : 480;
  const originHandling = originBase * feeFactor;
  const exportDocuments = (input.mode === "express" ? 20 : 75) * feeFactor;
  const needsPickup = input.serviceScope === "door-terminal" || input.serviceScope === "door-door";
  const needsDestination = input.serviceScope === "terminal-door" || input.serviceScope === "door-door";
  const pickup = needsPickup ? (80 + Math.min(input.weightKg * 0.08, 320)) * feeFactor : 0;
  const destinationService = needsDestination ? destinationLocal[input.region] * feeFactor : 0;
  const insurance = input.cargoValueUsd > 0 ? Math.max(10, input.cargoValueUsd * 0.005) : 0;
  const totalUsd = rawFreight + fuelAndSecurity + originHandling + exportDocuments + pickup + destinationService + cargoAdjustment + insurance;

  return {
    baseFreight: rawFreight,
    fuelAndSecurity,
    originHandling,
    exportDocuments,
    pickup,
    destinationService,
    cargoAdjustment,
    insurance,
    totalUsd,
    totalIdr: totalUsd * input.exchangeRate,
  };
}

function sanitize(input: FreightEstimateInput): FreightEstimateInput {
  return {
    ...input,
    weightKg: positive(input.weightKg),
    pieces: positive(input.pieces),
    lengthCm: positive(input.lengthCm),
    widthCm: positive(input.widthCm),
    heightCm: positive(input.heightCm),
    cargoValueUsd: positive(input.cargoValueUsd),
    exchangeRate: positive(input.exchangeRate) || 1,
  };
}

function positive(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function roundUp(value: number, digits: number) {
  const factor = 10 ** digits;
  return Math.ceil(value * factor) / factor;
}

export function formatCurrency(value: number, currency: "USD" | "IDR", locale: FreightLocale) {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  }).format(Number.isFinite(value) ? value : 0);
}
