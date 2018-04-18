import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import './postTitle.scss';

const PostTitle = ({ title, path, detail }) =>
  !detail ? (
    <h3 className="post-title">
      <Link to={path}>{title}</Link>
    </h3>
  ) : (
    <h1 className="post-title">{title}</h1>
  );

PostTitle.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  detail: PropTypes.bool,
};

PostTitle.defaultProps = {
  detail: false,
};

export default PostTitle;
