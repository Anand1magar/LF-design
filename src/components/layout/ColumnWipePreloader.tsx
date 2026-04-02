"use client";

import { useEffect, useState } from "react";

const COLUMN_COLORS = [
  "#086600",
  "#2D7F0D",
  "#599F38",
  "#88B36A",
  "#A5C390",
  "#BCCEAF",
];

const SESSION_KEY = "lf-column-preloader-shown";

export function ColumnWipePreloader() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting">("hidden");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";

    if (alreadyShown || prefersReducedMotion) {
      setPhase("hidden");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("visible");

    const exitTimer = window.setTimeout(() => {
      setPhase("exiting");
    }, 380);

    return () => {
      window.clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === "hidden") return;

    const totalExitTime = 250 + (COLUMN_COLORS.length - 1) * 90 + 650 + 80;
    const doneTimer = window.setTimeout(() => {
      setPhase("hidden");
    }, totalExitTime);

    return () => {
      window.clearTimeout(doneTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (phase === "hidden") {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex pointer-events-auto">
      {COLUMN_COLORS.map((color, i) => (
        <div key={color} className="flex-1 h-full overflow-hidden">
          <div
            className={`h-full w-full transition-transform [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] ${
              phase === "exiting" ? "-translate-y-full" : "translate-y-0"
            }`}
            style={{
              backgroundColor: color,
              transitionDuration: "650ms",
              transitionDelay: phase === "exiting" ? `${250 + i * 90}ms` : "0ms",
            }}
          />
        </div>
      ))}
    </div>
  );
}
