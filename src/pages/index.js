import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import Content from '../layouts/Content';
import styled from 'styled-components';

const StyledAboutHero = styled.div`
  padding: 1rem 0 6rem 0;
`;

const StyledAboutContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px 0;
`;

const StyledHeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
`;

const StyledMarkdownContent = styled.div`
  @media (max-width: 940px) {
    width: 80%;
  }

  @media (max-width: 660px) {
    width: 560px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      width: 100%;
    }
  }

  @media (max-width: 583px) {
    width: 400px;
  }

  @media (max-width: 400px) {
    width: 300px;
  }

  font-size: 22px;

  h2 {
    font-size: 2.5rem;
    font-weight: 500;
    padding: 2rem 0;
  }

  p {
    margin-bottom: 20px;
  }

  .company {
    background: #5c3cbb;
    padding: 4px;
    color: #fbd30c;
    font-weight: bold;
    border-radius: 4px;
  }

  ul,
  ol {
    margin-left: 20px;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: ${props => props.theme.anchor};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;

const Home = ({ frontmatter, content }) => {
  return (
    <Content>
      <StyledAboutHero>
        <StyledHeroTitle>{frontmatter.title}</StyledHeroTitle>
      </StyledAboutHero>
      <StyledAboutContent>
        <StyledMarkdownContent dangerouslySetInnerHTML={{ __html: marked(content) }}></StyledMarkdownContent>
      </StyledAboutContent>
    </Content>
  );
};

export default Home;

export async function getStaticProps() {
  const markdownWithMeta = fs.readFileSync(path.join('src', 'pages/static/about.md'), 'utf-8');

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}
