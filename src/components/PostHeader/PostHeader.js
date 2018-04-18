import PropTypes from 'prop-types';
import React from 'react';

import PostMeta from '../PostMeta/PostMeta';
import PostTitle from '../PostTitle/PostTitle';

const PostHeader = ({ detail, frontmatter }) => (
  <header className="postHeader">
    <PostTitle
      title={frontmatter.title}
      path={frontmatter.path}
      detail={detail}
    />
    <PostMeta frontmatter={frontmatter} />
  </header>
);

PostHeader.propTypes = {
  detail: PropTypes.bool,
  frontmatter: PropTypes.shape({
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

PostHeader.defaultProps = {
  detail: false,
  frontmatter: {
    title: null,
    path: null,
  },
};

export default PostHeader;
