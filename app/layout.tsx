import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bece.asia | Digital tools for customs, trade, and public-sector work",
  description: "A utility-first portal for lightweight apps, workflow automation, document tools, monitoring dashboards, and learning experiments.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
