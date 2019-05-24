import siteMetadataFixture from './siteMetadataFixture';
import projectFixture from './projectFixture';

const data = {
  site: { siteMetadata: siteMetadataFixture.siteMetadata },
  markdownRemark: projectFixture.project,
};

export default { data };
