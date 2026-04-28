"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* YouTube Video ID */
const YT_VIDEO_ID = "Lfk_qou1SYI";

/* cubic-bezier(0.75, 0, 0.45, 1.00) solver */
function cubicBezier(t: number, p1x: number, p1y: number, p2x: number, p2y: number): number {
	const cx = 3 * p1x;
	const bx = 3 * (p2x - p1x) - cx;
	const ax = 1 - cx - bx;
	const cy = 3 * p1y;
	const by = 3 * (p2y - p1y) - cy;
	const ay = 1 - cy - by;
	const sampleX = (u: number) => ((ax * u + bx) * u + cx) * u;
	const sampleY = (u: number) => ((ay * u + by) * u + cy) * u;
	const sampleDX = (u: number) => (3 * ax * u + 2 * bx) * u + cx;
	// Newton-Raphson to solve for u given t (x-axis)
	let u = t;
	for (let i = 0; i < 8; i++) {
		const dx = sampleX(u) - t;
		if (Math.abs(dx) < 1e-6) break;
		const d = sampleDX(u);
		if (Math.abs(d) < 1e-6) break;
		u -= dx / d;
	}
	return sampleY(u);
}
const introEase = (t: number) => cubicBezier(t, 0.75, 0, 0.45, 1.0);

