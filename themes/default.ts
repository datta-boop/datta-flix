const tokens = {
  black: "#000000",
  white: "#FFFFFF",
  semantic: {
    red: {
      c100: "#F46E6E",
      c200: "#E44F4F",
      c300: "#D74747",
      c400: "#B43434",
    },
    green: {
      c100: "#60D26A",
      c200: "#40B44B",
      c300: "#31A33C",
      c400: "#237A2B",
    },
    silver: {
      c100: "#DEDEDE",
      c200: "#B6CAD7",
      c300: "#8EA3B0",
      c400: "#617A8A",
    },
    yellow: {
      c100: "#FFF599",
      c200: "#FCEC61",
      c300: "#D8C947",
      c400: "#AFA349",
    },
    rose: {
      c100: "#DB3D61",
      c200: "#8A293B",
      c300: "#812435",
      c400: "#701B2B",
    },
  },

  // Pirate Ocean palette — deep sea blues for the base UI
  ocean: {
    c50: "#7EC8E3",
    c100: "#50AACF",
    c200: "#2F8AB8",
    c300: "#1A6A9A",
    c400: "#0E507B",
    c500: "#093A5C",
    c600: "#062C47",
    c700: "#041F33",
    c800: "#021422",
    c900: "#010B15",
  },

  // Treasure Gold
  gold: {
    c50: "#FFF0A0",
    c100: "#FFE060",
    c200: "#F5C518",
    c300: "#D4A20F",
    c400: "#A87E0A",
    c500: "#7E5E07",
    c600: "#574205",
    c700: "#3A2C03",
    c800: "#231A01",
    c900: "#120D01",
  },

  // Deep navy — backgrounds, surfaces, cards
  navy: {
    c25: "#5A7AA0",
    c50: "#3A5C80",
    c100: "#2A4464",
    c200: "#1C3050",
    c300: "#12233C",
    c400: "#0D1B2E",
    c500: "#09121F",
    c600: "#060C16",
    c700: "#040810",
    c800: "#02050A",
    c900: "#010304",
  },

  // Rum Red — pirate danger/accent
  rum: {
    c50: "#FF9090",
    c100: "#E05A5A",
    c200: "#C0392B",
    c300: "#A02F24",
    c400: "#80231B",
    c500: "#601812",
    c600: "#45110E",
    c700: "#2E0B09",
    c800: "#1B0605",
    c900: "#0A0303",
  },

  // Legacy tokens kept for sub-theme compatibility
  blue: {
    c50: "#ADADF5",
    c100: "#7979CC",
    c200: "#5D5DAE",
    c300: "#3B3B8C",
    c400: "#2A2A71",
    c500: "#1F1F50",
    c600: "#1B1B41",
    c700: "#171736",
    c800: "#101020",
    c900: "#0B0B13",
  },
  purple: {
    c50: "#D5AAFF",
    c100: "#C082FF",
    c200: "#A359EC",
    c300: "#8D44D6",
    c400: "#7831BF",
    c500: "#572887",
    c600: "#411F64",
    c700: "#31184A",
    c800: "#221134",
    c900: "#160B22",
  },
  ash: {
    c50: "#7F8D9B",
    c100: "#5B6B7B",
    c200: "#445464",
    c300: "#2B3D4E",
    c400: "#203242",
    c500: "#1C2C3C",
    c600: "#172532",
    c700: "#131E29",
    c800: "#101820",
    c900: "#0C1216",
  },
  shade: {
    c25: "#5A7AA0",
    c50: "#3A5C80",
    c100: "#2A4464",
    c200: "#1C3050",
    c300: "#12233C",
    c400: "#0D1B2E",
    c500: "#09121F",
    c600: "#060C16",
    c700: "#040810",
    c800: "#02050A",
    c900: "#010304",
  },
};

