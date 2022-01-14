import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from './ThemeContext';

const lightTheme = {
  bg: '#f9f9f9',
  color: '#222',
  anchor: '#007bff',
  codebg: '#ddd',
  button: '#bdbdbd',
};

const darkTheme = {
  bg: '#182A35',
  color: '#f9f9f9',
  anchor: '#57b3ff',
  codebg: '#0e1920',
  button: '#203941',
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const Theme = ({ children }) => {
  const { theme } = React.useContext(ThemeContext);
  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
};

export default Theme;
