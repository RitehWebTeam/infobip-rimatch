import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useColorScheme} from 'react-native';
import {
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const lightTheme = {
  ...NavigationDefaultTheme,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f2f3f5",
    secondary: "#000000",
    accent: "#EE5253",
    tertiary: "#ebebeb"
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "#1E1E1E",
    secondary: "#FFFFFF",
    accent: "#EE5253",
    tertiary: "#2b2b2b"
  },
};

export type Theme = typeof lightTheme; 
export type ThemeType = 'dark' | 'light';

export interface ThemeContextValue {
  theme: Theme;
  themeType: ThemeType;
  isDarkTheme: boolean;
  toggleThemeType: () => void;
  setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({children}: ThemeContextProviderProps) => {
  const systemTheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(systemTheme || 'light');

  useEffect(() => {
    if (!themeType || themeType === systemTheme) {
      setThemeType(systemTheme || 'light');
    }
  }, [systemTheme, themeType]);

  const toggleThemeType = useCallback(() => {
    setThemeType(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);
  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        isDarkTheme,
        setThemeType,
        toggleThemeType,
      }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
