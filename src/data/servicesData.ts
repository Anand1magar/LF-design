import { imgSrc } from "@/lib/img";
import imgVisualBrandingAsset from "src/assets/services/visual_branding.webp";

const imgVisualBranding = imgSrc(imgVisualBrandingAsset);

export interface ServiceDetail {
  title: string;
  /** URL-encoded path under /images/service images/ */
  image: string;
  subtitle: string;
  items: string[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    title: "Visual Branding",
    image: imgVisualBranding,
    subtitle:
      "We craft visuals that resonate emotionally and make your brand unforgettable.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
  {
    title: "Business Collaterals",
    image: "/images/service%20images%20/Business%20Collaterals.png",
    subtitle:
      "We create polished business materials like business cards, brochures, and presentations that make your brand look credible and trustworthy.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
  {
    title: "Product Design",
    image: "/images/service%20images%20/Product%20Design.png",
    subtitle:
      "We design easy-to-use digital products (like apps, websites, or custom software) that work flawlessly for your customers and help your business grow.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
  {
    title: "Motion Graphics",
    image: "/images/service%20images%20/Motion%20Design.png",
    subtitle:
      "We bring your ideas to life with engaging animations from explainer videos to social media clips that capture attention and tell your story clearly to your audience.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
  {
    title: "Marketing Collateral",
    image: "/images/service%20images%20/Marketing%20Collateral.png",
    subtitle:
      "We transform your brand with clear marketing materials like brochures and digital assets that make your business look trustworthy and easy to talk to.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
];
