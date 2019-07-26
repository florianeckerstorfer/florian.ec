import IProjectNode from '../../types/IProjectNode';

const project: IProjectNode = {
  frontmatter: {
    active: false,
    category: 'Web App',
    date: '2019-05-01',
    slug: 'my-project',
    title: 'My Project',
  },
  fields: {
    slug: 'my-project',
  },
  excerpt: 'my project excerpt',
};

const activeProject: IProjectNode = {
  ...project,
  frontmatter: { ...project.frontmatter },
};
activeProject.frontmatter.active = true;

const projectWithDescription: IProjectNode = {
  ...activeProject,
  frontmatter: { ...activeProject.frontmatter },
};
projectWithDescription.frontmatter.description = 'My description';

const projectWithTags: IProjectNode = {
  ...activeProject,
  frontmatter: { ...activeProject.frontmatter },
};
projectWithTags.frontmatter.tags = ['tag 1', 'tag 2', 'tag 3'];

export default {
  project,
  activeProject,
  projectWithDescription,
  projectWithTags,
};
