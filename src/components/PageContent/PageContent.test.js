/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PageContent from './PageContent';

test('PageContent should render page content', () => {
  const component = shallow(<PageContent>foo bar</PageContent>);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('page-content')).toBe(true);
  expect(component.text()).toBe('foo bar');
});
