import * as React from 'react';

import BlogPostTemplate from './BlogPostTemplate';
import IPageContext from '../types/IPageContext';
import { shallow } from 'enzyme';
import { renderFeedLinks } from '../pages/index';

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
    excerpt: 'my excerpt',
  },
  next: {
    fields: { slug: '/next' },
    frontmatter: {
      category: 'Foo',
      slug: 'next',
      title: 'next post',
      date: '2019',
    },
    excerpt: 'my expert',
  },
};

describe('BlogPostTemplate', () => {
  it('should render', () => {
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

  it('should render excerpt as SEO description of no description', () => {
    const data = {
      site: { siteMetadata: { title: 'site title' } },
      markdownRemark: {
        frontmatter: {
          category: 'Foo',
          date: '2019',
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

    const seo = component.find('SEO');

    expect(seo.prop('description')).toBe(data.markdownRemark.excerpt);
  });
});

describe('renderFeedLinks', () => {
  const asides = shallow(renderFeedLinks());
  it('should render feed links', () => {
    expect(asides.find('.feeds').exists()).toBe(true);
  });
});
