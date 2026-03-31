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
    subtitle: "Launch a project crafted for resonance.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
    color: "#E8F0DE",
    image: "https://images.unsplash.com/photo-1770591060040-25fd7d6a4c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXN1YWwlMjBicmFuZGluZyUyMGxvZ28lMjBkZXNpZ24lMjBzdHVkaW98ZW58MXx8fHwxNzcyNzY2NjgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Business Collaterals",
    subtitle: "Launch a project crafted for resonance.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
    color: "#DEE8F0",
    image: "https://images.unsplash.com/photo-1617380607001-2797ed957a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbGxhdGVyYWwlMjBwcmludCUyMG1hcmtldGluZyUyMG1hdGVyaWFsc3xlbnwxfHx8fDE3NzI3NjY2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Product Design",
    subtitle: "Launch a project crafted for resonance.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
    color: "#F0E8DE",
    image: "https://images.unsplash.com/photo-1759765299418-02dfc7a6ad75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwaW50ZXJmYWNlJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc3Mjc2NjY4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Motion Graphics",
    subtitle: "Launch a project crafted for resonance.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
    color: "#E8DEF0",
    image: "https://images.unsplash.com/photo-1740174459694-4da6669ef2b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBncmFwaGljcyUyMGFuaW1hdGlvbiUyMHZpc3VhbCUyMGVmZmVjdHN8ZW58MXx8fHwxNzcyNzY2NjgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Marketing Collateral",
    subtitle: "Launch a project crafted for resonance.",
    items: [
      "Brand Strategy",
      "AI Powered Brand Identity Guidelines and Assets",
      "Web Design and Development",
    ],
    color: "#F0DEDE",
    image: "https://images.unsplash.com/photo-1722172597269-d911054badb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBjb2xsYXRlcmFsJTIwc29jaWFsJTIwbWVkaWElMjBjYW1wYWlnbnxlbnwxfHx8fDE3NzI3NjY2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const TOTAL = serviceDetails.length;
const PEEK = 10;
const SCALE_STEP = 0.025;

// Scroll gap between cards
const SCROLL_GAP = 150;
const SCROLL_GAP_MOBILE = 80;

const STICKY_TOP_OFFSET = 50;

function getStickyTop(index: number) {
  return STICKY_TOP_OFFSET + index * PEEK;
}

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
  const CARD_HEIGHT = isMobile ? 580 : 720;
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
  }, []);

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
            We bridge the gap between branding, marketing &amp;
            sales assets, UX design and motion design to give
            you a definitive competitive edge when going to
            market.
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
                  className="bg-white rounded-[14px] sm:rounded-[16px] md:rounded-[18px] overflow-hidden mt-[40px] md:mt-[70px]"
                  style={{
                    boxShadow: `0px 4px 75.3px 0px rgba(0,0,0,0.04), 0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity})`,
                    transform: `scale(${scale})`,
                    transformOrigin: "center top",
                    transition:
                      "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease-out",
                  }}
                >
                  <div
                    className="flex flex-col md:flex-row md:items-center gap-[40px] p-[22px]"
                    style={{
                      height: isMobile ? 580 - 40 : 720 - 70,
                    }}
                  >
                    {/* Title + Subtitle + Items */}
                    <div className="flex flex-col gap-[30px] md:flex-1 md:pl-[34px] md:py-[20px]">
                      {/* Title block */}
                      <div className="flex flex-col">
                        <h3 className="font-['Figtree',sans-serif] text-[#1a1a1a] leading-[47.693px] tracking-[-1px] font-normal text-[32px] md:text-[48px]">
                          {service.title}
                        </h3>
                        <p className="font-['Inter',sans-serif] text-[#1a1a1a] opacity-[0.76] text-[16px] md:text-[20px] leading-[23px] font-normal">
                          {service.subtitle}
                        </p>
                      </div>

                      {/* Items list */}
                      <div className="flex flex-col">
                        {service.items.map((item, j) => (
                          <div
                            key={j}
                            className="relative flex items-start justify-between py-[12px]"
                          >
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 border-b-[0.795px] border-dashed border-[rgba(0,0,0,0.3)] pointer-events-none"
                            />
                            <p className="font-['Figtree',sans-serif] text-black opacity-[0.78] text-[16px] leading-[23px] md:leading-[47.693px] font-normal flex-1">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Color placeholder block — full height on right for desktop, flex-1 on mobile */}
                    <div
                      className="w-full md:w-[504px] md:shrink-0 md:self-stretch rounded-[13px] md:rounded-[24px] flex-1 md:flex-initial min-h-0 overflow-hidden relative"
                      style={{ backgroundColor: service.color }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
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