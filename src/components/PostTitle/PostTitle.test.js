/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PostTitle from './PostTitle';

test('PostTitle should render title with link', () => {
  const component = shallow(<PostTitle title="Foo Bar" path="/foo" />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-title')).toBe(true);
  expect(component.name()).toBe('h3');
  const link = component.find('GatsbyLink');
  expect(link.prop('to')).toBe('/foo');
  expect(link.dive().text()).toBe('Foo Bar');
});

test('PostTitle should render title without link when detail is `true`', () => {
  const component = shallow(<PostTitle title="Foo Bar" path="/foo" detail />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-title')).toBe(true);
  expect(component.name()).toBe('h1');
  expect(component.text()).toBe('Foo Bar');
  const link = component.find('GatsbyLink');
  expect(link.exists()).toBe(false);
});
