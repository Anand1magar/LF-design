/**
 * Process step content — text/content only.
 * Icon SVG rendering lives in ProcessSection.tsx (uses Figma-generated
 * path imports that can't be serialised here) and is mapped from `id`.
 */
export interface ProcessStep {
  /** Unique ID — used to look up the SVG icon in ProcessSection.tsx */
  id: "empathize" | "define" | "ideate" | "prototype" | "test";
  title: string;
  humanDesc: string;
  aiDesc: string;
  /** When true, the Prototype step renders a combined Human+AI icon row */
  combinedIcons?: boolean;
}

export const processStepsData: ProcessStep[] = [
  {
    id: "empathize",
    title: "Empathize",
    humanDesc: "We capture emotions through interviews.",
    aiDesc: "AI agents synthesize data for clear reports.",
  },
  {
    id: "define",
    title: "Define",
    humanDesc: "We set strategic intent and priority.",
    aiDesc: "AI tools create HMWs to produce a Value Proposition Canvas.",
  },
  {
    id: "ideate",
    title: "Ideate",
    humanDesc: "We hold workshops to create solutions.",
    aiDesc: "AI helps list requirements for a Product Requirement Document.",
  },
  {
    id: "prototype",
    title: "Prototype",
    humanDesc: "We create prototypes with AI tools to define vision.",
    aiDesc: "This process produces multiple prototypes for testing.",
    combinedIcons: true,
  },
  {
    id: "test",
    title: "Test",
    humanDesc: "We conduct usability tests.",
    aiDesc: "AI tools analyze data to produce a Test & Feedback Report.",
  },
];
