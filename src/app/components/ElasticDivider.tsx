import { useEffect, useState } from "react";

const BANDS = [
  { color: "#88b36a", height: 14 },
  { color: "#599f38", height: 13 },
  { color: "#2d7f0d", height: 12 },
  { color: "#086600", height: 11 },
];

const ELASTIC_ZONE_PX = 900;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function ElasticDivider() {
  const [elasticState, setElasticState] = useState({ amount: 0, direction: 1 });

  useEffect(() => {
    let amount = 0;
    let direction = 1;
    let rafId: number | null = null;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const tick = () => {
      amount *= 0.9;
      if (amount < 0.002) amount = 0;
      setElasticState({ amount, direction });
      if (amount > 0) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dy = y - lastY;
      const dt = Math.max(8, now - lastT);
      const velocity = Math.abs(dy) / dt;

      const doc = document.documentElement;
      const scrollBottom = y + window.innerHeight;
      const distanceToEnd = doc.scrollHeight - scrollBottom;
      const endBoost = clamp01(1 - distanceToEnd / ELASTIC_ZONE_PX) * 0.35;

      const impulse = Math.min(1, velocity * 1.5 + endBoost);
      direction = dy >= 0 ? 1 : -1;
      amount = Math.max(amount, impulse);
      setElasticState({ amount, direction });

      if (!rafId) {
        rafId = window.requestAnimationFrame(tick);
      }

      lastY = y;
      lastT = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden relative">
      {BANDS.map((band, i) => (
        <div
          key={i}
          style={{
            backgroundColor: band.color,
            height: `${Math.max(
              4,
              band.height +
                (i % 2 === 0 ? 1 : -1) * elasticState.amount * (5 + i * 1.5)
            )}px`,
            width: "100%",
            transform: `translateX(${(i % 2 === 0 ? -1 : 1) * elasticState.direction * elasticState.amount * (22 + i * 4)}px) scaleX(${1 + elasticState.amount * (0.08 + i * 0.015)}) scaleY(${i % 2 === 0 ? 1 + elasticState.amount * 0.22 : 1 - elasticState.amount * 0.14})`,
            transformOrigin: "center",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
