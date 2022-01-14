import styled from 'styled-components';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header'), { ssr: false });

const StyledContainer = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 940px) {
    width: 90%;
    padding: 0 1rem;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 0;

  @media (max-width: 940px) {
    align-items: center;
    justify-content: center;
  }
`;

export const Content = ({ children }) => {
  return (
    <StyledContainer>
      <Header />
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </StyledContainer>
  );
};

export default Content;
