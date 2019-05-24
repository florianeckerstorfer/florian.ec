import React from 'react';
import { shallow } from 'enzyme';
import ProjectsPage from './projects';
import projectsPagePropsFixture from '../tests/fixtures/projectsPagePropsFixture';

describe('ProjectsPage empty projects', () => {
  const props = projectsPagePropsFixture.projectsPropsEmptyProjects;
  const page = shallow(<ProjectsPage {...props} />);

  it('should render', () => {
    expect(page.exists()).toBe(true);
  });

  it('should render headline', () => {
    const headline = page.find('H1');
    expect(headline.exists()).toBe(true);
  });
});

describe('ProjectsPage with projects', () => {
  const props = projectsPagePropsFixture.projectsProps;
  const page = shallow(<ProjectsPage {...props} />);

  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
