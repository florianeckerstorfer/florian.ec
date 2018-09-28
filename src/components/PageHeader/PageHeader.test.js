/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from './PageHeader';

test('PageHeader renders post headers', () => {
  const component = shallow(<PageHeader title="Foo Bar" />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('page-header')).toBe(true);
  expect(component.name()).toBe('header');
  expect(component.find('PageTitle').exists()).toBe(true);
});
