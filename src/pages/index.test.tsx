import React from 'react';
import { shallow } from 'enzyme';
import IndexPage from '.';
import IBlogNode from '../types/IBlogNode';

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

describe('IndexPage', () => {
  const page = shallow(<IndexPage location={location} data={data} />);

  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
