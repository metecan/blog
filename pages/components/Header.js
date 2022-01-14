import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import CONFIG from '../static/CONFIG.json';
import { ThemeContext } from '../libs/ThemeContext';
import Moon from './Icons/Moon';
import Sun from './Icons/Sun';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 40px;

  @media (max-width: 640px) {
    gap: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 400px) {
    gap: 0 10px;
    width: 100%;
  }
`;

const StyledLogo = styled(Link)`
  display: block;
  color: ${props => props.theme.color};
  text-decoration: none;
  font-family: 'Ubuntu', sans-serif;
  font-size: 24px;
  opacity: 0.6;

  :hover {
    opacity: 1;
  }
`;

const StyledMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0 30px;
`;

const StyledMenuItem = styled.li`
  display: inline-block;
`;

const StyledAnchor = styled.a`
  color: ${props => props.theme.color};
  text-decoration: none;
  font-size: 18px;
  opacity: 0.6;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`;

const StyledTogglleButton = styled.button`
  background-color: ${props => props.theme.button};
  border: none;
  color: ${props => props.theme.color};
  padding: 16px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;

  @media (max-width: 640px) {
    position: absolute;
    top: 100px;
    padding: 10px;
  }
`;

const Header = () => {
  const { switchTheme, theme } = React.useContext(ThemeContext);

  return (
    <StyledHeader>
      <StyledNavigation>
        <StyledLogo href="/">
          <StyledAnchor>{CONFIG.LOGO_TEXT}</StyledAnchor>
        </StyledLogo>
        <StyledMenu>
          <StyledMenuItem>
            <Link href="/" passHref>
              <StyledAnchor>About</StyledAnchor>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link href="/blog" passHref>
              <StyledAnchor>Blog</StyledAnchor>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <StyledAnchor target="_blank" href={`https://twitter.com/${CONFIG.TWITTER_USERNAME}`}>
              Twitter
            </StyledAnchor>
          </StyledMenuItem>
          <StyledMenuItem>
            <StyledAnchor target="_blank" href={`https://github.com/${CONFIG.GITHUB_USERNAME}`}>
              GitHub
            </StyledAnchor>
          </StyledMenuItem>
        </StyledMenu>
      </StyledNavigation>
      <StyledTogglleButton onClick={() => switchTheme()}>{theme === 'light' ? <Moon /> : <Sun />}</StyledTogglleButton>
    </StyledHeader>
  );
};

export default Header;
