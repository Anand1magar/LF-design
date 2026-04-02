"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

/* ── Hardcoded iOS preset values ── */
const CONFIG = {
  lerp: 0.1,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.8,
  rubberBandTension: 0.35,
  rubberBandLimit: 180,
  bounceStiffness: 180,
  bounceDamping: 24,
};

/* ── Context (simplified, no controller) ── */
interface SmoothScrollContextValue {
  /** Current rubber band overscroll offset in px (negative = pulled past top, positive = past bottom) */
  rubberOffset: number;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ rubberOffset: 0 });
export const useSmoothScroll = () => useContext(SmoothScrollContext);

/* ── Apple Rubber Band Scroll Engine ── */
function useRubberBandScroll(onOffsetChange: (offset: number) => void) {
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const overscrollRef = useRef(0);
  const overscrollTargetRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef(0);
  const isRunningRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchActiveRef = useRef(false);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rubberBand = useCallback((x: number, limit: number, tension: number) => {
    const absX = Math.abs(x);
    const sign = x < 0 ? -1 : 1;
    return sign * (1 - 1 / ((absX * tension / limit) + 1)) * limit;
  }, []);

  const maxScroll = useCallback(
    () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    []
  );

  const tick = useCallback(() => {
    const c = CONFIG;

    currentRef.current += (targetRef.current - currentRef.current) * c.lerp;
    if (Math.abs(currentRef.current - targetRef.current) < 0.5) {
      currentRef.current = targetRef.current;
    }

    const clampedScroll = Math.max(0, Math.min(currentRef.current, maxScroll()));
    window.scrollTo(0, clampedScroll);

    const rawOverscroll = currentRef.current - clampedScroll;
    if (Math.abs(rawOverscroll) > 0.5 || Math.abs(overscrollTargetRef.current) > 0.5) {
      overscrollTargetRef.current = rawOverscroll;
    }

    if (!touchActiveRef.current && Math.abs(overscrollTargetRef.current) < 0.5) {
      const dt = 1 / 60;
      const force = -c.bounceStiffness * overscrollRef.current - c.bounceDamping * velocityRef.current;
      velocityRef.current += force * dt;
      overscrollRef.current += velocityRef.current * dt;
      if (Math.abs(overscrollRef.current) < 0.3 && Math.abs(velocityRef.current) < 0.3) {
        overscrollRef.current = 0;
        velocityRef.current = 0;
      }
    } else {
      const rubberOffset = rubberBand(overscrollTargetRef.current, c.rubberBandLimit, c.rubberBandTension);
      overscrollRef.current += (rubberOffset - overscrollRef.current) * 0.4;
      velocityRef.current = 0;
    }

    if (containerRef.current) {
      containerRef.current.style.transform =
        Math.abs(overscrollRef.current) > 0.3
          ? `translateY(${-overscrollRef.current}px)`
          : "";
    }

    onOffsetChange(overscrollRef.current);

    const stillMoving =
      Math.abs(currentRef.current - targetRef.current) > 0.5 ||
      Math.abs(overscrollRef.current) > 0.3 ||
      Math.abs(velocityRef.current) > 0.3;

    if (stillMoving) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      isRunningRef.current = false;
      if (containerRef.current) containerRef.current.style.transform = "";
      onOffsetChange(0);
    }
  }, [maxScroll, rubberBand, onOffsetChange]);

  const startLoop = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const releaseOverscroll = useCallback(() => {
    const ms = maxScroll();
    if (targetRef.current < 0) targetRef.current = 0;
    if (targetRef.current > ms) targetRef.current = ms;
    overscrollTargetRef.current = 0;
    startLoop();
  }, [maxScroll, startLoop]);

  useEffect(() => {
    currentRef.current = window.scrollY;
    targetRef.current = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current += e.deltaY * CONFIG.wheelMultiplier;
      startLoop();
      clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(releaseOverscroll, 120);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      touchActiveRef.current = true;
      currentRef.current = window.scrollY;
      targetRef.current = window.scrollY;
      overscrollRef.current = 0;
      overscrollTargetRef.current = 0;
      velocityRef.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const delta = (touchStartYRef.current - y) * CONFIG.touchMultiplier;
      touchStartYRef.current = y;
      targetRef.current += delta;
      startLoop();
    };

    const handleTouchEnd = () => {
      touchActiveRef.current = false;
      releaseOverscroll();
    };

    const handleScroll = () => {
      if (!isRunningRef.current) {
        currentRef.current = window.scrollY;
        targetRef.current = window.scrollY;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys: Record<string, number> = {
        ArrowDown: 100, ArrowUp: -100,
        PageDown: window.innerHeight * 0.8, PageUp: -window.innerHeight * 0.8,
      };
      let delta = scrollKeys[e.key] ?? null;
      if (e.key === " ") delta = e.shiftKey ? -window.innerHeight * 0.8 : window.innerHeight * 0.8;
      if (e.key === "End") { e.preventDefault(); targetRef.current = maxScroll(); startLoop(); clearTimeout(wheelTimeoutRef.current); wheelTimeoutRef.current = setTimeout(releaseOverscroll, 120); return; }
      if (e.key === "Home") { e.preventDefault(); targetRef.current = 0; startLoop(); clearTimeout(wheelTimeoutRef.current); wheelTimeoutRef.current = setTimeout(releaseOverscroll, 120); return; }
      if (delta !== null) {
        e.preventDefault();
        targetRef.current += delta;
        startLoop();
        clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = setTimeout(releaseOverscroll, 120);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(wheelTimeoutRef.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startLoop, releaseOverscroll, maxScroll]);

  return containerRef;
}

/* ── Provider ── */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [rubberOffset, setRubberOffset] = useState(0);

  const onOffsetChange = useCallback((offset: number) => {
    setRubberOffset(offset);
  }, []);

  const containerRef = useRubberBandScroll(onOffsetChange);

  return (
    <SmoothScrollContext.Provider value={{ rubberOffset }}>
      <div ref={containerRef} className="w-full will-change-transform">
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}
