import ArticleList from './ArticleList';
import IBlogNode from '../../types/IBlogNode';
import React from 'react';
import { shallow } from 'enzyme';

const article: IBlogNode = {
  frontmatter: {
    category: 'Foo',
    date: '2019-05-05',
    slug: '/foo',
    title: 'Foo',
  },
  fields: {
    slug: '/foo',
  },
  excerpt: 'foobar',
};

const articles = [{ node: article }, { node: article }];

describe('ArticleList', () => {
  const component = shallow(<ArticleList articles={articles} />);

  it('should render', () => {
    expect(component.exists()).toBe(true);
  });

  it('should render all articles', () => {
    expect(component.find('ArticleListItem').length).toBe(articles.length);
  });
});
