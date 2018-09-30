/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import ConcertGrid from './ConcertGrid';

test('ConcertGrid should render grid of concerts', () => {
  const concerts = {
    2016: [],
    2017: [
      { sizes: {}, layout: 'portait', title: 'foo', name: 'foo' },
      { sizes: null },
      { sizes: {}, layout: 'landscape', title: 'bar', name: 'bar' },
    ],
    2018: [
      { sizes: {}, layout: 'portait', title: 'foo 2', name: 'foo 2' },
      { sizes: null },
    ],
  };
  const component = shallow(<ConcertGrid concerts={concerts} />);
  expect(component.exists()).toBe(true);
  expect(component.find('.concert-grid').exists()).toBe(true);
  expect(
    component
      .find('h2')
      .first()
      .text()
  ).toBe('2018');
  expect(
    component
      .find('h2')
      .last()
      .text()
  ).toBe('2017');
  expect(component.find('.concert-grid').children().length).toBe(5);
});
