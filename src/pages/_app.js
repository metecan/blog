import Header from '../components/Header';
import { ThemeStore } from '../libs/ThemeContext';
import Theme from '../libs/Theme';
import GlobalStyles from '../libs/globalStyles';
import styled from 'styled-components';

const StyledAppWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeStore>
      <Theme>
        <GlobalStyles />
        <StyledAppWrapper>
          <Component {...pageProps} />
        </StyledAppWrapper>
      </Theme>
    </ThemeStore>
  );
}

export default MyApp;
