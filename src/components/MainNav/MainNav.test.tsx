import React from 'react';
import { shallow } from 'enzyme';
import MainNav from './MainNav';

describe('MainNav', () => {
  it('should render', () => {
    const component = shallow(<MainNav />);
    expect(component.exists()).toBeTruthy();
  });
});
