"use client";

// Gradient green stripes that visually connect the main content to the footer.
// Band colors form a light-to-dark green ramp using --color-divider-band-* tokens.
const BANDS = [
  { color: "var(--color-divider-band-1)", height: 14 },
  { color: "var(--color-divider-band-2)", height: 13 },
  { color: "var(--color-divider-band-3)", height: 12 },
  { color: "var(--color-green-500)",      height: 11 },
];

export function ElasticDivider() {
  return (
    <div className="w-full overflow-hidden relative">
      {BANDS.map((band, i) => (
        <div
          key={i}
          style={{
            backgroundColor: band.color,
            height: `${band.height}px`,
            width: "100%",
          }}
        />
      ))}
    </div>
  );
}
