import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Post from '../components/Post';
import { sortByDate } from '../libs/utils';
import Content from '../layouts/Content';
import styled from 'styled-components';

const StyledBlogHero = styled.div`
  padding: 1rem 0 6rem 0;
`;

const StyledBlogList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px 0;
`;

const StyledHeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
`;

const StyledHeroDescription = styled.div`
  font-size: 1.5rem;
  opacity: 0.6;
  margin-top: 20px;
`;

export default function Blog({ posts }) {
  return (
    <Content>
      <StyledBlogHero>
        <StyledHeroTitle>Blog</StyledHeroTitle>
        <StyledHeroDescription>I hope you enjoy what I find interesting enough to write.</StyledHeroDescription>
      </StyledBlogHero>
      <StyledBlogList>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </StyledBlogList>
    </Content>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('src', 'posts'));

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('src', 'posts/' + filename), 'utf-8');

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
