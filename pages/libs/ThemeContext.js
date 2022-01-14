import React, { useState } from 'react';

const ThemeContext = React.createContext();

const ThemeStore = ({ children }) => {
  const themeFromStorage = typeof window !== 'undefined' && localStorage.getItem('theme');

  if (themeFromStorage === null) {
    localStorage.setItem('theme', 'light');
  }
  const [theme, setTheme] = useState(themeFromStorage || 'light');

  const switchTheme = () => {
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <ThemeContext.Provider value={{ switchTheme, theme }}>{children}</ThemeContext.Provider>;
};

export { ThemeStore, ThemeContext };
