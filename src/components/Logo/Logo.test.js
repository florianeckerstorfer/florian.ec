/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

test('Logo should render logo', () => {
  const component = shallow(<Logo />);
  expect(component.exists()).toBe(true);
  expect(component.find('img').exists()).toBe(true);
});
