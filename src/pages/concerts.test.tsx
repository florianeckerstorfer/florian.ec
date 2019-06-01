import React from 'react';
import { shallow } from 'enzyme';
import ConcertsPage from './concerts';

describe('ConcertsPage', () => {
  const page = shallow(<ConcertsPage />);

  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
