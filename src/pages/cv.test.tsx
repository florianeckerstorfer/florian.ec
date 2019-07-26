import React from 'react';
import { shallow } from 'enzyme';
import CvPage from './cv';

describe('CvPage', () => {
  it('should render', () => {
    const page = shallow(<CvPage />);
    expect(page.exists()).toBe(true);
  });
});
