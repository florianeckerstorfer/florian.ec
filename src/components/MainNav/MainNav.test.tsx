import MainNav from './MainNav';
import React from 'react';
import { shallow } from 'enzyme';

describe('MainNav', () => {
  it('should render', () => {
    const component = shallow(<MainNav />);
    expect(component.exists()).toBeTruthy();
  });
});
