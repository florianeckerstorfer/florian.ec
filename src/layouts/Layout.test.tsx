import React from 'react';
import { shallow } from 'enzyme';
import Layout, { renderLayout } from './Layout';

describe('Layout', () => {
  const component = shallow(<Layout>Foo</Layout>);

  it('should render', () => {
    expect(component.exists()).toBe(true);
  });
});

describe('renderLayout()', () => {
  const data = { site: { siteMetadata: { title: 'my site' } } };
  const component = shallow(renderLayout(<span>foo</span>)(data));

  it('should render layout', () => {
    expect(component.exists()).toBe(true);
  });

  it('should render Header with `siteTitle`', () => {
    const header = component.find('Header');
    expect(header.exists()).toBe(true);
    expect(header.prop('siteTitle')).toBe(data.site.siteMetadata.title);
  });

  it('should render MainNav', () => {
    expect(component.find('MainNav').exists()).toBe(true);
  });

  it('should render children in main content', () => {
    const main = component.find('main');
    expect(main.exists()).toBe(true);
    expect(main.text()).toBe('foo');
  });

  it('should render Footer', () => {
    expect(component.find('Footer').exists()).toBe(true);
  });
});
