import { imgSrc } from "@/lib/img";
import _imgTripadvisor from "figma:asset/c5c727b5e432f23b7b4e7058b4378a3881fbd272.png";
import _imgMockup21 from "figma:asset/6344a2742e01c5662fe0e4e13522e4812f6b4628.png";
import _imgImage230 from "figma:asset/8217a4299dbfea759f73b93507ed63e182dcccda.png";

const imgTripadvisor = imgSrc(_imgTripadvisor);
const imgMockup21 = imgSrc(_imgMockup21);
const imgImage230 = imgSrc(_imgImage230);

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
    name: "Tripadvisor",
    slug: "tripadvisor",
    tagline: "Every type of traveler, every type of trip",
    year: "2025",
    category: "TRAVEL",
    description:
      "For 25 years, Tripadvisor has been the world's travel companion, with real reviews, real advice, straight from real people. But in a race to compete with booking engines and comparison sites on price and capacity, the brand risked losing its edge. We set out to refocus on what makes Tripadvisor unique: its community of real travelers, and their real reviews.",
    image: imgTripadvisor,
    brandColor: "#00af87",
    client: "Tripadvisor Inc.",
    role: "Brand Strategy, Visual Identity, Digital Experience",
    duration: "6 months",
    challenge:
      "Tripadvisor was losing its differentiation in a crowded market dominated by price-comparison engines. The brand needed to reconnect with its core value proposition: authentic community-driven travel guidance.",
    solution:
      "We crafted a refreshed visual identity and digital experience that puts real traveler stories front and center. A new design system was built to scale across web, mobile, and marketing touchpoints, emphasizing trust, authenticity, and the joy of discovery.",
    results: [
      "32% increase in user engagement",
      "18% improvement in brand perception scores",
      "2.4x increase in community-generated content",
      "Consistent experience across 48 markets",
    ],
    tags: ["Branding", "Digital Experience"],
    heroTitle: "Reconnecting travelers\nwith authentic discovery",
    heroDescription:
      "Transforming a 25-year travel icon by refocusing on what makes it unique: real community, real stories, and real guidance.",
    aboutHeadline:
      "Tripadvisor came to us at a crossroads: a beloved brand that had drifted into price-comparison territory. The community-driven heart of the platform was being overshadowed by transactional features, and the brand identity no longer reflected the warmth of authentic travel discovery.",
    aboutDescription:
      "We set out to recapture the spirit of real travel advice. The identity was rebuilt around storytelling, warmth, and trust \u2014 shifting from a booking tool back to a travel companion. Photography direction, typography, and the digital experience were all redesigned to center the voices of real travelers.",
    challengeHeadline:
      "The challenge was to differentiate Tripadvisor in a market saturated by booking engines \u2014 without losing the trust and recognition built over two decades.",
    summaryHeadline:
      "The transformation gave Tripadvisor more than a visual refresh \u2014 it reconnected the brand with its community-first DNA, driving engagement and loyalty across 48 markets.",
    summaryDescription:
      "With a refreshed brand system and reimagined digital touchpoints, Tripadvisor now stands apart from price-first competitors. The new identity celebrates authentic traveler stories, creating a platform experience that feels personal, trustworthy, and genuinely helpful.",
  },
  {
    name: "Antaranga.ai",
    slug: "antaranga-ai",
    tagline: "Mental health reimagined through AI",
    year: "2024",
    category: "HEALTH \u00B7 AI",
    description:
      "Antaranga.ai needed a product that could bridge the gap between AI-driven mental health screening and human empathy. We designed and shipped a full platform \u2014 from onboarding to clinical dashboards \u2014 that felt approachable to patients and powerful for clinicians.",
    image: imgMockup21,
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
    name: "Second Look Health",
    slug: "second-look-health",
    tagline: "Diagnostic confidence at every stage",
    year: "2024",
    category: "HEALTHCARE",
    description:
      "Second Look Health provides second-opinion diagnostics powered by expert radiologists and AI. We redesigned their entire patient-facing experience \u2014 from scan upload to results delivery \u2014 creating a calmer, more transparent journey that builds trust at every step.",
    image: imgImage230,
    brandColor: "#7b84b8",
    client: "Second Look Health Corp.",
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
      "Second Look Health serves patients at their most anxious \u2014 seeking a second opinion on a diagnosis that could change their lives. The existing platform added complexity when it should have provided reassurance.",
    aboutDescription:
      "We rebuilt the entire patient journey around three principles: simplicity, transparency, and empathy. A 3-step upload flow replaced a 12-field form. Real-time status tracking used clear, human language. Results were presented with context and care, not clinical detachment.",
    challengeHeadline:
      "The challenge was to radically simplify a high-stakes medical experience while meeting strict HIPAA compliance standards.",
    summaryHeadline:
      "The redesign transformed a stressful process into one that builds confidence \u2014 proving that healthcare platforms can be both compliant and compassionate.",
    summaryDescription:
      "With a 4.8/5 patient trust rating and 60% faster turnaround, Second Look Health now delivers diagnostic confidence with the clarity and calm that patients deserve. The comprehensive design system ensures this quality scales across every touchpoint.",
  },
  {
    name: "StreamVault",
    slug: "streamvault",
    tagline: "Premium content, seamlessly delivered",
    year: "2025",
    category: "ENTERTAINMENT",
    description:
      "StreamVault was entering a saturated market and needed a distinctive edge. We crafted a visual identity and interface system that feels cinematic \u2014 dark, immersive, and effortlessly navigable \u2014 helping them stand out in a sea of sameness with a truly premium streaming experience.",
    image:
      "https://images.unsplash.com/photo-1761044590861-71df31e43d0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBwbGF0Zm9ybSUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzE2NDE3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    brandColor: "#6c5ce7",
    client: "StreamVault Entertainment Ltd.",
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
      "StreamVault launched to critical acclaim with 28% higher session durations than the industry average. The cinematic design language has become the brand's signature, proving that premium aesthetics and usability can coexist in streaming.",
  },
];
