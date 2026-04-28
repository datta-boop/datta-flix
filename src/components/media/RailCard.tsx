import classNames from "classnames";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import { mediaItemToId } from "@/backend/metadata/tmdb";
import { PirateTooltip } from "@/components/utils/PirateTooltip";
import { MediaItem } from "@/utils/mediaTypes";

import { MediaBookmarkButton } from "./MediaBookmark";

interface RailCardProps {
  media: MediaItem & {
    backdropPath?: string;
    overview?: string;
    rating?: number;
  };
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
  const isReleased = useCallback(() => checkReleased(media), [media]);
  const canLink = isReleased();

  const link = canLink
    ? `/media/${encodeURIComponent(mediaItemToId(media))}`
    : "#";

  const typeLabel = media.type === "movie" ? "Epic Voyage" : "Seafarer's Tale";

  const card = (
    <div className="group flex-shrink-0 w-36 sm:w-44 cursor-pointer">
      {/* Poster */}
      <div
        className={classNames(
          "relative w-full overflow-hidden rounded-xl bg-background-secondary bg-cover bg-center",
          "aspect-[2/3]",
          "transition-all duration-300",
          canLink
            ? "group-hover:scale-[1.04] group-hover:shadow-2xl group-hover:shadow-black/60 group-hover:ring-1 group-hover:ring-white/20"
            : "opacity-60",
        )}
        style={{
          backgroundImage: media.poster ? `url(${media.poster})` : undefined,
        }}
      >
        {/* Gold glow on hover */}
        {canLink && (
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-[#F5C518]/20" />
        )}

        {/* Type chip */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-sm border border-[#F5C518]/30 px-1.5 py-0.5 text-[9px] font-bold text-[#F5C518]">
            ⚓ {typeLabel}
          </span>
        </div>

        {/* Play button on hover */}
        {canLink && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm border border-white/40">
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Progress bar */}
        {percentage !== undefined && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2">
              <div className="h-0.5 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-[#F5C518] transition-all"
                  style={{ width: `${Math.round(percentage)}%` }}
                />
              </div>
            </div>
          </>
        )}

        {/* Bookmark */}
        <div
          className="absolute top-0 right-0"
          onClick={(e) => e.preventDefault()}
        >
          <MediaBookmarkButton media={media} />
        </div>
      </div>

      {/* Text */}
      <div className="mt-2 px-0.5">
        <PirateTooltip
          pirateLabel={media.title}
          englishLabel={media.title}
          side="bottom"
        >
          <p className="text-xs sm:text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#F5C518] transition-colors duration-200">
            {media.title}
          </p>
        </PirateTooltip>
        {media.year ? (
          <p className="mt-0.5 text-[11px] text-type-dimmed">{media.year}</p>
        ) : null}
      </div>
    </div>
  );

  if (!canLink) return <span>{card}</span>;
  return (
    <Link
      to={link}
      tabIndex={0}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]/60 rounded-xl"
    >
      {card}
    </Link>
  );
}
