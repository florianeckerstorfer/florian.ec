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
  const tags = component.find('PostTags');
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-footer')).toBe(true);
  expect(tags.exists()).toBe(true);
});
