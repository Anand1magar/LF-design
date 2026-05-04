"use client";
import { motion } from "motion/react";
import svgPaths from "@/imports/svg-gkhfmtllfb";
import { processStepsData } from "@/data/processData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { fadeUpItem } from "@/lib/motion";

/* ─── Step icons (Figma SVGs, keyed by step id) ──────────────────── */

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

const processSteps = processStepsData.map((step) => ({
  ...step,
  svgContent: getStepIcon(step.id),
}));

type ProcessStep = (typeof processSteps)[number];

/* ─── Step sub-components ────────────────────────────────────────── */

function StepTitle({ title, className }: { title: string; className?: string }) {
  return (
    <p className={cn("font-display text-(--text-body)", className)}>
      {title}
    </p>
  );
}

function StepText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-light text-(--text-secondary) text-sm leading-relaxed tracking-[-0.14px]", className)}>
      {children}
    </p>
  );
}

function StepDescriptions({ step }: { step: ProcessStep }) {
  if (step.combinedIcons) {
    return (
      <div className="flex flex-col gap-3.5">
        <div aria-hidden="true" className="flex gap-1 items-center shrink-0">
          <Icon name="user" /><Icon name="plus" /><Icon name="robot" />
        </div>
        <StepText className="whitespace-pre-wrap">
          {`${step.humanDesc} `}<br />{step.aiDesc}
        </StepText>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex gap-3 items-start">
        <Icon name="user" />
        <StepText className="flex-1">{step.humanDesc}</StepText>
      </div>
      <div className="flex gap-3 items-start">
        <Icon name="robot" />
        <StepText className="flex-1">{step.aiDesc}</StepText>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */

export function ProcessSection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-16 md:py-32">

      {/* Header */}
      <div className="max-w-[1190px] mx-auto">
        <SectionHeader
          titleAccent="AI augmented"
          title=" design process"
          subtitle="By augmenting Design Thinking with custom, AI agentic tools & workflows, we deliver research, value propositions and PoCs 80% faster, enabling us to test and iterate hyper-fast."
          className="mb-16"
          accentClassName="text-lf-green-bright"
          subtitleClassName="max-w-[373px] md:max-w-[695px] tracking-[-0.4px] md:tracking-tight"
        />
      </div>

      {/* Mobile steps */}
      <div className="lg:hidden max-w-[1400px] mx-auto">
        <div className="relative pl-[50px]">
          <div aria-hidden="true" className="absolute left-[14px] top-0 bottom-0 border-l border-dashed border-(--border-medium)" />

          <div className="flex flex-col gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={`mobile-${step.title}`}
                {...fadeUpItem(i * 0.08)}
                className="relative pt-4"
              >
                <div aria-hidden="true" className="absolute left-[-39px] top-7 w-[7px] h-[7px] rounded-full bg-lf-green-bright" />
                <div aria-hidden="true" className="absolute left-[-32px] top-[31px] w-6 border-t border-dashed border-(--border-medium)" />

                <div className="flex flex-col gap-5">
                  <div aria-hidden="true" className="w-7 h-7">{step.svgContent}</div>
                  <StepTitle
                    title={step.title}
                    className={cn(
                      step.combinedIcons
                        ? "font-normal text-2xl leading-8 tracking-[-0.6px]"
                        : "text-display-sm leading-9 tracking-[-1px]"
                    )}
                  />
                  <StepDescriptions step={step} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop steps */}
      <div className="hidden lg:block max-w-[1400px] mx-auto">
        <div className="relative">

          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-[3px] left-0 right-0 h-px border-t border-dashed border-(--border-medium) origin-left"
          />

          <div className="grid grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUpItem(0.4 + i * 0.15)}
                className="relative"
              >
                {/* Green dot + glow pulse */}
                <motion.div
                  aria-hidden="true"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.18, ease: "easeOut" }}
                  className="absolute top-0 left-2.5 w-[7px] h-[7px] flex items-center justify-center"
                >
                  <div className="w-[7px] h-[7px] rounded-full bg-lf-green-bright" />
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    whileInView={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 2, delay: 1.2 + i * 0.18, repeat: 0 }}
                    className="absolute w-[7px] h-[7px] rounded-full bg-lf-green-bright"
                  />
                </motion.div>

                {/* Vertical dashed connector */}
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.18, ease: "easeOut" }}
                  className="absolute top-[7px] left-[13px] w-px h-[34px] border-l border-dashed border-(--border-medium) origin-top"
                />

                <div className="flex flex-col gap-5 pt-12">
                  <div aria-hidden="true" className="w-7 h-7">{step.svgContent}</div>
                  <StepTitle
                    title={step.title}
                    className={cn(
                      step.combinedIcons
                        ? "font-normal text-2xl leading-8 tracking-[-0.6px]"
                        : "text-xl md:text-2xl tracking-tight"
                    )}
                  />
                  <StepDescriptions step={step} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
