import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sortByDate } from '../libs/utils';
import Content from '../layouts/Content';
import styled from 'styled-components';
import Head from 'next/head';
import CONFIG from './static/CONFIG.json';
import dynamic from 'next/dynamic';

const Post = dynamic(() => import('../components/Post'), { ssr: false });

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
      <Head>
        <title>{CONFIG.SITE_TITLE} | Blog</title>
        <link rel="icon" href={CONFIG.SITE_IMAGE} type="image/png" />
        <meta name="title" content={`${CONFIG.SITE_TITLE} | Blog`} />
        <meta name="description" content={CONFIG.SITE_DESCRIPTION} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={CONFIG.SITE_URL} />
        <meta property="og:title" content={`${CONFIG.SITE_TITLE} | Blog`} />
        <meta property="og:description" content={CONFIG.SITE_DESCRIPTION} />
        <meta property="og:image" content={CONFIG.SITE_IMAGE} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={CONFIG.SITE_URL} />
        <meta property="twitter:title" content={`${CONFIG.SITE_TITLE} | Blog`} />
        <meta property="twitter:description" content={CONFIG.SITE_DESCRIPTION} />
        <meta property="twitter:image" content={CONFIG.SITE_IMAGE}></meta>
      </Head>
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
