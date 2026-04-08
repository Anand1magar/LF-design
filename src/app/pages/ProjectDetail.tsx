import { useParams, useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { portfolioItems } from "../data/portfolioData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
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

/* ─── Gallery placeholder images (6 per project for the scrollable column) ─── */
const projectGallery: Record<string, string[]> = {
  frogtoberfest: [
    "/portfolio/frogtoger_details_image/frogtober_fest01.png",
    "/portfolio/frogtoger_details_image/frogtober_fest02.png",
    "/portfolio/frogtoger_details_image/frogtober_fest03.png",
    "/portfolio/frogtoger_details_image/frogtober_fest04.png",
    "/portfolio/frogtoger_details_image/frogtober_fest05.png",
    "/portfolio/frogtoger_details_image/frogtober_fest06.png",
  ],
  minimeals: [
    "/portfolio/mini%20meal%20details%20images%20/mini%20meals01.png",
    "/portfolio/mini%20meal%20details%20images%20/mini%20meals02.png",
    "/portfolio/mini%20meal%20details%20images%20/mini%20meals03.png",
    "/portfolio/mini%20meal%20details%20images%20/mini%20meals04.png",
    "/portfolio/mini%20meal%20details%20images%20/mini%20meals05.png",
  ],
  tripadvisor: [
    "https://images.unsplash.com/photo-1678955084335-0546d6e1a4a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhcHAlMjBtb2JpbGUlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzczMjAzMjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1768486173251-95f16f855830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGRlc3RpbmF0aW9uJTIwYmVhY2glMjByZXNvcnR8ZW58MXx8fHwxNzczMjAzMjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1764022398523-cb127ab75581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzMxMTc4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1762893287377-ae2d4a95b11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwZXhwbG9yYXRpb24lMjB0b3VyaXNtJTIwc3RyZWV0fGVufDF8fHx8MTc3MzIwMzI3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1760781284910-8d4200cf26cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWxlciUyMGFpcnBvcnQlMjBqb3VybmV5JTIwc3VpdGNhc2V8ZW58MXx8fHwxNzczMjAzMjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGx1eHVyeSUyMGludGVyaW9yJTIwbG9iYnl8ZW58MXx8fHwxNzczMjAzMjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ],
  "antaranga-ai": [
    "/portfolio/antaranga details images/antaranga01.png",
    "/portfolio/antaranga details images/antaranga02.png",
    "/portfolio/antaranga details images/antaranga03.png",
    "/portfolio/antaranga details images/antaranga04.png",
    "/portfolio/antaranga details images/antaranga05.png",
  ],
  "second-look-health": [
    "/portfolio/secondLook%20details%20images%20/second_look01.png",
    "/portfolio/secondLook%20details%20images%20/second_look02.png",
    "/portfolio/secondLook%20details%20images%20/second_look03.png",
    "/portfolio/secondLook%20details%20images%20/second_look04.png",
  ],
  streamvault: [
    "https://images.unsplash.com/photo-1761502479994-3a5e07ec243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBkYXJrJTIwdGhlYXRlciUyMHNjcmVlbnxlbnwxfHx8fDE3NzMyMDMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1760895223972-57b1d858d77e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlbnRlcnRhaW5tZW50JTIwbmVvbiUyMGdsb3d8ZW58MXx8fHwxNzczMjAzMjgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1543238825-81c363fc698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBmaWxtJTIwY2FtZXJhfGVufDF8fHx8MTc3MzE3NTcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1696774277032-5ada7eea439c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwc21hcnQlMjB0ZWxldmlzaW9uJTIwY296eXxlbnwxfHx8fDE3NzMyMDMyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1766267190781-73203979c4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwbW92aWUlMjBuaWdodCUyMGVudGVydGFpbm1lbnR8ZW58MXx8fHwxNzczMjAzMjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1624717369095-ebacc7d68a40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMHN0dWRpbyUyMHNldHVwfGVufDF8fHx8MTc3MzIwMzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ],
};

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const scrollColRef = useRef<HTMLDivElement>(null);
  const project = portfolioItems.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h1 className="font-['Figtree',sans-serif] text-[48px] tracking-[-1.5px] text-[#1a1a1a]">
            Project not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center gap-2 font-['Figtree',sans-serif] text-[14px] text-[#888] hover:text-[#1a1a1a] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const otherProjects = portfolioItems
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const gallery = projectGallery[slug || ""] || (project.image ? [project.image] : []);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════
          HERO — Split panel: Left info card + Right scrollable images
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f5] w-full pt-[80px]">
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 lg:h-[calc(100vh-160px)] min-h-[600px] max-h-[1020px]">
            {/* ─── Left: Project Info Card ─── */}
            <motion.div
              {...fadeUp(0.1)}
              className="bg-[#ececec] rounded-[16px] lg:w-[42%] shrink-0 overflow-hidden"
            >
              <div className="flex flex-col justify-between h-full px-8 sm:px-10 lg:px-16 pt-7 pb-12">
                {/* Top content */}
                <div className="flex flex-col gap-4">
                  {/* Project Name */}
                  <h1 className="font-['Syne',sans-serif] text-[#1a1a1a] text-[36px] sm:text-[42px] lg:text-[48px] leading-[1.25] tracking-[-3px]">
                    {project.name}
                  </h1>

                  {/* Date */}
                  <p className="font-['Figtree',sans-serif] text-black/55 text-[18px] sm:text-[20px]">
                    {project.duration} · {project.year}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {(project.tags || [project.category]).map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#e4e4e4] rounded-full px-3 py-2.5 font-['Syne',sans-serif] text-black/80 text-[16px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="font-['Syne',sans-serif] text-black/80 text-[18px] sm:text-[20px] leading-[30px] mt-3 max-w-[500px]">
                    {project.description.length > 180
                      ? project.description.slice(0, 180) + "…"
                      : project.description}
                  </p>
                </div>

                {/* Website Button */}
                <div className="mt-8">
                  <button className="inline-flex items-center gap-1 bg-black text-white rounded-full px-[18px] py-2.5 font-['Figtree',sans-serif] text-[16px] cursor-pointer hover:bg-[#333] transition-colors">
                    Website
                    <ExternalLink className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ─── Right: Scrollable Image Column ─── */}
            <motion.div
              {...fadeIn(0.2)}
              ref={scrollColRef}
              className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 rounded-[10px] min-h-[400px] lg:min-h-0 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* If we have gallery images, show them; otherwise show 6 gray placeholders */}
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
                      className="w-full shrink-0 h-[530px] rounded-[10px] bg-[#b0b0b0]"
                    />
                  ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DISCOVER MORE PROJECTS
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f5] pt-16 md:pt-24 pb-24 md:pb-32">
        <div className="max-w-[1190px] mx-auto px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 mb-14 md:mb-20">
            <motion.div {...fadeUp(0)} className="lg:w-[300px] shrink-0">
              <p className="font-['Figtree',sans-serif] text-[#1a1a1a] text-[15px] tracking-[-0.3px]">
                Discover More
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.08)} className="flex-1">
              <h2 className="font-['Figtree',sans-serif] font-medium text-[#1a1a1a] text-[36px] md:text-[48px] leading-[1.15] tracking-[-2px]">
                Want to check more?
              </h2>
              <p className="font-['Figtree',sans-serif] text-[#999] text-[36px] md:text-[48px] leading-[1.15] tracking-[-2px]">
                Discover our other projects.
              </p>
            </motion.div>
          </div>

          {/* 3-column project cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherProjects.map((p, i) => (
              <motion.div key={p.slug} {...fadeUp(0.06 * i)}>
                <Link
                  to={`/project/${p.slug}`}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className="group block"
                >
                  {/* Card image */}
                  <div className="aspect-[1/1.1] rounded-[16px] overflow-hidden bg-[#a8a8a8] relative mb-3">
                    {/* Tags overlay */}
                    <div className="absolute top-2 left-2 z-10 flex gap-1">
                      {(p.tags || [p.category]).map((tag) => (
                        <span
                          key={tag}
                          className="backdrop-blur-sm bg-white/20 rounded-[12px] px-3 py-1.5 font-['Figtree',sans-serif] text-white text-[13px] tracking-[-0.3px]"
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

                  {/* Card text */}
                  <div className="px-1 pt-3">
                    <h3 className="font-['Figtree',sans-serif] font-medium text-[#1a1a1a] text-[22px] md:text-[26px] tracking-[-0.8px] leading-[1.3] mb-1">
                      {p.name}
                    </h3>
                    <p className="font-['Figtree',sans-serif] text-[#999] text-[16px] md:text-[18px] tracking-[-0.5px] leading-[1.4]">
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