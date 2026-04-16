"use client";

import { useEffect, useState } from "react";

/** Milliseconds to wait before force-dismissing if the video never fires. */
const FALLBACK_TIMEOUT = 6000;

export function GifPreloader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const dismiss = () => {
    setExiting(true);
    // Remove from DOM after fade-out completes
    setTimeout(() => setVisible(false), 700);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    // Dismiss when HeroSection signals the iframe has loaded
    const onReady = () => dismiss();
    window.addEventListener("hero-video-ready", onReady, { once: true });

    // Hard fallback — dismiss regardless after FALLBACK_TIMEOUT
    const fallback = window.setTimeout(dismiss, FALLBACK_TIMEOUT);

    return () => {
      window.removeEventListener("hero-video-ready", onReady);
      window.clearTimeout(fallback);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white pointer-events-auto"
      style={{
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      }}
    >
      {/* Centered GIF card — matches Figma node 1843:121312 */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "min(572px, 88vw)",
          aspectRatio: "572 / 314",
          borderRadius: 26,
          background: "#ebf7d8",
        }}
      >
        <img
          alt=""
          src="/images/preloader.gif"
          className="absolute inset-0 w-full pointer-events-none select-none"
          style={{
            height: "102.63%",
            top: "-0.68%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
