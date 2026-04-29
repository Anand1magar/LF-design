"use client";

import { motion } from "motion/react";

interface PlayButtonProps {
    onClick?: () => void;
    href?: string;
    isLoading?: boolean; // New prop for loading state
    size?: number;
    label?: string;
    variant?: "icon" | "pill";
    children?: React.ReactNode;
    className?: string;
}

export function PlayButton({
    onClick,
    href,
    isLoading = false,
    size = 84,
    label = "Open video",
    variant = "icon",
    children,
    className = "",
}: PlayButtonProps) {
    const sharedClasses = "rounded-full border border-[var(--border-dark)] bg-[var(--overlay-dark)] backdrop-blur-[1px]";

    const handleClick = () => {
        if (isLoading) return; // Prevent clicks while loading
        if (href) {
            window.location.href = href;
        } else if (onClick) {
            onClick();
        }
    };

    // Shared Loading Spinner Component
    const Loader = () => (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="border-2 border-text-inverse/20 border-t-text-inverse rounded-full"
            style={{ 
                width: variant === "pill" ? 20 : size * 0.4, 
                height: variant === "pill" ? 20 : size * 0.4 
            }}
        />
    );

    if (variant === "pill") {
        return (
            <motion.button
                type="button"
                onClick={handleClick}
                disabled={isLoading}
                whileTap={isLoading ? {} : { scale: 0.98 }}
                className={`h-[48px] px-6 flex items-center justify-center gap-3 ${sharedClasses} text-text-inverse ${isLoading ? "cursor-not-allowed opacity-80" : "cursor-pointer"} ${className}`}
            >
                {isLoading ? <Loader /> : children}
            </motion.button>
        );
    }

    const iconOffset = Math.round(size * 0.214);

    return (
        <motion.button
            type="button"
            onClick={handleClick}
            disabled={isLoading}
            aria-label={label}
            whileHover={isLoading ? {} : { scale: 1.04 }}
            whileTap={isLoading ? {} : { scale: 0.98 }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 appearance-none border-0 bg-transparent p-0"
        >
            <div
                className={`relative flex items-center justify-center overflow-hidden ${sharedClasses}`}
                style={{ width: size, height: size }}
            >
                {isLoading ? (
                    <Loader />
                ) : (
                    <svg
                        viewBox="0 0 24 24"
                        className="absolute size-12 text-text-inverse"
                        style={{ top: iconOffset, left: iconOffset }}
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M8 6.5v11a1 1 0 0 0 1.54.84l8.5-5.5a1 1 0 0 0 0-1.68l-8.5-5.5A1 1 0 0 0 8 6.5z" />
                    </svg>
                )}
            </div>
        </motion.button>
    );
}