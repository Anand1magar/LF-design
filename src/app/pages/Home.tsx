import { HeroSection } from "../components/HeroSection";
import { WhatWeDoSection } from "../components/WhatWeDoSection";
import { ServiceDetailCards } from "../components/ServiceDetailCards";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ProcessSection } from "../components/ProcessSection";
import { ImpactSection } from "../components/ImpactSection";
import { EfficiencySection } from "../components/EfficiencySection";
import { PortfolioShowcase } from "../components/PortfolioShowcase";
import { PortfolioSection } from "../components/PortfolioSection";

export function Home() {
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
