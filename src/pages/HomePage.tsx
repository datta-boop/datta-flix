import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { To, useNavigate } from "react-router-dom";

import { SearchBarInput } from "@/components/form/SearchBar";
import { ContentRail, RailCardSkeleton } from "@/components/layout/ContentRail";
import { HeroSection } from "@/components/layout/HeroSection";
import { WideContainer } from "@/components/layout/WideContainer";
import { RailCard } from "@/components/media/RailCard";
import { useSlashFocus } from "@/components/player/hooks/useSlashFocus";
import { useDebounce } from "@/hooks/useDebounce";
import { useRandomTranslation } from "@/hooks/useRandomTranslation";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import {
  useAnimeContent,
  usePopularMovies,
  usePopularShows,
  useTrendingContent,
} from "@/hooks/useTMDBContent";
import { HomeLayout } from "@/pages/layouts/HomeLayout";
import { BookmarksPart } from "@/pages/parts/home/BookmarksPart";
import { SearchListPart } from "@/pages/parts/search/SearchListPart";
import { SearchLoadingPart } from "@/pages/parts/search/SearchLoadingPart";
import { useBookmarkStore } from "@/stores/bookmarks";
import { useProgressStore } from "@/stores/progress";
import { shouldShowProgress } from "@/stores/progress/utils";

function useSearch(search: string) {
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce<string>(search, 500);
  useEffect(() => {
    setSearching(search !== "");
    setLoading(search !== "");
  }, [search]);
  useEffect(() => {
    setLoading(false);
  }, [debouncedSearch]);
  return { loading, searching };
}

function SearchBar({
  value,
  onChange,
  onUnFocus,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onUnFocus: (v?: string) => void;
  placeholder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useSlashFocus(inputRef);
  return (
    <div className="relative z-30 mx-auto w-full max-w-2xl px-4">
      <SearchBarInput
        ref={inputRef}
        onChange={onChange}
        value={value}
        onUnFocus={onUnFocus}
        placeholder={placeholder}
      />
    </div>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const { t: randomT } = useRandomTranslation();
  const navigate = useNavigate();
  const [showBg, setShowBg] = useState(false);
  const searchParams = useSearchQuery();
  const [search, setSearch, setSearchUnFocus] = searchParams;
  const searchState = useSearch(search);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const { items: trending, loading: trendingLoading } = useTrendingContent();
  const { items: movies, loading: moviesLoading } = usePopularMovies();
  const { items: shows, loading: showsLoading } = usePopularShows();
  const { items: anime, loading: animeLoading } = useAnimeContent();

  const progressItems = useProgressStore((store) => store.items);
  const bookmarks = useBookmarkStore((store) => store.bookmarks);
  const continueWatching = Object.entries(progressItems)
    .filter((entry) => shouldShowProgress(entry[1]).show)
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
    .slice(0, 20)
    .map(([id, v]) => ({ id, ...v }))
    .filter((v) => !bookmarks[v.id]);

  const placeholder =
    randomT("home.search.placeholder") ?? "Search for movies and shows...";

  const handleClick = (path: To) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  useEffect(() => {
    const handler = () => setShowBg(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <HomeLayout showBg={showBg}>
      <Helmet>
        <style>{`html, body { scrollbar-gutter: stable; }`}</style>
        <title>{t("global.name")}</title>
      </Helmet>

      {/* Hero + search when not searching */}
      {!searchState.searching && (
        <div className="relative">
          <WideContainer>
            <div className="pt-24 sm:pt-28 pb-6">
              <HeroSection items={trending} loading={trendingLoading} />
            </div>
          </WideContainer>
          <div className="pb-8">
            <SearchBar
              value={search}
              onChange={setSearch}
              onUnFocus={setSearchUnFocus}
              placeholder={placeholder}
            />
          </div>
        </div>
      )}

      {/* Search bar only when searching */}
      {searchState.searching && (
        <div className="pt-32 pb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            onUnFocus={setSearchUnFocus}
            placeholder={placeholder}
          />
        </div>
      )}

      {/* Content */}
      <WideContainer>
        {searchState.loading ? (
          <SearchLoadingPart />
        ) : searchState.searching ? (
          <SearchListPart searchQuery={search} />
        ) : (
          <div className="flex flex-col gap-12 pb-16">
            {/* Continue Watching */}
            {continueWatching.length > 0 && (
              <ContentRail title="Continue Watching" icon="▶">
                {continueWatching.map((v) => {
                  const progress = progressItems[v.id];
                  const pct = progress?.progress?.duration
                    ? (progress.progress.watched / progress.progress.duration) *
                      100
                    : undefined;
                  return (
                    <RailCard key={v.id} media={v as any} percentage={pct} />
                  );
                })}
              </ContentRail>
            )}

            {/* Bookmarks */}
            <BookmarksPart onItemsChange={setShowBookmarks} />

            {/* Trending */}
            <ContentRail title="Trending This Week" icon="✦">
              {trendingLoading
                ? Array.from({ length: 10 }, (_, i) => `t-sk-${i}`).map((k) => (
                    <RailCardSkeleton key={k} />
                  ))
                : trending.map((item) => (
                    <RailCard key={item.id} media={item} />
                  ))}
            </ContentRail>

            {/* Top Movies */}
            <ContentRail title="Top Movies" icon="🎬">
              {moviesLoading
                ? Array.from({ length: 10 }, (_, i) => `m-sk-${i}`).map((k) => (
                    <RailCardSkeleton key={k} />
                  ))
                : movies.map((item) => <RailCard key={item.id} media={item} />)}
            </ContentRail>

            {/* Top TV Shows */}
            <ContentRail title="Top TV Shows" icon="📺">
              {showsLoading
                ? Array.from({ length: 10 }, (_, i) => `s-sk-${i}`).map((k) => (
                    <RailCardSkeleton key={k} />
                  ))
                : shows.map((item) => <RailCard key={item.id} media={item} />)}
            </ContentRail>

            {/* Anime */}
            <ContentRail title="Anime" icon="⛩">
              {animeLoading
                ? Array.from({ length: 10 }, (_, i) => `a-sk-${i}`).map((k) => (
                    <RailCardSkeleton key={k} />
                  ))
                : anime.map((item) => <RailCard key={item.id} media={item} />)}
            </ContentRail>

            {/* Empty state */}
            {!showBookmarks && continueWatching.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F0F0F0] ring-1 ring-black/5">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p className="mb-2 text-xl font-bold text-[#111111]">
                  Nothing saved yet
                </p>
                <p className="mb-8 text-sm text-[#777777] max-w-xs">
                  Search for something above, or explore what&apos;s trending.
                </p>
                <button
                  type="button"
                  onClick={() => handleClick("/discover")}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E0E0E0] bg-[#F0F0F0] px-6 py-3 text-sm font-semibold text-[#111111] hover:bg-[#E8E8E8] active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                >
                  Discover Content
                </button>
              </div>
            )}
          </div>
        )}
      </WideContainer>
    </HomeLayout>
  );
}
