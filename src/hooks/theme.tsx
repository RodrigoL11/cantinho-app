import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as ThemeProviderStyled } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import lightTheme from '../global/styles/themes/light';
import darkTheme from '../global/styles/themes/dark';

export enum ThemeType {
  light = 'light',
  dark = 'dark'
}

export const themes = {
  light: lightTheme,
  dark: darkTheme
}

export const ThemeContext = createContext({
  theme: ThemeType.light,
  toogleTheme: () => { },
})

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(ThemeType.light)

  useEffect(() => {
    loadFromStorage()
  }, [])

  async function loadFromStorage() {
    const theme = await AsyncStorage.getItem("@Theme");
    if (theme)
      setTheme(theme);
  }

  async function toogleTheme() {
    const actualTheme = theme === ThemeType.light
      ? ThemeType.dark
      : ThemeType.light;

    setTheme(actualTheme)
    AsyncStorage.setItem("@Theme", actualTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
      <ThemeProviderStyled theme={themes[theme] || lightTheme}>
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);

  return ctx;
}

