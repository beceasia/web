import { buyerSignals, localize } from "@/data/export-intelligence";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const country = searchParams.get("country") ?? "";
  const records = buyerSignals.filter((record) => {
    const matchesQuery = !query || [record.name, record.country, localize(record.industry, "en"), ...record.interests.map((item) => localize(item, "en"))].some((value) => value.toLowerCase().includes(query));
    return matchesQuery && (!country || record.country === country);
  });
  return Response.json({ count: records.length, demo: true, verificationRequired: true, records });
}
