// Van Gogh–inspired pastel palette
// Deep indigo skies, warm gold stars, parchment cream text
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
      c100: "#7AB888",
      c200: "#5EA070",
      c300: "#4A8A5C",
      c400: "#35704A",
    },
    silver: {
      c100: "#D8D0C8",
      c200: "#BEB4A8",
      c300: "#A09690",
      c400: "#786E68",
    },
    yellow: {
      c100: "#F5E090",
      c200: "#EAC855",
      c300: "#D4A843",
      c400: "#B88830",
    },
    rose: {
      c100: "#D4607A",
      c200: "#8A3A50",
      c300: "#783444",
      c400: "#642838",
    },
  },

  // Starry Night indigo sky
  indigo: {
    c50: "#9BA8D0",
    c100: "#7A8AB8",
    c200: "#5D6FA0",
    c300: "#435488",
    c400: "#2E3D78",
    c500: "#1E2D5A",
    c600: "#18244A",
    c700: "#141D3C",
    c800: "#0F152C",
    c900: "#0A0E1E",
  },

  // Van Gogh gold — stars & sunflowers
  gold: {
    c50: "#F5E8A0",
    c100: "#EAD080",
    c200: "#E0B860",
    c300: "#D4A843",
    c400: "#C09030",
    c500: "#A87820",
    c600: "#8C6015",
    c700: "#70480C",
    c800: "#543404",
    c900: "#3A2200",
  },

  // Warm parchment — aged canvas text tones
  warm: {
    c50: "#F5EDD8",
    c100: "#EDE4CC",
    c200: "#DDD4B8",
    c300: "#CDBE9C",
    c400: "#B8A880",
    c500: "#9A8C64",
    c600: "#7C7048",
    c700: "#5C5030",
    c800: "#3C341C",
    c900: "#201A08",
  },

  // Soft lavender — blossoms
  lavender: {
    c50: "#D5CAEC",
    c100: "#C0B0DC",
    c200: "#A894CC",
    c300: "#907AC0",
    c400: "#7860A8",
    c500: "#604890",
    c600: "#4A3478",
    c700: "#382460",
    c800: "#281848",
    c900: "#1A0C30",
  },

  // Deep surface — night sky backgrounds
  surface: {
    c25: "#4A5880",
    c50: "#3C4870",
    c100: "#303C60",
    c200: "#263050",
    c300: "#1E2848",
    c400: "#192040",
    c500: "#141A34",
    c600: "#10142C",
    c700: "#0D1024",
    c800: "#090D1C",
    c900: "#060810",
  },
};

