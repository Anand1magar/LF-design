import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import svgPaths from "../../imports/svg-gkhfmtllfb";
import imgImage179 from "figma:asset/5d413caf298873dc65d56217281db22b1953597d.png";
import imgMascot from "figma:asset/01e9fb8693b4b3c1ba8fff50a7a6d95ec10e880a.png";
import imgVrHeadset from "figma:asset/6e6798301b9063af5e51e5d0a70fd0286cd71fd3.png";

/* ───── Animated number counter ───── */
function AnimatedNumber({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ───── Small reusable arrow-up-right icon ───── */
function ArrowUpRightIcon({ color = "#1A1A1A" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d={svgPaths.p3e47bd00}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
      <path
        d={svgPaths.p3610fb80}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
    </svg>
  );
}

/* ───── Decorative quote mark SVG ───── */
function QuoteIcon() {
  return (
    <svg
      className="w-[300px] h-auto"
      viewBox="0 0 300.145 220.607"
      fill="none"
    >
      <path d={svgPaths.p3db24080} fill="#F5F5F5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Card 1 – Quote / Testimonial
   ═══════════════════════════════════════════ */
function QuoteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-[10px] overflow-hidden relative h-auto min-h-[350px] md:h-[434px] flex flex-col"
    >
      {/* Decorative quote mark */}
      <div className="absolute left-[60px] md:left-[124px] -top-10 opacity-50 pointer-events-none">
        <QuoteIcon />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 sm:px-10 pt-10 sm:pt-[72px] pb-8 sm:pb-10">
        <div className="flex flex-col gap-6">
          <h3 className="font-['Figtree',sans-serif] font-medium text-[#1a1a1a] text-[24px] leading-[30px] tracking-[-0.72px] max-w-[250px]">
            AI-powered design that scales faster.
          </h3>
          <p className="font-['Figtree',sans-serif] font-light text-[#555] text-[16px] leading-[26px] tracking-[-0.16px] max-w-[295px]">
            We leverage intelligent workflows to build high-performance
            products and uncover data-driven opportunities that drive growth.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-auto">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#f3f4f6] shrink-0">
            <img
              alt="Abhash Bikram Thapa"
              className="w-full h-full object-cover"
              src={imgImage179}
            />
          </div>
          <div>
            <p className="font-['Figtree',sans-serif] font-medium text-[#1a1a1a] text-[16px] leading-6">
              Abhash Bikram Thapa
            </p>
            <p className="font-['Figtree',sans-serif] text-[#888] text-[14px] leading-5">
              Director, Design
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Card 2 – 60 % Stat
   ═══════════════════════════════════════════ */
function StatCard60() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-3xl h-[434px] flex flex-col justify-between pl-10 pt-10 pb-10 pr-10"
    >
      {/* Top row */}
      <div className="flex items-center justify-between w-[304px]">
        <span className="font-['Figtree',sans-serif] font-medium text-[14px] leading-5 text-[#1a1a1a]">
          Fact 01
        </span>
        <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center">
          <ArrowUpRightIcon />
        </div>
      </div>

      {/* Big number */}
      <div className="flex items-baseline">
        <span className="font-['Figtree',sans-serif] text-[#1a1a1a] text-[100px] leading-[100px] tracking-[-5px]">
          <AnimatedNumber target={60} />
        </span>
        <span className="font-['Figtree',sans-serif] text-[#1a1a1a] text-[48px] leading-12 tracking-[-5px] relative top-[4.67px] ml-0.5">
          %
        </span>
      </div>

      {/* Description */}
      <p className="font-['Figtree',sans-serif] font-light text-[#555] text-[18px] leading-[24.75px] tracking-[-0.18px] max-w-[250px]">
        Average reduction in design-to-dev time using AI workflows.
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Card 3 – Mascot / Case Study
   ═══════════════════════════════════════════ */
function MascotCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#8f8f8f] rounded-3xl overflow-hidden relative h-[434px] flex flex-col justify-end pl-10 pb-10"
    >
      {/* Mascot background */}
      <div className="absolute inset-0 bg-linear-to-t from-[rgba(0,0,0,0.6)] to-transparent">
        <img
          alt="VR headset illustration"
          className="absolute inset-0 w-full h-full object-cover"
          src={imgVrHeadset}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[rgba(0,0,0,0.6)] to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col gap-6 max-w-[304px]">
        <div className="font-['Figtree',sans-serif] font-medium text-white text-[30px] leading-[37.5px] tracking-[-0.9px] max-w-[276px]"
          style={{ textShadow: "0 0 4px rgba(0,0,0,0.25)" }}
        >
          <p className="mb-0">$0 to $1M</p>
          <p>The 3-week MVP sprint</p>
        </div>

        <button className="flex items-center gap-2 text-white font-['Figtree',sans-serif] font-medium text-[16px] leading-6"
          style={{ textShadow: "0 0 4px rgba(0,0,0,0.25)" }}
        >
          See case study
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d={svgPaths.p154e6c80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d={svgPaths.p22879fc0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Card 4 – Timeline (spans 2 columns)
   ═══════════════════════════════════════════ */
function TimelineCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-3xl overflow-hidden h-[45vh] flex flex-col px-[30px] pt-12 pb-10 md:flex-row md:px-12 md:pt-12 md:pb-12 md:h-[434px]"
    >
      {/* Left – text */}
      <div className="flex flex-col gap-10 md:flex-1 md:justify-between md:pr-6 md:gap-0">
        <div className="flex flex-col gap-6">
          <h3 className="font-['Figtree',sans-serif] font-medium text-[#1a1a1a] text-[36px] leading-[45px] tracking-[-1.08px] max-w-[320px]">
            <span className="text-[#87d032]">AI-accelerated </span>
            design, delivered in 21 days.
          </h3>
          <p className="font-['Figtree',sans-serif] font-light text-[#555] text-[16px] leading-[26px] tracking-[-0.16px] max-w-[320px]">
            We combine human creativity with generative speed to transform
            complex ideas into pixel-perfect products in record time.
          </p>
        </div>
        <button className="flex items-center gap-2 text-[#87D032] font-['Figtree',sans-serif] font-medium text-[16px] leading-6 group">
          <ArrowUpRightIcon color="#87D032" />
          Learn about our process
        </button>
      </div>

      {/* Right – chart */}
      <div className="relative w-full h-[338px] mt-[30px] md:mt-0 md:flex-1 md:min-h-[289px]">
        {/* Horizontal grid lines */}
        <div className="absolute left-0 right-0 top-0 h-[289px] flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-px bg-[#f5f5f5] w-full" />
          ))}
        </div>

        {/* Timeline pills container — offset 8px left, within 304px zone on mobile */}
        <div className="absolute left-2 right-2 top-0 h-[289px] md:left-2 md:right-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute left-0 top-[203.2px] bg-[rgba(135,208,50,0.4)] px-5 py-2 rounded-full"
          >
            <span className="font-['Figtree',sans-serif] font-medium text-[14px] leading-5 text-[#1a1a1a]">
              AI Discovery
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute left-[98px] top-[124.5px] bg-[rgba(135,208,50,0.6)] px-5 py-2 rounded-full md:left-[106px]"
          >
            <span className="font-['Figtree',sans-serif] font-medium text-[14px] leading-5 text-[#1a1a1a]">
              Smart Concept
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute left-[201px] top-[53.8px] bg-[#87D032] px-5 py-2 rounded-full md:left-[209px]"
          >
            <span className="font-['Figtree',sans-serif] font-medium text-[14px] leading-5 text-[#1a1a1a]">
              Execution
            </span>
          </motion.div>
        </div>

        {/* Bottom labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center pt-[17px] border-t border-[#f5f5f5]">
          <span className="font-['Figtree',sans-serif] text-[12px] leading-4 text-[#888]">
            1 Week
          </span>
          <span className="font-['Figtree',sans-serif] text-[12px] leading-4 text-[#888]">
            2 Weeks
          </span>
          <span className="font-['Figtree',sans-serif] text-[12px] leading-4 text-[#888]">
            3 Weeks
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Card 5 – 3× Stat
   ═══════════════════════════════════════════ */
function StatCard3x() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-3xl h-[434px] flex flex-col justify-between pl-10 py-10 pr-10"
    >
      {/* Top row */}
      <div className="flex items-center justify-between w-[304px] max-w-full">
        <span className="font-['Figtree',sans-serif] font-medium text-[14px] leading-5 text-[#1a1a1a]">
          Fact 02
        </span>
        <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center">
          <ArrowUpRightIcon />
        </div>
      </div>

      {/* Big number */}
      <p className="font-['Figtree',sans-serif] text-[#1a1a1a] text-[64px] leading-16 tracking-[-3.2px]">
        <AnimatedNumber target={3} suffix="x" />
      </p>

      {/* Description */}
      <p className="font-['Figtree',sans-serif] font-light text-[#555] text-[16px] leading-[22px] tracking-[-0.16px] max-w-[315px]">
        More iterations per sprint compared to traditional design.
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════ */
export function ImpactSection() {
  return (
    <div className="pt-16 md:pt-24 px-6 md:px-10 pb-16 md:pb-24 bg-[#f5f5f5]">
      <div className="mx-auto w-full" style={{ maxWidth: 1190 }}>
        {/* Top Row – 3 equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <QuoteCard />
          <StatCard60 />
          <MascotCard />
        </div>

        {/* Bottom Row – 2/3 + 1/3 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
          <div className="xl:col-span-2">
            <TimelineCard />
          </div>
          <StatCard3x />
        </div>
      </div>
    </div>
  );
}