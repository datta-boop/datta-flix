// Clean white streaming palette
const tokens = {
  black: "#000000",
  white: "#FFFFFF",

  semantic: {
    red: {
      c100: "#E8836A",
      c200: "#D4664F",
      c300: "#C25544",
      c400: "#A34035",
    },
    green: {
      c100: "#4CAF50",
      c200: "#43A047",
      c300: "#388E3C",
      c400: "#2E7D32",
    },
    silver: {
      c100: "#E0E0E0",
      c200: "#BDBDBD",
      c300: "#9E9E9E",
      c400: "#757575",
    },
    yellow: {
      c100: "#FFF9C4",
      c200: "#FFF176",
      c300: "#F9A825",
      c400: "#F57F17",
    },
    rose: {
      c100: "#EF9A9A",
      c200: "#E57373",
      c300: "#EF5350",
      c400: "#E53935",
    },
  },

  // Neutral grays — light surfaces
  surface: {
    c25: "#9E9E9E",
    c50: "#858585",
    c100: "#707070",
    c200: "#D6D6D6",
    c300: "#E0E0E0",
    c400: "#EBEBEB",
    c500: "#F0F0F0",
    c600: "#F5F5F5",
    c700: "#F9F9F9",
    c800: "#FFFFFF",
    c900: "#FFFFFF",
  },

  // Dark text tones — reversed from Van Gogh warm
  ink: {
    c50: "#0A0A0A",
    c100: "#111111",
    c200: "#1F1F1F",
    c300: "#333333",
    c400: "#555555",
    c500: "#777777",
    c600: "#999999",
    c700: "#BBBBBB",
    c800: "#DDDDDD",
    c900: "#F0F0F0",
  },

  // Accent — deep charcoal for interactive elements
  accent: {
    c50: "#E8E8E8",
    c100: "#C0C0C0",
    c200: "#808080",
    c300: "#404040",
    c400: "#1A1A1A",
    c500: "#111111",
    c600: "#0A0A0A",
    c700: "#050505",
    c800: "#020202",
    c900: "#000000",
  },
};

