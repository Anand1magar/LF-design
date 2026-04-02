"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* YouTube Video ID */
const YT_VIDEO_ID = "Lfk_qou1SYI";

export function HeroSection() {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [scrollProgress, setScrollProgress] = useState(0);
	const [introProgress, setIntroProgress] = useState(0);
	const introStartTime = useRef<number | null>(null);
	const introRaf = useRef<number>(0);
	const [viewport, setViewport] = useState({
		w: window.innerWidth,
		h: window.innerHeight,
	});

	const INTRO_DURATION = 2800;
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
			const t = raw;
			const eased =
				t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
			([entry]) => {},
			{ threshold: 0.15 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	/* ─── Iframe loaded state ─── */
	const [videoReady, setVideoReady] = useState(false);
	const isMobileOrTablet = viewport.w < 1024;

	// Dimensions
	const HERO_HEIGHT_RATIO = 0.6;
	const INITIAL_W = Math.min(380, viewport.w - 40);
	const INITIAL_H = Math.min(199, viewport.h * 0.3);
	const INITIAL_BR = 20;
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
			style={{ height: isMobileOrTablet ? "45vh" : "150vh" }}
		>
			<div
				className="sticky top-0 overflow-hidden bg-white flex items-center justify-center"
				style={{ height: isMobileOrTablet ? "45vh" : "100vh" }}
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
					{/* YouTube Video Background — simple iframe embed */}
					<div className="absolute inset-0 overflow-hidden bg-black">
						<iframe
							src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?si=Vb71oiWRIbJ4MLUs&controls=0&autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
							onLoad={() => setVideoReady(true)}
							className="absolute pointer-events-none border-0"
							style={{
								top: isMobileOrTablet ? "50%" : "-80px",
								left: isMobileOrTablet ? "50%" : "-80px",
								width: isMobileOrTablet
									? "calc((100% + 160px) * 1.7778)"
									: "calc(100% + 160px)",
								height: "calc(100% + 160px)",
								transform: isMobileOrTablet
									? "translate(-50%, -50%)"
									: "none",
								opacity: videoReady ? 1 : 0,
								transition: "opacity 0.6s ease-in-out",
							}}
						/>
					</div>

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
		</div>
	);
}

