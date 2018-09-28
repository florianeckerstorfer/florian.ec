import PropTypes from 'prop-types';
import React from 'react';
import PostCategory from '../PostCategory/PostCategory';
import PostDate from '../PostDate/PostDate';
import './postMeta.scss';

const PostMeta = ({ frontmatter }) => (
  <div className="post-meta">
    <PostDate date={frontmatter.date} />
    <span className="dot">&#x2022;</span>
    <PostCategory category={frontmatter.category} />
  </div>
);

PostMeta.propTypes = {
  frontmatter: PropTypes.shape({
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};

PostMeta.defaultProps = {
  frontmatter: {
    date: null,
    category: null,
  },
};

export default PostMeta;
