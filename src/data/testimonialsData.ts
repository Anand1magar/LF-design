/** Used in the rotating carousel (currently hidden/reserved) */
export interface CarouselTestimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

/**
 * Featured testimonials with inline highlight segments.
 * The quote is split so the component can render highlighted spans.
 * Format: quote + highlight1 + mid + highlight2 + end
 */
export interface FeaturedTestimonial {
  quote: string;
  highlight1: string;
  mid: string;
  highlight2: string;
  end: string;
  name: string;
  role: string;
  avatar: string;
}

export const carouselTestimonials: CarouselTestimonial[] = [
  {
    quote:
      "Working with Leapfrog felt like adding a senior design team overnight. They understood our vision immediately and iterated faster than any agency we've worked with.",
    name: "Anita Patel",
    role: "VP Product, SaaS Platform",
    avatar:
      "https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFuJTIwZXhlY3V0aXZlfGVufDF8fHx8MTc3MTQ5MjczNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote:
      "The AI-augmented workflow they brought cut our design cycle in half. We went from concept to validated prototype in under three weeks.",
    name: "James Okoro",
    role: "Founder & CEO, Logistics Tech",
    avatar:
      "https://images.unsplash.com/photo-1769071166862-8cc3a6f2ac5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbiUyMGZvdW5kZXIlMjBzdGFydHVwfGVufDF8fHx8MTc3MTQ5MjczN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote:
      "Leapfrog doesn't just deliver pixels — they think in systems. Their component-driven approach gave us a design foundation we still build on today.",
    name: "Maya Lin",
    role: "Head of Design, EdTech Startup",
    avatar:
      "https://images.unsplash.com/photo-1646617747557-13b45b277bc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGdvbWFuJTIwZGVzaWduZXIlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NzE0MTkyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export const featuredTestimonials: FeaturedTestimonial[] = [
  {
    quote: "Leapfrog has been",
    highlight1: "invaluable to us",
    mid: "for what we do in our product. I highly",
    highlight2: "recommend them to anyone",
    end: "looking for speed without compromising with quality",
    name: "David Chen",
    role: "VP, Product Design",
    avatar:
      "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MTYxODk4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote: "Their AI-augmented process",
    highlight1: "cut our timelines in half",
    mid: "while keeping the craft. The team is",
    highlight2: "genuinely world-class",
    end: "and a pleasure to collaborate with on complex products",
    name: "Sarah Kim",
    role: "CTO, HealthTech",
    avatar:
      "https://images.unsplash.com/photo-1613483811459-1c4bb7a234f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFuJTIwZGVzaWduZXIlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NzE2NzYxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote: "Working with Leapfrog was",
    highlight1: "a turning point",
    mid: "for our brand. They delivered a design system that",
    highlight2: "scaled effortlessly",
    end: "across every touchpoint from web to mobile to print",
    name: "Marcus Rivera",
    role: "Founder, Fintech Startup",
    avatar:
      "https://images.unsplash.com/photo-1769071166862-8cc3a6f2ac5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMHN0YXJ0dXAlMjBmb3VuZGVyfGVufDF8fHx8MTc3MTYwNzM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote: "The prototypes they built were",
    highlight1: "production-ready",
    mid: "from day one. Their design-to-dev handoff is",
    highlight2: "the best I've seen",
    end: "in over a decade of building digital products",
    name: "Emily Watson",
    role: "Head of Engineering, EdTech",
    avatar:
      "https://images.unsplash.com/photo-1762505464553-1f4eb1578f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFuJTIwbWFya2V0aW5nJTIwbGVhZGVyfGVufDF8fHx8MTc3MTY3NjExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote: "Leapfrog didn't just redesign our app — they",
    highlight1: "reimagined our entire UX",
    mid: ". Their strategic thinking is",
    highlight2: "unmatched in the industry",
    end: "and our conversion rates prove it",
    name: "Alex Nakamura",
    role: "CPO, SaaS Platform",
    avatar:
      "https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGVuZ2luZWVyJTIwdGVjaHxlbnwxfHx8fDE3NzE2NzYxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote: "Every deliverable was",
    highlight1: "pixel-perfect",
    mid: "and arrived ahead of schedule. Their ability to",
    highlight2: "move fast without cutting corners",
    end: "is exactly what our startup needed",
    name: "Priya Sharma",
    role: "CEO, AI Startup",
    avatar:
      "https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFuJTIwZXhlY3V0aXZlfGVufDF8fHx8MTc3MTY3NjExMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote: "They brought",
    highlight1: "clarity to our chaos",
    mid: "and shipped a complete design system. I'd",
    highlight2: "hire them again in a heartbeat",
    end: "for any product we build going forward",
    name: "Tom Bradley",
    role: "VP Product, Logistics",
    avatar:
      "https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMHByb2R1Y3QlMjBtYW5hZ2VyfGVufDF8fHx8MTc3MTU4NTAzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];
