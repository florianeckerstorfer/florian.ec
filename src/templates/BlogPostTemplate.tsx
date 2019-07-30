import React, { ReactElement } from 'react';

import Article from '../components/Article/Article';
import FeedLinks from '../components/FeedLinks/FeedLinks';
import IBlogPost from '../types/IBlogPost';
import IPageContext from '../types/IPageContext';
import ISiteMetadata from '../types/ISiteMetadata';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import { graphql } from 'gatsby';

interface Props {
  location: Location;
  pageContext: IPageContext;
  data: {
    site: { siteMetadata: ISiteMetadata };
    markdownRemark: IBlogPost;
  };
}

const BlogPostTemplate: React.FC<Props> = ({
  data,
  pageContext,
  location,
}: Props): ReactElement => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Article post={post} context={pageContext} />
      <FeedLinks />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
      }
    }
  }
`;
