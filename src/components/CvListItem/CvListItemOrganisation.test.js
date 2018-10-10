/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import CvListItemOrganisation from './CvListItemOrganisation';

test('CvListItemOrganisation should render organisation with URL', () => {
  const url = 'https://florian.ec';
  const name = 'Foo';
  const component = shallow(
    <CvListItemOrganisation organisation={{ name, url }} />
  );
  expect(component.exists()).toBeTruthy();
  expect(component.text()).toBe(name);
  expect(component.prop('href')).toBe(url);
});
