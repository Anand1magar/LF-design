"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";

/* ─── Card data — content + per-card Figma image placement ──────── */
type ImgStyle = {
  right?: number | string;
  left?: number | string;
  top?: number | string;
  bottom?: number | string;
  width: string;
  height: string;
  objectFit: "cover" | "contain";
};

const CARDS: Array<{
  id: string;
  stat: string;
  prefix: string;
  suffix: string;
  description: string;
  shortLabel: string;
  image: string;
  imgStyle: ImgStyle;
  fade: boolean;
}> = [
  {
    id: "01",
    stat: "8x",
    prefix: "We are ",
    suffix: " faster in character generation, storyboarding & short animations",
    description:
      "Our AI-powered approach makes the process simple and efficient, allowing us to spend more time on the creative storytelling that truly connects with your audience.",
    shortLabel: "We are 8x faster",
    image: "/images/faster-section/card-1-character.png",
    // Figma: left-[513px] top-[22px] w-[631px] h-[367px] in 1144×520 card
    imgStyle: { right: 0, top: "4%", width: "57%", height: "71%", objectFit: "cover" as const },
    fade: true,
  },
  {
    id: "02",
    stat: "Hours",
    prefix: "From Weeks to ",
    suffix: "",
    description:
      "Our smart AI tools allow us to build entire campaigns in a fraction of the time. This means you can launch premium content faster, stay ahead of your competitors, and see your vision come to life without the typical delays.",
    shortLabel: "From Weeks to Hours",
    image: "/images/faster-section/card-2-product.png",
    // Figma: left-[513px] top-[50px] w-[622px] h-[266px]
    imgStyle: { right: 0, top: "10%", width: "55%", height: "52%", objectFit: "cover" as const },
    fade: true,
  },
  {
    id: "03",
    stat: "80%",
    prefix: "Exceptional Quality, ",
    suffix: " Faster",
    description:
      "By harnessing GenAI, we cut production time from 3 weeks to 3 days, enabling us to bring creative ideas to life faster while maintaining exceptional quality.",
    shortLabel: "Exceptional Quality, 80% Faster",
    image: "/images/faster-section/card-3-quality.png",
    // Figma: right-[0.01px] top-0 w-[664px] h-[520px] — full height right panel
    imgStyle: { right: 0, top: 0, width: "58%", height: "100%", objectFit: "cover" as const },
    fade: true,
  },
  {
    id: "04",
    stat: "40%",
    prefix: "",
    suffix: " boost in design creation",
    description:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    shortLabel: "40% boost in design creation",
    image: "/images/faster-section/card-4-design.png",
    // Figma: right-[21px] top-[21px] w-[740px] h-[387.5px]
    imgStyle: { right: "2%", top: "4%", width: "65%", height: "75%", objectFit: "contain" as const },
    fade: false,
  },
  {
    id: "05",
    stat: "40%",
    prefix: "Professional Design, ",
    suffix: " Faster",
    description:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    shortLabel: "Professional Design, 40% Faster",
    image: "/images/faster-section/card-5-professional.png",
    // Figma: bottom-[-1px] right-[-25.99px] w-[716px] h-[483px]
    imgStyle: { right: "-2%", bottom: 0, width: "63%", height: "93%", objectFit: "cover" as const },
    fade: true,
  },
  {
    id: "06",
    stat: "97% Faster",
    prefix: "From Idea to Reality, ",
    suffix: ".",
    description:
      "Our smart AI tools cut project timelines down to size, delivering research and working prototypes in record time so you can test your ideas and launch with confidence.",
    shortLabel: "From Idea to Reality",
    image: "/images/faster-section/card-6-97faster.png",
    // Figma: right-[14px] top-0 w-[528px] h-[389px]
    imgStyle: { right: "1%", top: 0, width: "47%", height: "75%", objectFit: "contain" as const },
    fade: false,
  },
];

type CardData = (typeof CARDS)[number];

const COLLAPSED_H = 80;
const GAP = 12; // gap-3

