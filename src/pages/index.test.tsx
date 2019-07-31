import IBlogNode from '../types/IBlogNode';
import IndexPage from '.';
import React from 'react';
import { shallow } from 'enzyme';

const location = {} as Location;

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

const data = {
  site: { siteMetadata: { title: 'Foobar' } },
  allMarkdownRemark: { edges: articles },
};

describe('IndexPage', (): void => {
  const page = shallow(<IndexPage location={location} data={data} />);

  it('should render', (): void => {
    expect(page.exists()).toBe(true);
  });

  it('should render links to feedis', (): void => {
    expect(page.find('FeedLinks').exists()).toBe(true);
  });
});
