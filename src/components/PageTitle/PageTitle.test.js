/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from './PageTitle';

test('PageTitle should render title of a page', () => {
  const component = shallow(<PageTitle title="Foo Bar" />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('page-title')).toBe(true);
  expect(component.text()).toBe('Foo Bar');
});
