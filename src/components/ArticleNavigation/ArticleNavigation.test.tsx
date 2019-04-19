import React from 'react';
import { shallow } from 'enzyme';
import ArticleNavigation from './ArticleNavigation';
import IBlogNode from '../../types/IBlogNode';

const previous: IBlogNode = {
  frontmatter: {
    date: '2019',
    slug: 'prev',
    title: 'Previous Article',
  },
  fields: { slug: '/previous' },
  excerpt: '',
};

const next: IBlogNode = {
  frontmatter: {
    date: '2019',
    slug: 'next',
    title: 'Next Article',
  },
  fields: { slug: '/next' },
  excerpt: '',
};

test('ArticleNavigation should render previous and next links', () => {
  const component = shallow(
    <ArticleNavigation previous={previous} next={next} />
  );

  expect(component.exists()).toBe(true);
  expect(component.find('.previous .link').exists()).toBe(true);
  expect(component.find('.next .link').exists()).toBe(true);
});

test('ArticleNavigation should render only previous link', () => {
  const component = shallow(<ArticleNavigation previous={previous} />);

  expect(component.exists()).toBe(true);
  expect(component.find('.previous .link').exists()).toBe(true);
  expect(component.find('.next .link').exists()).toBe(false);
});

test('ArticleNavigation should render only next link', () => {
  const component = shallow(<ArticleNavigation next={next} />);

  expect(component.exists()).toBe(true);
  expect(component.find('.previous .link').exists()).toBe(false);
  expect(component.find('.next .link').exists()).toBe(true);
});
