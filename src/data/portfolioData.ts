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
      "SecondLook Health provides second-opinion diagnostics powered by expert radiologists and AI. We redesigned their entire patient-facing experience — from scan upload to results delivery — and built a calmer, clearer journey that creates trust at every step.",
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
    category: "HEALTH · AI",
    description:
      "Antaranga.ai needed a product that could bridge the gap between AI-driven mental health screening and human empathy. We designed and shipped a full platform — from onboarding to clinical dashboards — that felt approachable to patients and powerful for clinicians.",
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
      "We designed two interconnected experiences — a calming patient interface that uses conversational AI to guide assessments naturally, and a powerful clinical dashboard that gives practitioners real-time insights. Every micro-interaction was crafted to reduce stigma and build trust.",
    challengeHeadline:
      "The challenge was to leverage AI for clinical accuracy while maintaining the emotional warmth and trust that mental health care demands.",
    summaryHeadline:
      "The result is a platform that proves technology and empathy can coexist — giving patients confidence and clinicians clarity.",
    summaryDescription:
      "Antaranga.ai now operates across 12 clinics with a 92% patient satisfaction score. The dual-experience approach has become a model for how health-tech platforms can balance precision with compassion, reducing drop-off rates by 45%.",
  },
  {
    name: "Frogtoberfest",
    slug: "frogtoberfest",
    tagline: "A playful festival brand built to move",
    year: "2025",
    category: "EVENT BRANDING",
    description:
      "Frogtoberfest needed an identity that could feel instantly memorable across posters, social teasers, motion assets, and on-ground festival touchpoints. We built a bold, character-led brand system that feels playful, energetic, and unmistakably ownable.",
    image: "/portfolio/frogtoberfest.png",
    brandColor: "#6c5ce7",
    client: "Frogtoberfest",
    role: "Brand Identity, UI/UX Design, Motion Design",
    duration: "4 months",
    challenge:
      "The festival needed to stand out in a crowded cultural calendar while staying flexible enough to work across digital campaigns, venue signage, merchandise, and motion-led promotion.",
    solution:
      "We created a high-energy visual system centered around a distinctive mascot, expressive typography, punchy motion, and a modular layout language. The system scales smoothly from launch posters and social reels to stage graphics and event wayfinding.",
    results: [
      "3.1x increase in social campaign engagement",
      "Cohesive identity across digital and physical touchpoints",
      "Launch assets delivered for print, motion, and web",
      "Festival brand system ready for future yearly editions",
    ],
    tags: ["Brand Identity", "Motion Design"],
    heroTitle: "A festival identity\nwith personality and momentum",
    heroDescription:
      "Designing a bold event brand that turns every poster, teaser, and touchpoint into part of the Frogtoberfest experience.",
    aboutHeadline:
      "Frogtoberfest needed more than a logo. It needed a living identity that could create excitement before the event, guide visitors during it, and stay memorable long after it ended.",
    aboutDescription:
      "We built the brand around a playful-but-premium visual voice: energetic typography, flexible composition rules, and a strong motion language that made every rollout asset feel connected. The result was a system that felt fun, modern, and scalable.",
    challengeHeadline:
      "The challenge was to create an event identity vibrant enough to grab attention instantly, but structured enough to stay consistent across every medium.",
    summaryHeadline:
      "The result is a festival brand that feels alive in motion, distinctive in print, and instantly recognizable wherever it appears.",
    summaryDescription:
      "Frogtoberfest launched with a cohesive identity system that gave the event a strong visual presence across every audience touchpoint. From hype-building social content to on-site graphics, the brand now feels consistent, memorable, and ready to grow year after year.",
  },
  {
    name: "Minimeals",
    slug: "minimeals",
    tagline: "Healthy meals made simple for modern families",
    year: "2025",
    category: "FOOD · WELLNESS",
    description:
      "Minimeals needed a brand and digital experience that made nutritious kids' meals feel convenient, trustworthy, and genuinely joyful. We designed a warm identity system and frictionless ordering flow tailored for busy parents.",
    image: "/portfolio/minimeals.png",
    brandColor: "#f08d49",
    client: "Minimeals",
    role: "Brand Identity, UI/UX Design, Motion Design",
    duration: "4 months",
    challenge:
      "Parents needed to understand nutrition, choose meals quickly, and trust the product quality at a glance. The challenge was balancing playful branding with the clarity and reassurance required for a family-focused food product.",
    solution:
      "We built a bright, friendly brand system supported by easy-to-scan packaging cues, a simple subscription experience, and clear nutritional messaging. Every touchpoint was designed to reduce decision fatigue and build parent confidence.",
    results: [
      "41% faster first-order completion",
      "Improved trust through clearer nutrition communication",
      "Consistent brand rollout across packaging and digital",
      "Subscription journey optimized for repeat orders",
    ],
    tags: ["Brand Identity", "Motion Design"],
    heroTitle: "A family-first food brand\nthat feels easy and joyful",
    heroDescription:
      "Creating a warm, trusted brand and ordering experience that helps parents choose nutritious meals without the usual friction.",
    aboutHeadline:
      "Minimeals was built for parents who want better meal options for their children but don't have time to decode complicated nutrition labels or confusing subscription flows.",
    aboutDescription:
      "We translated that need into a product experience built on warmth, clarity, and speed. The visual identity feels upbeat and modern, while the ordering journey simplifies choice architecture so families can decide with confidence in just a few steps.",
    challengeHeadline:
      "The challenge was to make a health-conscious product feel simple and delightful while keeping every decision point clear for busy families.",
    summaryHeadline:
      "The result is a food brand experience that feels both trustworthy and cheerful — helping Minimeals stand out in a crowded wellness market.",
    summaryDescription:
      "Minimeals now has a cohesive identity and digital journey that support both first-time conversion and repeat ordering. The brand feels approachable for children, dependable for parents, and flexible enough to grow across new product lines.",
  },
];
