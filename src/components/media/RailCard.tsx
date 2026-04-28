import { Link } from "react-router-dom";

import { mediaItemToId } from "@/backend/metadata/tmdb";
import { MediaItem } from "@/utils/mediaTypes";

interface RailCardProps {
  media: MediaItem & { backdropPath?: string };
  percentage?: number;
}

function checkReleased(media: MediaItem): boolean {
  const isReleasedYear = Boolean(
    media.year && media.year <= new Date().getFullYear(),
  );
  const isReleasedDate = Boolean(
    media.release_date && media.release_date <= new Date(),
  );
  return media.release_date ? isReleasedDate : isReleasedYear;
}

export function RailCard({ media, percentage }: RailCardProps) {
  const released = checkReleased(media);
  const mediaId = mediaItemToId(media);
  const url = `/media/${encodeURIComponent(mediaId)}`;

  const inner = (
    <div className="group flex-none w-36 sm:w-44 cursor-pointer">
      {/* Poster */}
      <div
        className="relative w-full overflow-hidden rounded-xl bg-surface-600 ring-1 ring-white/5 transition-all duration-300 group-hover:ring-[#D4A843]/60 group-hover:shadow-lg group-hover:shadow-[#D4A843]/10 group-hover:scale-[1.03]"
        style={{ paddingBottom: "150%" }}
      >
        {media.poster ? (
          <img
            src={media.poster}
            alt={media.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-500">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-surface-300"
            >
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-surface-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D4A843] shadow-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#090D1C"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        {percentage !== undefined && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-surface-700">
            <div
              className="h-full bg-[#D4A843] rounded-full"
              style={{ width: `${Math.min(100, Math.round(percentage))}%` }}
            />
          </div>
        )}

        {/* Unreleased badge */}
        {!released && (
          <div className="absolute top-2 right-2 rounded-md bg-surface-700/90 px-1.5 py-0.5">
            <span className="text-[10px] font-semibold text-warm-400">
              Soon
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <p className="mt-2 line-clamp-2 text-xs font-medium text-warm-300 group-hover:text-[#D4A843] transition-colors duration-200 leading-snug">
        {media.title}
      </p>
    </div>
  );

  if (!released) return <span>{inner}</span>;
  return (
    <Link
      to={url}
      tabIndex={-1}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A843] rounded-xl"
    >
      {inner}
    </Link>
  );
}
