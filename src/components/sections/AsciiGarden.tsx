"use client";

import { useMemo } from "react";

/* ── deterministic pseudo-random ── */
function h(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return ((x % 1) + 1) % 1;
}

/* ── palette ── */
const DK = ["#0b1a04", "#0f2606", "#132e08", "#163409"];
const MD = ["#1c4210", "#234b12", "#2d5016", "#38651f"];
const LT = ["#3a6b24", "#4a8c34", "#5da043", "#4e9030"];
const BR = ["#6ab648", "#7cc854", "#8ed660"];
const YL = "#eebb33";
const OR = "#d48818";
const ST = "#2a6219";

/* ── plant templates ── */
type Line = { chars: string; colors: (string | null)[] };
interface PlantTpl {
  lines: Line[];
  heightPx: number;
}

const SUNFLOWER: PlantTpl = {
  lines: [
    { chars: " ,@, ", colors: [null, YL, OR, YL, null] },
    { chars: "(@@@)", colors: [YL, "#c98a14", OR, "#c98a14", YL] },
    { chars: " \\|/ ", colors: [null, LT[0], ST, LT[0], null] },
    { chars: "  |  ", colors: [null, null, ST, null, null] },
    { chars: " -|- ", colors: [null, MD[2], MD[0], MD[2], null] },
    { chars: "  |  ", colors: [null, null, MD[0], null, null] },
    { chars: " /|\\ ", colors: [null, DK[2], DK[1], DK[2], null] },
  ],
  heightPx: 98,
};

const TALL_GRASS_A: PlantTpl = {
  lines: [
    { chars: " / ", colors: [null, BR[1], null] },
    { chars: "/| ", colors: [LT[2], LT[0], null] },
    { chars: " |\\", colors: [null, MD[2], MD[1]] },
    { chars: " | ", colors: [null, MD[0], null] },
    { chars: "/| ", colors: [DK[2], DK[1], null] },
  ],
  heightPx: 70,
};

const TALL_GRASS_B: PlantTpl = {
  lines: [
    { chars: " \\ ", colors: [null, BR[0], null] },
    { chars: " |/", colors: [null, LT[1], LT[2]] },
    { chars: "\\| ", colors: [MD[3], MD[1], null] },
    { chars: " | ", colors: [null, MD[0], null] },
    { chars: " |\\", colors: [null, DK[2], DK[3]] },
  ],
  heightPx: 70,
};

const FERN: PlantTpl = {
  lines: [
    { chars: "\\|/ ", colors: [LT[2], LT[0], LT[1], null] },
    { chars: "/|\\ ", colors: [LT[1], MD[2], LT[0], null] },
    { chars: " |  ", colors: [null, MD[0], null, null] },
    { chars: "/|\\ ", colors: [DK[2], DK[1], DK[2], null] },
  ],
  heightPx: 56,
};

const BUSH: PlantTpl = {
  lines: [
    { chars: "~^~^~", colors: [LT[2], BR[0], LT[1], BR[1], LT[0]] },
    { chars: "/||\\|", colors: [MD[2], MD[0], MD[1], MD[2], MD[0]] },
    { chars: "|/|\\|", colors: [DK[2], DK[1], DK[0], DK[2], DK[1]] },
  ],
  heightPx: 42,
};

const SHORT_GRASS: PlantTpl = {
  lines: [
    { chars: " | ", colors: [null, LT[1], null] },
    { chars: "/|\\", colors: [MD[2], MD[0], MD[1]] },
    { chars: "|||", colors: [DK[2], DK[0], DK[1]] },
  ],
  heightPx: 42,
};

const TINY_GRASS: PlantTpl = {
  lines: [
    { chars: "/\\", colors: [LT[0], LT[2]] },
    { chars: "||", colors: [MD[0], MD[2]] },
  ],
  heightPx: 28,
};

const WILD_STEM: PlantTpl = {
  lines: [
    { chars: " * ", colors: [null, "#b8cc44", null] },
    { chars: " | ", colors: [null, LT[0], null] },
    { chars: "/| ", colors: [MD[2], MD[0], null] },
    { chars: " | ", colors: [null, DK[2], null] },
  ],
  heightPx: 56,
};

/* ── layout generation ── */
interface PlantInstance {
  tpl: PlantTpl;
  x: number; // percentage 0–100
  sway: "gentle" | "moderate" | "strong";
  duration: number;
  delay: number;
}

