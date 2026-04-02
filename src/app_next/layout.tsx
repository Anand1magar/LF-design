import type { Metadata } from "next";
import { Figtree, Inter, Syne } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { ContactSection } from "@/components/layout/ContactSection";
import { ElasticDivider } from "@/components/layout/ElasticDivider";
import "./globals.css";

/* ─── Google Fonts via next/font (no FOUT, auto-optimized) ─── */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
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
  title: "LF Studio — AI-Powered Design Agency",
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
  openGraph: {
    title: "LF Studio — AI-Powered Design Agency",
    description:
      "We combine human creativity with generative AI to deliver high-performance digital products.",
    type: "website",
    locale: "en_US",
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
      className={`${figtree.variable} ${inter.variable} ${syne.variable}`}
    >
      <body className="antialiased">
        <div className="w-full min-h-screen bg-[#fffcf8] font-[var(--font-figtree),sans-serif]">
          <Navbar />
          {/* Main content */}
          <main
            className="relative bg-[#fffcf8] rounded-b-3xl p-0"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
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
