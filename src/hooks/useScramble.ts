"use client";

import { useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

interface UseScrambleOptions {
  speed?: number;   // ms per frame
  tick?: number;    // characters resolved per tick
}

export function useScramble(text: string, options: UseScrambleOptions = {}) {
  const { speed = 40, tick = 1 } = options;
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);
  const elRef = useRef<HTMLElement | null>(null);

  const scramble = useCallback(() => {
    if (!elRef.current) return;
    const iter = iterRef.current;

    elRef.current.textContent = text
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (i < iter) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");

    if (iter < text.length) {
      iterRef.current += tick;
      rafRef.current = setTimeout(scramble, speed);
    } else {
      elRef.current.textContent = text;
    }
  }, [text, speed, tick]);

  const onMouseEnter = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current);
    // Lock width before first scramble so proportional chars don't shift layout
    if (elRef.current) {
      elRef.current.style.display = "inline-block";
      elRef.current.style.width = elRef.current.offsetWidth + "px";
    }
    iterRef.current = 0;
    scramble();
  }, [scramble]);

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current);
    if (elRef.current) {
      elRef.current.textContent = text;
      elRef.current.style.width = "";
      elRef.current.style.display = "";
    }
  }, [text]);

  return { ref: elRef, onMouseEnter, onMouseLeave };
}
