import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import './post-category.scss';

const PostCategory = ({ category }) => (
  <div className="post-category">
    <Link to={`/categories/${category.toLowerCase()}`}>{category}</Link>
  </div>
);

PostCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default PostCategory;
