import React from 'react';
import { shallow } from 'enzyme';
import ProjectsPage from './projects';

describe('ProjectsPage', () => {
  const page = shallow(<ProjectsPage />);

  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
