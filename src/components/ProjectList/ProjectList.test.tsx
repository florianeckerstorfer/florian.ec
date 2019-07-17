import React from 'react';
import ProjectList from './ProjectList';
import { shallow } from 'enzyme';
import projectListFixture from '../../tests/fixtures/projectListFixture';

describe('ProjectList with no projects', () => {
  const projects = projectListFixture.emptyProjects;
  const component = shallow(<ProjectList projects={projects} />);

  it('should render', () => {
    expect(component.exists()).toBe(true);
    expect(component.type()).toBe(null);
  });
});

describe('ProjectList with projects', () => {
  const projects = projectListFixture.projects;
  const component = shallow(<ProjectList projects={projects} />);

  it('should render', () => {
    expect(component.exists()).toBe(true);
  });
});