function StatCard({
  card,
  isActive,
  isPast,
  cardProgress,
  expandedH,
}: {
  card: CardData;
  isActive: boolean;
  isPast: boolean;
  cardProgress: number;
  expandedH: number;
}) {
  return (
    <motion.div
      animate={{
        height: isPast ? 0 : isActive ? expandedH : COLLAPSED_H,
        marginBottom: isPast ? 0 : GAP,
        opacity: isPast ? 0 : 1,
      }}
      transition={{
        height:       { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
        marginBottom: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
        opacity:      { duration: 0.25 },
      }}
      className="overflow-hidden rounded-[12px] bg-(--bg-subtle) relative w-full shrink-0"
    >
      {/* ── Collapsed / past title ── */}
      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center px-[54px] pointer-events-none"
      >
        <p
          className="font-['Figtree',sans-serif] text-2xl font-normal leading-none"
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
        <span className="absolute top-[37px] left-[54px] font-['Figtree',sans-serif] text-sm text-black/40 select-none">
          {card.id}
        </span>

        {/* Image — positioned per Figma */}
        <SkeletonImage
          src={card.image}
          alt=""
          className="absolute pointer-events-none select-none"
          style={{
            right: card.imgStyle.right,
            left: card.imgStyle.left,
            top: card.imgStyle.top, 
            bottom: card.imgStyle.bottom,
            width: card.imgStyle.width,
            height: card.imgStyle.height,
            objectFit: card.imgStyle.objectFit,
          }}
        />

        {/* Gradient fade — blends image edge into card bg */}
        {card.fade && (
          <div
            className="absolute pointer-events-none"
            style={{
              right: card.imgStyle.right === 0 || card.imgStyle.right === "0" ? undefined : undefined,
              left: `calc(100% - ${card.imgStyle.width})`,
              top: card.imgStyle.top ?? 0,
              bottom: card.imgStyle.bottom ?? 0,
              width: "6rem",
              background: "linear-gradient(to right, var(--bg-subtle), transparent)",
            }}
          />
        )}

        {/* Left text panel — anchored to bottom (matches Figma top-[307px] in 520px card) */}
        <div className="absolute left-[54px] bottom-[44px] flex flex-col gap-3 w-[40%] max-w-[460px]">
          <p className="font-['Figtree',sans-serif] text-3xl xl:text-display-sm leading-[1.18] tracking-[-0.96px] text-(--color-ink-800)">
            {card.prefix && <span>{card.prefix}</span>}
            <span className="text-lf-green-bright font-semibold">{card.stat}</span>
            <span>{card.suffix}</span>
          </p>

          <p className="font-['Figtree',sans-serif] font-light text-sm leading-[21px] text-(--color-ink-600) opacity-80 max-w-[409px]">
            {card.description}
          </p>

          {/* Progress bar */}
          <div className="mt-4 h-[3px] w-full max-w-[426px] rounded-full bg-black/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-(--color-ink-450)"
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
  const [expandedH, setExpandedH] = useState(520);

  // Recalculate expanded card height so the active card + all future collapsed cards
  // always fit within the viewport. Past cards are removed from layout flow (height 0).
  // Worst case = first card active: 5 future cards below.
  // Formula: viewport - stickyTop(32) - pyPadding(48) - futureCards*(COLLAPSED_H+GAP) - activeMargin
  useEffect(() => {
    const calcExpandedH = () => {
      const available = window.innerHeight - 32 - 48; // top-8 + py-6 × 2
      const futureTotal = (CARDS.length - 1) * (COLLAPSED_H + GAP);
      const h = Math.min(520, Math.max(260, available - futureTotal - GAP));
      setExpandedH(h);
    };
    calcExpandedH();
    window.addEventListener("resize", calcExpandedH, { passive: true });
    return () => window.removeEventListener("resize", calcExpandedH);
  }, []);

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
      <div
        className="sticky top-8 bg-white py-6 overflow-hidden"
        style={{ height: "calc(100vh - 2rem)" }}
      >
        <div className="h-full w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col">
          {CARDS.map((card, i) => (
            <StatCard
              key={card.id}
              card={card}
              isActive={i === activeIndex}
              isPast={i < activeIndex}
              expandedH={expandedH}
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
