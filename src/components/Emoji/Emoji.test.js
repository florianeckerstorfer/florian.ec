/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Emoji from './Emoji';

test('Emoji should render emoji with a11y', () => {
  const component = shallow(<Emoji emoji="❤️" label="heart" />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('emoji')).toBe(true);
  expect(component.prop('role')).toBe('img');
  expect(component.prop('aria-label')).toBe('heart');
  expect(component.text()).toBe('❤️');
});
