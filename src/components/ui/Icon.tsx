"use client";
import iconPaths from "@/imports/svg-tscbarbuj1";

/* ─── Icon definitions ───────────────────────────────────────────── */

const ICON_DEFS = {
  user:  { viewBox: "0 0 13.4 14.9", strokeWidth: "1.4", paths: [iconPaths.p12e51680, iconPaths.p27fd9e00] },
  robot: { viewBox: "0 0 16.4 17.9", strokeWidth: "1.4", paths: [iconPaths.p1022480, iconPaths.p25966000, iconPaths.p1cfdd300] },
  plus:  { viewBox: "0 0 7 7",       strokeWidth: "1",   paths: ["M3.5 0.5V6.5M0.5 3.5H6.5"] },
} satisfies Record<string, { viewBox: string; strokeWidth: string; paths: string[] }>;

export type IconName = keyof typeof ICON_DEFS;

/* ─── Component ──────────────────────────────────────────────────── */

export function Icon({ name }: { name: IconName }) {
  const { viewBox, strokeWidth, paths } = ICON_DEFS[name];
  const wrapped = name === "user" || name === "robot";

  const svg = (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      className={wrapped ? "block w-full h-full" : "shrink-0"}
      {...(wrapped ? {} : { width: "7", height: "7" })}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="var(--color-ink-550)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );

  return wrapped ? (
    <div aria-hidden="true" className="overflow-clip relative shrink-0 w-4.5 h-4.5 mt-0.5">
      {svg}
    </div>
  ) : svg;
}
