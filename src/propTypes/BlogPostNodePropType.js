import PropTypes from 'prop-types';
import BlogPostFrontmatterPropType from './BlogPostFrontmatterPropType';

export default ({ detail } = { detail: true }) =>
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    html: detail ? PropTypes.string.isRequired : PropTypes.string,
    frontmatter: BlogPostFrontmatterPropType.isRequired,
  });
