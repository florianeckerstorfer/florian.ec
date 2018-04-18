import Link from 'gatsby-link';
import React from 'react';
import PropTypes from 'prop-types';

import './postFooter.scss';

const PostFooter = ({ frontmatter }) => (
  <div className="post-footer">
    {frontmatter.tags && (
      <div className="tags">
        {frontmatter.tags.map(tag => (
          <Link to={`/tags/${tag}`} key={tag}>
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
  }),
};

PostFooter.defaultProps = {
  frontmatter: {
    tags: [],
  },
};

export default PostFooter;
