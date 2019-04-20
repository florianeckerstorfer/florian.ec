import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import ISiteMetadata from '../types/ISiteMetadata';
import IPageContext from '../types/IPageContext';
import Article from '../components/Article/Article';
import IBlogPost from '../types/IBlogPost';

interface IProps {
  location: Location;
  pageContext: IPageContext;
  data: {
    site: { siteMetadata: ISiteMetadata };
    markdownRemark: IBlogPost;
  };
}

class BlogPostTemplate extends React.PureComponent<IProps> {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const pageContext = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Article post={post} context={pageContext} />
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
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
