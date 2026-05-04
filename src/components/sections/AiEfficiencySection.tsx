"use client";

import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { imgSrc } from "@/lib/img";
import { cn } from "@/lib/utils";
import imgUxFunnelAsset          from "@/assets/cf744f1a96eb6285067a9e5d5faaf0f466edc248.png";
import imgDesignBooksAsset       from "src/assets/efficiency/general-graphic-design.png";
import imgCharacterFlowAsset     from "src/assets/efficiency/character-generation.png";
import imgIllustrationsBoardAsset from "src/assets/efficiency/illustrations-character-consistency.png";
import img3dCombinedAsset        from "src/assets/efficiency/3d-renderings-animations.png";
import { featureTabs, type Variant } from "@/data/efficiencyData";

/* ─── Single source of truth for slide images ───────────────────── */
const SLIDE_SRC: Record<Variant, string> = {
  character:     imgSrc(imgCharacterFlowAsset),
  product:       "/images/efficiency/product-photo-video.webp",
  "3d":          imgSrc(img3dCombinedAsset),
  design:        imgSrc(imgDesignBooksAsset),
  illustrations: imgSrc(imgIllustrationsBoardAsset),
  ux:            imgSrc(imgUxFunnelAsset),
};

/* ─── Desktop image positioning (Figma-accurate) ─────────────────── */
const DESKTOP_IMG_CLASS: Record<Variant, string> = {
  character:     "absolute right-[-38px] bottom-[15px] w-[672px] h-[391px] object-left",
  product:       "absolute right-0 bottom-0 w-[706px] h-[302px]",
  "3d":          "absolute left-[48px] top-[147px] w-[863px] h-[372px]",
  design:        "absolute left-[248px] top-[76px] w-[656px] h-[443px]",
  illustrations: "absolute right-0 bottom-0 w-[684px] h-[358px]",
  ux:            "absolute right-[27px] bottom-0 w-[497px] h-[366px]",
};

/* ─── Desktop text / description positioning ─────────────────────── */
const DESKTOP_TEXT_CLASS: Record<Variant, string> = {
  character:     "left-11 top-11 max-w-[460px]",
  product:       "left-11 top-11 max-w-[435px]",
  "3d":          "left-11 top-11 max-w-[435px]",
  design:        "left-11 top-12 max-w-[460px]",
  illustrations: "left-11 top-12 max-w-[460px]",
  ux:            "left-11 top-11 max-w-[460px]",
};

const DESKTOP_DESC_CLASS: Record<Variant, string> = {
  character:     "max-w-[403px]",
  product:       "max-w-[435px]",
  "3d":          "max-w-[435px]",
  design:        "max-w-[409px]",
  illustrations: "max-w-[409px]",
  ux:            "max-w-[460px]",
};

/* ─── Mobile image container positions ───────────────────────────── */
const MOBILE_CONTAINER: Record<Variant, CSSProperties> = {
  character:     { right: "0", bottom: "0", width: "90%",  height: "55%" },
  product:       { right: "0", bottom: "0", width: "100%", height: "50%" },
  "3d":          { left:  "0", bottom: "0", width: "100%", height: "58%" },
  design:        { right: "0", top: "42%",  width: "85%",  height: "58%" },
  illustrations: { right: "0", bottom: "0", width: "85%",  height: "52%" },
  ux:            { right: "0", bottom: "0", width: "80%",  height: "52%" },
};

