import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Syne } from "next/font/google";
import { Atmosphere } from "@/components/atmosphere";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { site } from "@/lib/data";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: `${site.tagline} ${site.personality}`,
  keywords: [
    "Harsh Vardhan Singh",
    "IIIT Surat",
    "full-stack engineer",
    "AI systems",
    "portfolio",
    "Nirmaan",
    "AQI forecasting",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@singharshll52",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  alternates: {
    canonical: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  email: site.email,
  url: site.url,
  jobTitle: site.role,
  alumniOf: "Indian Institute of Information Technology, Surat",
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.twitter],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${syne.variable} ${instrument.variable} bg-black text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="absolute top-4 left-4 z-50 -translate-y-16 bg-cyan px-4 py-2 text-black transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Atmosphere />
        <CustomCursor />
        <Navbar />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
