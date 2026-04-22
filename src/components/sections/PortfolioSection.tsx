"use client";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { imgSrc } from "@/lib/img";
import imgMockup21 from "figma:asset/6344a2742e01c5662fe0e4e13522e4812f6b4628.png";
import svgPaths from "@/imports/svg-7tpy7wy2y6";
import { useRouter } from "next/navigation";
import { portfolioItems as sharedPortfolioItems } from "@/data/portfolioData";
import { SkeletonImage } from "@/components/ui/SkeletonImage";

/* ───── Logo SVGs per project ───── */
function AntarangaLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60.0784 63.2761"
      fill="none"
    >
      <path d={svgPaths.p25199280} fill="white" />
      <path d={svgPaths.p21e3c670} fill="white" />
      <path d={svgPaths.p29e48780} fill="white" />
    </svg>
  );
}

function SecondLookLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Stylized "SL" monogram */}
      <path
        d="M20 18C20 18 24 14 32 14C40 14 44 18 44 24C44 30 38 32 32 34C26 36 20 38 20 44C20 50 24 54 32 54C40 54 44 50 44 50"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  );
}

/* ───── Portfolio data ───── */
const portfolioItems = [
  {
    title: "Antaranga.ai",
    tag: "Case studies",
    bgColor: "bg-[#1a1a1a]",
    image: imgSrc(imgMockup21),
    imageStyle: "object-bottom",
    overlayColor: "rgba(170,83,17,0.13)",
    Logo: AntarangaLogo,
  },
  {
    title: "Second Look Health",
    tag: "Case studies",
    bgColor: "bg-[#8a90c6]",
    image: "/portfolio/second-look-health.png",
    imageStyle: "object-center",
    overlayColor: "rgba(90,80,160,0.18)",
    Logo: SecondLookLogo,
  },
];

/* ───── Portfolio Card with hover effect ───── */
function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
}) {
  const router = useRouter();
  // Map local portfolio titles to shared portfolio slugs
  const slugMap: Record<string, string> = {
    "Antaranga.ai": "antaranga-ai",
    "Second Look Health": "second-look-health",
  };
  const slug = slugMap[item.title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex flex-col gap-3.5"
    >
      {/* Card container */}
      <div
        className="relative rounded-md overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[547px] group cursor-pointer"
        onClick={() => slug && router.push(`/project/${slug}`)}
      >
        {/* Background color */}
        <div className={`absolute inset-0 ${item.bgColor}`} />

        {/* Image – scales up on hover */}
        <SkeletonImage
          alt={item.title}
          className={`absolute inset-0 w-full h-full ${item.imageStyle} object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
          src={item.image}
        />

        {/* Border overlay (always visible) */}
        <div className="absolute inset-0 rounded-md border border-white/10 pointer-events-none" />

        {/* Hover overlay: backdrop-blur + tinted bg + centered logo */}
        <div
          className="absolute inset-0 rounded-md flex flex-col items-start justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
          style={{
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            backgroundColor: item.overlayColor,
          }}
        >
          {/* Top row: tag + arrow button */}
          <div className="flex items-start justify-between w-full">
            <span className="bg-white/10 border border-white/10 text-white text-[10px] uppercase tracking-[1px] leading-[15px] px-[13px] py-[5px] rounded-full font-sans">
              {item.tag}
            </span>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Centered logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <item.Logo className="w-[60px] h-[63px] transition-transform duration-500 ease-out group-hover:scale-100 scale-75" />
          </div>
        </div>

        {/* Default state overlay (tag + button, visible when NOT hovered) */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 group-hover:opacity-0 transition-opacity duration-500">
          <div className="flex items-start justify-between">
            <span className="bg-white/10 border border-white/10 text-white text-[10px] uppercase tracking-[1px] px-4 py-1.5 rounded-full font-sans">
              {item.tag}
            </span>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Title row */}
      <div className="flex items-baseline gap-1 px-2.5">
        <span className="font-sans font-medium text-[#333] text-2xl leading-9 tracking-[-0.75px]">
          {item.title}
        </span>
        <span className="font-sans font-medium text-[#333] text-2xl leading-9 tracking-[-0.75px] opacity-[0.34]">
          CaseStudies
        </span>
      </div>
    </motion.div>
  );
}

/* ───── Placeholder card with same hover treatment ───── */
function PlaceholderCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex flex-col gap-3.5"
    >
      <div className="relative rounded-md overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[547px] group cursor-pointer">
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        <div className="absolute inset-0 rounded-md border border-white/10 pointer-events-none" />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 rounded-md flex flex-col items-start justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
          style={{
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            backgroundColor: "rgba(100,100,100,0.15)",
          }}
        >
          <div className="flex items-start justify-between w-full">
            <span className="bg-white/10 border border-white/10 text-white text-[10px] uppercase tracking-[1px] leading-[15px] px-[13px] py-[5px] rounded-full font-sans">
              Case studies
            </span>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AntarangaLogo className="w-[60px] h-[63px] transition-transform duration-500 ease-out group-hover:scale-100 scale-75" />
          </div>
        </div>

        {/* Default state */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 group-hover:opacity-0 transition-opacity duration-500">
          <div className="flex items-start justify-between">
            <span className="bg-white/10 border border-white/10 text-white text-[10px] uppercase tracking-[1px] px-4 py-1.5 rounded-full font-sans">
              Case studies
            </span>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-baseline gap-1 px-2.5">
        <span className="font-sans font-medium text-[#333] text-2xl leading-9 tracking-[-0.75px]">
          Antaranga.ai
        </span>
        <span className="font-sans font-medium text-[#333] text-2xl leading-9 tracking-[-0.75px] opacity-[0.34]">
          CaseStudies
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Portfolio Section
   ═══════════════════════════════════════════ */
export function PortfolioSection() {
  const router = useRouter();

  return (
    null
  );
}
