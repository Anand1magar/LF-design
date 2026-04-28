import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { GifPreloader } from "@/components/layout/GifPreloader";
import { JsonLd } from "@/components/layout/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { ContactSection } from "@/components/layout/ContactSection";
import { ElasticDivider } from "@/components/layout/ElasticDivider";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LF Studio",
  url: "https://www.lftechnology.com/lfdesign",
  logo: "https://www.lftechnology.com/lfdesign/og-default.jpg",
  description:
    "AI-augmented design studio building brands, products, and experiences — 65% more efficient, without compromising craft.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@lfstudio.co",
    contactType: "customer service",
  },
  sameAs: [
    "https://x.com/lfdesignteam",
    "https://www.instagram.com/leapfrogdesignteam/",
    "https://www.facebook.com/leapfrogdesignteam/",
    "https://www.tiktok.com/@leapfrogdesignteam",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LF Studio",
  url: "https://www.lftechnology.com/lfdesign",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.lftechnology.com/lfdesign/portfolio?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

/* ─── Google Fonts via next/font (no FOUT, auto-optimized) ─── */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

/* ─── Metadata ─── */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.lftechnology.com/lfdesign"),
  title: {
    default: "LF Studio — AI-Powered Design Agency",
    template: "%s — LF Studio",
  },
  description:
    "We combine human creativity with generative AI to deliver high-performance digital products. Design, development, and branding at startup speed.",
  keywords: [
    "design agency",
    "AI design",
    "product design",
    "branding",
    "UX/UI",
    "LF Studio",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.lftechnology.com/lfdesign",
  },
  openGraph: {
    title: "LF Studio — AI-Powered Design Agency",
    description:
      "We combine human creativity with generative AI to deliver high-performance digital products.",
    type: "website",
    locale: "en_US",
    url: "https://www.lftechnology.com/lfdesign",
    siteName: "LF Studio",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "LF Studio — AI-Powered Design Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LF Studio — AI-Powered Design Agency",
    description:
      "We combine human creativity with generative AI to deliver high-performance digital products.",
    images: ["/og-default.jpg"],
  },
};

/* ─── Root Layout ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${syne.variable}`}
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <GifPreloader />
        <div className="w-full min-h-screen bg-lf-cream ">
          <Navbar />
          {/* Main content */}
          <main
            className="relative bg-lf-cream rounded-b-3xl p-0 shadow-content"
          >
            {children}
          </main>
          {/* Elastic green divider */}
          <ElasticDivider />
          {/* Footer */}
          <ContactSection />
        </div>
      </body>
    </html>
  );
}
