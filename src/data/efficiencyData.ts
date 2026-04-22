/**
 * Efficiency section tab content.
 * `variant` is an identifier — components use it to look up image
 * paths and CSS position maps (those are view-level details kept in
 * AiEfficiencySection.tsx).
 */
export const featureTabs = [
  {
    label: "Character generation",
    speedup: "8x",
    slideTitle: undefined as string | undefined,
    title: "faster in character generation, storyboarding & short animations",
    description:
      "Our AI-powered approach makes the process simple and efficient, allowing us to spend more time on the creative storytelling that truly connects with your audience.",
    slideDescription: undefined as string | undefined,
    variant: "character" as const,
  },
  {
    label: "Product photography & video",
    speedup: "5x",
    slideTitle: "From Weeks to Hours",
    title: "faster in product photography setups & video production",
    description:
      "AI-powered scene generation and compositing dramatically reduce shoot preparation time while maintaining photorealistic quality.",
    slideDescription:
      "Our smart AI tools allow us to build entire campaigns in a fraction of the time. This means you can launch premium content faster, stay ahead of your competitors, and see your vision come to life without the typical delays.",
    variant: "product" as const,
  },
  {
    label: "3D renderings & animations",
    speedup: "80%",
    slideTitle: "Exceptional Quality, 80% Faster",
    title: "Faster",
    description:
      "Automated mesh generation and texture synthesis accelerate our 3D pipeline from concept to final render.",
    slideDescription:
      "By harnessing GenAI, we cut production time from 3 weeks to 3 days, enabling us to bring creative ideas to life faster while maintaining exceptional quality.",
    variant: "3d" as const,
  },
  {
    label: "General graphic design",
    speedup: "40%",
    slideTitle: "Professional Design, 40% Faster",
    title: "Faster",
    description:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    slideDescription:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    variant: "design" as const,
  },
  {
    label: "Illustrations & character consistency",
    speedup: "40%",
    slideTitle: "40% boost in design creation",
    title: "boost in design creation",
    description:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    slideDescription:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    variant: "illustrations" as const,
  },
  {
    label: "UX workflows and rapid PoC generation",
    speedup: "97%",
    slideTitle: "From Idea to Reality, 97% Faster.",
    title: "Faster",
    description:
      "Our smart AI tools cut project timelines down to size, delivering research and working prototypes in record time so you can test your ideas and launch with confidence",
    slideDescription:
      "Our smart AI tools cut project timelines down to size, delivering research and working prototypes in record time so you can test your ideas and launch with confidence",
    variant: "ux" as const,
  },
] as const;

export type Variant = (typeof featureTabs)[number]["variant"];
