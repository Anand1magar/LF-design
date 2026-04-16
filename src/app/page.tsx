import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LF Studio — AI-Powered Design Agency",
  description:
    "We build brands, products, and experiences powered by AI — 65% more efficient, without compromising craft.",
  alternates: { canonical: "https://www.lftechnology.com/lfdesign" },
  openGraph: {
    url: "https://www.lftechnology.com/lfdesign",
  },
};

import { HeroSection } from "@/components/sections/HeroSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { ServiceDetailCards } from "@/components/sections/ServiceDetailCards";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { EfficiencySection } from "@/components/sections/EfficiencySection";
import { EfficiencySection2 } from "@/components/sections/EfficiencySection2";
import { FasterSection } from "@/components/sections/FasterSection";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { PortfolioSection } from "@/components/sections/PortfolioSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="relative z-10">
        <WhatWeDoSection />
        <ServiceDetailCards />
        <TestimonialsSection />
        <div id="process">
          <ProcessSection />
        </div>
        <ImpactSection />
        <div id="ai-design">
          {/* <EfficiencySection /> */}
          <EfficiencySection2 />
        </div>
        <FasterSection />
        <div id="portfolio">
          <PortfolioShowcase />
        </div>
        <PortfolioSection />
      </div>
    </>
  );
}
