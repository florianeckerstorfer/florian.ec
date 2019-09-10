import ProjectListItem from './ProjectListItem';
import React from 'react';
import projectNodeFixture from '../../tests/fixtures/projectNodeFixture';
import { shallow } from 'enzyme';

describe('ProjectListItem', () => {
  const project = projectNodeFixture.project;
  const component = shallow(<ProjectListItem project={project} />);

  it('should render', () => {
    expect(component.exists()).toBe(true);
  });

  it('should render link to project detail', () => {
    const titleLink = component.find('.titleLink');
    expect(titleLink.prop('to')).toBe(`/projects/${project.fields.slug}`);
    expect(titleLink.dive().text()).toBe(project.frontmatter.title);
  });

  it('should render "Inactive" label', () => {
    const inactive = component.find('.title Label');
    expect(inactive.exists()).toBe(true);
  });

  it('should not render description', () => {
    const description = component.find('.description');
    expect(description.exists()).toBe(false);
  });
});

describe('ProjectListItem for active project', () => {
  const project = projectNodeFixture.activeProject;
  const component = shallow(<ProjectListItem project={project} />);

  it('should not render "Inactive" label', () => {
    const inactive = component.find('.title Label');
    expect(inactive.exists()).toBe(false);
  });
});

describe('ProjectListItem for project with description', () => {
  const project = projectNodeFixture.projectWithDescription;
  const component = shallow(<ProjectListItem project={project} />);

  it('should render description', () => {
    const description = component.find('.description');
    expect(description.text()).toBe(project.frontmatter.description);
  });
});

describe('ProjectListItem for project with tags', () => {
  const project = projectNodeFixture.projectWithTags;
  const component = shallow(<ProjectListItem project={project} />);

  it('should render tags', () => {
    const tags = component.find('Label');
    expect(tags.length).toBe(project.frontmatter.tags!.length);
  });
});

describe('ProjectListItem for project with external link', () => {
  const project = projectNodeFixture.projectWithLink;
  const component = shallow(<ProjectListItem project={project} />);

  it('should render title with link', () => {
    const titleLink = component.find('.titleLink');
    expect(titleLink.prop('href')).toBe(project.frontmatter.link);
  });

  it('should render URL of link', () => {
    const urlLink = component.find('.urlLink');
    expect(urlLink.text()).toBe('example.com');
    expect(urlLink.prop('href')).toBe(project.frontmatter.link);
  })
});