export const defaultTheme = {
  extend: {
    colors: {
      themePreview: {
        primary: tokens.ocean.c300,
        secondary: tokens.navy.c25,
        ghost: tokens.white,
      },

      // Branding
      pill: {
        background: tokens.navy.c300,
        backgroundHover: tokens.navy.c200,
        highlight: tokens.ocean.c300,
        activeBackground: tokens.navy.c300,
      },

      // meta data for the theme itself
      global: {
        accentA: tokens.ocean.c300,
        accentB: tokens.ocean.c400,
      },

      // light bar
      lightBar: {
        light: tokens.ocean.c400,
      },

      // Buttons
      buttons: {
        toggle: tokens.ocean.c400,
        toggleDisabled: tokens.navy.c100,
        danger: tokens.rum.c200,
        dangerHover: tokens.rum.c300,

        secondary: tokens.navy.c300,
        secondaryText: "#8BAAC0",
        secondaryHover: tokens.navy.c200,
        primary: tokens.white,
        primaryText: tokens.navy.c500,
        primaryHover: "#B0C8DC",
        purple: tokens.ocean.c500,
        purpleHover: tokens.ocean.c400,
        cancel: tokens.navy.c200,
        cancelHover: tokens.navy.c100,
      },

      // only used for body colors/textures
      background: {
        main: tokens.navy.c500,
        secondary: tokens.navy.c400,
        secondaryHover: tokens.navy.c300,
        accentA: tokens.gold.c400,
        accentB: tokens.ocean.c400,
      },

      // Modals
      modal: {
        background: tokens.navy.c400,
      },

      // typography
      type: {
        logo: tokens.ocean.c200,
        emphasis: tokens.white,
        text: "#B0C8DC",
        dimmed: "#8BAAC0",
        divider: tokens.navy.c100,
        secondary: tokens.navy.c25,
        danger: tokens.rum.c100,
        success: tokens.semantic.green.c100,
        link: tokens.ocean.c200,
        linkHover: tokens.ocean.c100,
      },

      // search bar
      search: {
        background: tokens.navy.c400,
        hoverBackground: tokens.navy.c300,
        focused: tokens.navy.c200,
        placeholder: tokens.navy.c25,
        icon: tokens.navy.c25,
        text: tokens.white,
      },

      // media cards
      mediaCard: {
        hoverBackground: tokens.navy.c300,
        hoverAccent: tokens.ocean.c200,
        hoverShadow: tokens.navy.c500,
        shadow: tokens.navy.c400,
        barColor: tokens.navy.c200,
        barFillColor: tokens.ocean.c200,
        badge: tokens.navy.c300,
        badgeText: "#B0C8DC",
      },

      // Large card
      largeCard: {
        background: tokens.navy.c300,
        icon: tokens.ocean.c300,
      },

      // Dropdown
      dropdown: {
        background: tokens.navy.c400,
        altBackground: tokens.navy.c500,
        hoverBackground: tokens.navy.c300,
        highlight: tokens.gold.c300,
        highlightHover: tokens.gold.c200,
        text: "#B0C8DC",
        secondary: "#8BAAC0",
        border: tokens.navy.c200,
        contentBackground: tokens.navy.c300,
      },

      // Passphrase
      authentication: {
        border: tokens.navy.c200,
        inputBg: tokens.navy.c400,
        inputBgHover: tokens.navy.c300,
        wordBackground: tokens.navy.c300,
        copyText: "#8BAAC0",
        copyTextHover: "#B0C8DC",
        errorText: tokens.rum.c100,
      },

      // Settings page
      settings: {
        sidebar: {
          activeLink: tokens.navy.c300,
          badge: tokens.navy.c500,

          type: {
            secondary: tokens.navy.c25,
            inactive: tokens.navy.c25,
            icon: tokens.navy.c25,
            iconActivated: tokens.ocean.c300,
            activated: tokens.ocean.c200,
          },
        },

        card: {
          border: tokens.navy.c200,
          background: tokens.navy.c300,
          altBackground: tokens.navy.c300,
        },

        saveBar: {
          background: tokens.navy.c500,
        },
      },

      // Utilities
      utils: {
        divider: tokens.navy.c100,
      },

      // Onboarding
      onboarding: {
        bar: tokens.navy.c200,
        barFilled: tokens.ocean.c300,
        divider: tokens.navy.c100,
        card: tokens.navy.c400,
        cardHover: tokens.navy.c300,
        border: tokens.navy.c200,
        good: tokens.ocean.c200,
        best: tokens.gold.c300,
        link: tokens.ocean.c200,
      },

      // Error page
      errors: {
        card: tokens.navy.c400,
        border: tokens.navy.c100,

        type: {
          secondary: "#8BAAC0",
        },
      },

      // About page
      about: {
        circle: tokens.navy.c200,
        circleText: "#8BAAC0",
      },

      // Edit badge
      editBadge: {
        bg: tokens.navy.c200,
        bgHover: tokens.navy.c100,
        text: "#B0C8DC",
      },

      progress: {
        background: "#8BAAC0",
        preloaded: "#8BAAC0",
        filled: tokens.ocean.c300,
      },

      // video player
      video: {
        buttonBackground: tokens.navy.c100,

        autoPlay: {
          background: tokens.navy.c400,
          hover: tokens.navy.c200,
        },

        scraping: {
          card: tokens.navy.c400,
          error: tokens.rum.c200,
          success: tokens.semantic.green.c200,
          loading: tokens.ocean.c300,
          noresult: "#8BAAC0",
        },

        audio: {
          set: tokens.ocean.c200,
        },

        context: {
          background: tokens.navy.c500,
          light: "#B0C8DC",
          border: tokens.navy.c200,
          hoverColor: tokens.navy.c200,
          buttonFocus: tokens.navy.c100,
          flagBg: tokens.navy.c200,
          inputBg: tokens.navy.c300,
          buttonOverInputHover: tokens.navy.c100,
          inputPlaceholder: "#8BAAC0",
          cardBorder: tokens.navy.c200,
          slider: "#8BAAC0",
          sliderFilled: tokens.ocean.c300,
          error: tokens.rum.c100,

          buttons: {
            list: tokens.navy.c200,
            active: tokens.navy.c500,
          },

          closeHover: tokens.navy.c100,

          type: {
            main: "#B0C8DC",
            secondary: "#8BAAC0",
            accent: tokens.ocean.c200,
          },
        },
      },
    },
  },
};
