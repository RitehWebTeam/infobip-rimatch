import useLocalStorage from "../hooks/useLocalStorage";
import React, { createContext, useEffect } from "react";

export type Theme = "system" | "dark" | "light";

interface ThemeContextProps {
  theme: Theme;
  setThemeMode: (t: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setThemeMode: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
