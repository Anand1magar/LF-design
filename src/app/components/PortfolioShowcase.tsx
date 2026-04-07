import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { portfolioItems } from "../data/portfolioData";

/* ═══════════════════════════════════════════
   Portfolio Showcase — scroll-driven split layout
   Left: sticky text panel | Right: cards flow with page scroll
   ═══════════════════════════════════════════ */

/** Linearly interpolate between two values */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Convert a 0-255 integer to a 2-char hex string */
const toHex = (n: number) =>
  Math.round(Math.min(255, Math.max(0, n)))
    .toString(16)
    .padStart(2, "0");

const STORAGE_KEY = "portfolio-snap-config";

/* ─── Scroll-snap tuning defaults ─── */
interface SnapConfig {
  /** Top boundary of activation zone (0–0.5, default 0.25) */
  zoneTop: number;
  /** Bottom boundary of activation zone (0.5–1, default 0.75) */
  zoneBottom: number;
  /** Easing power: 1 = linear, 2 = quadratic, 3 = cubic (default smoothstep) */
  easePower: number;
  /** Gradient intensity multiplier (default 3.5) */
  gradientBoost: number;
  /** Card slot height in vh (default 70) */
  cardHeight: number;
  /** Enable programmatic scroll-snap to center cards (default true) */
  snapEnabled: boolean;
  /** Snap strength 1–10: higher = stickier cards on scroll (default 5) */
  snapIntensity: number;
  /** Snap dead-zone in vh – card must exit this range to un-snap (default 15) */
  stickyOffset: number;
  /** Scroll animation duration in ms when snapping (default 400) */
  scrollSmoothing: number;
}

const DEFAULTS: SnapConfig = {
  zoneTop: 0.25,
  zoneBottom: 0.75,
  easePower: 2,
  gradientBoost: 3.5,
  cardHeight: 70,
  snapEnabled: true,
  snapIntensity: 5,
  stickyOffset: 15,
  scrollSmoothing: 400,
};

/** Load persisted config from localStorage (falls back to DEFAULTS) */
function loadSnapConfig(): SnapConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULTS };
}

/** Persist config to localStorage */
function saveSnapConfig(cfg: SnapConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch { /* ignore */ }
}

/**
 * Compute a smooth activation value (0→1) based on a card's
 * vertical midpoint within the viewport.
 */
function computeActivation(
  cardMidY: number,
  viewportH: number,
  cfg: SnapConfig
): number {
  const norm = cardMidY / viewportH;
  if (norm < cfg.zoneTop || norm > cfg.zoneBottom) return 0;
  const mid = (cfg.zoneTop + cfg.zoneBottom) / 2;
  const halfZone = (cfg.zoneBottom - cfg.zoneTop) / 2;
  const raw =
    norm <= mid
      ? (norm - cfg.zoneTop) / halfZone
      : (cfg.zoneBottom - norm) / halfZone;
  const t = Math.max(0, Math.min(1, raw));
  // easePower 2 = smoothstep, 1 = linear, 3 = cubic
  if (cfg.easePower === 1) return t;
  if (cfg.easePower === 2) return t * t * (3 - 2 * t);
  return Math.pow(t, cfg.easePower);
}

/**
 * Build the CSS background value for a card given its
 * activation (0 = fully faded, 1 = fully vibrant).
 */
function cardGradientBg(brandColor: string, activation: number): string {
  const a0 = toHex(lerp(0x66, 0xff, activation));
  const a1 = toHex(lerp(0x33, 0xdd, activation));
  const a2 = toHex(lerp(0x1a, 0x88, activation));
  const a3 = toHex(lerp(0x0d, 0x44, activation));

  const darkAlpha = (0.62 * (1 - activation)).toFixed(3);

  const darkOverlay = `linear-gradient(to bottom, rgba(0,0,0,${darkAlpha}), rgba(0,0,0,${darkAlpha}))`;
  const brandGradient = `linear-gradient(135deg, ${brandColor}${a0} 0%, ${brandColor}${a1} 40%, ${brandColor}${a2} 70%, ${brandColor}${a3} 100%)`;

  return `${darkOverlay}, ${brandGradient}`;
}

