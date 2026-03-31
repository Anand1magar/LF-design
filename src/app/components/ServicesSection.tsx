import { motion } from "motion/react";
import imgImage167 from "figma:asset/f758fa34cce0f476af038883b1560e58ac9fe001.png";
import imgImage168 from "figma:asset/767bef489cff3e3d81ec9035387d7875041d9689.png";
import imgImage169 from "figma:asset/0519f731a257ac00510feae06998ad20980ea27e.png";
import imgDdmascot1 from "figma:asset/d66f37c99eac53fb00d922ea6be5d27e44a756cd.png";
import imgFlyer1 from "figma:asset/82ba791526f6a825de49c826f3b059ef4500f13e.png";
import img121 from "figma:asset/a35239f50650506d34613c7f50cd2c827bef38c9.png";
import img051 from "figma:asset/4f1a2d6731b28e3c3564c7bfd22d03b04c4f2373.png";
import img091 from "figma:asset/d835e7d107fe628b1b5b512b76f99018d7eefe0c.png";
import img071 from "figma:asset/b684e6de49d85fe8233a25052585b2fa672cc068.png";
import img011 from "figma:asset/42ee4ceb8a55562fc02ad5e27fccb90d0ea699c9.png";

const services = [
  {
    title: "Visual Branding",
    bg: "bg-[#111438]",
    type: "branding" as const,
  },
  {
    title: "Business Collaterals",
    bg: "bg-[#e5e5e5]",
    type: "collaterals" as const,
  },
  {
    title: "Product Design",
    bg: "bg-[#e5e5e5]",
    type: "product" as const,
  },
  {
    title: "Motion Graphics",
    bg: "bg-[#e5e5e5]",
    type: "motion" as const,
  },
  {
    title: "Marketing Collateral",
    bg: "bg-[#e5e5e5]",
    type: "marketing" as const,
  },
];

function ServiceCard({
  title,
  bg,
  type,
  index,
}: {
  title: string;
  bg: string;
  type: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col gap-5"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${bg} rounded-md overflow-hidden relative h-[280px] sm:h-[320px] md:h-[349px] border border-[#d4d4d4]`}
      >
        {type === "branding" && (
          <>
            <img
              alt="Brand design"
              className="absolute top-3 left-0 w-full h-[60%] object-cover"
              src={imgImage167}
            />
            <img
              alt="Brand collateral"
              className="absolute bottom-0 left-0 w-full h-[50%] object-cover"
              src={imgImage168}
            />
          </>
        )}
        {type === "collaterals" && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="grid grid-cols-3 gap-1 absolute -left-10 top-0 opacity-90">
              {[img121, img051, img091, img071, img011, img121].map((img, i) => (
                <img key={i} alt="" className="w-[180px] h-[110px] object-cover" src={img} />
              ))}
            </div>
          </div>
        )}
        {type === "product" && (
          <img
            alt="Product design"
            className="absolute inset-0 w-full h-full object-cover"
            src={imgImage169}
          />
        )}
        {type === "motion" && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt="Motion graphics mascot"
              className="absolute -left-8 top-0 h-full w-auto object-cover"
              src={imgDdmascot1}
            />
          </div>
        )}
        {type === "marketing" && (
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            <img
              alt="Marketing flyer"
              className="w-[80%] h-auto object-contain -rotate-[10deg]"
              src={imgFlyer1}
            />
          </div>
        )}
      </motion.div>
      <p className="font-['Syne',sans-serif] text-[#1a1a1a] text-xl md:text-2xl tracking-tight px-2">
        {title}
      </p>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-[#fffcf8] px-6 md:px-16 lg:px-[240px] py-20 md:py-32">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 md:mb-24"
      >
        <p className="font-['Figtree',sans-serif] font-medium text-xs text-[#888] tracking-[1.2px] uppercase mb-4">
          What We Do
        </p>
        <h2 className="font-['Figtree',sans-serif] font-light text-3xl md:text-[48px] leading-tight tracking-tight text-[#1a1a1a]">
          <span className="text-[#79B231]">End-to-end </span>
          <span>design services</span>
        </h2>
        <p className="font-['Figtree',sans-serif] font-light text-[#555] text-base md:text-xl leading-relaxed tracking-tight max-w-[695px] mt-4">
          We bridge the gap between branding, marketing & sales assets, UX
          design and motion design to give you a definitive competitive edge
          when going to market.
        </p>
      </motion.div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 md:px-10">
        {services.map((service, i) => (
          <ServiceCard key={service.title} {...service} index={i} />
        ))}
      </div>

      {/* Decorative dots line */}
      <div className="hidden xl:flex items-center mt-10 gap-0 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 md:px-10">
        {services.map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex-1 border-t border-dashed border-[#c8c8c8]" />
            <div className="w-2 h-2 rounded-full bg-[#79B231] shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}