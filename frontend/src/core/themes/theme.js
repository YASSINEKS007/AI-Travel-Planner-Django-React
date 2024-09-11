export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F0F9FF",
    50: "#E0F2FE",
    100: "#BAE6FD",
    200: "#7DD3FC",
    300: "#38BDF8",
    400: "#0EA5E9",
    500: "#0284C7",
    600: "#0369A1",
    700: "#075985",
    800: "#0C4A6E",
    900: "#0A325D",
    1000: "#001E3C",
  },
  primary: {
    50: "#EBF8FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[1000],
              alt: colorTokens.grey[900],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[0],
              alt: colorTokens.grey[10],
            },
          }),
    },
    typography: {
      fontFamily: ["Karla", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Karla", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Karla", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Karla", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Karla", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Karla", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Karla", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
