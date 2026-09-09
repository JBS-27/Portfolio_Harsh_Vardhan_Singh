import type { Metadata, Viewport } from "next";
import { Azeret_Mono, Bricolage_Grotesque, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Atmosphere } from "@/components/atmosphere";
import { CursorTrail } from "@/components/cursor-trail";
import { Navbar } from "@/components/navbar";
import { site } from "@/lib/data";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const mono = Azeret_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
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
    "BuildEstate",
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
        className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable} bg-black text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="absolute top-4 left-4 z-50 -translate-y-16 bg-ink px-4 py-2 text-black transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Atmosphere />
        <CursorTrail />
        <Navbar />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
