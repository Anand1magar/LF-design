"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";

/* Render AsciiGarden only on the client — its seeded-random plant
   positions cause hydration mismatches between server and browser. */
const AsciiGarden = dynamic(
  () => import("@/components/sections/AsciiGarden").then((m) => m.AsciiGarden),
  { ssr: false }
);

export function ContactSection() {
  return (
    <footer className="bg-black text-white overflow-hidden m-[0px] px-[0px] pt-[40px] pb-[0px]">
      {/* ═══ "Ready to Start" CTA ═══ */}
      <div className="flex flex-col items-center justify-center px-[20px] py-[4px] mx-[0px] my-[30px]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-['Syne',sans-serif] font-medium text-center tracking-[-1.6px] leading-[1.2] sm:leading-[1.25] md:leading-[80px] text-[36px] md:text-[48px]"
        >
          Ready to Start Your Project?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-['Figtree',sans-serif] font-light text-[#777] text-[16px] text-center leading-[26px] mt-5 max-w-[425px]"
        >
          Let&apos;s discuss your vision and create something extraordinary
          together. Get in touch today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 group/contact relative inline-block"
        >
          <button
            className="inline-flex min-w-[140px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 font-medium text-[14px] text-[rgba(255,255,255,0.8)] hover:text-white tracking-[-0.35px] leading-[20px] rounded-full py-[12px] px-[23px] relative items-center justify-center gap-2 font-['Figtree',sans-serif]"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              backgroundImage:
                "linear-gradient(162deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)), linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05))",
            }}
          >
            <Mail className="w-4 h-4" style={{ strokeWidth: 1.5 }} />
            <span>Contact Us</span>
            <span
              aria-hidden="true"
              className="transition-all duration-300 group-hover/contact:opacity-80 opacity-20 w-[70%] h-[1px] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)",
              }}
            />
          </button>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 left-1/2 z-0 h-6 w-44 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 ease-out group-hover/contact:opacity-100"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 50%, rgba(34,197,94,.55), rgba(34,197,94,.28) 35%, transparent 70%)",
              filter: "blur(10px) saturate(120%)",
            }}
          />
        </motion.div>

        <motion.a
          href="mailto:hello@designstudio.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 font-['Figtree',sans-serif] font-light text-white text-[14px] underline underline-offset-4 decoration-[#555] hover:decoration-white transition-colors"
        >
          hello@designstudio.com
        </motion.a>
      </div>

      <div className="px-6 md:px-12 py-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <span className="font-['Figtree',sans-serif] font-light text-[#444] text-[12px] leading-[16px]">
            &copy; 2025 Design Studio
          </span>
          <span className="font-['Figtree',sans-serif] font-light italic text-[#444] text-[12px] leading-[16px]">
            Crafted with passion
          </span>
        </div>
      </div>

      <AsciiGarden />
    </footer>
  );
}
