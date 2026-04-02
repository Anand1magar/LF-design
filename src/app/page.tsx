import { HeroSection } from "@/components/sections/HeroSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { ServiceDetailCards } from "@/components/sections/ServiceDetailCards";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { EfficiencySection } from "@/components/sections/EfficiencySection";
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
          <EfficiencySection />
        </div>
        <div id="portfolio">
          <PortfolioShowcase />
        </div>
        <PortfolioSection />
      </div>
    </>
  );
}
