import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';
import IPageContext from '../../types/IPageContext';
import IBlogPost from '../../types/IBlogPost';

const post: IBlogPost = {
  frontmatter: {
    slug: 'foo',
    date: '2019-04-19',
    title: 'Foo',
  },
  html: 'foo bar',
};

const context: IPageContext = {
  previous: {
    fields: { slug: '/prev' },
    frontmatter: {
      slug: 'prev',
      title: 'prev post',
      date: '2019-04-18',
    },
    excerpt: '',
  },
  next: {
    fields: { slug: '/next' },
    frontmatter: { slug: 'next', title: 'next post', date: '2019-04-20' },
    excerpt: '',
  },
};

test('Article should render article', () => {
  const component = shallow(<Article post={post} context={context} />);
  const articleContent = component.find('ArticleContent');
  const articleNavigation = component.find('ArticleNavigation');
  const meta = component.find('.meta');
  const headline = component.find('H1').dive();

  expect(component.exists()).toBe(true);
  expect(component.hasClass('article')).toBe(true);
  expect(headline.text()).toBe(post.frontmatter.title);
  expect(meta.text()).toBe(post.frontmatter.date);
  expect(articleContent.prop('post')).toBe(post);
  expect(articleNavigation.prop('previous')).toBe(context.previous);
  expect(articleNavigation.prop('next')).toBe(context.next);
});
