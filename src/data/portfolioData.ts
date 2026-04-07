export interface PortfolioItem {
  name: string;
  slug: string;
  tagline: string;
  year: string;
  category: string;
  description: string;
  image: string;
  brandColor: string;
  client: string;
  role: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string[];
  tags?: string[];
  heroTitle?: string;
  heroDescription?: string;
  aboutHeadline?: string;
  aboutDescription?: string;
  challengeHeadline?: string;
  summaryHeadline?: string;
  summaryDescription?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    name: "SecondLook Health",
    slug: "second-look-health",
    tagline: "Diagnostic confidence at every stage",
    year: "2024",
    category: "HEALTHCARE",
    description:
      "SecondLook Health provides second-opinion diagnostics powered by expert radiologists and AI. We redesigned their entire patient-facing experience — from scan upload to results delivery — and built a comprehensive medical case management dashboard that brings clarity, calm, and trust to every step.",
    image: "/portfolio/secondlook-health-new.png",
    brandColor: "#384393",
    client: "SecondLook Health Corp.",
    role: "UX/UI Design, Design System, Front-end Development",
    duration: "5 months",
    challenge:
      "Patients seeking second opinions are already anxious. The existing platform was complex and opaque, increasing stress rather than alleviating it. The experience needed to be radically simplified while meeting strict healthcare compliance standards.",
    solution:
      "We rebuilt the patient journey from the ground up: a simple 3-step upload flow, real-time status tracking with clear language, and a results experience that presents findings with empathy and clarity. A comprehensive design system ensured consistency across all touchpoints.",
    results: [
      "60% faster scan-to-results turnaround",
      "4.8/5 patient trust rating",
      "38% increase in repeat usage",
      "Full HIPAA-compliant design system",
    ],
    tags: ["UX/UI Design", "Development"],
    heroTitle: "Diagnostic confidence\nwhen it matters most",
    heroDescription:
      "Redesigning the second-opinion experience to bring clarity, calm, and trust to patients navigating complex diagnoses.",
    aboutHeadline:
      "SecondLook Health serves patients at their most anxious — seeking a second opinion on a diagnosis that could change their lives. The existing platform added complexity when it should have provided reassurance.",
    aboutDescription:
      "We rebuilt the entire patient journey around three principles: simplicity, transparency, and empathy. A 3-step upload flow replaced a 12-field form. Real-time status tracking used clear, human language. Results were presented with context and care, not clinical detachment.",
    challengeHeadline:
      "The challenge was to radically simplify a high-stakes medical experience while meeting strict HIPAA compliance standards.",
    summaryHeadline:
      "The redesign transformed a stressful process into one that builds confidence — proving that healthcare platforms can be both compliant and compassionate.",
    summaryDescription:
      "With a 4.8/5 patient trust rating and 60% faster turnaround, SecondLook Health now delivers diagnostic confidence with the clarity and calm that patients deserve. The comprehensive design system ensures this quality scales across every touchpoint.",
  },
  {
    name: "Antaranga.ai",
    slug: "antaranga-ai",
    tagline: "Mental health reimagined through AI",
    year: "2024",
    category: "HEALTH \u00B7 AI",
    description:
      "Antaranga.ai needed a product that could bridge the gap between AI-driven mental health screening and human empathy. We designed and shipped a full platform \u2014 from onboarding to clinical dashboards \u2014 that felt approachable to patients and powerful for clinicians.",
    image: "/portfolio/antaranga-ai.png",
    brandColor: "#c45e14",
    client: "Antaranga Health Pvt. Ltd.",
    role: "Product Design, Brand Identity, Development",
    duration: "8 months",
    challenge:
      "Mental health platforms often feel cold and clinical. Antaranga needed to leverage AI for accurate screening while maintaining warmth, empathy, and trust throughout the user experience.",
    solution:
      "We designed a dual-experience platform: a calming, conversational interface for patients that guides them through AI-assisted assessments, and a powerful clinical dashboard for practitioners with real-time insights. Every interaction was crafted to reduce stigma and build confidence.",
    results: [
      "45% reduction in patient drop-off during screening",
      "3x faster clinician onboarding",
      "92% patient satisfaction score",
      "Successful launch across 12 clinics",
    ],
    tags: ["Product Design", "Development"],
    heroTitle: "Mental health meets\nhuman-centered AI",
    heroDescription:
      "Designing an empathetic AI platform that bridges clinical precision with the warmth patients need during their most vulnerable moments.",
    aboutHeadline:
      "Antaranga.ai approached us with a complex brief: build a mental health platform powered by AI that never feels cold or impersonal. The screening needed to be clinically rigorous, but the experience had to feel like a conversation with someone who cares.",
    aboutDescription:
      "We designed two interconnected experiences \u2014 a calming patient interface that uses conversational AI to guide assessments naturally, and a powerful clinical dashboard that gives practitioners real-time insights. Every micro-interaction was crafted to reduce stigma and build trust.",
    challengeHeadline:
      "The challenge was to leverage AI for clinical accuracy while maintaining the emotional warmth and trust that mental health care demands.",
    summaryHeadline:
      "The result is a platform that proves technology and empathy can coexist \u2014 giving patients confidence and clinicians clarity.",
    summaryDescription:
      "Antaranga.ai now operates across 12 clinics with a 92% patient satisfaction score. The dual-experience approach has become a model for how health-tech platforms can balance precision with compassion, reducing drop-off rates by 45%.",
  },

  {
    name: "Frogtoberfest",
    slug: "frogtoberfest",
    tagline: "Premium content, seamlessly delivered",
    year: "2025",
    category: "ENTERTAINMENT",
    description:
      "StreamVault was entering a saturated market and needed a distinctive edge. We crafted a visual identity and interface system that feels cinematic \u2014 dark, immersive, and effortlessly navigable \u2014 helping them stand out in a sea of sameness with a truly premium streaming experience.",
    image: "/portfolio/frogtoberfest.png",
    brandColor: "#6c5ce7",
    client: "Frogtoberfest",
    role: "Brand Identity, UI/UX Design, Motion Design",
    duration: "4 months",
    challenge:
      "In a market dominated by Netflix, Disney+, and others, StreamVault needed to carve out a premium niche. The challenge was to create an interface that felt cinematic and immersive without sacrificing usability or content discoverability.",
    solution:
      "We developed a dark, cinematic design language with rich motion design, intelligent content surfacing, and a typography system that adapts to content mood. The result is an experience that feels like stepping into a theater \u2014 every frame carefully composed.",
    results: [
      "28% higher session duration vs. industry average",
      "52% increase in content discovery",
      "Award-winning interface design",
      "Seamless experience across 6 platforms",
    ],
    tags: ["Brand Identity", "Motion Design"],
    heroTitle: "Premium streaming\nwith cinematic soul",
    heroDescription:
      "Crafting a visual identity and interface system that feels like stepping into a theater \u2014 dark, immersive, and effortlessly navigable.",
    aboutHeadline:
      "StreamVault was entering one of the most competitive markets in tech. With established giants dominating mindshare, the platform needed more than great content \u2014 it needed an experience that felt fundamentally different.",
    aboutDescription:
      "We developed a cinematic design language built on darkness, depth, and deliberate motion. Every interaction \u2014 from browsing to playback \u2014 was crafted to feel immersive. The typography system adapts to content mood, and intelligent surfacing ensures discovery feels effortless, not algorithmic.",
    challengeHeadline:
      "The challenge was to create an interface that feels cinematic and premium without sacrificing the usability and discoverability that streaming demands.",
    summaryHeadline:
      "The result is a streaming platform that doesn't just deliver content \u2014 it creates an atmosphere that keeps users coming back.",
    summaryDescription:
      "Frogtoberfest launched to critical acclaim with 28% higher session durations than the industry average. The cinematic design language has become the brand's signature, proving that premium aesthetics and usability can coexist in streaming.",
  },
  {
    name: "Minimeals",
    slug: "minimeals",
    tagline: "Premium content, seamlessly delivered",
    year: "2025",
    category: "ENTERTAINMENT",
    description:
      "Minimeals was entering a saturated market and needed a distinctive edge. We crafted a visual identity and interface system that feels cinematic — dark, immersive, and effortlessly navigable — helping them stand out in a sea of sameness with a truly premium streaming experience.",
    image: "/portfolio/minimeals.png",
    brandColor: "#6c5ce7",
    client: "Minimeals",
    role: "Brand Identity, UI/UX Design, Motion Design",
    duration: "4 months",
    challenge:
      "In a market dominated by Netflix, Disney+, and others, Minimeals needed to carve out a premium niche. The challenge was to create an interface that felt cinematic and immersive without sacrificing usability or content discoverability.",
    solution:
      "We developed a dark, cinematic design language with rich motion design, intelligent content surfacing, and a typography system that adapts to content mood. The result is an experience that feels like stepping into a theater — every frame carefully composed.",
    results: [
      "28% higher session duration vs. industry average",
      "52% increase in content discovery",
      "Award-winning interface design",
      "Seamless experience across 6 platforms",
    ],
    tags: ["Brand Identity", "Motion Design"],
    heroTitle: "Premium streaming\nwith cinematic soul",
    heroDescription:
      "Crafting a visual identity and interface system that feels like stepping into a theater — dark, immersive, and effortlessly navigable.",
    aboutHeadline:
      "Minimeals was entering one of the most competitive markets in tech. With established giants dominating mindshare, the platform needed more than great content — it needed an experience that felt fundamentally different.",
    aboutDescription:
      "We developed a cinematic design language built on darkness, depth, and deliberate motion. Every interaction — from browsing to playback — was crafted to feel immersive. The typography system adapts to content mood, and intelligent surfacing ensures discovery feels effortless, not algorithmic.",
    challengeHeadline:
      "The challenge was to create an interface that feels cinematic and premium without sacrificing the usability and discoverability that streaming demands.",
    summaryHeadline:
      "The result is a streaming platform that doesn't just deliver content — it creates an atmosphere that keeps users coming back.",
    summaryDescription:
      "Minimeals launched to critical acclaim with 28% higher session durations than the industry average. The cinematic design language has become the brand's signature, proving that premium aesthetics and usability can coexist in streaming.",
  },
];
