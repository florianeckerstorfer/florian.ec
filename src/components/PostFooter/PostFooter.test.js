/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PostFooter from './PostFooter';

test('PostFooter should render post footer without tags', () => {
  const frontmatter = {};
  const component = shallow(<PostFooter frontmatter={frontmatter} />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-footer')).toBe(true);
  expect(component.find('.tags').exists()).toBe(false);
});

test('PostFooter should render post footer with tags', () => {
  const frontmatter = { tags: ['foo', 'bar'] };
  const component = shallow(<PostFooter frontmatter={frontmatter} />);
  const tags = component.find('.tags');
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-footer')).toBe(true);
  expect(tags.exists()).toBe(true);
  expect(tags.children().length).toBe(2);
  const tag1 = tags.childAt(0);
  expect(tag1.prop('to')).toBe('/tags/foo');
  expect(tag1.dive().text()).toBe('#foo');
  const tag2 = tags.childAt(1);
  expect(tag2.prop('to')).toBe('/tags/bar');
  expect(tag2.dive().text()).toBe('#bar');
});
