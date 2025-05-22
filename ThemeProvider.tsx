import React, { useState, createContext, useContext } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "./theme";
import { ReactNode } from "react";

const ThemeToggleContext = createContext({
  toggleTheme: () => {},
  isDark: false,
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, isDark }}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
