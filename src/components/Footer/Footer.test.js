/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

test('Footer should render', () => {
  const component = shallow(<Footer />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('footer')).toBe(true);
});

test('Footer should have link to imprint', () => {
  const component = shallow(<Footer />);
  const links = component.find('GatsbyLink[to="/imprint"]');
  expect(links.length).toBe(1);
});

test('Footer should have link to privacy policy', () => {
  const component = shallow(<Footer />);
  const links = component.find('GatsbyLink[to="/privacy"]');
  expect(links.length).toBe(1);
});
