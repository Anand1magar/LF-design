"use client";
import { motion } from "motion/react";
import svgPaths from "@/imports/svg-gkhfmtllfb";
import iconPaths from "@/imports/svg-tscbarbuj1";
import { useState } from "react";
import { processStepsData } from "@/data/processData";

/* ───── Inline icon components (from Figma) ───── */
function UserIcon() {
  return (
    <div className="overflow-clip relative shrink-0 w-[18px] h-[18px] mt-[2px]">
      <svg
        className="block w-full h-full"
        viewBox="0 0 13.4 14.9"
        fill="none"
      >
        <path
          d={iconPaths.p12e51680}
          stroke="var(--color-ink-550)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d={iconPaths.p27fd9e00}
          stroke="var(--color-ink-550)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}

function RobotIcon() {
  return (
    <div className="overflow-clip relative shrink-0 w-[18px] h-[18px] mt-[2px]">
      <svg
        className="block w-full h-full"
        viewBox="0 0 16.4 17.9"
        fill="none"
      >
        <path
          d={iconPaths.p1022480}
          stroke="var(--color-ink-550)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d={iconPaths.p25966000}
          stroke="var(--color-ink-550)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d={iconPaths.p1cfdd300}
          stroke="var(--color-ink-550)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      className="shrink-0"
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
    >
      <path
        d="M3.5 0.5V6.5M0.5 3.5H6.5"
        stroke="var(--color-ink-550)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Maps process step IDs to their Figma-sourced SVG icons. */
function getStepIcon(id: string) {
  switch (id) {
    case "empathize": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <mask id="m1" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" as const }} width="28" height="28" x="0" y="0">
          <rect fill="var(--color-ink-300)" width="28" height="28" />
        </mask>
        <g mask="url(#m1)"><path d={svgPaths.p35bab500} fill="var(--lf-green-bright)" /></g>
      </svg>
    );
    case "define": return (
      <svg width="27" height="28" viewBox="0 0 26.8652 28" fill="none">
        <path d={svgPaths.p18679d80} fill="var(--lf-green-bright)" />
      </svg>
    );
    case "ideate": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <mask id="m3" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" as const }} width="28" height="28" x="0" y="0">
          <rect fill="var(--color-ink-300)" width="28" height="28" />
        </mask>
        <g mask="url(#m3)"><path d={svgPaths.p9ec5bc0} fill="var(--lf-green-bright)" /></g>
      </svg>
    );
    case "prototype": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <mask id="m4" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" as const }} width="28" height="28" x="0" y="0">
          <rect fill="var(--color-ink-300)" width="28" height="28" />
        </mask>
        <g mask="url(#m4)"><path d={svgPaths.p15eaaff0} fill="var(--lf-green-bright)" /></g>
      </svg>
    );
    case "test": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <mask id="m5" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" as const }} width="28" height="28" x="0" y="0">
          <rect fill="var(--color-ink-300)" width="28" height="28" />
        </mask>
        <g mask="url(#m5)"><path d={svgPaths.p14251b00} fill="var(--lf-green-bright)" stroke="white" strokeWidth="0.1" /></g>
      </svg>
    );
    default: return null;
  }
}

/** Merge text data with icon SVGs at runtime. */
const processSteps = processStepsData.map((step) => ({
  ...step,
  svgContent: getStepIcon(step.id),
}));


