/* eslint-disable react/no-danger */

import PropTypes from 'prop-types';
import React from 'react';
import PostContent from '../PostContent/PostContent';
import PostFooter from '../PostFooter/PostFooter';
import PostHeader from '../PostHeader/PostHeader';
import './post.scss';

const Post = ({ detail, frontmatter, html }) => (
  <div className="post">
    <PostHeader detail={detail} frontmatter={frontmatter} />
    <PostContent layout={frontmatter.layout || 'default'}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </PostContent>
    <PostFooter frontmatter={frontmatter} />
  </div>
);

Post.propTypes = {
  detail: PropTypes.bool,
  frontmatter: PropTypes.shape({
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    layout: PropTypes.string,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  html: PropTypes.string.isRequired,
};

Post.defaultProps = {
  detail: false,
  frontmatter: {
    layout: 'default',
    path: null,
    title: null,
  },
};

export default Post;
