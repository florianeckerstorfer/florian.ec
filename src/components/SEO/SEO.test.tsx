import * as React from 'react';
import { shallow } from 'enzyme';
import SEO from './seo';
import * as Gatsby from 'gatsby';

beforeEach(() => {
  jest.clearAllMocks();
});

function isMeta(name: string): (m: JSX.IntrinsicElements['meta']) => boolean {
  return (m: JSX.IntrinsicElements['meta']) =>
    m.name === name || m.property === name;
}

describe('SEO', () => {
  it('should render with given title and description, default language', () => {
    const title = 'my title';
    const description = 'my description';
    const siteTitle = 'site title';
    const siteDescription = 'site description';
    const author = 'site author';

    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          author,
          description: siteDescription,
          title: siteTitle,
        },
      },
    }));

    const component = shallow(
      <SEO
        description={description}
        keywords={['key 1', 'key 2']}
        title={title}
      />
    );
    const meta = component.prop('meta');

    expect(component.exists()).toBeTruthy();
    expect(component.prop('htmlAttributes').lang).toBe('en');
    expect(component.prop('title')).toBe(title);
    expect(component.prop('titleTemplate')).toContain(siteTitle);
    expect(meta.find(isMeta('description')).content).toBe(description);
    expect(meta.find(isMeta('og:title')).content).toBe(title);
    expect(meta.find(isMeta('og:description')).content).toBe(description);
    expect(meta.find(isMeta('og:type')).content).toBe('website');
    expect(meta.find(isMeta('twitter:card')).content).toBe('summary');
    expect(meta.find(isMeta('twitter:creator')).content).toBe(author);
    expect(meta.find(isMeta('twitter:title')).content).toBe(title);
    expect(meta.find(isMeta('twitter:description')).content).toBe(description);
    expect(meta.find(isMeta('keywords')).content).toBe('key 1, key 2');
  });

  it('should render with site description', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: { description: 'site description', title: 'site title' },
      },
    }));

    const component = shallow(<SEO title="my title" />);
    const meta = component.prop('meta');

    expect(component.exists()).toBeTruthy();
    expect(meta.find(isMeta('description')).content).toBe('site description');
  });
});
