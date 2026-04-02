import { useEffect, useState, type RefObject } from "react";

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number;
}

export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const { once = false, margin = "0px", threshold = 0 } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        if (inView && once) {
          observer.unobserve(element);
        }
      },
      {
        rootMargin: margin,
        threshold,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, once, margin, threshold]);

  return isInView;
}
