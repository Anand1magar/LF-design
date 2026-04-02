import { motion } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

/* YouTube Video ID */
const YT_VIDEO_ID = "Lfk_qou1SYI";

/* Declare global YT types */
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [introProgress, setIntroProgress] = useState(0);
  const introStartTime = useRef<number | null>(null);
  const introRaf = useRef<number>(0);
  const [viewport, setViewport] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  const INTRO_DURATION = 2800;
  const INTRO_HOLD = 2000;

  // Track viewport size
  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Intro expand animation
  useEffect(() => {
    introStartTime.current = performance.now();
    const animate = (now: number) => {
      const elapsed = now - (introStartTime.current || now);
      if (elapsed < INTRO_HOLD) {
        setIntroProgress(0);
        introRaf.current = requestAnimationFrame(animate);
        return;
      }
      const expandElapsed = elapsed - INTRO_HOLD;
      const raw = Math.min(expandElapsed / INTRO_DURATION, 1);
      const t = raw;
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setIntroProgress(eased);
      if (raw < 1) {
        introRaf.current = requestAnimationFrame(animate);
      }
    };
    introRaf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(introRaf.current);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const wrapperHeight = wrapperRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = wrapperHeight - viewportHeight;
      if (scrollableDistance <= 0) {
        setScrollProgress(0);
        return;
      }
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Visibility detection via IntersectionObserver (reserved for future use)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {},
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ─── YouTube IFrame Player API for reliable loop ─── */
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [videoReady, setVideoReady] = useState(false);

  const initPlayer = useCallback(() => {
    if (!playerContainerRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player(playerContainerRef.current, {
      videoId: YT_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: YT_VIDEO_ID,
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0,
        cc_load_policy: 0,
        origin: window.location.origin,
        enablejsapi: 1,
        vq: "hd1080",
      },
      events: {
        onReady: (event: any) => {
          event.target.mute();
          event.target.playVideo();
          setVideoReady(true);
        },
        onStateChange: (event: any) => {
          // YT.PlayerState.ENDED = 0 — force restart for seamless loop
          if (event.data === 0) {
            event.target.seekTo(0);
            event.target.playVideo();
          }
        },
      },
    });
  }, []);

  useEffect(() => {
    // Load YouTube IFrame API script if not already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Set the global callback
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.();
      initPlayer();
    };

    // Check if script tag already exists
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [initPlayer]);

  // Dimensions
  const INITIAL_W = Math.min(380, viewport.w - 40);
  const INITIAL_H = Math.min(199, viewport.h * 0.3);
  const INITIAL_BR = 20;

  const introWidth = INITIAL_W + introProgress * (viewport.w - INITIAL_W);
  const introHeight = INITIAL_H + introProgress * (viewport.h - INITIAL_H);
  const introBorderRadius = INITIAL_BR * (1 - introProgress);

  const scrollEffectStrength = Math.max(0, (introProgress - 0.95) / 0.05);
  const scrollScale = 1 - scrollProgress * 0.12 * scrollEffectStrength;
  const scrollBorderRadius = scrollProgress * 32 * scrollEffectStrength;
  const finalBorderRadius = introBorderRadius + scrollBorderRadius;

  return (
    <div ref={wrapperRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white flex items-center justify-center">
        <div
          className="overflow-hidden relative"
          style={{
            width: `${introWidth}px`,
            height: `${introHeight}px`,
            borderRadius: `${finalBorderRadius}px`,
            transform: `scale(${scrollScale})`,
            willChange: "width, height, border-radius, transform",
          }}
        >
          {/* YouTube Video Background — via IFrame Player API for reliable loop */}
          <div className="absolute inset-0 overflow-hidden bg-black">
            <div
              ref={playerContainerRef}
              className="absolute pointer-events-none"
              style={{
                top: "-80px",
                left: "-80px",
                width: "calc(100% + 160px)",
                height: "calc(100% + 160px)",
                opacity: videoReady ? 1 : 0,
                transition: "opacity 0.6s ease-in-out",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: introProgress >= 1 ? 1 - scrollProgress * 2 : 0,
            }}
            transition={{
              delay: introProgress >= 1 ? 0.5 : 0,
              duration: 0.8,
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
}
