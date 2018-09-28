/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import PostContent from './PostContent';

test('PostContent should render post content', () => {
  const component = shallow(
    <PostContent layout="foo">
      <div>foobar</div>
    </PostContent>
  );
  expect(component.exists()).toBe(true);
  expect(component.hasClass('post-content')).toBe(true);
  expect(component.hasClass('post-content--foo')).toBe(true);
  expect(component.childAt(0).text()).toBe('foobar');
});
