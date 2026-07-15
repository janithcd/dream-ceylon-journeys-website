import type { Metadata, Viewport } from "next";
import {
  Manrope,
  Playfair_Display,
} from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
        "Dream Ceylon Journeys | Private Sri Lanka Tours",
    template:
        "%s | Dream Ceylon Journeys",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Sri Lanka private tours",
    "Sri Lanka tour packages",
    "Sri Lanka DMC",
    "Sri Lanka local tour operator",
    "custom Sri Lanka itinerary",
    "Sri Lanka chauffeur guide",
  ],
  authors: [
    {
      name: "Dream Ceylon Journeys",
    },
  ],
  creator: "Dream Ceylon Journeys",
  publisher: "Dream Ceylon Journeys",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
        "Dream Ceylon Journeys | Private Sri Lanka Tours",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title:
        "Dream Ceylon Journeys | Private Sri Lanka Tours",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b2f23",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${manrope.variable} ${playfair.variable}`}
      >
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Header />
      <main>{children}</main>
      <Footer />
      </body>
      </html>
  );
}
