import PropTypes from 'prop-types';
import React from 'react';

import PostHeader from '../PostHeader/PostHeader';

import './postHeaderList.scss';

const PostHeaderList = ({ posts }) => (
  <ul className="post-header-list">
    {posts.map(({ node }) => (
      <li key={node.frontmatter.path} className="post-header-list__item">
        <PostHeader frontmatter={node.frontmatter} />
      </li>
    ))}
  </ul>
);

PostHeaderList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          category: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }),
      }),
    })
  ),
};

PostHeaderList.defaultProps = {
  posts: [],
};

export default PostHeaderList;