export function HeroSection() {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [scrollProgress, setScrollProgress] = useState(0);
	const [introProgress, setIntroProgress] = useState(0);
	const introStartTime = useRef<number | null>(null);
	const introRaf = useRef<number>(0);
	const [viewport, setViewport] = useState({
		w: typeof window !== "undefined" ? window.innerWidth : 1440,
		h: typeof window !== "undefined" ? window.innerHeight : 900,
	});

	const INTRO_DURATION = 2000;
	const INTRO_HOLD = 2000;

	// Track viewport size
	useEffect(() => {
		const onResize = () =>
			setViewport({ w: window.innerWidth, h: window.innerHeight });
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	// Intro expand animation
	useEffect(() => {
		introStartTime.current = performance.now();
		const animate = (now: number) => {
			const elapsed = now - (introStartTime.current || now);
			if (elapsed < INTRO_HOLD) {
				setIntroProgress(0);

				introRaf.current = requestAnimationFrame(animate);
				return;
			}
			const expandElapsed = elapsed - INTRO_HOLD;
			const raw = Math.min(expandElapsed / INTRO_DURATION, 1);
			const eased = introEase(raw);
			setIntroProgress(eased);
			if (raw < 1) {
				introRaf.current = requestAnimationFrame(animate);
			}
		};
		introRaf.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(introRaf.current);
	}, []);

	// Scroll tracking
	useEffect(() => {
		const handleScroll = () => {
			if (!wrapperRef.current) return;
			const rect = wrapperRef.current.getBoundingClientRect();
			const wrapperHeight = wrapperRef.current.offsetHeight;
			const viewportHeight = window.innerHeight;
			const scrollableDistance = wrapperHeight - viewportHeight;
			if (scrollableDistance <= 0) {
				setScrollProgress(0);
				return;
			}
			const scrolled = -rect.top;
			const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
			setScrollProgress(progress);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Visibility detection via IntersectionObserver (reserved for future use)
	useEffect(() => {
		const el = wrapperRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			() => {},
			{ threshold: 0.15 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	/* ─── Iframe loaded state ─── */
	const [videoReady, setVideoReady] = useState(false);
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
	const isMobileOrTablet = viewport.w < 1024;

	// Also detect actual playback via YouTube postMessage (more reliable than onLoad)
	useEffect(() => {
		const handleMessage = (e: MessageEvent) => {
			if (e.origin !== "https://www.youtube.com") return;
			try {
				const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
				// info === 1 means video is actually playing
				if (d.event === "onStateChange" && d.info === 1) {
					setVideoReady(true);
				}
			} catch {}
		};
		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	// Dismiss the preloader only when BOTH the video is ready AND the intro
	// has started expanding — so the preloader fades as the hero grows.
	const preloaderSignalSent = useRef(false);
	useEffect(() => {
		if (preloaderSignalSent.current) return;
		if (videoReady && introProgress > 0) {
			preloaderSignalSent.current = true;
			window.dispatchEvent(new CustomEvent("hero-video-ready"));
		}
	}, [videoReady, introProgress]);

	useEffect(() => {
		if (!isVideoModalOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsVideoModalOpen(false);
			}
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [isVideoModalOpen]);

	// Dimensions — initial state matches the GIF preloader card (572×314, r=26)
	const HERO_HEIGHT_RATIO = 0.6;
	const INITIAL_W = Math.min(572, viewport.w - 40);
	const INITIAL_H = Math.round(INITIAL_W * (314 / 572));
	const INITIAL_BR = 26;
	const TARGET_SIZE = Math.min(viewport.w, viewport.h * HERO_HEIGHT_RATIO);
	const targetWidth = isMobileOrTablet ? TARGET_SIZE : viewport.w;
	const targetHeight = isMobileOrTablet ? TARGET_SIZE : viewport.h;

	const introWidth = INITIAL_W + introProgress * (targetWidth - INITIAL_W);
	const introHeight = INITIAL_H + introProgress * (targetHeight - INITIAL_H);
	const introBorderRadius = INITIAL_BR * (1 - introProgress);

	const scrollEffectStrength = Math.max(0, (introProgress - 0.95) / 0.05);
	const scrollScale = 1 - scrollProgress * 0.12 * scrollEffectStrength;
	const scrollBorderRadius = scrollProgress * 32 * scrollEffectStrength;
	const finalBorderRadius = introBorderRadius + scrollBorderRadius;

	return (
		<div
			ref={wrapperRef}
			className="relative"
			style={{ height: isMobileOrTablet ? "45vh" : (introProgress > 0 ? "150vh" : "100vh") }}
		>
			<div
				className="overflow-hidden bg-white flex items-center justify-center"
				style={{
					position: introProgress > 0 ? "sticky" : "relative",
					top: 0,
					height: isMobileOrTablet ? "45vh" : "100vh",
				}}
			>
				<div
					className="overflow-hidden relative"
					style={{
						width: `${introWidth}px`,
						height: `${introHeight}px`,
						borderRadius: `${finalBorderRadius}px`,
						transform: `scale(${scrollScale})`,
						willChange: "width, height, border-radius, transform",
					}}
				>
					{/* YouTube Video Background — iframe scaled to simulate object-fit:cover */}
					<div className="absolute inset-0 overflow-hidden bg-white">
						<iframe
							src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?si=Vb71oiWRIbJ4MLUs&controls=0&autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&vq=hd1080`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
							onLoad={() => setVideoReady(true)}
							className="absolute pointer-events-none border-0"
							style={{
								top: "50%",
								left: "50%",
								width: "177.78vh",   /* 16:9 ratio → height × 1.7778 */
								height: "56.25vw",   /* 16:9 ratio → width  × 0.5625 */
								minWidth: "100%",
								minHeight: "100%",
								transform: "translate(-50%, -50%)",
								opacity: videoReady ? 1 : 0,
								transition: "opacity 0.6s ease-in-out",
							}}
						/>
					</div>

					<motion.button
						type="button"
						onClick={() => setIsVideoModalOpen(true)}
						aria-label="Open video"
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.98 }}
						className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 appearance-none border-0 bg-transparent p-0"
					>
						<div className="relative h-[84px] w-[84px] overflow-hidden rounded-full border border-white/[0.04] bg-black/[0.09] backdrop-blur-[1px]">
							<svg
								viewBox="0 0 24 24"
								className="absolute left-[18px] top-[18px] h-12 w-12 text-white"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M8 6.5v11a1 1 0 0 0 1.54.84l8.5-5.5a1 1 0 0 0 0-1.68l-8.5-5.5A1 1 0 0 0 8 6.5z" />
							</svg>
						</div>
					</motion.button>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: introProgress >= 1 ? 1 - scrollProgress * 2 : 0,
						}}
						transition={{
							delay: introProgress >= 1 ? 0.5 : 0,
							duration: 0.8,
						}}
						className="absolute bottom-8 left-1/2 -translate-x-1/2"
					/>
				</div>
			</div>

			{isVideoModalOpen && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label="Video player"
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
					onClick={() => setIsVideoModalOpen(false)}
				>
					<div
						className="relative w-full max-w-[1100px] overflow-hidden rounded-2xl bg-black shadow-2xl"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							type="button"
							onClick={() => setIsVideoModalOpen(false)}
							aria-label="Close video"
							className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full bg-black/60 text-white transition hover:bg-black/80"
						>
							✕
						</button>

						<div className="relative w-full pt-[56.25%]">
							<iframe
								src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
								title="LF Studio video"
								className="absolute inset-0 h-full w-full border-0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
