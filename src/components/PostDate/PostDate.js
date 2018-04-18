import PropTypes from 'prop-types';
import React from 'react';

import './postDate.scss';

const PostDate = ({ date }) => <div className="post-date">{date}</div>;

PostDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default PostDate;
