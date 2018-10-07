/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';

test('Post should render post with default layout', () => {
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
  expect(component.find('PostHeader').exists()).toBe(true);
  expect(component.find('PostContent').exists()).toBe(false);
  expect(component.find('PostFooter').exists()).toBe(false);
});

test('Post should render detail post with default layout', () => {
  const frontmatter = {
    path: '/1',
    title: 'Foo',
    category: 'Bar',
    date: '2018-09-27',
  };
  const html = '<div>foo bar</div>';
  const component = shallow(
    <Post frontmatter={frontmatter} html={html} detail />
  );
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post')).toBe(true);
  expect(component.find('PostHeader').exists()).toBe(true);
  const detail = component.find('PostDetail').dive();
  expect(detail.find('PostContent').exists()).toBe(true);
  expect(detail.find('PostFooter').exists()).toBe(true);
});

test('Post should render detail post', () => {
  const frontmatter = {
    layout: 'foo',
    path: '/1',
    title: 'Foo',
    category: 'Bar',
    date: '2018-09-27',
  };
  const html = '<div>foo bar</div>';
  const component = shallow(
    <Post frontmatter={frontmatter} html={html} detail />
  );
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post')).toBe(true);
  expect(component.find('PostHeader').exists()).toBe(true);
  const detail = component.find('PostDetail').dive();
  expect(detail.find('PostContent').exists()).toBe(true);
  expect(detail.find('PostFooter').exists()).toBe(true);
});
