import Article from './Article';
import IBlogPost from '../../types/IBlogPost';
import IPageContext from '../../types/IPageContext';
import React from 'react';
import { shallow } from 'enzyme';

const post: IBlogPost = {
  frontmatter: {
    category: 'FB',
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
      category: 'FB',
      slug: 'prev',
      title: 'prev post',
      date: '2019-04-18',
    },
    excerpt: '',
  },
  next: {
    fields: { slug: '/next' },
    frontmatter: {
      category: 'FB',
      slug: 'next',
      title: 'next post',
      date: '2019-04-20',
    },
    excerpt: '',
  },
};

test('Article should render article', () => {
  const component = shallow(<Article post={post} context={context} />);
  const articleContent = component.find('ArticleContent');
  const articleNavigation = component.find('ArticleNavigation');
  const articleDate = component.find('ArticleDate');
  const headline = component.find('H1').dive();

  expect(component.exists()).toBe(true);
  expect(component.hasClass('article')).toBe(true);
  expect(headline.text()).toBe(post.frontmatter.title);
  expect(articleDate.prop('date')).toBe(post.frontmatter.date);
  expect(articleContent.prop('post')).toBe(post);
  expect(articleNavigation.prop('previous')).toBe(context.previous);
  expect(articleNavigation.prop('next')).toBe(context.next);
});
