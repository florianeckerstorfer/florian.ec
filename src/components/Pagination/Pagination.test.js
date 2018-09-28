/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './Pagination';

test('Pagination should render pagination on first page', () => {
  const component = shallow(
    <Pagination
      first
      last={false}
      index={1}
      pageCount={5}
      nextUrl="/2"
      previousUrl=""
    />
  );
  expect(component.exists()).toBe(true);
  expect(component.hasClass('pagination')).toBe(true);
  expect(component.childAt(0).prop('test')).toBe(true);
  expect(component.childAt(0).prop('url')).toBe('');
  expect(component.childAt(1).text()).toBe('1 / 5');
  expect(component.childAt(2).prop('test')).toBe(false);
  expect(component.childAt(2).prop('url')).toBe('/2');
});

test('Pagination should render pagination on last page', () => {
  const component = shallow(
    <Pagination
      first={false}
      last
      index={5}
      pageCount={5}
      nextUrl=""
      previousUrl="/4"
    />
  );
  expect(component.childAt(0).prop('test')).toBe(false);
  expect(component.childAt(0).prop('url')).toBe('/4');
  expect(component.childAt(1).text()).toBe('5 / 5');
  expect(component.childAt(2).prop('test')).toBe(true);
  expect(component.childAt(2).prop('url')).toBe('');
});

test('Pagination should render pagination in the middle', () => {
  const component = shallow(
    <Pagination
      first={false}
      last={false}
      index={3}
      pageCount={5}
      nextUrl="/4"
      previousUrl="/2"
    />
  );
  expect(component.childAt(0).prop('test')).toBe(false);
  expect(component.childAt(0).prop('url')).toBe('/2');
  expect(component.childAt(1).text()).toBe('3 / 5');
  expect(component.childAt(2).prop('test')).toBe(false);
  expect(component.childAt(2).prop('url')).toBe('/4');
});
