import { filterMarketRecords } from "@/data/export-intelligence";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const records = filterMarketRecords(
    searchParams.get("q") ?? "",
    searchParams.get("product") ?? "",
    searchParams.get("country") ?? "",
  );
  return Response.json({ count: records.length, records });
}
