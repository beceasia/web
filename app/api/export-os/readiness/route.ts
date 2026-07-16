import { NextResponse } from "next/server";

const scoringRules = [
  { key: "legal", segment: "Legal", points: 18 },
  { key: "product", segment: "Product", points: 16 },
  { key: "packaging", segment: "Product", points: 14 },
  { key: "certification", segment: "Compliance", points: 16 },
  { key: "hs", segment: "Knowledge", points: 12 },
  { key: "payment", segment: "Knowledge", points: 12 },
  { key: "buyer", segment: "Market", points: 12 },
];

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const answers = typeof body.answers === "object" && body.answers ? body.answers as Record<string, boolean> : {};
  const score = scoringRules.reduce((total, rule) => total + (answers[rule.key] ? rule.points : 0), 0);
  const breakdown = scoringRules.reduce<Record<string, number>>((segments, rule) => {
    segments[rule.segment] = (segments[rule.segment] ?? 0) + (answers[rule.key] ? rule.points : 0);
    return segments;
  }, {});
  const missing = scoringRules.filter((rule) => !answers[rule.key]).map((rule) => rule.key);

  return NextResponse.json({
    score,
    breakdown,
    missing,
    recommendation: score >= 75
      ? "Strong export potential. Move to buyer validation and compliance depth."
      : score >= 55
        ? "Promising readiness. Improve the missing items before serious buyer outreach."
        : "Early stage. Start with legality, product consistency, packaging, and export basics.",
  });
}
