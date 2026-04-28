import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { SearchBarInput } from "@/components/form/SearchBar";
import { ContentRail, RailCardSkeleton } from "@/components/layout/ContentRail";
import { HeroSection } from "@/components/layout/HeroSection";
import { WideContainer } from "@/components/layout/WideContainer";
import { RailCard } from "@/components/media/RailCard";
import { useSlashFocus } from "@/components/player/hooks/useSlashFocus";
import { PirateTooltip } from "@/components/utils/PirateTooltip";
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

function StickySearch({
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
      <PirateTooltip
        pirateLabel="Chart Yer Course"
        englishLabel="Search for movies, shows, anime..."
        side="bottom"
        className="w-full"
      >
        <SearchBarInput
          ref={inputRef}
          onChange={onChange}
          value={value}
          onUnFocus={onUnFocus}
          placeholder={placeholder}
        />
      </PirateTooltip>
    </div>
  );
}

function EmptyState({ onDiscover }: { onDiscover: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Pirate compass illustration */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-background-secondary text-4xl ring-1 ring-white/10">
        🧭
      </div>
      <PirateTooltip
        pirateLabel="Yer chart be empty, matey!"
        englishLabel="You haven't saved anything yet"
        side="bottom"
      >
        <p className="mb-2 text-xl font-bold text-white cursor-default">
          Yer chart be empty, matey!
        </p>
      </PirateTooltip>
      <p className="mb-8 text-sm text-type-dimmed max-w-xs">
        Search fer content above, or discover what be sailin&apos; the seven
        streams below.
      </p>
      <button
        type="button"
        onClick={onDiscover}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <span>⚓</span>
        Set Course to Discover
      </button>
    </div>
  );
}

export function HomePage() {
  const { t: randomT } = useRandomTranslation();
  const navigate = useNavigate();
  const [showBg, setShowBg] = useState(false);
  const searchParams = useSearchQuery();
  const [search, setSearch, setSearchUnFocus] = searchParams;
  const searchState = useSearch(search);

  const [showBookmarks, setShowBookmarks] = useState(false);
  // Note: WatchingPart is not shown on home (items appear in the Continue Watching rail)

  // Content data
  const { items: trending, loading: trendingLoading } = useTrendingContent();
  const { items: movies, loading: moviesLoading } = usePopularMovies();
  const { items: shows, loading: showsLoading } = usePopularShows();
  const { items: anime, loading: animeLoading } = useAnimeContent();

  // Progress items for "Continue Watching" rail
  const progressItems = useProgressStore((store) => store.items);
  const bookmarks = useBookmarkStore((store) => store.bookmarks);
  const continueWatching = Object.entries(progressItems)
    .filter((entry) => shouldShowProgress(entry[1]).show)
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
    .slice(0, 20)
    .map(([id, v]) => ({ id, ...v }))
    .filter((v) => !bookmarks[v.id]);

  const placeholder =
    randomT("home.search.placeholder") ?? "Chart yer course...";

  const handleDiscover = () => {
    window.scrollTo(0, 0);
    navigate("/discover");
  };

  // Scroll handler for nav bg
  useEffect(() => {
    const handler = () => setShowBg(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <HomeLayout showBg={showBg}>
      <Helmet>
        <style>{`html, body { scrollbar-gutter: stable; }`}</style>
        <title>Datta-Flix — Sail the Seven Streams</title>
      </Helmet>

      {/* ── Hero area ── */}
      {!searchState.searching && (
        <div className="relative">
          {/* Cinematic hero banner */}
          <WideContainer>
            <div className="pt-24 sm:pt-28 pb-6">
              <HeroSection items={trending} loading={trendingLoading} />
            </div>
          </WideContainer>

          {/* Search bar floats over the bottom of hero */}
          <div className="pb-8">
            <StickySearch
              value={search}
              onChange={setSearch}
              onUnFocus={setSearchUnFocus}
              placeholder={placeholder}
            />
          </div>
        </div>
      )}

      {/* ── Search mode ── */}
      {searchState.searching && (
        <div className="pt-32 pb-8">
          <StickySearch
            value={search}
            onChange={setSearch}
            onUnFocus={setSearchUnFocus}
            placeholder={placeholder}
          />
        </div>
      )}

      {/* ── Content ── */}
      <WideContainer>
        {searchState.loading ? (
          <SearchLoadingPart />
        ) : searchState.searching ? (
          <SearchListPart searchQuery={search} />
        ) : (
          <div className="flex flex-col gap-12 pb-16">
            {/* Continue Watching */}
            {continueWatching.length > 0 && (
              <ContentRail
                title="Resume Yer Voyage"
                titleEnglish="Continue Watching"
                icon="🎬"
              >
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
            {showBookmarks && (
              <div className="sr-only" aria-live="polite">
                Showing yer treasure chest
              </div>
            )}

            {/* Trending — all */}
            <ContentRail
              title="Sailed by Many"
              titleEnglish="Trending This Week"
              icon="🌊"
            >
              {trendingLoading
                ? Array.from({ length: 10 }, (_, i) => `trending-sk-${i}`).map(
                    (k) => <RailCardSkeleton key={k} />,
                  )
                : trending.map((item) => (
                    <RailCard key={item.id} media={item} />
                  ))}
            </ContentRail>

            {/* Top Movies */}
            <ContentRail
              title="Epic Voyages"
              titleEnglish="Top Movies"
              icon="🎥"
            >
              {moviesLoading
                ? Array.from({ length: 10 }, (_, i) => `movie-sk-${i}`).map(
                    (k) => <RailCardSkeleton key={k} />,
                  )
                : movies.map((item) => <RailCard key={item.id} media={item} />)}
            </ContentRail>

            {/* Top TV Shows */}
            <ContentRail
              title="Seafarers' Tales"
              titleEnglish="Top TV Shows"
              icon="📺"
            >
              {showsLoading
                ? Array.from({ length: 10 }, (_, i) => `show-sk-${i}`).map(
                    (k) => <RailCardSkeleton key={k} />,
                  )
                : shows.map((item) => <RailCard key={item.id} media={item} />)}
            </ContentRail>

            {/* Anime */}
            <ContentRail
              title="Eastern Scrolls"
              titleEnglish="Top Anime"
              icon="⛩️"
            >
              {animeLoading
                ? Array.from({ length: 10 }, (_, i) => `anime-sk-${i}`).map(
                    (k) => <RailCardSkeleton key={k} />,
                  )
                : anime.map((item) => <RailCard key={item.id} media={item} />)}
            </ContentRail>

            {/* Empty state — only when no personal data */}
            {!showBookmarks && continueWatching.length === 0 && (
              <EmptyState onDiscover={handleDiscover} />
            )}
          </div>
        )}
      </WideContainer>
    </HomeLayout>
  );
}
