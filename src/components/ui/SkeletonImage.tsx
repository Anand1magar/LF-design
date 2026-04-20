"use client";

import { useState } from "react";

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
}

/**
 * Drop-in <img> replacement that shows an animated shimmer skeleton
 * until the image has loaded. Wraps both elements in a relative container.
 */
export function SkeletonImage({
  className = "",
  skeletonClassName = "",
  alt = "",
  ...props
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#e8e8e8] via-[#f2f2f2] to-[#e8e8e8] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] ${skeletonClassName}`}
        />
      )}
      <img
        {...props}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
