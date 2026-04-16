"use client";

import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { imgSrc } from "@/lib/img";
import imgNew41 from "@/assets/55c65964acf381f39e149e590d4f29d001407366.png";
import imgImage261 from "@/assets/9e9883e10bfa0a4716f23af030b659806d17d3d8.png";
import imgSlideRef from "@/assets/02edef305339b1d37ff3fad24f47d669793f2de7.png";
import imgNew21 from "@/assets/c3673978eea43432454b7b5f17d61fdb0b4075f9.png";
import imgSlide02 from "@/assets/7052aabef142b9d4ff27394a578703bd7127ba8b.png";
/* General graphic design tab — composite book mockup image */
import imgDesignBooks from "src/assets/efficiency/General graphic design.png";
/* Illustrations & character consistency tab — collage images
   TODO: Replace these placeholders with actual Figma exports once available */
const _illusPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23e8e4df' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='14'%3EIllustration%3C/text%3E%3C/svg%3E";
const imgIllusLock = _illusPlaceholder;
const imgIllusRobot = _illusPlaceholder;
const imgIllusKid = _illusPlaceholder;
const imgIllusDJ = _illusPlaceholder;
const imgIllusBottles = _illusPlaceholder;
const imgIllusStorybooks = _illusPlaceholder;
/* UX workflows tab — funnel diagram image */
import imgUxFunnel from "@/assets/cf744f1a96eb6285067a9e5d5faaf0f466edc248.png";

/* Character generation flow */
import imgCharacterFlowAsset from "src/assets/efficiency/character_generatio.png";
/* Product photography — weeks to hours */
/* Illustrations board */
import imgIllustrationsBoardAsset from "src/assets/efficiency/Illustrations & character consistency.png";
/* 3D Figma — timeline */
import img3dFigmaTimelineAsset from "@/assets/c9ed2f2aae57444586212c419b0c4b8f66035639.png";
/* 3D Figma — cards */
import img3dFigmaCardsAsset from "@/assets/06748153debd0491677e40b76400489d923c031a.png";
/* 3D Figma — combined composition */
import img3dFigmaCombinedAsset from "src/assets/efficiency/3D renderings & animations.png";

const imgCharacterFlow = imgSrc(imgCharacterFlowAsset);
const imgProductWeeksToHours = "/images/efficiency/efficent%20img2.png";
const imgIllustrationsBoard = imgSrc(imgIllustrationsBoardAsset);
const img3dFigmaTimeline = imgSrc(img3dFigmaTimelineAsset);
const img3dFigmaCards = imgSrc(img3dFigmaCardsAsset);
const img3dFigmaCombined = imgSrc(img3dFigmaCombinedAsset);

const featureTabs = [
  {
    label: "Character generation",
    speedup: "8x",
    title: "faster in character generation, storyboarding & short animations",
    description:
      "Our AI-powered approach makes the process simple and efficient, allowing us to spend more time on the creative storytelling that truly connects with your audience.",
    customSlide: "character" as const,
  },
  {
    label: "Product photography & video",
    speedup: "5x",
    title: "faster in product photography setups & video production",
    slideTitle: "From Weeks to Hours",
    description:
      "AI-powered scene generation and compositing dramatically reduce shoot preparation time while maintaining photorealistic quality.",
    slideDescription:
      "Our smart AI tools allow us to build entire campaigns in a fraction of the time. This means you can launch premium content faster, stay ahead of your competitors, and see your vision come to life without the typical delays.",
    textMaxWidth: "435px",
    customSlide: true,
  },
  {
    label: "3D renderings & animations",
    speedup: "80%",
    title: "Faster",
    slideTitle: "Exceptional Quality, 80% Faster",
    description:
      "Automated mesh generation and texture synthesis accelerate our 3D pipeline from concept to final render.",
    slideDescription:
      "By harnessing GenAI, we cut production time from 3 weeks to 3 days, enabling us to bring creative ideas to life faster while maintaining exceptional quality.",
    customSlide: "3d" as const,
  },
  {
    label: "General graphic design",
    speedup: "40%",
    title: "Faster",
    slideTitle: "Professional Design, 40% Faster",
    description:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    slideDescription:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    textMaxWidth: "460px",
    customSlide: "design" as const,
  },
  {
    label: "Illustrations & character consistency",
    speedup: "40%",
    title: "boost in design creation",
    slideTitle: "40% boost in design creation",
    description:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    slideDescription:
      "Our AI-powered process reduces project timelines and maximizes your budget, allowing us to deliver high-quality results in record time without ever cutting corners.",
    customSlide: "illustrations" as const,
  },
  {
    label: "UX workflows and rapid PoC generation",
    speedup: "97%",
    title: "Faster",
    slideTitle: "From Idea to Reality, 97% Faster.",
    description:
      "Our smart AI tools cut project timelines down to size, delivering research and working prototypes in record time so you can test your ideas and launch with confidence",
    slideDescription:
      "Our smart AI tools cut project timelines down to size, delivering research and working prototypes in record time so you can test your ideas and launch with confidence",
    customSlide: "ux" as const,
  },
];

