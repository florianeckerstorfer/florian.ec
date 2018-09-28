/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PostHeaderList from './PostHeaderList';

const posts = [
  {
    node: {
      frontmatter: {
        path: '/1',
        category: 'Foo',
        date: '2018-07-01',
        title: 'Foo 1',
      },
    },
  },
  {
    node: {
      frontmatter: {
        path: '/2',
        category: 'Foo',
        date: '2018-09-01',
        title: 'Foo 2',
      },
    },
  },
  {
    node: {
      frontmatter: {
        path: '/3',
        category: 'Bar',
        date: '2018-09-29',
        title: 'Foo 3',
      },
    },
  },
];

test('PostHeaderList renders list of post headers', () => {
  const component = shallow(<PostHeaderList posts={posts} />);
  const items = component.find('.post-header-list__item');
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-header-list')).toBe(true);
  expect(items.length).toBe(3);
});
