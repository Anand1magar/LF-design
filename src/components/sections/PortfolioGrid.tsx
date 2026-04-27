"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { portfolioItems } from "@/data/portfolioData";
import { SkeletonImage } from "@/components/ui/SkeletonImage";

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[number];
  index: number;
}) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-3 cursor-pointer group"
      onClick={() => router.push(`/project/${item.slug}`)}
    >
      {/* Image — locked to Figma ratio 742:453 */}
      <div
        className="relative w-full overflow-hidden rounded-[10px] bg-(--color-ink-300)"
        style={{ aspectRatio: "742 / 453" }}
      >
        <SkeletonImage
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 pt-1">
        <h3 className="font-['Figtree',sans-serif] font-medium text-(--text-body) text-lg leading-[1.25] tracking-[-0.3px]">
          {item.name}
        </h3>
        <p className="font-['Figtree',sans-serif] font-light text-(--text-muted) text-sm leading-[1.55]">
          {item.tagline}
        </p>
      </div>
    </motion.div>
  );
}

export function PortfolioGrid() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="max-w-[1190px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0 pt-[120px] md:pt-[188px] pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-[716px] flex flex-col gap-[14px]"
        >
          <h1 className="font-['Syne',sans-serif] font-normal text-display-md sm:text-display-xl md:text-display-3xl leading-[1.1] tracking-[-2.38px] text-(--text-body)">
            Portfolio
          </h1>
          <p className="font-['Figtree',sans-serif] font-light text-lg md:text-xl leading-[32.5px] tracking-[0.5px] text-(--text-secondary) max-w-[663px]">
            Brands, products, and experiences built with AI-augmented design.
          </p>
        </motion.div>
      </section>

      {/* 2-column grid */}
      <section className="max-w-[1190px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-12">
          {portfolioItems.map((item, i) => (
            <PortfolioCard key={item.slug} item={item} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
