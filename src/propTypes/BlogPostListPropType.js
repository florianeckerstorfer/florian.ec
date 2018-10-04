import PropTypes from 'prop-types';
import BlogPostNodeType from './BlogPostNodePropType';

const BlogPostListPropType = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: BlogPostNodeType.isRequired,
    }).isRequired
  ).isRequired,
}).isRequired;

export default BlogPostListPropType;
