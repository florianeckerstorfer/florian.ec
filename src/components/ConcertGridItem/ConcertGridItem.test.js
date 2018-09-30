/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import ConcertGridItem from './ConcertGridItem';

test('ConcertGridItem should render concert grid item', () => {
  const concert = {
    layout: 'portrait',
    sizes: { src: '/foo.jpg' },
    title: 'foo',
  };
  const component = shallow(<ConcertGridItem concert={concert} />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('concert-grid-item--portrait')).toBe(true);
  expect(component.find('figure').prop('style').backgroundImage).toContain(
    '/foo.jpg'
  );
  expect(component.find('figcaption').text()).toBe('foo');
});
