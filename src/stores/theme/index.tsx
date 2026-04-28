import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface ThemeStore {
  theme: string | null;
  lightMode: boolean;
  setTheme(v: string | null): void;
  setLightMode(v: boolean): void;
}

const currentDate = new Date();
const is420 = currentDate.getMonth() + 1 === 4 && currentDate.getDate() === 20;

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return true;
  return !window.matchMedia("(prefers-color-scheme: light)").matches;
}

export const useThemeStore = create(
  persist(
    immer<ThemeStore>((set) => ({
      theme: is420 ? "teal" : null,
      lightMode: false,
      setTheme(v) {
        set((s) => {
          s.theme = v;
        });
      },
      setLightMode(v) {
        set((s) => {
          s.lightMode = v;
        });
      },
    })),
    {
      name: "__MW::theme",
      // On first load, if no persisted value, respect system preference
      onRehydrateStorage: () => (state) => {
        if (state && !state.lightMode && !getSystemPrefersDark()) {
          state.lightMode = true;
        }
      },
    },
  ),
);

export interface PreviewThemeStore {
  previewTheme: string | null;
  setPreviewTheme(v: string | null): void;
}

export const usePreviewThemeStore = create(
  immer<PreviewThemeStore>((set) => ({
    previewTheme: null,
    setPreviewTheme(v) {
      set((s) => {
        s.previewTheme = v;
      });
    },
  })),
);

export function ThemeProvider(props: {
  children?: ReactNode;
  applyGlobal?: boolean;
}) {
  const previewTheme = usePreviewThemeStore((s) => s.previewTheme);
  const theme = useThemeStore((s) => s.theme);
  const lightMode = useThemeStore((s) => s.lightMode);
  const setLightMode = useThemeStore((s) => s.setLightMode);

  // Listen for system theme changes when no manual override has been set
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      // Only apply system preference if user hasn't overridden manually
      // We detect "has overridden" by checking localStorage for explicit set
      const stored = localStorage.getItem("__MW::theme");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // If lightMode key is explicitly stored, don't override
          if ("lightMode" in (parsed?.state ?? {})) return;
        } catch (_err) {
          // ignore malformed JSON
        }
      }
      setLightMode(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [setLightMode]);

  // In light mode, always use pirate-light theme
  // In dark mode, use user's chosen theme (or null = default pirate ocean dark)
  const effectiveTheme = lightMode ? "pirate-light" : (previewTheme ?? theme);
  const themeSelector = effectiveTheme ? `theme-${effectiveTheme}` : undefined;

  return (
    <div className={themeSelector}>
      {props.applyGlobal ? (
        <Helmet>
          <body className={themeSelector} />
        </Helmet>
      ) : null}
      {props.children}
    </div>
  );
}
