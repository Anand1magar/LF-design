"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { imgSrc } from "@/lib/img";
import imgCharacterFlowAsset from "src/assets/efficiency/character_generatio.png";
import imgDesignBooksAsset from "src/assets/efficiency/General graphic design.png";
import img3dCombinedAsset from "src/assets/efficiency/3D renderings & animations.png";
import imgIllustrationsBoardAsset from "src/assets/efficiency/Illustrations & character consistency.png";

const imgCharacterFlow = imgSrc(imgCharacterFlowAsset);
const imgProduct = "/images/efficiency/product-photography-showcase.png";
const img3d = imgSrc(img3dCombinedAsset);
const imgIllustrations = imgSrc(imgIllustrationsBoardAsset);

const CARDS = [
  {
    id: "01",
    stat: "8x",
    prefix: "We are ",
    suffix: " faster in character generation, storyboarding & short animations",
    description:
      "Our AI-powered approach makes the process simple and efficient, allowing us to spend more time on the creative storytelling that truly connects with your audience.",
    shortLabel: "We are 8x faster",
    image: imgCharacterFlow,
  },
  {
    id: "02",
    stat: "5x",
    prefix: "We are ",
    suffix: " faster in product photography setups & video production",
    description:
      "AI-powered scene generation and compositing dramatically reduce shoot preparation time while maintaining photorealistic quality.",
    shortLabel: "We are 5x faster",
    image: imgProduct,
  },
  {
    id: "03",
    stat: "80%",
    prefix: "",
    suffix: " faster in 3D renderings & animations pipeline",
    description:
      "Automated mesh generation and texture synthesis accelerate our 3D pipeline from concept to final render.",
    shortLabel: "80% faster in 3D renderings",
    image: img3d,
  },
  {
    id: "04",
    stat: "40%",
    prefix: "",
    suffix: " faster in graphic design and visual system creation",
    description:
      "Our AI-powered process reduces project timelines and maximises your budget, delivering high-quality results in record time without cutting corners.",
    shortLabel: "40% faster graphic design",
    image: imgIllustrations,
  },
] as const;

type CardData = (typeof CARDS)[number];

const COLLAPSED_H = 80;
const EXPANDED_H = 520;

function StatCard({
  card,
  isActive,
  isPast,
  cardProgress,
}: {
  card: CardData;
  isActive: boolean;
  isPast: boolean;
  cardProgress: number;
}) {
  return (
    <motion.div
      animate={{ height: isActive ? EXPANDED_H : COLLAPSED_H }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden rounded-[32px] bg-[#f9f9f9] relative w-full shrink-0"
    >
      {/* ── Collapsed / past title ── */}
      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center px-[54px] pointer-events-none"
      >
        <p
          className="font-['Figtree',sans-serif] text-[24px] font-normal leading-none"
          style={{ color: isPast ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.28)" }}
        >
          {card.shortLabel}
        </p>
      </motion.div>

      {/* ── Expanded content ── */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
        className="absolute inset-0"
      >
        {/* Index */}
        <span className="absolute top-[37px] left-[54px] font-['Figtree',sans-serif] text-[13px] text-black/40 select-none">
          {card.id}
        </span>

        {/* Image — right panel */}
        <div className="absolute right-0 top-0 bottom-0 w-[58%] overflow-hidden rounded-r-[32px]">
          <img
            src={card.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
          {/* subtle left fade so image blends into card bg */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        </div>

        {/* Left text panel — anchored to bottom */}
        <div className="absolute left-[54px] bottom-[44px] flex flex-col gap-3 w-[40%] max-w-[442px]">
          <p className="font-['Figtree',sans-serif] text-[30px] xl:text-[32px] leading-[1.18] tracking-[-0.96px] text-[#111]">
            {card.prefix && <span>{card.prefix}</span>}
            <span className="text-[#87D032] font-semibold">{card.stat}</span>
            <span>{card.suffix}</span>
          </p>

          <p className="font-['Figtree',sans-serif] text-[15px] leading-[21px] text-[#333] opacity-80 max-w-[400px]">
            {card.description}
          </p>

          {/* Progress bar */}
          <div className="mt-6 h-[3px] w-full max-w-[426px] rounded-full bg-black/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#979591]"
              animate={{ width: `${Math.round(cardProgress * 100)}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FasterSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const wrapperHeight = wrapperRef.current.offsetHeight;
      const vh = window.innerHeight;
      const scrollable = wrapperHeight - vh;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const total = CARDS.length;
  const scaled = scrollProgress * total;
  const activeIndex = Math.min(Math.floor(scaled), total - 1);
  const cardProgress = scaled - activeIndex;

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center bg-white">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col gap-3">
          {CARDS.map((card, i) => (
            <StatCard
              key={card.id}
              card={card}
              isActive={i === activeIndex}
              isPast={i < activeIndex}
              cardProgress={
                i === activeIndex ? cardProgress : i < activeIndex ? 1 : 0
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
