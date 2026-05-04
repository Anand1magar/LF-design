"use client";
import { motion } from "motion/react";
import { imgSrc } from "@/lib/img";
import { SectionHeader } from "@/components/ui/SectionHeader";
import testimonialSvgPaths from "@/imports/svg-h7k3irsr83";
import imgLaudioLogo   from "src/assets/testimonials/laudio-logo.png";
import imgPortraitRuss from "src/assets/testimonials/portrait-russ-richmond.png";
import imgPortraitTeam from "src/assets/testimonials/portrait-team.png";

/* ─── Logos ──────────────────────────────────────────────────────── */

function LaudioLogo({ className = "" }: { className?: string }) {
  return <img loading="lazy" alt="Laudio" className={className} src={imgSrc(imgLaudioLogo)} />;
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
        <path d={testimonialSvgPaths.p74e0900}  fill="black" />
        <path d={testimonialSvgPaths.pe9f9bd0}  fill="black" />
        <path d={testimonialSvgPaths.p1b2a1170} fill="black" />
      </g>
      <defs><clipPath id="phil-b"><rect fill="white" height="18.6966" width="59.8145" /></clipPath></defs>
    </svg>
  );
}

function PhilLogoWhite() {
  return (
    <svg width="105" height="33" viewBox="0 0 105.293 32.9121" fill="none">
      <g clipPath="url(#phil-w)">
        <path d={testimonialSvgPaths.p10919480} fill="white" />
        <path d={testimonialSvgPaths.p4067800}  fill="white" />
        <path d={testimonialSvgPaths.p16c6d00}  fill="white" />
        <path d={testimonialSvgPaths.p797e900}  fill="white" />
        <path d={testimonialSvgPaths.p3beb6a80} fill="white" />
        <path d={testimonialSvgPaths.p34fcd900} fill="white" />
        <path d={testimonialSvgPaths.p39353b00} fill="white" />
        <path d={testimonialSvgPaths.p2ff3ee00} fill="white" />
        <path d={testimonialSvgPaths.p2ab50f80} fill="white" />
        <path d={testimonialSvgPaths.p1036c8f2} fill="white" />
        <path d={testimonialSvgPaths.p33172860} fill="white" />
      </g>
      <defs><clipPath id="phil-w"><rect fill="white" height="32.9121" width="105.293" /></clipPath></defs>
    </svg>
  );
}

/* ─── Row ────────────────────────────────────────────────────────── */

interface RowProps {
  reversed?: boolean;
  brandBg: string;
  pairLogo: React.ReactNode;
  portraitBg: string;
  portrait: { src: string; alt: string };
  cardLogo: React.ReactNode;
  author: string;
  role: string;
  quote: string;
}

function TestimonialRow({ reversed, brandBg, pairLogo, portraitBg, portrait, cardLogo, author, role, quote }: RowProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-4">

      {/* Image pair */}
      <div className={`flex gap-4 h-48 lg:h-96 lg:w-[49%] shrink-0 ${reversed ? "order-1 lg:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
          className={`${brandBg} rounded-xl overflow-hidden flex items-center justify-center flex-1`}
        >
          {pairLogo}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.1 }}
          className={`${portraitBg} rounded-xl overflow-hidden relative flex-1`}
        >
          <img loading="lazy" alt={portrait.alt} src={portrait.src} className="absolute inset-0 w-full h-full object-cover object-top" />
        </motion.div>
      </div>

      {/* Quote card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.2 }}
        className={`bg-white rounded-xl flex flex-col justify-between p-6 lg:p-10 lg:h-96 lg:flex-1 ${reversed ? "order-2 lg:order-1" : ""}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-(--color-ink-800) text-2xs lg:text-xs tracking-[1.29px] uppercase leading-3">{author}</p>
            <p className="text-(--color-ink-800) opacity-50 text-2xs lg:text-xs leading-3">{role}</p>
          </div>
          {cardLogo}
        </div>
        <p className="font-light text-(--color-ink-800) text-xl leading-8">{quote}</p>
      </motion.div>

    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */

export function TestimonialsSection() {
  return (
    <section className="bg-(--bg-muted) py-20 md:py-32">
      <div className="max-w-[1190px] mx-auto px-6 md:px-10">

        <SectionHeader
          title="Hear it from our partners."
          className="mb-16 md:mb-24 text-center"
        />

        <div className="flex flex-col gap-6">

          <TestimonialRow
            brandBg="bg-(--color-cream-2)"
            pairLogo={<LaudioLogo className="w-[93px] lg:w-[122px] h-auto opacity-90" />}
            portraitBg="bg-(--color-ink-300)"
            portrait={{ src: imgSrc(imgPortraitRuss), alt: "Russ Richmond, MD" }}
            cardLogo={<LaudioLogo className="w-15 lg:w-18 h-auto opacity-90" />}
            author="Russ Richmond, MD"
            role="CEO of Laudio"
            quote={`"It would have taken months to build the product team that we inherited overnight with Leapfrog. They're built for startup speed, and they have consistently delivered a well-engineered product for us."`}
          />

          <TestimonialRow
            reversed
            brandBg="bg-charcoal"
            pairLogo={<PhilLogoWhite />}
            portraitBg="bg-steel"
            portrait={{ src: imgSrc(imgPortraitTeam), alt: "Phil team member" }}
            cardLogo={<PhilLogoBlack />}
            author="Phil"
            role="Engineering Leadership"
            quote="Leapfrog team has been instrumental in Phil's growth so far. Their talent pool has been exceptional and a lot of credit goes to Leapfrog's high quality focus on training and onboarding. We never had to worry about a new engineer joining the team and becoming productive within a few weeks if not days."
          />

        </div>
      </div>
    </section>
  );
}
