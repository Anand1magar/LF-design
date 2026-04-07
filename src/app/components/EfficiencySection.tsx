import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import imgScreenshot from "figma:asset/6622c2ead5ca7e4b244066744d572abcf02cdf6d.png";
import imgNew41 from "figma:asset/55c65964acf381f39e149e590d4f29d001407366.png";
import imgImage261 from "figma:asset/9e9883e10bfa0a4716f23af030b659806d17d3d8.png";
import imgCharacterFlow from "figma:asset/5d5e372882bb155b7b6d9212ad34ffc7823a6d0e.png";
import imgProductWeeksToHours from "figma:asset/7d9ec6e5f1cd8007c5a7887d77f2f8c5e489e670.png";
import imgSlideRef from "figma:asset/02edef305339b1d37ff3fad24f47d669793f2de7.png";
import imgNew21 from "figma:asset/c3673978eea43432454b7b5f17d61fdb0b4075f9.png";
import imgSlide02 from "figma:asset/7052aabef142b9d4ff27394a578703bd7127ba8b.png";
import imgImage166 from "figma:asset/8157ee4755bf5adda0c21e10832ca12e32e6d65b.png";
import imgRefMotion from "figma:asset/59839363999b28abed633b9e992da2885bc3ceba.png";
import imgOutputMotion from "figma:asset/04cffaefc283bce75a56cd0809fd6227450d4e00.png";
/* 3D Renderings tab — cascading VR card renders */
import img3dBg from "figma:asset/e4a916ed00d10fb12c9d320876b7fc699fcb61be.png";
import img3dRender1 from "figma:asset/ca33aeee2b4bcee7a2c3c7c816489f0ea96334c9.png";
import img3dRender2 from "figma:asset/9ff896a4a3609cef483d0ea1a1dd71691e42e551.png";
import img3dRender3 from "figma:asset/7f25c1bb5ecf5e5b99e935d4127e92c8a0499891.png";
import img3dRender4 from "figma:asset/2dccb77a319f4af0aa12e1e0947fbcce9ab42138.png";
/* General graphic design tab — composite book mockup image */
import imgDesignBooks from "figma:asset/b7c106ad167b83579ea14f5872ca1b516d68180e.png";

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
    speedup: "7x",
    title: "faster in illustration workflows with consistent character design",
    description:
      "Style-locked AI models ensure character consistency across hundreds of assets while our artists focus on creative direction.",
  },
  {
    label: "UX workflows and rapid PoC generation",
    speedup: "10x",
    title: "faster in UX prototyping & proof-of-concept delivery",
    description:
      "From wireframe to interactive prototype in hours, not weeks — AI-assisted UX flows let us validate ideas at startup speed.",
  },
];

