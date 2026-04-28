import { ReactNode, useRef, useState } from "react";

interface ContentRailProps {
  title: string;
  icon?: string;
  children: ReactNode;
}

export function RailCardSkeleton() {
  return (
    <div className="flex-none w-36 sm:w-44">
      <div
        className="w-full rounded-xl animate-shimmer"
        style={{
          paddingBottom: "150%",
          backgroundImage:
            "linear-gradient(90deg, #EBEBEB 0%, #F5F5F5 50%, #EBEBEB 100%)",
          backgroundSize: "200% 100%",
        }}
      />
      <div className="mt-2 h-3 w-3/4 rounded bg-[#E8E8E8]" />
    </div>
  );
}

export function ContentRail({ title, icon, children }: ContentRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 480 : -480, behavior: "smooth" });
  };

  return (
    <section aria-label={title} className="relative">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="block h-6 w-1 rounded-full bg-[#111111]"
            aria-hidden="true"
          />
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#111111]">
            {icon && <span aria-hidden="true">{icon}</span>}
            {title}
          </h2>
        </div>

        {/* Scroll arrows */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0] text-[#555555] transition-all hover:bg-[#E0E0E0] hover:text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
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
            aria-label={`Scroll ${title} right`}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0] text-[#555555] transition-all hover:bg-[#E0E0E0] hover:text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
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

      {/* Scrollable row */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 transition-opacity duration-200"
          style={{
            opacity: canScrollLeft ? 1 : 0,
            background: "linear-gradient(to right, #FFFFFF, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 transition-opacity duration-200"
          style={{
            opacity: canScrollRight ? 1 : 0,
            background: "linear-gradient(to left, #FFFFFF, transparent)",
          }}
        />

        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
