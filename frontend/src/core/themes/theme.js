export const colorTokens = {
  light: {
    background: "#FFFFFF",
    primary: "#8B5CF6",
    text: "#000000",
  },
  dark: {
    background: "#1E1E2F",
    primary: "#A78BFA",
    text: "#FFFFFF",
  },
  hover: "#6a0dad",
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      primary: {
        main: colorTokens[mode].primary,
      },
      background: {
        default: colorTokens[mode].background,
      },
      text: {
        primary: colorTokens[mode].text,
      },
      hover: {
        primary: colorTokens.hover,
      },
    },
    typography: {
      fontFamily: ["Karla", "sans-serif"].join(","),
      fontSize: 12,
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
  };
};
