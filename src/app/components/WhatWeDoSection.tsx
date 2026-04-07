import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const PARAGRAPH_WORDS = [
  "We", "provide", "the", "single,", "sophisticated", "creative", "engine",
  "your", "product", "needs", "to", "stand", "apart.", "We", "design",
  "high-conversion", "experiences", "that", "translate", "complex",
  "requirements", "into", "seamless", "digital", "journeys.",
];

export function WhatWeDoSection() {
  return (
    <section className="relative z-10 bg-white rounded-t-3xl flex justify-center px-[298px] py-[100px]">
      <div className="w-full max-w-[1190px] flex flex-col gap-[22px] items-start">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="font-['Figtree',sans-serif] font-light leading-[48px] tracking-[-0.1px] max-w-[1190px] text-[#333] text-[24px] md:text-[32px]"
        >
          {PARAGRAPH_WORDS.join(" ")}
        </motion.p>
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-[6px] text-[#87D032] font-['Figtree',sans-serif] font-medium text-[14px] tracking-[-0.1px] group"
        >
          <span className="tracking-tight">LET'S BUILD THE FUTURE TOGETHER, WITH INTENT</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}