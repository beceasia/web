export type ReadinessAnswer = "yes" | "no" | "unknown";
export type ExportPlan = {
  version: 1;
  product: string;
  country: string;
  currency: "IDR" | "USD";
  assumptionDate: string;
  quantity: string;
  unitCost: string;
  unitPrice: string;
  freight: string;
  documents: string;
  answers: ReadinessAnswer[];
};
export const readinessWeights = [18, 16, 14, 16, 12, 12, 12];
export const blankPlan: ExportPlan = {
  version: 1,
  product: "",
  country: "Hong Kong",
  currency: "IDR",
  assumptionDate: "2026-10-04",
  quantity: "",
  unitCost: "",
  unitPrice: "",
  freight: "",
  documents: "",
  answers: readinessWeights.map(() => "unknown"),
};
export const examplePlan: ExportPlan = {
  ...blankPlan,
  product: "Kopi / Coffee / 咖啡",
  quantity: "500",
  unitCost: "80000",
  unitPrice: "125000",
  freight: "4500000",
  documents: "2500000",
  answers: ["yes", "yes", "no", "unknown", "yes", "no", "yes"],
};
export function readinessScore(answers: ReadinessAnswer[]) {
  return readinessWeights.reduce(
    (total, weight, i) => total + (answers[i] === "yes" ? weight : 0),
    0,
  );
}
export function calculatePlan(plan: ExportPlan) {
  const values = [
    plan.quantity,
    plan.unitCost,
    plan.unitPrice,
    plan.freight,
    plan.documents,
  ];
  if (
    values.some(
      (value) =>
        !value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0,
    ) ||
    Number(plan.quantity) <= 0
  )
    return null;
  const [quantity, unitCost, unitPrice, freight, documents] =
    values.map(Number);
  const revenue = quantity * unitPrice;
  const totalCost = quantity * unitCost + freight + documents;
  const margin = revenue - totalCost;
  const perUnit = totalCost / quantity;
  if (![revenue, totalCost, margin, perUnit].every(Number.isFinite))
    return null;
  return {
    revenue,
    totalCost,
    margin,
    perUnit,
    marginRate: revenue > 0 ? (margin / revenue) * 100 : 0,
  };
}
export function isExportPlan(value: unknown): value is ExportPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as Record<string, unknown>;
  return (
    plan.version === 1 &&
    [
      "product",
      "country",
      "assumptionDate",
      "quantity",
      "unitCost",
      "unitPrice",
      "freight",
      "documents",
    ].every((key) => typeof plan[key] === "string") &&
    (plan.currency === "IDR" || plan.currency === "USD") &&
    Array.isArray(plan.answers) &&
    plan.answers.length === 7 &&
    plan.answers.every((answer) => ["yes", "no", "unknown"].includes(answer))
  );
}
