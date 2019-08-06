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
  const component = shallow(renderLayout({ children: <span>foo</span> })(data));

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

describe('renderLayout() with pageTitle', () => {
  const data = { site: { siteMetadata: { title: 'my site' } } };
  const pageTitle = jest.fn(() => <h1>page title</h1>);
  const component = shallow(
    renderLayout({ children: <span>foo</span>, pageTitle })(data)
  );

  it('should render layout with page header', () => {
    expect(pageTitle).toHaveBeenCalledTimes(1);
    expect(component.find('h1').text()).toContain('page title');
  });
});
