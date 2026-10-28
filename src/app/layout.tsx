import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bodoni-moda";
import "@fontsource-variable/bodoni-moda/wght-italic.css";
import "@fontsource-variable/jost";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOIRÉ | A scent that stays",
  description:
    "NOIRÉ is a fictional dark-luxury fragrance house. A demo landing page with a procedural 3D bottle built with Next.js and React Three Fiber.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#050403",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