export const defaultTheme = {
  extend: {
    colors: {
      themePreview: {
        primary: tokens.accent.c500,
        secondary: tokens.ink.c300,
        ghost: tokens.surface.c600,
      },

      pill: {
        background: tokens.surface.c400,
        backgroundHover: tokens.surface.c300,
        highlight: tokens.accent.c500,
        activeBackground: tokens.surface.c300,
      },

      global: {
        accentA: tokens.accent.c500,
        accentB: tokens.ink.c300,
      },

      lightBar: {
        light: tokens.accent.c400,
      },

      buttons: {
        toggle: tokens.ink.c300,
        toggleDisabled: tokens.surface.c400,
        danger: tokens.semantic.rose.c300,
        dangerHover: tokens.semantic.rose.c200,
        secondary: tokens.surface.c500,
        secondaryText: tokens.ink.c300,
        secondaryHover: tokens.surface.c400,
        primary: tokens.accent.c500,
        primaryText: tokens.white,
        primaryHover: tokens.accent.c400,
        purple: tokens.ink.c300,
        purpleHover: tokens.ink.c200,
        cancel: tokens.surface.c400,
        cancelHover: tokens.surface.c300,
      },

      background: {
        main: tokens.surface.c800,
        secondary: tokens.surface.c700,
        secondaryHover: tokens.surface.c600,
        accentA: tokens.surface.c500,
        accentB: tokens.surface.c600,
      },

      modal: {
        background: tokens.surface.c700,
      },

      type: {
        logo: tokens.accent.c500,
        emphasis: tokens.ink.c50,
        text: tokens.ink.c200,
        dimmed: tokens.ink.c500,
        divider: tokens.surface.c300,
        secondary: tokens.surface.c50,
        danger: tokens.semantic.red.c200,
        success: tokens.semantic.green.c200,
        link: tokens.accent.c400,
        linkHover: tokens.accent.c300,
      },

      search: {
        background: tokens.surface.c600,
        hoverBackground: tokens.surface.c500,
        focused: tokens.surface.c400,
        placeholder: tokens.ink.c600,
        icon: tokens.ink.c600,
        text: tokens.ink.c100,
      },

      mediaCard: {
        hoverBackground: tokens.surface.c600,
        hoverAccent: tokens.accent.c500,
        hoverShadow: tokens.surface.c300,
        shadow: tokens.surface.c400,
        barColor: tokens.surface.c300,
        barFillColor: tokens.accent.c500,
        badge: tokens.surface.c500,
        badgeText: tokens.ink.c400,
      },

      largeCard: {
        background: tokens.surface.c600,
        icon: tokens.ink.c400,
      },

      dropdown: {
        background: tokens.surface.c700,
        altBackground: tokens.white,
        hoverBackground: tokens.surface.c600,
        highlight: tokens.accent.c500,
        highlightHover: tokens.accent.c400,
        text: tokens.ink.c200,
        secondary: tokens.ink.c500,
        border: tokens.surface.c300,
        contentBackground: tokens.surface.c500,
      },

      authentication: {
        border: tokens.surface.c300,
        inputBg: tokens.surface.c600,
        inputBgHover: tokens.surface.c500,
        wordBackground: tokens.surface.c500,
        copyText: tokens.ink.c400,
        copyTextHover: tokens.ink.c200,
        errorText: tokens.semantic.rose.c300,
      },

      settings: {
        sidebar: {
          activeLink: tokens.surface.c600,
          badge: tokens.surface.c400,
          type: {
            secondary: tokens.ink.c600,
            inactive: tokens.ink.c500,
            icon: tokens.ink.c500,
            iconActivated: tokens.accent.c500,
            activated: tokens.accent.c400,
          },
        },
        card: {
          border: tokens.surface.c300,
          background: tokens.surface.c600,
          altBackground: tokens.surface.c500,
        },
        saveBar: {
          background: tokens.surface.c700,
        },
      },

      utils: {
        divider: tokens.surface.c300,
      },

      onboarding: {
        bar: tokens.surface.c400,
        barFilled: tokens.accent.c500,
        divider: tokens.surface.c300,
        card: tokens.surface.c700,
        cardHover: tokens.surface.c600,
        border: tokens.surface.c400,
        good: tokens.accent.c400,
        best: tokens.ink.c100,
        link: tokens.accent.c400,
      },

      errors: {
        card: tokens.surface.c700,
        border: tokens.surface.c300,
        type: {
          secondary: tokens.ink.c500,
        },
      },

      about: {
        circle: tokens.surface.c400,
        circleText: tokens.ink.c400,
      },

      editBadge: {
        bg: tokens.surface.c400,
        bgHover: tokens.surface.c300,
        text: tokens.ink.c400,
      },

      progress: {
        background: tokens.surface.c300,
        preloaded: tokens.surface.c300,
        filled: tokens.accent.c500,
      },

      video: {
        buttonBackground: tokens.surface.c400,
        autoPlay: {
          background: tokens.surface.c600,
          hover: tokens.surface.c400,
        },
        scraping: {
          card: tokens.surface.c600,
          error: tokens.semantic.red.c200,
          success: tokens.semantic.green.c200,
          loading: tokens.accent.c500,
          noresult: tokens.ink.c500,
        },
        audio: {
          set: tokens.accent.c500,
        },
        context: {
          background: tokens.white,
          light: tokens.ink.c200,
          border: tokens.surface.c300,
          hoverColor: tokens.surface.c500,
          buttonFocus: tokens.surface.c400,
          flagBg: tokens.surface.c400,
          inputBg: tokens.surface.c500,
          buttonOverInputHover: tokens.surface.c400,
          inputPlaceholder: tokens.ink.c600,
          cardBorder: tokens.surface.c300,
          slider: tokens.ink.c400,
          sliderFilled: tokens.accent.c500,
          error: tokens.semantic.red.c200,
          buttons: {
            list: tokens.surface.c500,
            active: tokens.surface.c300,
          },
          closeHover: tokens.surface.c400,
          type: {
            main: tokens.ink.c300,
            secondary: tokens.ink.c500,
            accent: tokens.accent.c500,
          },
        },
      },
    },
  },
};
