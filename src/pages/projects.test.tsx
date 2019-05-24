import React from 'react';
import { shallow } from 'enzyme';
import ProjectsPage, { IProps } from './projects';

const defaultProps: IProps = {
  location: {} as any,
  data: {
    site: { siteMetadata: { title: 'my site' } },
    allMarkdownRemark: { edges: [] },
  },
};

describe('ProjectsPage', () => {
  const page = shallow(<ProjectsPage {...defaultProps} />);

  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
