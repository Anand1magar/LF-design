"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import { serviceDetails } from "@/data/servicesData";

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

const TOTAL = serviceDetails.length;
const PEEK = 10;
const SCALE_STEP = 0.025;

// Scroll gap between cards
const SCROLL_GAP = 150;
const SCROLL_GAP_MOBILE = 80;



/* ─── Hook: detect mobile ───────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < breakpoint);
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
      className="bg-lf-cream px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:py-32"
    >
      <div
        className="max-w-[1190px] mx-auto w-full"
      >
        {/* Section Header */}
        <div className="flex flex-col gap-3.5 items-start mb-12 md:mb-24 max-w-[1190px] mx-auto">
          <p className=" font-light text-5xl leading-[1.2] md:leading-[73.5px] tracking-[-1.5px] text-(--text-body)"><span className="text-lf-green">End-to-end </span><span>design services</span></p>
          <p className=" font-light text-sm sm:text-base md:text-xl leading-[28px] md:leading-[32.5px] tracking-[-0.5px] text-(--text-secondary) max-w-[695px]">
            We craft a seamless blend of branding, marketing, and design that tells your story beautifully. By creating experiences that stick with people, we make sure your brand doesn't just compete—it leads!
          </p>
        </div>

        {/*
         * NO wrapper divs! Each card is a direct child of the section.
         * This way every card's sticky range = the entire section height,
         * so they all stay pinned and stack on top of each other.
         */}
        <div className="max-w-[1190px] mx-auto flex flex-col gap-6">
          {serviceDetails.map((service, i) => {

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
                style={
                  !isMobile
                    ? {
                        position: "sticky",
                        top: getStickyTop(i),
                        zIndex: i + 1,
                        height: CARD_HEIGHT,
                      }
                    : undefined
                }
              >
                {/* Visual card — transforms here are fine, they're INSIDE the sticky element */}
                <div
                  className="bg-white border-0 lg:border lg:border-[rgba(0,0,0,0.06)] rounded-[12px] sm:rounded-2xl md:rounded-[18px] overflow-hidden h-full"
                  style={
                    !isMobile
                      ? {
                          boxShadow: `0px 4px 75.3px 0px rgba(0,0,0,0.04), 0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity})`,
                          transform: `scale(${scale})`,
                          transformOrigin: "center top",
                          transition:
                            "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease-out",
                        }
                      : undefined
                  }
                >
                  <div
                    className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-0 pr-6 pt-6 pb-6 pl-6 lg:pl-0 h-full"
                  >
                    {/* Title + Subtitle + Items — equal half */}
                    <div className="flex w-full flex-col gap-8 lg:flex-1 lg:gap-12 lg:px-8 xl:px-20 lg:justify-center">
                      {/* Title block */}
                      <div className="flex flex-col gap-5">
                        <h3 className=" text-(--text-body) leading-[1.05] lg:leading-[48px] tracking-[-1px] font-normal text-display-sm md:text-display-lg lg:text-5xl">
                          {service.title}
                        </h3>
                        <p className=" text-(--text-body) opacity-[0.56] text-base md:text-lg lg:text-xl leading-[23px] lg:leading-[28px] font-normal lg:pl-[5px]">
                          {service.subtitle}
                        </p>
                      </div>

                      {/* Items list */}
                      <div className="flex flex-col">
                        {service.items.map((item) => (
                          <div
                            key={item}
                            className="relative flex items-start justify-between py-3 md:py-4"
                          >
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 border-b border-dashed border-[rgba(0,0,0,0.12)] pointer-events-none py-4"
                            />
                            <p className=" text-black opacity-[0.78] text-base font-normal flex-1">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service image — square on mobile/tablet, fills card height on desktop */}
                    <div
                      className="w-full lg:flex-1 aspect-square lg:aspect-auto rounded-[10px] overflow-hidden relative bg-(--border-subtle pl-6"
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover pointer-events-none"
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
