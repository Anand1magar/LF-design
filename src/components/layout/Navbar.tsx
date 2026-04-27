"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import svgPaths from "@/imports/svg-gkhfmtllfb";
import { navItems, type NavItem } from "@/data/siteConfig";
import { useScramble } from "@/hooks/useScramble";

function NavContactButton({ href }: { href: string }) {
  const router = useRouter();
  const { ref, onMouseEnter, onMouseLeave } = useScramble("Contact", { speed: 35, tick: 1 });

  const handleClick = () => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group inline-flex overflow-hidden transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(135,208,50,0.3)] rounded-full p-[2px] relative items-center justify-center cursor-pointer"
    >
      <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_60%,var(--lf-green-bright)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="flex items-center justify-center text-black bg-white w-full h-full rounded-full py-[7px] px-5 relative font-['Figtree',sans-serif] font-medium text-sm tracking-[-0.35px]">
        <span ref={ref as React.RefObject<HTMLSpanElement>} className="relative z-10">Contact</span>
      </span>
    </button>
  );
}

function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const fill = variant === "light" ? "var(--text-inverse)" : "var(--text-body)";
  return (
    <div className="flex items-center gap-2">
      <svg width="93" height="18" viewBox="0 0 93.2913 17.7296" fill="none">
        <g clipPath="url(#logo-clip)">
          <path d={svgPaths.p52dbe00} fill={fill} />
          <path d={svgPaths.pb4ca280} fill={fill} />
          <path d={svgPaths.p3b79c000} fill={fill} />
          <path d={svgPaths.p24467380} fill={fill} />
          <path d={svgPaths.p16644f80} fill={fill} />
          <path d={svgPaths.p293c5000} fill={fill} />
          <path d={svgPaths.p3786ff00} fill={fill} />
          <path d={svgPaths.p29c81c00} fill={fill} />
          <path d={svgPaths.p11663900} fill={fill} />
        </g>
        <defs>
          <clipPath id="logo-clip">
            <rect fill="white" height="17.7296" width="93.2913" />
          </clipPath>
        </defs>
      </svg>
      <svg width="60" height="20" viewBox="0 0 60.085 19.87" fill="none">
        <path d={svgPaths.p290fbd00} fill="var(--lf-green)" />
        <path d={svgPaths.p17abe200} fill="var(--lf-green)" />
        <path d={svgPaths.p1af7f900} fill="var(--lf-green)" />
        <path d={svgPaths.p27e03100} fill="var(--lf-green)" />
        <path d={svgPaths.p3ca3b800} fill="var(--lf-green)" />
        <path d={svgPaths.p2c0ecc00} fill="var(--lf-green)" />
        <path d={svgPaths.p9021700} fill="var(--lf-green)" />
        <path d={svgPaths.pdfda300} fill="var(--lf-green)" />
      </svg>
    </div>
  );
}


export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isAboutPage = pathname.startsWith("/about");
  const isPortfolioPage = pathname.startsWith("/portfolio");

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNav = useCallback(
    (item: NavItem) => {
      setMobileOpen(false);
      if (item.action === "route") {
        router.push(item.target);
      } else {
        // If not on home page, navigate home first then scroll
        if (pathname !== "/") {
          router.push("/");
          setTimeout(() => {
            document
              .getElementById(item.target)
              ?.scrollIntoView({ behavior: "smooth" });
          }, 300);
        } else {
          document
            .getElementById(item.target)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [router, pathname]
  );

  const handleContact = useCallback(() => {
    handleNav({ label: "Contact", action: "scroll", target: "contact" });
  }, [handleNav]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[10000]"
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-12 py-4 md:py-[22px]">
          <div
            className="hidden md:flex h-[56px] w-full mx-auto items-center justify-between rounded-[80px] bg-[rgba(60,60,60,0.73)] backdrop-blur-[8px] pl-[18px] pr-[13px]"
            style={{
              maxWidth: scrolled ? "693px" : "820px",
              transition: "max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <button
              onClick={() => router.push("/")}
              className="flex h-[36px] w-[193px] items-center rounded-full px-4 cursor-pointer"
            >
              <Logo variant="light" />
            </button>

            <div className="flex items-center gap-6 font-['Figtree',sans-serif] font-medium text-sm leading-[20px] tracking-[-0.35px] text-center text-white">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className={`cursor-pointer transition-opacity hover:opacity-100 ${
                    (item.target === "/about" && isAboutPage) || (item.target === "/portfolio" && isPortfolioPage)
                      ? "opacity-100"
                      : "opacity-[0.66]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

              <NavContactButton href="#contact" />
          </div>

          <div className="md:hidden flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="px-3 py-1.5 rounded-full backdrop-blur-xl cursor-pointer"
              style={{ backgroundColor: "rgba(81,81,81,0.4)" }}
            >
              <Logo variant="light" />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-[5px] p-2.5 rounded-full backdrop-blur-xl cursor-pointer"
              style={{ backgroundColor: "rgba(81,81,81,0.4)" }}
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-[1.5px] rounded-full transition-all duration-300 bg-white origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`w-5 h-[1.5px] rounded-full transition-all duration-300 bg-white ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`w-5 h-[1.5px] rounded-full transition-all duration-300 bg-white origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: "rgba(10,10,10,0.96)" }}
          >
            <div className="h-[72px] shrink-0" />
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
                  onClick={() => handleNav(item)}
                  className="text-left py-4 border-b border-white/6 cursor-pointer"
                >
                  <span className="font-['Figtree',sans-serif] text-white text-display-xs tracking-tight">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="px-8 pb-10"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full bg-lf-green text-white py-3.5 rounded-full font-['Figtree',sans-serif] font-medium text-sm cursor-pointer active:scale-[0.98] transition-transform"
              >
                Contact Us
              </button>
              <p className="font-['Figtree',sans-serif] text-white/30 text-xs text-center mt-4">
                hello@designstudio.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
