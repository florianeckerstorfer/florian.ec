import PropTypes from 'prop-types';
import React from 'react';
import PostTags from '../PostTags/PostTags';
import './postFooter.scss';

const PostFooter = ({ frontmatter }) => (
  <div className="post-footer">
    {frontmatter.tags && <PostTags tags={frontmatter.tags} />}
  </div>
);

PostFooter.propTypes = {
  frontmatter: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PostFooter;
