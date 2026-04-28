import { useEffect, useState } from "react";

import {
  formatTMDBMetaToMediaItem,
  formatTMDBSearchResult,
  get,
} from "@/backend/metadata/tmdb";
import { TMDBContentTypes } from "@/backend/metadata/types/tmdb";
import { MediaItem } from "@/utils/mediaTypes";

interface TMDBTrendingResult {
  results: Array<{
    id: number;
    title?: string;
    name?: string;
    media_type: TMDBContentTypes;
    poster_path?: string;
    backdrop_path?: string;
    overview?: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids?: number[];
  }>;
}

export interface TrendingItem extends MediaItem {
  backdropPath?: string;
  overview?: string;
  rating?: number;
}

function formatToTrendingItem(
  raw: TMDBTrendingResult["results"][0],
): TrendingItem | null {
  try {
    const formatted = formatTMDBSearchResult(raw as any, raw.media_type);
    const item = formatTMDBMetaToMediaItem(formatted);
    return {
      ...item,
      backdropPath: raw.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280/${raw.backdrop_path}`
        : undefined,
      overview: raw.overview,
      rating: raw.vote_average,
    };
  } catch {
    return null;
  }
}

export function useTrendingContent() {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await get<TMDBTrendingResult>("trending/all/week", {
          language: "en-US",
        });
        if (cancelled) return;
        const formatted = data.results
          .filter(
            (r) =>
              r.media_type === TMDBContentTypes.MOVIE ||
              r.media_type === TMDBContentTypes.TV,
          )
          .map(formatToTrendingItem)
          .filter((x): x is TrendingItem => x !== null && !!x.poster);
        setItems(formatted);
      } catch {
        // silently fail — hero will just not render
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}

export function usePopularMovies() {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await get<TMDBTrendingResult>("trending/movie/week", {
          language: "en-US",
        });
        if (cancelled) return;
        const formatted = data.results
          .map(formatToTrendingItem)
          .filter((x): x is TrendingItem => x !== null && !!x.poster);
        setItems(formatted);
      } catch (_err) {
        // silently fail — rail shows skeletons indefinitely
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}

export function usePopularShows() {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await get<TMDBTrendingResult>("trending/tv/week", {
          language: "en-US",
        });
        if (cancelled) return;
        const formatted = data.results
          .map(formatToTrendingItem)
          .filter((x): x is TrendingItem => x !== null && !!x.poster);
        setItems(formatted);
      } catch (_err) {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}

export function useAnimeContent() {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Anime genre ID on TMDB is 16 (Animation) with Japanese origin
        const data = await get<TMDBTrendingResult>("discover/tv", {
          language: "en-US",
          with_genres: "16",
          with_origin_country: "JP",
          sort_by: "popularity.desc",
          page: "1",
        });
        if (cancelled) return;
        const formatted = (data.results ?? [])
          .map((r) =>
            formatToTrendingItem({ ...r, media_type: TMDBContentTypes.TV }),
          )
          .filter((x): x is TrendingItem => x !== null && !!x.poster);
        setItems(formatted);
      } catch (_err) {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}
