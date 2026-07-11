import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bece.asia"),
  applicationName: "bece.asia",
  title: {
    default: "bece.asia",
    template: "%s | bece.asia",
  },
  description: "Public digital tools for productivity, learning, research, documents, and everyday workflows.",
  authors: [{ name: "bece.asia" }],
  creator: "bece.asia",
  publisher: "bece.asia",
  category: "technology",
  referrer: "no-referrer",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.bece.asia",
    siteName: "bece.asia",
    title: "bece.asia",
    description: "Public digital tools for productivity, learning, research, documents, and everyday workflows.",
  },
  twitter: {
    card: "summary",
    title: "bece.asia",
    description: "Public digital tools for productivity, learning, research, documents, and everyday workflows.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
