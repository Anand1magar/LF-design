import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import svgPaths from "../../imports/svg-gkhfmtllfb";

function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const fill = variant === "light" ? "white" : "#1a1a1a";
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
        <path d={svgPaths.p290fbd00} fill="#79B231" />
        <path d={svgPaths.p17abe200} fill="#79B231" />
        <path d={svgPaths.p1af7f900} fill="#79B231" />
        <path d={svgPaths.p27e03100} fill="#79B231" />
        <path d={svgPaths.p3ca3b800} fill="#79B231" />
        <path d={svgPaths.p2c0ecc00} fill="#79B231" />
        <path d={svgPaths.p9021700} fill="#79B231" />
        <path d={svgPaths.pdfda300} fill="#79B231" />
      </svg>
    </div>
  );
}

interface NavItem {
  label: string;
  action: "scroll" | "route";
  target: string;
}

const navItems: NavItem[] = [
  { label: "Process", action: "scroll", target: "process" },
  { label: "About", action: "route", target: "/about" },
  { label: "AI x Design", action: "scroll", target: "ai-design" },
  { label: "Portfolio", action: "scroll", target: "portfolio" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
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
        navigate(item.target);
      } else {
        // If not on home page, navigate home first then scroll
        if (location.pathname !== "/") {
          navigate("/");
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
    [navigate, location.pathname]
  );

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 bg-transparent`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-[22px]">
          <button
            onClick={() => navigate("/")}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-xl cursor-pointer"
            style={{ backgroundColor: "rgba(81,81,81,0.4)" }}
          >
            <Logo variant="light" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNav(item)}
                className="px-4 py-2 rounded-full font-['Figtree',sans-serif] font-medium text-sm tracking-tight transition-colors text-white hover:bg-[rgba(81,81,81,0.6)] backdrop-blur-xl cursor-pointer"
                style={{ backgroundColor: "rgba(81,81,81,0.4)" }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-[#79B231] hover:bg-[#6a9e2a] text-white px-5 py-2 rounded-full font-['Figtree',sans-serif] font-medium text-sm transition-colors cursor-pointer backdrop-blur-xl"
          >
            Contact
          </motion.button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2.5 rounded-full backdrop-blur-xl cursor-pointer"
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
            {/* Spacer for navbar height */}
            <div className="h-[72px] shrink-0" />

            {/* Nav links */}
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
                  <span className="font-['Figtree',sans-serif] text-white text-[28px] tracking-tight">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="px-8 pb-10"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full bg-[#79B231] text-white py-3.5 rounded-full font-['Figtree',sans-serif] font-medium text-[15px] cursor-pointer active:scale-[0.98] transition-transform"
              >
                Contact Us
              </button>
              <p className="font-['Figtree',sans-serif] text-white/30 text-[12px] text-center mt-4">
                hello@designstudio.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}