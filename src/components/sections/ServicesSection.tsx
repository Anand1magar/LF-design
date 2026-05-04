"use client";

import { motion } from "motion/react";
import { imgSrc } from "@/lib/img";
import { SectionHeader } from "@/components/ui/SectionHeader";
import imgProductDesign  from "src/assets/services/product-design.png";
import imgMotionMascot   from "src/assets/services/motion-mascot.png";
import imgMarketingFlyer from "src/assets/services/marketing-flyer.png";
/* ─── Data ───────────────────────────────────────────────────────── */

const services = [
  { title: "Visual Branding",      bg: "bg-navy",              type: "branding"  },
  { title: "Product Design",       bg: "bg-(--border-subtle)", type: "product"   },
  { title: "Motion Graphics",      bg: "bg-(--border-subtle)", type: "motion"    },
  { title: "Marketing Collateral", bg: "bg-(--border-subtle)", type: "marketing" },
] as const;

type ServiceType = (typeof services)[number]["type"];

/* ─── Per-type image rendering ───────────────────────────────────── */
function ServiceVisual({ type }: { type: ServiceType }) {
  const images: Record<ServiceType, string> = {
    branding:  imgSrc("src/assets/services/visual_branding.webp"),
    product:   imgSrc(imgProductDesign),
    motion:    imgSrc(imgMotionMascot),
    marketing: imgSrc(imgMarketingFlyer),
  };
  return <img alt={type} className="w-full h-full object-cover object-center" src={images[type]} />;
}

/* ─── Card ───────────────────────────────────────────────────────── */
function ServiceCard({ title, bg, type, index }: { title: string; bg: string; type: ServiceType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className="flex flex-col gap-5"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${bg} rounded-md overflow-hidden h-[280px] sm:h-[320px] md:h-[349px] border border-(--color-ink-250)`}
      >
        <ServiceVisual type={type} />
      </motion.div>
      <p className="font-display text-(--text-body) text-xl md:text-2xl tracking-tight px-2">
        {title}
      </p>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */

export function ServicesSection() {
  return (
    <section className="bg-lf-cream px-6 md:px-16 lg:px-60 py-20 md:py-32">

      <SectionHeader
        eyebrow="What We Do"
        titleAccent="End-to-end "
        title="design services"
        subtitle="We bridge the gap between branding, marketing & sales assets, UX design and motion design to give you a definitive competitive edge when going to market."
        className="mb-16 md:mb-24"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 md:px-10">
        {services.map((service, i) => (
          <ServiceCard key={service.title} {...service} index={i} />
        ))}
      </div>

      <div className="hidden xl:flex items-center mt-10 gap-0 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 md:px-10">
        {services.map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex-1 border-t border-dashed border-(--border-medium)" />
            <div className="w-2 h-2 rounded-full bg-lf-green shrink-0" />
          </div>
        ))}
      </div>

    </section>
  );
}
