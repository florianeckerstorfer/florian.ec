/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import TopNav from './TopNav';

test('TopNav should render top navigation', () => {
  const component = shallow(<TopNav />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('top-nav')).toBe(true);
});

test('TopNav should render link to blog', () => {
  const component = shallow(<TopNav />);
  expect(component.childAt(0).prop('to')).toBe('/');
});

test('TopNav should render link to about', () => {
  const component = shallow(<TopNav />);
  expect(component.childAt(1).prop('to')).toBe('/about');
});
