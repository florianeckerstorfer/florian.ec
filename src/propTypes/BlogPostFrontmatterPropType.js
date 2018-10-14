import PropTypes from 'prop-types';

const BlogPostFrontmatterType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
  path: PropTypes.string.isRequired,
  published: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
});

export default BlogPostFrontmatterType;
