import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { mediaItemToId } from "@/backend/metadata/tmdb";
import { PirateTooltip } from "@/components/utils/PirateTooltip";
import { TrendingItem } from "@/hooks/useTMDBContent";

interface HeroSectionProps {
  items: TrendingItem[];
  loading?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1.5 text-sm">
      <span className="text-[#F5C518] text-base">★</span>
      <span className="text-white/80 tabular-nums">{rating.toFixed(1)}</span>
      <span className="text-white/40 text-xs">/ 10</span>
    </span>
  );
}

function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] min-h-[480px] max-h-[760px] w-full overflow-hidden rounded-2xl bg-background-secondary animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-background-main via-background-secondary to-transparent" />
      <div className="absolute bottom-0 left-0 p-10 space-y-4">
        <div className="h-10 w-72 rounded-lg bg-white/10" />
        <div className="h-4 w-96 rounded bg-white/10" />
        <div className="h-4 w-64 rounded bg-white/10" />
        <div className="flex gap-3 mt-6">
          <div className="h-11 w-36 rounded-full bg-white/10" />
          <div className="h-11 w-32 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ items, loading }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const featured = items.slice(0, 6);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current || transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(idx);
        setTransitioning(false);
      }, 400);
    },
    [current, transitioning],
  );

  const next = useCallback(() => {
    goTo((current + 1) % featured.length);
  }, [current, featured.length, goTo]);

  useEffect(() => {
    if (featured.length === 0) return;
    intervalRef.current = setInterval(next, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, featured.length]);

  if (loading) return <HeroSkeleton />;
  if (featured.length === 0) return null;

  const item = featured[current];
  const mediaId = mediaItemToId(item);
  const playUrl = `/media/${encodeURIComponent(mediaId)}`;

  return (
    <div className="relative h-[70vh] min-h-[480px] max-h-[760px] w-full overflow-hidden rounded-2xl group">
      {/* Background image with crossfade */}
      {featured.map((fi, i) => (
        <div
          key={fi.id}
          aria-hidden={i !== current}
          className={classNames(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
            i === current && !transitioning ? "opacity-100" : "opacity-0",
          )}
          style={{
            backgroundImage: fi.backdropPath
              ? `url(${fi.backdropPath})`
              : fi.poster
                ? `url(${fi.poster})`
                : undefined,
          }}
        />
      ))}

      {/* Cinematic vignette layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09121F] via-[#09121F]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#09121F]/90 via-[#09121F]/20 to-transparent" />

      {/* Decorative pirate SVG wave at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-16 overflow-hidden">
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full fill-background-main"
        >
          <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,40 1440,32 L1440,64 L0,64 Z" />
        </svg>
      </div>

      {/* Content */}
      <div
        key={item.id}
        className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 animate-hero-fade-up"
      >
        {/* Genre / Type badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5C518]/20 border border-[#F5C518]/30 px-3 py-1 text-xs font-semibold text-[#F5C518] backdrop-blur-sm">
            <span>⚓</span>
            {item.type === "movie" ? "Epic Voyage" : "Seafarer's Tale"}
          </span>
          {item.rating ? <StarRating rating={item.rating} /> : null}
          {item.year ? (
            <span className="text-white/50 text-sm">{item.year}</span>
          ) : null}
        </div>

        {/* Title */}
        <h1 className="mb-3 max-w-2xl text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
          {item.title}
        </h1>

        {/* Overview */}
        {item.overview ? (
          <p className="mb-6 max-w-xl text-sm sm:text-base text-white/70 line-clamp-2 leading-relaxed">
            {item.overview}
          </p>
        ) : null}

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <PirateTooltip
            pirateLabel="Set Sail"
            englishLabel="Play now"
            side="top"
          >
            <Link
              to={playUrl}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#09121F] shadow-lg shadow-black/30 hover:bg-white/90 active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Set Sail
            </Link>
          </PirateTooltip>

          <PirateTooltip
            pirateLabel="Add to Chest"
            englishLabel="Add to watchlist"
            side="top"
          >
            <Link
              to={playUrl}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Add to Chest
            </Link>
          </PirateTooltip>
        </div>
      </div>

      {/* Slide dots */}
      {featured.length > 1 && (
        <div
          className="absolute bottom-6 right-8 flex items-center gap-2"
          role="tablist"
          aria-label="Hero slides"
        >
          {featured.map((fi, i) => (
            <button
              key={fi.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}: ${fi.title}`}
              type="button"
              onClick={() => goTo(i)}
              className={classNames(
                "rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                i === current
                  ? "bg-[#F5C518] w-6 h-2"
                  : "bg-white/30 hover:bg-white/60 w-2 h-2",
              )}
            />
          ))}
        </div>
      )}

      {/* Prev/Next arrow controls */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo((current - 1 + featured.length) % featured.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-black/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-100"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
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
        aria-label="Next slide"
        onClick={() => goTo((current + 1) % featured.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-black/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-100"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