export function ProcessSection() {
  return (
    <section className="bg-white pl-[22px] pr-5 py-16 sm:px-8 sm:py-20 md:px-[64px] md:py-[128px]">
      {/* Header - constrained to 1190px */}
      <div className="max-w-[1190px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="font-sans font-light text-5xl leading-[60px] tracking-[-1.2px]">
            <span className="text-lf-green-bright">AI augmented</span>
            <span className="text-(--color-ink-600)"> design process</span>
          </h2>
          <p className="font-sans font-light text-(--text-secondary) text-base md:text-xl leading-[26px] md:leading-relaxed tracking-[-0.4px] md:tracking-tight max-w-[373px] md:max-w-[695px] mt-4">
            By augmenting Design Thinking with custom, AI
            agentic tools & workflows, we deliver research,
            value propositions and PoCs 80% faster, enabling us
            to test and iterate hyper-fast.
          </p>
        </motion.div>
      </div>

      {/* Mobile Process Steps (Figma) */}
      <div className="lg:hidden max-w-[1400px] mx-auto">
        <div className="relative pl-[50px]">
          <div className="absolute left-[14px] top-0 bottom-0 border-l border-dashed border-(--border-medium)" />

          <div className="flex flex-col gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={`mobile-${step.title}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pt-4"
              >
                <div className="absolute left-[-39px] top-[28px] w-[7px] h-[7px] rounded-full bg-lf-green-bright" />
                <div className="absolute left-[-32px] top-[31px] w-[24px] border-t border-dashed border-(--border-medium)" />

                <div className="flex flex-col gap-5">
                  <div className="w-7 h-7">{step.svgContent}</div>
                  <p
                    className={
                      step.combinedIcons
                        ? "font-display font-normal text-(--text-body) text-2xl leading-[32px] tracking-[-0.6px]"
                        : "font-display text-(--text-body) text-display-sm leading-[36px] tracking-[-1px]"
                    }
                  >
                    {step.title}
                  </p>
                  {step.combinedIcons ? (
                    <div className="flex flex-col gap-[14px]">
                      <div className="flex gap-[4px] items-center justify-start relative shrink-0">
                        <UserIcon />
                        <PlusIcon />
                        <RobotIcon />
                      </div>
                      <p className="font-sans font-light text-(--text-secondary) text-sm leading-[22.75px] tracking-[-0.14px] whitespace-pre-wrap">
                        {`${step.humanDesc} `}
                        <br />
                        {step.aiDesc}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[14px]">
                      <div className="flex gap-3 items-start">
                        <UserIcon />
                        <p className="flex-1 font-sans font-light text-(--text-secondary) text-sm leading-[22.75px] tracking-[-0.14px]">
                          {step.humanDesc}
                        </p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <RobotIcon />
                        <p className="flex-1 font-sans font-light text-(--text-secondary) text-sm leading-[22.75px] tracking-[-0.14px]">
                          {step.aiDesc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop / large-screen Process Steps */}
      <div className="hidden lg:block max-w-[1400px] mx-auto">
        <div className="relative">
          <div className="relative">
            {/* Dashed timeline line - spans full 1400px width */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="hidden lg:block absolute top-[3px] left-0 right-0 h-px border-t border-dashed border-(--border-medium) origin-left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.15,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative"
                >
                  {/* Green dot on timeline - aligned with icon center */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 0.18,
                      ease: "easeOut",
                    }}
                    className="hidden lg:flex absolute top-0 left-[10px] w-[7px] h-[7px] items-center justify-center"
                  >
                    <div className="w-[7px] h-[7px] rounded-full bg-lf-green-bright" />
                    {/* Subtle glow pulse */}
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      whileInView={{
                        scale: [1, 2.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 2,
                        delay: 1.2 + i * 0.18,
                        repeat: 0,
                      }}
                      className="absolute w-[7px] h-[7px] rounded-full bg-lf-green-bright"
                    />
                  </motion.div>

                  {/* Vertical dashed connector from dot to icon */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.18,
                      ease: "easeOut",
                    }}
                    className="hidden lg:block absolute top-[7px] left-[13px] w-px h-[34px] border-l border-dashed border-(--border-medium) origin-top"
                  />

                  <div className="flex flex-col gap-5 pt-4 lg:pt-[48px]">
                    <div className="w-7 h-7">
                      {step.svgContent}
                    </div>
                    <p
                      className={
                        step.combinedIcons
                          ? "font-display font-normal text-(--text-body) text-2xl leading-[32px] tracking-[-0.6px]"
                          : "font-display text-(--text-body) text-xl md:text-2xl tracking-tight"
                      }
                    >
                      {step.title}
                    </p>
                    {step.combinedIcons ? (
                      <div className="flex flex-col gap-[14px]">
                        <div className="flex gap-[4px] items-center justify-start relative shrink-0">
                          <UserIcon />
                          <PlusIcon />
                          <RobotIcon />
                        </div>
                        <p className="font-sans font-light text-(--text-secondary) text-sm leading-[22.75px] tracking-[-0.14px] whitespace-pre-wrap">
                          {`${step.humanDesc} `}
                          <br />
                          {step.aiDesc}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[14px]">
                        <div className="flex gap-3 items-start">
                          <UserIcon />
                          <p className="flex-1 font-sans font-light text-(--text-secondary) text-sm leading-[22.75px] tracking-[-0.14px]">
                            {step.humanDesc}
                          </p>
                        </div>
                        <div className="flex gap-3 items-start">
                          <RobotIcon />
                          <p className="flex-1 font-sans font-light text-(--text-secondary) text-sm leading-[22.75px] tracking-[-0.14px]">
                            {step.aiDesc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Creative Version: Interactive Accordion Timeline ── */}
            

            {/* ── Minimal Version: All-Steps Pipeline ── */}
            
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Interactive Accordion Timeline ───── */
function ProcessAccordion() {
  const [expandedIdx, setExpandedIdx] = useState(0);

  return (
    <div className="flex flex-col">
      {processSteps.map((step, i) => {
        const isOpen = expandedIdx === i;
        return (
          <motion.div
            key={`acc-${step.title}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <button
              onClick={() => setExpandedIdx(isOpen ? -1 : i)}
              className="w-full group cursor-pointer"
            >
              <div className="flex items-center gap-5 md:gap-8 py-5 md:py-6">
                {/* Step number */}
                <div className="relative shrink-0 w-12 flex items-center justify-center">
                  <motion.span
                    animate={{
                      color: isOpen ? "var(--lf-green-bright)" : "var(--color-ink-250)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-display-sm md:text-display-lg tracking-tighter select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                </div>

                {/* Vertical green bar indicator */}
                <motion.div
                  animate={{
                    height: isOpen ? 40 : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-[3px] rounded-full bg-lf-green-bright shrink-0 hidden md:block"
                />

                {/* Icon + Title */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <motion.div
                    animate={{
                      scale: isOpen ? 1.15 : 1,
                      opacity: isOpen ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-7 h-7 shrink-0"
                  >
                    {step.svgContent}
                  </motion.div>
                  <motion.span
                    animate={{ color: isOpen ? "var(--text-body)" : "var(--color-ink-350)" }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-xl md:text-display-xs tracking-tight text-left"
                  >
                    {step.title}
                  </motion.span>
                </div>

                {/* Expand indicator */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 shrink-0 flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke={isOpen ? "var(--lf-green-bright)" : "var(--color-ink-300)"} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>
            </button>

            {/* Expandable content */}
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-6 pl-[68px] md:pl-[108px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {/* Human side */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    className="flex gap-3 items-start bg-(--bg-subtle) rounded-xl p-4 border border-black/[0.04]"
                  >
                    <UserIcon />
                    <div>
                      <p className="font-sans text-xs tracking-[1px] uppercase text-lf-green-bright mb-1.5">
                        Human
                      </p>
                      <p className="font-sans font-light text-(--text-secondary) text-sm leading-[22px]">
                        {step.humanDesc}
                      </p>
                    </div>
                  </motion.div>
                  {/* AI side */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, delay: 0.18 }}
                    className="flex gap-3 items-start bg-(--text-body) rounded-xl p-4 border border-white/[0.06]"
                  >
                    <div className="mt-[2px]">
                      <svg width="18" height="18" viewBox="0 0 16.4 17.9" fill="none">
                        <path d={iconPaths.p1022480} stroke="#87D032" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                        <path d={iconPaths.p25966000} stroke="#87D032" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                        <path d={iconPaths.p1cfdd300} stroke="#87D032" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[1px] uppercase text-lf-green-bright mb-1.5">
                        AI Agent
                      </p>
                      <p className="font-sans font-light text-white/70 text-sm leading-[22px]">
                        {step.aiDesc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Separator line */}
            {i < processSteps.length - 1 && (
              <div className="h-px bg-black/[0.06] ml-[68px] md:ml-[108px]" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ───── Minimal Version: All-Steps Pipeline ───── */
function ProcessPipeline() {
  return (
    <div className="flex flex-col gap-0">
      {/* Top progress bar — segmented, fills progressively on scroll */}
      <div className="flex gap-1 mb-8">
        {processSteps.map((_, i) => (
          <motion.div
            key={`seg-${i}`}
            className="flex-1 h-[3px] rounded-[2px] overflow-hidden bg-black/[0.05]"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.25,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="h-full bg-lf-green-bright origin-left rounded-[2px]"
            />
          </motion.div>
        ))}
      </div>

      {/* All 5 steps in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0">
        {processSteps.map((step, i) => (
          <motion.div
            key={`pipe-${step.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: 0.15 + i * 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative flex flex-col"
          >
            {/* Card */}
            <div className="relative border border-black/[0.06] bg-white rounded-[6px] p-5 lg:p-6 h-full flex flex-col gap-4 group hover:border-lf-green-bright/30 transition-colors duration-300">
              {/* Step number + icon row */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs tracking-[1.5px] text-(--color-ink-300) uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {step.svgContent}
                </div>
              </div>

              {/* Title */}
              <p className="font-display text-(--text-body) text-lg tracking-tight">
                {step.title}
              </p>

              {/* Thin green accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="w-8 h-[2px] bg-lf-green-bright rounded-full origin-left"
              />

              {/* Descriptions */}
              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex gap-2.5 items-start">
                  <UserIcon />
                  <p className="flex-1 font-sans font-light text-(--color-ink-480) text-sm leading-[20px]">
                    {step.humanDesc}
                  </p>
                </div>
                <div className="h-px bg-black/[0.04]" />
                <div className="flex gap-2.5 items-start">
                  <RobotIcon />
                  <p className="flex-1 font-sans font-light text-(--color-ink-480) text-sm leading-[20px]">
                    {step.aiDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow connector between cards (desktop only) */}
            {i < processSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.3,
                  delay: 0.6 + i * 0.15,
                }}
                className="hidden lg:flex absolute -right-[12px] top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center"
              >
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                  <path
                    d="M1.5 1L6.5 6L1.5 11"
                    stroke="var(--lf-green-bright)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom summary bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="flex items-center justify-between mt-6 px-2"
      >
        <span className="font-sans text-xs text-(--color-ink-300) tracking-wide">
          5 steps
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-lf-green-bright" />
          <span className="font-sans text-xs text-(--color-ink-350) tracking-wide">
            Human + AI at every stage
          </span>
        </div>
      </motion.div>
    </div>
  );
}
