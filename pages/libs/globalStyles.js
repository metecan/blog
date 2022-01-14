import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    transition: background-color 0.1s linear;
  }

  body {
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.color};
  }
`;

export default GlobalStyle;
