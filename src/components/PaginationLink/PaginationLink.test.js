/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PaginationLink from './PaginationLink';

test('PaginationLink should render pagination with link', () => {
  const component = shallow(
    <PaginationLink test={false} url="/1">
      <span>1</span>
    </PaginationLink>
  );
  expect(component.exists()).toBe(true);
  expect(component.hasClass('pagination__link'));
  expect(component.prop('to')).toBe('/1');
  expect(
    component
      .dive()
      .childAt(0)
      .text()
  ).toBe('1');
});

test('PaginationLink should render pagination without link', () => {
  const component = shallow(
    <PaginationLink test>
      <span>1</span>
    </PaginationLink>
  );
  expect(component.exists()).toBe(true);
  expect(component.hasClass('pagination__link'));
  expect(component.childAt(0).text()).toBe('1');
});
