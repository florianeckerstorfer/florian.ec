import { IProps } from '../../pages/projects';
import locationFixture from './locationFixture';
import siteMetadataFixture from './siteMetadataFixture';
import projectListFixture from './projectListFixture';

const projectsProps: IProps = {
  location: locationFixture.location,
  data: {
    site: { siteMetadata: siteMetadataFixture.siteMetadata },
    allMarkdownRemark: { edges: projectListFixture.projects },
  },
};

const projectsPropsEmptyProjects: IProps = {
  location: locationFixture.location,
  data: {
    site: { siteMetadata: siteMetadataFixture.siteMetadata },
    allMarkdownRemark: { edges: [] },
  },
};

export default { projectsProps, projectsPropsEmptyProjects };
