import React from 'react';
import { shallow } from 'enzyme';
import Project, { IProps } from './Project';

const defaultProps: IProps = {
  post: {
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
  it('should render', () => {
    const component = shallow(<Project {...defaultProps} />);
    expect(component.exists()).toBe(true);
  });
});
