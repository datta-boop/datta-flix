import classNames from "classnames";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { mediaItemToId } from "@/backend/metadata/tmdb";
import { DotList } from "@/components/text/DotList";
import { Flare } from "@/components/utils/Flare";
import { PirateTooltip } from "@/components/utils/PirateTooltip";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { MediaItem } from "@/utils/mediaTypes";

import { MediaBookmarkButton } from "./MediaBookmark";
import { IconPatch } from "../buttons/IconPatch";
import { Icons } from "../Icon";

export interface MediaCardProps {
  media: MediaItem;
  linkable?: boolean;
  series?: {
    episode: number;
    season?: number;
    episodeId: string;
    seasonId: string;
  };
  percentage?: number;
  closable?: boolean;
  onClose?: () => void;
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

function MediaCardContent({
  media,
  linkable,
  series,
  percentage,
  closable,
  onClose,
}: MediaCardProps) {
  const { t } = useTranslation();
  const percentageString = `${Math.round(percentage ?? 0).toFixed(0)}%`;
  const isReleased = useCallback(() => checkReleased(media), [media]);
  const canLink = linkable && !closable && isReleased();
  const { isMobile } = useIsMobile();
  const [searchQuery] = useSearchQuery();

  const dotListContent = [t(`media.types.${media.type}`)];
  if (media.year) dotListContent.push(media.year.toFixed());
  if (!isReleased()) dotListContent.push(t("media.unreleased"));

  const typeLabel = media.type === "movie" ? "Epic Voyage" : "Seafarer's Tale";

  return (
    <Flare.Base
      className={classNames(
        "group -m-[0.705em] rounded-2xl bg-background-main transition-all duration-300 focus:relative focus:z-10",
        canLink
          ? "hover:bg-mediaCard-hoverBackground tabbable cursor-pointer"
          : "",
      )}
      tabIndex={canLink ? 0 : -1}
      onKeyUp={(e) => e.key === "Enter" && e.currentTarget.click()}
    >
      <Flare.Light
        flareSize={280}
        cssColorVar="--colors-mediaCard-hoverAccent"
        backgroundClass="bg-mediaCard-hoverBackground duration-100"
        className={classNames({
          "rounded-2xl bg-background-main group-hover:opacity-100": canLink,
        })}
      />
      <Flare.Child
        className={classNames(
          "pointer-events-auto relative mb-2 p-[0.4em] transition-transform duration-300",
          canLink ? "group-hover:scale-[0.97]" : "opacity-60",
        )}
      >
        {/* Poster container */}
        <div
          className={classNames(
            "relative mb-3 pb-[150%] w-full overflow-hidden rounded-xl bg-mediaCard-hoverBackground bg-cover bg-center",
            "transition-all duration-300",
            canLink
              ? "group-hover:rounded-lg group-hover:shadow-xl group-hover:shadow-black/50"
              : "",
          )}
          style={{
            backgroundImage: media.poster ? `url(${media.poster})` : undefined,
          }}
        >
          {/* Glow overlay on hover */}
          {canLink && (
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300" />
          )}

          {/* Episode badge */}
          {series ? (
            <div className="absolute right-2 top-2 rounded-lg bg-black/70 backdrop-blur-sm px-2 py-1 border border-white/10">
              <p className="text-center text-xs font-bold text-white">
                {t("media.episodeDisplay", {
                  season: series.season || 1,
                  episode: series.episode,
                })}
              </p>
            </div>
          ) : null}

          {/* Type badge */}
          <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm border border-[#F5C518]/30 px-2 py-0.5 text-[10px] font-semibold text-[#F5C518]">
              ⚓ {typeLabel}
            </span>
          </div>

          {/* Progress bar */}
          {percentage !== undefined ? (
            <>
              <div
                className={classNames(
                  "absolute inset-x-0 -bottom-px pb-1 h-14 bg-gradient-to-t from-mediaCard-shadow to-transparent transition-colors",
                  canLink ? "group-hover:from-mediaCard-hoverShadow" : "",
                )}
              />
              <div
                className={classNames(
                  "absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-mediaCard-shadow to-transparent transition-colors",
                  canLink ? "group-hover:from-mediaCard-hoverShadow" : "",
                )}
              />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="relative h-1 overflow-hidden rounded-full bg-mediaCard-barColor">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-mediaCard-barFillColor transition-all duration-300"
                    style={{ width: percentageString }}
                  />
                </div>
              </div>
            </>
          ) : null}

          {/* Bookmark button */}
          <div
            className={classNames("absolute", {
              "bookmark-button": !isMobile,
            })}
            onClick={(e) => e.preventDefault()}
          >
            <MediaBookmarkButton media={media} />
          </div>

          {searchQuery.length > 0 ? (
            <div className="absolute" onClick={(e) => e.preventDefault()}>
              <MediaBookmarkButton media={media} />
            </div>
          ) : null}

          {/* Play overlay on hover */}
          {canLink && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Close button */}
          <div
            className={classNames(
              "absolute inset-0 flex items-center justify-center bg-mediaCard-badge bg-opacity-80 transition-opacity duration-500",
              closable ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <IconPatch
              clickable
              className="text-2xl text-mediaCard-badgeText transition-transform hover:scale-110 duration-500"
              onClick={() => closable && onClose?.()}
              icon={Icons.X}
            />
          </div>
        </div>

        {/* Metadata */}
        <PirateTooltip
          pirateLabel={media.title}
          englishLabel={media.title}
          side="bottom"
          className="w-full"
        >
          <h1 className="mb-1 line-clamp-2 max-h-[3rem] text-ellipsis break-words font-semibold text-white text-sm leading-snug">
            {media.title}
          </h1>
        </PirateTooltip>
        <DotList
          className="text-xs text-type-dimmed"
          content={dotListContent}
        />
      </Flare.Child>
    </Flare.Base>
  );
}

export function MediaCard(props: MediaCardProps) {
  const content = <MediaCardContent {...props} />;
  const isReleased = useCallback(
    () => checkReleased(props.media),
    [props.media],
  );
  const canLink = props.linkable && !props.closable && isReleased();

  let link = canLink
    ? `/media/${encodeURIComponent(mediaItemToId(props.media))}`
    : "#";
  if (canLink && props.series) {
    if (props.series.season === 0 && !props.series.episodeId) {
      link += `/${encodeURIComponent(props.series.seasonId)}`;
    } else {
      link += `/${encodeURIComponent(props.series.seasonId)}/${encodeURIComponent(props.series.episodeId)}`;
    }
  }

  if (!canLink) return <span>{content}</span>;
  return (
    <Link
      to={link}
      tabIndex={-1}
      className={classNames(
        "tabbable",
        props.closable ? "hover:cursor-default" : "",
      )}
    >
      {content}
    </Link>
  );
}
