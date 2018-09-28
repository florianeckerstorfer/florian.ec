import PropTypes from 'prop-types';
import React from 'react';
import './postContent.scss';

const PostContent = ({ children, layout }) => (
  <div className={`post-content post-content--${layout}`}>{children}</div>
);

PostContent.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.string.isRequired,
};

export default PostContent;
