import classNames from "classnames";
import { ReactNode, useCallback, useRef, useState } from "react";

import { PirateTooltip } from "@/components/utils/PirateTooltip";

interface ContentRailProps {
  /** Pirate-language section title */
  title: string;
  /** English meaning of the section title */
  titleEnglish: string;
  /** Optional icon/emoji before title */
  icon?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Horizontal scroll rail with arrow navigation, pirate section heading,
 * and smooth scroll snapping.
 */
export function ContentRail({
  title,
  titleEnglish,
  icon,
  children,
  className,
}: ContentRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      className={classNames("relative", className)}
      aria-label={titleEnglish}
    >
      {/* Section heading */}
      <div className="mb-4 flex items-center justify-between px-1">
        <PirateTooltip
          pirateLabel={title}
          englishLabel={titleEnglish}
          side="right"
        >
          <h2 className="flex items-center gap-2 text-base font-bold uppercase tracking-widest text-type-text cursor-default select-none">
            {icon && (
              <span className="text-xl" aria-hidden="true">
                {icon}
              </span>
            )}
            {title}
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-type-dimmed opacity-50"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </h2>
        </PirateTooltip>

        {/* Navigation arrows */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={`Scroll ${titleEnglish} left`}
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
            className={classNames(
              "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-150",
              canScrollLeft
                ? "hover:bg-white/10 hover:text-white hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                : "opacity-30 cursor-not-allowed",
            )}
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Scroll ${titleEnglish} right`}
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
            className={classNames(
              "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-150",
              canScrollRight
                ? "hover:bg-white/10 hover:text-white hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                : "opacity-30 cursor-not-allowed",
            )}
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background-main to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background-main to-transparent" />

        {/* Scrollable rail */}
        <div
          ref={railRef}
          onScroll={updateArrows}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/** Skeleton placeholder card for loading state */
export function RailCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-36 sm:w-44">
      <div className="aspect-[2/3] w-full rounded-xl bg-background-secondary animate-pulse" />
      <div className="mt-2 h-3 w-3/4 rounded bg-background-secondary animate-pulse" />
      <div className="mt-1.5 h-2.5 w-1/2 rounded bg-background-secondary animate-pulse" />
    </div>
  );
}
