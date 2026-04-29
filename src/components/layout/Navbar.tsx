"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import { navItems, type NavItem } from "@/data/siteConfig";
import Image from "next/image";
import Link from "next/link";
import LFLogo from "@/assets/Logo.svg";

function ContactButton({ fullWidth, className }: { fullWidth?: boolean, className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link
      ref={ref}
      href="mailto:hello@lfdesignstudio.com"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden bg-lf-green text-center text-white rounded-full ${fullWidth ? "w-full block py-3.5" : "py-2"} px-4 font-medium text-md active:scale-[0.98] transition-transform ${className}`}
    >
      {/* Glow blob */}
      <span
        className="pointer-events-none absolute rounded-full transition-opacity duration-300"
        style={{
          width: 60,
          height: 60,
          left: pos.x - 30,
          top: pos.y - 30,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.68) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          filter: "blur(6px)",
        }}
      />
      <span className="relative z-10">Contact</span>
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isAboutPage = pathname.startsWith("/about");
  const isPortfolioPage = pathname.startsWith("/portfolio");

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const resizeCheck = () => {
      if(window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", resizeCheck);
    return () => window.removeEventListener("resize", resizeCheck);
  }, [mobileOpen]);

  // Track which scroll-target section is visible
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const scrollTargets = navItems
      .filter((item) => item.action === "scroll")
      .map((item) => item.target);

    const observers: IntersectionObserver[] = [];

    scrollTargets.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          } else {
            setActiveSection((prev) => (prev === id ? null : prev));
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);


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

  return (
    <>
      <motion.nav
        className="fixed w-full z-[99999]"
      >
        <div className="mx-auto w-full px-4 sm:px-6 md:px-12 py-4 md:py-6">
          <div
            className={`flex mx-auto h-[64px] items-center justify-between rounded-full backdrop-blur-[6px] px-3 transition-[max-width] duration-250 cubics-bezier(0.4, 0, 0.2, 1) md:nav-gradient ${ !mobileOpen ? 'nav-gradient bg-[rgba(30,30,30,0.90)]' : ''}`}
            style={{
              maxWidth: scrolled ? "800px" : "920px",
            }}
          >
            <a
              href="/"
              className="px-4"
            >
              <Image src={LFLogo} alt="LF design logo" className="w-auto" />
            </a>

            <div className="hidden md:flex items-center gap-6 font-medium text-sm leading-[20px] tracking-[-0.35px] text-white">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className={`cursor-pointer transition-opacity hover:opacity-100 ${
                    (item.action === "scroll" && activeSection === item.target) ||
                    (item.target === "/about" && isAboutPage) ||
                    (item.target === "/portfolio" && isPortfolioPage)
                      ? "opacity-100 nav-active"
                      : "opacity-[0.75]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <ContactButton className="hidden md:flex"/>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[5px] w-[40px] h-[40px] items-center justify-center"
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
            <div className="flex-1 flex flex-col justify-center px-12 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
                  onClick={() => handleNav(item)}
                  className="text-left py-4 border-b border-white/8 cursor-pointer"
                >
                  <span className="text-white text-display-xs tracking-tight">
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
              <ContactButton fullWidth />
              <p className="text-white/60 text-sm text-center mt-4">
                hello@designstudio.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
