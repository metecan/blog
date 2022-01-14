import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import styled from 'styled-components';
import Content from '../../layouts/Content';
import Link from 'next/link';
import Head from 'next/head';
import CONFIG from '../static/CONFIG.json';

const StyledArticleTitle = styled.div`
  padding: 1rem 0 2rem 0;
`;

const StyledArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px 0;

  @media (max-width: 940px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
`;

const StyledDate = styled.div`
  font-size: 1.2rem;
  opacity: 0.6;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-top: 20px;
  border-radius: 4px;
`;

const StyledGoBackButton = styled.span`
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  font-size: 24px;
  margin-top: -10px;

  span {
    transform: rotate(90deg);
  }
`;

const StyledTopOfPage = styled.div`
  width: 200px;
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

  a {
    color: ${({ theme }) => theme.anchor};
  }

  ul,
  ol {
    margin-left: 20px;
    line-height: 24px;
  }

  h1 {
    font-size: 3rem;
    padding: 1rem 0;
    font-weight: 500;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 500;
    padding: 2rem 0;
  }

  p {
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 28px;
  }

  pre {
    background: ${({ theme }) => theme.codebg};
    color: ${({ theme }) => theme.color};
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    line-height: 24px;

    overflow: auto;
  }
`;

export default function PostPage({ frontmatter: { title, date, excerpt, cover_image }, slug, content }) {
  return (
    <Content>
      <Head>
        <title>
          {title} | {CONFIG.SITE_TITLE}
        </title>
        <meta name="title" content={title} />
        <link rel="icon" href={CONFIG.SITE_IMAGE} type="image/png" />
        <meta name="description" content={excerpt} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${CONFIG.SITE_URL}/blog/${slug}`} />
        <meta property="og:title" content={`${title} | ${CONFIG.SITE_TITLE}`} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={cover_image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${CONFIG.SITE_URL}/blog/${slug}`} />
        <meta property="twitter:title" content={`${title} | ${CONFIG.SITE_TITLE}`} />
        <meta property="twitter:description" content={excerpt} />
        <meta property="twitter:image" content={cover_image}></meta>
      </Head>
      <StyledTopOfPage>
        <Link href="/blog" passHref>
          <StyledGoBackButton>
            <span>⟵ Go Back</span>
          </StyledGoBackButton>
        </Link>
      </StyledTopOfPage>
      <StyledArticleTitle>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>{date}</StyledDate>
        <StyledImage src={cover_image} alt="Cover Image" />
      </StyledArticleTitle>
      <StyledArticleContent>
        <StyledMarkdownContent dangerouslySetInnerHTML={{ __html: marked(content) }}></StyledMarkdownContent>
      </StyledArticleContent>
    </Content>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('src/posts'));

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('src', 'posts/' + slug + '.md'), 'utf-8');

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
