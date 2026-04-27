"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { imgSrc } from "@/lib/img";
import testimonialSvgPaths from "@/imports/svg-h7k3irsr83";
import imgLaudioLogo from "figma:asset/9f0e635ffa70adec3f87577e3aea034e1c1a0158.png";
import imgPortrait1 from "figma:asset/153eae1bb05d237ab09804c4dd9b610bfd4aa443.png";
import imgPortrait2 from "figma:asset/d534fa615879640c0e0d236deecc9b1d9e55ae75.png";

import { carouselTestimonials, featuredTestimonials } from "@/data/testimonialsData";

const CAROUSEL_DURATION = 5000; // ms per testimonial

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = carouselTestimonials.length;
  const timerRef = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setProgress(0);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    const start = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / CAROUSEL_DURATION, 1);
      setProgress(pct);

      if (pct >= 1) {
        setActive((prev) => (prev + 1) % total);
        setProgress(0);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    timerRef.current = raf;
    return () => cancelAnimationFrame(raf);
  }, [active, total]);

  const t = carouselTestimonials[active];

  return (
    null
  );
}


function FeaturedTestimonial() {
  const [active, setActive] = useState(3);
  const t = featuredTestimonials[active];

  return (
    null
  );
}

/* ═══════════════════════════════════════════
   Testimonial Card Grid (Figma design)
   ═══════════════════════════════════════════ */

function LaudioLogoSmall({ className = "" }: { className?: string }) {
  return (
    <img
      alt="Laudio"
      className={className}
      src={imgSrc(imgLaudioLogo)}
    />
  );
}

