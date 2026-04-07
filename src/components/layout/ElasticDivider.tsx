"use client";

const BANDS = [
  { color: "#88b36a", height: 14 },
  { color: "#599f38", height: 13 },
  { color: "#2d7f0d", height: 12 },
  { color: "#086600", height: 11 },
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
