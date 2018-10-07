/* eslint-disable react/no-danger */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import PostContent from '../PostContent/PostContent';
import PostFooter from '../PostFooter/PostFooter';
import PostHeader from '../PostHeader/PostHeader';
import './post.scss';

const frontmatterPropType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  layout: PropTypes.string,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

const PostDetail = ({ frontmatter, html }) => (
  <div>
    <PostContent layout={frontmatter.layout || 'default'}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </PostContent>
    <PostFooter frontmatter={frontmatter} />
  </div>
);

PostDetail.propTypes = {
  frontmatter: frontmatterPropType.isRequired,
  html: PropTypes.string.isRequired,
};

const Post = ({ detail, frontmatter, html }) => (
  <div
    className={classNames('post', {
      'post--list': !detail,
    })}
  >
    <PostHeader detail={detail} frontmatter={frontmatter} />
    {detail && <PostDetail frontmatter={frontmatter} html={html} />}
  </div>
);

Post.propTypes = {
  detail: PropTypes.bool,
  frontmatter: frontmatterPropType.isRequired,
  html: PropTypes.string.isRequired,
};

Post.defaultProps = {
  detail: false,
};

export default Post;
