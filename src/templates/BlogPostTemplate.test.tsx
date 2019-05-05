import * as React from 'react';
import { shallow } from 'enzyme';
import BlogPostTemplate from './BlogPostTemplate';
import IPageContext from '../types/IPageContext';

const location = window.location;
const pageContext: IPageContext = {
  previous: {
    fields: { slug: '/prev' },
    frontmatter: {
      category: 'Foo',
      slug: 'prev',
      title: 'prev post',
      date: '2019',
    },
    excerpt: '',
  },
  next: {
    fields: { slug: '/next' },
    frontmatter: {
      category: 'Foo',
      slug: 'next',
      title: 'next post',
      date: '2019',
    },
    excerpt: '',
  },
};

test('BlogPostTemplate should render', () => {
  const data = {
    site: { siteMetadata: { title: 'site title' } },
    markdownRemark: {
      frontmatter: {
        category: 'Foo',
        date: '2019',
        description: 'blog description',
        slug: 'blog-title',
        title: 'blog title',
      },
      excerpt: 'my excerpt',
      html: 'my html',
    },
  };
  const component = shallow(
    <BlogPostTemplate
      data={data}
      location={location}
      pageContext={pageContext}
    />
  );

  expect(component.exists()).toBeTruthy();
  expect(component.find('Article').prop('post')).toBe(data.markdownRemark);
});