/* One hero slide image per tab */
const slideImages = [
  imgSrc(imgImage261),    // Character generation workflow
  imgSrc(imgSlide02),     // Product photography & video
  imgSrc(imgNew21),       // 3D renderings
  imgSrc(imgNew41),       // Graphic design
  imgSrc(imgIllusStorybooks), // Illustrations (fallback)
  imgSrc(imgUxFunnel),    // UX workflows
];

type SlideVariant = "default" | "product" | "3d" | "design" | "illustrations" | "character" | "ux";

const getSlideVariant = (customSlide: (typeof featureTabs)[number]["customSlide"]): SlideVariant => {
  if (customSlide === true) return "product";
  if (
    customSlide === "3d" ||
    customSlide === "design" ||
    customSlide === "illustrations" ||
    customSlide === "character" ||
    customSlide === "ux"
  ) {
    return customSlide;
  }
  return "default";
};

// Centralized layout config: edit these values in one place.
const MOBILE_SLIDE_CONTAINER_STYLE: Record<SlideVariant, CSSProperties> = {
  default: { left: "15%", top: "38%", width: "85%", height: "65%" },
  product: { left: "0", top: "34%", width: "100%", height: "62%" },
  "3d": { left: "0", top: "0", width: "100%", height: "100%" },
  design: { left: "0", top: "42%", width: "100%", height: "58%" },
  illustrations: { left: "0", top: "42%", width: "100%", height: "58%" },
  character: { left: "0", top: "36%", width: "100%", height: "64%" },
  ux: { left: "10%", top: "45%", width: "90%", height: "60%" },
};

const DESKTOP_SLIDE_CONTAINER_STYLE: Record<SlideVariant, CSSProperties> = {
  default: { left: "40%", top: "auto", bottom: "0", width: "60%", height: "100%" },
  product: { left: "auto", right: "18px", top: "auto", bottom: "15px", width: "749px", height: "277px" },
  "3d": { left: "0", top: "0", bottom: "0", width: "100%", height: "100%" },
  design: { left: "0", top: "0", bottom: "0", width: "100%", height: "100%" },
  illustrations: { left: "0", top: "0", bottom: "0", width: "100%", height: "100%" },
  character: { left: "0", top: "0", width: "100%", height: "100%" },
  ux: { left: "0", right: "0", top: "0", bottom: "0", width: "100%", height: "100%" },
};

const DESKTOP_TEXT_CLASS: Record<SlideVariant, string> = {
  default: "left-16 top-14 max-w-[460px]",
  product: "left-[45px] top-[45px] max-w-[435px]",
  "3d": "left-16 top-14 max-w-[460px]",
  design: "left-16 top-14 max-w-[460px]",
  illustrations: "left-16 top-14 max-w-[460px]",
  character: "left-16 top-14 max-w-[460px]",
  ux: "left-[45px] top-[45px] max-w-[460px]",
};

const DESKTOP_DESC_CLASS: Record<SlideVariant, string> = {
  default: "max-w-[409px]",
  product: "max-w-[435px]",
  "3d": "max-w-[409px]",
  design: "max-w-[409px]",
  illustrations: "max-w-[409px]",
  character: "max-w-[409px]",
  ux: "max-w-[460px]",
};

