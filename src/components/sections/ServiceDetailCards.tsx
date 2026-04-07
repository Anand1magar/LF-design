"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";

/**
 * Card-Stacking Section
 * ─────────────────────
 * KEY INSIGHT: Every sticky card must be a DIRECT child of the same
 * tall container (the <section>). CSS sticky constrains an element
 * to stick only within its parent — if we wrap each card in its own
 * <div>, the card can only stick inside that small wrapper and then
 * pops off.  By making ALL cards siblings inside one tall <section>,
 * they all stick for the section's entire scroll height.
 *
 * Structure:
 *   <section>                     ← shared containing block (very tall)
 *     <div sticky top:0  z:1 />  ← card 1 — sticks for entire section
 *     <div sticky top:10 z:2 />  ← card 2 — overlaps card 1
 *     <div sticky top:20 z:3 />  ← card 3 — overlaps 1 & 2
 *     ...
 *   </section>
 */

const serviceDetails = [
  {
    title: "Visual Branding",
    subtitle:
      "We craft visuals that resonate emotionally and make your brand unforgettable.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
  {
    title: "Business Collaterals",
    subtitle:
      "We create polished business materials like business cards, brochures, and presentations that make your brand look credible and trustworthy.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
  {
    title: "Product Design",
    subtitle:
      "We design easy-to-use digital products (like apps, websites, or custom software) that work flawlessly for your customers and help your business grow.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
  {
    title: "Motion Graphics",
    subtitle:
      "We bring your ideas to life with engaging animations from explainer videos to social media clips that capture attention and tell your story clearly to your audience.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
  {
    title: "Marketing Collateral",
    subtitle:
      "We transform your brand with clear marketing materials like brochures and digital assets that make your business look trustworthy and easy to talk to.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
  },
];

const TOTAL = serviceDetails.length;
const PEEK = 10;
const SCALE_STEP = 0.025;

// Scroll gap between cards
const SCROLL_GAP = 150;
const SCROLL_GAP_MOBILE = 80;



/* ─── Hook: detect mobile ───────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < breakpoint
      : false,
  );
  useEffect(() => {
    const onResize = () =>
      setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

/* ─── Section ─────────────────────────────────────────────────────── */

export function ServiceDetailCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const CARD_HEIGHT = isMobile ? 620 : 632;

  // Center cards vertically on the viewport
  const [stickyTopOffset, setStickyTopOffset] = useState(50);

  useEffect(() => {
    const updateOffset = () => {
      const vh = window.innerHeight;
      // Center the card: (viewport - card) / 2
      const centered = Math.max(Math.round((vh - CARD_HEIGHT) / 2), 20);
      setStickyTopOffset(centered);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [CARD_HEIGHT]);

  const getStickyTop = useCallback(
    (index: number) => stickyTopOffset + index * PEEK,
    [stickyTopOffset],
  );

  const [cardsOnTopArr, setCardsOnTopArr] = useState<number[]>(
    () => new Array(TOTAL).fill(0),
  );

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stickyEls = section.querySelectorAll<HTMLElement>(
      "[data-sticky-card]",
    );
    if (stickyEls.length === 0) return;

    const stuckFlags: boolean[] = [];
    stickyEls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const target = getStickyTop(i);
      stuckFlags.push(rect.top <= target + 2);
    });

    let topStuck = -1;
    for (let i = TOTAL - 1; i >= 0; i--) {
      if (stuckFlags[i]) {
        topStuck = i;
        break;
      }
    }

    const next: number[] = [];
    for (let i = 0; i < TOTAL; i++) {
      if (stuckFlags[i] && topStuck > i) {
        next.push(topStuck - i);
      } else {
        next.push(0);
      }
    }

    setCardsOnTopArr((prev) => {
      for (let k = 0; k < TOTAL; k++) {
        if (prev[k] !== next[k]) return next;
      }
      return prev;
    });
  }, [getStickyTop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    handleScroll();
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#fffcf8] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:py-[128px]"
      style={{
        paddingLeft: undefined,
        paddingRight: undefined,
      }}
    >
      <div
        className="mx-auto w-full lg:px-[140px]"
        style={{ maxWidth: 1470 }}
      >
        {/* Section Header */}
        <div className="flex flex-col gap-[14px] items-start mb-12 md:mb-24 max-w-[1190px] mx-auto">
          <p className="font-['Figtree',sans-serif] font-light text-[48px] leading-[1.2] md:leading-[73.5px] tracking-[-1.5px] text-[#1a1a1a]"><span className="text-[#79b231]">End-to-end </span><span>design services</span></p>
          <p className="font-['Figtree',sans-serif] font-light text-[15px] sm:text-[17px] md:text-[20px] leading-[28px] md:leading-[32.5px] tracking-[-0.5px] text-[#555] max-w-[695px]">
            We craft a seamless blend of branding, marketing, and design that tells your story beautifully. By creating experiences that stick with people, we make sure your brand doesn't just compete—it leads!
          </p>
        </div>

        {/*
         * NO wrapper divs! Each card is a direct child of the section.
         * This way every card's sticky range = the entire section height,
         * so they all stay pinned and stack on top of each other.
         */}
        <div className="max-w-[1190px] mx-auto">
          {serviceDetails.map((service, i) => {
            const isLast = i === TOTAL - 1;
            const cardsOnTop = cardsOnTopArr[i];
            const scale = Math.max(
              1 - cardsOnTop * SCALE_STEP,
              0.85,
            );
            const shadowBlur = 8 + cardsOnTop * 12;
            const shadowOpacity = 0.03 + cardsOnTop * 0.025;

            return (
              <div
                key={service.title}
                data-sticky-card
                style={{
                  position: "sticky",
                  top: getStickyTop(i),
                  zIndex: i + 1,
                  height: CARD_HEIGHT,
                  marginBottom: isLast
                    ? 0
                    : isMobile
                      ? SCROLL_GAP_MOBILE
                      : SCROLL_GAP,
                }}
              >
                {/* Visual card — transforms here are fine, they're INSIDE the sticky element */}
                <div
                  className="bg-white border-0 lg:border lg:border-[rgba(0,0,0,0.06)] rounded-[12px] sm:rounded-[16px] md:rounded-[18px] overflow-hidden h-full"
                  style={{
                    boxShadow: `0px 4px 75.3px 0px rgba(0,0,0,0.04), 0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity})`,
                    transform: `scale(${scale})`,
                    transformOrigin: "center top",
                    transition:
                      "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease-out",
                  }}
                >
                  <div
                    className="flex flex-col lg:flex-row lg:items-stretch gap-[32px] md:gap-[34px] lg:gap-[45px] px-[22px] pt-[37px] pb-[22px] md:p-[22px] h-full"
                  >
                    {/* Title + Subtitle + Items */}
                    <div className="flex w-full flex-col gap-[30px] max-w-none md:max-w-[304px] lg:max-w-none lg:gap-[47.693px] lg:w-[560.576px] lg:pl-[70px] lg:pr-[70px] lg:justify-center">
                      {/* Title block */}
                      <div className="flex flex-col gap-[18.9px]">
                        <h3 className="font-['Figtree',sans-serif] text-[#1a1a1a] leading-[1.05] lg:leading-[47.693px] tracking-[-1px] font-normal text-[32px] md:text-[40px] lg:text-[48px]">
                          {service.title}
                        </h3>
                        <p className="font-['Figtree',sans-serif] text-[#1a1a1a] opacity-[0.56] text-[16px] md:text-[18px] lg:text-[20px] leading-[23px] lg:leading-[28px] font-normal lg:pl-[5px]">
                          {service.subtitle}
                        </p>
                      </div>

                      {/* Items list */}
                      <div className="flex flex-col">
                        {service.items.map((item, j) => (
                          <div
                            key={j}
                            className="relative flex items-start justify-between py-[6.359px]"
                          >
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 border-b-[0.795px] border-dashed border-[rgba(0,0,0,0.12)] pointer-events-none"
                            />
                            <p className="font-['Figtree',sans-serif] text-black opacity-[0.78] text-[16px] leading-[23px] md:leading-[47.693px] font-normal flex-1">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gray placeholder block — no image */}
                    <div
                      className="w-full lg:w-[560.576px] lg:shrink-0 lg:flex-1 aspect-square lg:aspect-auto rounded-[10px] overflow-hidden relative bg-[#e7e7e7]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
