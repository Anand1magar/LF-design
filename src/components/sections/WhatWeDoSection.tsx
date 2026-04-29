import { ArrowRight } from "lucide-react";

export function WhatWeDoSection() {
  return (
    <section className="relative z-10 bg-white rounded-t-3xl flex justify-center px-6 py-30">
      <div className="w-full max-w-[1190px] flex flex-col gap-5 items-start">
        <p className="font-sans font-light leading-12 text-2xl md:text-display-sm text-(--color-ink-600) max-w-[1190px]">
          We turn complex ideas into seamless digital journeys. By combining
          strategy with polished design, we create experiences that don&apos;t
          just look beautiful—they drive results and elevate your brand.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-lf-green-bright font-sans font-medium text-sm tracking-tight group"
        >
          <span>LET&apos;S BUILD THE FUTURE TOGETHER, WITH INTENT</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
