/**
 * Normalize an image import to a plain URL string.
 *
 * In Vite, `import img from "figma:asset/foo.png"` returns a string.
 * In Next.js (Turbopack/webpack), it returns a StaticImageData object
 * like `{ src: "/_next/static/media/…", width, height }`.
 *
 * This helper safely extracts the URL in all cases.
 */
export function imgSrc(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    // StaticImageData: { src, width, height }
    if (typeof v.src === "string") return v.src;
    // ESM default export wrapper: { default: "url" } or { default: { src } }
    if (typeof v.default === "string") return v.default;
    if (v.default && typeof v.default === "object") {
      const d = v.default as Record<string, unknown>;
      if (typeof d.src === "string") return d.src;
    }
  }
  return String(value);
}
