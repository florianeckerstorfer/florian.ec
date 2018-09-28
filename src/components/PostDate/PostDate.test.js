/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PostDate from './PostDate';

test('PostDate should render post date', () => {
  const component = shallow(<PostDate date="2018-09-27" />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-date'));
  expect(component.text()).toContain('2018-09-27');
});
