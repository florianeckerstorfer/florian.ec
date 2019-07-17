import React from 'react';
import { shallow } from 'enzyme';
import Project, { Props } from './Project';

const defaultProps: Props = {
  project: {
    frontmatter: {
      category: 'Web App',
      date: '2019-05-24',
      slug: 'my-project',
      title: 'My Project',
    },
    html: 'my content',
    excerpt: 'my excerpt',
  },
};

describe('Project', () => {
  const component = shallow(<Project {...defaultProps} />);

  it('should render', () => {
    expect(component.exists()).toBe(true);
  });
});