export const defaultTheme = {
  extend: {
    colors: {
      themePreview: {
        primary: tokens.gold.c300,
        secondary: tokens.indigo.c200,
        ghost: tokens.warm.c50,
      },

      pill: {
        background: tokens.surface.c300,
        backgroundHover: tokens.surface.c200,
        highlight: tokens.gold.c300,
        activeBackground: tokens.surface.c200,
      },

      global: {
        accentA: tokens.gold.c300,
        accentB: tokens.indigo.c200,
      },

      lightBar: {
        light: tokens.gold.c400,
      },

      buttons: {
        toggle: tokens.lavender.c300,
        toggleDisabled: tokens.surface.c300,
        danger: tokens.semantic.rose.c300,
        dangerHover: tokens.semantic.rose.c200,
        secondary: tokens.surface.c600,
        secondaryText: tokens.warm.c300,
        secondaryHover: tokens.surface.c500,
        primary: tokens.warm.c50,
        primaryText: tokens.surface.c900,
        primaryHover: tokens.warm.c100,
        purple: tokens.lavender.c400,
        purpleHover: tokens.lavender.c300,
        cancel: tokens.surface.c400,
        cancelHover: tokens.surface.c200,
      },

      background: {
        main: tokens.surface.c800,
        secondary: tokens.surface.c600,
        secondaryHover: tokens.surface.c400,
        accentA: tokens.lavender.c500,
        accentB: tokens.indigo.c500,
      },

      modal: {
        background: tokens.surface.c700,
      },

      type: {
        logo: tokens.gold.c300,
        emphasis: tokens.warm.c50,
        text: tokens.warm.c100,
        dimmed: tokens.warm.c500,
        divider: tokens.surface.c200,
        secondary: tokens.surface.c50,
        danger: tokens.semantic.red.c100,
        success: tokens.semantic.green.c100,
        link: tokens.gold.c200,
        linkHover: tokens.gold.c100,
      },

      search: {
        background: tokens.surface.c500,
        hoverBackground: tokens.surface.c600,
        focused: tokens.surface.c400,
        placeholder: tokens.surface.c50,
        icon: tokens.surface.c50,
        text: tokens.warm.c50,
      },

      mediaCard: {
        hoverBackground: tokens.surface.c500,
        hoverAccent: tokens.gold.c300,
        hoverShadow: tokens.surface.c800,
        shadow: tokens.surface.c700,
        barColor: tokens.surface.c200,
        barFillColor: tokens.gold.c300,
        badge: tokens.surface.c600,
        badgeText: tokens.warm.c300,
      },

      largeCard: {
        background: tokens.surface.c600,
        icon: tokens.lavender.c300,
      },

      dropdown: {
        background: tokens.surface.c600,
        altBackground: tokens.surface.c700,
        hoverBackground: tokens.surface.c500,
        highlight: tokens.gold.c300,
        highlightHover: tokens.gold.c200,
        text: tokens.warm.c100,
        secondary: tokens.warm.c500,
        border: tokens.surface.c400,
        contentBackground: tokens.surface.c500,
      },

      authentication: {
        border: tokens.surface.c300,
        inputBg: tokens.surface.c600,
        inputBgHover: tokens.surface.c500,
        wordBackground: tokens.surface.c500,
        copyText: tokens.warm.c400,
        copyTextHover: tokens.warm.c200,
        errorText: tokens.semantic.rose.c100,
      },

      settings: {
        sidebar: {
          activeLink: tokens.surface.c600,
          badge: tokens.surface.c800,
          type: {
            secondary: tokens.surface.c100,
            inactive: tokens.warm.c400,
            icon: tokens.warm.c400,
            iconActivated: tokens.gold.c300,
            activated: tokens.gold.c100,
          },
        },
        card: {
          border: tokens.surface.c400,
          background: tokens.surface.c400,
          altBackground: tokens.surface.c400,
        },
        saveBar: {
          background: tokens.surface.c700,
        },
      },

      utils: {
        divider: tokens.surface.c200,
      },

      onboarding: {
        bar: tokens.surface.c400,
        barFilled: tokens.gold.c300,
        divider: tokens.surface.c200,
        card: tokens.surface.c700,
        cardHover: tokens.surface.c600,
        border: tokens.surface.c500,
        good: tokens.gold.c200,
        best: tokens.warm.c100,
        link: tokens.gold.c200,
      },

      errors: {
        card: tokens.surface.c700,
        border: tokens.surface.c300,
        type: {
          secondary: tokens.warm.c400,
        },
      },

      about: {
        circle: tokens.surface.c400,
        circleText: tokens.warm.c300,
      },

      editBadge: {
        bg: tokens.surface.c400,
        bgHover: tokens.surface.c300,
        text: tokens.warm.c300,
      },

      progress: {
        background: tokens.surface.c100,
        preloaded: tokens.surface.c100,
        filled: tokens.gold.c300,
      },

      video: {
        buttonBackground: tokens.surface.c200,
        autoPlay: {
          background: tokens.surface.c600,
          hover: tokens.surface.c400,
        },
        scraping: {
          card: tokens.surface.c600,
          error: tokens.semantic.red.c200,
          success: tokens.semantic.green.c200,
          loading: tokens.gold.c300,
          noresult: tokens.warm.c400,
        },
        audio: {
          set: tokens.gold.c300,
        },
        context: {
          background: tokens.surface.c800,
          light: tokens.warm.c100,
          border: tokens.surface.c500,
          hoverColor: tokens.surface.c500,
          buttonFocus: tokens.surface.c400,
          flagBg: tokens.surface.c400,
          inputBg: tokens.surface.c500,
          buttonOverInputHover: tokens.surface.c400,
          inputPlaceholder: tokens.warm.c500,
          cardBorder: tokens.surface.c600,
          slider: tokens.warm.c300,
          sliderFilled: tokens.gold.c300,
          error: tokens.semantic.red.c200,
          buttons: {
            list: tokens.surface.c600,
            active: tokens.surface.c800,
          },
          closeHover: tokens.surface.c700,
          type: {
            main: tokens.warm.c300,
            secondary: tokens.warm.c500,
            accent: tokens.gold.c300,
          },
        },
      },
    },
  },
};
