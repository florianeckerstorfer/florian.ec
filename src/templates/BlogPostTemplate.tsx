import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import ISiteMetadata from '../types/ISiteMetadata';
import IBlogFrontmatter from '../types/IBlogFrontmatter';
import IPageContext from '../types/IPageContext';
import styles from './BlogPostTemplate.module.css';
import H1 from '../components/H1/H1';
import ArticleNavigation from '../components/ArticleNavigation/ArticleNavigation';

interface IProps {
  location: Location;
  pageContext: IPageContext;
  data: {
    site: { siteMetadata: ISiteMetadata };

    markdownRemark: {
      frontmatter: IBlogFrontmatter;
      excerpt?: string;
      html: string;
    };
  };
}

class BlogPostTemplate extends React.PureComponent<IProps> {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <article className={styles.article}>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />
          <header className={styles.header}>
            <H1>{post.frontmatter.title}</H1>
          </header>
          <aside className={styles.meta}>{post.frontmatter.date}</aside>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <ArticleNavigation previous={previous} next={next} />
        </article>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
