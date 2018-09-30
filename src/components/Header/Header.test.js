/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

test('Header should render header', () => {
  const component = shallow(<Header />);
  expect(component.exists()).toBe(true);
  expect(component.find('TopNav').exists()).toBe(true);
});

test('Header should render logo with link to index if on sub page', () => {
  const component = shallow(<Header />);
  const link = component.find('GatsbyLink');
  expect(link.prop('to')).toBe('/');
  expect(
    link
      .dive()
      .find('Logo')
      .exists()
  ).toBe(true);
});

test('Header should render logo with link to top if on index', () => {
  const component = shallow(<Header isIndex />);
  const link = component.find('a');
  expect(link.prop('href')).toBe('#');
  expect(link.find('Logo').exists()).toBe(true);
});

test('Header should scroll to top when link is clicked', () => {
  window.pageYOffset = 100;
  window.scrollTo = jest.fn();
  const event = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
  const component = shallow(<Header isIndex />);
  const link = component.find('a');
  link.simulate('click', event);
  expect(event.preventDefault).toHaveBeenCalledTimes(1);
  expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});

test('Header should not scroll when link is clicked but window is at top', () => {
  window.pageYOffset = 0;
  window.scrollTo = jest.fn();
  const event = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
  const component = shallow(<Header isIndex />);
  const link = component.find('a');
  link.simulate('click', event);
  expect(event.preventDefault).not.toHaveBeenCalled();
  expect(event.stopPropagation).not.toHaveBeenCalled();
  expect(window.scrollTo).not.toHaveBeenCalled();
});
