"use client";

import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { imgSrc } from "@/lib/img";
import imgUxFunnelAsset from "@/assets/cf744f1a96eb6285067a9e5d5faaf0f466edc248.png";
import imgDesignBooksAsset from "src/assets/efficiency/general-graphic-design.png";
import imgCharacterFlowAsset from "src/assets/efficiency/character-generation.png";
import imgIllustrationsBoardAsset from "src/assets/efficiency/illustrations-character-consistency.png";
import img3dCombinedAsset from "src/assets/efficiency/3d-renderings-animations.png";

const imgCharacterFlow = imgSrc(imgCharacterFlowAsset);
const imgProductWeeksToHours = "/images/efficiency/product-photography-showcase.png";
const imgIllustrationsBoard = imgSrc(imgIllustrationsBoardAsset);
const img3dCombined = imgSrc(img3dCombinedAsset);
const imgDesignBooks = imgSrc(imgDesignBooksAsset);
const imgUxFunnel = imgSrc(imgUxFunnelAsset);

import { featureTabs, type Variant } from "@/data/efficiencyData";

/* ─── Figma-accurate desktop image positions ────────────────────── */
// Each container covers the full panel; images use absolute positioning
// exactly as specified in the Figma frames (First → Sixth card).
function DesktopSlide({ variant }: { variant: Variant }) {
  switch (variant) {
    // First card: right-[-38px] bottom-[15px] w-[672px] h-[391px]
    case "character":
      return (
        <img
          alt="Character generation workflow"
          className="absolute right-[-38px] bottom-[15px] w-[672px] h-[391px] object-cover pointer-events-none"
          src={imgCharacterFlow}
        />
      );
    // Second card: right-0 bottom-0 w-[706px] h-[302px]
    case "product":
      return (
        <img
          alt="From weeks to hours — product photography"
          className="absolute right-0 bottom-0 w-[706px] h-[302px] object-cover pointer-events-none"
          src={imgProductWeeksToHours}
        />
      );
    // Third card: left-[48px] top-[147px] w-[863px] h-[372px]
    case "3d":
      return (
        <img
          alt="3D renderings timeline"
          className="absolute left-[48px] top-[147px] w-[863px] h-[372px] object-cover pointer-events-none"
          src={img3dCombined}
        />
      );
    // Fifth card: left-[248px] top-[76px] w-[656px] h-[443px]
    case "design":
      return (
        <img
          alt="Professional graphic design"
          className="absolute left-[248px] top-[76px] w-[656px] h-[443px] object-cover pointer-events-none"
          src={imgDesignBooks}
        />
      );
    // Fourth card: right-0 bottom-0 w-[684px] h-[358px]
    case "illustrations":
      return (
        <img
          alt="Illustrations and character consistency"
          className="absolute right-0 bottom-0 w-[684px] h-[358px] object-cover pointer-events-none"
          src={imgIllustrationsBoard}
        />
      );
    // Sixth card: right-[27px] bottom-0 w-[497px] h-[366px]
    case "ux":
      return (
        <img
          alt="UX workflow funnel diagram"
          className="absolute right-[27px] bottom-0 w-[497px] h-[366px] object-cover pointer-events-none"
          src={imgUxFunnel}
        />
      );
  }
}

/* ─── Mobile image positions (scaled down, same anchors) ─────────── */
const MOBILE_CONTAINER: Record<Variant, CSSProperties> = {
  character:     { right: "0",  bottom: "0",   width: "90%",  height: "55%" },
  product:       { right: "0",  bottom: "0",   width: "100%", height: "50%" },
  "3d":          { left: "0",   bottom: "0",   width: "100%", height: "58%" },
  design:        { right: "0",  top: "42%",    width: "85%",  height: "58%" },
  illustrations: { right: "0",  bottom: "0",   width: "85%",  height: "52%" },
  ux:            { right: "0",  bottom: "0",   width: "80%",  height: "52%" },
};

/* ─── Desktop text position per Figma card ───────────────────────── */
const DESKTOP_TEXT_CLASS: Record<Variant, string> = {
  character:     "left-[45px] top-[45px] max-w-[460px]",
  product:       "left-[45px] top-[45px] max-w-[435px]",
  "3d":          "left-[45px] top-[45px] max-w-[435px]",
  design:        "left-[43px] top-[48px] max-w-[460px]",
  illustrations: "left-[43px] top-[48px] max-w-[460px]",
  ux:            "left-[45px] top-[45px] max-w-[460px]",
};

const DESKTOP_DESC_CLASS: Record<Variant, string> = {
  character:     "max-w-[403px]",
  product:       "max-w-[435px]",
  "3d":          "max-w-[435px]",
  design:        "max-w-[409px]",
  illustrations: "max-w-[409px]",
  ux:            "max-w-[460px]",
};

