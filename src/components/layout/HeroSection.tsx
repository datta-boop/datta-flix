import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { mediaItemToId } from "@/backend/metadata/tmdb";
import { TrendingItem } from "@/hooks/useTMDBContent";

interface HeroSectionProps {
  items: TrendingItem[];
  loading?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1.5 text-sm">
      <span className="text-yellow-400">★</span>
      <span className="text-white/90 tabular-nums">{rating.toFixed(1)}</span>
      <span className="text-white/50 text-xs">/ 10</span>
    </span>
  );
}

function HeroSkeleton() {
  return (
    <div className="relative h-[72vh] min-h-[500px] max-h-[780px] w-full overflow-hidden rounded-2xl bg-[#EBEBEB] animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-[#E0E0E0] via-[#EBEBEB]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 p-10 space-y-4">
        <div className="h-5 w-40 rounded-full bg-[#D8D8D8]" />
        <div className="h-12 w-80 rounded-xl bg-[#D8D8D8]" />
        <div className="h-4 w-96 rounded bg-[#D8D8D8]" />
        <div className="h-4 w-64 rounded bg-[#D8D8D8]" />
        <div className="flex gap-3 mt-6">
          <div className="h-11 w-36 rounded-full bg-[#D8D8D8]" />
          <div className="h-11 w-32 rounded-full bg-[#D8D8D8]" />
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
    <div className="relative h-[72vh] min-h-[500px] max-h-[780px] w-full overflow-hidden rounded-2xl group">
      {/* Backdrop images with crossfade */}
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

      {/* Gradient overlays for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div
        key={item.id}
        className="absolute inset-0 flex flex-col justify-end p-8 sm:p-14 animate-fade-up"
      >
        {/* Type + rating row */}
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {item.type === "movie" ? "Film" : "Series"}
          </span>
          {item.rating ? <StarRating rating={item.rating} /> : null}
          {item.year ? (
            <span className="text-white/60 text-sm">{item.year}</span>
          ) : null}
        </div>

        {/* Title */}
        <h1 className="mb-3 max-w-2xl text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
          {item.title}
        </h1>

        {/* Overview */}
        {item.overview ? (
          <p className="mb-8 max-w-lg text-sm sm:text-base text-white/75 line-clamp-2 leading-relaxed">
            {item.overview}
          </p>
        ) : null}

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={playUrl}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#111111] shadow-lg shadow-black/20 hover:bg-white/90 active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </Link>
          <Link
            to={playUrl}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-black/50 active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            More Info
          </Link>
        </div>
      </div>

      {/* Dot indicators */}
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
                  ? "bg-white w-6 h-2"
                  : "bg-white/30 hover:bg-white/60 w-2 h-2",
              )}
            />
          ))}
        </div>
      )}

      {/* Prev / Next arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo((current - 1 + featured.length) % featured.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-black/60 transition-all duration-200 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-black/60 transition-all duration-200 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
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
