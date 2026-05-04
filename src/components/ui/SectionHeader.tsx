"use client";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";

interface SectionHeaderProps {
  /** Small uppercase label above the heading */
  eyebrow?: string;
  /** Green-accented prefix of the heading */
  titleAccent?: string;
  /** Plain part of the heading */
  title: string;
  /** Body text below the heading */
  subtitle?: string;
  /** Extra classes on the motion.div wrapper (spacing, alignment) */
  className?: string;
  /** Override accent color — defaults to text-lf-green */
  accentClassName?: string;
  /** Extra classes on the subtitle <p> (max-width, tracking overrides) */
  subtitleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  titleAccent,
  title,
  subtitle,
  className = "",
  accentClassName = "text-lf-green",
  subtitleClassName = "",
}: SectionHeaderProps) {
  return (
    <motion.div {...fadeUp} className={className}>
      {eyebrow && (
        <p className="font-sans font-medium text-xs text-(--text-muted) tracking-widest uppercase mb-4">
          {eyebrow}
        </p>
      )}

      <h2 className="font-light text-3xl md:text-5xl leading-tight tracking-tight text-(--text-body)">
        {titleAccent && <span className={accentClassName}>{titleAccent}</span>}
        {title}
      </h2>

      {subtitle && (
        <p className={`font-light text-(--text-secondary) text-base md:text-xl leading-relaxed tracking-tight max-w-[695px] mt-4 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
