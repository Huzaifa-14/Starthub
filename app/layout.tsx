import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";

import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Starthub — Startup ecosystem",
    template: "%s · Starthub",
  },
  description:
    "Founders showcase, investors discover, capital flows, and co-founders connect — a cinematic home for the next generation of startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
