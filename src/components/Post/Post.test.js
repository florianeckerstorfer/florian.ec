/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';

test('Post should render post', () => {
  const frontmatter = {
    path: '/1',
    title: 'Foo',
    category: 'Bar',
    date: '2018-09-27',
  };
  const html = '<div>foo bar</div>';
  const component = shallow(<Post frontmatter={frontmatter} html={html} />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post')).toBe(true);
});

test('Post should render post', () => {
  const frontmatter = {
    layout: 'foo',
    path: '/1',
    title: 'Foo',
    category: 'Bar',
    date: '2018-09-27',
  };
  const html = '<div>foo bar</div>';
  const component = shallow(<Post frontmatter={frontmatter} html={html} />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post')).toBe(true);
});
