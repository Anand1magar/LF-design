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

  /* ─── Silence Turbopack / webpack mismatch error in Next 16 ─── */
  turbopack: {},

  /* ─── Webpack config ─── */
  webpack(config) {
    const assetsDir = path.join(process.cwd(), "src", "assets");

    /* ── Rewrite `figma:asset/…` imports to real file paths ──
       Webpack 5 treats the colon in `figma:asset/hash.png` as a
       custom URI scheme and refuses to resolve it through
       `resolve.alias`.  We hook into the module factory BEFORE
       resolution so the request is rewritten to an absolute path
       that webpack can handle normally. */
    config.plugins.push({
      apply(compiler: any) {
        compiler.hooks.normalModuleFactory.tap(
          "RewriteFigmaAsset",
          (factory: any) => {
            factory.hooks.beforeResolve.tap(
              "RewriteFigmaAsset",
              (resolveData: any) => {
                if (
                  resolveData &&
                  resolveData.request &&
                  resolveData.request.startsWith("figma:asset/")
                ) {
                  resolveData.request = resolveData.request.replace(
                    "figma:asset/",
                    assetsDir + "/"
                  );
                }
              }
            );
          }
        );
      },
    });

    /* ── Return plain URL strings for image imports (like Vite) ──
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