export function EfficiencySection() {
  const [activeTab, setActiveTab] = useState(0);
  const AUTO_CYCLE_DURATION = 3500; // 3.5 seconds
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const advanceTab = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % featureTabs.length);
  }, []);

  // Auto-cycle timer
  useEffect(() => {
    timerRef.current = setTimeout(advanceTab, AUTO_CYCLE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, advanceTab]);

  // Auto-scroll the tab bar to keep active tab visible
  useEffect(() => {
    const container = tabsScrollRef.current;
    const activeEl = tabRefs.current[activeTab];
    if (container && activeEl) {
      const scrollLeft =
        activeEl.offsetLeft -
        container.offsetWidth / 2 +
        activeEl.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [activeTab]);

  // Manual tab click resets the timer
  const handleTabClick = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveTab(i);
  };

  const activeFeature = featureTabs[activeTab];
  const activeVariant = getSlideVariant(activeFeature.customSlide);

  /** Render tab title — highlights speedup value in green when found inside slideTitle */
  const renderTitle = (tab: (typeof featureTabs)[number]) => {
    if (tab.slideTitle) {
      const idx = tab.slideTitle.indexOf(tab.speedup);
      if (idx >= 0) {
        return (
          <>
            <span>{tab.slideTitle.slice(0, idx)}</span>
            <motion.span
              className="font-semibold text-[#87D032] inline-block"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {tab.speedup}
            </motion.span>
            <span>{tab.slideTitle.slice(idx + tab.speedup.length)}</span>
          </>
        );
      }
      return tab.slideTitle;
    }
    return (
      <>
        <span>We are </span>
        <motion.span
          className="font-semibold text-[#87D032] inline-block"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {tab.speedup}
        </motion.span>
        <span>{" "}{tab.title}</span>
      </>
    );
  };

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-[100px] md:py-[128px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-[1190px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-10 border-b border-[#e5e5e5]"
      >
        <h2 className="font-['Figtree',sans-serif] font-light text-[28px] sm:text-3xl md:text-[48px] leading-tight tracking-tight">
          <span className="text-[#87D032]">65%</span>
          <span className="text-[#1a1a1a]"> more efficient</span>
        </h2>
        <p className="font-['Figtree',sans-serif] font-light text-[#888] text-base leading-relaxed max-w-[404px] mt-4 md:mt-0">
            Comprehensive design services for digital growth.
        </p>
      </motion.div>
      <div className="max-w-[1190px] mx-auto flex flex-col gap-6 lg:gap-8">

        {/* ═══ MOBILE: Horizontal Tab Bar (< lg) — original layout ═══ */}
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
                  className={`font-['Figtree',sans-serif] text-[16px] md:text-[20px] leading-[32px] tracking-[-0.6px] whitespace-nowrap transition-all duration-300 ${
                    activeTab === i
                      ? "text-[#87D032] font-medium"
                      : "text-[#1a1a1a] opacity-60"
                  }`}
                >
                  {tab.label}
                </span>
                {activeTab === i && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
                    layoutId="tab-underline-mobile"
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.div
                      key={`progress-mob-${activeTab}`}
                      className="w-full h-full origin-left"
                      style={{ background: "linear-gradient(90deg, #a4e654 0%, #87D032 100%)" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3.5, ease: "linear" }}
                    />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ═══ MOBILE: Visual Slide (< lg) — original layout ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:hidden"
        >
          <div className="bg-[#f9f9f9] rounded-[20px] overflow-hidden min-h-[500px] md:min-h-[540px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-m-${activeTab}`}
                className="absolute left-6 md:left-16 top-8 md:top-14 max-w-[340px] md:max-w-[460px] z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="font-['Figtree',sans-serif] text-[#333] text-[24px] md:text-[32px] leading-snug tracking-[-0.96px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {renderTitle(activeFeature)}
                </motion.p>
                <motion.p
                  className="font-['Figtree',sans-serif] font-light text-[#333] text-[14px] md:text-base leading-[21px] mt-3 opacity-80 max-w-[320px] md:max-w-[403px]"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {activeFeature.slideDescription || activeFeature.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-m-${activeTab}`}
                className="absolute"
                style={MOBILE_SLIDE_CONTAINER_STYLE[activeVariant]}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {activeVariant === "3d" ? (
                  /* 3D Renderings: exact Figma composition (mobile) */
                  <>
                    <img
                      alt="3D render card stack"
                      className="absolute right-[-8%] bottom-[18%] w-[74%] h-auto object-contain pointer-events-none"
                      src={img3dFigmaCards}
                    />
                    <img
                      alt="3D production timeline comparison"
                      className="absolute left-[4%] right-[4%] bottom-[4%] h-auto object-contain pointer-events-none"
                      src={img3dFigmaTimeline}
                    />
                  </>
                ) : activeVariant === "design" ? (
                  /* Book mockups composite image (mobile) */
                  <img
                    alt="Professional design book mockups"
                    className="absolute right-0 bottom-0 w-[70%] h-[70%] object-cover pointer-events-none"
                    src={imgSrc(imgDesignBooks)}
                  />
                ) : activeVariant === "illustrations" ? (
                  <img
                    alt="Illustrations and character consistency board"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                    src={imgIllustrationsBoard}
                  />
                ) : activeVariant === "character" ? (
                  /* Character generation storyboard flow (mobile) */
                  <img
                    alt="Character generation workflow board"
                    className="absolute inset-0 w-[70%] h-auto object-cover object-bottom pointer-events-none"
                    src={imgCharacterFlow}
                  />
                ) : activeVariant === "product" ? (
                  /* Product photography board (mobile) */
                  <img
                    alt="From weeks to hours product photography workflow"
                    className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                    src={imgProductWeeksToHours}
                  />
                ) : (
                  <img
                    alt={`AI workflow: ${activeFeature.label}`}
                    className="w-full h-full object-cover object-center pointer-events-none rounded-tl-[8px]"
                    src={slideImages[activeTab]}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ═══ DESKTOP: Vertical Sidebar Tabs + Content Panel (lg+) ═══ */}
        <div className="hidden lg:flex gap-0 min-h-[520px]">
          {/* Left — Vertical tab list */}
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
                  {/* Continuous grey track — spans full button height so all buttons form one connected line */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e0e0e0]"
                  />

                  {/* Active tab ONLY: green progressive beam on top of grey */}
                  {isActive && (
                    <motion.div
                      key={`beam-${activeTab}`}
                      className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
                      style={{
                        background: "linear-gradient(180deg, #a4e654 0%, #87D032 100%)",
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: AUTO_CYCLE_DURATION / 1000, ease: "linear" }}
                    />
                  )}

                  <span
                    className={`font-['Figtree',sans-serif] text-[16px] leading-[24px] tracking-[-0.2px] transition-all duration-300 ${
                      isActive
                        ? "text-[#87D032] font-medium"
                        : "text-[#999] group-hover:text-[#666]"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Right — Content panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 bg-[#f9f9f9] rounded-[20px] overflow-hidden relative"
          >
            {/* Text overlay — upper-left */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-d-${activeTab}`}
                className={`absolute z-10 ${DESKTOP_TEXT_CLASS[activeVariant]}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="font-['Figtree',sans-serif] text-[#111] text-[32px] leading-snug tracking-[-0.96px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {renderTitle(activeFeature)}
                </motion.p>
                <motion.p
                  className={`font-['Figtree',sans-serif] font-light text-[#333] text-[16px] leading-[21px] mt-3 opacity-80 ${DESKTOP_DESC_CLASS[activeVariant]}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {activeFeature.slideDescription || activeFeature.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Slide image — right portion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-d-${activeTab}`}
                className="absolute"
                style={DESKTOP_SLIDE_CONTAINER_STYLE[activeVariant]}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {activeVariant === "3d" ? (
                  /* 3D Renderings: updated single Figma composition */
                  <img
                    alt="3D renderings and timeline composition"
                    className="absolute left-[45px] top-[95px] w-[908px] h-[392px] object-cover pointer-events-none"
                    src={img3dFigmaCombined}
                  />
                ) : activeVariant === "design" ? (
                  /* Book mockups composite image (desktop) */
                  <img
                    alt="Professional design book mockups"
                    className="absolute inset-0 w-[300px] h-full object-cover pointer-events-none"
                    src={imgSrc(imgDesignBooks)}
                  />
                ) : activeVariant === "illustrations" ? (
                  <img
                    alt="Illustrations and character consistency board"
                    className="absolute right-[26px] bottom-[30px] w-[660px] h-[345px] object-cover pointer-events-none"
                    src={imgIllustrationsBoard}
                  />
                ) : activeVariant === "character" ? (
                  /* Character generation storyboard flow (desktop) */
                  <img
                    alt="Character generation workflow board"
                    className="absolute right-[12px] bottom-[-18px] w-[400px] h-[396px] object-cover pointer-events-none"
                    src={imgCharacterFlow}
                  />
                ) : activeVariant === "product" ? (
                  /* Product photography board (desktop) */
                  <img
                    alt="From weeks to hours product photography workflow"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                    src={imgProductWeeksToHours}
                  />
                ) : activeVariant === "ux" ? (
                  <img
                    alt="AI workflow: UX workflows and rapid PoC generation"
                    className="absolute right-[27px] bottom-0 w-[497px] h-[366px] object-cover pointer-events-none"
                    src={imgSrc(imgUxFunnel)}
                  />
                ) : (
                  <img
                    alt={`AI workflow: ${activeFeature.label}`}
                    className="w-full h-full object-cover object-bottom pointer-events-none"
                    src={slideImages[activeTab]}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