function generateLayout(): PlantInstance[] {
  const items: PlantInstance[] = [];

  // Sunflowers — evenly distributed focal points
  const sfX = [3, 14, 27, 41, 54, 66, 79, 91];
  sfX.forEach((x, i) => {
    items.push({
      tpl: SUNFLOWER,
      x,
      sway: "strong",
      duration: 4.5 + h(i * 37) * 2.5,
      delay: h(i * 71) * 3,
    });
  });

  // Fill dense vegetation in between
  const templates = [
    TALL_GRASS_A, TALL_GRASS_B, FERN, BUSH, SHORT_GRASS, TINY_GRASS, WILD_STEM,
    SHORT_GRASS, TINY_GRASS, TALL_GRASS_A, BUSH, TINY_GRASS,
  ];

  for (let i = 0; i < 90; i++) {
    const x = (h(i * 97 + 13) * 104) - 2; // –2% to 102%
    const tplIdx = Math.floor(h(i * 53 + 7) * templates.length);
    const tpl = templates[tplIdx];
    const isShort = tpl === SHORT_GRASS || tpl === TINY_GRASS;
    items.push({
      tpl,
      x: Math.max(-2, Math.min(x, 101)),
      sway: isShort ? "gentle" : "moderate",
      duration: 3 + h(i * 67) * 4,
      delay: h(i * 41 + 3) * 5,
    });
  }

  return items;
}

/* ── base carpet rows ── */
function buildBaseRow(rowIdx: number, count: number): { ch: string; color: string }[] {
  const charSets = [
    "#%&@*$WM#&%@",       // bottom — densest
    "^~\"'{}`|/\\^~",     // mid
    " /|\\.  / \\| ",     // top — sparsest
  ];
  const colorSets = [DK, MD, LT];
  const chars = charSets[rowIdx];
  const colors = colorSets[rowIdx];
  const row: { ch: string; color: string }[] = [];
  for (let i = 0; i < count; i++) {
    const ci = Math.floor(h(i * 31 + rowIdx * 97) * chars.length);
    const ki = Math.floor(h(i * 43 + rowIdx * 61) * colors.length);
    row.push({ ch: chars[ci], color: colors[ki] });
  }
  return row;
}

/* ── render a single plant ── */
function PlantElement({ plant }: { plant: PlantInstance }) {
  const animName =
    plant.sway === "strong" ? "gSway3" : plant.sway === "moderate" ? "gSway2" : "gSway1";

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        bottom: 36,
        left: `${plant.x}%`,
        transformOrigin: "bottom center",
        animation: `${animName} ${plant.duration}s ease-in-out ${plant.delay}s infinite`,
        zIndex: plant.tpl === SUNFLOWER ? 3 : plant.tpl.heightPx > 50 ? 2 : 1,
      }}
    >
      {plant.tpl.lines.map((line, li) => (
        <div
          key={li}
          className="flex"
          style={{ lineHeight: "14px", height: 14 }}
        >
          {line.chars.split("").map((ch, ci) => (
            <span
              key={ci}
              style={{
                color: line.colors[ci] || "transparent",
                width: 8.5,
                textAlign: "center" as const,
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: 14,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════
   Main Component
   ════════════════════════════════ */
export function AsciiGarden() {
  const plants = useMemo(() => generateLayout(), []);
  const baseRows = useMemo(
    () => [buildBaseRow(2, 280), buildBaseRow(1, 280), buildBaseRow(0, 280)],
    [],
  );

  return (
    <div
      className="w-full overflow-hidden select-none pointer-events-none relative"
      style={{ height: 140 }}
      aria-hidden="true"
    >
      {/* CSS keyframes for sway */}
      <style>{`
        @keyframes gSway1 {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          30% { transform: rotate(1.2deg) translateX(0.5px); }
          70% { transform: rotate(-0.8deg) translateX(-0.3px); }
        }
        @keyframes gSway2 {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          25% { transform: rotate(2.5deg) translateX(1px); }
          55% { transform: rotate(-1.8deg) translateX(-0.8px); }
          80% { transform: rotate(0.8deg) translateX(0.3px); }
        }
        @keyframes gSway3 {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          20% { transform: rotate(3.5deg) translateX(1.5px); }
          45% { transform: rotate(-2.5deg) translateX(-1px); }
          65% { transform: rotate(1.8deg) translateX(0.8px); }
          85% { transform: rotate(-1deg) translateX(-0.4px); }
        }
        @keyframes baseSway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-1.5px); }
        }
      `}</style>

      {/* Individual plants (above base) */}
      {plants.map((p, i) => (
        <PlantElement key={i} plant={p} />
      ))}

      {/* Dense base carpet — 3 rows at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 13,
          lineHeight: "14px",
          animation: "baseSway 6s ease-in-out infinite",
        }}
      >
        {baseRows.map((row, ri) => (
          <div key={ri} className="whitespace-nowrap overflow-hidden">
            {row.map((cell, ci) => (
              <span key={ci} style={{ color: cell.color }}>
                {cell.ch}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