function PhilLogoBlack() {
  return (
    <svg width="60" height="19" viewBox="0 0 59.8145 18.6966" fill="none">
      <g clipPath="url(#phil-b)">
        <path d={testimonialSvgPaths.p11f7f900} fill="black" />
        <path d={testimonialSvgPaths.p114a1380} fill="black" />
        <path d={testimonialSvgPaths.p18e61100} fill="black" />
        <path d={testimonialSvgPaths.p3d2616f0} fill="black" />
        <path d={testimonialSvgPaths.p11df1700} fill="black" />
        <path d={testimonialSvgPaths.p2905f700} fill="black" />
        <path d={testimonialSvgPaths.p20edde80} fill="black" />
        <path d={testimonialSvgPaths.p2a596800} fill="black" />
        <path d={testimonialSvgPaths.p74e0900} fill="black" />
        <path d={testimonialSvgPaths.pe9f9bd0} fill="black" />
        <path d={testimonialSvgPaths.p1b2a1170} fill="black" />
      </g>
      <defs>
        <clipPath id="phil-b">
          <rect fill="white" height="18.6966" width="59.8145" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PhilLogoWhite() {
  return (
    <svg width="105" height="33" viewBox="0 0 105.293 32.9121" fill="none">
      <g clipPath="url(#phil-w)">
        <path d={testimonialSvgPaths.p10919480} fill="white" />
        <path d={testimonialSvgPaths.p4067800} fill="white" />
        <path d={testimonialSvgPaths.p16c6d00} fill="white" />
        <path d={testimonialSvgPaths.p797e900} fill="white" />
        <path d={testimonialSvgPaths.p3beb6a80} fill="white" />
        <path d={testimonialSvgPaths.p34fcd900} fill="white" />
        <path d={testimonialSvgPaths.p39353b00} fill="white" />
        <path d={testimonialSvgPaths.p2ff3ee00} fill="white" />
        <path d={testimonialSvgPaths.p2ab50f80} fill="white" />
        <path d={testimonialSvgPaths.p1036c8f2} fill="white" />
        <path d={testimonialSvgPaths.p33172860} fill="white" />
      </g>
      <defs>
        <clipPath id="phil-w">
          <rect fill="white" height="32.9121" width="105.293" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TestimonialCardGrid() {
  return (
    <div className="flex flex-col gap-[22px] lg:gap-[22px]">
      {/* ── Row 1: Brand tiles + Quote Card ── */}
      {/* Mobile: image pair stacked above quote */}
      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-4">
        {/* Image pair — side by side */}
        <div className="flex gap-[16px] h-[189px] lg:h-[385px] lg:w-[49%] shrink-0">
          {/* Laudio Brand Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="bg-(--color-cream-2) rounded-[12px] overflow-hidden relative flex items-center justify-center flex-1"
          >
            <LaudioLogoSmall className="w-[93px] lg:w-[122px] h-auto opacity-90" />
          </motion.div>

          {/* Portrait 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="bg-(--color-ink-300) rounded-[12px] overflow-hidden relative flex-1"
          >
            <img
              alt="Russ Richmond, MD"
              className="absolute inset-0 w-full h-full object-cover"
              src={imgSrc(imgPortrait1)}
            />
          </motion.div>
        </div>

        {/* Quote Card 1 (Laudio) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="bg-white rounded-[12px] overflow-hidden relative flex flex-col justify-between p-[24px] lg:p-10 lg:h-[385px] lg:flex-1"
        >
          {/* Top row: Author (left) + Logo (right) */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[3.4px] font-sans">
              <p className="text-(--color-ink-800) text-2xs lg:text-xs tracking-[1.29px] uppercase leading-[12.86px]">
                Russ Richmond, MD
              </p>
              <p className="text-(--color-ink-800) opacity-50 text-2xs lg:text-xs leading-[12.86px]">
                CEO of Laudio
              </p>
            </div>
            <LaudioLogoSmall className="w-[60px] lg:w-[72px] h-auto opacity-90" />
          </div>

          {/* Quote at bottom */}
          <p className="font-sans font-light text-(--color-ink-800) text-xl leading-[30px]">
            "It would have taken months to build the product team that we
            inherited overnight with Leapfrog. They're built for startup
            speed, and they have consistently delivered a well-engineered
            product for us."
          </p>
        </motion.div>
      </div>

      {/* ── Row 2: Brand tiles + Quote Card ── */}
      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-4">
        {/* Image pair — side by side */}
        <div className="flex gap-[16px] h-[189px] lg:h-[385px] lg:w-[49%] shrink-0 order-1 lg:order-2">
          {/* Phil Brand Card (dark) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="bg-charcoal rounded-[12px] overflow-hidden relative flex items-center justify-center flex-1"
          >
            <PhilLogoWhite />
          </motion.div>

          {/* Portrait 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="bg-steel rounded-[12px] overflow-hidden relative flex-1"
          >
            <img
              alt="Team member"
              className="absolute inset-0 w-full h-full object-cover object-top"
              src={imgSrc(imgPortrait2)}
            />
          </motion.div>
        </div>

        {/* Quote Card 2 (Phil) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-white rounded-[12px] overflow-hidden relative flex flex-col justify-between p-[24px] lg:p-10 lg:h-[385px] lg:flex-1 order-2 lg:order-1"
        >
          {/* Top row: Author (left) + Logo (right) */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[3.4px] font-sans">
              <p className="text-(--color-ink-800) text-2xs lg:text-xs tracking-[1.29px] uppercase leading-[12.86px]">
                Phil
              </p>
              <p className="text-(--color-ink-800) opacity-50 text-2xs lg:text-xs leading-[12.86px]">
                Engineering Leadership
              </p>
            </div>
            <PhilLogoBlack />
          </div>

          {/* Quote at bottom */}
          <p className="font-sans font-light text-(--color-ink-800) text-xl leading-[30px]">
            Leapfrog team has been instrumental in Phil&apos;s growth so far. Their
            talent pool has been exceptional and a lot of credit goes to
            Leapfrog&apos;s high quality focus on training and onboarding. We never
            had to worry about a new engineer joining the team and
            becoming productive within a few weeks if not days.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-(--bg-muted) py-20 md:py-32">
      <div className="max-w-[1190px] mx-auto px-6 md:px-16 lg:px-[192px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 text-center"
        >
          
          <h2 className="font-sans font-light text-3xl md:text-5xl leading-tight tracking-tight text-(--text-body)">
            Hear it from our partners.
          </h2>
        </motion.div>

        {/* Carousel Testimonials */}
        <div className="mt-16 md:mt-24">
          <TestimonialCarousel />
        </div>

        {/* Featured Testimonial */}
        <div className="mt-16 md:mt-24">
          <FeaturedTestimonial />
        </div>

        {/* Testimonial Card Grid */}
        <div className="mt-16 md:mt-24 -mx-6 md:-mx-16 lg:-mx-[192px]">
          <div className="max-w-[1190px] mx-auto px-6 md:px-10">
            <TestimonialCardGrid />
          </div>
        </div>
      </div>

    </section>
  );
}
