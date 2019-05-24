import React from 'react';
import { shallow } from 'enzyme';
import ProjectTemplate from './ProjectTemplate';
import locationFixture from '../tests/fixtures/locationFixture';
import pageContextFixture from '../tests/fixtures/pageContextFixture';
import projectDataFixture from '../tests/fixtures/projectDataFixture';

describe('ProjectTemplate', () => {
  const location = locationFixture.location;
  const pageContext = pageContextFixture.pageContext;
  const data = projectDataFixture.data;
  const component = shallow(
    <ProjectTemplate
      location={location}
      pageContext={pageContext}
      data={data}
    />
  );

  it('should render', () => {
    expect(component.exists()).toBe(true);
  });

  it('should render title', () => {
    const layout = component.find('Layout');
    const seo = component.find('SEO');
    expect(layout.prop('title')).toBe(data.site.siteMetadata.title);
    expect(seo.prop('title')).toBe(data.markdownRemark.frontmatter.title);
  });

  it('should render project', () => {
    expect(component.find('Project').prop('project')).toBe(data.markdownRemark);
  });
});
