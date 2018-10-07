/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PostTags from './PostTags';

test('PostTags renders post tags', () => {
  const component = shallow(<PostTags tags={['foo', 'bar']} />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-tags')).toBe(true);
  expect(component.children().length).toBe(2);
  const tag1 = component.childAt(0).dive();
  const tag2 = component.childAt(1).dive();
  expect(tag1.text()).toBe('#foo');
  expect(tag2.text()).toBe('#bar');
});
