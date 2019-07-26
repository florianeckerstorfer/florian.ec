import { Props } from '../../pages/projects';
import locationFixture from './locationFixture';
import projectListFixture from './projectListFixture';
import siteMetadataFixture from './siteMetadataFixture';

const projectsProps: Props = {
  location: locationFixture.location,
  data: {
    site: { siteMetadata: siteMetadataFixture.siteMetadata },
    allMarkdownRemark: { edges: projectListFixture.projects },
  },
};

const projectsPropsEmptyProjects: Props = {
  location: locationFixture.location,
  data: {
    site: { siteMetadata: siteMetadataFixture.siteMetadata },
    allMarkdownRemark: { edges: [] },
  },
};

export default { projectsProps, projectsPropsEmptyProjects };
