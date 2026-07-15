import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const KEMENKEU_KURS_URL = "https://fiskal.kemenkeu.go.id/informasi-publik/kurs-pajak";
const USER_AGENT = "Mozilla/5.0 (compatible; bece.asia IMEIHelper/1.0; +https://www.bece.asia)";

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'");
}

function parseIdr(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function parseKemenkeuKurs(html: string) {
  const text = decodeEntities(stripTags(html));
  const kmk = text.match(/KMK Nomor\s+([A-Z0-9./-]+\/\d{4})/i)?.[1] ?? "";
  const period = text.match(/Tanggal berlaku:\s*([0-9]{1,2}\s+\S+\s+\d{4}\s*-\s*[0-9]{1,2}\s+\S+\s+\d{4})/i)?.[1] ?? "";
  const usdValue = text.match(/Dolar Amerika Serikat\s*\(USD\)\s*USD\s*(?:Image:\s*Amerika Serikat\s*)?([0-9.]+,\d{2})/i)?.[1] ?? "";
  const rate = parseIdr(usdValue);

  if (!rate) {
    throw new Error("USD rate not found");
  }

  return {
    currency: "USD",
    rate,
    rateText: usdValue,
    kmk,
    period,
    source: KEMENKEU_KURS_URL,
    fetchedAt: new Date().toISOString(),
  };
}

export async function GET() {
  try {
    const response = await fetch(KEMENKEU_KURS_URL, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": USER_AGENT,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Kemenkeu fetch failed: ${response.status}`);
    }

    const html = await response.text();
    return NextResponse.json(parseKemenkeuKurs(html));
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Kurs Kemenkeu unavailable",
        source: KEMENKEU_KURS_URL,
        fetchedAt: new Date().toISOString(),
      },
      { status: 502 },
    );
  }
}
