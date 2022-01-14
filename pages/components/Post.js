import Link from 'next/link';
import styled from 'styled-components';

const StyledBlogItemWrapper = styled.div``;

const StyledDate = styled.div`
  opacity: 0.6;
`;

const StyledTitle = styled.a`
  display: block;
  font-size: 32px;
  font-weight: 500;
  opacity: 0.9;
  margin: 8px 0 20px 0;
  cursor: pointer;
  color: ${({ theme }) => theme.color};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const StyledDesc = styled.p`
  font-size: 20px;
  opacity: 0.7;
`;

const StyledReadMoreButton = styled.a`
  color: ${props => props.theme.anchor};
  font-weight: 500;
  margin-left: 10px;
  cursor: pointer;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export default function Post({ post }) {
  return (
    <StyledBlogItemWrapper>
      <StyledDate>{post.frontmatter.date}</StyledDate>
      <Link href={`/blog/${post.slug}`} passHref>
        <StyledTitle>{post.frontmatter.title}</StyledTitle>
      </Link>
      <StyledDesc>
        {post.frontmatter.excerpt}
        <Link href={`/blog/${post.slug}`} passHref>
          <StyledReadMoreButton>Read More ⟶</StyledReadMoreButton>
        </Link>
      </StyledDesc>
    </StyledBlogItemWrapper>
  );
}
