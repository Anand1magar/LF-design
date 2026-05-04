"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { serviceDetails, type ServiceDetail } from "@/data/servicesData";

const PEEK = 10;
const SCALE_STEP = 0.025;
const CARD_HEIGHT = { desktop: 632, mobile: 620 };

/* ─── Hook ───────────────────────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

/* ─── Card ───────────────────────────────────────────────────────── */
interface CardProps {
  service: ServiceDetail;
  index: number;
  cardsOnTop: number;
  isMobile: boolean;
  stickyTop: number;
  cardHeight: number;
}

function ServiceCard({ service, index, cardsOnTop, isMobile, stickyTop, cardHeight }: CardProps) {
  const scale      = Math.max(1 - cardsOnTop * SCALE_STEP, 0.85);
  const shadowBlur = 8 + cardsOnTop * 12;
  const shadowAlpha = 0.03 + cardsOnTop * 0.025;

  return (
    <div
      data-sticky-card
      style={!isMobile ? { position: "sticky", top: stickyTop, zIndex: index + 1, height: cardHeight } : undefined}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl overflow-hidden h-full lg:border lg:border-black/6"
        style={!isMobile ? {
          boxShadow: `0 4px 80px rgba(0,0,0,0.04), 0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowAlpha})`,
          transform: `scale(${scale})`,
          transformOrigin: "center top",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease-out",
        } : undefined}
      >
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-0 p-6 lg:pl-0 h-full">

          {/* Text column */}
          <div className="flex flex-col gap-8 lg:flex-1 lg:gap-12 lg:px-8 xl:px-20 lg:justify-center">
            <div className="flex flex-col gap-5">
              <h3 className="font-normal text-(--text-body) text-display-sm md:text-display-lg lg:text-5xl leading-tight tracking-[-1px]">
                {service.title}
              </h3>
              <p className="font-normal opacity-55 text-(--text-body) text-base md:text-lg lg:text-xl leading-6 lg:leading-7">
                {service.subtitle}
              </p>
            </div>
            <div className="flex flex-col">
              {service.items.map((item) => (
                <div key={item} className="relative flex items-start py-3 md:py-4">
                  <div aria-hidden="true" className="absolute inset-0 border-b border-dashed border-black/10 pointer-events-none" />
                  <p className="font-normal opacity-75 text-black text-base flex-1">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div className="w-full lg:flex-1 aspect-square lg:aspect-auto rounded-xl overflow-hidden relative bg-(--border-subtle)">
            <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}


/* ─── Section ────────────────────────────────────────────────────── */
export function ServiceDetailCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile   = useIsMobile();
  const cardHeight = isMobile ? CARD_HEIGHT.mobile : CARD_HEIGHT.desktop;

  // Vertical center offset: (viewport - card) / 2
  const [stickyBase, setStickyBase] = useState(50);
  useEffect(() => {
    const update = () =>
      setStickyBase(Math.max(Math.round((window.innerHeight - cardHeight) / 2), 20));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [cardHeight]);

  // Track only the topmost stuck card index (-1 = none stuck)
  const [topStuck, setTopStuck] = useState(-1);

  const handleScroll = useCallback(() => {
    const cards = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>("[data-sticky-card]") ?? []
    );
    let top = -1;
    for (let i = cards.length - 1; i >= 0; i--) {
      if (cards[i].getBoundingClientRect().top <= stickyBase + i * PEEK + 2) {
        top = i;
        break;
      }
    }
    setTopStuck((prev) => (prev !== top ? top : prev));
  }, [stickyBase]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="bg-lf-cream px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:py-32">
      <div className="max-w-[1190px] mx-auto w-full">

        <div className="flex flex-col gap-3.5 mb-12 md:mb-24">
          <p className="font-light text-5xl leading-[1.2] tracking-[-1.5px] text-(--text-body)">
            <span className="text-lf-green">End-to-end </span>design services
          </p>
          <p className="font-light text-sm sm:text-base md:text-xl leading-7 tracking-[-0.5px] text-(--text-secondary) max-w-[695px]">
            We craft a seamless blend of branding, marketing, and design that tells your story
            beautifully. By creating experiences that stick with people, we make sure your brand
            doesn&apos;t just compete—it leads!
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {serviceDetails.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              cardsOnTop={Math.max(0, topStuck - i)}
              isMobile={isMobile}
              stickyTop={stickyBase + i * PEEK}
              cardHeight={cardHeight}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
