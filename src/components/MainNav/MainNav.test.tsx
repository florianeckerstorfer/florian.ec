import React from 'react';
import { shallow } from 'enzyme';
import MainNav from './MainNav';

test('MainNav should render', () => {
  const component = shallow(<MainNav />);
  expect(component.exists()).toBeTruthy();
});
