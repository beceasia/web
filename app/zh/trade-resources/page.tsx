import type { Metadata } from "next";
import { TradeResourcesDirectory } from "@/components/trade-resources-directory";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "20 个进出口贸易数据与参考资源",
  description: "查找用于 HS 编码、海关、贸易统计、关税及出口市场研究的印尼和国际信息来源。",
  alternates: {
    canonical: "/zh/trade-resources",
    languages: { id: "/trade-resources", en: "/en/trade-resources", zh: "/zh/trade-resources", "x-default": "/trade-resources" },
  },
  openGraph: { title: "20 个进出口贸易数据与参考资源", description: "查找用于 HS 编码、海关、贸易统计、关税及出口市场研究的印尼和国际信息来源。", url: `https://www.bece.asia/zh/trade-resources`, type: "website" },
};

export default function TradeResourcesPage() {
  return (
    <PageShell locale="zh" currentPath="/zh/trade-resources">
      <TradeResourcesDirectory locale="zh" />
    </PageShell>
  );
}
