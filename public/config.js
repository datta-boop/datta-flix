window.__CONFIG__ = {
  // CORS proxy: points to the Vercel Edge Function bundled with this deployment.
  // Uses window.location.origin so it works on any domain without hardcoding.
  VITE_CORS_PROXY_URL: window.location.origin + "/api/proxy",

  // TMDB Read Access Token (public, read-only)
  VITE_TMDB_READ_API_KEY:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTZhNWM5ZDc3MDFkMGM1NDE2OWExNmRlODlhYzdmZSIsIm5iZiI6MTY3MDU2OTA0MS45NDgsInN1YiI6IjYzOTJkYzUxZjA0ZDAxMDA3ZTA3MjU5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RO5QI4FRxpl7H3EoT-LKX2O-NS_79Xg9ByWGAt3tiiw",

  // Backend sync server (null = disabled, users can add their own)
  VITE_BACKEND_URL: null,

  // DMCA contact email (null = hide footer link)
  VITE_DMCA_EMAIL: null,

  // Use history-mode routing (required for Vercel SPA rewrites)
  VITE_NORMAL_ROUTER: true,

  // Comma-separated list of DMCA-blocked media IDs, e.g. "movie-12345,series-67890"
  VITE_DISALLOWED_IDS: "",
};
