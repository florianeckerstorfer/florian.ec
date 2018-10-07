import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import './post-tags.scss';

const PostTags = ({ tags }) => (
  <div className="post-tags">
    {tags.map(tag => (
      <Link to={`/tags/${tag.toLowerCase()}`} key={tag}>
        #<span className="tag">{tag}</span>
      </Link>
    ))}
  </div>
);

PostTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PostTags;
