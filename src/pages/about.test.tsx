import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from './about';

describe('AboutPage', () => {
  it('should render', () => {
    const page = shallow(<AboutPage />);
    expect(page.exists()).toBe(true);
  });
});
