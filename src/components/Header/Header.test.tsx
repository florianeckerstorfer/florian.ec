import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

test('Header should render', () => {
  const component = shallow(<Header />);
  expect(component.hasClass('header')).toBeTruthy();
  expect(component.find('.logo').prop('to')).toBe('/');
});