export function PortfolioShowcase() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardActivations, setCardActivations] = useState<number[]>(
    () => portfolioItems.map(() => 0)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);
  const prevActivationsRef = useRef<number[]>(portfolioItems.map(() => 0));

  /* ─── Controller state ─── */
  const [showController, setShowController] = useState(false);
  const [snapCfg, setSnapCfg] = useState<SnapConfig>(loadSnapConfig);
  const [saveToast, setSaveToast] = useState(false);
  const updateCfg = (key: keyof SnapConfig, val: number | boolean) =>
    setSnapCfg((prev) => ({ ...prev, [key]: val }));

  const setCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    },
    []
  );

  // Continuous scroll-linked activation values (rAF-driven)
  const snapCfgRef = useRef(snapCfg);
  snapCfgRef.current = snapCfg;

  useEffect(() => {
    const update = () => {
      const viewportH = window.innerHeight;
      const cfg = snapCfgRef.current;
      const next: number[] = [];
      let bestIdx = 0;
      let bestA = -1;

      cardRefs.current.forEach((el, i) => {
        if (!el) {
          next.push(0);
          return;
        }
        const rect = el.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const a = computeActivation(midY, viewportH, cfg);
        next.push(a);
        if (a > bestA) {
          bestA = a;
          bestIdx = i;
        }
      });

      // Only update state if activations actually changed (avoid wasteful re-renders)
      const prev = prevActivationsRef.current;
      const changed = next.some(
        (v, idx) => Math.abs(v - (prev[idx] ?? 0)) > 0.005
      );
      if (changed) {
        prevActivationsRef.current = next;
        setCardActivations(next);
      }
      if (bestA > 0) setActiveIndex(bestIdx);

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ─── Programmatic snap-to-card on scroll idle ─── */
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    const cfg = snapCfgRef.current;
    if (!cfg.snapEnabled) return;

    const handleScroll = () => {
      if (isSnappingRef.current) return;

      // Clear previous timer
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);

      // Debounce: wait until user stops scrolling
      const debounceMs = Math.max(60, 200 - snapCfgRef.current.snapIntensity * 15);
      scrollTimerRef.current = setTimeout(() => {
        const snapCfgNow = snapCfgRef.current;
        if (!snapCfgNow.snapEnabled) return;

        const viewportH = window.innerHeight;
        const centerY = viewportH / 2;
        let bestEl: HTMLDivElement | null = null;
        let bestDist = Infinity;

        cardRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cardMid = rect.top + rect.height / 2;
          const dist = Math.abs(cardMid - centerY);
          // Only snap if card is within the sticky offset zone
          const stickyPx = (snapCfgNow.stickyOffset / 100) * viewportH;
          if (dist < stickyPx && dist < bestDist) {
            bestDist = dist;
            bestEl = el;
          }
        });

        if (bestEl) {
          const rect = (bestEl as HTMLDivElement).getBoundingClientRect();
          const cardMid = rect.top + rect.height / 2;
          const offset = cardMid - centerY;

          // Only snap if offset is significant enough (avoid jitter)
          if (Math.abs(offset) > 3) {
            isSnappingRef.current = true;
            window.scrollBy({
              top: offset,
              behavior: "smooth",
            });
            // Release snap lock after animation
            setTimeout(() => {
              isSnappingRef.current = false;
            }, snapCfgNow.scrollSmoothing + 100);
          }
        }
      }, debounceMs);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [snapCfg.snapEnabled, snapCfg.snapIntensity, snapCfg.stickyOffset, snapCfg.scrollSmoothing]);

  /* ─── Save handler: persist to localStorage + write to source code ─── */
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    // Persist to localStorage
    saveSnapConfig(snapCfg);

    // Write DEFAULTS directly to source via Vite dev server plugin
    try {
      const res = await fetch("/api/save-snap-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snapCfg),
      });
      const data = await res.json();
      if (data.ok) {
        setSaveToast(true);
        setTimeout(() => setSaveToast(false), 3000);
      } else {
        console.error("Save failed:", data.error);
        // Fallback: copy to clipboard
        const codeStr = `const DEFAULTS: SnapConfig = {
  zoneTop: ${snapCfg.zoneTop},
  zoneBottom: ${snapCfg.zoneBottom},
  easePower: ${snapCfg.easePower},
  gradientBoost: ${snapCfg.gradientBoost},
  cardHeight: ${snapCfg.cardHeight},
  snapEnabled: ${snapCfg.snapEnabled},
  snapIntensity: ${snapCfg.snapIntensity},
  stickyOffset: ${snapCfg.stickyOffset},
  scrollSmoothing: ${snapCfg.scrollSmoothing},
};`;
        await navigator.clipboard.writeText(codeStr).catch(() => {});
        setSaveToast(true);
        setTimeout(() => setSaveToast(false), 3000);
      }
    } catch {
      // Dev server not available — fallback to clipboard
      const codeStr = `const DEFAULTS: SnapConfig = {
  zoneTop: ${snapCfg.zoneTop},
  zoneBottom: ${snapCfg.zoneBottom},
  easePower: ${snapCfg.easePower},
  gradientBoost: ${snapCfg.gradientBoost},
  cardHeight: ${snapCfg.cardHeight},
  snapEnabled: ${snapCfg.snapEnabled},
  snapIntensity: ${snapCfg.snapIntensity},
  stickyOffset: ${snapCfg.stickyOffset},
  scrollSmoothing: ${snapCfg.scrollSmoothing},
};`;
      await navigator.clipboard.writeText(codeStr).catch(() => {});
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
    setIsSaving(false);
  }, [snapCfg]);

  const active = portfolioItems[activeIndex];

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] text-white relative">
      {/* ── Floating Snap Controller ── */}
      <button
        onClick={() => setShowController((v) => !v)}
        className="fixed bottom-5 right-5 z-[9999] w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer shadow-lg"
        title="Scroll snap controls"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      <AnimatePresence>
        {showController && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 right-5 z-[9999] w-[280px] max-h-[85vh] overflow-y-auto bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl scrollbar-none"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/80 text-[11px] font-medium tracking-widest uppercase">Snap Controls</p>
              <button onClick={() => { setSnapCfg({ ...DEFAULTS }); localStorage.removeItem(STORAGE_KEY); }} className="text-[10px] text-white/40 hover:text-white/70 transition-colors cursor-pointer">Reset</button>
            </div>

            {/* ── Snap Enabled Toggle ── */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <span className="text-[11px] text-white/50">Snap Enabled</span>
              <button
                onClick={() => updateCfg("snapEnabled", !snapCfg.snapEnabled)}
                className={`relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer ${
                  snapCfg.snapEnabled ? "bg-green-500/70" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    snapCfg.snapEnabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* ── Snap Intensity ── */}
            <label className="block mb-3">
              <span className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Snap Intensity</span><span>{snapCfg.snapIntensity}</span>
              </span>
              <input type="range" min="1" max="10" step="1" value={snapCfg.snapIntensity}
                onChange={(e) => updateCfg("snapIntensity", +e.target.value)}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer" />
            </label>

            {/* ── Sticky Offset ── */}
            <label className="block mb-3">
              <span className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Sticky Offset</span><span>{snapCfg.stickyOffset}vh</span>
              </span>
              <input type="range" min="5" max="45" step="1" value={snapCfg.stickyOffset}
                onChange={(e) => updateCfg("stickyOffset", +e.target.value)}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer" />
            </label>

            {/* ── Scroll Smoothing ── */}
            <label className="block mb-3 pb-3 border-b border-white/5">
              <span className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Scroll Smoothing</span><span>{snapCfg.scrollSmoothing}ms</span>
              </span>
              <input type="range" min="100" max="1000" step="50" value={snapCfg.scrollSmoothing}
                onChange={(e) => updateCfg("scrollSmoothing", +e.target.value)}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer" />
            </label>

            {/* Zone Top */}
            <label className="block mb-3">
              <span className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Zone Top</span><span>{snapCfg.zoneTop.toFixed(2)}</span>
              </span>
              <input type="range" min="0.05" max="0.45" step="0.01" value={snapCfg.zoneTop}
                onChange={(e) => updateCfg("zoneTop", +e.target.value)}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer" />
            </label>

            {/* Zone Bottom */}
            <label className="block mb-3">
              <span className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Zone Bottom</span><span>{snapCfg.zoneBottom.toFixed(2)}</span>
              </span>
              <input type="range" min="0.55" max="0.95" step="0.01" value={snapCfg.zoneBottom}
                onChange={(e) => updateCfg("zoneBottom", +e.target.value)}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer" />
            </label>

            {/* Ease Power */}
            <label className="block mb-3">
              <span className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Ease ({snapCfg.easePower === 1 ? "Linear" : snapCfg.easePower === 2 ? "Smooth" : "Cubic"})</span><span>{snapCfg.easePower}</span>
              </span>
              <input type="range" min="1" max="3" step="1" value={snapCfg.easePower}
                onChange={(e) => updateCfg("easePower", +e.target.value)}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer" />
            </label>

            {/* Gradient Boost */}
            <label className="block mb-3">
              <span className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Gradient Intensity</span><span>{snapCfg.gradientBoost.toFixed(1)}</span>
              </span>
              <input type="range" min="1" max="8" step="0.1" value={snapCfg.gradientBoost}
                onChange={(e) => updateCfg("gradientBoost", +e.target.value)}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer" />
            </label>

            {/* Card Height */}
            <label className="block mb-4">
              <span className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Card Height</span><span>{snapCfg.cardHeight}vh</span>
              </span>
              <input type="range" min="40" max="100" step="5" value={snapCfg.cardHeight}
                onChange={(e) => updateCfg("cardHeight", +e.target.value)}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer" />
            </label>

            {/* ── Save Changes Button ── */}
            <button
              onClick={handleSave}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-[0.97] text-white text-[11px] font-medium tracking-wide uppercase transition-all duration-150 cursor-pointer border border-white/5 hover:border-white/15"
            >
              💾 Save Changes
            </button>
            <p className="text-[9px] text-white/25 text-center mt-1.5">
              Saves to browser &amp; copies DEFAULTS to clipboard
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Save Toast ── */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-5 right-20 z-[10000] bg-green-500/90 text-white text-[11px] font-medium px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
          >
            ✓ Config saved — DEFAULTS copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop: Side-by-side layout — cards flow with page scroll ── */}
      <div className="hidden lg:flex relative">
        {/* Left Sticky Panel — sticks to top while cards scroll by */}
        <div className="w-[35%] sticky top-0 h-screen flex flex-col justify-between px-12 xl:px-20 py-16 xl:py-20 z-10">
          {/* Top: "Our work" + Portfolio name */}
          <div className="flex flex-col gap-[8px] pb-[33px] border-b border-[#404040]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-['Figtree',sans-serif] font-light text-[48px] leading-[48px] tracking-[-1.44px] text-white"
            >
              Our work
            </motion.p>
            <div className="min-h-[48px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-['Figtree',sans-serif] font-light text-[48px] leading-[48px] tracking-[-1.44px] text-white"
                >
                  {active.name}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Scroll progress dots */}
            <div className="flex gap-2 mt-2">
              {portfolioItems.map((_, i) => (
                <div
                  key={i}
                  className="h-[3px] rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 32 : 12,
                    backgroundColor:
                      i === activeIndex
                        ? active.brandColor
                        : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Middle: Description */}
          <div className="flex-1 flex items-end pb-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-['Figtree',sans-serif] font-light text-white/50 text-[13px] leading-[1.7] max-w-[380px]"
              >
                {active.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bottom: Logo + tagline + meta */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`meta-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-4 pb-4"
            >
              {/* Brand dot */}
              {/* removed */}
              <div>
                <p className="font-['Figtree',sans-serif] text-white text-[13px]">
                  {active.tagline}
                </p>
                <p className="font-['Figtree',sans-serif] text-white/35 text-[11px] mt-0.5">
                  {active.year} · {active.category}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column — cards in normal page flow, NO separate scroll */}
        <div className="w-[65%] relative flex flex-col gap-[24px] pl-[0px] pr-[24px] pt-[60px] pb-[200px]">
          {portfolioItems.map((item, i) => (
            <div
              key={item.name}
              ref={setCardRef(i)}
              className="flex items-center justify-center flex-shrink-0"
              style={{ height: `${snapCfg.cardHeight}vh` }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full h-full rounded-[12px] overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/project/${item.slug}`)}
              >
                {/* Project image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* Project name overlay on hover */}
                <div className="absolute right-0 bottom-0 z-20 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="invisible">
                    <p className="font-['Figtree',sans-serif] text-white text-[24px] tracking-[-0.5px]">
                      {item.name}
                    </p>
                    <p className="font-['Figtree',sans-serif] text-white/60 text-[13px] mt-1 invisible">
                      View project &rarr;
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: Stacked cards layout ── */}
      <div className="lg:hidden px-5 py-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-['Figtree',sans-serif] text-white/40 text-sm tracking-wide mb-2"
        >
          Our work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-['Figtree',sans-serif] font-light text-3xl md:text-[40px] leading-tight tracking-tight text-white mb-12"
        >
          Selected Projects
        </motion.h2>

        <div className="flex flex-col gap-16">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.05 }}
              onClick={() => navigate(`/project/${item.slug}`)}
              className="cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden mb-6">
                <img
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.image}
                />
              </div>

              {/* Text */}
              <h3 className="font-['Figtree',sans-serif] font-light text-white tracking-tight text-[32px]">
                {item.name}
              </h3>
              <p className="font-['Figtree',sans-serif] font-light text-white/45 leading-[1.65] mt-3 max-w-[440px] text-[14px]">
                {item.description}
              </p>

              {/* Meta */}
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}