import { createTheme } from "../types";

// Parchment & Sea-Foam: light mode with a sun-bleached nautical feel
export default createTheme({
  name: "pirate-light",
  extend: {
    colors: {
      themePreview: {
        primary: "#0E507B",
        secondary: "#5A7080",
        ghost: "#F0EDE8",
      },

      pill: {
        background: "#D8D0C4",
        backgroundHover: "#C8C0B0",
        highlight: "#0E507B",
        activeBackground: "#D8D0C4",
      },

      global: {
        accentA: "#0E507B",
        accentB: "#093A5C",
      },

      lightBar: {
        light: "#1A6A9A",
      },

      buttons: {
        toggle: "#0E507B",
        toggleDisabled: "#B8AFA0",
        danger: "#C0392B",
        dangerHover: "#A02F24",

        secondary: "#D8D0C4",
        secondaryText: "#3A5C80",
        secondaryHover: "#C8C0B0",
        primary: "#0D1B2E",
        primaryText: "#F4F1EC",
        primaryHover: "#1C3050",
        purple: "#0E507B",
        purpleHover: "#1A6A9A",
        cancel: "#C8C0B0",
        cancelHover: "#B8B0A0",
      },

      background: {
        main: "#F0EDE8",
        secondary: "#E8E2D8",
        secondaryHover: "#DDD6C8",
        accentA: "#D4A20F",
        accentB: "#0E507B",
      },

      modal: {
        background: "#F8F5F0",
      },

      type: {
        logo: "#1A6A9A",
        emphasis: "#0D1B2E",
        text: "#1C3050",
        dimmed: "#3A5C80",
        divider: "#B8AFA0",
        secondary: "#5A7080",
        danger: "#C0392B",
        success: "#2D7D40",
        link: "#0E507B",
        linkHover: "#1A6A9A",
      },

      search: {
        background: "#EDE9E0",
        hoverBackground: "#E4DFD4",
        focused: "#FFFFFF",
        placeholder: "#8A8070",
        icon: "#7A7060",
        text: "#0D1B2E",
      },

      mediaCard: {
        hoverBackground: "#E4DFD4",
        hoverAccent: "#0E507B",
        hoverShadow: "#F0EDE8",
        shadow: "#EAE4D8",
        barColor: "#C8C0B0",
        barFillColor: "#0E507B",
        badge: "#0D1B2E",
        badgeText: "#F4F1EC",
      },

      largeCard: {
        background: "#E8E4DC",
        icon: "#0E507B",
      },

      dropdown: {
        background: "#F0EDE6",
        altBackground: "#E8E4DC",
        hoverBackground: "#DDD8CE",
        highlight: "#D4A20F",
        highlightHover: "#A87E0A",
        text: "#1C3050",
        secondary: "#3A5C80",
        border: "#C8C0B0",
        contentBackground: "#EAE6DE",
      },

      authentication: {
        border: "#B8AFA0",
        inputBg: "#F0EDE6",
        inputBgHover: "#E8E4DC",
        wordBackground: "#E8E4DC",
        copyText: "#5A7080",
        copyTextHover: "#3A5C80",
        errorText: "#C0392B",
      },

      settings: {
        sidebar: {
          activeLink: "#E4DFD4",
          badge: "#F4F1EC",

          type: {
            secondary: "#5A7080",
            inactive: "#7A8090",
            icon: "#7A8090",
            iconActivated: "#0E507B",
            activated: "#093A5C",
          },
        },

        card: {
          border: "#C8C0B0",
          background: "#F0EDE6",
          altBackground: "#E8E4DC",
        },

        saveBar: {
          background: "#F8F5F0",
        },
      },

      utils: {
        divider: "#C8BFB0",
      },

      onboarding: {
        bar: "#C8BFB0",
        barFilled: "#0E507B",
        divider: "#D0C9BC",
        card: "#F8F5F0",
        cardHover: "#F0EDE6",
        border: "#D8D0C4",
        good: "#0E507B",
        best: "#D4A20F",
        link: "#0E507B",
      },

      errors: {
        card: "#F8F5F0",
        border: "#C8BFB0",

        type: {
          secondary: "#5A7080",
        },
      },

      about: {
        circle: "#C8BFB0",
        circleText: "#5A7080",
      },

      editBadge: {
        bg: "#C8BFB0",
        bgHover: "#B8B0A0",
        text: "#3A5C80",
      },

      progress: {
        background: "#C8BFB0",
        preloaded: "#C8BFB0",
        filled: "#0E507B",
      },

      video: {
        buttonBackground: "#2A4464",

        autoPlay: {
          background: "#1C3050",
          hover: "#2A4464",
        },

        scraping: {
          card: "#F0EDE6",
          error: "#C0392B",
          success: "#2D7D40",
          loading: "#0E507B",
          noresult: "#5A7080",
        },

        audio: {
          set: "#0E507B",
        },

        context: {
          background: "#1A1F2E",
          light: "#F0F4FF",
          border: "#2A3A4E",
          hoverColor: "#2A3A4E",
          buttonFocus: "#3A4A5E",
          flagBg: "#2A3A4E",
          inputBg: "#232E3E",
          buttonOverInputHover: "#3A4A5E",
          inputPlaceholder: "#5A7080",
          cardBorder: "#2A3A4E",
          slider: "#B0C0D4",
          sliderFilled: "#0E507B",
          error: "#E05A5A",

          buttons: {
            list: "#2A3A4E",
            active: "#1A2330",
          },

          closeHover: "#3A4A5E",

          type: {
            main: "#B0C0D4",
            secondary: "#7A8A9E",
            accent: "#2F8AB8",
          },
        },
      },
    },
  },
});
