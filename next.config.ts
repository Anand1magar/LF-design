import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* ─── Image optimization ─── */
  images: {
    /* Disable built-in static image imports so .png imports return
       plain URL strings (matching Vite behaviour) instead of
       StaticImageData objects. */
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  /* ─── Webpack config ─── */
  webpack(config) {
    /* Alias: figma:asset → src/assets */
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "figma:asset": path.join(process.cwd(), "src/assets"),
    };

    /* Return plain URL strings for image imports (like Vite).
       Next.js wraps rules in a { oneOf: [...] } — we must prepend
       our rule inside that oneOf so it matches BEFORE the built-in
       image handlers. */
    const imageRule = {
      test: /\.(png|jpe?g|gif|webp|avif|ico|bmp|svg)$/i,
      type: "asset/resource" as const,
      generator: {
        filename: "static/media/[hash:16][ext]",
      },
    };

    for (const rule of config.module.rules) {
      if (rule && typeof rule === "object" && "oneOf" in rule && rule.oneOf) {
        rule.oneOf.unshift(imageRule);
        break;
      }
    }

    return config;
  },
};

export default nextConfig;
