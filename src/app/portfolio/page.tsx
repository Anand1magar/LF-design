import type { Metadata } from "next";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { PortfolioSection } from "@/components/sections/PortfolioSection";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse our work — brands, products, and experiences built with AI-augmented design.",
  alternates: { canonical: "https://www.lftechnology.com/lfdesign/portfolio" },
  openGraph: { url: "https://www.lftechnology.com/lfdesign/portfolio" },
  twitter: { card: "summary_large_image" },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioShowcase />
      <PortfolioSection />
    </>
  );
}
