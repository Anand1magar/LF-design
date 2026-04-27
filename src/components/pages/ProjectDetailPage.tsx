"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { portfolioItems, type PortfolioItem } from "@/data/portfolioData";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useRef } from "react";

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

/* ─── Gallery placeholder images ─── */
const projectGallery: Record<string, string[]> = {
  "antaranga-ai": [
    "/portfolio/antaranga-details/antaranga01.png",
    "/portfolio/antaranga-details/antaranga02.png",
    "/portfolio/antaranga-details/antaranga03.png",
    "/portfolio/antaranga-details/antaranga04.png",
    "/portfolio/antaranga-details/antaranga05.png",
  ],
  frogtoberfest: [
    "/portfolio/frogtoberfest-details/frogtober-fest01.png",
    "/portfolio/frogtoberfest-details/frogtober-fest02.png",
    "/portfolio/frogtoberfest-details/frogtober-fest03.png",
    "/portfolio/frogtoberfest-details/frogtober-fest04.png",
    "/portfolio/frogtoberfest-details/frogtober-fest05.png",
    "/portfolio/frogtoberfest-details/frogtober-fest06.png",
  ],
  minimeals: [
    "/portfolio/minimeals-details/minimeals01.png",
    "/portfolio/minimeals-details/minimeals02.png",
    "/portfolio/minimeals-details/minimeals03.png",
    "/portfolio/minimeals-details/minimeals04.png",
    "/portfolio/minimeals-details/minimeals05.png",
  ],
  "second-look-health": [
    "/portfolio/second-look-details/second_look01.png",
    "/portfolio/second-look-details/second_look02.png",
    "/portfolio/second-look-details/second_look03.png",
    "/portfolio/second-look-details/second_look04.png",
  ],
  streamvault: [
    "https://images.unsplash.com/photo-1761502479994-3a5e07ec243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1760895223972-57b1d858d77e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1543238825-81c363fc698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1696774277032-5ada7eea439c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1766267190781-73203979c4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1624717369095-ebacc7d68a40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ],
};

interface Props {
  project: PortfolioItem;
  slug: string;
}

export function ProjectDetailPage({ project, slug }: Props) {
  const scrollColRef = useRef<HTMLDivElement>(null);
  const otherProjects = portfolioItems
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const gallery = projectGallery[slug] || (project.image ? [project.image] : []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-(--bg-muted) w-full pt-[80px]">
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 lg:h-[calc(100vh-160px)] min-h-[600px] max-h-[1020px]">
            {/* Left: Project Info Card */}
            <motion.div
              {...fadeUp(0.1)}
              className="bg-(--color-cream-3) rounded-[16px] lg:w-[42%] shrink-0 overflow-hidden"
            >
              <div className="flex flex-col justify-between h-full px-8 sm:px-10 lg:px-16 pt-7 pb-12">
                <div className="flex flex-col gap-4">
                  <h1 className="font-['Syne',sans-serif] text-(--text-body) text-display-md sm:text-display-lg lg:text-display-xl leading-[1.25] tracking-[-3px]">
                    {project.name}
                  </h1>
                  <p className="font-['Figtree',sans-serif] text-black/55 text-lg sm:text-xl">
                    {project.duration} · {project.year}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(project.tags || [project.category]).map((tag) => (
                      <span
                        key={tag}
                        className="bg-(--border-subtle) rounded-full px-3 py-2.5 font-['Syne',sans-serif] text-black/80 text-base"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-['Syne',sans-serif] text-black/80 text-lg sm:text-xl leading-[30px] mt-3 max-w-[500px]">
                    {project.description.length > 180
                      ? project.description.slice(0, 180) + "…"
                      : project.description}
                  </p>
                </div>
                <div className="mt-8">
                  <button className="inline-flex items-center gap-1 bg-black text-white rounded-full px-[18px] py-2.5 font-['Figtree',sans-serif] text-base cursor-pointer hover:bg-(--color-ink-600) transition-colors">
                    Website
                    <ExternalLink className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right: Scrollable Image Column */}
            <motion.div
              {...fadeIn(0.2)}
              ref={scrollColRef}
              className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 rounded-[10px] min-h-[400px] lg:min-h-0 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {gallery.length > 0
                ? gallery.map((src, i) => (
                    <div
                      key={i}
                      className="w-full shrink-0 rounded-[10px] overflow-hidden relative"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <ImageWithFallback
                        src={src}
                        alt={`${project.name} gallery ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ))
                : Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full shrink-0 h-[530px] rounded-[10px] bg-(--color-ink-300)"
                    />
                  ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* DISCOVER MORE PROJECTS */}
      <section className="bg-(--bg-muted) pt-16 md:pt-24 pb-24 md:pb-32">
        <div className="max-w-[1190px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 mb-14 md:mb-20">
            <motion.div {...fadeUp(0)} className="lg:w-[300px] shrink-0">
              <p className="font-['Figtree',sans-serif] text-(--text-body) text-sm tracking-[-0.3px]">
                Discover More
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.08)} className="flex-1">
              <h2 className="font-['Figtree',sans-serif] font-medium text-(--text-body) text-display-md md:text-display-xl leading-[1.15] tracking-[-2px]">
                Want to check more?
              </h2>
              <p className="font-['Figtree',sans-serif] text-(--color-ink-350) text-display-md md:text-display-xl leading-[1.15] tracking-[-2px]">
                Discover our other projects.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherProjects.map((p, i) => (
              <motion.div key={p.slug} {...fadeUp(0.06 * i)}>
                <Link
                  href={`/project/${p.slug}`}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className="group block"
                >
                  <div className="aspect-[1/1.1] rounded-[16px] overflow-hidden bg-(--color-ink-300) relative mb-3">
                    <div className="absolute top-2 left-2 z-10 flex gap-1">
                      {(p.tags || [p.category]).map((tag) => (
                        <span
                          key={tag}
                          className="backdrop-blur-sm bg-white/20 rounded-[12px] px-3 py-1.5 font-['Figtree',sans-serif] text-white text-sm tracking-[-0.3px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-black/10 z-[1]" />
                    <ImageWithFallback
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-1 pt-3">
                    <h3 className="font-['Figtree',sans-serif] font-medium text-(--text-body) text-2xl md:text-display-xs tracking-[-0.8px] leading-[1.3] mb-1">
                      {p.name}
                    </h3>
                    <p className="font-['Figtree',sans-serif] text-(--color-ink-350) text-base md:text-lg tracking-[-0.5px] leading-[1.4]">
                      {p.tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