/* One hero slide image per tab */
const slideImages = [
  imgImage261,    // Character generation workflow
  imgSlide02,     // Product photography & video
  imgNew21,       // 3D renderings
  imgNew41,       // Graphic design
  imgSlideRef,    // Illustrations
  imgScreenshot,  // UX workflows
];

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
          Validated through extensive AI tools, model testing and workflow
          measurement.
        </p>
      </motion.div>

      {/* Content */}
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
                  {renderTitle(featureTabs[activeTab])}
                </motion.p>
                <motion.p
                  className="font-['Figtree',sans-serif] font-light text-[#333] text-[14px] md:text-base leading-[21px] mt-3 opacity-80 max-w-[320px] md:max-w-[403px]"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {featureTabs[activeTab].slideDescription || featureTabs[activeTab].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-m-${activeTab}`}
                className="absolute"
                style={{
                  left: featureTabs[activeTab].customSlide === "3d" ? "0" : featureTabs[activeTab].customSlide === "design" ? "0" : featureTabs[activeTab].customSlide === "character" ? "0" : featureTabs[activeTab].customSlide === true ? "0" : featureTabs[activeTab].customSlide ? "10%" : "15%",
                  top: featureTabs[activeTab].customSlide === "3d" ? "0" : featureTabs[activeTab].customSlide === "design" ? "42%" : featureTabs[activeTab].customSlide === "character" ? "36%" : featureTabs[activeTab].customSlide === true ? "34%" : featureTabs[activeTab].customSlide ? "45%" : "38%",
                  width: featureTabs[activeTab].customSlide === "3d" ? "100%" : featureTabs[activeTab].customSlide === "design" ? "100%" : featureTabs[activeTab].customSlide === "character" ? "100%" : featureTabs[activeTab].customSlide === true ? "100%" : featureTabs[activeTab].customSlide ? "90%" : "85%",
                  height: featureTabs[activeTab].customSlide === "3d" ? "100%" : featureTabs[activeTab].customSlide === "design" ? "58%" : featureTabs[activeTab].customSlide === "character" ? "64%" : featureTabs[activeTab].customSlide === true ? "62%" : featureTabs[activeTab].customSlide ? "60%" : "65%",
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {featureTabs[activeTab].customSlide === "3d" ? (
                  /* 3D Renderings: cascading cards (mobile) */
                  <>
                    <div className="absolute right-0 top-[10%] w-[55%] h-[85%]">
                      {[img3dRender4, img3dRender3, img3dRender2, img3dRender1].map((src, i) => (
                        <div
                          key={i}
                          className="absolute rounded-[4px] overflow-hidden bg-white shadow-lg"
                          style={{
                            width: `${52 + i * 6}%`,
                            height: "58%",
                            right: `${(3 - i) * 14}%`,
                            top: `${(3 - i) * 10}%`,
                            transform: "rotate(7deg) skewX(7deg)",
                            opacity: i === 3 ? 1 : i === 2 ? 0.85 : i === 1 ? 0.56 : 0.12,
                            zIndex: i,
                          }}
                        >
                          <img src={img3dBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                          <img src={src} alt={`3D Render ${i + 1}`} className="absolute inset-[8%] w-[84%] h-[84%] object-cover pointer-events-none z-10" />
                        </div>
                      ))}
                    </div>
                    {/* Workflow timeline (mobile) */}
                    <div className="absolute left-4 bottom-4 right-4 z-10">
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex items-center gap-1">
                          <span className="text-[6px] font-semibold text-black font-['Figtree',sans-serif]">3x Iteration Cycle</span>
                        </div>
                        <div className="bg-[#eee] rounded-full h-[14px] flex items-center pr-1 overflow-hidden">
                          <span className="bg-white border border-[#e6e6e6] text-[6px] px-1.5 py-0.5 rounded-full shrink-0">Start Date</span>
                          <span className="text-[6px] px-1 shrink-0">Concept</span>
                          <span className="text-[6px] px-1 shrink-0">Research</span>
                          <span className="text-[6px] px-1 shrink-0">3D</span>
                          <span className="text-[6px] px-1 shrink-0">Anim</span>
                          <span className="text-[6px] px-1 shrink-0">Render</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[7px] font-semibold bg-gradient-to-r from-[#fe812e] to-[#dd1a23] bg-clip-text text-transparent font-['Figtree',sans-serif]">97% Time Reduction / 10x Speed</span>
                        </div>
                        <div className="bg-gradient-to-r from-[#fe812e] to-[#dd1a23] rounded-full h-[14px] flex items-center pr-1 overflow-hidden">
                          <span className="bg-white border border-[#e6e6e6] text-[6px] px-1.5 py-0.5 rounded-full shrink-0">Start Date</span>
                          <span className="text-[6px] text-white px-1 shrink-0">AI Co-Creation</span>
                          <span className="text-[6px] text-white px-1 shrink-0">Auto Compositing</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : featureTabs[activeTab].customSlide === "design" ? (
                  /* Book mockups composite image (mobile) */
                  <img
                    alt="Professional design book mockups"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src={imgDesignBooks}
                  />
                ) : featureTabs[activeTab].customSlide === "character" ? (
                  /* Character generation storyboard flow (mobile) */
                  <img
                    alt="Character generation workflow board"
                    className="absolute inset-0 w-[70px] h-auto object-cover object-bottom pointer-events-none"
                    src={imgCharacterFlow}
                  />
                ) : featureTabs[activeTab].customSlide === true ? (
                  /* Product photography board (mobile) */
                  <img
                    alt="From weeks to hours product photography workflow"
                    className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                    src={imgProductWeeksToHours}
                  />
                ) : featureTabs[activeTab].customSlide ? (
                  <div className="absolute inset-0 flex gap-[6px]">
                    <div className="flex-1 bg-black rounded-[4px] overflow-hidden relative">
                      <img
                        alt="AI product photography workflow"
                        className="absolute pointer-events-none"
                        style={{ left: "3.5%", top: "-8%", width: "93%", height: "118%" }}
                        src={imgImage166}
                      />
                    </div>
                    <div className="w-[18%] flex flex-col gap-[6px] shrink-0">
                      <div className="flex-1 rounded-[4px] overflow-hidden relative">
                        <img
                          alt="Reference Motion"
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          src={imgRefMotion}
                        />
                      </div>
                      <div className="flex-1 rounded-[4px] overflow-hidden relative">
                        <img
                          alt="Output Motion"
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          src={imgOutputMotion}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    alt={`AI workflow: ${featureTabs[activeTab].label}`}
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
                className={`absolute z-10 ${
                  featureTabs[activeTab].customSlide === true
                    ? "left-[45px] top-[45px] max-w-[435px]"
                    : "left-16 top-14 max-w-[460px]"
                }`}
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
                  {renderTitle(featureTabs[activeTab])}
                </motion.p>
                <motion.p
                  className={`font-['Figtree',sans-serif] font-light text-[#333] text-[16px] leading-[21px] mt-3 opacity-80 ${
                    featureTabs[activeTab].customSlide === true
                      ? "max-w-[435px]"
                      : "max-w-[409px]"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {featureTabs[activeTab].slideDescription || featureTabs[activeTab].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Slide image — right portion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-d-${activeTab}`}
                className="absolute"
                style={{
                  left: featureTabs[activeTab].customSlide === "3d" ? "0" : featureTabs[activeTab].customSlide === "design" ? "0" : featureTabs[activeTab].customSlide === "character" ? "0" : featureTabs[activeTab].customSlide === true ? "0" : featureTabs[activeTab].customSlide ? "10%" : "40%",
                  right: featureTabs[activeTab].customSlide === true ? "18px" : undefined,
                  top: featureTabs[activeTab].customSlide === "3d" ? "0" : featureTabs[activeTab].customSlide === "design" ? "0" : featureTabs[activeTab].customSlide === "character" ? "0" : featureTabs[activeTab].customSlide === true ? "0" : featureTabs[activeTab].customSlide ? "45%" : "0",
                  bottom: featureTabs[activeTab].customSlide === true ? "15px" : undefined,
                  width: featureTabs[activeTab].customSlide === "3d" ? "100%" : featureTabs[activeTab].customSlide === "design" ? "100%" : featureTabs[activeTab].customSlide === "character" ? "100%" : featureTabs[activeTab].customSlide === true ? "749px" : featureTabs[activeTab].customSlide ? "90%" : "60%",
                  height: featureTabs[activeTab].customSlide === true ? "277px" : "100%",
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {featureTabs[activeTab].customSlide === "3d" ? (
                  /* 3D Renderings: cascading VR character cards + workflow timeline */
                  <>
                    {/* Cascading 3D render cards — right side */}
                    <div className="absolute right-[-8%] top-[8%] w-[52%] h-[88%]">
                      {[
                        { src: img3dRender4, opacity: 0.12, w: 190, h: 260 },
                        { src: img3dRender3, opacity: 0.56, w: 200, h: 270 },
                        { src: img3dRender2, opacity: 0.85, w: 220, h: 270 },
                        { src: img3dRender1, opacity: 1, w: 250, h: 270 },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className="absolute rounded-[5px] overflow-hidden bg-white"
                          style={{
                            width: card.w,
                            height: card.h,
                            right: (3 - i) * 60,
                            top: (3 - i) * 50,
                            transform: "rotate(7deg) skewX(7deg)",
                            opacity: card.opacity,
                            zIndex: i + 1,
                            boxShadow: i === 3 ? "0 8px 32px rgba(0,0,0,0.12)" : "none",
                          }}
                        >
                          <img src={img3dBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                          <img src={card.src} alt={`3D Render ${i + 1}`} className="absolute pointer-events-none z-10" style={{ left: "14%", top: "13%", width: "80%", height: "76%", objectFit: "cover" }} />
                          {i < 3 && <div className="absolute inset-0 bg-white" style={{ opacity: i === 0 ? 0.31 : i === 1 ? 0.14 : 0 }} />}
                        </div>
                      ))}
                    </div>

                    {/* Workflow timeline comparison — bottom-left */}
                    <div className="absolute left-16 bottom-[50px] w-[440px] z-10">
                      <div className="flex flex-col gap-[8px]">
                        {/* Traditional pipeline — grey */}
                        <div className="relative">
                          <p className="font-['Figtree',sans-serif] font-semibold text-[8px] text-black tracking-[-0.1px] ml-[110px] mb-[2px]">3x Iteration Cycle .</p>
                          <div className="bg-[#eee] rounded-full h-[18px] flex items-center pr-[7px]">
                            <span className="bg-white border border-[#e6e6e6] text-[8px] font-normal font-['Figtree',sans-serif] px-[7px] py-[1px] rounded-full shrink-0">Start Date</span>
                            <span className="text-[8px] font-['Figtree',sans-serif] px-[4px] shrink-0">Concept &amp; Planning</span>
                            <span className="w-[18px] h-[18px] rounded-full bg-[#ddd] shrink-0 mx-[2px]" />
                            <span className="text-[8px] font-['Figtree',sans-serif] px-[4px] shrink-0">Research</span>
                            <span className="text-[8px] font-['Figtree',sans-serif] px-[4px] shrink-0">3D Modeling</span>
                            <span className="w-[18px] h-[18px] rounded-full bg-[#ddd] shrink-0 mx-[2px]" />
                            <span className="text-[8px] font-['Figtree',sans-serif] px-[4px] shrink-0">Animation</span>
                            <span className="w-[18px] h-[18px] rounded-full bg-[#ddd] shrink-0 mx-[2px]" />
                            <span className="text-[8px] font-['Figtree',sans-serif] px-[4px] shrink-0">Rendering</span>
                            <span className="text-[8px] font-['Figtree',sans-serif] px-[4px] shrink-0">Final Compositing</span>
                          </div>
                        </div>
                        {/* AI pipeline — gradient orange→red */}
                        <div className="relative">
                          <p className="font-['Figtree',sans-serif] font-semibold text-[10px] bg-gradient-to-r from-[#fe812e] to-[#dd1a23] bg-clip-text text-transparent tracking-[-0.1px] ml-[244px] mb-[2px]">97% Time Reduction / 10x Speed</p>
                          <div className="bg-gradient-to-r from-[#fe812e] to-[#dd1a23] rounded-full h-[18px] flex items-center pr-[7px] w-[435px]">
                            <span className="bg-white border border-[#e6e6e6] text-[8px] font-medium font-['Figtree',sans-serif] px-[7px] py-[1px] rounded-full shrink-0">Start Date</span>
                            <span className="text-[8px] font-medium font-['Figtree',sans-serif] text-white px-[4px] shrink-0">AI Co-Creation (Concept &amp; Assets)</span>
                            <span className="w-[22px] h-[22px] rounded-full bg-[#c63] shrink-0 mx-[2px]" />
                            <span className="text-[8px] font-medium font-['Figtree',sans-serif] text-white px-[4px] shrink-0">Automated Compositing</span>
                            <span className="w-[22px] h-[22px] rounded-full bg-[#c42] shrink-0 mx-[2px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : featureTabs[activeTab].customSlide === "design" ? (
                  /* Book mockups composite image (desktop) */
                  <img
                    alt="Professional design book mockups"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src={imgDesignBooks}
                  />
                ) : featureTabs[activeTab].customSlide === "character" ? (
                  /* Character generation storyboard flow (desktop) */
                  <img
                    alt="Character generation workflow board"
                    className="absolute right-0 bottom-[2%] w-[89%] h-[96%] object-cover object-right-bottom pointer-events-none"
                    src={imgCharacterFlow}
                  />
                ) : featureTabs[activeTab].customSlide === true ? (
                  /* Product photography board (desktop) */
                  <img
                    alt="From weeks to hours product photography workflow"
                    className="absolute right-[28px] bottom-[20px] w-[calc(100%-56px)] h-[351px] object-cover object-center pointer-events-none"
                    src={imgProductWeeksToHours}
                  />
                ) : featureTabs[activeTab].customSlide ? (
                  /* Custom Figma layout for Product photography: main dark area + side thumbnails */
                  <div className="absolute inset-0 flex gap-[8px]">
                    {/* Main dark workflow image */}
                    <div className="flex-1 bg-black rounded-[4px] overflow-hidden relative">
                      <img
                        alt="AI product photography workflow"
                        className="absolute pointer-events-none"
                        style={{ left: "3.5%", top: "-8%", width: "93%", height: "118%" }}
                        src={imgImage166}
                      />
                    </div>
                    {/* Side thumbnails column */}
                    <div className="w-[18%] flex flex-col gap-[8px] shrink-0">
                      <div className="flex-1 rounded-[4px] overflow-hidden relative">
                        <img
                          alt="Reference Motion"
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          src={imgRefMotion}
                        />
                        <div className="absolute top-[3%] left-[3%] bg-white/80 backdrop-blur-sm text-[4px] font-medium font-['Figtree',sans-serif] text-[#353535] px-[4px] py-[2px] rounded-full border border-black/20">
                          Reference Motion
                        </div>
                      </div>
                      <div className="flex-1 rounded-[4px] overflow-hidden relative">
                        <img
                          alt="Output Motion"
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          src={imgOutputMotion}
                        />
                        <div className="absolute top-[3%] left-[3%] bg-white/80 backdrop-blur-sm text-[4px] font-medium font-['Figtree',sans-serif] text-[#353535] px-[4px] py-[2px] rounded-full border border-black/20">
                          Output Motion
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    alt={`AI workflow: ${featureTabs[activeTab].label}`}
                    className="w-full h-full object-cover object-center pointer-events-none"
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