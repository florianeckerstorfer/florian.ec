import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import './postFooter.scss';

const PostFooter = ({ frontmatter }) => (
  <div className="post-footer">
    {frontmatter.tags && (
      <div className="tags">
        {frontmatter.tags.map(tag => (
          <Link to={`/tags/${tag.toLowerCase()}`} key={tag}>
            #<span className="tag">{tag}</span>
          </Link>
        ))}
      </div>
    )}
  </div>
);

PostFooter.propTypes = {
  frontmatter: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PostFooter;
