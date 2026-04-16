/** Site-wide configuration — single source of truth for brand, nav, and contact. */

export interface NavItem {
  label: string;
  /** "scroll" uses getElementById; "route" uses Next.js router.push */
  action: "scroll" | "route";
  target: string;
}

export const siteConfig = {
  name: "LF Studio",
  tagline: "AI augmented design studio",
  description:
    "We build brands, products, and experiences powered by AI — 65% more efficient, without compromising craft.",
  siteUrl: "https://www.lftechnology.com/lfdesign",
  contactEmail: "hello@lftechnology.com",
  social: {
    twitter: "https://x.com/lfdesignteam",
    tiktok: "https://www.tiktok.com/@leapfrogdesignteam",
    facebook: "https://www.facebook.com/leapfrogdesignteam/",
    instagram: "https://www.instagram.com/leapfrogdesignteam/",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Process",    action: "scroll", target: "process"   },
  { label: "AI x Design",action: "scroll", target: "ai-design" },
  { label: "Portfolio",  action: "route",  target: "/portfolio" },
  { label: "About",      action: "route",  target: "/about"    },
];
