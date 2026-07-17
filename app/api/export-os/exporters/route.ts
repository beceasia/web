import { exporterProfiles, localize } from "@/data/export-intelligence";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const verified = searchParams.get("verified");
  const records = exporterProfiles.filter((record) => {
    const matchesQuery = !query || [record.name, record.location, ...record.products.map((item) => localize(item, "en")), ...record.markets].some((value) => value.toLowerCase().includes(query));
    const matchesVerification = verified === null || String(record.verified) === verified;
    return matchesQuery && matchesVerification;
  });
  return Response.json({ count: records.length, records });
}
