import ArticleListItem from './ArticleListItem';
import IBlogNode from '../../types/IBlogNode';
import React from 'react';
import { shallow } from 'enzyme';

const article: IBlogNode = {
  frontmatter: {
    category: 'Foo',
    date: '2019-05-05',
    slug: 'foo',
    title: 'Foo',
  },
  fields: {
    slug: 'foo',
  },
  excerpt: 'foobar',
};

describe('ArticleListItem', () => {
  const component = shallow(<ArticleListItem article={article} />);
  const link = component.find('.link');

  it('should render', () => {
    expect(component.exists()).toBe(true);
  });

  it('should contain link to article', () => {
    expect(link.prop('to')).toBe(`/blog/${article.frontmatter.slug}`);
  });

  it('should render title', () => {
    const title = link.dive();
    expect(title.text()).toBe(article.frontmatter.title);
  });

  it('should render category', () => {
    const label = component.find('Label').dive();
    expect(label.text()).toBe(article.frontmatter.category);
  });

  it('should render date', () => {
    const date = component.find('ArticleDate');
    expect(date.prop('date')).toBe(article.frontmatter.date);
  });
});
