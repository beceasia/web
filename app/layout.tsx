import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "bece.asia | Public digital tools for trade, documents, learning, and workflows",
  description: "A utility-first portal for sanitized community apps, workflow automation, document tools, monitoring dashboards, and learning experiments.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
