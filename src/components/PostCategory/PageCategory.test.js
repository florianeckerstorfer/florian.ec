/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PostCategory from './PostCategory';

test('PageCategory should render link to post category', () => {
  const component = shallow(<PostCategory category="Foo" />);
  const link = component.find('GatsbyLink');
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-category')).toBe(true);
  expect(link.prop('to')).toBe('/categories/foo');
  expect(link.dive().text()).toBe('Foo');
});
