/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import PostHeader from './PostHeader';

test('PostHeader should render post header', () => {
  const frontmatter = {
    title: 'Foo Bar',
    path: '/1',
    category: 'Foo',
    date: '2018-09-25',
  };
  const component = shallow(<PostHeader frontmatter={frontmatter} />);
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-header')).toBe(true);
});
