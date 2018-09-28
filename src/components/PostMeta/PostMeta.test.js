/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PostMeta from './PostMeta';

const frontmatter = { date: '2018-09-27', category: 'Foo' };

test('PostMeta renders post meta data', () => {
  const component = shallow(<PostMeta frontmatter={frontmatter} />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-meta')).toBe(true);
});