/* ─── Animated gradient progress fill ────────────────────────────── */
function ProgressFill({ id, cycleDuration, vertical = false }: {
  id: string;
  cycleDuration: number;
  vertical?: boolean;
}) {
  return (
    <motion.div
      key={id}
      className={cn(
        "w-full h-full from-green-100 to-lf-green-bright",
        vertical ? "origin-top bg-gradient-to-b" : "origin-left bg-gradient-to-r",
      )}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      animate={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      transition={{ duration: cycleDuration / 1000, ease: "linear" }}
    />
  );
}

/* ─── Shared slide text (title + description) ────────────────────── */
function SlideText({
  tab,
  titleNode,
  descClassName = "",
}: {
  tab: (typeof featureTabs)[number];
  titleNode: React.ReactNode;
  descClassName?: string;
}) {
  return (
    <>
      <motion.p
        className="text-(--color-ink-800) text-2xl md:text-display-sm leading-snug tracking-[-0.96px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {titleNode}
      </motion.p>
      <motion.p
        className={cn(
          "font-light text-(--color-ink-600) text-sm md:text-base leading-[21px] mt-3 opacity-80",
          descClassName,
        )}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {tab.slideDescription ?? tab.description}
      </motion.p>
    </>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */
const AUTO_CYCLE = 3500;

export function AiEfficiencySection() {
  const [activeTab, setActiveTab] = useState(0);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs      = useRef<(HTMLButtonElement | null)[]>([]);

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
    const speedupSpan = (
      <motion.span
        className="font-semibold text-lf-green-bright inline-block"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {tab.speedup}
      </motion.span>
    );

    if (!tab.slideTitle) {
      return <><span>We are </span>{speedupSpan}<span> {tab.title}</span></>;
    }

    const idx = tab.slideTitle.indexOf(tab.speedup);
    if (idx < 0) return <span>{tab.slideTitle}</span>;
    return (
      <>
        <span>{tab.slideTitle.slice(0, idx)}</span>
        {speedupSpan}
        <span>{tab.slideTitle.slice(idx + tab.speedup.length)}</span>
      </>
    );
  };

  return (
    <section className="bg-white m-0 py-20 px-10 md:py-32 xl:px-0">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-[1190px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-10 border-b border-(--border-subtle)"
      >
        <h2 className="font-light text-display-xs sm:text-3xl md:text-5xl leading-tight tracking-tight">
          <span className="text-lf-green-bright">65%</span>
          <span className="text-(--text-body)"> more efficient</span>
        </h2>
        <p className="font-light text-(--text-muted) text-base leading-relaxed max-w-[404px] mt-4 md:mt-0">
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
          <div className="absolute bottom-0 left-0 right-0 h-px bg-(--border-subtle)" />
          <div ref={tabsScrollRef} className="flex gap-1.5 md:gap-6 overflow-x-auto no-scrollbar relative">
            {featureTabs.map((tab, i) => (
              <button
                key={tab.label}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => handleTabClick(i)}
                className="shrink-0 relative py-2.5 px-2.5 md:px-1 transition-colors duration-300"
              >
                <span className={cn(
                  "text-base md:text-xl leading-[32px] tracking-[-0.6px] whitespace-nowrap transition-all duration-300",
                  activeTab === i ? "text-lf-green-bright font-medium" : "text-(--text-body) opacity-60",
                )}>
                  {tab.label}
                </span>
                {activeTab === i && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
                    layoutId="tab-underline-mobile"
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ProgressFill id={`prog-mob-${activeTab}`} cycleDuration={AUTO_CYCLE} />
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
          <div className="bg-(--bg-subtle) rounded-[20px] overflow-hidden min-h-[500px] md:min-h-[540px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-mob-${activeTab}`}
                className="absolute left-6 md:left-11 top-8 md:top-11 max-w-[300px] md:max-w-[460px] z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SlideText
                  tab={activeFeature}
                  titleNode={renderTitle(activeFeature)}
                  descClassName="max-w-[280px] md:max-w-[403px]"
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-mob-${activeTab}`}
                className="absolute"
                style={MOBILE_CONTAINER[activeFeature.variant]}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  loading="lazy"
                  alt={activeFeature.label}
                  className="absolute inset-0 w-full h-full "
                  src={SLIDE_SRC[activeFeature.variant]}
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
            className="w-[280px] shrink-0 flex flex-col pt-2"
          >
            {featureTabs.map((tab, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={tab.label}
                  onClick={() => handleTabClick(i)}
                  className="relative text-left py-3.5 pl-5 pr-4 cursor-pointer transition-colors duration-200 group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-(--border-subtle)" />
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] overflow-hidden"
                      layoutId="tab-beam-desktop"
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <ProgressFill id={`beam-${activeTab}`} cycleDuration={AUTO_CYCLE} vertical />
                    </motion.div>
                  )}
                  <span className={cn(
                    "text-base leading-[24px] tracking-[-0.2px] transition-all duration-300",
                    isActive
                      ? "text-lf-green-bright font-medium"
                      : "text-(--color-ink-350) group-hover:text-(--color-ink-480)",
                  )}>
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
            className="flex-1 bg-(--bg-subtle) rounded-[20px] overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-desk-${activeTab}`}
                className={cn("absolute z-10", DESKTOP_TEXT_CLASS[activeFeature.variant])}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SlideText
                  tab={activeFeature}
                  titleNode={renderTitle(activeFeature)}
                  descClassName={DESKTOP_DESC_CLASS[activeFeature.variant]}
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-desk-${activeTab}`}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  loading="lazy"
                  alt={activeFeature.label}
                  className={cn(DESKTOP_IMG_CLASS[activeFeature.variant], "object-cover pointer-events-none")}
                  src={SLIDE_SRC[activeFeature.variant]}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