/* ─── Component ──────────────────────────────────────────────────── */
export function AiEfficiencySection() {
  const [activeTab, setActiveTab] = useState(0);
  const AUTO_CYCLE = 3500;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const advanceTab = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % featureTabs.length);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(advanceTab, AUTO_CYCLE);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeTab, advanceTab]);

  useEffect(() => {
    const container = tabsScrollRef.current;
    const el = tabRefs.current[activeTab];
    if (container && el) {
      const scrollLeft = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [activeTab]);

  const handleTabClick = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveTab(i);
  };

  const activeFeature = featureTabs[activeTab];

  const renderTitle = (tab: (typeof featureTabs)[number]) => {
    const title = tab.slideTitle;
    if (!title) {
      // "We are 8x faster..."
      return (
        <>
          <span>We are </span>
          <motion.span
            className="font-semibold text-lf-green-bright inline-block"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {tab.speedup}
          </motion.span>
          <span> {tab.title}</span>
        </>
      );
    }
    const idx = title.indexOf(tab.speedup);
    if (idx < 0) return <span>{title}</span>;
    return (
      <>
        <span>{title.slice(0, idx)}</span>
        <motion.span
          className="font-semibold text-lf-green-bright inline-block"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {tab.speedup}
        </motion.span>
        <span>{title.slice(idx + tab.speedup.length)}</span>
      </>
    );
  };

  return (
    <section className="bg-white m-0 p-[128px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-[1190px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-10 border-b border-[#e5e5e5]"
      >
        <h2 className="font-sans font-light text-[28px] sm:text-3xl md:text-5xl leading-tight tracking-tight">
          <span className="text-lf-green-bright">65%</span>
          <span className="text-[#1a1a1a]"> more efficient</span>
        </h2>
        <p className="font-sans font-light text-[#888] text-base leading-relaxed max-w-[404px] mt-4 md:mt-0">
          Comprehensive design services for digital growth.
        </p>
      </motion.div>

      <div className="max-w-[1190px] mx-auto flex flex-col gap-6 lg:gap-8">

        {/* ═══ MOBILE: Horizontal tab bar ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative lg:hidden"
        >
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#e5e5e5]" />
          <div
            ref={tabsScrollRef}
            className="flex gap-[6px] md:gap-[22px] overflow-x-auto no-scrollbar relative"
          >
            {featureTabs.map((tab, i) => (
              <button
                key={tab.label}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => handleTabClick(i)}
                className="shrink-0 relative pb-[10px] pt-[10px] px-[10px] md:px-[4px] transition-colors duration-300"
              >
                <span
                  className={`font-sans text-base md:text-xl leading-[32px] tracking-[-0.6px] whitespace-nowrap transition-all duration-300 ${
                    activeTab === i ? "text-lf-green-bright font-medium" : "text-[#1a1a1a] opacity-60"
                  }`}
                >
                  {tab.label}
                </span>
                {activeTab === i && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
                    layoutId="tab-underline-mobile-2"
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.div
                      key={`prog-mob-${activeTab}`}
                      className="w-full h-full origin-left"
                      style={{ background: "linear-gradient(90deg, #a4e654 0%, #87D032 100%)" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_CYCLE / 1000, ease: "linear" }}
                    />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ═══ MOBILE: Slide panel ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:hidden"
        >
          <div className="bg-[#f9f9f9] rounded-[20px] overflow-hidden min-h-[500px] md:min-h-[540px] relative">
            {/* Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-m2-${activeTab}`}
                className="absolute left-6 md:left-[45px] top-8 md:top-[45px] max-w-[300px] md:max-w-[460px] z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="font-sans text-[#111] text-[22px] md:text-[32px] leading-snug tracking-[-0.96px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  {renderTitle(activeFeature)}
                </motion.p>
                <motion.p
                  className="font-sans font-light text-[#333] text-[13px] md:text-base leading-[21px] mt-3 opacity-80 max-w-[280px] md:max-w-[403px]"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {activeFeature.slideDescription ?? activeFeature.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-m2-${activeTab}`}
                className="absolute"
                style={MOBILE_CONTAINER[activeFeature.variant]}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  alt={activeFeature.label}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  src={
                    activeFeature.variant === "character" ? imgCharacterFlow
                    : activeFeature.variant === "product" ? imgProductWeeksToHours
                    : activeFeature.variant === "3d" ? img3dCombined
                    : activeFeature.variant === "design" ? imgDesignBooks
                    : activeFeature.variant === "illustrations" ? imgIllustrationsBoard
                    : imgUxFunnel
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ═══ DESKTOP: Sidebar tabs + content panel ═══ */}
        <div className="hidden lg:flex gap-0 min-h-[520px]">

          {/* Left — vertical tab list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-[280px] shrink-0 flex flex-col gap-0 pt-2"
          >
            {featureTabs.map((tab, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={tab.label}
                  onClick={() => handleTabClick(i)}
                  className="relative text-left py-[14px] pl-5 pr-4 cursor-pointer transition-colors duration-200 group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e0e0e0]" />
                  {isActive && (
                    <motion.div
                      key={`beam2-${activeTab}`}
                      className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
                      style={{ background: "linear-gradient(180deg, #a4e654 0%, #87D032 100%)" }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: AUTO_CYCLE / 1000, ease: "linear" }}
                    />
                  )}
                  <span
                    className={`font-sans text-base leading-[24px] tracking-[-0.2px] transition-all duration-300 ${
                      isActive ? "text-lf-green-bright font-medium" : "text-[#999] group-hover:text-[#666]"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Right — content panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 bg-[#f9f9f9] rounded-[20px] overflow-hidden relative"
          >
            {/* Text overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-d2-${activeTab}`}
                className={`absolute z-10 ${DESKTOP_TEXT_CLASS[activeFeature.variant]}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="font-sans text-[#111] text-[32px] leading-snug tracking-[-0.96px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  {renderTitle(activeFeature)}
                </motion.p>
                <motion.p
                  className={`font-sans font-light text-[#333] text-base leading-[21px] mt-3 opacity-80 ${DESKTOP_DESC_CLASS[activeFeature.variant]}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {activeFeature.slideDescription ?? activeFeature.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Slide image — full-panel container, image positions itself per Figma */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-d2-${activeTab}`}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <DesktopSlide variant={activeFeature.variant} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
