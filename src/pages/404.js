import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNotFound = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.bg};

  span {
    text-decoration: underline;
    cursor: pointer;
    font-size: 22px;
    margin-top: 20px;
  }
`;

const NotFound = () => {
  return (
    <StyledNotFound>
      404 | Page Not Found{' '}
      <Link href="/" passHref>
        <span>Go Home</span>
      </Link>
    </StyledNotFound>
  );
};

export default NotFound;
