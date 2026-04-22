"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const PARAGRAPH_WORDS = [
  "We", "turn", "complex", "ideas", "into", "seamless", "digital",
  "journeys.", "By", "combining", "strategy", "with", "polished",
  "design,", "we", "create", "experiences", "that", "don't", "just",
  "look", "beautiful—they", "drive", "results", "and", "elevate",
  "your", "brand.",
];

export function WhatWeDoSection() {
  return (
    <section className="relative z-10 bg-white rounded-t-3xl flex justify-center px-[24px] py-[100px]">
      <div className="w-full max-w-[1190px] flex flex-col gap-[22px] items-start">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="font-sans font-light leading-[48px] tracking-[-0.1px] max-w-[1190px] text-[#333] text-2xl md:text-[32px]"
        >
          {PARAGRAPH_WORDS.join(" ")}
        </motion.p>
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-[6px] text-lf-green-bright font-sans font-medium text-sm tracking-[-0.1px] group"
        >
          <span className="tracking-tight">LET'S BUILD THE FUTURE TOGETHER, WITH INTENT</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}
