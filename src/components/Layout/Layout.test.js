/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

test('Layout should render layout', () => {
  const component = shallow(
    <Layout location={{ pathname: '/foo' }}>
      <span>foo</span>
    </Layout>
  );
  expect(component.exists());
  expect(
    component
      .find('.container')
      .childAt(1)
      .name()
  ).toBe('span');
});

test('Layout should set isIndex for Header', () => {
  const component = shallow(
    <Layout location={{ pathname: '/' }}>
      <span>foo</span>
    </Layout>
  );
  expect(component.exists());
  expect(component.find('Header').prop('isIndex')).toBe(true);
});
